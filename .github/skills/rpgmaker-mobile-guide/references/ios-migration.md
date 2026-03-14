# iOS 平台遷移：Capacitor 與 Cordova 實踐

## 環境配置與項目初始化

### 初始化步驟

將 RPG Maker 遊戲打包為 iOS 應用，實質上是將 Web 程序封裝進一個高度優化的原生容器中。

1. **導出為 Web 版本** - 將 RPG Maker 遊戲導出為 Web/Browser 版本
2. **安裝開發環境** - 在 macOS 環境下安裝 Xcode 並配置 CocoaPods
3. **選擇打包框架** - Capacitor 或 Cordova

### Capacitor vs Cordova 對比

#### Capacitor 流程與優勢
```bash
npm install @capacitor/ios
npx cap add ios
```

**優勢**：
- 將原生項目視為源代碼資產
- 開發者可以直接在 Xcode 中進行 Swift 代碼編寫或權限配置
- 更現代的架構設計

#### Cordova 流程與優勢
```bash
cordova platform add ios
```

**特點**：
- 透過 config.xml 進行聲明式管理
- 適合不熟悉 Swift 的開發者

## WKWebView 的性能調優與沙盒限制

### 必要插件集成

針對 iOS 的特殊性，建議集成 **cordova-plugin-wkwebviewxhrfix** 插件。

**問題**：由於 WKWebView 遵循嚴格的同源策略，加載本地 JSON 存檔或資源文件時常會觸發 XHR 錯誤。

**解決方案**：該插件能有效繞過此類 CORS 限制。

### 性能瓶頸與優化

在 iOS 上運行 RPG Maker 遊戲時，性能瓶頸往往出現在 Pixi.js 的渲染效率與音頻解碼上。

#### 渲染器選擇
在 iOS 上應優先使用 **WebGL 渲染器**。可透過插件 **YAN_SetRenderer.js** 進行強制設定。

#### 內存管理
移動設備的 RAM 接觸極限時會觸發 WebContent 進程重啟。應避免：
- 過大的地圖分區
- 並行事件重負荷的地圖

#### 音頻格式標準化
確保所有音頻資源均包含 **.m4a 格式**，因為 iOS 的原生 Webview 對 .ogg 支持並不完善。

## iOS 存儲清理策略（ITP）與持久化方案

### ITP 機制威脅

iOS 的 WebKit 引擎引入了「**智能跟蹤預防**」（Intelligent Tracking Prevention, ITP）機制，這對基於瀏覽器存儲的存檔系統構成了重大挑戰。

### 七天過期機制與數據丟失風險

根據 Apple 的策略：
- 如果用戶在七天內沒有與特定應用的網頁內容發生交互
- 系統可能會自動清理該 Origin 下的所有「腳本可寫存儲」（Script-writable storage）
- 這包括 **LocalStorage** 和 **IndexedDB**

**對 RPG Maker 遊戲的影響**：玩家若一週沒玩，存檔就有可能消失。

### 持久化存儲技術對策

為了確保數據的絕對安全，開發者必須超越傳統的 Web 存儲 API。

| 技術方案 | 持久化級別 | 適用場景 |
|---------|----------|---------|
| navigator.storage.persist() | 高 | 請求系統標記數據為「持久性」，即使在低磁碟空間時也不會被自動刪除 |
| Capacitor Preferences | 極高 | 使用 iOS 原生的 UserDefaults。數據存儲於 OS 層級，僅在卸載應用時刪除 |
| Cordova NativeStorage | 極高 | 類似 Preferences，透過插件將數據存入原生持久化層 |
| Native Filesystem API | 極高 | 直接操作 iOS 的沙盒文件夾（Documents/Library），適合保存體積較大的存檔文件 |

### 推薦實現策略

在實現中，建議採用**分層持久化方案**：

1. **OS 層級存儲**
   - PocketBase 的登錄令牌（Token）→ Preferences
   - 最核心的系統設置 → Preferences

2. **沙盒文件系統**
   - 具體的遊戲狀態 → Native Filesystem API

3. **雲端備份**
   - 同時備份至雲端

### 恢復流程

即使 WKWebView 的緩存被清理，程序啟動後仍能：
1. 從原生層級讀取 Token（Preferences）
2. 從 PocketBase 自動恢復存檔
3. 確保玩家進度不會丟失

## 持久化檢查清單

- ✓ 集成 cordova-plugin-wkwebviewxhrfix 避免 CORS 問題
- ✓ 使用 YAN_SetRenderer.js 強制 WebGL 渲染
- ✓ 確保所有音頻備有 .m4a 格式
- ✓ 設定 navigator.storage.persist() 標記數據為持久
- ✓ 使用 Capacitor Preferences 或 NativeStorage 保存 Token
- ✓ 使用 Native Filesystem API 保存遊戲狀態
- ✓ 配置雲端備份（PocketBase）作為最後防線
