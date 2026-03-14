FROM nginx:1.27-alpine

# Serve RPG Maker MV PWA static files.
COPY www/ /usr/share/nginx/html/

EXPOSE 80
