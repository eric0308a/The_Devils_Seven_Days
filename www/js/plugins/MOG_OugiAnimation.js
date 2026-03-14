//=============================================================================
// MOG_OugiAnimation.js
//=============================================================================
/*:
 * @plugindesc (v1.3)[v1.0]  技能 - 招式吟唱背景
 * @author Moghunter （Drill_up翻译）
 *
 * @param 敌人是否也设置背景
 * @type boolean
 * @on 设置
 * @off 不设置
 * @desc true - 设置，false - 不设置
 * 如果敌人释放了含有注释的技能，敌人将使用相关图片。
 * @default false
 *
 * @help  
 * =============================================================================
 * +++ MOG - Ougi Animation (v1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 指定技能释放时，角色或者敌人会出现释招背景。
 * ★★需要关联外部png文件★★
 * ★★需要配置大量资源（角色或敌人可以同时拥有大量背景）★★
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 有吟唱背景的技能，在其注释中，必须含有下面的关键字：
 * （注意，冒号后面有一个空格）
 *
 * Ougi Animation: A
 *
 * 参数A： 后缀，用来确定图片的名字的后缀。
 *
 * 示例：
 * Ougi Animation: _冲击
 * Ougi Animation: _大招
 * 那么，你就必须设置相关的图片资源：（/img/pictures文件夹中）
 *   Actor_1_冲击.png （其中1对应角色编号1）
 *   Actor_1_大招.png 
 *   Actor_2_冲击.png 
 *   Actor_2_大招.png 
 *   Actor_3_冲击.png 
 *   Actor_3_大招.png 
 *   ……
 * 如果你开启了敌人背景的开关，那么需要设置更多：（/img/pictures文件夹中）
 *   Enemy_1_冲击.png （其中1对应敌人编号1）
 *   Enemy_1_大招.png 
 *   Enemy_2_冲击.png 
 *   Enemy_2_大招.png 
 *   Enemy_3_冲击.png 
 *   Enemy_3_大招.png 
 *   ……
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 角色必须含有以下文件，在 /img/pictures 文件夹中：
 *
 * Actor_1.png （其中1对应角色编号1）
 * Actor_2.png
 * Actor_3.png
 * ……
 *
 * Actor_1 + 后缀.png
 * Actor_2 + 后缀.png
 * Actor_3 + 后缀.png
 * ……
 *
 * 如果开启了敌人技能背景开关，必须含有更多在 /img/pictures 文件夹中：
 *
 * Enemy_1 + 后缀.png （其中1对应敌人编号1）
 * Enemy_2 + 后缀.png
 * Enemy_3 + 后缀.png
 * ……
 *
 * （这个设置实在不好优化，后缀和角色敌人数量是指数级增长的，而且，如果没有
 * 相关的图片资源，就会直接报找不到图片错误。）
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_OugiAnimation = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_OugiAnimation');
	Moghunter.ougi_for_enemies = String(Moghunter.parameters['敌人是否也设置背景'] || "false");

//=============================================================================
// ** Game Temp
//=============================================================================

//==============================
// ** Initialize
//==============================
var _mog_ougi_gtemp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _mog_ougi_gtemp_initialize.call(this);
	this._ougiData = [false,null,0,0,""];
};
	
//=============================================================================
// ** Battle Manager
//=============================================================================

//==============================
// ** initMembers
//==============================
var _mog_ougi_bmngr_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _mog_ougi_bmngr_initMembers.call(this);
	this._ougiForEnemies = String(Moghunter.ougi_for_enemies) === "true" ? true : false
};

//==============================
// ** Start Action
//==============================
var _mog_ougi_bmngr_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    this.setOuginAnimation();
	_mog_ougi_bmngr_startAction.call(this);
};

//==============================
// ** Set Ougi Animation
//==============================
BattleManager.setOuginAnimation = function() {
    if (this._subject.isEnemy() && !this._ougiForEnemies) {return};
	 var skill = this._subject.currentAction().item();
	 var notes = skill.note.split(/[\r\n]+/);
     notes.forEach(function(note) {
     var note_data = note.split(': ')
	 if (note_data[0].toLowerCase() == "ougi animation"){
		 $gameTemp._ougiData = [true,this._subject,0,0,""]
		 var par = note_data[1].split(':');
	     $gameTemp._ougiData[4] = String(par[0]);
	 }
	 },this);		 
};

//=============================================================================
// ** Scene Battle
//=============================================================================

//==============================
// ** Update
//==============================
var _mog_ougi_sbat_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function() {
	if ($gameTemp._ougiData[0]) {this.updateOugi();return}
	_mog_ougi_sbat_update.call(this)
};

//==============================
// ** Create Ougi
//==============================
Scene_Battle.prototype.createOugi = function() {
    this._spriteOugi = [];
	if ($gameTemp._ougiData[1].isActor()) {
	   this._spriteOugi[0] =  new Sprite(ImageManager.loadPicture("Actor_" + $gameTemp._ougiData[1]._actorId + $gameTemp._ougiData[4]));
       this._spriteOugi[1] =  new Sprite(ImageManager.loadPicture("Actor_" + $gameTemp._ougiData[1]._actorId));
    } else {
	   this._spriteOugi[0] =  new Sprite(ImageManager.loadPicture("Enemy_" + $gameTemp._ougiData[1]._enemyId + $gameTemp._ougiData[4]));
       this._spriteOugi[1] =  new Sprite(ImageManager.loadPicture("Enemy_" + $gameTemp._ougiData[1]._enemyId));
	};
	this._spriteOugi[0].anchor.x = 0.5;
	this._spriteOugi[0].anchor.y = 0.5;
	this._spriteOugi[0].opacity = 0;
	this.addChild(this._spriteOugi[0]);
	this._spriteOugi[1].anchor.x = 0.5;
	this._spriteOugi[1].opacity = 0;
	this.addChild(this._spriteOugi[1]);
	this._spriteOugi[2] = false
};

//==============================
// ** Update Terminate
//==============================
Scene_Battle.prototype.ougiTerminate = function() {
    this.removeChild(this._spriteOugi[0]);
	this.removeChild(this._spriteOugi[1]);
	this._spriteOugi = null;
	$gameTemp._ougiData = [false,null,0,0,0];
};

//==============================
// ** center Ougi
//==============================
Scene_Battle.prototype.centerOugi = function() {
  this._spriteOugi[2] = true;
  var cx = Graphics.boxWidth / 2;
  var cy = Graphics.boxHeight / 2;
  this._spriteOugi[0].x = cx;
  this._spriteOugi[0].y = cy;
  this._spriteOugi[1].x = cx;
  this._spriteOugi[1].y = Graphics.boxHeight - this._spriteOugi[1].height;
  this._spriteOugi[0].scale.x = 2.0;
  this._spriteOugi[1].scale.x = 2.0;
  this._spriteOugi[0].opacity = 0;
  this._spriteOugi[1].opacity = 0;
};

//==============================
// ** Update Ougi Animation
//==============================
Scene_Battle.prototype.updateOugiAnimation = function() {
    if ($gameTemp._ougiData[2] === 0) {
	   if (this._spriteOugi[0].scale.x > 1.0) {
		   this._spriteOugi[0].scale.x -= 0.05;
		   this._spriteOugi[1].scale.x -= 0.05;	
		   this._spriteOugi[0].opacity += 16;
		   if (this._spriteOugi[0].scale.x <= 1.00) {$gameTemp._ougiData[2] = 1};	  
	   }
   } else if ($gameTemp._ougiData[2] === 1) {
	           $gameTemp._ougiData[3] += 1;
		   this._spriteOugi[0].scale.x += 0.005;
		   this._spriteOugi[1].scale.x += 0.002;
		   this._spriteOugi[0].opacity = 255;			   
		   if ($gameTemp._ougiData[3] >= 40) {$gameTemp._ougiData[2] = 2};	   
   } else {   
	       this._spriteOugi[0].scale.x += 0.05;
		   this._spriteOugi[1].scale.x += 0.05;
		   this._spriteOugi[0].opacity -= 5;
		   if (this._spriteOugi[0].opacity === 0) {$gameTemp._ougiData = [false,null,0,0,""];};
   };
   this._spriteOugi[0].scale.y = this._spriteOugi[0].scale.x;
   this._spriteOugi[1].scale.y = this._spriteOugi[1].scale.x;
   this._spriteOugi[1].opacity = this._spriteOugi[0].opacity;
};

//==============================
// ** Ougi Is Ready
//==============================
Scene_Battle.prototype.ougiIsReady = function() {
	if (!this._spriteOugi[0].bitmap) {return false};
	if (!this._spriteOugi[0].bitmap.isReady()) {return false};
	if (!this._spriteOugi[1].bitmap) {return false};
	if (!this._spriteOugi[1].bitmap.isReady()) {return false};
	return true;
};

//==============================
// ** Update Ougi
//==============================
Scene_Battle.prototype.updateOugi = function() {
  if (!this._spriteOugi) {this.createOugi();return};
  if (!this._spriteOugi[2] && this._spriteOugi[0].bitmap.isReady()) {this.centerOugi();}
  if (!this.ougiIsReady()) {return};
  this.updateOugiAnimation();
  if (!$gameTemp._ougiData[0] || this._spriteOugi[0].height === 0 || this._spriteOugi[1].height === 0) {
	  this.ougiTerminate();
   };
};