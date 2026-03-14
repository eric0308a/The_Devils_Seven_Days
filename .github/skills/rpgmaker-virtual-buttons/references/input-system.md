# RPG Maker MV Input System Architecture

## Core Components

### Input.keyMapper
Hash table mapping keyboard keyCodes to button name strings. Located in rpg_core.js around line 3002.

**Default mappings:**
```
37 → 'left'      // Arrow Left
38 → 'up'        // Arrow Up
39 → 'right'     // Arrow Right
40 → 'down'      // Arrow Down
90 → 'ok'        // Z key
88 → 'escape'    // X key (maps to cancel)
16 → 'shift'     // Shift key
17 → 'control'   // Control key
```

**Key insight:** Button names are lowercase strings, NOT keyCodes. Always use the button name from keyMapper.

### Input._currentState
Object storing the current state of all buttons. Keys are button name strings ('up', 'down', 'ok', etc.), values are booleans.

```javascript
Input._currentState = {
    'up': false,
    'down': false,
    'left': false,
    'right': false,
    'ok': false,
    'cancel': false,
    'shift': false,
    'control': false
}
```

To press a button: `Input._currentState['up'] = true`
To release: `Input._currentState['up'] = false`

### Input.update()
Called every frame by RPG Maker. Processes state changes and updates tracking properties:
- `Input._latestButton` - Most recently pressed button
- `Input._pressedTime` - Frames the button has been held
- `Input._previousState` - State from last frame

**Critical:** The Input system assumes you modify `_currentState` directly. You don't call `update()` yourself.

### Input._onKeyDown() and Input._onKeyUp()
Event handlers triggered by native keyboard events. They're what normally populate `_currentState`.

When you simulate button presses, you're bypassing these handlers and directly writing to `_currentState`.

## State Management Pattern

**The Correct Flow:**
```
1. Button pressed → Check if occurs, set Input._currentState[name] = true
2. Game calls Input.update() each frame
3. update() detects state change, sets _latestButton, resets _pressedTime
4. Game checks buttons with Input.isPressed('up') or Input.isTriggered('up')
5. Button released → Set Input._currentState[name] = false
6. update() detects release, updates _previousState
```

**Virtual button implementation should:**
1. Register touch event listeners
2. On press: set `Input._currentState[buttonName] = true`
3. On release: set `Input._currentState[buttonName] = false`
4. Let Input.update() handle the rest

## Why Input._pressedKeys Doesn't Work

Some plugin developers assume there's a `_pressedKeys` property tracking individual keyCodes. **This doesn't exist in RPG Maker MV.**

The engine only tracks buttons by name (`_currentState`), not by keyCode. The `keyMapper` is the translation layer between the two.

**Correct approach:** Always use button names from `keyMapper`, not keyCodes.

## Integration Checklist

When implementing virtual buttons:
- ✓ Check `Input !== 'undefined'` before accessing
- ✓ Verify `Input.keyMapper` exists and has your keyCodes
- ✓ Verify `Input._currentState` exists and is an object
- ✓ Use `Input.keyMapper[keyCode]` to get button name
- ✓ Write to `Input._currentState[buttonName]` only
- ✗ Do NOT create/modify `Input._pressedKeys`
- ✗ Do NOT bypass keyMapper translation
- ✗ Do NOT call `Input.update()` manually

## Testing the Integration

Add this debug code to verify Input system is working:
```javascript
if (typeof Input !== 'undefined') {
    console.log('Input.keyMapper:', Input.keyMapper);
    console.log('Input._currentState:', Input._currentState);
}
```

Then simulate a button press and verify:
1. `_currentState` value changes immediately
2. Character responds in next frame
3. Console logs show the state changes
