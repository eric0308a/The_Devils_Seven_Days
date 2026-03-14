---
name: docker-static-pwa-deploy
description: >
  Containerize and deploy a static PWA (e.g. RPG Maker MV/MZ web export) with Nginx on Docker.
  Use when: (1) creating a Dockerfile to serve a static www/ folder, (2) building/running a
  Docker image for local testing or push to Docker Hub, (3) troubleshooting Docker image name
  errors ("repository name must be lowercase"), or (4) verifying the deployment pipeline
  (build → run → health-check → stop/clean).
---

# Docker Static PWA Deploy

Serve a static PWA (the `www/` folder of an RPG Maker MV/MZ game) with nginx inside Docker.

## Critical Rules

1. **Image/container names must be all-lowercase** – Docker rejects any uppercase letter or
   underscore in a repository name.  
   - Wrong: `The_Devils_Seven_Days:v1.0`  
   - Right: `the-devils-seven-days:v1.0`

2. **Use nginx:alpine** – smallest stable image, no runtime compilation needed.

3. **Exclude save data from the image** – never bake `www/save/` into a production image;
   add it to `.dockerignore`.

---

## Standard Files

### Dockerfile

```dockerfile
FROM nginx:1.27-alpine

# Serve RPG Maker MV PWA static files.
COPY www/ /usr/share/nginx/html/

EXPOSE 80
```

### .dockerignore

```
.git
.gitignore
README.md
node_modules
npm-debug.log*
www/save
```

---

## Deployment Workflow

### 1. Build

```bash
docker build -t <image-name>:<tag> .
# e.g.  docker build -t the-devils-seven-days:v1.0 .
```

### 2. Local Test

```bash
docker run -d -p 8080:80 --name <container-name> <image-name>:<tag>
docker ps
curl http://localhost:8080   # expect HTTP 200 with <!DOCTYPE html>
```

### 3. Review Logs & Clean Up

```bash
docker logs --tail 50 <container-name>
docker stop <container-name>
docker rm   <container-name>
```

### 4. Push to Docker Hub

```bash
docker login
docker tag  <image-name>:<tag> <hub-user>/<image-name>:<tag>
docker push <hub-user>/<image-name>:<tag>
```

### 5. Pull & Run (remote)

```bash
docker run -d -p 5548:80 <hub-user>/<image-name>:<tag>
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `repository name must be lowercase` | Capital letters or `_` in image/container name | Rename to lowercase with `-` only, e.g. `my-game:v1` |
| `port is already allocated` | Host port already in use | Change `-p 9090:80` or stop existing container |
| Game 404 on sub-path | Nginx config missing try_files | Add `try_files $uri $uri/ /index.html;` in nginx.conf |
| Stale PWA cache after update | Service Worker caches old assets | Bump `CACHE_NAME` in `service-worker.js` before rebuild |

---

## Optional: docker-compose.yml

For one-command local start:

```yaml
services:
  game:
    image: the-devils-seven-days:v1.0
    build: .
    ports:
      - "8080:80"
```

```bash
docker compose up --build -d
```
