// Service Worker for RPG Maker MV PWA
// Caches game assets for offline play

const CACHE_NAME = 'devils-seven-days-v4';
const STATIC_ASSETS = [
  './',
  './index.html',
  './js/libs/pixi.js',
  './js/libs/pixi-tilemap.js',
  './js/libs/pixi-picture.js',
  './js/libs/fpsmeter.js',
  './js/libs/lz-string.js',
  './js/rpg_core.js',
  './js/rpg_managers.js',
  './js/rpg_objects.js',
  './js/rpg_scenes.js',
  './js/rpg_sprites.js',
  './js/rpg_windows.js',
  './js/plugins.js',
  './js/main.js',
  './fonts/gamefont.css',
  './data/System.json',
  './data/Actors.json',
  './data/Classes.json',
  './data/Skills.json',
  './data/Items.json',
  './data/Weapons.json',
  './data/Armors.json',
  './data/Enemies.json',
  './data/States.json',
  './data/Tilesets.json',
  './data/Animations.json',
  './data/CommonEvents.json',
  './data/MapInfos.json',
];

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Some assets failed to cache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: network-first for data/saves, cache-first for assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Do not intercept cross-origin requests (e.g. PocketBase API)
  if (url.origin !== self.location.origin) {
    return;
  }

  // Save files: always go network (localStorage is used, not fetch in MV)
  if (url.pathname.includes('/save/')) {
    return;
  }

  // Data files: network-first strategy (fresh game content when online)
  if (url.pathname.includes('/data/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Audio files: cache-first (large files, rarely change)
  if (url.pathname.includes('/audio/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // All other assets: cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Fallback for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
