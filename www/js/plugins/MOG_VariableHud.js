//=============================================================================
// MOG_VariableHud.js
//=============================================================================

/*:
 * @plugindesc (v1.4)[v1.2]  画面 - 变量固定框
 * @author Moghunter  （Drill_up翻译+优化）
 * 
 * @help  
 * =============================================================================
 * +++ MOG - Variable HUD (v1.4) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 在地图画面新建n个显示变量或者物品数量的框。
 * 【现已支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 先确保项目img文件夹下是否有variablehud文件夹！（img/variablehud）
 * 建立一个新的框，需要配置资源文件：
 *
 * 资源-变量框
 * 资源-变量条
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令设置变量框的显示，也可以手动更改框的最大值：
 * （注意冒号两边都有空格。）
 *
 * 插件指令（显示）：     show_variable_hud : A
 * 插件指令（隐藏）：     hide_variable_hud : A
 * 插件指令（改最大值）： set_variable_max : A : B
 *
 * 参数A：变量框的id号。
 * 参数B：最大值。
 *
 * 示例：
 * show_variable_hud : 1 （显示第一个变量框）
 * set_variable_max : 1 : 20 （设置第一个变量框最大值为20）
 * 一般改最大值用于猎杀任务中突然变更的情况。
 *
 * -----------------------------------------------------------------------------
 * ----关于一个难以捉摸的bug
 * 设置初始显示，或者通过插件指令显示。都没效果。
 * （但是实际上变量都在正常工作）
 * 然而，只要进入主菜单面板，然后返回到地图，原来的配置就都起效了。
 * （原作者的演示里面，这样做图标就直接就没了。。。）
 * 现在唯一需要的就是让玩家刷一下菜单，就没问题了。
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 使得该插件支持关联资源的打包、加密。
 * 部署时勾选去除无关文件，本插件中相关的文件不会被去除。
 * [v1.2]
 * 将原本mog插件复杂冗余的配置转成简单易懂的结构体配置。
 *  
 * @param ---变量框组 1至20---
 * @default
 *
 * @param 变量框-1
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-2
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-3
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-4
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-5
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-6
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-7
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-8
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-9
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-10
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-11
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-12
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-13
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-14
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-15
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-16
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-17
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-18
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-19
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-20
 * @parent ---变量框组 1至20---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param ---变量框组21至40---
 * @default
 *
 * @param 变量框-21
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-22
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-23
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-24
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-25
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-26
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-27
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-28
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-29
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-30
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-31
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-32
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-33
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-34
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-35
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-36
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-37
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-38
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-39
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 *
 * @param 变量框-40
 * @parent ---变量框组21至40---
 * @type struct<VariableHud>
 * @desc 变量框的详细配置信息。
 * @default 
 */
/*~struct~VariableHud:
 * 
 * @param 是否启用该框
 * @type boolean
 * @on 启用
 * @off 永久关闭
 * @desc true - 启用，false - 永久关闭
 * @default false
 *
 * @param 是否初始显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default false
 * 
 * @param 变量框指示模式
 * @type select
 * @option 变量
 * @value 0
 * @option 物品
 * @value 1
 * @desc 0 - 绑定事件变量的值，实时显示。
 * 1 - 绑定指定物品的数量，实时显示。
 * @default 0
 * 
 * @param 对应的变量id
 * @parent 变量框指示模式
 * @type variable
 * @desc 变量模式下对应变量id号，如果是物品模式，此项无效。
 * @default 1
 *
 * @param 对应的物品id
 * @parent 变量框指示模式
 * @type item
 * @desc 物品模式下对应变量id号，如果是变量模式，此项无效。
 * @default 1
 * 
 * @param 资源-变量框
 * @desc 变量框的图片资源。
 * @default 
 * @require 1
 * @dir img/variablehud/
 * @type file
 *
 * @param 平移-变量框 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 平移-变量框 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 平移-变量数值 X
 * @desc 以变量框中心为基准。x轴方向平移，单位像素。（可为负数）
 * @default -10
 *
 * @param 平移-变量数值 Y
 * @desc 以变量框中心为基准。y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 变量数值对齐方式
 * @type select
 * @option 左对齐
 * @value 0
 * @option 居中
 * @value 1
 * @option 右对齐
 * @value 2
 * @desc 0 - 左对齐   1 - 居中   2 - 右对齐
 * @default 1
 *
 * @param 变量数值字体大小
 * @type number
 * @min 1
 * @desc 变量数值的字体大小。
 * @default 18
 * 
 * @param 最大值
 * @type number
 * @min 1
 * @desc 变量能显示的最大值。
 * 设置10，如果物品数量为15，则仍然显示10。
 * @default 9999
 *
 * @param 是否显示最大值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default false
 *
 * @param 是否显示变量条
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default false
 * 
 * @param 资源-变量条
 * @desc 变量条的图片资源。
 * @default 
 * @require 1
 * @dir img/variablehud/
 * @type file
 *
 * @param 平移-变量条 X
 * @desc 以变量框左上角点为基准。x轴方向平移，单位像素。（可为负数）
 * @default 52
 *
 * @param 平移-变量条 Y
 * @desc 以变量框左上角点为基准。y轴方向平移，单位像素。（可为负数）
 * @default 37
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_VariableHud = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_VariableHud');
    Moghunter.variableHud_Max = 40;	Moghunter.variableHud_Visible = [];
	Moghunter.variableHud_VisibleInt = []; Moghunter.variableHud_ValueLimit = [];
	Moghunter.variableHud_VariableID = [];
	Moghunter.variableHud_FileName = [];Moghunter.variableHud_FileName_Gauge = [];
	Moghunter.variableHud_LayX = []; Moghunter.variableHud_LayY = [];
	Moghunter.variableHud_NumX = []; Moghunter.variableHud_NumY = [];
	Moghunter.variableHud_NumAlign = []; Moghunter.variableHud_NumFontSize = [];
	Moghunter.variableHud_Type = []; Moghunter.variableHud_ShowMax = [];
	Moghunter.variableHud_ShowGauge = []; Moghunter.variableHud_gaugeX = [];
	Moghunter.variableHud_gaugeY = [];
	Moghunter.variableHud_ = [];
	for (var i = 0; i < Moghunter.variableHud_Max; i++) {
		if( Moghunter.parameters['变量框-' + String(i + 1) ] != "" ){
			//parse对空值转换会报错
			Moghunter.variableHud_[i] = JSON.parse(Moghunter.parameters['变量框-' + String(i + 1) ]);
		}else{
			Moghunter.variableHud_[i] = [] ;
		}
		//for(var a in Moghunter.variableHud[i]){
		//textb ="key:"+a+" value:"+Moghunter.variableHud[i][a]+"\n";
		//alert(textb);
		//}
		Moghunter.variableHud_Visible[i] = String(Moghunter.variableHud_[i]['是否启用该框'] || 'false');
		Moghunter.variableHud_VisibleInt[i] = String(Moghunter.variableHud_[i]['是否初始显示'] || 'false');
		Moghunter.variableHud_Type[i] = Number(Moghunter.variableHud_[i]['变量框指示模式'] || 0);
		Moghunter.variableHud_VariableID[i] = Number(Moghunter.variableHud_[i]['对应的变量id'] || 1);
		if( Moghunter.variableHud_Type[i] == 1 ){
			Moghunter.variableHud_VariableID[i] = Number(Moghunter.variableHud_[i]['对应的物品id'] || 1);
		}
		Moghunter.variableHud_ValueLimit[i] = Number(Moghunter.variableHud_[i]['最大值'] || 999);
        Moghunter.variableHud_FileName[i] = String(Moghunter.variableHud_[i]['资源-变量框'] || '');
		Moghunter.variableHud_LayX[i] = Number(Moghunter.variableHud_[i]['平移-变量框 X'] || 0);
		Moghunter.variableHud_LayY[i] = Number(Moghunter.variableHud_[i]['平移-变量框 Y'] || 0);
		Moghunter.variableHud_NumX[i] = Number(Moghunter.variableHud_[i]['平移-变量数值 X'] || -7);
		Moghunter.variableHud_NumY[i] = Number(Moghunter.variableHud_[i]['平移-变量数值 Y'] || 10);
		Moghunter.variableHud_NumAlign[i] = Number(Moghunter.variableHud_[i]['变量数值对齐方式'] || 1);
		Moghunter.variableHud_NumFontSize[i] = Number(Moghunter.variableHud_[i]['变量数值字体大小'] || 18);
		Moghunter.variableHud_ShowMax[i] = String(Moghunter.variableHud_[i]['是否显示最大值'] || 'false');
		Moghunter.variableHud_ShowGauge[i] = String(Moghunter.variableHud_[i]['是否显示变量条'] || 'false');
        Moghunter.variableHud_FileName_Gauge[i] = String(Moghunter.variableHud_[i]['资源-变量条'] || '');
		Moghunter.variableHud_gaugeX[i] = Number(Moghunter.variableHud_[i]['平移-变量条 X'] || 0);
		Moghunter.variableHud_gaugeY[i] = Number(Moghunter.variableHud_[i]['平移-变量条 Y'] || 0);
		//alert(Moghunter.variableHud_VisibleInt[i]);
		
	};	
	
//=============================================================================
// ** ImageManager
//=============================================================================	

//=============================
// ** Load Variable Hud
//=============================
ImageManager.loadVariableHud = function(filename) {
    return this.loadBitmap('img/variablehud/', filename, 0, true);
};	
	
//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_variableHud_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_variableHud_pluginCommand.call(this,command, args)
	if (command === "hide_variable_hud") {
		var varID = Number(args[1]) - 1;
		if ($gameSystem._variableHudData[varID]) {
	         $gameSystem._variableHudData[varID].visible = false;
		};
    } else if (command === "show_variable_hud") {
		var varID = Number(args[1]) - 1;
		if ($gameSystem._variableHudData[varID]) {
	         $gameSystem._variableHudData[varID].visible = true;
		};		
	};
	if (command === "set_variable_max")  {
		var id = Number(args[1]);
		var maxvalue = args[3] != null ? Number(args[3]) : 0;		
		for (var i = 0; i < Moghunter.variableHud_Max; i++) {
			var vid = Moghunter.variableHud_VariableID[i];
			if ($gameSystem._variableHudData[i] && vid === id) {
				$gameSystem._variableHudData[i].maxValue = maxvalue;
			};
		};
	};
	return true;
};

//=============================================================================
// ** Game System
//=============================================================================	

//==============================
// * Initialize
//==============================
var _mog_variableHud_gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_mog_variableHud_gsys_initialize.call(this);
	this._variableHudData = [];
	this._variableHudVisible = true;
};

//=============================================================================
// ** Game Character Base 
//=============================================================================

//==============================
// * Screen RealX
//==============================
Game_CharacterBase.prototype.screen_realX = function() {
    return this.scrolledX() * $gameMap.tileWidth()
};

//==============================
// * Screen RealY
//==============================
Game_CharacterBase.prototype.screen_realY = function() {
    return this.scrolledY() * $gameMap.tileHeight()
};

//=============================================================================
// ** Scene Base
//=============================================================================

//==============================
// ** create Hud Field
//==============================
Scene_Base.prototype.createHudField = function() {
	this._hudField = new Sprite();
	this._hudField.z = 10;
	this.addChild(this._hudField);
};

//==============================
// ** sort MZ
//==============================
Scene_Base.prototype.sortMz = function() {
   this._hudField.children.sort(function(a, b){return a.mz-b.mz});
};	

//=============================================================================
// ** Scene Map
//=============================================================================	

//==============================
// ** create Spriteset
//==============================
var _mog_VariableHud_sMap_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function() {
	_mog_VariableHud_sMap_createSpriteset.call(this);
	if (!this._hudField) {this.createHudField()};
	this.createVariableHuds();
	this.sortMz();
};

//==============================
// * create VariableHuds
//==============================
Scene_Map.prototype.createVariableHuds = function() {
	this._variableHud = [];
	for (var i = 0; i < Moghunter.variableHud_Max; i++) {
		if (!$gameSystem._variableHudData[i]) {
			 $gameSystem._variableHudData[i] = {}
		     var vis =  Moghunter.variableHud_VisibleInt[i] === "true" ? true : false;
			 $gameSystem._variableHudData[i].id = i;
			 $gameSystem._variableHudData[i].visible = vis;
			 $gameSystem._variableHudData[i].maxValue = Number(Moghunter.variableHud_ValueLimit[i]);			 
			 $gameSystem._variableHudData[i].showMax = String(Moghunter.variableHud_ShowMax[i]) === "true" ? true : false;
			 $gameSystem._variableHudData[i].gauge = String(Moghunter.variableHud_ShowGauge[i]) === "true" ? true : false;
			 $gameSystem._variableHudData[i].gaugeX = Number(Moghunter.variableHud_gaugeX[i]);
			 $gameSystem._variableHudData[i].gaugeY = Number(Moghunter.variableHud_gaugeY[i]);
		};
		this._variableHud[i] = new VariableHud(i);
	    this._variableHud[i].mz = 120;
	    this._hudField.addChild(this._variableHud[i]);			
	};
};

//=============================================================================
// ** Variable Hud
//=============================================================================
function VariableHud() {
    this.initialize.apply(this, arguments);
};

VariableHud.prototype = Object.create(Sprite.prototype);
VariableHud.prototype.constructor = VariableHud;

//==============================
// * Initialize
//==============================
VariableHud.prototype.initialize = function(index) {
    Sprite.prototype.initialize.call(this);
	this._index = index;
	this._enabled = String(Moghunter.variableHud_Visible[this._index]) === "true" ? true : false;
    if (this._enabled) {this.createSprites()};
};


//==============================
// * data Sys
//==============================
VariableHud.prototype.dataSys = function() {	
    return $gameSystem._variableHudData[this._index];
};

//==============================
// * Variable ID
//==============================
VariableHud.prototype.variableID = function() {	
    return Moghunter.variableHud_VariableID[this._index]
};

//==============================
// * max Value
//==============================
VariableHud.prototype.maxValue = function() {	
    return this.dataSys().maxValue;
};

//==============================
// * show Max
//==============================
VariableHud.prototype.showMax = function() {
   return this.dataSys().showMax;
};

//==============================
// * show Gauge 
//==============================
VariableHud.prototype.showGauge = function() {
   return this.dataSys().gauge;
};

//==============================
// * Type
//==============================
VariableHud.prototype.type = function() {
   return Moghunter.variableHud_Type[this._index];
};

//==============================
// * Number
//==============================
VariableHud.prototype.number = function() {
	return this.type() === 0 ? $gameVariables.value(this.variableID()) : $gameParty.numItems(this.item());
};

//==============================
// * item
//==============================
VariableHud.prototype.item = function() {
	return $dataItems[this.variableID()];
};

//==============================
// * Create Sprites
//==============================
VariableHud.prototype.createSprites = function() {
     this._variable = $gameVariables.value(this.variableID());
	 this._hud_size = [-1,0,0,0];
	 this.x = Number(Moghunter.variableHud_LayX[this._index]);
	 this.y = Number(Moghunter.variableHud_LayY[this._index]);
     this.createLayout();
	 if (this.showGauge()) {this.createGauge()};
	 this.createNumber();
	 this.refreshHud();
	 this._maxValue = this.maxValue();
	 if (this.needHide()) {this.opacity = 0};
};

//==============================
// * Create Layout
//==============================
VariableHud.prototype.createLayout = function() {
	 var fileName = String(Moghunter.variableHud_FileName[this._index]);
     this._layout = new Sprite(ImageManager.loadVariableHud(fileName));
	 this.addChild(this._layout);
};

//==============================
// * Create Gauge
//==============================
VariableHud.prototype.createGauge = function() {
	 var fileName = String(Moghunter.variableHud_FileName_Gauge[this._index]);
     this._gaugeImg = ImageManager.loadVariableHud(fileName)
	 this._gauge = new Sprite(this._gaugeImg);
	 this._gauge.x = this.dataSys().gaugeX;
	 this._gauge.y = this.dataSys().gaugeY;
	 this.addChild(this._gauge);
	 this.refreshGauge();
};

//==============================
// * refresh Gauge
//==============================
VariableHud.prototype.refreshGauge = function() {
    var wd = this._gaugeImg.width * this._variable / this.maxValue();
	var ch = this._gaugeImg.height;
	this._gauge.setFrame(0,0,wd,ch);
};

//==============================
// * Create Number
//==============================
VariableHud.prototype.createNumber = function() {
     this._number = new Sprite(new Bitmap(200,46));
	 this._number.x = Number(Moghunter.variableHud_NumX[this._index]);
	 this._number.y = Number(Moghunter.variableHud_NumY[this._index]);
	 this._number.bitmap.fontSize = Moghunter.variableHud_NumFontSize[this._index]
	 this.addChild(this._number);
};

//==============================
// * Refresh Number
//==============================
VariableHud.prototype.refreshNumber = function() {	
    this._number.bitmap.clear();	
 	var maxv = (Math.abs(this.maxValue()).toString().split("")); 
	var maxv2 = Number(maxv.length);
	var text = this.showMax() ? (this._variable).padZero(maxv2) + "/" + this.maxValue() : String(this._variable);
	//var text = (this._variable).padZero(maxv2) + "/" + this.maxValue();
	this._number.bitmap.drawText(text,0,0,190,44,this.aligntype());
};

//==============================
// * Refresh Hud
//==============================
VariableHud.prototype.refreshHud = function() {
	if (this.type() === 0) {
		if (this.number() > this.maxValue()) {
			$gameVariables.setValue(this.variableID(), this.maxValue());
		};
	};
	this._variable = this.number();
	this._maxValue = this.maxValue();
	$gameSystem._variableHudData[this._index].needRefresh = false
	this.refreshNumber();
	if (this._gauge) {this.refreshGauge()};
};


//==============================
// * need Refresh Hud
//==============================
VariableHud.prototype.needRefreshHud = function() {
	if (this._variable != this.number()) {return true};
	if (this._maxValue != this.maxValue()) {return true};
	return false
};

//==============================
// * Align Type
//==============================
VariableHud.prototype.aligntype = function() {
   if (Moghunter.variableHud_NumAlign[this._index] === 0) {return "left"    
   } else if (Moghunter.variableHud_NumAlign[this._index] === 1) {return "center"
   } else {return "right"};
};

//==============================
// * Update
//==============================
VariableHud.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._enabled) {this.updateSprites()};
};

//==============================
// * Need Hide
//==============================
VariableHud.prototype.needHide = function() {
    if ($gameMessage.isBusy()) {return true};
	if ($gameSystem._variableHudData[i] && !$gameSystem._variableHudData[i].visible) {return true};
	if (Imported.MOG_ChronoEngine && $gameSystem.isChronoMode()) {return true};
	return false;
};

//==============================
// * Need Fade
//==============================
VariableHud.prototype.needFade = function() {
    if (this._hud_size[0] === -1) {return false};
	if ($gamePlayer.screen_realX() < this._hud_size[0]) {return false};
	if ($gamePlayer.screen_realX() > this._hud_size[2]) {return false};
	if ($gamePlayer.screen_realY() < this._hud_size[1]) {return false};
	if ($gamePlayer.screen_realY() > this._hud_size[3]) {return false};	
    return true;
};

//==============================
// * get Data
//==============================
VariableHud.prototype.getData = function() {
	  this._hud_size[0] =  this.x - ($gameMap.tileWidth() / 2);
	  this._hud_size[1] =  this.y - ($gameMap.tileHeight() / 2);
	  this._hud_size[2] =  this.x + this._layout.bitmap.width;
	  this._hud_size[3] =  this.y + this._layout.bitmap.height;
};

//==============================
// * Update Visible
//==============================
VariableHud.prototype.updateVisible = function() {
     if (this.needHide()) {
		 this.opacity -= 15;
	 } else {
		 if (this.needFade()) {
			 if (this.opacity > 90) {
				 this.opacity -= 10;
			     if (this.opacity < 90) {this.opacity = 90};
			 };
		 } else {
			 this.opacity += 10;
		 };
	 };
};

//==============================
// * Update Sprites
//==============================
VariableHud.prototype.updateSprites = function() {
    if (this.needRefreshHud()) {this.refreshHud()};
	if (this._hud_size[0] === -1 && this._layout.bitmap.isReady()) {this.getData()};
	this.updateVisible();
};