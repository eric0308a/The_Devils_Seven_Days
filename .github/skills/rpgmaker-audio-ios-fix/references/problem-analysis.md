# Problem Analysis: RPG Maker Audio on iOS

## Original Error

**Device**: iPhone iOS 18.7
**Error Message**: "Error: Header is wrong"
**Browser Log**:
```
[2026-02-06T05:54:41.124Z] "GET /audio/se/status01.rpgmvm" 404
[2026-02-06T05:54:41.299Z] "GET /audio/se/status01.rpgmvo" (success)
```

## Root Cause Chain

### 1. iOS WebAudio Codec Limitation

iOS Safari's WebAudio API does **not** support OGG Vorbis codec. It only supports:
- **M4A** (AAC codec) ✅
- **MP3** (MP3 codec) ✅
- **WAV** (PCM codec) ✅
- **OGG Vorbis** ❌ (not supported)

### 2. RPG Maker's Format Fallback Strategy

RPG Maker MV/MZ implements encrypted audio formats:
- **Desktop/Web**: `.rpgmvo` (encrypted OGG Vorbis)
- **Mobile+Web**: `.rpgmvm` (encrypted AAC/M4A)

The `Decrypter.extToEncryptExt()` function maps:
```javascript
'.ogg' → '.rpgmvo'
'.m4a' → '.rpgmvm'
```

When the game requests audio, it attempts:
1. First try: `.rpgmvm` (M4A encrypted) → 404 if missing
2. Fallback: `.rpgmvo` (OGG encrypted) → attempted decode

### 3. iOS Receives OGG Instead of M4A

iOS receives `.rpgmvo` (encrypted OGG). The game attempts to:
1. Decrypt the `.rpgmvo` buffer using System.json's `encryptionKey`
2. Pass decrypted OGG data to `WebAudio._context.decodeAudioData()`
3. **iOS WebAudio fails**: Cannot decode OGG → throws "Header is wrong"

Ironically, the error message comes from **the encryption layer**, not the codec:

```javascript
// From rpg_core.js
function Decrypter.decryptArrayBuffer(arrayBuffer) {
    var header = new Uint8Array(arrayBuffer, 0, 16);
    for (i = 0; i < 16; i++) {
        if (header[i] !== refBytes[i]) {
            throw new Error("Header is wrong");  // ← This error
        }
    }
}
```

If the first 16 bytes don't match the RPG Maker encryption signature, the error fires. iOS WebAudio was returning the OGG file unchanged (not a valid encrypted RPG Maker buffer), triggering this error.

### 4. Why .rpgmvm Was Missing

The project only had `.rpgmvo` files because:
- RPG Maker editor generates `.rpgmvo` by default (desktop focus)
- Mobile optimization was not done during game export
- Script only converted between desktop formats, not iOS-compatible formats

## Cache Poisoning Secondary Issues

### Service Worker Cache Poisoning

The `sw.js` file uses "Cache First" strategy for game assets:

```javascript
if (response && response.status === 200) {
  cache.put(request, response.clone());  // ← Caches everything
}
```

If a 404 error occurred and the browser cached `offline.html` (HTML content) as the `.rpgmvm` audio file:
- Response status would be 200 (successful HTML load)
- WebAudio expects arraybuffer, gets HTML text
- Decode fails → "Header is wrong"

### Nginx Misconfiguration

The original `nginx.conf` had:
```nginx
location / {
    try_files $uri $uri/ /index.html;  # ← Rewrite missing files to index.html
}
```

For `/audio/missing.rpgmvm`:
1. File not found
2. Nginx rewrites to `/index.html`
3. Browser **successfully** receives index.html
4. HTTP status: 200 (not 404!)
5. Service Worker caches index.html
6. Game tries to play index.html as audio
7. "Header is wrong" error

## Impact Matrix

| Scenario | Symptom | Cause |
|----------|---------|-------|
| iOS + only .rpgmvo | No audio or "Header is wrong" | iOS can't decode OGG |
| iOS + .rpgmvm present but SW cache stale | Intermittent audio failures | Old version cached |
| Desktop + missing .rpgmvo | Graceful silence (fallback works) | Desktop supports OGG decoding |
| Mobile web + wrong Nginx config | Cached index.html played as audio | 404 rewrite to HTML |

## Solution Verification

After fixing, verify the chain works correctly:

### Encryption Check
```bash
# Decrypt both formats from the same original audio
node tools/decode-title-bgm.js

# Compare file sizes and metadata
ffmpeg -i tools/decoded-audio/NSK-V707-11.ogg  # Check OGG
ffmpeg -i tools/decoded-audio/NSK-V707-11.m4a  # Check M4A
```

Both should have identical **duration** and **sample rate** (44100 Hz recommended).

### Browser Check (on iOS)
```javascript
// In browser console - check what formats are requested
console.log('[PWA Audio Fallback] ...')  // From pwa-audio-fallback.js

// Manually trigger a test
testAudioFallback('se', 'Cursor1')
```

### Cache Check
```bash
# Verify Service Worker cache excludes HTML
# (Check sw.js has shouldCacheResponse() function)
grep -n "shouldCacheResponse" www/js/sw.js
```

## Technical Constraints

### Encryption Key Scope
- Located in `www/data/System.json`: `encryptionKey` field
- Must be 32-character hexadecimal string
- Used for both `.rpgmvo` and `.rpgmvm` encryption
- **Cannot be changed** without breaking all existing saves

### Audio Metadata Preservation
Some OGG files contain embedded cover art (JPEG/PNG):
- Conversion must extract **audio only** using `-map 0:a:0 -vn -sn`
- Embedded metadata (title, artist, etc.) may be lost during M4A conversion
- This is acceptable for game audio

### Mobile Fallback Limitations
If both `.rpgmvm` and `.rpgmvo` are Missing on iOS:
- The game creates a **dummy 1-second silent buffer**
- Game continues without crash (graceful degradation)
- Players notice missing audio, not a broken game

## Testing Checklist

- [ ] All .rpgmvo files have corresponding .rpgmvm
- [ ] Decoded audio files play back correctly
- [ ] iOS load test on real device (not simulator)
- [ ] Service Worker cleared before iOS test
- [ ] Browser reports successful audio fallback (if accessing console)
- [ ] Desktop Windows/Mac still works with .rpgmvo
- [ ] Android tests with both .rpgmvo and .rpgmvm
