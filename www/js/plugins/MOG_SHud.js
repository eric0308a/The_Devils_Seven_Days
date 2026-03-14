//=============================================================================
// MOG_SHud.js
//=============================================================================

/*:
 * @plugindesc (v1.3)[v1.4]  地图UI - 简单生命框
 * @author Moghunter （Drill_up翻译+优化）
 *
 * @param 是否初始显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default false 
 *
 * @param 资源-生命框
 * @desc 生命框的图片资源。
 * @default 地图简单生命框-框
 * @require 1
 * @dir img/Map__ui/
 * @type file
 *
 * @param 平移-生命框 X
 * @desc 以地图角色的中心为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-生命框 Y
 * @desc 以地图角色的中心为基准，y轴方向平移，单位像素。（可为负数）
 * @default -60
 *
 * @param 资源-生命条
 * @desc 生命条的图片资源。
 * @default 地图简单生命框-生命条
 * @require 1
 * @dir img/Map__ui/
 * @type file
 *
 * @param 生命条是否流动
 * @type boolean
 * @on 流动
 * @off 不流动
 * @desc true - 流动，false - 不流动，注意，设置为流动时，实际长度将为资源的三分之一。
 * @default true
 *
 * @param 平移-生命条 X
 * @desc 以生命框为基准，x轴方向平移，单位像素。（可为负数）
 * @default 3
 *
 * @param 平移-生命条 Y
 * @desc 以生命框为基准，y轴方向平移，单位像素。（可为负数）
 * @default 2
 *
 * @help  
 * =============================================================================
 * +++ MOG S Hud (v1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 在地图的玩家位置头上显示一个小的生命框。
 * 【现已支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   添加在地图的ui层。
 *
 * -----------------------------------------------------------------------------
 * ----素材规则
 * 不流动生命条的长度是资源图片长度。
 * 流动生命条的长度是资源图片长度的三分之一。
 * 如果开启了生命条流动，那么生命条的图片会分成3等份，第1份和第3份要
 * 一模一样，第2份是第1份和第3份的过渡。（其它条与生命条一样）
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__ui （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__ui文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 需要配置资源文件：
 *
 * 资源-生命框
 * 资源-生命条
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以使用下面插件指令隐藏或者显示生命框：
 *
 * 插件指令（隐藏）：hide_s_hud
 * 插件指令（显示）：show_s_hud
 * 
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 使得该插件支持关联资源的打包、加密。
 * 部署时勾选去除无关文件，本插件中相关的文件不会被去除。
 * [v1.2]
 * 设置为生命条可以流动。
 * [v1.3]
 * 修改了插件分类。
 * [v1.4]
 * 修改了插件关联的资源文件夹。
 *        
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_SHud = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_SHud');
   
    // HUD POSITION
	Moghunter.shud_pos_x = Number(Moghunter.parameters['平移-生命框 X'] || 0);
	Moghunter.shud_pos_y = Number(Moghunter.parameters['平移-生命框 Y'] || -60);
	Moghunter.shud_meter_x = Number(Moghunter.parameters['平移-生命条 X'] || 3);
	Moghunter.shud_meter_y = Number(Moghunter.parameters['平移-生命条 Y'] || 2);
	Moghunter.shud_hudvisible = String(Moghunter.parameters['是否初始显示'] || "true");
	Moghunter.shud_meter_flow = String(Moghunter.parameters['生命条是否流动'] || "true");
	
	Moghunter.src_shud_A = String(Moghunter.parameters['资源-生命框']);
	Moghunter.src_shud_B = String(Moghunter.parameters['资源-生命条']);
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapUi = function(filename) {
    return this.loadBitmap('img/Map__ui/', filename, 0, true);
};

//=============================================================================
// ** Game_System
//=============================================================================
//==============================
// * Initialize
//==============================
var _alias_mog_shud_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias_mog_shud_sys_initialize.call(this);
	this._shud_visible = String(Moghunter.shud_hudvisible) === "true" ? true : false;
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_shud_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_shud_pluginCommand.call(this,command, args)
	if (command === "show_s_hud")  { $gameSystem._shud_visible = true};
	if (command === "hide_s_hud")  { $gameSystem._shud_visible = false};
	return true;
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
// ** SpriteSet Base
//=============================================================================

//==============================
// ** create Hud Field
//==============================
Spriteset_Base.prototype.createHudField = function() {
	this._hudField = new Sprite();
	this._hudField.z = 10;
	this.addChild(this._hudField);
};

//==============================
// ** sort MZ
//==============================
Spriteset_Base.prototype.sortMz = function() {
   this._hudField.children.sort(function(a, b){return a.mz-b.mz});
};

//=============================================================================
// ** SpriteSet Map
//=============================================================================

//==============================
// ** create Lower Layer
//==============================
var _mog_sHud_sprMap_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    _mog_sHud_sprMap_createLowerLayer.call(this);
	if (!this._hudField) {this.createHudField()};
	this.createShud();
	this.sortMz();	
};
	
//==============================
// * Create S Hud
//==============================
Spriteset_Map.prototype.createShud = function() {
	this._s_hud = new S_Hud();
	this._s_hud.mz = 90;
	this._hudField.addChild(this._s_hud);
}; 

//=============================================================================
// * S_Hud
//=============================================================================
function S_Hud() {
    this.initialize.apply(this, arguments);
};

S_Hud.prototype = Object.create(Sprite.prototype);
S_Hud.prototype.constructor = S_Hud;

//==============================
// * Initialize
//==============================
S_Hud.prototype.initialize = function() {	
    Sprite.prototype.initialize.call(this);	
	this._hud_size = [-1,-1,-1,-1];
	this._old_hp = [-1,-1];
    this.load_img();
	this.opacity = 255;
	this._shud_flow = [false,0,0,0];
	if (String(Moghunter.shud_meter_flow) === "true") {
		this._shud_flow[0] = true;
	    this._shud_flow[2] = this._meter_img.width / 3;
		this._shud_flow[3] = this._shud_flow[2] * 2;
		this._shud_flow[1] = Math.floor(Math.random() * this._shud_flow[2]);
	};
};

//==============================
// * Battler
//==============================
S_Hud.prototype.battler = function() {
	return $gameParty.members()[0]
};

//==============================
// * Need Refresh HP
//==============================
S_Hud.prototype.needRefreshHP = function() {
    if (this._old_hp[0] != this.battler().hp) {return true};
	if (this._old_hp[1] != this.battler().mhp) {return true};
    return false
};

//==============================
// * Load Img
//==============================
S_Hud.prototype.load_img = function() {
	this._layout_img = ImageManager.load_MapUi(Moghunter.src_shud_A);
	this._meter_img = ImageManager.load_MapUi(Moghunter.src_shud_B);
};

//==============================
// * Create Layout
//==============================
S_Hud.prototype.create_layout = function() {
	this._layout = new Sprite(this._layout_img);
	this._layout.x = this._pos_x;
	this._layout.y = this._pos_y;
	this.addChild(this._layout);
};
	
//==============================
// * Refresh Data
//==============================
S_Hud.prototype.refresh_data = function() {
     this._hud_size[0] = 0;
	 this._pos_x = Moghunter.shud_pos_x - this._layout_img.width / 2;
	 this._pos_y = Moghunter.shud_pos_y ;
  	 this.create_layout();
     this.create_meter();	 
};

//==============================
// * Create Meter
//==============================
S_Hud.prototype.create_meter = function() {
     this._meter = new Sprite(this._meter_img);
	 this._meter.x = this._pos_x + Moghunter.shud_meter_x;
	 this._meter.y = this._pos_y + Moghunter.shud_meter_y;	
	 this.addChild(this._meter);
};

//==============================
// * refreshHP
//==============================
S_Hud.prototype.refreshHP = function() {	
	this._old_hp = [this.battler().hp,this.battler().mhp];
	var rate = this._meter_img.width * this.battler().hp / this.battler().mhp;
	this._meter.setFrame(0,0,rate,this._meter_img.width,this._meter_img.height);
};

//==============================
// * Update Meter
//==============================
S_Hud.prototype.update_meter = function() {
	if(this._shud_flow[0]) {
		var cw = this._meter_img.width / 3;
		var ch = this._meter_img.height;
		var meter_rate = cw * this.battler().hp / this.battler().mhp;
		this._meter.setFrame(this._shud_flow[1] ,0, meter_rate, cw, ch);
		this._shud_flow[1] += 2;
		if (this._shud_flow[1] > this._shud_flow[3]) {this._shud_flow[1] = 0};		
	}else if(this.needRefreshHP()){
		this.refreshHP()
	}
};

//==============================
// * Update visible
//==============================
S_Hud.prototype.update_visible = function() {
	this.visible = $gameSystem._shud_visible;
	if (this.is_hud_visible()) {this.opacity += 10}	 
	else {this.opacity -= 10};
};

//==============================
// * Is Hud Visible
//==============================
S_Hud.prototype.is_hud_visible = function() {
	if ($gameMessage.isBusy()) {return false};
	if (!$gameSystem._shud_visible) {return false};
	return true;
};

//==============================
// * Update Position
//==============================
S_Hud.prototype.update_position = function() {
     this.x = $gamePlayer.screenX();
	 this.y = $gamePlayer.screenY();
};

//==============================
// * Update
//==============================
S_Hud.prototype.update = function() {	
    Sprite.prototype.update.call(this);	
	if (this._hud_size[0] === -1 && this._layout_img.isReady()) {this.refresh_data()};
	if (this._hud_size[0] === -1) {return};
	this.update_visible();
	if (!this.battler()) {return};
	this.update_position();
	this.update_meter();
};
