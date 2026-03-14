# Web App Manifest 詳細指南

## Required Fields

最小化可安裝 PWA 的 manifest.json：

```json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "description": "A description of what the app does",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

## Enhanced Manifest (Full Features)

完整功能配置：

```json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "description": "A full-featured PWA",
  "start_url": "/?source=pwa",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#3367D6",
  "dir": "ltr",
  "lang": "en",
  "categories": ["productivity", "utilities"],

  "icons": [
    { "src": "/icons/icon-72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "/icons/icon-96.png", "sizes": "96x96", "type": "image/png" },
    { "src": "/icons/icon-128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "/icons/icon-144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/icons/icon-152.png", "sizes": "152x152", "type": "image/png" },
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-384.png", "sizes": "384x384", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],

  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],

  "shortcuts": [
    {
      "name": "New Item",
      "short_name": "New",
      "description": "Create a new item",
      "url": "/new?source=shortcut",
      "icons": [{ "src": "/icons/shortcut-new.png", "sizes": "192x192" }]
    }
  ],

  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url",
      "files": [{ "name": "files", "accept": ["image/*"] }]
    }
  },

  "protocol_handlers": [
    {
      "protocol": "web+myapp",
      "url": "/handle?url=%s"
    }
  ],

  "file_handlers": [
    {
      "action": "/open-file",
      "accept": {
        "text/plain": [".txt"]
      }
    }
  ]
}
```

## Manifest Checklist

- [ ] `name` and `short_name` defined
- [ ] `start_url` set (use query param for analytics)
- [ ] `display` set to `standalone` or `fullscreen`
- [ ] Icons: 192x192 and 512x512 minimum
- [ ] Maskable icon included for Android adaptive icons
- [ ] `theme_color` matches app design
- [ ] `background_color` for splash screen
- [ ] Screenshots for richer install UI (optional)
- [ ] Shortcuts for quick actions (optional)

## Field Descriptions

### Core Fields

| Field | Purpose | Example |
|-------|---------|---------|
| `name` | Full app name (appears in install prompt) | "My Awesome App" |
| `short_name` | Short name (home screen, <12 chars) | "MyApp" |
| `description` | App description (app store listings) | "Task management tool" |
| `start_url` | Initial URL when launched | "/?source=pwa" |
| `scope` | URL scope for PWA (default: start_url path) | "/" |
| `display` | Display mode | "standalone" |
| `orientation` | Default orientation | "portrait-primary" |
| `background_color` | Splash screen background | "#ffffff" |
| `theme_color` | Browser UI color | "#3367D6" |

### Display Modes

| Mode | Description | Fallback |
|------|-------------|----------|
| `fullscreen` | Full screen, no browser UI | `standalone` |
| `standalone` | Standalone app, no browser UI | `minimal-ui` |
| `minimal-ui` | Minimal browser UI (back button) | `browser` |
| `browser` | Normal browser tab | N/A |

### Icon Sizes

| Size | Platform | Required |
|------|----------|----------|
| 72x72 | Android small | Optional |
| 96x96 | Android medium | Optional |
| 128x128 | Android large | Optional |
| 144x144 | Android extra large | Optional |
| 152x152 | iOS iPad | Recommended |
| 192x192 | Android | **Required** |
| 384x384 | Android XXXHDPI | Optional |
| 512x512 | Android, Chrome install | **Required** |
| Maskable | Android adaptive icons | **Recommended** |

### Advanced Features

#### Screenshots

Enhance install experience with app previews:

```json
"screenshots": [
  {
    "src": "/screenshots/home.png",
    "sizes": "750x1334",
    "type": "image/png",
    "form_factor": "narrow",
    "label": "Home screen"
  }
]
```

#### Shortcuts

Quick actions from home screen icon:

```json
"shortcuts": [
  {
    "name": "Create New Document",
    "url": "/new",
    "icons": [{ "src": "/icons/new.png", "sizes": "192x192" }]
  }
]
```

#### Share Target

Receive shared content from other apps:

```json
"share_target": {
  "action": "/share",
  "method": "POST",
  "enctype": "multipart/form-data",
  "params": {
    "title": "title",
    "text": "text",
    "url": "url",
    "files": [
      {
        "name": "media",
        "accept": ["image/*", "video/*"]
      }
    ]
  }
}
```

#### Protocol Handlers

Handle custom URL schemes:

```json
"protocol_handlers": [
  {
    "protocol": "web+myapp",
    "url": "/handle?url=%s"
  }
]
```

Example: `web+myapp://action/123` → `/handle?url=web+myapp://action/123`

#### File Handlers

Open specific file types:

```json
"file_handlers": [
  {
    "action": "/open-file",
    "accept": {
      "application/pdf": [".pdf"],
      "text/plain": [".txt", ".md"]
    }
  }
]
```

## Platform-Specific Considerations

### iOS

iOS uses `<meta>` tags in addition to manifest:

```html
<!-- iOS app title -->
<meta name="apple-mobile-web-app-title" content="MyApp">

<!-- Enable standalone mode -->
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- Status bar style -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<!-- iOS icon (no transparency allowed) -->
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">

<!-- iOS splash screens (optional, multiple sizes) -->
<link rel="apple-touch-startup-image" href="/splash/iphone5.png" 
      media="(device-width: 320px) and (device-height: 568px)">
```

### Android

Android-specific features:

```json
{
  "orientation": "any",
  "display_override": ["window-controls-overlay", "minimal-ui"],
  "categories": ["productivity", "business"],
  "iarc_rating_id": "e84b072d-71b3-4d3e-86ae-31a8ce4e53b7"
}
```

## Validation

### Manual Validation

Use Chrome DevTools:
1. Open DevTools (F12)
2. Go to **Application** tab
3. Select **Manifest** in sidebar
4. Check for errors and warnings

### Lighthouse Audit

```bash
npx lighthouse https://your-app.com --view
```

Look for:
- ✅ "Installable" badge
- ✅ All manifest fields parsed correctly
- ⚠️ Warnings about missing optional fields

### Online Tools

- [Web Manifest Validator](https://manifest-validator.appspot.com/)
- [PWA Builder](https://www.pwabuilder.com/)
