# Implementation Checklist

Use this checklist after applying the audio iOS fix to verify all components are in place.

## Pre-Conversion Checklist

- [ ] **System.json verified**
  - [ ] `hasEncryptedAudio` is `true`
  - [ ] `encryptionKey` is a 32-character hex string
  - [ ] `titleBgm.name` exists (for verification later)

- [ ] **Audio files exist**
  - [ ] At least one `.rpgmvo` file in `www/audio/`
  - [ ] Run: `find www/audio -name "*.rpgmvo" | head -5`

- [ ] **Dependencies installed**
  - [ ] ffmpeg is available: `which ffmpeg`
  - [ ] Node.js runtime available: `node --version`

## Conversion Checklist

- [ ] **Conversion script executed**
  - [ ] Command: `node tools/convert-rpgmvo-to-rpgmvm.js --overwrite`
  - [ ] Result shows: `Converted: N, Skipped: 0, Failed: 0`

- [ ] **Verify converted files**
  - [ ] Check file count: `ls www/audio/bgm/*.rpgmvm | wc -l`
  - [ ] Should equal `ls www/audio/bgm/*.rpgmvo | wc -l`

- [ ] **Decode verification**
  - [ ] Run: `node tools/decode-title-bgm.js`
  - [ ] Output files appear in `tools/decoded-audio/`
  - [ ] Both `.ogg` and `.m4a` are present
  - [ ] File sizes are reasonable (not 0 bytes)

## Code Updates Checklist

- [ ] **pwa-audio-fallback.js updated**
  - [ ] File location: `www/js/pwa-audio-fallback.js`
  - [ ] Contains `_onXhrLoad` with decode error handler
  - [ ] Contains `_createDummyBuffer` for graceful fallback
  - [ ] Checks for HTML responses (Content-Type check)

- [ ] **sw.js updated**
  - [ ] File location: `www/js/sw.js`
  - [ ] Contains `shouldCacheResponse` function
  - [ ] Filters out HTML responses from game assets
  - [ ] Checks `Content-Type` header

- [ ] **nginx.conf updated**
  - [ ] File location: `nginx.conf`
  - [ ] `/audio/` block has `error_page 404 =404;`
  - [ ] Prevents rewrite of missing audio to index.html

## Deployment Checklist

- [ ] **Files staged for deployment**
  - [ ] `www/audio/**/*.rpgmvm` files included
  - [ ] `www/js/pwa-audio-fallback.js` updated
  - [ ] `www/js/sw.js` updated
  - [ ] `nginx.conf` updated
  - [ ] `www/js/plugins.js` includes `pwa-audio-fallback.js` reference

- [ ] **Version/Cache Control**
  - [ ] Service Worker version incremented (if applicable)
  - [ ] PWA manifest version updated
  - [ ] Cache headers configured for `.rpgmvm` files (expires 30d)

## Pre-Launch Testing Checklist

### Desktop (Windows/Mac/Linux)

- [ ] **Audio plays**
  - [ ] Title screen BGM audible
  - [ ] Sound effects work
  - [ ] All audio types tested (bgm, bgs, se, me)

- [ ] **Browser Console**
  - [ ] No errors related to audio
  - [ ] No "Header is wrong" messages
  - [ ] Fallback logs visible (if debug level enabled)

### Mobile (Android)

- [ ] **Audio plays**
  - [ ] Title screen BGM audible
  - [ ] Same audio as desktop
  - [ ] No "Error: Header is wrong" message

- [ ] **Cache behavior**
  - [ ] After 1st load, offline mode still works
  - [ ] After SW update, audio updates correctly

### iOS (Real Device)

- [ ] **Device setup**
  - [ ] iOS 16.0 or later
  - [ ] Safari or app WebView
  - [ ] Sufficient storage space

- [ ] **Fresh load**
  - [ ] First visit: Clear cache
  - [ ] Browser: Settings → Safari → Clear History and Website Data
  - [ ] Reload page

- [ ] **Audio verification**
  - [ ] Title screen BGM plays
  - [ ] No "Error: Header is wrong" message
  - [ ] All audio types functional (bgm, bgs, se, me)
  - [ ] Volume changes work

- [ ] **Service Worker behavior**
  - [ ] Offline mode works (2nd+ visit)
  - [ ] Audio persists after refresh

- [ ] **DevTools inspection** (if available)
  - [ ] Check Network tab: `/audio/` requests show 200 or cached
  - [ ] Check Console: Look for `[PWA Audio Fallback]` logs
  - [ ] Verify URL pattern: `.rpgmvm` requests succeed

## Post-Launch Monitoring

- [ ] **Error tracking**
  - [ ] Monitor crash reports from players
  - [ ] Watch for "Header is wrong" mentions
  - [ ] Track audio-related issues

- [ ] **Performance metrics**
  - [ ] Audio load time < 2s
  - [ ] No memory leaks from audio
  - [ ] Fallback mechanisms trigger rarely

- [ ] **Rollback plan**
  - [ ] Have git commit tagged for rollback
  - [ ] Know how to revert nginx changes
  - [ ] Have backup of original audio (if needed)

## Troubleshooting During Launch

If "Header is wrong" still appears on iOS after deployment:

1. **Clear everything** - Delete app cache via iOS Settings
2. **Check file presence** - Verify .rpgmvm files exist: `ls www/audio/bgm/*.rpgmvm`
3. **Verify encryption key** - Decode a sample: `node tools/decode-title-bgm.js`
4. **Check CloudFlare/CDN** - Ensure proper cache headers: `curl -I https://game-url/audio/bgm/NSK-V707-11.rpgmvm`
5. **Review nginx logs** - Look for 404s or wrong Content-Type headers
6. **Fallback activation** - Check if dummy buffer is being created (silent audio instead of error)

## Success Criteria

✅ **All audio plays on:**
- Desktop browsers
- Android mobile browsers
- iOS Safari/WebView

✅ **No errors in console** on any platform

✅ **Offline mode works** after initial load

✅ **Performance** remains acceptable (no additional loading delays)

✅ **Players report** "Audio is working" on iOS for the first time
