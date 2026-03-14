//==================================================
//  ZPM_ScreenOptions.js
//==================================================

/*:
 * @plugindesc [v1.0]        系统 - 游戏显示设置
 * @author ZPM
 * @help
 * ==================================================
 * 使用注意事项:
 * ==================================================
 * 
 * 本插件可单独使用.
 * 
 * 也可和语言核心插件(ZPM_LanguageCore.js)搭配使用.
 * 搭配时将根据选择语种显示对应参数名称.
 * 
 * 本插件可实现游戏内更改分辨率,该更改将以全局
 * 存储方式保存.
 * 
 * 另可将全屏以选项形式开关.
 * 
 * 对于开发者,本插件规范了新的窗口类,可直接调用.
 * 
 * ==================================================
 * 
 * ==================================================
 * 
 * v1.0         插件完成            2020/07/22
 * 
 * v1.1         追加新选项          2020/08/03
 * 
 * 追加窗口置顶功能.
 * 追加窗口拉伸锁定功能.
 * 
 * ==================================================
 * 
 * @param TitleScreenOptions
 * @text 标题中添加选项
 * @type boolean
 * @on true
 * @off false
 * @default false
 * @desc 是否在标题中添加该选项.
 * 
 * @param MenuScreenOptions
 * @text 菜单中添加选项
 * @type boolean
 * @on true
 * @off false
 * @default false
 * @desc 是否在菜单中添加该选项.
 * 
 * @param SOCommandName
 * @text 选项名称
 * @type string
 * @default 显示设置
 * @desc 在菜单中显示的名称,当使用默认设置时,将兼容多语言核心自动替换成对应语言.
 * 
 * @param ScreenWidth
 * @text 分辨率宽度
 * @type number
 * @default 1280
 * @desc 窗口分辨率设置.
 * 
 * @param ScreenHeight
 * @text 分辨率高度
 * @type number
 * @default 720
 * @desc 窗口分辨率设置.
 * 
 */

//==================================================
//
//      临时全局变量    ZPM.xxx
//		临时局部变量	this._ZPM_xxx
//		存储数据变量	无
//		全局存储变量	_Global_ScreenOptions_ScreenWidth
//                      _Global_ScreenOptions_ScreenHeight
//                      _Global_ScreenOptions_AlwaysOnTop
//                      _Global_ScreenOptions_Resizable
//		覆盖重写方法	无
//
//==================================================

//==================================================
//**    参数获取    **
//==================================================

if (Utils.isNwjs()) {
    var ZPMWindow = ZPMWindow || nw.Window.get();
    ZPMWindow.setResizable(false);
};
var Imported = Imported || {};
Imported.ZPM_ScreenOptions = true;
var ZPM = ZPM || {};

ZPM.parameters = PluginManager.parameters('ZPM_ScreenOptions');

ZPM.ScreenOptions_MenuScreenOptions = String(ZPM.parameters['MenuScreenOptions'] || 'false') === 'true';
ZPM.ScreenOptions_TitleScreenOptions = String(ZPM.parameters['TitleScreenOptions'] || 'false') === 'true';
ZPM.ScreenOptions_SOCommandName = String(ZPM.parameters['SOCommandName'] || '显示设置');
ZPM.ScreenOptions_ScreenWidth = parseInt(ZPM.parameters['ScreenWidth'] || 1280);
ZPM.ScreenOptions_ScreenHeight = parseInt(ZPM.parameters['ScreenHeight'] || 720);

//==================================================
//**    全局读取    **
//==================================================

if (!_ZPM_Global) {
    var _ZPM_Global = DataManager.loadGlobalInfo();
};

if (!ZPM.Global_ScreenOptions_ScreenWidth) {
    if (_ZPM_Global && _ZPM_Global[0] && _ZPM_Global[0]["_Global_ScreenOptions_ScreenWidth"]) {
        ZPM.Global_ScreenOptions_ScreenWidth = _ZPM_Global[0]["_Global_ScreenOptions_ScreenWidth"];
    } else {
        ZPM.Global_ScreenOptions_ScreenWidth = ZPM.ScreenOptions_ScreenWidth;
    };
};

if (!ZPM.Global_ScreenOptions_ScreenHeight) {
    if (_ZPM_Global && _ZPM_Global[0] && _ZPM_Global[0]["_Global_ScreenOptions_ScreenHeight"]) {
        ZPM.Global_ScreenOptions_ScreenHeight = _ZPM_Global[0]["_Global_ScreenOptions_ScreenHeight"];
    } else {
        ZPM.Global_ScreenOptions_ScreenHeight = ZPM.ScreenOptions_ScreenHeight;
    };
};

if (!ZPM.Global_ScreenOptions_AlwaysOnTop) {
    if (_ZPM_Global && _ZPM_Global[0] && _ZPM_Global[0]["_Global_ScreenOptions_AlwaysOnTop"]) {
        ZPM.Global_ScreenOptions_AlwaysOnTop = _ZPM_Global[0]["_Global_ScreenOptions_AlwaysOnTop"];
    } else {
        ZPM.Global_ScreenOptions_AlwaysOnTop = false;
    };
};

if (!ZPM.Global_ScreenOptions_Resizable) {
    if (_ZPM_Global && _ZPM_Global[0] && _ZPM_Global[0]["_Global_ScreenOptions_Resizable"]) {
        ZPM.Global_ScreenOptions_Resizable = _ZPM_Global[0]["_Global_ScreenOptions_Resizable"];
    } else {
        ZPM.Global_ScreenOptions_Resizable = false;
    };
};

SceneManager._screenWidth = ZPM.Global_ScreenOptions_ScreenWidth;
SceneManager._screenHeight = ZPM.Global_ScreenOptions_ScreenHeight;
SceneManager._boxWidth = ZPM.Global_ScreenOptions_ScreenWidth;
SceneManager._boxHeight = ZPM.Global_ScreenOptions_ScreenHeight;

//==================================================
//**    全局存储    **
//==================================================

var _ZPM_ScreenOptions_saveGlobal = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function (info) {
    if (!info[0]) {
        info[0] = [];
    };
    info[0]["_Global_ScreenOptions_ScreenWidth"] = ZPM.Global_ScreenOptions_ScreenWidth;
    info[0]["_Global_ScreenOptions_ScreenHeight"] = ZPM.Global_ScreenOptions_ScreenHeight;
    info[0]["_Global_ScreenOptions_AlwaysOnTop"] = ZPM.Global_ScreenOptions_AlwaysOnTop;
    info[0]["_Global_ScreenOptions_Resizable"] = ZPM.Global_ScreenOptions_Resizable;
    _ZPM_ScreenOptions_saveGlobal.call(this, info);
};

DataManager.forceSaveGlobalInfo = function () {
    var globalInfo = this.loadGlobalInfo() || [];
    globalInfo[0] = this.makeSavefileInfo();
    this.saveGlobalInfo(globalInfo);
};

//==================================================
//**    显示初始化    **
//==================================================

if (Imported.YEP_CoreEngine) {
    Yanfly.updateResolution = function () {
        var resizeWidth = ZPM.Global_ScreenOptions_ScreenWidth - window.innerWidth;
        var resizeHeight = ZPM.Global_ScreenOptions_ScreenHeight - window.innerHeight;
        if (!Imported.ScreenResolution) {
            window.resizeBy(resizeWidth, resizeHeight);
            //window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
            if (Utils.isNwjs()) {
                ZPMWindow.setPosition('center');
            } else {
                window.moveTo(Math.max(0, (window.screen.width - ZPM.Global_ScreenOptions_ScreenWidth) / 2), Math.max(0, ((window.screen.height - ZPM.Global_ScreenOptions_ScreenHeight) / 2 - 30)));
            };
        };
    };
};

if (!Imported.YEP_CoreEngine) {
    var _ZPM_ScreenResolution_SceneManager_run = SceneManager.run;
    SceneManager.run = function (sceneClass) {
        _ZPM_ScreenResolution_SceneManager_run.call(this, sceneClass);
        SceneManager.updateResolution();
    };
    SceneManager.updateResolution = function () {
        var resizeWidth = ZPM.Global_ScreenOptions_ScreenWidth - window.innerWidth;
        var resizeHeight = ZPM.Global_ScreenOptions_ScreenHeight - window.innerHeight;
        window.resizeBy(resizeWidth, resizeHeight);
        //window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
        if (Utils.isNwjs()) {
            ZPMWindow.setPosition('center');
        } else {
            window.moveTo(Math.max(0, (window.screen.width - ZPM.Global_ScreenOptions_ScreenWidth) / 2), Math.max(0, ((window.screen.height - ZPM.Global_ScreenOptions_ScreenHeight) / 2 - 30)));
        };
    };
};

//==================================================
//**    显示设置窗口类    **
//==================================================

//      主入口

function Window_ScreenOptions() {
    this.initialize.apply(this, arguments);
};

Window_ScreenOptions.prototype = Object.create(Window_Command.prototype);
Window_ScreenOptions.prototype.constructor = Window_ScreenOptions;

Window_ScreenOptions.prototype.initialize = function (x, y, width, height) {
    this._ZPM_alwaysontop = ZPM.Global_ScreenOptions_AlwaysOnTop;
    this._ZPM_resizable = ZPM.Global_ScreenOptions_Resizable;
    this.clearCommandList();
    this.makeCommandList();
    x = x || 0;
    y = y || 0;
    width = width || this.windowWidth();
    height = height || this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._ZPM_screenscaleindex = 0;
    this.getScreenScale();
    this.addResolutionWindow();
    if (Imported.ZPM_LanguageCore) {
        this.addLanguageSelectWindow();
    };
    this.refresh();
    this.select(0);
};

Window_ScreenOptions.prototype.getScreenScale = function () {
    var scale = Graphics.boxWidth / Graphics.boxHeight;
    switch (scale) {
        case 16 / 9:
            this._ZPM_screenscaleindex = 0;
            break;
        case 16 / 10:
            this._ZPM_screenscaleindex = 1;
            break;
        case 4 / 3:
            this._ZPM_screenscaleindex = 2;
            break;
        case 5 / 4:
            this._ZPM_screenscaleindex = 3;
            break;
        case 20 / 9:
            this._ZPM_screenscaleindex = 4;
            break;
        default:
            this._ZPM_screenscaleindex = 0;
            break;
    };
};

Window_ScreenOptions.prototype.addResolutionWindow = function () {
    this._ZPM_resolutionWindow = new Window_ScreenResolution();
    this._ZPM_resolutionWindow.setHandler('cancel', this.onResolutionWindowCancel.bind(this));
    this.addChild(this._ZPM_resolutionWindow);
    this._ZPM_resolutionWindow.x = (this.width - this._ZPM_resolutionWindow.width) / 2;
    this._ZPM_resolutionWindow.y = (this.height - this._ZPM_resolutionWindow.height) / 2;
    this._ZPM_resolutionWindow._ZPM_screenscaleindex = this._ZPM_screenscaleindex;
    this._ZPM_resolutionWindow.hide();
    this._ZPM_resolutionWindow.close();
};

Window_ScreenOptions.prototype.addLanguageSelectWindow = function () {
    this._ZPM_languageSelectWindow = new Window_LanguageSelect();
    this._ZPM_languageSelectWindow.setHandler('cancel', this.onLanguageSelectWindowCancel.bind(this));
    this.addChild(this._ZPM_languageSelectWindow);
    this._ZPM_languageSelectWindow.x = (this.width - this._ZPM_languageSelectWindow.width) / 2;
    this._ZPM_languageSelectWindow.y = (this.height - this._ZPM_languageSelectWindow.height) / 2;
    this._ZPM_languageSelectWindow.hide();
    this._ZPM_languageSelectWindow.close();
};

Window_ScreenOptions.prototype.onResolutionWindowCancel = function () {
    this._ZPM_resolutionWindow.close();
    this._ZPM_resolutionWindow.select(0);
    this._ZPM_resolutionWindow.deactivate();
    Input.clear();
    this.activate();
};

Window_ScreenOptions.prototype.onLanguageSelectWindowCancel = function () {
    this._ZPM_languageSelectWindow.close();
    this._ZPM_languageSelectWindow.deactivate();
    Input.clear();
    this.activate();
    SceneManager.push(Scene_EmptyForRefresh);
};

Window_ScreenOptions.prototype.makeCommandList = function () {
    this.addOptionCommands();
};

Window_ScreenOptions.prototype.addOptionCommands = function () {
    var str1 = '全屏切换';
    var str2 = this._ZPM_alwaysontop ? '置顶:已启用' : '置顶:已禁用';
    var str3 = this._ZPM_resizable ? '窗口拉伸:已启用' : '窗口拉伸:已禁用';
    var str4 = '分辨率';
    var str7 = '返回';
    if (Imported.ZPM_LanguageCore) {
        this.addCommand(LanguageManager.language, 'languageSelect', enable);
        str1 = LanguageManager.fullscreen;
        str2 = this._ZPM_alwaysontop ? LanguageManager.SOScreenAlwaysOnTopOn : LanguageManager.SOScreenAlwaysOnTopOff;
        str3 = this._ZPM_resizable ? LanguageManager.SOScreenResizableOn : LanguageManager.SOScreenResizableOff;
        str4 = LanguageManager.resolutionratio;
        str7 = LanguageManager.cancel;
    };
    var str5 = this.getScaleWords();
    var str6 = Graphics.boxWidth + ' x ' + Graphics.boxHeight;
    var enable = Utils.isNwjs();
    this.addCommand(str1, 'fullScreen', enable);
    this.addCommand(str2, 'alwaysOnTop', enable);
    this.addCommand(str3, 'resizable', enable);
    this.addCommand(str4, 'resolution', false);
    this.addCommand(str5, 'screenScale', enable);
    this.addCommand(str6, 'screenResolutionNow', enable);
    this.addCommand(str7, 'cancel');
};

Window_ScreenOptions.prototype.getScaleWords = function () {
    switch (this._ZPM_screenscaleindex) {
        case 0:
            return '16 : 9';
        case 1:
            return '16 : 10';
        case 2:
            return '4 : 3';
        case 3:
            return '5 : 4';
        case 4:
            return '20 : 9';
        default:
            return '16 : 9';
    };
};

Window_ScreenOptions.prototype.processOk = function () {
    if (this.isCurrentItemEnabled()) {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        //var value = this.getConfigValue(symbol);

        if (Imported.ZPM_LanguageCore) {
            if (symbol == 'languageSelect') {
                this.deactivate();
                this._ZPM_languageSelectWindow.refresh();
                this._ZPM_languageSelectWindow.show();
                this._ZPM_languageSelectWindow.open();
                this._ZPM_languageSelectWindow.x = (this.width - this._ZPM_languageSelectWindow.width) / 2;
                this._ZPM_languageSelectWindow.y = (this.height - this._ZPM_languageSelectWindow.height) / 2;
                this._ZPM_languageSelectWindow.activate();
                this._ZPM_languageSelectWindow.refresh();
            };
        };
        if (symbol == 'fullScreen') {
            Graphics._switchFullScreen();
        } else if (symbol == 'screenResolutionNow') {
            this.deactivate();
            this._ZPM_resolutionWindow._ZPM_screenscaleindex = this._ZPM_screenscaleindex;
            this._ZPM_resolutionWindow.refresh();
            this._ZPM_resolutionWindow.show();
            this._ZPM_resolutionWindow.open();
            this._ZPM_resolutionWindow.x = (this.width - this._ZPM_resolutionWindow.width) / 2;
            this._ZPM_resolutionWindow.y = (this.height - this._ZPM_resolutionWindow.height) / 2;
            this._ZPM_resolutionWindow.activate();
            this._ZPM_resolutionWindow.refresh();
        } else if (symbol == 'alwaysOnTop') {
            this._ZPM_alwaysontop = !this._ZPM_alwaysontop;
            ZPM.Global_ScreenOptions_AlwaysOnTop = this._ZPM_alwaysontop;
            DataManager.forceSaveGlobalInfo();
            ZPMWindow.setAlwaysOnTop(this._ZPM_alwaysontop);
            this.refresh();
        } else if (symbol == 'resizable') {
            this._ZPM_resizable = !this._ZPM_resizable;
            ZPM.Global_ScreenOptions_Resizable = this._ZPM_resizable;
            DataManager.forceSaveGlobalInfo();
            ZPMWindow.setResizable(this._ZPM_resizable);
            this.refresh();
        } else if (symbol == 'cancel') {
            if (this.isCancelEnabled()) {
                this.callHandler('cancel');
            };
        } else if (symbol == 'screenScale') {
            this._ZPM_screenscaleindex++;
            if (this._ZPM_screenscaleindex > 4) {
                this._ZPM_screenscaleindex = 0;
            };
            this.refresh();
        };
        this.playOkSound();
    } else {
        this.playBuzzerSound();
    };
};

Window_ScreenOptions.prototype.windowWidth = function () {
    return 320;
};

Window_ScreenOptions.prototype.maxCols = function () {
    return 1;
};

Window_ScreenOptions.prototype.itemTextAlign = function () {
    return 'center';
};

//==================================================
//**    分辨率窗口类    **
//==================================================

//      子窗口

function Window_ScreenResolution() {
    this.initialize.apply(this, arguments);
};

Window_ScreenResolution.prototype = Object.create(Window_Command.prototype);
Window_ScreenResolution.prototype.constructor = Window_ScreenResolution;

Window_ScreenResolution.resolution4x3 = [[640, 480], [800, 600], [960, 720], [1024, 768],
[1280, 960], [1400, 1050], [1600, 1200], [1920, 1440],
[2048, 1536], [2560, 1920], [2880, 2160]];

Window_ScreenResolution.resolution16x9 = [[640, 360], [800, 450], [960, 540], [1280, 720],
[1366, 768], [1600, 900], [1920, 1080], [2240, 1260],
[2560, 1440], [3040, 1710], [3520, 1980], [3840, 2160]];

Window_ScreenResolution.resolution16x10 = [[640, 400], [800, 480], [960, 600], [1024, 600],
[1280, 800], [1440, 900], [1680, 1050], [1920, 1200],
[2240, 1400], [2560, 1600], [2880, 1800], [3456, 2160]];

Window_ScreenResolution.resolution5x4 = [[640, 512], [800, 640], [1000, 800], [1280, 1024],
[1400, 1120], [1440, 1152], [1640, 1312], [1920, 1536],
[2000, 1600], [2400, 1920], [2700, 2160]];

Window_ScreenResolution.resolutionPhone = [[1280, 720], [1280, 800], [1400, 900], [1600, 900], [1920, 1080],
[2400, 1080]];

Window_ScreenResolution.prototype.initialize = function (x, y) {
    this.clearCommandList();
    this.makeCommandList();
    x = x || 0;
    y = y || 0;
    width = this.windowWidth();
    height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.select(0);
    this._ZPM_screenscaleindex = 0;
};

Window_ScreenResolution.prototype.makeCommandList = function () {
    this.addResolutionCommands();
};

Window_ScreenResolution.prototype.getResolutionTable = function () {
    switch (this._ZPM_screenscaleindex) {
        case 0:
            return Window_ScreenResolution.resolution16x9;
        case 1:
            return Window_ScreenResolution.resolution16x10;
        case 2:
            return Window_ScreenResolution.resolution4x3;
        case 3:
            return Window_ScreenResolution.resolution5x4;
        case 4:
            return Window_ScreenResolution.resolutionPhone;
        default:
            return Window_ScreenResolution.resolution16x9;
    };
};

Window_ScreenResolution.prototype.addResolutionCommands = function () {
    var str1 = '(目前)';
    var str2 = '返回';
    if (Imported.ZPM_LanguageCore) {
        num = LanguageManager._languageId;
        str1 = LanguageManager.currect;
        str2 = LanguageManager.cancel;
    };
    var table = this.getResolutionTable();
    var sw = window.screen.width;
    var sh = window.screen.height;
    var bw = Graphics.boxWidth;
    var bh = Graphics.boxHeight;
    var tempwords;
    for (var i = 0; i < table.length; i++) {
        if (table[i][0] > sw || table[i][1] > sh) {
            break;
        };
        tempwords = table[i][0] + ' x ' + table[i][1];
        if (table[i][0] == bw && table[i][1] == bh) {
            tempwords = tempwords + str1;
        };
        this.addCommand(tempwords, 'resolution' + i);
    };
    this.addCommand(str2, 'cancel');
};

Window_ScreenResolution.prototype.processOk = function () {
    if (this.isCurrentItemEnabled()) {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        if (this.isResolutionSymbol(symbol)) {
            this.setResolution();
        } else if (symbol == 'cancel') {
            if (this.isCancelEnabled()) {
                this.callHandler('cancel');
            };
        };
        this.playOkSound();
    } else {
        this.playBuzzerSound();
    };
};

Window_ScreenResolution.prototype.setResolution = function () {
    var table = this.getResolutionTable();
    var cw = table[this._index][0]
    var ch = table[this._index][1]
    ZPM.Global_ScreenOptions_ScreenWidth = cw;
    ZPM.Global_ScreenOptions_ScreenHeight = ch;
    var resizeWidth = cw - window.innerWidth;
    var resizeHeight = ch - window.innerHeight;
    Graphics.boxWidth = cw;
    Graphics.boxHeight = ch;
    Graphics.width = cw;
    Graphics.height = ch;
    Graphics._updateRenderer();
    window.resizeBy(resizeWidth, resizeHeight);
    ZPMWindow.setPosition('center');
    //window.moveTo(Math.max(0, (window.screen.width - cw) / 2), Math.max(0, ((window.screen.height - ch) / 2 - 30)));
    DataManager.forceSaveGlobalInfo();
    SceneManager.push(Scene_EmptyForRefresh);
};

Window_ScreenResolution.prototype.isResolutionSymbol = function (symbol) {
    return symbol.contains('resolution');
};

Window_ScreenResolution.prototype.windowWidth = function () {
    return 240;
};

Window_ScreenResolution.prototype.windowHeight = function () {
    return Math.min(this.fittingHeight(this.numVisibleRows()), (Graphics.boxHeight - 64));
};

Window_ScreenResolution.prototype.maxCols = function () {
    return 1;
};

Window_ScreenResolution.prototype.itemTextAlign = function () {
    return 'center';
};

Window_ScreenResolution.prototype.refresh = function () {
    Window_Command.prototype.refresh.call(this);
    this.width = this.windowWidth();
    this.height = this.windowHeight();
};

//==================================================
//**    刷新用空场景类    **
//==================================================

function Scene_EmptyForRefresh() {
    this.initialize.apply(this, arguments);
}

Scene_EmptyForRefresh.prototype = Object.create(Scene_Base.prototype);
Scene_EmptyForRefresh.prototype.constructor = Scene_EmptyForRefresh;

Scene_EmptyForRefresh.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
};

Scene_EmptyForRefresh.prototype.create = function () {
};

Scene_EmptyForRefresh.prototype.update = function () {
    SceneManager.pop();
};

//==================================================
//**    主菜单添加    **
//==================================================

var _ZPM_ScreenResolution_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands
Window_MenuCommand.prototype.addOriginalCommands = function () {
    _ZPM_ScreenResolution_Window_MenuCommand_addOriginalCommands.call(this);
    if (ZPM.ScreenOptions_MenuScreenOptions) {
        var tempname = ZPM.ScreenOptions_SOCommandName;
        if (tempname == '显示设置') {
            tempname = LanguageManager.SOCommandNameTable;
        };
        this.addCommand(tempname, 'screenoptions');
    };
};

var _ZPM_ScreenResolution_Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function () {
    _ZPM_ScreenResolution_Scene_Menu_create.call(this);
    if (ZPM.ScreenOptions_MenuScreenOptions) {
        this.createScreenOptionsWindow();
    };
};

Scene_Menu.prototype.createScreenOptionsWindow = function () {
    this._ZPM_screenOptionsWindow = new Window_ScreenOptions();
    this._ZPM_screenOptionsWindow.setHandler('cancel', this.onScreenOptionsCancel.bind(this));
    this.addChild(this._ZPM_screenOptionsWindow);
    this._ZPM_screenOptionsWindow.x = (Graphics.boxWidth - this._ZPM_screenOptionsWindow.width) / 2;
    this._ZPM_screenOptionsWindow.y = (Graphics.boxHeight - this._ZPM_screenOptionsWindow.height) / 2;
    this._ZPM_screenOptionsWindow.hide();
    this._ZPM_screenOptionsWindow.close();
};

Scene_Menu.prototype.onScreenOptionsCancel = function () {
    this._ZPM_screenOptionsWindow.deactivate();
    this._ZPM_screenOptionsWindow.close();
    this._commandWindow.activate();
};

var _ZPM_ScreenResolution_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function () {
    _ZPM_ScreenResolution_Scene_Menu_createCommandWindow.call(this);
    if (ZPM.ScreenOptions_MenuScreenOptions) {
        this._commandWindow.setHandler('screenoptions', this.commandResolution.bind(this));
    };
};

Scene_Menu.prototype.commandResolution = function () {
    this._commandWindow.deactivate();
    this._ZPM_screenOptionsWindow.show();
    this._ZPM_screenOptionsWindow.open();
    this._ZPM_screenOptionsWindow.activate();
};

//==================================================
//**    标题菜单添加    **
//==================================================

var _ZPM_ScreenOptions_Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function () {
    _ZPM_ScreenOptions_Scene_Title_createCommandWindow.call(this);
    if (ZPM.ScreenOptions_TitleScreenOptions) {
        this.createScreenOptionsWindow();
    };
};

Scene_Title.prototype.createScreenOptionsWindow = function () {
    this._ZPM_screenOptionsWindow = new Window_ScreenOptions();
    this._ZPM_screenOptionsWindow.setHandler('cancel', this.onScreenOptionsCancel.bind(this));
    this._commandWindow.setHandler('screenoptions', this.commandResolution.bind(this));
    this.addChild(this._ZPM_screenOptionsWindow);
    this._ZPM_screenOptionsWindow.x = (Graphics.boxWidth - this._ZPM_screenOptionsWindow.width) / 2;
    this._ZPM_screenOptionsWindow.y = (Graphics.boxHeight - this._ZPM_screenOptionsWindow.height) / 2;
    this._ZPM_screenOptionsWindow.hide();
    this._ZPM_screenOptionsWindow.close();
};

Scene_Title.prototype.onScreenOptionsCancel = function () {
    this._ZPM_screenOptionsWindow.deactivate();
    this._ZPM_screenOptionsWindow.close();
    this._commandWindow.activate();
};

Scene_Title.prototype.commandResolution = function () {
    this._commandWindow.deactivate();
    this._ZPM_screenOptionsWindow.show();
    this._ZPM_screenOptionsWindow.open();
    this._ZPM_screenOptionsWindow.activate();
};

var _ZPM_ScreenOptions_Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function () {
    _ZPM_ScreenOptions_Window_TitleCommand_makeCommandList.call(this);
    if (ZPM.ScreenOptions_TitleScreenOptions) {
        var tempname = ZPM.ScreenOptions_SOCommandName;
        if (tempname == '显示设置') {
            if (Imported.ZPM_LanguageCore) {
                tempname = LanguageManager.SOCommandNameTable;
            };
        };
        this.addCommand(tempname, 'screenoptions');
    };
};