---
name: rpgmaker-audio-ios-fix
description: Fix RPG Maker MV/MZ audio startup failures on iOS/PWA. Use when mobile shows boot-time stack traces in rpg_managers.js AudioManager.createBuffer/checkWebAudioError, when .ogg to .m4a conversion is needed, when plugin audioFileExt overrides conflict with core expectations, or when Service Worker cache keeps stale/broken audio/runtime files.
---

# RPG Maker Audio iOS Fix

針對 RPG Maker MV/MZ 的 iOS/PWA 音訊啟動崩潰進行快速定位與修復。

## 快速流程

1. 對照啟動堆疊是否落在 `AudioManager.createBuffer`、`SoundManager.preloadImportantSounds`、`AudioManager.checkWebAudioError`。
2. 先確認啟動前 4 個系統 SE（`$dataSystem.sounds[0..3]`）對應檔案存在。
3. 驗證 `AudioManager.audioFileExt` 仍是函式，且不被外掛覆寫成字串屬性。
4. 重新轉檔 OGG→M4A（AAC-LC 44.1kHz，覆蓋模式）。
5. 升級 Service Worker `CACHE_NAME`，避免手機吃到舊 JS/舊 m4a。

## 關鍵修復守則

1. `AudioManager.audioFileExt` 必須是可呼叫函式，核心會執行 `this.audioFileExt()`。
2. iOS 使用 `.m4a` 路徑時，轉檔輸出要統一成 `AAC-LC + 44.1kHz + 2ch`。
3. FFmpeg 需強制僅取音訊流：`-map 0:a:0 -vn`，避免 OGG 附帶圖片流造成 m4a 封裝失敗。
4. 每次調整核心 JS 或音訊輸出後，必須同步 bump Service Worker cache version。

## 實作資源

1. 轉檔腳本：`scripts/convert-ogg-to-m4a.ps1`
2. 事故復盤：`references/ios-startup-bug-postmortem.md`
3. 舊版加密音訊流程（rpgmvo/rpgmvm）：`scripts/convert-rpgmvo-to-rpgmvm.js`

## 執行指令（Windows PowerShell）

1. `Set-Location <repo-root>`
2. `./.github/skills/rpgmaker-audio-ios-fix/scripts/convert-ogg-to-m4a.ps1 -AudioRoot ./www/audio -Overwrite`

## 驗證清單

1. 轉檔結果顯示 `Failed=0`。
2. `www/audio` 下每個 `.ogg` 都有同名 `.m4a`。
3. 啟動 4 個系統 SE 的 m4a 可由 ffprobe 讀出 `codec_name=aac`, `profile=LC`, `sample_rate=44100`。
4. iOS 端重新安裝/清除站點資料後可通過開機畫面。

## 常見踩雷

1. 將 `audioFileExt` 用 `Object.defineProperty` 改成 getter 字串，會導致 `this.audioFileExt is not a function`。
2. 只修檔案、不 bump SW cache，手機仍會讀舊腳本。
3. m4a 檔存在但格式不穩（低取樣率/錯誤 profile），仍可能在 iOS 啟動時炸掉。

## 相關技能

1. 行動端整體設計：`../rpgmaker-mobile-guide/SKILL.md`
2. 雲存檔啟動鏈排錯：`../rpgmaker-pocketbase-cloudsave/SKILL.md`
