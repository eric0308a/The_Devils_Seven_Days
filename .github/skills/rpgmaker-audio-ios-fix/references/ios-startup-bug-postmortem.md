# iOS 啟動崩潰復盤（RPG Maker MV）

## 症狀

- 手機端啟動顯示錯誤視窗，堆疊位於 `rpg_managers.js`：
  - `AudioManager.createBuffer`
  - `SoundManager.preloadImportantSounds`
  - `AudioManager.checkWebAudioError`
- 啟動流程同時經過：
  - `PocketBaseCloudSave.js`
  - `Drill_TitleBootScene.js`
  - `Drill_TitleScene.js`

## 已驗證事實

1. 伺服器可正常提供 JS 與 data 檔案。
2. `www/audio` 下 OGG 與 M4A 檔案數量一致。
3. 前 4 個系統 SE 的 M4A 檔案存在，且可被 ffprobe 解析。
4. 仍崩潰時，問題未必是缺檔，也可能是函式覆寫型態錯誤。

## 根因

`IOSAudioFix.js` 將 `AudioManager.audioFileExt` 以 `Object.defineProperty(...get...)` 覆寫為字串屬性。

但 RPG Maker 核心會以函式形式呼叫：

- `var ext = this.audioFileExt();`

因此在 iOS 啟動預載系統音效時會拋出 `TypeError`，看起來像音訊載入失敗，但實際是 API 介面被改壞。

## 修復

1. 把 `AudioManager.audioFileExt` 改回函式：
   - `AudioManager.audioFileExt = function () { return '.m4a'; };`
2. 升級 `service-worker.js` 的 `CACHE_NAME`，強制手機端取新檔。
3. 重新轉檔 m4a，統一 `AAC-LC 44.1kHz 2ch`。

## 防呆規則

1. 不可用 getter 取代 RPG Maker 會直接呼叫的核心方法。
2. 調整音訊策略後，必做：
   - 全量轉檔覆蓋
   - 啟動系統音效抽樣驗證（0..3）
   - Service Worker 版本遞增
3. 有插件鏈時，先分辨是「外掛包裝呼叫」還是「實際失敗點」。

## 建議檢查命令（PowerShell）

```powershell
# 檢查啟動系統音效 0..3 對應 m4a 是否存在
Set-Location 'c:\Porject\The_Devils_Seven_Days'
$sys = Get-Content '.\www\data\System.json' -Raw | ConvertFrom-Json
0..3 | ForEach-Object {
  $name = $sys.sounds[$_].name
  $path = ".\www\audio\se\$name.m4a"
  [PSCustomObject]@{ Index=$_; Name=$name; Exists=(Test-Path $path) }
}

# 驗證關鍵檔格式
ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,profile,sample_rate,channels -of default=noprint_wrappers=1:nokey=0 .\www\audio\se\xitong_zhizhen_1.m4a
```
