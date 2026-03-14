//=============================================================================
// NameInput.js
//=============================================================================
/*:
 * @plugindesc 自由名字输入处理
 * @author wangwang Revise by Fanzi
 *
 * @param  名称叫法
 * @desc 自己取个叫法，如：姓氏、姓名、名字
 * @default 姓名
 *
 * @param  昵称叫法
 * @desc 自己取个叫法，如：名字、昵称、外号
 * @default 昵称
 *
 * @help
 * 帮助的信息
 * 用网页输入代替原本的名字输入
 * 增加文本显示时用“\A[n]”显示角色昵称，“\Q[n]”显示队员昵称
 */

function Window_BC() {
    this.initialize.apply(this, arguments);
}

(function() {

    var parameters = PluginManager.parameters('NameInput');
    var FirstName = parameters['名称叫法'];
    var NickName = parameters['昵称叫法'];

    Scene_Name.prototype = Object.create(Scene_Base.prototype);
    Scene_Name.prototype.constructor = Scene_Name;

    Scene_Name.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_Name.prototype.prepare = function(actorId, maxLength) {
        this._actorId = actorId;
        this._maxLength = maxLength;
    };

    Scene_Name.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
        this._actor = $gameActors.actor(this._actorId);
        this.createEditWindow();
        this.createBCWindow();
    };

    Scene_Name.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        this._editWindow.refresh();
    };

    Scene_Name.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_Name.prototype.createEditWindow = function() {
        this._editWindow = new Window_NameEdit(this._actor, this._maxLength);
        this.addWindow(this._editWindow);
    };
 
    Scene_Name.prototype.createBCWindow = function() {
        var x = this._editWindow.x + this._editWindow.left() + 50;
        var y = this._editWindow.y + 65;
        var width = this._editWindow.charWidth() * this._maxLength;
        var height = this._editWindow.lineHeight();
        Graphics._addInput("text",x,y, width, height, this._editWindow.standardFontSize());
        Graphics._input.maxLength = this._maxLength;
        Graphics._input.value = this._actor.name().slice(0, this._maxLength);
        Graphics._addInput2("text",x,y+50, width, height, this._editWindow.standardFontSize());
        Graphics._input2.maxLength = this._maxLength;
        Graphics._input2.value = this._actor.nickname().slice(0, this._maxLength);
        this._bcWindow = new Window_BC("确定");
        this._bcWindow.x = this._editWindow.x + this._editWindow.width - this._bcWindow.width;
        this._bcWindow.y = this._editWindow.y +this._editWindow.height;
        this._bcWindow.setHandler('dianji', this.onInputOk.bind(this));
        this.addWindow(this._bcWindow);
        this._csWindow = new Window_BC("还原");
        this._csWindow.x = this._editWindow.x + this._editWindow.width - this._bcWindow.width - this._bcWindow.width;
        this._csWindow.y = this._editWindow.y +this._editWindow.height;
        this._csWindow.setHandler('dianji', this.oncs.bind(this));
        this.addWindow(this._csWindow);
    };

    Scene_Name.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        this.updateFocus();
    };

    Scene_Name.prototype.oncs = function() {
        Graphics._input.value = this._actor.name().slice(0, this._maxLength);
        Graphics._input2.value = this._actor.nickname().slice(0, this._maxLength);
    };

    Scene_Name.prototype.onInputOk = function() {
        AudioManager.playSe({"name":"Decision1","volume":90,"pitch":100,"pan":0});
        var name="" + Graphics._input.value;
        var nickname="" + Graphics._input2.value;
        this._actor.setName(name);
        this._actor.setNickname(nickname);
        this.popScene();
        Graphics._removeInput();
        Graphics._removeInput2();
    };

    Scene_Name.prototype.updateFocus = function() {
        var wx = this._editWindow.x + this._editWindow.left() + 50;
        var wyn = this._editWindow.y + 65;
        var wyp = this._editWindow.y + 115;
        var ww = this._editWindow.charWidth() * this._maxLength;
        var wh = this._editWindow.lineHeight();
        if (TouchInput.isPressed()) {
            var x = TouchInput.x;
            var y = TouchInput.y;
            if (x >= wx && y >= wyn && x < wx + ww && y < wyn + wh) {
                Graphics._input.focus();
            } else if (x >= wx && y >= wyp && x < wx + ww && y < wyp + wh) {
                Graphics._input2.focus();
            }
        }
    };

    Window_NameEdit.prototype.windowHeight = function() {
        return this.fittingHeight(5);
    };

    Window_NameEdit.prototype.nickname = function() {
        return this._nickname;
    };

    Window_NameEdit.prototype.charWidth = function() {
        var text = $gameSystem.isChinese() ? '\u4E00' : 'A';
        return this.textWidth(text);
    };

    Window_NameEdit.prototype.refresh = function() {
        this.contents.clear();
        this.drawActorFace(this._actor, 0, (this.windowHeight()-144)/2);
        this.drawText("请给角色取名",160,0,160,'center');
        this.drawText(FirstName+"：",180,50,80,'left');
        this.drawText(NickName+"：",180,100,80,'left');
        this.drawText("点还原重新初始化",160,140,270,'left');
    };

    Window_BC.prototype = Object.create(Window_Base.prototype);
    Window_BC.prototype.constructor = Window_BC;

    Window_BC.prototype.initialize = function(text) {
        var width = 84;
        var height = this.fittingHeight(1);
        Window_Base.prototype.initialize.call(this, 0, 0, width, height);
        this._handlers = {};
        this._text = '';
        this.setText(text);
    };

    Window_BC.prototype.standardPadding = function() {
        return 8;
    };

    Window_BC.prototype.setText = function(text) {
        if (this._text !== text) {
            this._text = text;
            this.refresh();
        }
    };

    Window_BC.prototype.clear = function() {
        this.setText('');
    };

    Window_BC.prototype.refresh = function() {
        this.contents.clear();
        this.drawTextEx(this._text, this.textPadding(), 0);
    };

    Window_BC.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.dianji();
    };
 
    Window_BC.prototype.setHandler = function(symbol, method) {
        this._handlers[symbol] = method;
    };

    Window_BC.prototype.isHandled = function(symbol) {
        return !!this._handlers[symbol];
    };

    Window_BC.prototype.callHandler = function(symbol) {
        if (this.isHandled(symbol)) {
            this._handlers[symbol]();
        }
    };
 
    Window_BC.prototype.dianji = function() {
        if (this.isOpen()) {
            if (TouchInput.isTriggered()) {
                var x = this.canvasToLocalX(TouchInput.x);
                var y = this.canvasToLocalY(TouchInput.y);
                if(x >= 0 && y >= 0 && x < this.width && y < this.height){
                    this.callHandler("dianji");
                }
            } 
        } 
    };

    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
            return this.actorName(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bA\[(\d+)\]/gi, function() {
            return this.actorNickname(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
            return this.partyMemberName(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bQ\[(\d+)\]/gi, function() {
            return this.partyMemberNickname(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
        return text;
    };

    Window_Base.prototype.actorNickname = function(n) {
        var actor = n >= 1 ? $gameActors.actor(n) : null;
        return actor ? actor.nickname() : '';
    };

    Window_Base.prototype.partyMemberNickname = function(n) {
        var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
        return actor ? actor.nickname() : '';
    };

    Graphics._createAllElements = function() {
        this._createErrorPrinter();
        this._createCanvas();
        this._createVideo();
        this._createUpperCanvas();
        this._createRenderer();
        this._createFPSMeter();
        this._createModeBox();
        this._createGameFontLoader();
        this._createInput();
        this._createInput2();
    };
 
    Graphics._updateAllElements = function() {
        this._updateRealScale();
        this._updateErrorPrinter();
        this._updateCanvas();
        this._updateVideo();
        this._updateUpperCanvas();
        this._updateRenderer();
        this._updateInput();
        this._updateInput2();
        this._paintUpperCanvas();
    };

    Graphics._createInput = function() {
        this._input = document.createElement("input");
        this._input.id = 'Input';
        this._input.type ="text";
        this._input._sx ={};
        var sx = this._input._sx;
        sx.xs = false;
        sx.x= 0;
        sx.y=0;
        sx.width =100;
        sx.height= 20;
        sx.fontSize = 18;
    };

    Graphics._createInput2 = function() {
        this._input2 = document.createElement("input");
        this._input2.id = 'Input2';
        this._input2.type ="text";
        this._input2._sx ={};
        var sx = this._input2._sx;
        sx.xs = false;
        sx.x= 0;
        sx.y=0;
        sx.width =100;
        sx.height= 20;
        sx.fontSize = 18;
    };

    Graphics._addInput = function(type,x,y,width,height,fontSize) {                
        this._input.type = type || "text";
        var sx = this._input._sx;
        sx.x= x;
        sx.y= y;
        sx.width = width|| 100;
        sx.height= height|| 20;
        sx.fontSize = fontSize || 18;
        this._updateInput();
        sx.xs = true;
        document.body.appendChild(this._input);
    };

    Graphics._addInput2 = function(type,x,y,width,height,fontSize) {                
        this._input2.type = type || "text";
        var sx = this._input2._sx;
        sx.x= x;
        sx.y= y;
        sx.width = width|| 100;
        sx.height= height|| 20;
        sx.fontSize = fontSize || 18;
        this._updateInput2();
        sx.xs = true;
        document.body.appendChild(this._input2);
    };

    Graphics._removeInput = function() {
        this._input.remove();
        this._input.value = null;
        this._input._xs = false;
    };

    Graphics._removeInput2 = function() {
        this._input2.remove();
        this._input2.value = null;
        this._input2._xs = false;
    };

    Graphics._updateInput =function () {   
        this._input.style.zIndex = 12;
        var sx = this._input._sx;
        var x = sx.x  * this._realScale + (window.innerWidth - this._width * this._realScale) / 2;
        var y = sx.y  * this._realScale + (window.innerHeight - this._height * this._realScale) / 2;
        var width = sx.width * this._realScale;
        var height = sx.height * this._realScale;
        var fontSize = sx.fontSize * this._realScale;
        this._input.style.position = 'absolute';
        this._input.style.margin = 'auto';
        this._input.style.top = y  + 'px';
        this._input.style.left = x  + 'px';
        this._input.style.width = width + 'px';
        this._input.style.height = height + 'px';
        this._input.style.fontSize = fontSize + 'px';
    };

    Graphics._updateInput2 =function () {   
        this._input2.style.zIndex = 12;
        var sx = this._input2._sx;
        var x = sx.x  * this._realScale + (window.innerWidth - this._width * this._realScale) / 2;
        var y = sx.y  * this._realScale + (window.innerHeight - this._height * this._realScale) / 2;
        var width = sx.width * this._realScale;
        var height = sx.height * this._realScale;
        var fontSize = sx.fontSize * this._realScale;
        this._input2.style.position = 'absolute';
        this._input2.style.margin = 'auto';
        this._input2.style.top = y  + 'px';
        this._input2.style.left = x  + 'px';
        this._input2.style.width = width + 'px';
        this._input2.style.height = height + 'px';
        this._input2.style.fontSize = fontSize + 'px';
    };

    Input._onKeyDown = function(event) {
        if (this._shouldPreventDefault(event.keyCode)) {
            if (Graphics && Graphics._input && Graphics._input._sx && Graphics._input._sx.xs) {
            } else if (Graphics && Graphics._input2 && Graphics._input2._sx && Graphics._input2._sx.xs) {
            } else {
                event.preventDefault();
            }
        }
        if (event.keyCode === 144) {
            this.clear();
        }
        var buttonName = this.keyMapper[event.keyCode];
        if (ResourceHandler.exists() && buttonName === 'ok') {
            ResourceHandler.retry();
        } else if (buttonName) {
            this._currentState[buttonName] = true;
        }
    };

})();