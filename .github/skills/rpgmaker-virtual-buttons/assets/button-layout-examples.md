# Virtual Button Layout Examples

## Standard Gamepad Layout (Recommended)

```
        ↑
    ← ↓ | ↓ →

            Z   X
          Shift
```

**CSS Configuration:**
```javascript
const BUTTON_SIZE = 50;
const BUTTON_MARGIN = 15;

// D-pad (bottom-left)
.dpad-up { bottom: MARGIN + SIZE*2; left: MARGIN + SIZE; }
.dpad-down { bottom: MARGIN + SIZE; left: MARGIN + SIZE; }
.dpad-left { bottom: MARGIN + SIZE; left: MARGIN; }
.dpad-right { bottom: MARGIN + SIZE; left: MARGIN + SIZE*2; }

// Action buttons (bottom-right)
.action-z { bottom: MARGIN + SIZE; right: MARGIN + SIZE*1.3; }
.action-x { bottom: MARGIN; right: MARGIN; }

// Modifier (top-right)
.mod-shift { bottom: MARGIN + SIZE*2; right: MARGIN; }
.mod-control { bottom: MARGIN + SIZE*3; right: MARGIN; }
```

---

## Compact Layout (For Smaller Screens)

```
    ↑

  ← ↓ →

    Z X
```

**CSS Configuration:**
```javascript
// Reduce BUTTON_SIZE to 40px
// Increase spacing between button groups

.dpad-up { bottom: 100px; left: $margin + 40px; }
.dpad-down { bottom: 0px; left: $margin + 40px; }
.dpad-left { bottom: 50px; left: $margin; }
.dpad-right { bottom: 50px; left: $margin + 80px; }

.action-z { bottom: 10px; right: 90px; }
.action-x { bottom: 10px; right: 20px; }
```

---

## Minimal Layout (Mobile Portrait)

Only essential controls, no modifiers:

```
    ↑
  ← ↓ →

    Z X
```

**Rationale:** Modifiers rarely needed on mobile. Save screen space.

**CSS:**
```javascript
// Hide modifier buttons
.mod-shift { display: none; }
.mod-control { display: none; }

// Enlarge core buttons for easier touch
.dpad-* { width: 60px; height: 60px; }
.action-* { width: 60px; height: 60px; }
```

---

## Expanded Layout (Tablet)

All buttons with more spacing:

```
                ↑
            ← ↓ | ↓ →
            
                            Z       X
                          Shift   Ctrl
```

**CSS:**
```javascript
// Double the spacing
const BUTTON_SIZE = 70;
const BUTTON_MARGIN = 30;

// Position everything further apart
// Use percentages for responsiveness
.virtual-button.dpad-up {
    bottom: calc(15% + 140px);
    left: calc(10% + 70px);
}
```

---

## Alternative: WASD + Custom Actions

For players familiar with PC controls:

```
        
    W    
  A S D

   Q E
```

**Configuration:**
```javascript
const VIRTUAL_BUTTONS = {
    up: { key: 'w', label: 'W', keyCode: 87 },
    down: { key: 's', label: 'S', keyCode: 83 },
    left: { key: 'a', label: 'A', keyCode: 65 },
    right: { key: 'd', label: 'D', keyCode: 68 },
    action1: { key: 'q', label: 'Q', keyCode: 81 },
    action2: { key: 'e', label: 'E', keyCode: 69 }
};
```

**Note:** Verify these keyCodes exist in your Input.keyMapper or add custom mappings.

---

## Percentage-Based Responsive Layout

Works on any screen size:

```javascript
// Use viewport-relative sizing
.virtual-button.dpad-up {
    width: clamp(40px, 10vw, 80px);
    height: clamp(40px, 10vw, 80px);
    bottom: clamp(100px, 20vh, 200px);
    left: clamp(10px, 5vw, 50px);
}

.virtual-button.action-z {
    bottom: clamp(50px, 10vh, 100px);
    right: clamp(60px, 12vw, 120px);
}
```

---

## Hide/Show Configuration

**Always include a toggle button** for users to hide buttons when not needed:

```javascript
#toggle-buttons-btn {
    position: fixed;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    background: rgba(100, 150, 255, 0.6);
    border: 2px solid white;
    border-radius: 6px;
    color: white;
    font-size: 20px;
    cursor: pointer;
    z-index: 10001;
}
```

**Toggle behavior:**
```javascript
toggleBtn.addEventListener('click', () => {
    container.style.display = 
        container.style.display === 'none' ? 'block' : 'none';
});
```

---

## Customization Tips

### Adjust for Safe Areas (iPhone Notch)

```javascript
// Use viewport-fit: cover in viewport meta
<meta name="viewport" content="viewport-fit=cover" />

// Adjust for safe area insets
.virtual-button.dpad-up {
    bottom: max(15px, env(safe-area-inset-bottom) + 100px);
    left: max(15px, env(safe-area-inset-left) + 50px);
}
```

### Account for Status Bar (Android)

Many Android devices show persistent status bars. Add offset:

```javascript
// Add top margin to avoid overlap
body { margin-top: 24px; }
```

### Test Multiple Screen Sizes

Use browser responsive design mode (F12 → Ctrl+Shift+M) with sizes:
- iPhone SE: 375×667
- iPhone 13: 390×844
- iPad: 810×1080
- Desktop: 1920×1080

---

## Performance Optimization

For large buttons or many buttons:

1. **Use CSS transforms** instead of left/bottom changes:
```css
.virtual-button {
    will-change: transform;
    transition: background 0.1s;
}
```

2. **Consolidate buttons** into single container:
```javascript
// Instead of positioning each individually
container.style.display = 'grid';
container.style.gridTemplate = 'auto auto auto / auto auto auto';
```

3. **Use event delegation**:
```javascript
// Single listener on container instead of per-button
container.addEventListener('touchstart', delegatedHandler);
```

---

## Examples: Copy-Paste CSS

### Gamepad (Standard)
```css
.virtual-button.dpad-up {
    width: 50px;
    height: 50px;
    bottom: 115px;
    left: 65px;
}
.virtual-button.dpad-down {
    width: 50px;
    height: 50px;
    bottom: 15px;
    left: 65px;
}
.virtual-button.dpad-left {
    width: 50px;
    height: 50px;
    bottom: 65px;
    left: 15px;
}
.virtual-button.dpad-right {
    width: 50px;
    height: 50px;
    bottom: 65px;
    left: 115px;
}
.virtual-button.action-z {
    width: 50px;
    height: 50px;
    bottom: 65px;
    right: 115px;
}
.virtual-button.action-x {
    width: 50px;
    height: 50px;
    bottom: 15px;
    right: 15px;
}
```

### Compact (Mobile)
```css
.virtual-button {
    width: 40px !important;
    height: 40px !important;
}
.virtual-button.dpad-up { bottom: 80px; left: 50px; }
.virtual-button.dpad-down { bottom: 0px; left: 50px; }
.virtual-button.dpad-left { bottom: 40px; left: 10px; }
.virtual-button.dpad-right { bottom: 40px; left: 90px; }
.virtual-button.action-z { bottom: 10px; right: 65px; }
.virtual-button.action-x { bottom: 10px; right: 15px; }
```
