# PWA 開發經驗總結

本文檔記錄在實際 PWA 項目中學到的經驗教訓和最佳實踐。

## RPG Maker MV PWA 轉換案例研究

### 項目背景

**目標**：將 RPG Maker MV 遊戲轉換為可跨設備運行的 PWA 應用

**挑戰**：
1. 桌面遊戲適配移動端
2. 音頻格式平台差異
3. 離線支持與快取策略
4. 跨域請求配置

### 關鍵發現

#### 發現 1：平台特定資源格式

**問題描述**：
- RPG Maker MV 根據平台自動選擇不同音頻格式
- 桌面版編輯器僅導出 `.rpgmvo`（OGG 加密）文件
- iOS Safari 請求 `.rpgmvm`（M4A 加密）文件導致 404 錯誤

**錯誤症狀**：
```bash
GET /audio/se/Buzzer1.rpgmvm 404 (Not Found)
GET /audio/bgm/Town1.rpgmvm 404 (Not Found)
```

**根本原因**：
```javascript
// RPG Maker rpg_core.js 中的邏輯
Decrypter.extToEncryptExt = function(url) {
    var ext = url.split('.').pop();
    var encryptExt = null;
    
    if (ext === "ogg") encryptExt = ".rpgmvo";  // Desktop/Android
    else if (ext === "m4a") encryptExt = ".rpgmvm";  // iOS
    
    return url.slice(0, url.lastIndexOf(ext)) + encryptExt;
};

// AudioManager 根據平台自動選擇格式
AudioManager.audioFileExt = function() {
    if (AudioManager.shouldUseHtml5Audio() && Utils.isMobileDevice()) {
        return '.m4a';  // iOS → 請求 .rpgmvm
    } else {
        return '.ogg';  // Desktop → 請求 .rpgmvo
    }
};
```

**學習點**：
- 跨平台應用必須考慮資源格式差異
- 引擎級別的格式選擇邏輯可能導致隱藏的兼容性問題
- 需要深入理解第三方框架的內部實現

#### 發現 2：JavaScript 原型覆蓋模式

**解決方案**：通過覆蓋 WebAudio 原型方法實現降級機制

**實現技術**：
```javascript
// 1. 保存原始方法
var _WebAudio_initialize = WebAudio.prototype.initialize;

// 2. 覆蓋並增強
WebAudio.prototype.initialize = function(url) {
    // 調用原始方法
    _WebAudio_initialize.call(this, url);
    
    // 添加新功能
    this._originalUrl = url;
    this._fallbackUrl = getFallbackUrl(url);
    this._fallbackAttempted = false;
};

// 3. 新增錯誤處理方法
WebAudio.prototype._onLoadError = function() {
    if (this._fallbackUrl && !this._fallbackAttempted) {
        this._fallbackAttempted = true;
        this._load(this._fallbackUrl);  // 嘗試降級
    } else {
        this._createDummyBuffer();  // 優雅失敗
    }
};
```

**學習點**：
- 原型覆蓋可以在不修改原始代碼的情況下增強功能
- 必須保存並調用原始方法以保持向後兼容
- 適用於無法訪問源代碼的第三方庫擴展

**注意事項**：
- 覆蓋過早會失效（在類定義之前）
- 覆蓋過晚會遺漏調用（在實例化之後）
- 最佳時機：類定義之後，實例化之前

#### 發現 3：優雅降級與靜默失敗

**設計原則**：當所有嘗試失敗時，創建虛擬資源而非崩潰

**實現**：
```javascript
WebAudio.prototype._createDummyBuffer = function() {
    try {
        var context = WebAudio._context;
        var sampleRate = context.sampleRate || 44100;
        var duration = 1; // 1 秒靜默
        
        // 創建靜默音頻緩衝區
        this._buffer = context.createBuffer(
            2,                      // 立體聲
            sampleRate * duration,  // 樣本數
            sampleRate              // 採樣率
        );
        
        this._totalTime = duration;
        this._loopLength = duration;
        this._onLoad();  // 標記為加載完成
        
        console.log('[Audio Fallback] Created silent buffer');
    } catch (e) {
        console.error('[Audio Fallback] Failed to create dummy buffer:', e);
    }
};
```

**學習點**：
- 優雅降級：功能受限但應用可用 > 完全崩潰
- 靜默失敗：對於非關鍵資源（音效），靜音繼續遊戲
- 日誌記錄：失敗時仍要記錄，方便調試

**適用場景**：
- 非關鍵資源（音效、圖標、字體）
- 可替代資源（低質量圖片、預設頭像）
- 可選功能（動畫、特效）

#### 發現 4：Service Worker 快取版本管理

**問題**：修改 JavaScript 補丁後，Service Worker 仍提供舊版本

**原因**：
```javascript
// sw.js
const CACHE_NAME = 'game-cache-v1';  // 版本號未變
const CORE_ASSETS = [
  '/js/rpg_core.js',
  '/js/pwa-audio-fallback.js',  // 新增但版本號未變
  // ...
];

// 安裝事件僅在 SW 文件更新時觸發
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    })
  );
});
```

**解決方案**：
```javascript
// 方案 1：更新快取名稱（推薦）
const CACHE_NAME = 'game-cache-v1.1';  // 版本號遞增

self.addEventListener('activate', (event) => {
  // 清理舊快取
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// 方案 2：開發時跳過快取
self.addEventListener('install', (event) => {
  if (DEV_MODE) {
    self.skipWaiting();  // 立即激活新 SW
  }
  // ...
});

// 方案 3：強制更新檢查（客戶端）
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.update();  // 手動檢查更新
  });
}
```

**學習點**：
- Service Worker 更新機制：文件變化 → 安裝 → 等待 → 激活
- 快取版本號必須隨內容更新而遞增
- 開發環境應使用不同的快取策略（禁用或短期）

**最佳實踐**：
```javascript
// 語義化版本號
const VERSION = '1.2.3';
const CACHE_NAME = `game-cache-v${VERSION}`;

// 或使用時間戳（開發環境）
const CACHE_NAME = `dev-cache-${Date.now()}`;

// 或基於 Git commit（自動化部署）
const CACHE_NAME = `cache-${GIT_COMMIT_HASH}`;
```

#### 發現 5：CORS 配置複雜性

**問題**：本地測試正常，部署後出現 CORS 錯誤

**錯誤信息**：
```
Access to audio at 'https://example.com/audio/bgm/Town1.rpgmvo' 
from origin 'https://game.example.com' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present
```

**根本原因**：開發伺服器（如 http-server）默認允許所有來源，生產環境需明確配置

**解決方案比較**：

**Apache (.htaccess)**：
```apache
<IfModule mod_headers.c>
    # 允許所有來源（開發/小型項目）
    Header set Access-Control-Allow-Origin "*"
    
    # 或指定來源（生產環境推薦）
    Header set Access-Control-Allow-Origin "https://game.example.com"
    
    # 允許認證（如需 Cookies）
    Header set Access-Control-Allow-Credentials "true"
    
    # 允許的方法
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    
    # 允許的標頭
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
    
    # 預檢請求快取時間（秒）
    Header set Access-Control-Max-Age "3600"
</IfModule>

# 針對特定文件類型
<FilesMatch "\.(ogg|m4a|rpgmvo|rpgmvm|png|jpg|webp)$">
    Header set Access-Control-Allow-Origin "*"
</FilesMatch>
```

**Nginx**：
```nginx
location / {
    # 允許所有來源
    add_header Access-Control-Allow-Origin *;
    
    # 或使用變量動態設置（生產環境）
    add_header Access-Control-Allow-Origin $http_origin;
    add_header Access-Control-Allow-Credentials true;
    
    # 允許的方法
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
    
    # 允許的標頭
    add_header Access-Control-Allow-Headers "Content-Type, Authorization";
    
    # 處理預檢請求
    if ($request_method = OPTIONS) {
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Max-Age 3600;
        add_header Content-Length 0;
        add_header Content-Type text/plain;
        return 204;
    }
}

# 針對靜態資源
location ~* \.(ogg|m4a|rpgmvo|rpgmvm|png|jpg|webp)$ {
    add_header Access-Control-Allow-Origin *;
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

**Node.js (Express)**：
```javascript
const cors = require('cors');

// 簡單配置
app.use(cors());

// 詳細配置
app.use(cors({
  origin: ['https://game.example.com', 'https://dev.example.com'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600
}));

// 動態配置
app.use(cors({
  origin: function(origin, callback) {
    const whitelist = ['https://game.example.com', 'https://dev.example.com'];
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
```

**學習點**：
- CORS 是伺服器端配置，非客戶端
- `Access-Control-Allow-Origin: *` 方便但不安全（避免用於認證 API）
- 預檢請求（OPTIONS）需特殊處理
- 開發與生產環境應使用不同策略

**安全建議**：
```apache
# 公開資源：允許所有來源
<FilesMatch "\.(png|jpg|css|js)$">
    Header set Access-Control-Allow-Origin "*"
</FilesMatch>

# 敏感資源：指定來源 + 認證
<FilesMatch "\.(json|php|api)$">
    Header set Access-Control-Allow-Origin "https://game.example.com"
    Header set Access-Control-Allow-Credentials "true"
</FilesMatch>
```

#### 發現 6：Canvas 污染錯誤

**問題**：RPG Maker 存檔截圖功能在跨域圖片下失敗

**錯誤信息**：
```
Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': 
Tainted canvases may not be exported.
```

**原因**：
```javascript
// RPG Maker 存檔系統會截取遊戲畫面
Scene_File.prototype.createSnapshot = function() {
    var bitmap = SceneManager.snap();
    // 將 Canvas 轉換為 Data URL
    return bitmap.canvas.toDataURL('image/png');  // ← 這裡失敗
};

// 如果 Canvas 繪製了跨域圖片（未設置 crossOrigin），則被污染
```

**解決方案**：
```javascript
// 方案 1：全局設置（推薦 - RPG Maker）
Bitmap.prototype._image = new Image();
Bitmap.prototype._image.crossOrigin = 'Anonymous';

// 方案 2：修改 Bitmap 類（插件中）
var _Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
    _Bitmap_initialize.call(this, width, height);
    if (this._image) {
        this._image.crossOrigin = 'Anonymous';
    }
};

// 方案 3：針對特定圖片
var img = new Image();
img.crossOrigin = 'Anonymous';  // 必須在設置 src 之前
img.src = 'https://example.com/image.png';
```

**前提條件**：伺服器必須配置 CORS 標頭
```apache
# .htaccess
<FilesMatch "\.(png|jpg|jpeg|gif|webp)$">
    Header set Access-Control-Allow-Origin "*"
</FilesMatch>
```

**學習點**：
- Canvas 安全模型：跨域內容會"污染" Canvas
- 污染後的 Canvas 無法使用 `toDataURL()`, `getImageData()` 等方法
- `crossOrigin = 'Anonymous'` 必須在設置 `src` 之前
- 需要伺服器配合（CORS 標頭）

**調試技巧**：
```javascript
// 檢查圖片是否成功以 CORS 模式加載
img.onload = function() {
    console.log('Image loaded:', img.src);
    console.log('CrossOrigin:', img.crossOrigin);
};

img.onerror = function() {
    console.error('Failed to load with CORS:', img.src);
    // 嘗試不使用 CORS（但會污染 Canvas）
    img.crossOrigin = null;
    img.src = img.src;
};

// 測試 Canvas 是否被污染
try {
    canvas.toDataURL();
    console.log('Canvas is clean');
} catch (e) {
    console.error('Canvas is tainted:', e);
}
```

---

## 通用最佳實踐

### 漸進式實現策略

不要一次性實現所有 PWA 功能，而是分階段迭代：

**階段 1：基礎 PWA**
- [ ] 創建最小化 manifest.json
- [ ] 添加基本圖標（192px, 512px）
- [ ] 註冊 Service Worker（僅安裝事件）
- [ ] 測試可安裝性

**階段 2：離線支持**
- [ ] 實現 Cache First 策略（靜態資源）
- [ ] 創建 offline.html 頁面
- [ ] 測試離線訪問

**階段 3：高級快取**
- [ ] 實現 Network First（動態內容）
- [ ] 實現 Stale While Revalidate（半靜態）
- [ ] 添加快取過期策略

**階段 4：用戶體驗優化**
- [ ] 自定義安裝提示
- [ ] 添加更新通知
- [ ] 實現後台同步（如需）

**階段 5：平台特定優化**
- [ ] 處理平台差異（如本案例的音頻格式）
- [ ] 優化圖標和啟動畫面
- [ ] 測試各平台兼容性

### 調試技巧

#### Chrome DevTools

```javascript
// 1. Application 面板
// - Manifest: 驗證 manifest.json 解析
// - Service Workers: 查看 SW 狀態、更新、卸載
// - Cache Storage: 檢查快取內容
// - Clear storage: 清除所有數據

// 2. Console 過濾
// 僅顯示 SW 相關日誌
console.log('[SW]', 'Message');

// 在 Console 過濾器中輸入：[SW]

// 3. Network 面板
// - Disable cache: 繞過 SW 快取測試
// - 篩選：查看 Service Worker 來源的請求
//   from ServiceWorker: Yes

// 4. Lighthouse 審計
// - PWA 評分
// - 可安裝性檢查
// - 離線支持驗證
// - 性能指標
```

#### Service Worker 生命週期調試

```javascript
// sw.js - 添加詳細日誌
const VERSION = '1.2.0';

self.addEventListener('install', (event) => {
  console.log('[SW] Install', VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching assets');
      return cache.addAll(ASSETS).then(() => {
        console.log('[SW] Assets cached successfully');
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate', VERSION);
  event.waitUntil(
    caches.keys().then((keys) => {
      console.log('[SW] Existing caches:', keys);
      const deleted = keys
        .filter((key) => key !== CACHE_NAME)
        .map((key) => {
          console.log('[SW] Deleting cache:', key);
          return caches.delete(key);
        });
      return Promise.all(deleted);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('[SW] Fetch:', event.request.url);
  // ...
});
```

#### 強制更新 Service Worker

```javascript
// 開發環境：繞過等待，立即激活
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())  // 跳過等待
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())  // 立即控制所有客戶端
  );
});
```

#### 用戶端檢測更新

```javascript
// 檢測新 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    
    // 檢測到更新
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      console.log('New SW found:', newWorker);
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // 新 SW 已安裝但在等待
          showUpdateNotification();
        }
      });
    });
    
    // 定期檢查更新（可選）
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000);  // 每小時
  });
}

function showUpdateNotification() {
  if (confirm('發現新版本，是否立即更新？')) {
    window.location.reload();
  }
}
```

### 性能優化清單

- [ ] **圖標優化**
  - 使用 WebP/AVIF 格式（降級 PNG）
  - 壓縮圖片（TinyPNG, ImageOptim）
  - 按需生成尺寸（不要縮放大圖）

- [ ] **快取策略**
  - 限制快取大小（maxEntries, maxAgeSeconds）
  - 分離快取（按資源類型）
  - 定期清理過期快取

- [ ] **代碼分割**
  - Service Worker 單獨文件（不打包）
  - 按路由分割應用代碼
  - 延遲加載非關鍵資源

- [ ] **預加載**
  - `<link rel="preload">` 關鍵資源
  - `<link rel="prefetch">` 後續頁面
  - Service Worker 預快取靜態資源

- [ ] **壓縮與最小化**
  - Gzip/Brotli 壓縮（伺服器配置）
  - JavaScript/CSS 最小化
  - 移除 source maps（生產環境）

---

## 反模式與陷阱

### 反模式 1：快取所有內容

```javascript
// ❌ 不好：無限制快取
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());  // 快取一切！
          return response;
        });
      });
    })
  );
});

// ✅ 好：選擇性快取
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 僅快取同源靜態資源
  if (url.origin === location.origin && 
      url.pathname.match(/\.(js|css|png|jpg|woff2)$/)) {
    event.respondWith(cacheFirst(event.request));
  }
  // API 請求不快取
  else if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request));
  }
});
```

### 反模式 2：忘記清理舊快取

```javascript
// ❌ 不好：舊快取累積
const CACHE_NAME = 'my-cache-v2';

self.addEventListener('activate', (event) => {
  // 沒有清理邏輯！
});

// ✅ 好：自動清理
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key.startsWith('my-cache-') && key !== CACHE_NAME)
          .map((key) => {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          })
      );
    })
  );
});
```

### 反模式 3：同步操作阻塞主線程

```javascript
// ❌ 不好：同步循環處理大量數據
self.addEventListener('install', (event) => {
  const largeAssetList = [...Array(10000)].map((_, i) => `/img${i}.png`);
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 同時請求 10000 個資源！
      return cache.addAll(largeAssetList);
    })
  );
});

// ✅ 好：分批處理
async function cacheAssetsBatch(cache, urls, batchSize = 50) {
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    await Promise.all(
      batch.map((url) => 
        fetch(url).then((res) => cache.put(url, res))
      )
    );
    console.log(`Cached ${Math.min(i + batchSize, urls.length)}/${urls.length}`);
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 僅預快取關鍵資源
      return cache.addAll(CRITICAL_ASSETS);
    })
  );
});
```

### 反模式 4：依賴 localStorage（PWA 存儲）

```javascript
// ❌ 不好：localStorage 有限且可能被清除
localStorage.setItem('user-data', JSON.stringify(userData));

// ✅ 好：IndexedDB（更大容量，異步）
function saveUserData(userData) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MyAppDB', 1);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const put = store.put(userData);
      
      put.onsuccess = () => resolve();
      put.onerror = () => reject(put.error);
    };
  });
}

// ✅ 或使用 Cache API（更簡單）
function cacheUserData(userData) {
  return caches.open('user-data').then((cache) => {
    const response = new Response(JSON.stringify(userData));
    return cache.put('/user-data', response);
  });
}
```

---

## 測試策略

### 單元測試

```javascript
// sw.test.js - 使用 jest + sw-testing-helpers
import { installSW, activateSW } from '@testing-library/service-worker';

describe('Service Worker', () => {
  it('caches critical assets on install', async () => {
    const sw = await installSW('/sw.js');
    const cache = await caches.open('my-cache-v1');
    const cachedUrls = (await cache.keys()).map((req) => req.url);
    
    expect(cachedUrls).toContain('/index.html');
    expect(cachedUrls).toContain('/styles.css');
  });
  
  it('serves cached content when offline', async () => {
    const sw = await activateSW('/sw.js');
    
    // 模擬離線
    global.fetch = jest.fn(() => Promise.reject('Network error'));
    
    const response = await sw.fetch('/index.html');
    expect(response.ok).toBe(true);
  });
});
```

### 集成測試

```javascript
// Playwright/Puppeteer
test('PWA installs successfully', async ({ page }) => {
  await page.goto('https://myapp.com');
  
  // 等待 Service Worker 註冊
  await page.waitForFunction(() => navigator.serviceWorker.controller);
  
  // 檢查可安裝性
  const isInstallable = await page.evaluate(() => {
    return new Promise((resolve) => {
      window.addEventListener('beforeinstallprompt', () => resolve(true));
      setTimeout(() => resolve(false), 3000);
    });
  });
  
  expect(isInstallable).toBe(true);
});

test('App works offline', async ({ page, context }) => {
  await page.goto('https://myapp.com');
  await page.waitForLoadState('networkidle');
  
  // 切換到離線模式
  await context.setOffline(true);
  
  // 刷新頁面
  await page.reload();
  
  // 驗證頁面仍可訪問
  const title = await page.title();
  expect(title).toBeTruthy();
});
```

### 手動測試檢查清單

- [ ] **桌面 Chrome**
  - [ ] 可安裝（地址欄圖標）
  - [ ] 離線可訪問
  - [ ] Service Worker 更新正常

- [ ] **桌面 Firefox**
  - [ ] 可安裝（地址欄圖標）
  - [ ] 離線可訪問

- [ ] **Android Chrome**
  - [ ] 可添加到主屏幕
  - [ ] 獨立模式運行（無瀏覽器 UI）
  - [ ] 啟動畫面顯示
  - [ ] 主題顏色應用

- [ ] **iOS Safari**
  - [ ] 可添加到主屏幕（分享 → 添加到主屏幕）
  - [ ] 獨立模式運行
  - [ ] 圖標正確顯示
  - [ ] 狀態欄顏色正確

- [ ] **跨瀏覽器**
  - [ ] 功能在不支持 SW 的瀏覽器中降級
  - [ ] Manifest 解析正確
  - [ ] 圖標在所有平台正確顯示

---

## 工具與資源

### 推薦工具

- **Lighthouse**: PWA 審計與評分
- **Workbox**: Google 官方 SW 庫
- **PWA Builder**: 生成 manifest 和 SW
- **Chrome DevTools**: 調試 SW 和快取
- **sw-precache**: 生成預快取 SW（已過時，推薦 Workbox）

### 學習資源

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev: Learn PWA](https://web.dev/learn/pwa/)
- [Google Workbox](https://developers.google.com/web/tools/workbox)
- [Service Worker Cookbook](https://serviceworke.rs/)

### 測試工具

- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci): 持續集成
- [PWA Test](https://www.pwatest.io/): 在線測試
- [BrowserStack](https://www.browserstack.com/): 跨設備測試

---

## 結論

將 RPG Maker MV 遊戲轉換為 PWA 的關鍵成功因素：

1. **深入理解框架內部機制**：RPG Maker 的平台特定音頻選擇邏輯
2. **優雅降級策略**：自動格式降級 + 靜默失敗避免崩潰
3. **原型擴展模式**：在不修改原始代碼的情況下增強功能
4. **完整的 CORS 配置**：伺服器端與客戶端協調
5. **Service Worker 版本管理**：確保更新正確部署
6. **漸進式實現與測試**：分階段迭代而非一次性完成

這些經驗不僅適用於 RPG Maker，也適用於其他需要跨平台兼容的 PWA 項目。
