---
name: rpgmaker-mobile-guide
description: "Comprehensive guide for implementing RPG Maker MV/MZ games on mobile platforms with cloud integration. Covers mobile-optimized touch controls, PocketBase cloud backend architecture, iOS platform migration via Capacitor/Cordova, and security implementations. Use when: (1) Optimizing RPG Maker games for touch input on mobile devices, (2) Designing and deploying PocketBase backend infrastructure, (3) Implementing cross-device save synchronization with conflict resolution, (4) Migrating RPG Maker games to iOS with WKWebView optimization, (5) Implementing storage persistence strategies for iOS ITP protection, (6) Securing cloud-based game saves and API access control."
---

# RPG Maker 移動端雲端遊戲實現指南

完整的技術指南，用於將 RPG Maker MV/MZ 遊戲推向移動市場，包括觸控交互優化、PocketBase 雲端整合與 iOS 平台遷移。

## 核心實現層次

### 1. 移動端觸控交互優化

見 [touch-controls.md](references/touch-controls.md)

RPG Maker 原生引擎為鍵盤與鼠標設計。實現原生級別手遊體驗需要：

- **虛擬按鍵系統** - ALOE_VirtualButtons + Addon 實現 DPad 和動作按鍵
- **菜單優化** - 單擊執行邏輯，避免觸摸誤操作
- **手勢訊息處理** - 防止操作衝突

### 2. PocketBase 雲端後端

見 [pocketbase-backend.md](references/pocketbase-backend.md)

構建高可靠性的雲端存儲系統：

- **部署架構** - Google Cloud Run + Google Cloud Storage
- **認證管理** - AsyncAuthStore 適配移動端 Webview
- **存檔同步** - 啟動時自動同步與實時備份
- **衝突解決** - LWW vs 抽屜式算法選擇

### 3. iOS 平台遷移

見 [ios-migration.md](references/ios-migration.md)

透過 Capacitor 或 Cordova 將 Web 遊戲封裝為原生 iOS 應用：

- **框架選擇** - Capacitor（現代化）vs Cordova（簡單化）
- **WKWebView 優化** - 渲染、內存、音頻格式
- **iOS 存儲持久化** - 應對 ITP 7 日清理機制

### 4. 安全性保障

見 [security.md](references/security.md)

多層次安全架構：

- **API 規則隔離** - 後端權限過濾
- **傳輸加密** - HTTPS + TLS
- **存檔驗證** - 雜湊驗證機制
- **速率限制** - 防止濫用

## 實現路線圖

### 第一階段：移動端觸控適配

1. 集成 ALOE_VirtualButtons 插件
2. 修復菜單單擊邏輯
3. 測試觸摸交互流暢度

### 第二階段：雲端整合

1. 部署 PocketBase 至 Google Cloud Run
2. 配置 AsyncAuthStore 認證
3. 實現啟動時自動同步邏輯
4. 測試多設備存檔同步

### 第三階段：iOS 打包

1. 選擇打包框架（建議 Capacitor）
2. 集成 WKWebView 相關插件
3. 配置原生持久化存儲
4. 測試存檔恢復流程

### 第四階段：安全加固

1. 啟用 HTTPS 和 API Rules
2. 實施存檔雜湊驗證
3. 配置速率限制
4. 代碼混淆與保護

## 關鍵技術決策

| 決策點 | 選項 | 建議 |
|-------|------|------|
| 打包框架 | Capacitor / Cordova | Capacitor（更現代） |
| 衝突解決 | LWW / Drawer | Drawer（適合累加型數據） |
| 存儲方案 | Preferences / Filesystem | 混合（Token→Preferences, 存檔→Filesystem） |
| 音頻格式 | .ogg / .m4a | .m4a（iOS 優化） |
| 渲染器 | Canvas / WebGL | WebGL（性能更佳） |

## 常見陷阱與解決方案

### ALOE_VirtualButtons 配置失效
**原因**：未定義所有按鍵  
**解決**：確保所有在 ALOE_VirtualButtons.js 中聲明的按鍵都被定義

### iOS 存檔丟失
**原因**：依賴 LocalStorage，觸發 ITP  
**解決**：使用 Capacitor Preferences + Native Filesystem API

### WKWebView XHR 錯誤
**原因**：嚴格同源策略  
**解決**：集成 cordova-plugin-wkwebviewxhrfix

### iOS 啟動時卡在 rpg_managers.js 音訊堆疊
**原因**：音訊副檔名策略或音訊插件覆寫破壞核心 API（例如 `audioFileExt` 非函式）、或 m4a 編碼相容性不足。  
**解決**：優先使用 [../rpgmaker-audio-ios-fix/SKILL.md](../rpgmaker-audio-ios-fix/SKILL.md) 的完整流程（方法型態檢查、OGG→M4A 轉檔、SW 版本升級）。

### 時間戳對比失效
**原因**：PocketBase 日期格式與 JS 不匹配  
**解決**：注意 T 字符與微秒精度轉換

## 工具與資源

- **Capacitor** - 現代化原生框架
- **Cordova** - 傳統跨平台框架
- **PocketBase** - 開源 BaaS 解決方案
- **rclone / s5cmd** - 雲端數據同步工具
- **obfuscator.io** - JavaScript 代碼混淆
- **Xcode + CocoaPods** - iOS 開發環境

## 性能目標

- 觸摸響應時間 < 100ms
- 存檔同步延遲 < 5s
- 首次加載時間 < 3s
- API 請求成功率 > 99%
