---
name: rpgmaker-virtual-buttons
description: Create mobile-optimized touch control system for RPG Maker MV games. Maps virtual on-screen buttons to keyboard input for touch devices. Use when (1) adding mobile touch controls to RPG Maker MV, (2) implementing directional pad and action buttons for mobile, (3) mapping touch input to game keyboard events, (4) building cross-device playable RPG Maker games.
---

# RPG Maker Virtual Buttons Skill

Create mobile-friendly virtual button controls for RPG Maker MV games that properly integrate with the engine's Input system.

## Critical Foundation: Understanding RPG Maker's Input Architecture

**Before implementing, understand this core fact:** RPG Maker MV uses two parallel systems:
- `Input.keyMapper` - Hash table mapping keyCodes to button names
- `Input._currentState` - Object storing boolean state of each button name

**Critical mistake to avoid:** Do NOT assume non-existent properties (like `Input._pressedKeys`). Always verify properties exist in rpg_core.js before using them.

See [references/input-system.md](references/input-system.md) for complete architecture details.

## Implementation Workflow

### 1. Verify Input System Understanding

Read [references/input-system.md](references/input-system.md) first. The Input system is the only integration point—getting it wrong nullifies the entire implementation.

### 2. Check RPG Maker Initialization

When initializing, verify these exist:
- `Input` object defined globally
- `Input.keyMapper` populated with keyCodes
- `Input._currentState` initialized as empty object

### 3. Create Plugin File

Create `VirtualButtons.js` in `www/js/plugins/` using [scripts/VirtualButtons.js](scripts/VirtualButtons.js) as the template. Register it in `plugins.js` array.

### 4. Modify index.html

Add viewport meta for mobile optimization:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
```

Load VirtualButtons.js before plugins.js:
```html
<script src="js/plugins/VirtualButtons.js"></script>
<script src="js/plugins.js"></script>
```

### 5. Implement Button Positioning

Configure button layout using CSS positioning. The standard layout (like keyboard):
```
    ↑
  ← ↓ →
```

Use CSS `bottom` and `left`/`right` positioning with fixed pixel offsets. See [assets/button-layout-examples.md](assets/button-layout-examples.md) for variants.

### 6. Handle Input Mapping

Map button presses to RPG Maker Input system:
1. Get keyCode from button press
2. Look up button name: `Input.keyMapper[keyCode]`
3. Set state: `Input._currentState[buttonName] = isPressed`

**NEVER** use `Input._pressedKeys` - this property doesn't exist.

## Common Issues & Solutions

### Issue: Buttons visible but input doesn't register

**Root cause:** Using wrong Input properties. Verify you're using only:
- `Input.keyMapper` (to translate keyCodes)
- `Input._currentState` (the actual state object)

**Solution:** Check [references/troubleshooting.md](references/troubleshooting.md) section "TypeError on button press"

### Issue: Buttons don't respond to touch

**Root cause:** Touch events not properly wired to buttons or pointer-events CSS blocking input.

**Solution:** Ensure CSS has `pointer-events: auto` on button elements and container has `pointer-events: none`.

### Issue: Character moves in wrong direction

**Root cause:** Button positioning doesn't match expected layout or CSS positioning order is wrong.

**Solution:** Verify button positions match the visual layout. Test each direction individually by logging button presses to console.

### Issue: Touch events penetrate through buttons to game canvas

**Root cause:** Touch events propagate from buttons to underlying game elements, causing unintended clicks on game canvas. Missing event propagation controls allow events to bubble through DOM layers.

**Symptoms:**
- Character moves when clicking buttons over movement area
- Game canvas receives clicks when touching virtual buttons
- Multiple actions triggered from single button press

**Solution:** Stop all event propagation in button event handlers:

```javascript
button.addEventListener('touchstart', (e) => {
    e.preventDefault();           // Stop default behavior
    e.stopPropagation();          // Stop event bubbling
    e.stopImmediatePropagation(); // Stop other listeners on same element
    // ... handle button press
});
```

**Required for ALL event types:**
- `touchstart`, `touchmove`, `touchend`, `touchcancel`
- `mousedown`, `mouseup`, `click`
- `pointerdown`, `pointerup` (additional protection)

**Critical:** Apply to every button event handler consistently. Missing even one event type can cause intermittent penetration issues.

## Reference Material

- **Input System Details**: [references/input-system.md](references/input-system.md) - Complete architecture, key mappings, state management
- **Implementation Checklist**: [references/implementation-guide.md](references/implementation-guide.md) - Step-by-step checklist with code examples  
- **Debugging Guide**: [references/troubleshooting.md](references/troubleshooting.md) - Common errors and solutions
- **Button Layouts**: [assets/button-layout-examples.md](assets/button-layout-examples.md) - Configuration examples
- **Complete Plugin Code**: [scripts/VirtualButtons.js](scripts/VirtualButtons.js) - Production-ready plugin

## Key Implementation Patterns

### Input Simulation

```javascript
// This is the ONLY correct way to simulate key press:
function simulateKeyPress(keyCode, isPressed) {
    if (typeof Input !== 'undefined' && Input.keyMapper && Input._currentState) {
        const buttonName = Input.keyMapper[keyCode];
        if (buttonName) {
            Input._currentState[buttonName] = isPressed;
        }
    }
}
```

Do NOT try to:
- Modify `Input._pressedKeys` (doesn't exist)
- Create custom Input properties
- Bypass Input system with direct DOM manipulation

The Input system handles all state tracking internally through `Input.update()`.

### Event Handling (Critical for Touch Devices)

```javascript
// REQUIRED pattern for preventing event penetration:
function addButtonEventListeners(button, key) {
    function handlePress(e) {
        // MUST include all three:
        e.preventDefault();           // Prevent default touch behavior
        e.stopPropagation();          // Stop bubbling to parent elements
        e.stopImmediatePropagation(); // Stop other listeners on this element
        
        // ... your button logic
    }
    
    // Apply to ALL relevant events:
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchmove', handlePress);
    button.addEventListener('touchend', handlePress);
    button.addEventListener('touchcancel', handlePress);
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('click', handlePress);
    button.addEventListener('pointerdown', handlePress);
    button.addEventListener('pointerup', handlePress);
}
```

**Why this matters:** Without proper event stopping, touch events penetrate through virtual buttons to the game canvas below, causing unwanted character movement or actions. All three stoppers are required for complete isolation.
