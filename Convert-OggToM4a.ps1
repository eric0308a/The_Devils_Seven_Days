[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [string]$AudioRoot = ".\www\audio",
    [switch]$Overwrite,
    [string]$FfmpegPath = "ffmpeg"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Contains-NonAscii {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Text
    )

    return $Text -match "[^\x00-\x7F]"
}

function Invoke-FfmpegConvert {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Exe,
        [Parameter(Mandatory = $true)]
        [string]$InputPath,
        [Parameter(Mandatory = $true)]
        [string]$OutputPath
    )

    $ffmpegArgs = @(
        "-y"
        "-i", $InputPath
        "-map", "0:a:0"
        "-vn"
        "-c:a", "aac"
        "-profile:a", "aac_low"
        "-b:a", "192k"
        "-ar", "44100"
        "-ac", "2"
        "-movflags", "+faststart"
        $OutputPath
    )

    $output = & $Exe @ffmpegArgs 2>&1
    $exitCode = $LASTEXITCODE

    [pscustomobject]@{
        Success = ($exitCode -eq 0)
        ExitCode = $exitCode
        Output = ($output | Out-String)
    }
}

function Test-CommandAvailable {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    return $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

if (-not (Test-Path -LiteralPath $AudioRoot)) {
    throw "Audio root not found: $AudioRoot"
}

if (-not (Test-CommandAvailable -Name $FfmpegPath)) {
    throw "Cannot find ffmpeg executable '$FfmpegPath'. Install ffmpeg or pass -FfmpegPath with full path."
}

$oggFiles = Get-ChildItem -LiteralPath $AudioRoot -Recurse -File -Filter "*.ogg"
if ($oggFiles.Count -eq 0) {
    Write-Host "No .ogg files found under $AudioRoot"
    exit 0
}

$converted = 0
$skipped = 0
$failed = 0

foreach ($oggFile in $oggFiles) {
    $m4aPath = [System.IO.Path]::ChangeExtension($oggFile.FullName, ".m4a")

    if ((Test-Path -LiteralPath $m4aPath) -and (-not $Overwrite)) {
        $skipped++
        Write-Host "[Skip] Exists: $m4aPath"
        continue
    }

    if ($PSCmdlet.ShouldProcess($oggFile.FullName, "Convert to $m4aPath")) {
        try {
            $result = Invoke-FfmpegConvert -Exe $FfmpegPath -InputPath $oggFile.FullName -OutputPath $m4aPath
            if ($result.Success) {
                $converted++
                Write-Host "[OK] $($oggFile.FullName) -> $m4aPath"
                continue
            }

            $usedFallback = $false
            if ((Contains-NonAscii -Text $oggFile.FullName) -or (Contains-NonAscii -Text $m4aPath)) {
                $tempDir = Join-Path -Path $env:TEMP -ChildPath "ogg2m4a_tmp"
                New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

                $tempBase = [System.Guid]::NewGuid().ToString("N")
                $tempInput = Join-Path -Path $tempDir -ChildPath ("{0}.ogg" -f $tempBase)
                $tempOutput = Join-Path -Path $tempDir -ChildPath ("{0}.m4a" -f $tempBase)

                Copy-Item -LiteralPath $oggFile.FullName -Destination $tempInput -Force
                try {
                    $fallbackResult = Invoke-FfmpegConvert -Exe $FfmpegPath -InputPath $tempInput -OutputPath $tempOutput
                    if ($fallbackResult.Success -and (Test-Path -LiteralPath $tempOutput)) {
                        Move-Item -LiteralPath $tempOutput -Destination $m4aPath -Force
                        $usedFallback = $true
                    }
                    else {
                        $detail = $fallbackResult.Output.Trim()
                        if ([string]::IsNullOrWhiteSpace($detail)) {
                            $detail = "ffmpeg exited with code $($fallbackResult.ExitCode)"
                        }
                        throw "fallback conversion failed: $detail"
                    }
                }
                finally {
                    if (Test-Path -LiteralPath $tempInput) {
                        Remove-Item -LiteralPath $tempInput -Force
                    }
                    if (Test-Path -LiteralPath $tempOutput) {
                        Remove-Item -LiteralPath $tempOutput -Force
                    }
                }
            }

            if ($usedFallback) {
                $converted++
                Write-Host "[OK/Fallback] $($oggFile.FullName) -> $m4aPath"
            }
            else {
                $detail = $result.Output.Trim()
                if ([string]::IsNullOrWhiteSpace($detail)) {
                    $detail = "ffmpeg exited with code $($result.ExitCode)"
                }
                throw $detail
            }
        }
        catch {
            $failed++
            Write-Warning "[Fail] $($oggFile.FullName): $($_.Exception.Message)"
        }
    }
}

Write-Host ""
Write-Host "Done. Converted=$converted Skipped=$skipped Failed=$failed"

if ($failed -gt 0) {
    exit 1
}

exit 0
