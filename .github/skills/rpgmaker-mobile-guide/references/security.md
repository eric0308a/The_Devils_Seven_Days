# 安全性保障與代碼保護

## PocketBase API 規則與用戶隔離

### 核心原則

PocketBase 的安全性核心在於「**API Rules**」。開發者不應在前端過度依賴邏輯判斷，而應在後端配置權限過濾器。

### API Rule 示例

#### 存檔隔離規則

```
存檔集合的 updateRule: user = @request.auth.id
```

**效果**：
- 確保每個用戶只能修改自己的存檔
- 即便某個玩家獲取了 API Key，也無法修改或刪除其他玩家的存檔

### 前端代碼保護限制

對於 API Key 的保護，雖然在 JavaScript 代碼中完全隱藏密鑰是不可能的（因為代碼最終會傳送到客戶端執行），但可以透過混淆技術來增加逆向工程的難度：

- **通用混淆器** - obfuscator.io
- **RPG Maker 專用工具** - RPGMaker Data Folder Encrypter

## 數據傳輸加密與防作弊

### TLS/SSL 協議

PocketBase **必須配置 HTTPS 證書**，以防止數據在傳輸過程中被劫持。

### 存檔驗證機制

在雲端存儲前，可以計算存檔數據的雜湊值（Hash）並存入元數據字段。

```javascript
// 計算存檔哈希
const hash = calculateHash(saveData);
pb.collection('saves').update(recordId, {
    saveData: saveData,
    hash: hash
});

// 加載時驗證
const savedHash = record.hash;
const currentHash = calculateHash(loadedData);
if (savedHash !== currentHash) {
    console.warn('存檔已被修改');
}
```

**過程**：
1. 在雲端存儲前計算存檔數據的雜湊值
2. 存入元數據字段
3. 加載時重新計算並對比
4. 檢測存檔是否被本地竄改

### 速率限制

利用 PocketBase 的 auto-cancellation 或自定義請求鎖定機制，防止：
- 惡意用戶頻繁發起存檔請求導致伺服器過載
- 暴力破解試圖

## 安全性檢查清單

- ✓ 配置 HTTPS 證書，啟用 TLS/SSL 加密
- ✓ 設定後端 API Rules 進行用戶隔離（`user = @request.auth.id`）
- ✓ 實施存檔數據雜湊驗證機制
- ✓ 啟用 PocketBase 速率限制
- ✓ 使用代碼混淆器保護 JavaScript 代碼
- ✓ 避免在前端代碼中硬寫敏感密鑰
- ✓ 定期審計存檔訪問邏輯

## 最終安全架構

```
客戶端（RPG Maker Webview）
    ↓ HTTPS + 混淆代碼
雲端（Google Cloud Run + PocketBase）
    ↓ API Rules 驗證 + 速率限制
後端數據庫（SQLite）
    ↓ 雜湊驗證 + 加密存儲
持久層（Google Cloud Storage）
```

每一層都提供不同的安全保護，形成深度防架構。
