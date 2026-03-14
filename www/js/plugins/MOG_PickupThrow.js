//=============================================================================
// MOG_PickupThrow.js
//=============================================================================

/*:
 * @plugindesc (v1.3)[v1.1]  物体 - 举起花盆
 * @author Moghunter （Drill_up翻译+优化）
 *
 * @param 花盆高度
 * @type number
 * @min 0
 * @desc 以角色的点为基准，花盆在角色上的高度，单位像素。
 * @default 22
 * 
 * @param 举起音效
 * @desc 举起花盆时，播放的音效。
 * @require 1
 * @dir audio/se/
 * @type file
 * @default Jump1
 *
 * @param 是否使用角色举起姿势
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param --角色组 1至20--
 * @default 
 *
 * @param 角色-1-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-2-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-3-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-4-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-5-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-6-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-7-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-8-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-9-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-10-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-11-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-12-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-13-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-14-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-15-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-16-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-17-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-18-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-19-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-20-举起姿势
 * @parent --角色组 1至20--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param --角色组21至40--
 * @default 
 *
 * @param 角色-21-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-22-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-23-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-24-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-25-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-26-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-27-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-28-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-29-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-30-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-31-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-32-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-33-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-34-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-35-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-36-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-37-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-38-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-39-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-40-举起姿势
 * @parent --角色组21至40--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param --角色组41至60--
 * @default 
 *
 * @param 角色-41-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-42-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-43-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-44-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-45-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-46-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-47-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-48-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-49-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-50-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-51-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-52-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-53-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-54-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-55-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-56-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-57-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-58-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-59-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 角色-60-举起姿势
 * @parent --角色组41至60--
 * @desc 角色举起姿势的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @help  
 * =============================================================================
 * +++ MOG - Pick Up and Throw (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 玩家能够举起花盆等指定的物件，并投掷。
 * 【现已支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 在指定的事件中，添加事件注释，并含有以下关键字：
 *
 * throw : X
 *
 * 参数X：投掷距离，最小为1，单位图格。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 这里需要在角色组中手动配置：（img/characters文件夹）
 *  角色-1-举起姿势（数字1对应角色配置中编号为1的角色）
 *  角色-2-举起姿势
 *  ……
 *
 * 如果没有举起姿势，可以设置为空。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令设置物体是否可以举起。
 *
 * 插件指令（可举起）：pickup_enable
 * 插件指令（不能举起）：pickup_disable
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 使得该插件支持关联资源的打包、加密。
 * 部署时勾选去除无关文件，本插件中相关的文件不会被去除。
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_PickupThrow = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_PickupThrow');
	Moghunter.pickTargetHeight = Number(Moghunter.parameters['花盆高度'] || 22);
	Moghunter.pickDirectionFix = String(Moghunter.parameters['Character Direction Fix'] || 'true');
	Moghunter.pickPose = String(Moghunter.parameters['是否使用角色举起姿势'] || 'true');
	Moghunter.pickDirectionButton = String(Moghunter.parameters['Hold Direction'] || 'true');					//该变量控制原地转向，默认开启。
	Moghunter.pickDirectionButtonKey = String(Moghunter.parameters['Hold Direction Button'] || 'pagedown');		//
	Moghunter.pickSoundFile = String(Moghunter.parameters['举起音效']);
	
	Moghunter.pick_list_length = 60;
	Moghunter.pick_list = {};
	for (var i = 1; i <= Moghunter.pick_list_length ; i++ ) {
		Moghunter.pick_list[i] = Moghunter.parameters['角色-' + String(i) + "-举起姿势" ];
	};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_pickup_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _mog_pickup_pluginCommand.call(this,command, args);
    if (command === "pickup_enable")  {
        $gameSystem._pickupData[0] = true;
	} else if (command === "pickup_disable")  {
        $gameSystem._pickupData[0] = false;
	};	
	return true;
};
	
//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_pickup_Gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _mog_pickup_Gsys_initialize.call(this);
	this._pickupData = [true,false];
};	
	
//=============================================================================
// ** Game Character
//=============================================================================	

//==============================
// * initMembers
//==============================
var _mog_pick_gcharbase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
   _mog_pick_gcharbase_initMembers.call(this);
   this._pickup = {};
   this._pickup.enabled = false;
   this._pickup.originalName = this._characterName;
   this._pickup.pose = String(Moghunter.pickPose) === "true" ? true : false;
   this._pickup.wait = 0;   
   this._pickup.check = false;
   this._throw = {};
   this._throw.enabled = false;
   this._throw.through = false;
   this._throw.directionFixA = String(Moghunter.pickDirectionFix);
   this._throw.directionFix = false;
   this._throw.range = 0;
   this._throw.wait = 0;
};

//==============================
// * Update
//==============================
var _mog_pick_gchabase_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	if (this._throw.wait > 0) {this._throw.wait--;
	    if (this.isJumping()) {this.updateJump()};
   		if (!this.isJumping()) {this._throw.wait = 0};
		return;
	};
	if (this._pickup.wait > 0) {this._pickup.wait--;return};
	if (this._throw.enabled) {this.updatePickUp();return};
    _mog_pick_gchabase_update.call(this);
};

//==============================
// * Update Pick Up
//==============================
Game_CharacterBase.prototype.updatePickUp = function() {
    this._x = $gamePlayer._x;
	this._y = $gamePlayer._y;
    this._realX = $gamePlayer._realX;
    this._realY = $gamePlayer._realY;	
};

//==============================
// * can Pass Throw
//==============================
Game_CharacterBase.prototype.canPassThrow = function(x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
	if (d === 2) {x3 = x; y3 = y + 1;	
	} else if (d === 4) {x3 = x - 1;y3 = y;		
	} else if (d === 6) {x3 = x + 1;y3 = y;	
	} else {x3 = x;y3 = y - 1;
	};
    if (!$gameMap.isValid(x2, y2)) {
        return false;
    };
    if (this.isThrough() || this.isDebugThrough()) {
        return true;
    };
    if (!$gameMap.isPassable(x3, y3)) {
        return false;
    };
    if (this.isCollidedWithCharacters(x2, y2)) {
        return false;
    };
    return true;
};

//=============================================================================
// ** Game Event
//=============================================================================	

//==============================
// * start
//==============================
var _mog_pick_gevent_start = Game_Event.prototype.start;
Game_Event.prototype.start = function() {
	if (this.canPickUp()) {this.pickUp();return};
	_mog_pick_gevent_start.call(this);
};

//==============================
// * check Pick Comment
//==============================
Game_Event.prototype.checkPickComment = function() {
	var enable = false
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
	       if (l.code === 108) {var comment = l.parameters[0].split(' : ')
			   if (comment[0].toLowerCase() == "throw"){
				  this._throw.range = Number(comment[1]);
				  enable =  true;
			   };};
	}, this);};
	return enable;
};

//==============================
// * can Pick UP
//==============================
Game_Event.prototype.canPickUp = function() {
	if (!$gameSystem._pickupData[0]) {return false};
	if ($gamePlayer._pickup.enabled) {return false};
	if (this._trigger > 1) {return false};
	if (this._throw.enabled) {return false};
	if (this._throw.wait > 0) {return false};
	if (this._pickup.wait > 0) {return false};
	if ($gamePlayer._pickup.wait > 0) {return false};
    return this.checkPickComment();
};

//==============================
// * Pick UP
//==============================
Game_Event.prototype.pickUp = function() {
	var wait = 15;
	this._throw.enabled = true
    this._throw.wait = wait;
	this._throw.directionFix = this._directionFix;
	this._throw.through = this._through;
	this._directionFix = this._throw.directionFixA ? true : this._directionFix;
	this._through = true;
	$gamePlayer._pickup.enabled = true;
	$gamePlayer._pickup.wait = wait;
	$gamePlayer._pickup.originalName = $gamePlayer._characterName;
	if ($gamePlayer._pickup.pose 
	    && Moghunter.pick_list[$gameParty._actors[0]] != "" ) {
		$gamePlayer._characterName = Moghunter.pick_list[$gameParty._actors[0]];
	};
	if (Imported.MOG_CharPoses) {
	    $gamePlayer._pickup.originalName = $gamePlayer._originalName.name;
	    if ($gamePlayer._pickup.pose
			&& Moghunter.pick_list[$gameParty._actors[0]] != "" ) {
			$gamePlayer._characterName = Moghunter.pick_list[$gameParty._actors[0]];
		};
	};
	var x = $gamePlayer._x - this._x;
	var y = $gamePlayer._y - this._y;
	this.jump(x,y,this._direction)
};

//=============================================================================
// ** Game Player
//=============================================================================	

//==============================
// * Initialize
//==============================
var _mog_pick_gplayer_initialize = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function() {
	_mog_pick_gplayer_initialize .call(this);
	this._dirButton = String(Moghunter.pickDirectionButton) === "true" ? true : false;
	this._dirButtonK = String(Moghunter.pickDirectionButtonKey)
};

//==============================
// * move By Input
//==============================
var _mog_gplayer_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
	if (this._pickup.wait > 0) {return};	
	if (this._pickup.enabled && this.canMove()) {
	    if (Input.isTriggered('ok')) {this.throwTarget();return};
		if (Input.isPressed(this._dirButtonK)) {this.holdDirectionT();return};
    };
	_mog_gplayer_moveByInput.call(this);	
};

//==============================
// * hold Direction D T
//==============================
Game_Player.prototype.holdDirectionT = function() {
   if (Input.isPressed('down')) {this.setDirection(2);
   } else if (Input.isPressed('left')) {this.setDirection(4);
   } else if (Input.isPressed('right')) {this.setDirection(6);
   } else if (Input.isPressed('up')) {this.setDirection(8);
   };
};

//==============================
// * trigger Action
//==============================
var _mog_gplayer_pick_triggerAction = Game_Player.prototype.triggerAction;
Game_Player.prototype.triggerAction = function() {
	if (this._throw.wait > 0) {return false};
	if (this._pickup.wait > 0) {return false};	
    if (this._pickup.enabled) {return false};
	_mog_gplayer_pick_triggerAction.call(this);
	return false;
};

//==============================
// * throw Target
//==============================
Game_Player.prototype.throwTarget = function() {
	this._pickup.check = false;
	$gameMap.events().forEach(function(event) {
             if (event._throw.enabled) {this.throwEvent(event)};
    }, this);
	if (!this._pickup.check) {return};
	this._pickup.enabled = false;
	this._pickup.wait = 15;
	SoundManager.playThrowSE(String(Moghunter.pickSoundFile));
	if (this._pickup.pose) {this._characterName = this._pickup.originalName};
};

//==============================
// * throw Event
//==============================
Game_Player.prototype.throwEvent = function(event) {
	var r = event._throw.range;	var xr = 0;	var yr = 0;	
	if (this._direction === 2) {
		x = this._x; y = this._y + r - 1; x2 = 0; y2 = +r;
		for (var i = 0; i < r; i++) {
	    	if (this.canPassThrow(x,y,this._direction)) {xr = x2; yr = y2;break};
			y--;y2--;
		};	
    } else if (this._direction === 4) {
		x = this._x - r + 1; y = this._y; x2 = -r; y2 = 0;
		for (var i = 0; i < r; i++) {
	    	if (this.canPassThrow(x,y,this._direction)) {xr = x2; yr = y2;break};
			x++;x2++;
		};	    
    } else if (this._direction === 6) {
		x = this._x + r - 1; y = this._y; x2 = +r; y2 = 0;
		for (var i = 0; i < r; i++) {
	    	if (this.canPassThrow(x,y,this._direction)) {xr = x2; yr = y2;break};
			x--;x2--;
		};			
    } else if (this._direction === 8) {
		x = this._x; y = this._y - r + 1; x2 = 0; y2 = -r;
		for (var i = 0; i < r; i++) {
	    	if (this.canPassThrow(x,y,this._direction)) {xr = x2; yr = y2;break};
			y++;y2++;
		};
	};
	if (xr === 0 && yr ===0) {return};
	event.jump(xr,yr)
	event._throw.enabled = false
    event._throw.wait = 30;
	event._through = this._throw.through;
	event._directionFix = this._throw._directionFix;	
	this._pickup.check = true;
};

//==============================
// * clear Transfer Info
//==============================
var _mog_pick_gplayer_clearTransferInfo = Game_Player.prototype.clearTransferInfo;
Game_Player.prototype.clearTransferInfo = function() {
    _mog_pick_gplayer_clearTransferInfo.call(this);
    this.clearPick();
};

//==============================
// * clearPick
//==============================
Game_Player.prototype.clearPick = function() {
	this._pickup.enabled = false;
	this._pickup.wait = 0;
};

//=============================================================================
// ** Sound Manager
//=============================================================================	

//==============================
// * Play ThrowSE
//==============================
SoundManager.playThrowSE = function(fileName){
   var se = {};
   se.name = fileName;
   se.pitch = 100;
   se.volume = 100;
   AudioManager.playSe(se);
};  

//=============================================================================
// ** Sprite Character
//=============================================================================	

//==============================
// * update Position
//==============================
var _mog_pick_sprChar_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
	if (this.needUpdatePick()) {this.updateSprtPick();return};
	_mog_pick_sprChar_updatePosition.call(this);
	if (this._character._throw.wait > 0) {this.z = $gamePlayer.screenZ() + 1};
};
	
//==============================
// * Need Update Pick
//==============================
Sprite_Character.prototype.needUpdatePick = function() {
	 if (this._character._throw.enabled && this._character._throw.wait > 0) {return false};
	 return this._character._throw.enabled;
};
	
//==============================
// * update Sprt Pick
//==============================
Sprite_Character.prototype.updateSprtPick = function() {
    this.x = $gamePlayer.screenX();
    this.y = $gamePlayer.screenY() - Moghunter.pickTargetHeight;
    this.z = $gamePlayer.screenZ() + 1;	
};