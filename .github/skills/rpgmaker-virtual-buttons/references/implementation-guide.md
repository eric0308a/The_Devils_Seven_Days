# RPG Maker Virtual Buttons - Implementation Checklist

## Pre-Implementation Research

- [ ] Read rpg_core.js lines 2990-3040 to understand Input.keyMapper structure
- [ ] Read rpg_core.js lines 3055-3135 to understand Input.update() and Input._currentState
- [ ] Read rpg_core.js lines 3230-3250 to understand Input._onKeyDown()
- [ ] Verify your game loads rpg_core.js before plugins

## File Modifications

### Step 1: Modify index.html

**Location:** `www/index.html`

**Changes needed:**
```html
<!-- Add viewport meta: -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />

<!-- Add script tag BEFORE plugins.js: -->
<script src="js/plugins/VirtualButtons.js"></script>
```

**Why:** Loads virtual buttons plugin before main plugin array, ensuring it initializes correctly.

### Step 2: Create VirtualButtons.js Plugin

**Location:** `www/js/plugins/VirtualButtons.js`

**Method:** Copy from [scripts/VirtualButtons.js](../scripts/VirtualButtons.js)

**Key sections:**
- Lines 1-100: Plugin header and configuration
- Lines 100-250: CSS styling and layout (customize button positions here)
- Lines 300-380: Touch event handlers (bind to touchstart/touchend)
- Lines 360-380: Input state simulation (the critical Input integration)
- Lines 410-440: Initialization and Input system detection

### Step 3: Register Plugin

**Location:** `www/js/plugins.js`

**Change:** Add entry at beginning of plugin array:
```javascript
{"name":"VirtualButtons","status":true,"description":"...","parameters":{}}
```

**Why:** Ensures VirtualButtons initializes before other plugins that might use Input.

## Button Configuration

### Layout Pattern

Standard keyboard-like layout:
```
        ↑
    ← ↓ | ↓ →
```

CSS positioning template:
```javascript
// Up button (center horizontally)
bottom: MARGIN + BUTTON_SIZE * 2
left: MARGIN + BUTTON_SIZE

// Down button (center horizontally)  
bottom: MARGIN + BUTTON_SIZE
left: MARGIN + BUTTON_SIZE

// Left button
bottom: MARGIN + BUTTON_SIZE
left: MARGIN

// Right button
bottom: MARGIN + BUTTON_SIZE
left: MARGIN + BUTTON_SIZE * 2

// Action buttons (right side)
bottom: MARGIN
right: MARGIN or right: MARGIN + BUTTON_SIZE + 10
```

### Customization Points

In VirtualButtons.js, modify:

1. **Button size:** Change `BUTTON_SIZE` parameter (default 50px)
2. **Margins:** Change `BUTTON_MARGIN` parameter (default 15px)
3. **Transparency:** Change `BUTTON_OPACITY` parameter (default 150/255)
4. **Button layout:** Modify CSS positioning in the style block
5. **Button labels:** Change `label` in VIRTUAL_BUTTONS config
6. **Color scheme:** Modify `background` and `border` colors in CSS

## Initialization Sequence Verification

The plugin uses this sequence to ensure proper initialization:

1. **Document ready:** Page loads
2. **Script evaluation:** VirtualButtons.js runs in global scope
3. **Plugin manager:** rpg_core.js runs, initializes Input
4. **waitForInputSystem():** Poll for Input object up to 5 seconds
5. **initializeVirtualButtons():** Create buttons once Input exists
6. **Touch events:** Register button handlers

**If buttons don't appear:** Check browser console for "Input system not ready" warning.

**If Input system never initializes:** Verify rpg_core.js loads before plugins.js.

## Input Integration Code Pattern

**Critical: This is the only safe pattern for simulating key presses**

```javascript
function simulateKeyPress(keyCode, isPressed) {
    if (typeof Input !== 'undefined' && Input.keyMapper && Input._currentState) {
        // Step 1: Translate keyCode to button name
        const buttonName = Input.keyMapper[keyCode];
        
        // Step 2: Verify button exists
        if (buttonName) {
            // Step 3: Set state directly
            Input._currentState[buttonName] = isPressed;
            console.log(`${isPressed ? 'Press' : 'Release'}: ${buttonName}`);
        } else {
            console.warn(`unknown keyCode: ${keyCode}`);
        }
    } else {
        console.error('Input system not ready');
    }
}
```

**DO NOT:**
```javascript
// ✗ Wrong - property doesn't exist
Input._pressedKeys[keyCode] = true;

// ✗ Wrong - directly creating new properties
Input._customState = {};

// ✗ Wrong - using keyCodes instead of button names
Input._currentState[37] = true;  // Should be Input._currentState['left']

// ✗ Wrong - trying to manually call internal methods
Input.update();  // Not needed, called by engine
```

## Test Cases

### Test 1: Buttons Render
- [ ] Open browser DevTools (F12)
- [ ] Screenshot shows virtual buttons on screen
- [ ] Buttons are semi-transparent (can see game behind)
- [ ] Buttons positioned correctly (D-pad bottom-left, actions bottom-right)

### Test 2: Touch Events Register
- [ ] Open browser console
- [ ] Run: `console.log(Input._currentState)`
- [ ] Click a button
- [ ] Check console for "[VirtualButtons] 按下: up" style message
- [ ] Verify `Input._currentState` shows pressed button as true

### Test 3: Character Responds
- [ ] Stand in game near an object or passable area
- [ ] Click up button on virtual D-pad
- [ ] Character moves up
- [ ] Click left button
- [ ] Character moves left
- [ ] All directions work correctly

### Test 4: Action Buttons Work
- [ ] Click Z button (ok/confirm)
- [ ] Verify menu opens or action confirms
- [ ] Click X button (escape/cancel)
- [ ] Verify menu closes or action cancels

### Test 5: Modifier Keys Work
- [ ] Click Shift button
- [ ] Verify shift state in `Input._currentState['shift']`
- [ ] Click Control button
- [ ] Verify control state in `Input._currentState['control']`

## Debugging Checklist

If buttons don't work:

1. [ ] Check browser console for errors
2. [ ] Verify "Input system ready" message appears
3. [ ] Open DevTools → Console → type `Input` - should be object, not undefined
4. [ ] Type `Input.keyMapper` - should show keyCodes
5. [ ] Type `Input._currentState` - should show button states
6. [ ] Click a button and watch `Input._currentState` change in real-time
7. [ ] Check button CSS - `pointer-events: auto` must be set
8. [ ] Check container CSS - `pointer-events: none` must be set

See [../references/troubleshooting.md](troubleshooting.md) for common errors and solutions.
