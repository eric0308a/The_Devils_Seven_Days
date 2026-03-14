//=============================================================================
// MOG_EventSensor.js
//=============================================================================

/*:
 * @plugindesc (v1.1)[v1.1]  物体 - 远距离触发事件
 * @author Moghunter （Drill_up翻译）
 *
 * @param 打开的独立开关
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc 远距离触发事件后，会打开指定的独立开关。
 * @default D
 * 
 * @help  
 * =============================================================================
 * +++ MOG - Event Sensor (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 玩家进入了NPC指定的距离范围，会立即打开独立开关，形成触发事件的效果。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 在指定的事件中，添加注释，在注释中填入以下指令：
 * （注释中的冒号后面有一个空格，前面没有。）
 * 
 * event sensor: X
 * 
 * 参数X：事件与玩家的距离，最小为1，单位图格
 *        1的距离，表示玩家进入npc加号的范围内会立即打开独立开关：
 *           x
 *         x x x
 *           x
 *        以此类推。
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 1.0和1.1出现了两种注释写法，这里设置成两种写法都有效。
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_EventSensor = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_EventSensor');
    Moghunter.sensor_range_key = String(Moghunter.parameters['打开的独立开关'] || "D");

//=============================================================================
// ** Character Base
//=============================================================================

//==============================
// * Init Members
//==============================
var _alias_mog_evensensor_cbase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _alias_mog_evensensor_cbase_initMembers.call(this);
	this._sensor_range = [false,0];
};

//=============================================================================
// ** Sprite Character
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_evensensor_schar_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function(character) {
    _alias_mog_evensensor_schar_initialize.call(this,character);
	if (this._character && this._character._eventId) {this._character.check_event_sensor()};
};

//=============================================================================
// ** Scene Map
//=============================================================================

//==============================
// * Terminate
//==============================
var _alias_mog_evensensor_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_alias_mog_evensensor_terminate.call(this);
    $gameMap.events().forEach(function(event) {
        if (event._sensor_range[0]) {$gameSelfSwitches.setValue(event.sensor_key(),false)};
    }, this);	
};

//=============================================================================
// ** Game Event
//=============================================================================

//==============================
// * Setup Page
//==============================
var _alias_mog_evensensor_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_alias_mog_evensensor_gevent_setupPage.call(this);
    this.check_event_sensor();
};

//==============================
// * Check Event Sensor
//==============================
Game_Event.prototype.check_event_sensor = function() {
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
	       if (l.code === 108) {
			   var comment = l.parameters[0].split(': ');
			   if (comment[0].toLowerCase() == "event sensor"){
                 this._sensor_range = [true,Number(Math.abs(comment[1]))];
				 this._need_clear_sensor = false;			  
			   };
			   comment = l.parameters[0].split(' : ');
			   if (comment[0].toLowerCase() == "event sensor"){
                 this._sensor_range = [true,Number(Math.abs(comment[1]))];
				 this._need_clear_sensor = false;			  
			   };
     	   };
	}, this);};
};

//==============================
// * Update
//==============================
var _mog_event_sensor_gev_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
	_mog_event_sensor_gev_update.call(this);
	if (this.needUpdateSensor()) {this.update_sensor()};
};

//==============================
// * Need Update Sensor
//==============================
Game_Event.prototype.needUpdateSensor = function() {
	if (!this._sensor_range[0]) {return false};	
	return true;
};

//==============================
// * Sensor Dis
//==============================
Game_Event.prototype.sensor_dis = function() {
  return Math.abs($gamePlayer.x - this.x) + Math.abs($gamePlayer.y - this.y);
};

//==============================
// * Sensor Key
//==============================
Game_Event.prototype.sensor_key = function() {
   return [this._mapId, this._eventId, Moghunter.sensor_range_key];
};

//==============================
// * Update Sensor
//==============================
Game_Event.prototype.update_sensor = function() {
      var enable   = (this.sensor_dis() <=  this._sensor_range[1]);
      var last_enable = $gameSelfSwitches.value(this.sensor_key());
      if (enable != last_enable) {this.sensor_effect(enable)};
};

//==============================
// * Sensor Effect
//==============================
Game_Event.prototype.sensor_effect = function(enable) {
	$gameSelfSwitches.setValue(this.sensor_key(),enable);
};
