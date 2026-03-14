//=============================================================================
// VirtualButtons.js
//=============================================================================

/*:
 * @plugindesc 為移動設備添加虛擬按鍵系統
 * @author 
 *
 * @param 按鈕透明度
 * @type number
 * @min 0
 * @max 255
 * @default 150
 * @desc 虛擬按鍵的透明度
 *
 * @param 按鈕大小
 * @type number
 * @min 20
 * @max 100
 * @default 50
 * @desc 虛擬按鍵的大小（像素）
 *
 * @param 按鈕邊距
 * @type number
 * @min 5
 * @max 50
 * @default 15
 * @desc 按鈕距離屏幕邊緣的距離
 *
 * @help
 * VirtualButtons.js
 *
 * 在移動設備上添加虛擬按鍵。
 * 支持方向鍵、Z、X、Shift、Control 等按鍵。
 * 按鍵半透明，可以看到後面的遊戲畫面。
 * 可以隱藏/顯示虛擬按鍵。
 */

(function() {
    'use strict';

    const params = PluginManager.parameters('VirtualButtons');
    const BUTTON_OPACITY = Number(params['按鈕透明度'] || 150);
    const BUTTON_SIZE = Number(params['按鈕大小'] || 50);
    const BUTTON_MARGIN = Number(params['按鈕邊距'] || 15);
    const OPACITY_RATIO = (BUTTON_OPACITY / 255).toFixed(2);

    // 虛擬按鍵配置
    const VIRTUAL_BUTTONS = {
        up: { key: 'up', label: '↑', position: 'dpad-up' },
        down: { key: 'down', label: '↓', position: 'dpad-down' },
        left: { key: 'left', label: '←', position: 'dpad-left' },
        right: { key: 'right', label: '→', position: 'dpad-right' },
        z: { key: 'z', label: 'Z', position: 'action-z' },
        x: { key: 'x', label: 'X', position: 'action-x' },
        shift: { key: 'shift', label: 'Shift', position: 'mod-shift' },
        control: { key: 'control', label: 'Ctrl', position: 'mod-control' }
    };

    // 狀態追踪
    const buttonStates = {};
    Object.keys(VIRTUAL_BUTTONS).forEach(k => buttonStates[k] = false);

    // 按鍵映射
    const KEY_CODE_MAP = {
        'up': 38,
        'down': 40,
        'left': 37,
        'right': 39,
        'z': 90,
        'x': 88,
        'shift': 16,
        'control': 17
    };

    const RPG_KEY_MAP = {
        'up': 'up',
        'down': 'down',
        'left': 'left',
        'right': 'right',
        'z': 'ok',
        'x': 'cancel',
        'shift': 'shift',
        'control': 'control'
    };

    // 初始化虛擬按鍵
    function initializeVirtualButtons() {
        if (document.getElementById('virtual-buttons-container')) {
            return;
        }

        const container = document.createElement('div');
        container.id = 'virtual-buttons-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;

        // 添加 CSS 樣式
        const style = document.createElement('style');
        style.textContent = `
            .virtual-button {
                position: fixed;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid rgba(255, 255, 255, 0.5);
                border-radius: 6px;
                background: rgba(100, 150, 255, ${OPACITY_RATIO});
                color: white;
                font-weight: bold;
                font-size: 16px;
                cursor: pointer;
                user-select: none;
                pointer-events: auto;
                touch-action: none;
                -webkit-user-select: none;
                -webkit-touch-callout: none;
                transition: background 0.1s;
                box-sizing: border-box;
            }

            .virtual-button:active {
                background: rgba(50, 100, 200, ${Math.min(1, OPACITY_RATIO + 0.2)});
                border-color: rgba(255, 255, 255, 0.8);
            }

            .virtual-button.dpad-up {
                width: ${BUTTON_SIZE}px !important;
                height: ${BUTTON_SIZE}px !important;
                bottom: ${BUTTON_MARGIN + BUTTON_SIZE * 2}px !important;
                left: ${BUTTON_MARGIN + BUTTON_SIZE}px !important;
                top: auto !important;
                border-radius: 4px;
            }

            .virtual-button.dpad-down {
                width: ${BUTTON_SIZE}px !important;
                height: ${BUTTON_SIZE}px !important;
                bottom: ${BUTTON_MARGIN + BUTTON_SIZE}px !important;
                left: ${BUTTON_MARGIN + BUTTON_SIZE}px !important;
                top: auto !important;
                border-radius: 4px;
            }

            .virtual-button.dpad-left {
                width: ${BUTTON_SIZE}px !important;
                height: ${BUTTON_SIZE}px !important;
                bottom: ${BUTTON_MARGIN + BUTTON_SIZE}px !important;
                left: ${BUTTON_MARGIN}px !important;
                top: auto !important;
                border-radius: 4px;
            }

            .virtual-button.dpad-right {
                width: ${BUTTON_SIZE}px !important;
                height: ${BUTTON_SIZE}px !important;
                bottom: ${BUTTON_MARGIN + BUTTON_SIZE}px !important;
                left: ${BUTTON_MARGIN + BUTTON_SIZE * 2}px !important;
                top: auto !important;
                border-radius: 4px;
            }

            .virtual-button.action-z {
                width: ${BUTTON_SIZE}px !important;
                height: ${BUTTON_SIZE}px !important;
                bottom: ${BUTTON_MARGIN}px !important;
                right: ${BUTTON_MARGIN + BUTTON_SIZE + 10}px !important;
                top: auto !important;
                border-radius: 6px;
            }

            .virtual-button.action-x {
                width: ${BUTTON_SIZE}px !important;
                height: ${BUTTON_SIZE}px !important;
                bottom: ${BUTTON_MARGIN}px !important;
                right: ${BUTTON_MARGIN}px !important;
                top: auto !important;
                border-radius: 6px;
            }

            .virtual-button.mod-shift {
                width: ${BUTTON_SIZE * 1.3}px !important;
                height: ${BUTTON_SIZE * 0.6}px !important;
                bottom: ${BUTTON_MARGIN + BUTTON_SIZE + 12}px !important;
                right: ${BUTTON_MARGIN}px !important;
                top: auto !important;
                border-radius: 4px;
                font-size: 12px;
            }

            .virtual-button.mod-control {
                width: ${BUTTON_SIZE * 1.3}px !important;
                height: ${BUTTON_SIZE * 0.6}px !important;
                bottom: ${BUTTON_MARGIN + BUTTON_SIZE * 2 + 24}px !important;
                right: ${BUTTON_MARGIN}px !important;
                top: auto !important;
                border-radius: 4px;
                font-size: 12px;
            }

            #toggle-buttons-btn {
                position: fixed;
                top: ${BUTTON_MARGIN}px;
                right: ${BUTTON_MARGIN}px;
                width: 40px;
                height: 40px;
                background: rgba(100, 150, 255, ${OPACITY_RATIO});
                border: 2px solid rgba(255, 255, 255, 0.5);
                border-radius: 6px;
                color: white;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                user-select: none;
                font-size: 20px;
                pointer-events: auto;
                transition: background 0.1s;
                -webkit-user-select: none;
                -webkit-touch-callout: none;
                touch-action: none;
            }

            #toggle-buttons-btn:active {
                background: rgba(50, 100, 200, ${Math.min(1, OPACITY_RATIO + 0.2)});
                border-color: rgba(255, 255, 255, 0.8);
            }

            #virtual-buttons-container.hidden .virtual-button {
                display: none !important;
            }

            #virtual-buttons-container.hidden #toggle-buttons-btn {
                display: flex !important;
            }

            @media (max-width: 768px) {
                .virtual-button {
                    opacity: ${OPACITY_RATIO};
                }
                #toggle-buttons-btn {
                    opacity: ${OPACITY_RATIO};
                }
            }
        `;
        document.head.appendChild(style);

        // 添加切換按鈕
        const toggleBtn = document.createElement('div');
        toggleBtn.id = 'toggle-buttons-btn';
        toggleBtn.textContent = '▶';
        toggleBtn.title = '隱藏/顯示虛擬按鍵';
        container.appendChild(toggleBtn);

        // 添加事件監聽器到切換按鈕
        addToggleButtonListeners(toggleBtn, container);

        // 創建虛擬按鍵
        Object.keys(VIRTUAL_BUTTONS).forEach(key => {
            const button = document.createElement('div');
            const config = VIRTUAL_BUTTONS[key];
            button.className = `virtual-button ${config.position}`;
            button.id = `vbtn-${key}`;
            button.textContent = config.label;
            button.dataset.key = key;
            
            container.appendChild(button);
            addButtonEventListeners(button, key);
        });

        document.body.appendChild(container);
        window.virtualButtonsContainer = container;
    }

    function addToggleButtonListeners(btn, container) {
        let isToggling = false;

        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isToggling = false;
        });

        btn.addEventListener('click', () => {
            const isHidden = container.classList.contains('hidden');
            container.classList.toggle('hidden');
            btn.textContent = isHidden ? '▶' : '◀';
        });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (!isToggling) {
                isToggling = true;
                const isHidden = container.classList.contains('hidden');
                container.classList.toggle('hidden');
                btn.textContent = isHidden ? '▶' : '◀';
            }
        });
    }

    function addButtonEventListeners(button, key) {
        const keyConfig = VIRTUAL_BUTTONS[key];

        function onPress() {
            button.style.background = `rgba(50, 100, 200, ${Math.min(1, OPACITY_RATIO + 0.2)})`;
            button.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            if (!buttonStates[key]) {
                buttonStates[key] = true;
                simulateKeyPress(keyConfig.key, true);
            }
        }

        function onRelease() {
            button.style.background = `rgba(100, 150, 255, ${OPACITY_RATIO})`;
            button.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            if (buttonStates[key]) {
                buttonStates[key] = false;
                simulateKeyPress(keyConfig.key, false);
            }
        }

        // 鼠標事件
        button.addEventListener('mousedown', onPress);
        document.addEventListener('mouseup', () => {
            if (buttonStates[key]) onRelease();
        });

        // 觸摸事件
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            onPress();
        });

        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            onRelease();
        });

        button.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            onRelease();
        });
    }

    // 模擬鍵盤按下 - 改進版本
    function simulateKeyPress(key, isPressed) {
        const keyCode = KEY_CODE_MAP[key];
        const rpgKey = RPG_KEY_MAP[key];

        if (!keyCode || !rpgKey) {
            console.warn(`Unknown virtual button key: ${key}`);
            return;
        }

        // 方法 1: 修改 Input._currentState（RPG Maker 方式）
        if (typeof Input !== 'undefined' && Input.keyMapper && Input._currentState) {
            // 從 keyCode 查找對應的按鍵名稱（RPG Maker 使用 Input.keyMapper）
            const buttonName = Input.keyMapper[keyCode];
            
            if (buttonName) {
                // 直接設定 Input._currentState，這是 RPG Maker Input 系統的核心
                Input._currentState[buttonName] = isPressed;
                
                console.log(`[VirtualButtons] ${isPressed ? '按下' : '釋放'}: ${buttonName} (keyCode: ${keyCode})`);
            } else {
                console.warn(`[VirtualButtons] 找不到 keyCode ${keyCode} 對應的按鍵名稱`);
            }
        }

        // 方法 2: 創建和分發 KeyboardEvent（標準瀏覽器方式）
        try {
            const eventType = isPressed ? 'keydown' : 'keyup';
            const keyEvent = new KeyboardEvent(eventType, {
                'key': key,
                'code': key.toUpperCase(),
                'keyCode': keyCode,
                'which': keyCode,
                'bubbles': true,
                'cancelable': true,
                'shiftKey': key === 'shift' || (keyCode === 16),
                'ctrlKey': key === 'control' || (keyCode === 17),
                'altKey': false
            });
            document.dispatchEvent(keyEvent);
            window.dispatchEvent(keyEvent);
        } catch (e) {
            console.warn('KeyboardEvent dispatch failed:', e);
        }

        // 觸發自定義事件
        try {
            const eventName = isPressed ? 'virtualButtonPressed' : 'virtualButtonReleased';
            document.dispatchEvent(new CustomEvent(eventName, {
                detail: { key: rpgKey, keyCode: keyCode }
            }));
        } catch (e) {
            console.warn('CustomEvent dispatch failed:', e);
        }
    }

    // DOM 準備完後初始化
    function waitForInputSystem() {
        if (typeof Input !== 'undefined' && Input.keyMapper && Input._currentState) {
            // Input 系統已準備好
            console.log('[VirtualButtons] Input system ready. Initializing virtual buttons.');
            console.log('[VirtualButtons] Input.keyMapper:', Input.keyMapper);
            console.log('[VirtualButtons] Input._currentState:', Input._currentState);
            
            initializeVirtualButtons();
        } else {
            // 等待 Input 系統，最多等待 5 秒
            const elapsed = (Date.now() - (window._vbStartTime || (window._vbStartTime = Date.now())));
            if (elapsed < 5000) {
                setTimeout(waitForInputSystem, 100);
            } else {
                console.error('[VirtualButtons] Input system not ready after 5 seconds. Virtual buttons may not work correctly.');
                // 仍然嘗試初始化，以防萬一
                initializeVirtualButtons();
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForInputSystem);
    } else {
        // 如果 DOM 已經加載，等待 Input 系統
        waitForInputSystem();
    }

    // 觸摸優化
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // 輸出診斷信息
    console.log('VirtualButtons.js loaded. Waiting for Input system initialization...');

})();
