# The_Devils_Seven_Days

## 程式碼測試

```bash
npm install -g http-server
http-server
```

## 部署

### GitHub Pages（建議）

此專案遊戲檔在 `www/`，不需要搬到根目錄。已提供 workflow：

- `.github/workflows/deploy-pages.yml`

#### 一次性設定

1. 到 GitHub Repo → Settings → Pages。
2. Build and deployment 的 Source 選 `GitHub Actions`。
3. 確認預設分支是 `main`（workflow 目前監聽 `main` push）。

#### 日常部署

只要 push 到 `main`，Actions 會自動把 `www/` 發佈到 GitHub Pages。

#### 網址

- 專案頁面通常是：`https://<你的帳號>.github.io/<repo>/`
- 例如：`https://eric0308a.github.io/The_Devils_Seven_Days/`

若載入舊檔，請先清除瀏覽器快取或重整 Service Worker 快取。

### 測試

```bash
docker build -t the-devils-seven-days:v1.0 .
docker run -d -p 8080:80 --name the-devils-seven-days the-devils-seven-days:v1.0
docker ps
curl http://localhost:8080
```

若 `curl` 輸出包含 HTML 內容（如 `<!DOCTYPE html>`），代表部署測試成功。

```bash
docker logs --tail 50 the-devils-seven-days
docker stop the-devils-seven-days
docker rm the-devils-seven-days
```

### 推送

```bash
docker login
docker tag the-devils-seven-days:v1.0 eric0308a/the-devils-seven-days:v1.0
docker push eric0308a/the-devils-seven-days:v1.0
```

### 拉取

```bash
docker run -d -p 5546:80 eric0308a/the-devils-seven-days:v1.0
```

### docker-compose.yml

```yaml
services:
  the-devils-seven-days:
    image: eric0308a/the-devils-seven-days:v1.0
    container_name: the-devils-seven-days
    restart: always
    ports:
      - "5545:80"
```