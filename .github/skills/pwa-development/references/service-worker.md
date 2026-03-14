# Service Worker 基礎指南

## Basic Service Worker

基本的 Service Worker 實現包含三個生命週期事件：

```javascript
// sw.js
const CACHE_NAME = 'app-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/app.js',
  '/offline.html'
];

// Install: Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: Serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cached) => cached || fetch(event.request))
      .catch(() => caches.match('/offline.html'))
  );
});
```

## Registration

在主應用中註冊 Service Worker：

```javascript
// main.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('SW registered:', registration.scope);
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('New SW found');
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New SW waiting to activate
            console.log('New version available!');
          }
        });
      });
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  });
}
```

## Service Worker Lifecycle

```
┌──────────────────────────────────────────────────────────┐
│  SERVICE WORKER LIFECYCLE                                │
│                                                          │
│  1. REGISTER                                             │
│     navigator.serviceWorker.register('/sw.js')           │
│     ↓                                                    │
│  2. INSTALL                                              │
│     Download SW file                                     │
│     Fire 'install' event                                 │
│     Cache static assets                                  │
│     ↓                                                    │
│  3. WAITING (if old SW exists)                           │
│     Wait for old SW to be unused                         │
│     OR call skipWaiting() to activate immediately        │
│     ↓                                                    │
│  4. ACTIVATE                                             │
│     Fire 'activate' event                                │
│     Clean up old caches                                  │
│     Call clients.claim() to control all pages            │
│     ↓                                                    │
│  5. FETCH                                                │
│     Intercept all network requests                       │
│     Serve from cache or network                          │
└──────────────────────────────────────────────────────────┘
```

## Advanced Patterns

### Immediate Update

跳過等待，立即激活新 Service Worker：

```javascript
// sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())  // Skip waiting
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())  // Take control immediately
  );
});
```

### Update Detection

通知用戶有新版本可用：

```javascript
// main.js
let refreshing = false;

navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (refreshing) return;
  refreshing = true;
  window.location.reload();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // Show update notification
          if (confirm('New version available. Reload to update?')) {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
          }
        }
      });
    });
  });
}

// sw.js - Listen for skip waiting message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

### Periodic Update Check

定期檢查 Service Worker 更新：

```javascript
// main.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    // Check for updates every hour
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000);
  });
}
```

### Navigation Preload

加速導航請求：

```javascript
// sw.js
self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Enable navigation preload
    self.registration.navigationPreload.enable()
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      // Use preloaded response if available
      event.preloadResponse.then((preloadedResponse) => {
        return preloadedResponse || fetch(event.request);
      })
    );
  }
});
```

## Communication

### SW to Client

```javascript
// sw.js - Send message to all clients
self.clients.matchAll().then((clients) => {
  clients.forEach((client) => {
    client.postMessage({
      type: 'UPDATE_AVAILABLE',
      version: '2.0.0'
    });
  });
});

// main.js - Receive message
navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data.type === 'UPDATE_AVAILABLE') {
    console.log('New version:', event.data.version);
  }
});
```

### Client to SW

```javascript
// main.js - Send message to SW
navigator.serviceWorker.controller.postMessage({
  type: 'CLEAR_CACHE',
  cacheName: 'old-cache'
});

// sw.js - Receive message
self.addEventListener('message', (event) => {
  if (event.data.type === 'CLEAR_CACHE') {
    caches.delete(event.data.cacheName);
  }
});
```

## Debugging

### Chrome DevTools

1. **Application > Service Workers**
   - View registration status
   - Update, unregister, or bypass SW
   - See errors and logs

2. **Network Tab**
   - Filter by "from ServiceWorker"
   - See which requests SW handles

3. **Console**
   - View SW logs
   - Check for errors

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| SW not updating | Browser cached old SW | Update CACHE_NAME, hard refresh (Ctrl+Shift+R) |
| SW not installing | Syntax error in sw.js | Check console for errors |
| SW not caching | Assets not in STATIC_ASSETS | Add assets to cache list |
| Offline page not showing | offline.html not cached | Add to STATIC_ASSETS |
| Old content showing | Cache not updating | Implement cache versioning |

### Force Update (Development)

```javascript
// Unregister all service workers
navigator.serviceWorker.getRegistrations().then((registrations) => {
  registrations.forEach((registration) => {
    registration.unregister();
  });
});

// Clear all caches
caches.keys().then((keys) => {
  keys.forEach((key) => {
    caches.delete(key);
  });
});
```

## Best Practices

1. **Version Your Caches**
   ```javascript
   const VERSION = '1.2.3';
   const CACHE_NAME = `app-cache-v${VERSION}`;
   ```

2. **Clean Up Old Caches**
   ```javascript
   self.addEventListener('activate', (event) => {
     event.waitUntil(
       caches.keys().then((keys) => {
         return Promise.all(
           keys
             .filter((key) => key.startsWith('app-cache-') && key !== CACHE_NAME)
             .map((key) => caches.delete(key))
         );
       })
     );
   });
   ```

3. **Handle Errors Gracefully**
   ```javascript
   self.addEventListener('fetch', (event) => {
     event.respondWith(
       caches.match(event.request)
         .then((cached) => cached || fetch(event.request))
         .catch((error) => {
           console.error('Fetch failed:', error);
           return caches.match('/offline.html');
         })
     );
   });
   ```

4. **Use `skipWaiting()` Carefully**
   - Development: Always skip waiting
   - Production: Ask user permission first

5. **Test Offline Behavior**
   - Use Chrome DevTools offline mode
   - Test on real mobile devices
   - Verify all critical assets cached
