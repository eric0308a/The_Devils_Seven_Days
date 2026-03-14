# RPG Maker MV/MZ PWA 轉換指南

將 RPG Maker 遊戲轉換為跨設備 PWA 的完整實現指南，重點解決音頻兼容性問題。

## 核心挑戰

### 平台特定音頻格式

RPG Maker MV 使用加密音頻系統，根據平台自動選擇不同格式：

```javascript
// RPG Maker Decrypter.extToEncryptExt() 轉換邏輯
Desktop/Android:  .ogg  → .rpgmvo  (OGG 加密)
iOS:             .m4a  → .rpgmvm  (M4A 加密)
```

**問題場景**：
- 開發者僅使用 RPG Maker 桌面版導出遊戲
- 僅生成 `.rpgmvo` 文件（桌面 OGG 加密格式）
- iOS/Safari 請求 `.rpgmvm` 文件導致 404 錯誤
- 遊戲音頻加載失敗甚至崩潰

### 錯誤表現

```bash
# 瀏覽器控制台錯誤
GET http://example.com/audio/se/Buzzer1.rpgmvm 404 (Not Found)
GET http://example.com/audio/bgm/Town1.rpgmvm 404 (Not Found)
```

---

## 解決方案：音頻降級系統

### 架構設計

通過 JavaScript 原型覆蓋實現自動格式降級：

```
請求 .rpgmvm (iOS)
    ↓ 404 錯誤
嘗試 .rpgmvo (桌面)
    ↓ 
成功加載 OR 創建靜默緩衝區（避免崩潰）
```

### 實現步驟

#### 1. 創建音頻降級補丁

創建 `js/pwa-audio-fallback.js`：

```javascript
(function() {
  'use strict';

  // 降級映射表
  var FALLBACK_MAP = {
    '.rpgmvm': '.rpgmvo',  // iOS → 桌面
    '.m4a': '.ogg',        // M4A → OGG
    '.rpgmvo': '.rpgmvm',  // 反向降級（罕見）
    '.ogg': '.m4a'
  };

  // 獲取降級 URL
  function getFallbackUrl(originalUrl) {
    if (!originalUrl) return null;
    
    for (var ext in FALLBACK_MAP) {
      if (originalUrl.endsWith(ext)) {
        return originalUrl.slice(0, -ext.length) + FALLBACK_MAP[ext];
      }
    }
    return null;
  }

  // 覆蓋 WebAudio 初始化
  var _WebAudio_initialize = WebAudio.prototype.initialize;
  WebAudio.prototype.initialize = function(url) {
    _WebAudio_initialize.call(this, url);
    this._originalUrl = url;
    this._fallbackUrl = getFallbackUrl(url);
    this._fallbackAttempted = false;
  };

  // 覆蓋 WebAudio 加載方法
  var _WebAudio_load = WebAudio.prototype._load;
  WebAudio.prototype._load = function(url) {
    this._url = url;
    
    // 注入錯誤處理
    if (this._buffer || this._unlocked) {
      this._onXhrLoad = (function(xhr) {
        if (xhr.status < 400) {
          this._onLoad(xhr.response);
        } else {
          this._onLoadError();
        }
      }).bind(this, new XMLHttpRequest());
    }
    
    _WebAudio_load.call(this, url);
  };

  // 新增錯誤處理方法
  WebAudio.prototype._onLoadError = function() {
    // 嘗試降級 URL
    if (this._fallbackUrl && !this._fallbackAttempted) {
      console.log('[PWA Audio Fallback] Failed:', this._originalUrl);
      console.log('[PWA Audio Fallback] Attempting:', this._fallbackUrl);
      
      this._fallbackAttempted = true;
      this._url = this._fallbackUrl;
      this._load(this._fallbackUrl);
      
    } else {
      // 所有嘗試失敗，創建靜默緩衝區避免崩潰
      console.warn('[PWA Audio Fallback] All attempts failed:', this._originalUrl);
      this._createDummyBuffer();
    }
  };

  // 創建靜默緩衝區
  WebAudio.prototype._createDummyBuffer = function() {
    try {
      var context = WebAudio._context;
      var sampleRate = context.sampleRate || 44100;
      var duration = 1; // 1 秒靜默
      
      this._buffer = context.createBuffer(2, sampleRate * duration, sampleRate);
      this._totalTime = duration;
      this._loopLength = duration;
      this._onLoad();
      
      console.log('[PWA Audio Fallback] Created silent buffer for:', this._originalUrl);
    } catch (e) {
      console.error('[PWA Audio Fallback] Failed to create dummy buffer:', e);
    }
  };

  // 全局測試函數
  window.testAudioFallback = function(audioType, audioName) {
    var path = 'audio/' + audioType + '/' + audioName;
    var audio = AudioManager.createBuffer(audioType, audioName);
    console.log('[Test] Loading audio:', path);
    return audio;
  };

  console.log('[PWA Audio Fallback] Patch loaded successfully');
})();
```

#### 2. 在 index.html 中註冊補丁

確保加載順序正確（在 RPG Maker 核心之後，main.js 之前）：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Game Title</title>
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#000000">
</head>
<body>
    <!-- RPG Maker 核心文件 -->
    <script src="js/libs/pixi.js"></script>
    <script src="js/libs/pixi-tilemap.js"></script>
    <script src="js/libs/fpsmeter.js"></script>
    <script src="js/libs/lz-string.js"></script>
    <script src="js/rpg_core.js"></script>
    <script src="js/rpg_managers.js"></script>
    <script src="js/rpg_objects.js"></script>
    <script src="js/rpg_scenes.js"></script>
    <script src="js/rpg_sprites.js"></script>
    <script src="js/rpg_windows.js"></script>
    <script src="js/plugins.js"></script>
    
    <!-- 音頻降級補丁（關鍵位置）-->
    <script src="js/pwa-audio-fallback.js"></script>
    
    <!-- 遊戲啟動 -->
    <script src="js/main.js"></script>
</body>
</html>
```

#### 3. 更新 Service Worker

將補丁加入快取清單：

```javascript
// sw.js
const CACHE_NAME = 'game-cache-v1.1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/js/pwa-audio-fallback.js',  // 新增
  '/js/rpg_core.js',
  '/js/rpg_managers.js',
  // ... 其他資源
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 記得更新 CACHE_NAME 版本號強制重新快取
```

---

## 測試與驗證

### 控制台測試

在瀏覽器開發者工具中運行：

```javascript
// 測試音效加載
testAudioFallback('se', 'Cursor1');

// 預期輸出（成功降級）：
// [PWA Audio Fallback] Failed: audio/se/Cursor1.rpgmvm
// [PWA Audio Fallback] Attempting: audio/se/Cursor1.rpgmvo
// [PWA Audio Fallback] Loaded successfully: audio/se/Cursor1.rpgmvo
```

### 移動設備測試

1. 啟動開發伺服器：
```bash
cd www
npx http-server -p 8080 --cors
```

2. 查看本機 IP：
```bash
ip addr show | grep "inet " | grep -v 127.0.0.1
# 或
hostname -I
```

3. 在手機瀏覽器訪問：`http://[YOUR_IP]:8080`

4. 檢查音頻行為：
   - **理想**：音效正常播放（降級成功）
   - **可接受**：靜默但遊戲不崩潰
   - **需修復**：遊戲卡死或白屏

---

## RPG Maker 音頻系統深入

### WebAudio vs Html5Audio

RPG Maker 提供兩種音頻引擎：

| 引擎 | 用途 | 特點 |
|------|------|------|
| **WebAudio** | BGM, BGS, ME, SE | 高性能，支持淡入淡出 |
| **Html5Audio** | 降級方案 | 兼容性好，功能較少 |

降級補丁僅處理 WebAudio，因為它是主要引擎。

### AudioManager 工作流程

```javascript
// 1. 創建音頻緩衝區
AudioManager.createBuffer('se', 'Cursor1');
  ↓
// 2. 調用 WebAudio 初始化
WebAudio.prototype.initialize('audio/se/Cursor1.rpgmvm');
  ↓
// 3. 加載文件（我們在此攔截）
WebAudio.prototype._load(url);
  ↓
// 4. 錯誤處理（我們新增的邏輯）
WebAudio.prototype._onLoadError();
  ↓
// 5. 嘗試降級 URL 或創建靜默緩衝區
```

### Decrypter 加密系統

RPG Maker 使用簡單 XOR 加密：

```javascript
// rpg_core.js 中的解密邏輯
Decrypter.decryptArrayBuffer = function(arrayBuffer) {
  var header = new Uint8Array(arrayBuffer, 0, 16);
  var key = header.subarray(12, 16); // 加密密鑰
  
  // 僅加密文件頭（防止格式識別）
  for (var i = 0; i < 16; i++) {
    header[i] = header[i] ^ key[i % 4];
  }
  
  return new Blob([header, new Uint8Array(arrayBuffer, 16)]);
};
```

**安全性注意**：此加密僅用於輕度保護，不應依賴於安全防護。

---

## 完整解決方案（僅桌面文件情況）

### 最佳方案（推薦）

生成完整的音頻文件集：

1. 在 RPG Maker MV 編輯器中：
   - 選擇 `File > Deployment...`
   - 勾選 **iOS** 平台
   - 導出遊戲

2. 複製生成的 `.rpgmvm` 文件到 `audio/` 資料夾

3. 刪除音頻降級補丁（不再需要）

**優點**：
- iOS Safari 原生支持 M4A 格式
- 無需 JavaScript 補丁開銷
- 音質最佳

**缺點**：
- 需要雙倍存儲空間
- 部署檔案更大

### 降級方案（本指南）

僅使用 `.rpgmvo` + 音頻降級補丁：

**優點**：
- 節省存儲空間（50% 減少）
- 無需重新導出遊戲
- 快速修復現有專案

**缺點**：
- iOS Safari 對 OGG 支持有限（可能靜默）
- 需額外 JavaScript 補丁
- 輕微性能開銷

---

## 常見錯誤與解決方案

### 錯誤 1：補丁未生效

**症狀**：仍然看到 404 錯誤，沒有降級嘗試日誌

**原因**：
- 補丁加載順序錯誤（在 rpg_managers.js 之前）
- Service Worker 快取了舊版本

**解決**：
```javascript
// 1. 確認 index.html 加載順序
<script src="js/rpg_managers.js"></script>  <!-- 必須在前 -->
<script src="js/pwa-audio-fallback.js"></script>

// 2. 清除 Service Worker 快取
// Chrome DevTools > Application > Clear storage > Clear site data
```

### 錯誤 2：Service Worker 未更新

**症狀**：修改補丁後，舊版本仍在運行

**原因**：Service Worker 快取未失效

**解決**：
```javascript
// sw.js - 更新版本號
const CACHE_NAME = 'game-cache-v1.1';  // v1.0 → v1.1

// 或強制更新（開發時）
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())  // 立即激活新 SW
  );
});
```

### 錯誤 3：CORS 錯誤

**症狀**：
```
Access to fetch at 'http://example.com/audio/bgm/Town1.rpgmvo' 
has been blocked by CORS policy
```

**原因**：跨域請求未配置

**解決**：

**Apache (.htaccess)**：
```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type"
</IfModule>
```

**Nginx**：
```nginx
location / {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
}
```

**開發伺服器**：
```bash
npx http-server -p 8080 --cors
```

### 錯誤 4：iOS 靜默（OGG 不支持）

**症狀**：降級成功但 iOS 無聲音

**原因**：iOS Safari 不完全支持 OGG Vorbis

**解決**：
1. **臨時方案**：遊戲可玩但無聲
2. **完整方案**：生成 `.rpgmvm` 文件（見上方最佳方案）

### 錯誤 5：Canvas 污染錯誤

**症狀**：
```
Failed to execute 'toDataURL' on 'HTMLCanvasElement': 
Tainted canvases may not be exported
```

**原因**：存檔截圖功能讀取跨域圖片

**解決**：
```javascript
// js/rpg_core.js 或插件中配置
Bitmap.prototype._image = new Image();
Bitmap.prototype._image.crossOrigin = 'Anonymous';  // 啟用 CORS
```

---

## PWA 特定考慮

### Manifest 配置

```json
{
  "name": "RPG Game Name",
  "short_name": "RPG",
  "start_url": "/?source=pwa",
  "display": "fullscreen",          // 全屏遊戲體驗
  "orientation": "landscape",       // RPG 通常橫屏
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Service Worker 快取策略

```javascript
// RPG Maker 遊戲推薦快取策略
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 遊戲資源：Cache First（靜態不變）
  if (url.pathname.match(/\.(js|css|png|jpg|ogg|m4a|rpgmvo|rpgmvm)$/)) {
    event.respondWith(cacheFirst(event.request));
  }
  
  // HTML 頁面：Network First（確保更新）
  else if (url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(networkFirst(event.request));
  }
  
  // 存檔數據：Network Only（避免過期數據）
  else if (url.pathname.includes('/save/')) {
    event.respondWith(fetch(event.request));
  }
});

function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    return cached || fetch(request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, response.clone());
        return response;
      });
    });
  });
}

function networkFirst(request) {
  return fetch(request).then((response) => {
    return caches.open(CACHE_NAME).then((cache) => {
      cache.put(request, response.clone());
      return response;
    });
  }).catch(() => caches.match(request));
}
```

### 離線處理

創建 `offline.html`：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>離線 - 遊戲名稱</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #1a1a1a;
            color: #ffffff;
        }
        .offline-content {
            text-align: center;
            padding: 2rem;
        }
        .icon { font-size: 4rem; margin-bottom: 1rem; }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <div class="offline-content">
        <div class="icon">🎮</div>
        <h1>遊戲已離線</h1>
        <p>請檢查您的網絡連接</p>
        <button onclick="location.reload()">重試</button>
    </div>
    <script>
        // 監測網絡恢復
        window.addEventListener('online', () => {
            location.reload();
        });
    </script>
</body>
</html>
```

在 Service Worker 中註冊：

```javascript
const OFFLINE_PAGE = '/offline.html';

// 安裝時快取離線頁面
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(OFFLINE_PAGE);
    })
  );
});

// Fetch 失敗時顯示離線頁面
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_PAGE);
      })
    );
  }
});
```

---

## 性能優化

### 預加載關鍵音頻

```javascript
// 在遊戲啟動時預加載常用音效
Scene_Boot.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    
    // 預加載系統音效
    AudioManager.loadSystemSound(1);  // Cursor
    AudioManager.loadSystemSound(2);  // OK
    AudioManager.loadSystemSound(3);  // Cancel
    
    DataManager.loadDatabase();
    ConfigManager.load();
    this.loadSystemImages();
};
```

### 延遲音頻解碼

```javascript
// 僅在需要時解碼音頻（降低內存壓力）
WebAudio.prototype._load = function(url) {
    if (!this._shouldDecode()) {
        this._buffer = null;  // 延遲解碼
        return;
    }
    // ... 正常加載邏輯
};

WebAudio.prototype._shouldDecode = function() {
    // 僅當音量 > 0 時解碼
    return this._volume > 0;
};
```

---

## 部署檢查清單

部署 RPG Maker PWA 前確認：

- [ ] **音頻系統**
  - [ ] 測試桌面瀏覽器音頻播放
  - [ ] 測試移動瀏覽器音頻降級
  - [ ] 驗證 iOS Safari 行為（靜默或播放）
  - [ ] 檢查控制台無 404 錯誤

- [ ] **PWA 基礎設施**
  - [ ] manifest.json 配置完整
  - [ ] Service Worker 註冊成功
  - [ ] 離線頁面可訪問
  - [ ] 圖標正確顯示

- [ ] **跨域配置**
  - [ ] CORS 標頭配置正確
  - [ ] 圖片 crossOrigin 啟用（存檔截圖）
  - [ ] 音頻文件可跨域訪問

- [ ] **快取策略**
  - [ ] 遊戲資源快取策略：Cache First
  - [ ] HTML 頁面策略：Network First
  - [ ] 存檔數據策略：Network Only
  - [ ] Service Worker 版本號更新機制

- [ ] **性能測試**
  - [ ] Lighthouse PWA 評分 > 90
  - [ ] 首次加載 < 3 秒（3G 網絡）
  - [ ] 離線模式可玩

- [ ] **用戶體驗**
  - [ ] 安裝提示正常顯示
  - [ ] 全屏模式正確（Standalone）
  - [ ] 橫屏/豎屏方向正確
  - [ ] 加載畫面無閃爍

---

## 進階優化

### 動態導入音頻

```javascript
// 按需加載 BGM（減少初始加載）
AudioManager.playBgm = function(bgm, pos) {
    if (this.isCurrentBgm(bgm)) {
        this.updateBgmParameters(bgm);
    } else {
        this.stopBgm();
        if (bgm.name) {
            // 動態導入
            import(`../audio/bgm/${bgm.name}.rpgmvo`)
                .then(() => {
                    this._bgmBuffer = this.createBuffer('bgm', bgm.name);
                    this.updateBgmParameters(bgm);
                    this._bgmBuffer.play(true, pos || 0);
                });
        }
    }
    this.updateCurrentBgm(bgm, pos);
};
```

### IndexedDB 快取音頻

```javascript
// 使用 IndexedDB 快取解碼後的音頻緩衝區
function storeAudioBuffer(name, buffer) {
    const request = indexedDB.open('GameAudio', 1);
    
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['audio'], 'readwrite');
        const store = transaction.objectStore('audio');
        
        store.put({ name: name, buffer: buffer });
    };
}

function loadAudioBuffer(name, callback) {
    const request = indexedDB.open('GameAudio', 1);
    
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['audio'], 'readonly');
        const store = transaction.objectStore('audio');
        const get = store.get(name);
        
        get.onsuccess = function() {
            callback(get.result ? get.result.buffer : null);
        };
    };
}
```

### Web Worker 音頻解碼

```javascript
// 在 Web Worker 中解碼音頻（避免阻塞主線程）
// audio-worker.js
self.addEventListener('message', function(e) {
    const { arrayBuffer } = e.data;
    
    // 使用 OfflineAudioContext 解碼
    const offlineContext = new OfflineAudioContext(2, 44100, 44100);
    offlineContext.decodeAudioData(arrayBuffer, function(buffer) {
        self.postMessage({ buffer: buffer });
    });
});

// main.js
const audioWorker = new Worker('js/audio-worker.js');
audioWorker.postMessage({ arrayBuffer: encryptedArrayBuffer });
audioWorker.onmessage = function(e) {
    const decodedBuffer = e.data.buffer;
    // 使用解碼後的音頻
};
```

---

## 總結

將 RPG Maker MV 遊戲轉換為跨設備 PWA 的關鍵：

1. **理解平台差異**：桌面使用 .rpgmvo（OGG），iOS 使用 .rpgmvm（M4A）
2. **實現降級機制**：通過原型覆蓋實現自動格式降級
3. **優雅失敗**：無法加載時創建靜默緩衝區避免崩潰
4. **完整測試**：在所有目標平台測試音頻行為
5. **CORS 配置**：確保跨域請求正確配置
6. **快取策略**：遊戲資源使用 Cache First，存檔使用 Network Only

**最佳實踐**：
- 優先生成完整音頻文件集（.rpgmvo + .rpgmvm）
- 降級方案作為快速修復或節省空間的備選
- 始終測試 iOS Safari 行為（OGG 支持有限）
- 監控控制台日誌確認降級系統工作正常
