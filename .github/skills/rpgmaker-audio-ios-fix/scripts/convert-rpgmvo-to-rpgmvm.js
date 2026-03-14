#!/usr/bin/env node
'use strict';

const fs = require('fs/promises');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const DEFAULT_AUDIO_DIR = path.join(process.cwd(), 'www', 'audio');
const DEFAULT_SYSTEM_JSON = path.join(process.cwd(), 'www', 'data', 'System.json');

const HEADER_HEX = '5250474d56000000' + '000301' + '0000000000';
const HEADER = Buffer.from(HEADER_HEX, 'hex');
const HEADER_LEN = 16;

function parseArgs(argv) {
  const args = {
    audioDir: DEFAULT_AUDIO_DIR,
    systemJson: DEFAULT_SYSTEM_JSON,
    overwrite: false,
    keepTemp: false,
    bitrate: '128k',
    only: []
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--audio-dir') {
      args.audioDir = argv[i + 1];
      i += 1;
    } else if (arg === '--system') {
      args.systemJson = argv[i + 1];
      i += 1;
    } else if (arg === '--overwrite') {
      args.overwrite = true;
    } else if (arg === '--keep-temp') {
      args.keepTemp = true;
    } else if (arg === '--bitrate') {
      args.bitrate = argv[i + 1] || args.bitrate;
      i += 1;
    } else if (arg === '--only') {
      const value = argv[i + 1];
      if (value) {
        args.only.push(value);
        i += 1;
      }
    }
  }

  return args;
}

async function readEncryptionKey(systemJsonPath) {
  const raw = await fs.readFile(systemJsonPath, 'utf8');
  const data = JSON.parse(raw);
  if (!data || !data.encryptionKey) {
    throw new Error('System.json missing encryptionKey');
  }
  if (!data.hasEncryptedAudio) {
    throw new Error('hasEncryptedAudio is false; no encrypted audio expected');
  }
  const key = String(data.encryptionKey).trim();
  if (!/^[0-9a-fA-F]{32}$/.test(key)) {
    throw new Error('Invalid encryptionKey format');
  }
  const bytes = [];
  for (let i = 0; i < key.length; i += 2) {
    bytes.push(parseInt(key.slice(i, i + 2), 16));
  }
  return bytes;
}

function verifyHeader(buffer) {
  if (buffer.length < HEADER_LEN) {
    return false;
  }
  for (let i = 0; i < HEADER_LEN; i += 1) {
    if (buffer[i] !== HEADER[i]) {
      return false;
    }
  }
  return true;
}

function decryptRpgmv(buffer, keyBytes) {
  if (!verifyHeader(buffer)) {
    throw new Error('Header is wrong');
  }
  const data = Buffer.from(buffer.slice(HEADER_LEN));
  const limit = Math.min(HEADER_LEN, data.length);
  for (let i = 0; i < limit; i += 1) {
    data[i] = data[i] ^ keyBytes[i];
  }
  return data;
}

function encryptRpgmv(buffer, keyBytes) {
  const data = Buffer.from(buffer);
  const limit = Math.min(HEADER_LEN, data.length);
  for (let i = 0; i < limit; i += 1) {
    data[i] = data[i] ^ keyBytes[i];
  }
  return Buffer.concat([HEADER, data]);
}

function runFfmpeg(inputPath, outputPath, bitrate) {
  return new Promise((resolve, reject) => {
    const args = [
      '-y',
      '-i', inputPath,
      '-map', '0:a:0',
      '-vn',
      '-sn',
      '-c:a', 'aac',
      '-b:a', bitrate,
      '-movflags', '+faststart',
      outputPath
    ];
    const ffmpeg = spawn('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';

    ffmpeg.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    ffmpeg.on('error', (err) => {
      reject(err);
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error('ffmpeg failed: ' + stderr.trim()));
      }
    });
  });
}

async function listRpgmvoFiles(rootDir) {
  const results = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && fullPath.toLowerCase().endsWith('.rpgmvo')) {
        results.push(fullPath);
      }
    }
  }
  await walk(rootDir);
  return results;
}

function normalizeOnlyPaths(paths) {
  return paths.map((p) => (path.isAbsolute(p) ? p : path.join(process.cwd(), p)));
}

async function convertOne(filePath, keyBytes, options) {
  const targetPath = filePath.slice(0, -'.rpgmvo'.length) + '.rpgmvm';
  try {
    if (!options.overwrite) {
      await fs.access(targetPath);
      return { status: 'skipped', filePath };
    }
  } catch (e) {
    // target missing
  }

  const baseName = path.basename(filePath, '.rpgmvo');
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rpgmvm-'));
  const tempOgg = path.join(tempDir, baseName + '.ogg');
  const tempM4a = path.join(tempDir, baseName + '.m4a');

  try {
    const encrypted = await fs.readFile(filePath);
    const oggData = decryptRpgmv(encrypted, keyBytes);
    await fs.writeFile(tempOgg, oggData);

    await runFfmpeg(tempOgg, tempM4a, options.bitrate);

    const m4aData = await fs.readFile(tempM4a);
    const encryptedM4a = encryptRpgmv(m4aData, keyBytes);
    await fs.writeFile(targetPath, encryptedM4a);

    if (!options.keepTemp) {
      await fs.rm(tempDir, { recursive: true, force: true });
    }

    return { status: 'converted', filePath };
  } catch (err) {
    if (!options.keepTemp) {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
    return { status: 'failed', filePath, error: err.message };
  }
}

async function main() {
  const options = parseArgs(process.argv);
  const keyBytes = await readEncryptionKey(options.systemJson);
  const files = options.only.length > 0
    ? normalizeOnlyPaths(options.only)
    : await listRpgmvoFiles(options.audioDir);

  if (files.length === 0) {
    console.log('No .rpgmvo files found in', options.audioDir);
    return;
  }

  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const filePath of files) {
    if (!filePath.toLowerCase().endsWith('.rpgmvo')) {
      console.warn('Skip non-.rpgmvo file:', filePath);
      skipped += 1;
      continue;
    }
    const result = await convertOne(filePath, keyBytes, options);
    if (result.status === 'converted') {
      converted += 1;
    } else if (result.status === 'skipped') {
      skipped += 1;
    } else {
      failed += 1;
      console.warn('Failed:', filePath, result.error || 'unknown error');
    }
  }

  console.log('Done. Converted:', converted, 'Skipped:', skipped, 'Failed:', failed);
}

main().catch((err) => {
  console.error('Fatal:', err.message || err);
  process.exit(1);
});
