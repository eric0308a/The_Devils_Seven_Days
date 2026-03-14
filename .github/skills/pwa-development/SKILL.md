````skill
---
name: pwa-development
description: "Progressive Web Apps - service workers, caching strategies, offline support, Workbox integration. Includes specialized guidance for converting game engines (RPG Maker MV/MZ) to PWA with platform-specific audio format handling, cross-origin resource configuration, and Service Worker cache strategies. Use when: (1) Building or converting web apps to PWA, (2) Implementing offline-first functionality, (3) Configuring Service Workers and caching, (4) Converting RPG Maker games to cross-platform PWA, (5) Resolving platform-specific audio format issues (.rpgmvo/.rpgmvm), (6) Setting up CORS for game assets."
---

# PWA Development Skill

**Purpose:** Build Progressive Web Apps that work offline, install like native apps, and deliver fast, reliable experiences across all devices.

---

## Quick Start

### The Three Pillars of PWA

```
1. HTTPS (or localhost for development)
2. SERVICE WORKER (background JavaScript for caching/offline)
3. WEB APP MANIFEST (JSON metadata for installation)
```

### Minimal PWA Checklist

- [ ] Create `manifest.json` with name, icons (192px, 512px), start_url
- [ ] Register Service Worker in main JavaScript
- [ ] Implement basic caching strategy
- [ ] Test on HTTPS or localhost
- [ ] Verify installability in Chrome DevTools

---

## Core Guides

### 📄 Web App Manifest
See [references/manifest.md](references/manifest.md) for:
- Required vs optional fields
- Icon sizes and maskable icons
- Platform-specific considerations (iOS/Android)
- Advanced features (shortcuts, share target)

### ⚙️ Service Worker
See [references/service-worker.md](references/service-worker.md) for:
- Basic service worker implementation
- Lifecycle (install, activate, fetch)
- Registration and update detection
- Communication patterns

### 💾 Caching Strategies
See [references/caching-strategies.md](references/caching-strategies.md) for:
- Cache First (static assets)
- Network First (API data)
- Stale While Revalidate (semi-static)
- Strategy selection guide
- Advanced patterns (timeout, expiration)

### 📦 Workbox
See [references/workbox.md](references/workbox.md) for:
- Vite, Webpack integration
- Precaching with revision management
- Background sync for offline forms
- Plugins (expiration, cacheable response)

---

## Framework Integration

See [references/frameworks.md](references/frameworks.md) for framework-specific setup:

| Framework | Plugin | Complexity |
|-----------|--------|------------|
| **Next.js** | next-pwa | ⭐ Easy |
| **Vite** | vite-plugin-pwa | ⭐ Easy |
| **Create React App** | Built-in | ⭐ Easy |
| **Vue CLI** | @vue/cli-plugin-pwa | ⭐ Easy |
| **SvelteKit** | vite-plugin-pwa | ⭐⭐ Medium |
| **Angular** | @angular/pwa | ⭐ Easy |
| **Nuxt** | @kevinmarrec/nuxt-pwa | ⭐ Easy |

---

## Game Engine Conversion

### RPG Maker MV/MZ

**PRIMARY ISSUE**: Platform-specific audio formats cause 404 errors on mobile

See [references/rpgmaker-pwa.md](references/rpgmaker-pwa.md) for:
- Audio fallback system (.rpgmvm → .rpgmvo)
- WebAudio API prototype overriding
- CORS configuration for game assets
- Service Worker strategies for game resources

**Quick Solution**:
1. Create `js/pwa-audio-fallback.js` patch
2. Override `WebAudio.prototype` to intercept load errors
3. Implement automatic format fallback on 404
4. Create silent buffer for graceful failure

---

## Strategy Selection

###  Decision Tree

```
What type of content?
├─ Static assets (CSS/JS/images) → Cache First
├─ API responses → Network First
├─ Semi-static (articles, avatars) → Stale While Revalidate
├─ Analytics/real-time → Network Only
└─ Offline-only assets → Cache Only
```

### Strategy Comparison

| Strategy | Fresh Data | Offline | Speed | Use Case |
|----------|------------|---------|-------|----------|
| Cache First | ❌ | ✅ | ⚡⚡⚡ | Static assets |
| Network First | ✅ | ⚠️ | 🐌 | API data |
| Stale While Revalidate | ⚠️ | ✅ | ⚡⚡ | Articles, images |
| Network Only | ✅ | ❌ | 🐌 | Analytics |
| Cache Only | ❌ | ✅ | ⚡⚡⚡ | Offline assets |

---

## Project Structure

### Standard PWA

```
project/
├── public/
│   ├── manifest.json           # App metadata
│   ├── sw.js                   # Service worker
│   ├── offline.html            # Offline fallback
│   └── icons/                  # 192px, 512px, maskable
├── src/
│   ├── pwa/
│   │   ├── install.js          # Install prompt handling
│   │   └── offline.js          # Offline detection
│   └── ...
```

### RPG Maker PWA

```
www/
├── index.html                  # Add manifest + SW registration
├── manifest.json               # PWA manifest
├── sw.js                       # Service worker with game assets
├── .htaccess                   # CORS config
├── icons/                      # PWA icons
├── js/
│   ├── pwa-audio-fallback.js  # Audio format fallback
│   ├── rpg_core.js
│   └── main.js
├── audio/                      # .rpgmvo/.rpgmvm files
└── img/                        # Game images (enable crossOrigin)
```

---

## Common Mistakes

| Mistake | Fix | Reference |
|---------|-----|-----------|
| Missing maskable icon | Add icon with `"purpose": "maskable"` | [manifest.md](references/manifest.md) |
| No offline fallback | Create `offline.html` and cache it | [service-worker.md](references/service-worker.md) |
| Cache never expires | Use `ExpirationPlugin` with Workbox | [workbox.md](references/workbox.md) |
| SW caches too aggressively | Use appropriate strategy per resource type | [caching-strategies.md](references/caching-strategies.md) |
| No update mechanism | Implement `skipWaiting()` + reload prompt | [service-worker.md](references/service-worker.md) |
| Broken install prompt | Ensure manifest meets all criteria | [manifest.md](references/manifest.md) |
| No HTTPS in production | Configure SSL certificate | - |
| Large cache size | Set `maxEntries` and `maxAgeSeconds` | [workbox.md](references/workbox.md) |
| Stale API responses | Use `NetworkFirst` for dynamic data | [caching-strategies.md](references/caching-strategies.md) |
| Missing start_url tracking | Add query param: `/?source=pwa` | [manifest.md](references/manifest.md) |
| **RPG Maker: 404 audio errors** | Implement audio fallback (.rpgmvm → .rpgmvo) | [rpgmaker-pwa.md](references/rpgmaker-pwa.md) |
| **RPG Maker: Tainted canvas** | Add `crossOrigin = 'Anonymous'` to images | [rpgmaker-pwa.md](references/rpgmaker-pwa.md) |
| **RPG Maker: Silent on iOS** | Generate .rpgmvm files or accept silent fallback | [rpgmaker-pwa.md](references/rpgmaker-pwa.md) |

---

## PWA Development Checklist

### Before Launch

- [ ] **HTTPS** configured (production)
- [ ] **Manifest** complete with all required fields
- [ ] **Icons** in all required sizes (192, 512, maskable)
- [ ] **Service worker** registered and working
- [ ] **Offline page** created and cached
- [ ] **Cache strategies** defined for all resource types
- [ ] **Install prompt** handling implemented
- [ ] **Lighthouse PWA audit** passes (score > 90)

### After Launch

- [ ] Monitor cache sizes
- [ ] Test SW updates don't break app
- [ ] Track PWA installs via analytics
- [ ] Test on multiple devices/browsers
- [ ] Monitor Core Web Vitals
- [ ] Set up push notification flow (if needed)

### Testing Checklist

- [ ] **Desktop Chrome**: Installable, offline works
- [ ] **Android Chrome**: Add to home screen, standalone mode
- [ ] **iOS Safari**: Add to home screen, icons correct
- [ ] **Firefox**: Basic functionality
- [ ] **Offline mode**: All critical features work
- [ ] **Slow network**: App remains usable

---

## Quick Reference

### Caching Strategy Cheat Sheet

```
Static Assets (CSS, JS, images)     → Cache First
API Responses                        → Network First
User-generated content              → Stale While Revalidate
Analytics, non-cacheable            → Network Only
Offline-only assets                 → Cache Only
```

### Manifest Minimum

```json
{
  "name": "App Name",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Basic Service Worker

```javascript
const CACHE = 'app-v1';
const ASSETS = ['/', '/index.html', '/app.js', '/styles.css'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
```

### Service Worker Lifecycle

```
1. Register → 2. Install → 3. Activate → 4. Fetch
     ↓              ↓            ↓           ↓
  Load SW    Cache assets  Clean old   Intercept
                            caches      requests
```

---

## Additional Resources

### Experience & Lessons Learned
See [references/lessons-learned.md](references/lessons-learned.md) for:
- Real-world case studies
- Common anti-patterns
- Debugging strategies
- Performance optimization
- Testing approaches

### Tools & Libraries

- **Lighthouse**: PWA audit and scoring
- **Workbox**: Google's Service Worker library
- **PWA Builder**: Generate manifest and icons
- **Chrome DevTools**: Debug SW and cache

### Testing

```bash
# Lighthouse audit
npx lighthouse https://your-app.com --view

# Local testing with CORS
npx http-server -p 8080 --cors
```

---

## Getting Help

**Common Issues**:
1. **SW not installing**: Check console for syntax errors
2. **Old content showing**: Update CACHE_NAME and clear old caches
3. **CORS errors**: Configure server headers (see rpgmaker-pwa.md)
4. **Canvas tainted**: Add `crossOrigin = 'Anonymous'` to images

**Debug Steps**:
1. Open Chrome DevTools → Application tab
2. Check Service Workers section for status/errors
3. Check Manifest section for validation
4. Check Cache Storage for cached resources
5. Use Network tab with "Disable cache" off to see SW serving

---

## Summary

PWA development follows a progressive enhancement approach:

1. **Start Simple**: Basic manifest + minimal SW
2. **Add Offline**: Implement appropriate caching strategies
3. **Enhance UX**: Install prompts, update notifications
4. **Optimize**: Performance, cache expiration, background sync
5. **Platform-Specific**: Handle edge cases (iOS, game engines)

Refer to the detailed guides in `references/` for implementation specifics.
````
