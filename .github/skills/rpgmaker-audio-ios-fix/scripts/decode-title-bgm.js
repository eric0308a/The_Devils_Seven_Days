#!/usr/bin/env node
'use strict';

const fs = require('fs/promises');
const path = require('path');

const ROOT = process.cwd();
const SYSTEM_JSON = path.join(ROOT, 'www', 'data', 'System.json');
const AUDIO_DIR = path.join(ROOT, 'www', 'audio', 'bgm');
const OUTPUT_DIR = path.join(ROOT, 'tools', 'decoded-audio');

const HEADER_HEX = '5250474d56000000' + '000301' + '0000000000';
const HEADER = Buffer.from(HEADER_HEX, 'hex');
const HEADER_LEN = 16;

async function readSystemData() {
  const raw = await fs.readFile(SYSTEM_JSON, 'utf8');
  const data = JSON.parse(raw);
  if (!data || !data.titleBgm || !data.titleBgm.name) {
    throw new Error('System.json missing titleBgm.name');
  }
  if (!data.hasEncryptedAudio || !data.encryptionKey) {
    throw new Error('Encrypted audio is not enabled or encryptionKey missing');
  }
  return data;
}

function keyToBytes(key) {
  const trimmed = String(key).trim();
  if (!/^[0-9a-fA-F]{32}$/.test(trimmed)) {
    throw new Error('Invalid encryptionKey format');
  }
  const bytes = [];
  for (let i = 0; i < trimmed.length; i += 2) {
    bytes.push(parseInt(trimmed.slice(i, i + 2), 16));
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

async function decodeFile(inputPath, outputPath, keyBytes) {
  const encrypted = await fs.readFile(inputPath);
  const decoded = decryptRpgmv(encrypted, keyBytes);
  await fs.writeFile(outputPath, decoded);
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  const systemData = await readSystemData();
  const keyBytes = keyToBytes(systemData.encryptionKey);
  const titleName = systemData.titleBgm.name;

  await ensureDir(OUTPUT_DIR);

  const rpgmvoPath = path.join(AUDIO_DIR, titleName + '.rpgmvo');
  const rpgmvmPath = path.join(AUDIO_DIR, titleName + '.rpgmvm');
  const oggOut = path.join(OUTPUT_DIR, titleName + '.ogg');
  const m4aOut = path.join(OUTPUT_DIR, titleName + '.m4a');

  let decodedAny = false;

  try {
    await decodeFile(rpgmvoPath, oggOut, keyBytes);
    console.log('Decoded rpgmvo ->', oggOut);
    decodedAny = true;
  } catch (err) {
    console.warn('Skip rpgmvo:', err.message || err);
  }

  try {
    await decodeFile(rpgmvmPath, m4aOut, keyBytes);
    console.log('Decoded rpgmvm ->', m4aOut);
    decodedAny = true;
  } catch (err) {
    console.warn('Skip rpgmvm:', err.message || err);
  }

  if (!decodedAny) {
    throw new Error('No title BGM decoded. Check file existence and encryptionKey.');
  }
}

main().catch((err) => {
  console.error('Fatal:', err.message || err);
  process.exit(1);
});
