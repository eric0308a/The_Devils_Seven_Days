# Caching Strategies 詳細指南

## Strategy Selection Guide

| Strategy | Use Case | Fresh Data | Offline Support | Network Load |
|----------|----------|------------|-----------------|--------------|
| **Cache First** | Static assets (CSS, JS, images) | ❌ Stale | ✅ Excellent | ⭐ Low |
| **Network First** | API responses, dynamic content | ✅ Fresh | ⚠️ Partial | ⭐⭐⭐ High |
| **Stale While Revalidate** | Semi-static (avatars, articles) | ⚠️ Eventually | ✅ Good | ⭐⭐ Medium |
| **Network Only** | Non-cacheable (analytics) | ✅ Always | ❌ None | ⭐⭐⭐ High |
| **Cache Only** | Offline-only assets | ❌ Never updates | ✅ Perfect | ⭐ Zero |

## Strategy Implementations

### Cache First (Offline First)

**Best for**: Static assets that rarely change

```javascript
// Check cache first, fall back to network
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image' ||
      event.request.destination === 'style' ||
      event.request.destination === 'script') {
    event.respondWith(
      caches.match(event.request)
        .then((cached) => {
          if (cached) {
            console.log('[Cache First] Serving from cache:', event.request.url);
            return cached;
          }
          
          console.log('[Cache First] Fetching and caching:', event.request.url);
          return fetch(event.request).then((response) => {
            // Clone response as it can only be consumed once
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
            return response;
          });
        })
    );
  }
});
```

**Pros**:
- Fastest response time
- Works completely offline
- Minimal network usage

**Cons**:
- May serve stale content
- Requires manual cache invalidation

### Network First (Fresh First)

**Best for**: API data, frequently updated content

```javascript
// Try network first, fall back to cache
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          console.log('[Network First] Got fresh data');
          
          // Cache the response for offline use
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
          
          return response;
        })
        .catch(() => {
          console.log('[Network First] Network failed, using cache');
          return caches.match(event.request);
        })
    );
  }
});
```

**Pros**:
- Always fresh when online
- Falls back to cache when offline
- Good for dynamic content

**Cons**:
- Slower (always waits for network)
- Higher network usage
- Bad UX when network is slow

### Stale While Revalidate

**Best for**: Content that's okay to be slightly outdated

```javascript
// Return cache immediately, update in background
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/articles/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cached) => {
          // Fetch fresh data in background
          const fetchPromise = fetch(event.request).then((response) => {
            console.log('[SWR] Updating cache in background');
            cache.put(event.request, response.clone());
            return response;
          });
          
          // Return cached immediately, or wait for network
          console.log('[SWR] Serving:', cached ? 'cache' : 'network');
          return cached || fetchPromise;
        });
      })
    );
  }
});
```

**Pros**:
- Fast response (from cache)
- Automatically updates cache
- Balance between fresh and fast

**Cons**:
- User may see old content briefly
- Slightly higher network usage

### Network Only

**Best for**: Analytics, logging, real-time data

```javascript
// Never cache, always use network
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/analytics/') ||
      event.request.url.includes('/api/realtime/')) {
    event.respondWith(fetch(event.request));
  }
});
```

**Pros**:
- Always fresh data
- Simple implementation

**Cons**:
- No offline support
- Dependent on network

### Cache Only

**Best for**: Pre-cached offline assets

```javascript
// Only serve from cache, never use network
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/offline-assets/')) {
    event.respondWith(caches.match(event.request));
  }
});
```

**Pros**:
- Instant response
- Zero network usage

**Cons**:
- Must be pre-cached
- Never updates

## Combined Strategy

結合多種策略：

```javascript
const CACHE_NAME = 'app-cache-v1';

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Cache First: Static assets
  if (url.pathname.match(/\.(js|css|png|jpg|woff2)$/)) {
    event.respondWith(cacheFirst(event.request));
  }
  
  // Network First: API responses
  else if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(event.request));
  }
  
  // Stale While Revalidate: Pages
  else if (event.request.mode === 'navigate') {
    event.respondWith(staleWhileRevalidate(event.request));
  }
  
  // Network Only: Analytics
  else if (url.pathname.includes('/analytics')) {
    event.respondWith(fetch(event.request));
  }
});

function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    return cached || fetch(request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, response.clone());
        return response;
      });
    });
  });
}

function networkFirst(request) {
  return fetch(request).then((response) => {
    return caches.open(CACHE_NAME).then((cache) => {
      cache.put(request, response.clone());
      return response;
    });
  }).catch(() => caches.match(request));
}

function staleWhileRevalidate(request) {
  return caches.open(CACHE_NAME).then((cache) => {
    return cache.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((response) => {
        cache.put(request, response.clone());
        return response;
      });
      return cached || fetchPromise;
    });
  });
}
```

## Advanced Patterns

### Cache with Timeout

網絡超時後使用快取：

```javascript
function networkFirstWithTimeout(request, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      console.log('[Timeout] Using cache');
      caches.match(request).then(resolve);
    }, timeout);
    
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      console.log('[Network] Got response in time');
      
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, response.clone());
      });
      
      resolve(response);
    }).catch(() => {
      clearTimeout(timeoutId);
      caches.match(request).then(resolve);
    });
  });
}
```

### Cache Expiration

基於時間的快取過期：

```javascript
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

async function cacheFirstWithExpiration(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    const cachedTime = await getCacheTime(request.url);
    const now = Date.now();
    
    if (now - cachedTime < CACHE_EXPIRATION) {
      console.log('[Cache] Fresh enough, using cache');
      return cached;
    } else {
      console.log('[Cache] Expired, fetching fresh data');
    }
  }
  
  const response = await fetch(request);
  await cache.put(request, response.clone());
  await setCacheTime(request.url, Date.now());
  return response;
}

// Store cache times in separate cache
async function setCacheTime(url, time) {
  const cache = await caches.open('cache-times');
  const response = new Response(JSON.stringify({ time }));
  await cache.put(url, response);
}

async function getCacheTime(url) {
  const cache = await caches.open('cache-times');
  const response = await cache.match(url);
  if (response) {
    const data = await response.json();
    return data.time;
  }
  return 0;
}
```

### Conditional Caching

根據條件決定是否快取：

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      // Only cache successful responses
      if (response.status === 200) {
        const clone = response.clone();
        
        // Don't cache if response is too large
        clone.blob().then((blob) => {
          if (blob.size < 5 * 1024 * 1024) { // < 5MB
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
        });
      }
      
      return response;
    })
  );
});
```

### Cache Prioritization

為不同資源設置優先級：

```javascript
const CACHE_PRIORITIES = {
  HIGH: 'high-priority-cache',
  MEDIUM: 'medium-priority-cache',
  LOW: 'low-priority-cache'
};

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  let cacheName;
  
  // Determine cache priority
  if (url.pathname.match(/\.(js|css)$/)) {
    cacheName = CACHE_PRIORITIES.HIGH;
  } else if (url.pathname.match(/\.(png|jpg)$/)) {
    cacheName = CACHE_PRIORITIES.MEDIUM;
  } else {
    cacheName = CACHE_PRIORITIES.LOW;
  }
  
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
```

## Decision Tree

選擇合適的快取策略：

```
Does the content change frequently?
├─ YES → Is fresh data critical?
│   ├─ YES → Network Only
│   └─ NO → Network First
│
└─ NO → Is it a static asset?
    ├─ YES → Cache First
    └─ NO → Is it okay to show stale data briefly?
        ├─ YES → Stale While Revalidate
        └─ NO → Cache Only
```

## Performance Comparison

| Strategy | Initial Load | Subsequent Load | Offline | Network Requests |
|----------|-------------|-----------------|---------|------------------|
| Cache First | Slow (cache miss) | Fast | ✅ | Once |
| Network First | Medium | Medium | ⚠️ | Always |
| Stale While Revalidate | Fast (after first) | Fast | ✅ | Always (background) |
| Network Only | Medium | Medium | ❌ | Always |
| Cache Only | Fast | Fast | ✅ | Never |
