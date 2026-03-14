# The_Devils_Seven_Days

## 程式碼測試

```bash
npm install -g http-server
http-server
```

## 部署

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