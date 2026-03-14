# Troubleshooting Guide - Virtual Buttons

## Error: "Input._pressedKeys is undefined"

**Symptom:** TypeError when clicking buttons, console shows "can't access property 40, Input._pressedKeys is undefined"

**Root cause:** Code assumes `Input._pressedKeys` property exists. It doesn't in RPG Maker MV.

**Solution:**
1. Remove all references to `Input._pressedKeys`
2. Use only `Input._currentState` 
3. Verify button names come from `Input.keyMapper[keyCode]`
4. Use pattern:
```javascript
const buttonName = Input.keyMapper[keyCode];
if (buttonName) {
    Input._currentState[buttonName] = isPressed;
}
```

**Prevention:** Read [input-system.md](input-system.md) before implementing. Never assume properties exist.

---

## Error: "Input system not ready after 5 seconds"

**Symptom:** Warning in console, buttons created but don't work

**Root cause:** Input object not initializing. Usually means rpg_core.js loads after plugins.js.

**Solution:**
1. Check script load order in index.html - rpg_core.js should load BEFORE plugins.js
2. Verify VirtualButtons.js loads BEFORE plugins.js
3. Check HTML for script tags in correct order:
```html
<script src="js/rpg_core.js"></script>
...
<script src="js/plugins/VirtualButtons.js"></script>
<script src="js/plugins.js"></script>
<script src="js/main.js"></script>
```

**Verify:** Open DevTools Console and run `typeof Input` - should return "object", not "undefined"

---

## Buttons Visible But Input Doesn't Register

**Symptom:** Virtual buttons appear on screen but character doesn't move when clicked

**Common causes:**

### Cause 1: CSS pointer-events blocking input
```javascript
// ✓ Correct
.virtual-button { pointer-events: auto; }
#virtual-buttons-container { pointer-events: none; }

// ✗ Wrong
.virtual-button { pointer-events: none; }
```

**Solution:** Verify container has `pointer-events: none` and buttons have `pointer-events: auto`

### Cause 2: Touch events not bound correctly
**Solution:** Verify touchstart/touchend listeners registered:
```javascript
button.addEventListener('touchstart', (e) => { 
    e.preventDefault(); 
    simulateKeyPress(keyCode, true); 
});
button.addEventListener('touchend', (e) => { 
    e.preventDefault(); 
    simulateKeyPress(keyCode, false); 
});
```

### Cause 3: Input._currentState not being modified
**Solution:** 
1. Add debug logging: `console.log(Input._currentState)` after button click
2. If state doesn't change, Input reference is wrong
3. Try accessing Input from Window: `window.Input` instead of just `Input`

**Debug code:**
```javascript
button.addEventListener('touchstart', (e) => {
    console.log('Button pressed, Input state before:', Input._currentState);
    simulateKeyPress(keyCode, true);
    console.log('Button pressed, Input state after:', Input._currentState);
});
```

---

## Touch Events Penetrate Through Buttons to Game Canvas

**Symptom:** 
- Character moves when clicking virtual buttons positioned over game area
- Clicking directional buttons causes both button action AND unintended game canvas click
- Menu opens when pressing action buttons
- Multiple actions triggered from single button press

**Root cause:** Touch events propagate through DOM layers from buttons down to the underlying game canvas. Without proper event propagation controls:
1. Touch event fires on virtual button
2. Event bubbles up through DOM tree
3. Event reaches game canvas element
4. Game canvas processes the touch as if user clicked the canvas directly
5. Results in duplicate/unintended actions

This is especially problematic when:
- Directional buttons overlay the game area (movement triggers twice)
- Action buttons positioned over interactive game elements
- Any button overlaps clickable game regions

**Solution - Complete Event Isolation:**

```javascript
function addButtonEventListeners(button, key) {
    function handleEvent(e) {
        // ALL THREE REQUIRED - missing any allows penetration:
        e.preventDefault();           // Stops default browser behavior
        e.stopPropagation();          // Stops bubbling to parent elements  
        e.stopImmediatePropagation(); // Stops other listeners on same element
        
        // Now safe to handle button logic
        if (e.type === 'touchstart' || e.type === 'mousedown' || e.type === 'pointerdown') {
            simulateKeyPress(key, true);
        } else {
            simulateKeyPress(key, false);
        }
    }
    
    // MUST apply to ALL event types - missing even one causes penetration:
    button.addEventListener('touchstart', handleEvent);
    button.addEventListener('touchmove', handleEvent);    // Critical for drag
    button.addEventListener('touchend', handleEvent);
    button.addEventListener('touchcancel', handleEvent);   // Handle interruptions
    button.addEventListener('mousedown', handleEvent);
    button.addEventListener('mouseup', handleEvent);
    button.addEventListener('click', handleEvent);         // Synthetic clicks
    button.addEventListener('pointerdown', handleEvent);   // Modern unified events
    button.addEventListener('pointerup', handleEvent);
}
```

**Why all three stoppers are required:**

- `preventDefault()` - Stops default behaviors (scrolling, text selection, context menu), but doesn't stop propagation
- `stopPropagation()` - Stops event from bubbling to parent elements, but other listeners on same element still fire
- `stopImmediatePropagation()` - Stops other listeners on same element, ensures complete isolation

**Common mistakes:**

```javascript
// ✗ WRONG - Missing stopPropagation():
button.addEventListener('touchstart', (e) => {
    e.preventDefault();
    // Event still bubbles to canvas!
});

// ✗ WRONG - Inconsistent application:
button.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
});
button.addEventListener('touchend', (e) => {
    e.preventDefault();
    // Missing stopPropagation - touchend penetrates!
});

// ✗ WRONG - Missing event types:
// Only handling touchstart/touchend
// Click event still penetrates on some devices

// ✓ CORRECT:
function handleEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
}
button.addEventListener('touchstart', handleEvent);
button.addEventListener('touchmove', handleEvent);
button.addEventListener('touchend', handleEvent);
button.addEventListener('touchcancel', handleEvent);
button.addEventListener('mousedown', handleEvent);
button.addEventListener('mouseup', handleEvent);
button.addEventListener('click', handleEvent);
button.addEventListener('pointerdown', handleEvent);
button.addEventListener('pointerup', handleEvent);
```

**Debug verification:**

```javascript
// Test if events are penetrating:
const canvas = document.querySelector('canvas');
canvas.addEventListener('touchstart', (e) => {
    console.log('Canvas touched at:', e.touches[0].clientX, e.touches[0].clientY);
    console.log('Target:', e.target);
}, { capture: true });

// If you see canvas touches when clicking buttons, events are penetrating
```

**Testing checklist:**

1. ✓ Click directional buttons over game area - character should move only in button direction
2. ✓ Hold button and drag finger away - should not trigger canvas touches
3. ✓ Rapid tap buttons - should not cause double actions
4. ✓ Test on both touch devices AND mouse - both should work without penetration
5. ✓ Test action buttons over interactive game elements - only button should trigger

**Additional CSS safeguard:**

```css
/* Extra protection - make buttons capture all pointer events */
.virtual-button {
    pointer-events: auto !important;
    touch-action: none;  /* Prevent browser gestures */
}

#virtual-buttons-container {
    pointer-events: none;  /* Allow clicks through container */
}
```

**Prevention:** When implementing any virtual button system, ALWAYS include complete event stopping from the start. It's much harder to debug penetration issues after implementation than to prevent them initially.

---

## Character Moves Wrong Direction

**Symptom:** Click "up" button but character moves left, or buttons move different directions

**Root cause:** Button positioning doesn't match expected layout

**Solution:**
1. Visually verify button layout matches:
```
    ↑
  ← ↓ →
```
2. Test each button individually:
   - Click only the ↑ button, verify character moves up
   - Click only the ← button, verify character moves left
   - Etc.
3. If visual position doesn't match actual function, swap button assignments

**Debug:** Log which button name each button triggers:
```javascript
console.log(`Button "${label}" pressed with keyCode ${keyCode} → ${buttonName}`);
```

---

## Buttons Don't Appear on Screen

**Symptom:** No virtual buttons visible, no errors in console

**Root cause:** Usually CSS display issues or z-index problems

**Solutions:**

1. **Check z-index:** 
```javascript
// Container should have highest z-index
#virtual-buttons-container { z-index: 10000; }
// Buttons higher still
.virtual-button { z-index: 10001; }
```

2. **Check CSS injection:** Verify style element added to document
```javascript
// In browser console:
document.querySelector('style'); // should find our style tag
```

3. **Check DOM presence:** 
```javascript
// In browser console:
document.querySelectorAll('.virtual-button'); // should find buttons
```

4. **Check container positioning:**
```javascript
const container = document.getElementById('virtual-buttons-container');
if (container) {
    console.log('Container visibility:', window.getComputedStyle(container));
}
```

---

## Buttons Appear But No Touch Response

**Symptom:** Buttons render correctly but clicking/tapping doesn't trigger anything

**Root cause:** Touch events not firing or not bound to buttons

**Solution:**

1. **Test if touch events firing:**
```javascript
document.addEventListener('touchstart', () => console.log('Touch detected'));
document.addEventListener('mousedown', () => console.log('Mouse detected'));
```

2. **Verify event listeners attached:**
```javascript
// In DevTools, inspect a button:
// Right-click → Inspect → Console → $0.listeners('touchstart')
```

3. **Check manual click vs touch:**
   - Does mouse click work? (helps isolate touch-specific issues)
   - Does touch event fire in browser console?

4. **Verify button is actually clickable:**
```javascript
button.classList.add('debug-border'); // add visible border
button.addEventListener('click', () => alert('Clicked!'));
```

---

## Input State Updates But Character Doesn't Respond

**Symptom:** Console shows `Input._currentState` changing correctly, but game doesn't respond

**Root cause:** Game's update loop not checking Input correctly, or Input.update() not being called

**Solutions:**

1. **Verify Input.update() is being called:** Can't fix this from plugin, engine must call it
   - This is engine responsibility, should happen automatically

2. **Verify game checks Input correctly:** Check if movement code uses:
```javascript
// Correct
if (Input.isPressed('up')) { moveUp(); }
if (Input.isTriggered('ok')) { confirm(); }

// NOT
if (Input._currentState['up']) { /* may not work */ }
```

3. **Check if input is being blocked:**
   - Open browser console
   - Temporarily disable other input (keyboard) 
   - Try virtual buttons
   - If they work without keyboard, keyboard input might be blocking

---

## Buttons Work on Desktop But Not Mobile

**Symptom:** Buttons work in browser but not on actual mobile device

**Solution:**

1. **Check viewport meta:** Must have mobile viewport:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
```

2. **Test on actual mobile vs mobile emulation:**
   - Chrome DevTools has mobile emulation
   - Real mobile devices may behave differently
   
3. **Check touch event support:**
```javascript
if (window.TouchEvent) {
    console.log('Touch events supported');
} else {
    console.log('Touch events NOT supported');
}
```

4. **Check for iOS-specific issues:**
   - iOS requires actual touch, not simulated events
   - May need `-webkit-` prefixes for CSS
   - AudioContext autoplay may be restricted

5. **Enable debug logging on mobile:**
```javascript
// Create persistent console display
window.DEBUG_LOG = [];
const originalLog = console.log;
console.log = function(...args) {
    window.DEBUG_LOG.push(args.join(' '));
    originalLog.apply(console, args);
};
```

---

## Performance Issues: Game Lags When Buttons Touched

**Symptom:** Smooth gameplay, but frame rate drops when touching buttons

**Solutions:**

1. **Throttle event listeners:**
```javascript
let lastPress = 0;
button.addEventListener('touchstart', (e) => {
    const now = Date.now();
    if (now - lastPress > 50) { // 50ms throttle
        simulateKeyPress(keyCode, true);
        lastPress = now;
    }
});
```

2. **Use event delegation instead of per-button listeners:**
```javascript
container.addEventListener('touchstart', (e) => {
    const button = e.target.closest('.virtual-button');
    if (button) { /* handle */ }
});
```

3. **Remove debug logging in production:**
```javascript
// Comment out or remove:
console.log('...');
```

---

## Getting Help

If you're stuck:

1. **Generate debug report:**
```javascript
console.log('=== DEBUG REPORT ===');
console.log('Input:', typeof Input !== 'undefined' ? 'OK' : 'MISSING');
console.log('Input.keyMapper:', !!Input.keyMapper);
console.log('Input._currentState:', !!Input._currentState);
console.log('Virtual buttons:', document.querySelectorAll('.virtual-button').length);
console.log('Touch support:', !!window.TouchEvent);
```

2. **Check browser compatibility:**
   - Modern browsers (Chrome 40+, Firefox 40+, Safari 14+)
   - Check for console errors (F12)

3. **Simplify test case:**
   - Create minimal HTML with just one button
   - Verify basic touch → Input state change works
   - Then integr back into full plugin

4. **Review [input-system.md](input-system.md)** for architectural understanding
