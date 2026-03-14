# PocketBase 雲端後端架構設計與整合

## 基礎設施部署與持久化配置

### 核心部署架構

為了實現自動同步與全球存取，將 PocketBase 部署於雲端環境（如 Google Cloud Run）是理想選擇。透過掛載 Google Cloud Storage Bucket，可以實現大規模的數據持久化。

| 部署參數 | 推薦配置 | 技術影響 |
|---------|---------|---------|
| 運行平台 | Google Cloud Run | 提供容器化環境，支持自動擴展與負載均衡 |
| 持久化層 | Google Storage Bucket | 確保 pb_data 目錄在容器重啟後依然存在 |
| 權限控制 | Allow unauthenticated invocations | 允許客戶端 SDK 直接訪問 API，但需透過後端規則保護數據 |
| 最大實例數 | 1（推薦） | 對於嵌入式 SQLite，單一寫入者能有效避免資料庫鎖死問題 |

### 數據遷移工具

可以使用以下 CLI 工具將本地開發的 pb_data 遷移至雲端存儲桶：
- **rclone** - 通用雲端存儲同步工具
- **s5cmd** - S3 兼容的高速傳輸工具

確保目錄結構作為對象前綴被正確保留，保證開發環境與生產環境的數據一致性。

## JavaScript SDK 在 RPG Maker 中的深度整合

### SDK 初始化與認證存儲

RPG Maker 的遊戲邏輯主要運行於瀏覽器環境或 Node.js 環境（NW.js），而 PocketBase SDK 對這兩者皆有良好支持。

在移動端 Webview 環境下，默認的 LocalAuthStore（基於 localStorage）可能會因為沙盒策略而變得不可靠。因此，必須使用 **AsyncAuthStore** 來對接移動端的持久化存儲層（如 AsyncStorage 或 Capacitor 的 Preferences）。

```javascript
import PocketBase, { AsyncAuthStore } from 'pocketbase';

const store = new AsyncAuthStore({
    save: async (serialized) => {
        // 使用原生持久化 API 保存認證信息
        NativeStorage.set('pb_auth', serialized);
    },
    initial: NativeStorage.get('pb_auth'),
});

const pb = new PocketBase('https://your-pocketbase-url.com', store);
```

### 全局 SDK 實例管理

在遊戲生命週期中，建議維護一個全局唯一的 SDK 實例，以處理所有關於用戶登錄、存檔上傳與數據拉取的請求。

### 跨平台文件上傳兼容性

對於文件上傳（如保存遊戲截圖或自定義存檔文件），React Native 或 Webview 下的 FormData 實現可能存在差異。需使用特定的對象語法（包含 uri, type, name）來確保跨平台兼容性。

## 雲端存檔同步邏輯

### 啟動時自動同步（Auto-sync on Start）

實現啟動時自動同步的核心挑戰在於如何優雅地處理異步網絡請求與 RPG Maker 啟動序列（Scene_Boot）之間的同步關係。

#### 啟動序列掛鈎機制

重寫 Scene_Boot 的 `isReady` 方法，在遊戲進入標題畫面之前，優先向 PocketBase 查詢當前用戶的最新存檔記錄。

#### 查詢與同步步驟

1. **查詢最新元數據** - 透過 `pb.collection('saves').getList(1, 1, { sort: '-updated' })` 獲取雲端最近一次更新的存檔信息
2. **時間戳對比** - 將雲端的 updated 字段與本地存檔文件的修改時間進行對比
3. **異步下載與重寫** - 若雲端數據較新，則調用 StorageManager 的寫入接口，將下載的內容覆蓋本地存檔文件

#### 時間格式注意事項

由於 PocketBase 的日期格式為 `Y-m-d H:i:s.uZ`，在進行時間對比時，需特別注意 JavaScript Date 對象的 ISO 字符串轉換細節，避免因為T字符或微秒精度導致的對比失效。

### 存檔寫入與實時備份

當玩家在遊戲中執行存檔操作時，系統會觸發 `StorageManager.saveObject`（MZ）或 `StorageManager.save`（MV）。此時，應在本地保存成功的基礎上，發起異步請求將數據推送到雲端。

| 同步步驟 | 執行函數 | 技術要點 |
|---------|---------|---------|
| 存檔截取 | StorageManager.saveToLocalFile | 在文件寫入本地文件系統後立即觸發雲端同步 |
| 數據打包 | StorageManager.objectToJson | 將存檔對象序列化為 JSON，必要時進行 Gzip 壓縮 |
| 雲端上傳 | pb.collection('saves').update | 使用 update 而非 create 來節省空間，確保每個存檔位對應唯一雲端記錄 |

#### 特殊環境兼容性

部分環境（如 Steam 的 Greenworks 整合）可能不支持二進制文件的直接傳輸。此時需要：
- 將壓縮後的二進制數據轉換為 Base64 字符串，或
- 關閉 Gzip 壓縮改以純文本形式保存（文件體積會增加約 9 倍，但在目前的網絡環境下通常是可以接受的）

## 衝突解決策略

### 場景背景

在多設備切換（如 iPhone 與 iPad 之間）的場景下，可能會出現本地與雲端數據互不包含的情況。

### 解決方案對比

#### 最後寫入者勝（Last Write Wins, LWW）
最常見的策略，適用於大多數場景。

#### 抽屜式算法（Drawer Solution）
對於金幣、等級或解鎖項等**累加型數據**更為優化。

該算法會紀錄每個設備產生的增量（Delta），在同步時計算所有設備增量的並集：

$$ V_{resolved} = V_{initial} + \sum Delta_{device_n} $$

**優勢**：有效防止玩家在斷網情況下遊玩產生的進度被另一台設備覆蓋掉。

## PocketBase API 規則與數據隔離

PocketBase 的安全性核心在於「**API Rules**」。開發者不應在前端過度依賴邏輯判斷，而應在後端配置權限過濾器。

例如，存檔集合的 updateRule 應設定為 `user = @request.auth.id`，這確保了即便某個玩家獲取了 API Key，也無法修改或刪除其他玩家的存檔。
