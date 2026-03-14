//=============================================================================
// MOG_PixiFilters.js
//=============================================================================

/*:
 * @plugindesc (v1.5)[v1.0]  地图 - 事件滤镜效果 + 画面滤镜效果
 * @author Moghunter （Drill_up翻译）
 * 
 * @help  
 * =============================================================================
 * +++ MOG - (Default) Pixi Filters (v1.5) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 你可以设置地图中的事件的滤镜效果，也可以直接使画面整个产生滤镜效果。
 * 画面滤镜效果在战斗中也可用。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 画面滤镜效果
 * 要使用画面滤镜效果，直接使用下面的插件指令：
 *
 * 插件指令：filter_effect : A
 *
 * 参数A：滤镜类型。
 *        0 - 模糊，1 - 反相，2 - 黑白
 *        3 - 明亮，4 - 强光，5 - 噪点
 *
 * 你如果需要清楚当前的滤镜效果，使用下面的插件指令：
 *
 * 插件指令（清除）：filter_clear
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 事件滤镜效果
 * 要使用事件滤镜效果，直接使用下面的插件指令：
 *
 * 插件指令：        filter_event_id : B : A
 * 插件指令（清除）：filter_event_id : B : -1
 *
 * 参数A：滤镜类型。（同上）
 * 参数B：表示事件的id号。
 *
 * 示例：
 * filter_event_id : 4 : 1 （4号事件使用反相滤镜效果）
 * filter_event_id : 4 : -1（4号事件停用滤镜效果）
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 事件滤镜效果（玩家队伍的人物）
 * 注意，玩家人物的指令和事件的指令不一样，
 * 一个是filter_event_id，另一个是filter_actor_id。
 *
 * 插件指令：        filter_actor_id : B : A
 * 插件指令（清除）：filter_actor_id : B : -1
 *
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_PixiFilters = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_PixiFilters');
    Moghunter.pixiFilter_BlurLoop = String(Moghunter.parameters['Blur Loop'] || "false");
	Moghunter.pixiFilter_PixelateLoop = String(Moghunter.parameters['Pixelate Loop'] || "false");
	
//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_pixifilters_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_pixifilters_pluginCommand.call(this,command, args)
    this.setFilterInt(command, args);
	return true;
};

//==============================
// * set Filter Int
//==============================
Game_Interpreter.prototype.setFilterInt = function(command, args) {
	if (command === "filter_effect")  { 
	    $gameSystem.clearPixiAnimation();
	    $gameSystem._pixiFilterData = [true, Number(args[1])];
    };
	if (command === "filter_clear")  {$gameSystem.clearPixiFData()};
	this.setFilterEvent(command, args);
	this.setFilterActor(command, args);
};

//==============================
// * set Filter Event
//==============================
Game_Interpreter.prototype.setFilterEvent = function(command, args) {
	var shatterType = -1;
	var event_id = 0;	
	if (command === "filter_event_id")  {
		event_id = Number(args[1]);
		filter_id = Number(args[3]);
	};
	$gameMap.events().forEach(function(event) {
	if (event.eventId() === event_id) {
		event._filterData = [true,filter_id];
		$gameSystem._pixiFilterRefresh = true;
	};
	}, this);	
};

//==============================
// * set Filter Actor
//==============================
Game_Interpreter.prototype.setFilterActor = function(command, args) {
   if (command === "filter_actor_id")  {
	var actor_id = Number(args[1]);
	var filter_id = Number(args[3]);
	for (var i = 0; i < $gameParty.members().length; i++) {
	    var actor = $gameParty.members()[i];
		if (actor._actorId === actor_id) {
			if (actor) {actor._filterData = [true,filter_id]
			    $gameSystem._pixiFilterRefresh = true;
			};
		};
	};	   
   };	
};

//=============================================================================
// ** Game System
//=============================================================================	

//==============================
// * Initialize
//==============================
var _mog_pixifilters_gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_mog_pixifilters_gsys_initialize.call(this);
	this.clearPixiFData();
	this._pixiFilterData[0] = false;
	this._pixiFilterEffects[0]  = false;
	this._pixiFilterRefresh = false;
};

//==============================
// * clear PixiFData
//==============================
Game_System.prototype.clearPixiFData = function() {
	this._pixiFilterData = [true,-1];
	this._pixiFilterEffects = [true,-1,0,0,0,1,0,0];
};

//==============================
// * clear PixiAnimation
//==============================
Game_System.prototype.clearPixiAnimation = function() {
	this._pixiFilterEffects = [false,-1,0,0,0,1,0,0];
};

//=============================================================================
// ** Game Character Base
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_filter_gchar_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_mog_filter_gchar_initMembers.call(this);
	this._filterData = [false,0];
};

//=============================================================================
// ** Game_Actor
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_filter_gactor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
	_mog_filter_gactor_initMembers.call(this);
	this._filterData = [false,0];
};

//=============================================================================
// ** Spriteset Map
//=============================================================================	
var _mog_pxfilter_sprtsetMap_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
	_mog_pxfilter_sprtsetMap_createLowerLayer.call(this);
	this.refreshFilterChar();
};

//==============================
// * Update
//==============================
var _mog_pxfilter_sprtsetMap_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	_mog_pxfilter_sprtsetMap_update.call(this);
	if ($gameSystem._pixiFilterRefresh) {this.refreshFilterChar()};
};

//==============================
// * refresh Filter Char
//==============================
Spriteset_Map.prototype.refreshFilterChar = function() {
    $gameSystem._pixiFilterRefresh = false;
	for (var i = 0; i < this._characterSprites.length; i++) {
		 var char = this._characterSprites[i];
		 if (char._character._eventId) {
			 this.setCharFilterData(char);
		 } else {
			 if (char._character._memberIndex) {
	             actor = $gameParty.members()[char._character._memberIndex];
			 } else {
				 actor = $gameParty.leader()
			 };
			 if (actor) {
				 char._character._filterData = actor._filterData;
				 this.setCharFilterData(char);
			 };	
		 };
	};
};

//==============================
// * set Char Filter Data
//==============================
Spriteset_Map.prototype.setCharFilterData = function(char) {
	if (char._character._filterData[0]) {
		char.filters = char._character._filterData[1] >= 0 ? [this.setPixiFilter(char._character._filterData[1])] : [];
	};
};

//=============================================================================
// ** Spriteset Base
//=============================================================================	

//==============================
// * Initialize
//==============================
var _mog_pixifilter_spritesetbase_initialize = Spriteset_Base.prototype.initialize;
Spriteset_Base.prototype.initialize = function() {
	_mog_pixifilter_spritesetbase_initialize.call(this);
	this.pixeFilterSetup();
};
	
//==============================
// * Initialize
//==============================
Spriteset_Base.prototype.pixeFilterSetup = function() {
	this._filterSprite = new Sprite(new Bitmap(Graphics.boxWidth,Graphics.boxHeight));
	this.addChild(this._filterSprite);
	this._pixFilterInit = true;
    this._blurloop = String(Moghunter.pixiFilter_BlurLoop) === "true" ? true : false;
	this._pixelateloop = String(Moghunter.pixiFilter_PixelateLoop) === "true" ? true : false;
	if (this.pfData()[1] != -1) {this.refreshPixiFilterAnimation()};
    if ($gameSystem._pixiFilterData[1] != -1) {this.refreshPixiFilter()};
};

//==============================
// * Update
//==============================
var _mog_pixifilter_spritesetbase_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {
	_mog_pixifilter_spritesetbase_update.call(this);
	this.updatePixiFilters();
};

//==============================
// * Update Pixi Filters
//==============================
Spriteset_Base.prototype.updatePixiFilters = function() {
   if ($gameSystem._pixiFilterEffects[0]) {this.refreshPixiFilterAnimation()};
   if ($gameSystem._pixiFilterData[0]) {this.refreshPixiFilter()};
};

//==============================
// * PFData
//==============================
Spriteset_Base.prototype.pfData = function() {
   return $gameSystem._pixiFilterEffects;
};

//==============================
// * PixiFilter
//==============================
Spriteset_Base.prototype.pixiFilter = function() {
   return this._baseSprite.filters[0];
};

//==============================
// * PixiFilter Clear
//==============================
Spriteset_Base.prototype.pixiFilterClear = function() {
   this._baseSprite.filters = [this._toneFilter];
};

//==============================
// * Refresh Pixi Filters Ani
//==============================
Spriteset_Base.prototype.refreshPixiFilterAnimation = function() {
   $gameSystem._pixiFilterEffects[0] = false;
   this.pixiFilterClear();
};

//==============================
// * Refresh Pixi Filters
//==============================
Spriteset_Base.prototype.refreshPixiFilter = function() {
   $gameSystem._pixiFilterData[0] = false;
   this.pixiFilterClear();
   var filter = this.setPixiFilter($gameSystem._pixiFilterData[1]);
   if (filter) {this._baseSprite.filters = [filter,this._toneFilter]};
};

//==============================
// * setPixiFilter
//==============================
Spriteset_Base.prototype.setPixiFilter = function(filter_id) {
   if (filter_id === 0) { // BLUR
       return new PIXI.filters.BlurFilter();
   } else if (filter_id === 1) { // Negative
	   var filter = new PIXI.filters.ColorMatrixFilter()
	   filter.negative(true)
	   return filter;   
   } else if (filter_id === 2) { // Grayscale
	   var filter = new PIXI.filters.ColorMatrixFilter()
	   filter.blackAndWhite(true)
	   return filter;
   } else if (filter_id === 3) { // Brightness
	   var filter = new PIXI.filters.ColorMatrixFilter()
	   filter.brightness(3, true)
	   return filter;	
   } else if (filter_id === 4) { // Contrast	
	   var filter = new PIXI.filters.ColorMatrixFilter()
	   filter.contrast(3, true)
	   return filter; 
   } else if (filter_id === 5) { // Noise	
	   var filter = new PIXI.filters.NoiseFilter();
	   filter.noise = 0.5
	   return filter;	
   } else {$gameSystem._pixiFilterData[1] = -1;
	  return false;
   };
};