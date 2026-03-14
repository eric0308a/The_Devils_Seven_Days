//=============================================================================
// MOG_PictureEffects.js
//=============================================================================

/*:
 * @plugindesc (v1.3)[v1.2]  图片 - 动态图片效果 + 事件头顶图片
 * @author Moghunter （Drill_up翻译）
 * 
 * @help  
 * =============================================================================
 * +++ MOG - Picture Effects (v1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 能够对mv函数设置的图片进行额外的特效处理。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面
 *   对图片进行直接操作，可以作用于地图和战斗界面。
 * 2.该插件与 MOG_CharParticles.js 行走图-粒子效果 的功能相似。
 *   后者是在事件上显示粒子，该插件是在对事件进行图片粘附。
 * 3.插件即将被推翻重写，v1.2是最后一次更新。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 事件头顶图片
 * 首先，你需要使用mv函数设置一张图片。（img/pictures文件夹）
 * 然后，使用如下插件指令设置效果：（注意，插件指令中冒号左右都有一个空格）
 *
 * 设置图片固定到玩家位置：
 * 插件指令：picture_player_position : A
 *
 * 设置图片固定到事件位置：
 * 插件指令：picture_event_position : A : B
 *
 * 设置图片固定在地图的像素点位置：
 * 插件指令：picture_map_position : A
 * 
 * 参数A：图片id
 *        对应你在mv函数中设置的图片id。
 * 参数B：事件id
 *        对应当前地图的事件id号。
 *
 * 确切地说，图片并不是被固定在玩家或事件的头顶，而是玩家或事件的所在点上。
 * 你可以直接在图片中设置xy值，xy为偏移量。(0,0)表示事件中心。
 *
 * 示例：
 * 显示图片 10 xxxx
 * 插件指令：picture_player_position : 10
 * 插件指令：picture_event_position : 10 : 1
 * 消除图片：10
 * （注意对应上图片的id号。）
 *
 * 执行插件指令的事件id，必须确保比目标的插件指令都要大。
 * 比如插件用到了16,17的事件，那么要确保执行插件的指令 id 要 >17。
 * （如果小了，会出现图片全在玩家身上的问题）
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 动态图片效果
 * 首先，你需要使用mv函数设置一张图片。（img/pictures文件夹）
 * 然后，使用如下插件指令设置效果：(注意，插件指令中冒号左右都有一个空格）  
 *
 * 插件指令(呼吸)：    pic_breath : A : C : D : E
 * 插件指令(漂浮)：    pic_float : A : C
 * 插件指令(震动)：    pic_shake : A : C : D
 * 插件指令(剧烈震动)：pic_shake2 : A : C : D
 * 插件指令(平滑)：    pic_smooth : A : C : D : E
 * 
 * 插件还可以将指定图片转变成gif贴图：
 *
 * 插件指令：pic_animated : A : F : G
 *
 * 参数A：图片id
 *        对应你在mv函数中设置的图片id。
 * 参数C：是否启用
 *        true - 启用效果，false - 暂停效果（暂停有延迟）
 * 参数D：强度
 *        效果运行或偏移的范围。
 * 参数E：效果速度
 *        效果运行的频率，速度越高，频率越快。
 * 参数F：gif帧数
 *        设置4，目标将会被切成4份，并循环播放，造成gif效果。
 * 参数G：gif每帧长度
 *        单位帧，设置5,5帧后播放下一帧片段。（1秒60帧）
 *        也就是说，帧数值越低，gif播放速度越快。
 *
 * 示例：
 * 显示图片 10 xxxx
 * 插件指令：pic_breath : 10 : true : 5 : 2
 * 插件指令：pic_float : 10 : true
 * 消除图片：10
 * （如果要立即停用效果，直接执行显示图片或消除图片就可以去除效果。）
 * 
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 修改了插件分类。
 * [v1.2]
 * 修改了插件的部分结构，防止主动干扰其他图片插件的功能。
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_PictureEffects = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_PictureEffects');

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_picefc_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_picefc_pluginCommand.call(this,command, args);
	if ($gameScreen.picture(args[1])) {this.setPictureEffects(command, args)};
	return true;
};

//==============================
// * Set Picture Effets
//==============================
Game_Interpreter.prototype.setPictureEffects = function(command, args) {
	this.picEfctSetPos(command, args);
    if (args[3]) {this.picEfctSetAni(command, args)};
};

//==============================
// * pict Effect Set Pos
//==============================
Game_Interpreter.prototype.picEfctSetPos = function(command, args) {
	if (command === "picture_player_position")  { 
	        $gameScreen.picture(Number(args[1]))._positionData[0] = 1;
	} else if (command === "picture_map_position")  { 
	        $gameScreen.picture(Number(args[1]))._positionData[0] = 3;
	} else if (command === "picture_event_position" && args[3])  {	          
	  	$gameMap.events().forEach(function(event) {
		if (!event._erased && event.eventId() === Number(args[3])) {
	    	$gameScreen.picture(Number(args[1]))._positionData[0] = 2;
            $gameScreen.picture(Number(args[1]))._positionData[4] = args[3];
			$gameScreen.picture(Number(args[1]))._positionData[5] = $gameMap._mapId
		};
        }, this);         
	};	
};

//==============================
// * pict Effet Set Ani
//==============================
Game_Interpreter.prototype.picEfctSetAni = function(command, args) {
	var enable = String(args[3]) === "true" ? true : false;
	if (command === "pic_animated")  {
		   var frm = Math.min(Math.max(Number(args[3]),1),999);	
		   var speed = args[5] ? Number(args[5]) : 20;
     	   $gameScreen.picture(Number(args[1]))._animeData = [true,frm,9999,0,speed];
	};	
	if (command === "pic_shake")  {
		   var pw = args[5] ? Number(args[5]) : 10;
	       $gameScreen.picture(Number(args[1]))._shake = [enable,20,0,0,pw];
	} else if (command === "pic_shake2")  {
		   var pw = args[5] ? Number(args[5]) : 10;
	   	   $gameScreen.picture(Number(args[1]))._shake2 = [enable,20,0,0,pw,0,0];
	};	
	if (command === "pic_breath")  {
		   var pw = args[5] ? Number(args[5]) : 1;
		   var pw = pw * 0.01
		   var pw2 = args[7] ? Number(args[7]) : 5;
		   var pw2 = 1 + (pw2 * 0.1);
	   	   $gameScreen.picture(Number(args[1]))._breathEffect = [enable,0,0,0,pw,pw2];
	};
	if (command === "pic_float")  {
		   var pw = args[5] ? Number(args[5]) : 1;
		   var pw = pw * 0.1;
		   var pw2 = args[7] ? Number(args[7]) : 15;
		   $gameScreen.picture(Number(args[1]))._floatEffect = [enable,0,0,0,pw2,pw];
	};
	if (command === "pic_smooth")  {
		  var pw = args[5] ? Number(args[5]) : 20;
		  var pw2 = args[7] ? Number(args[7]) : 160;
		  var pw2 = pw2 * 0.01;
     	  $gameScreen.picture(Number(args[1]))._moveEffect = [enable,0,0,160,0,0,pw,pw2,160];
	};			
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

//==============================
// * Pict FX
//==============================
Game_Map.prototype.pictFX = function() {
	return this._displayX * this.tileWidth();
};

//==============================
// * Pict FY
//==============================
Game_Map.prototype.pictFY = function() {
	return this._displayY * this.tileHeight();
};

//=============================================================================
// ** Game Picture
//=============================================================================	

//==============================
// * initBasic
//==============================
var _mog_pect_gpicture_initBasic = Game_Picture.prototype.initBasic;
Game_Picture.prototype.initBasic = function() {
	_mog_pect_gpicture_initBasic.call(this);
	this.initPicEffectBasic();
};

//==============================
// * initPicEffectBasic
//==============================
Game_Picture.prototype.initPicEffectBasic = function() {
	this._position = [0,0];
	this._zoom = [100,100];	
	this._effectType = 0;
	this._shake = [false,0,0,0,0];
	this._shake2 = [false,0,0,0,0,0,0];
	this._breathEffect = [false,0,0,0,0];
	this._breathEffect2 = [false,0,0,0,0];
	this._floatEffect = [false,0,0,0];
	this._positionData = [0,0,0,0,0,0,0];
	this._animeData = [false,0,0,0,0];
	this._moveEffect = [false,0,0,0,0,0,0,0,0];
};

//==============================
// * Pic X
//==============================
Game_Picture.prototype.picX = function() {
	return this._position[0] + this._positionData[1] + this._shake[2] + this._shake2[2] + this._moveEffect[1];
};

//==============================
// * Pic Y
//==============================
Game_Picture.prototype.picY = function() {
	return this._position[1] + this._positionData[2] + this._shake[3] + this._shake2[3] + this._floatEffect[3] + this._moveEffect[2];
};

//==============================
// * Zoom X
//==============================
Game_Picture.prototype.zoomX = function() {
	return this._zoom[0] + this._breathEffect[2];
};

//==============================
// * Zoom Y
//==============================
Game_Picture.prototype.zoomY = function() {
	return this._zoom[1] + this._breathEffect[3];
};

//==============================
// * Opacity
//==============================
Game_Picture.prototype.opacity = function() {
	return this._opacity;
};

//==============================
// * Angle
//==============================
Game_Picture.prototype.angle = function() {
    return this._angle + this._shake2[5];
};

//==============================
// * Erase
//==============================
var _mog_pect_gpicture_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function() {
	_mog_pect_gpicture_erase.call(this);
	this.initPicEffectBasic();
};

//==============================
// * Show
//==============================
var _mog_pect_gpicture_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function(name, origin, x, y, scaleX,scaleY, opacity, blendMode) {
	_mog_pect_gpicture_show.call(this,name, origin, x, y, scaleX,scaleY, opacity, blendMode)
	this.initPicEffectBasic();
	this._position[0] = x;
	this._position[1] = y;
	this._positionData[1] = x;
	this._positionData[2] = y;
	this._zoom[0] = scaleX;
	this._zoom[1] = scaleY;
	if (this._breathEffect[0]) {
	   this._breathEffect[3] = (Math.random() * 0.20).toFixed(2);
	};
	if (this._floatEffect[0]) {
		this._floatEffect[3] = -(Math.random() * 15).toFixed(2);
	};
};

//==============================
// * Move
//==============================
var _mog_pect_gpicture_move = Game_Picture.prototype.move;
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY,opacity, blendMode, duration) {
    _mog_pect_gpicture_move.call(this,origin, x, y, scaleX, scaleY,opacity, blendMode, duration)
	this._positionData[1] = x;
    this._positionData[2] = y;
};

//==============================
// * update Move
//==============================
var _mog_pect_gpicture_updateMove = Game_Picture.prototype.updateMove;
Game_Picture.prototype.updateMove = function() {
	var last_duration = 0;
    if (this._duration > 0) {		
		last_duration = this._duration;
        var d = this._duration;
        this._zoom[0] = (this._scaleX  * (d - 1) + this._targetScaleX)  / d;
        this._zoom[1] = (this._scaleY  * (d - 1) + this._targetScaleY)  / d;
		need_update = true;
    };
	_mog_pect_gpicture_updateMove.call(this);
	if( last_duration > 0 ){
        var d = last_duration;
		if (this._positionData[0] === 0) {
			this._x = (this._x * (d - 1) + this._targetX) / d;
			this._y = (this._y * (d - 1) + this._targetY) / d;	
		};	
        this._opacity = (this._opacity * (d - 1) + this._targetOpacity) / d;	
		this.updatePictureEffects();
	}
};

//==============================
// * Game Picture
//==============================
var _mog_pect_gpicture_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_mog_pect_gpicture_update.call(this);
	this.updatePictureEffects();
};

//==============================
// * Update Picture Effects
//==============================
Game_Picture.prototype.updatePictureEffects = function() {
	if (this._shake[1] > 0) {this.updateShake()};
	if (this._shake2[1] > 0) {this.updateShake2()};
	if (this._breathEffect[0]) {this.updateBreathEffect()};
	if (this._floatEffect[0]) {this.updateFloatEffect()};
	if (this._positionData[0] > 0) {this.updatePicPosEfct()};
	if (this._moveEffect[0]) {this.updateMoveEfct()};
	if (this._breathEffect[2] != 0 ){this._scaleX = this.zoomX();}
	if (this._breathEffect[3] != 0 ){this._scaleY = this.zoomY();}
};

//==============================
// * Update Move Effect
//==============================
Game_Picture.prototype.updateMoveEfct = function() {
    this._moveEffect[3]++;
	this._moveEffect[1] = this.movePictureEfc(this._moveEffect[1],this._moveEffect[4],this._moveEffect[7]);
	this._moveEffect[2] = this.movePictureEfc(this._moveEffect[2],this._moveEffect[5],this._moveEffect[7]);
	this._x = this.picX();
	this._y = this.picY();	 	
	if (this._moveEffect[3] < 30) {return};
	this._moveEffect[3] = 0;
	var r = Math.randomInt(2);
	this._moveEffect[4] = r === 0 ? Math.randomInt(this._moveEffect[6]) : -Math.randomInt(this._moveEffect[6]);
	var r = Math.randomInt(2);
	this._moveEffect[5] = r === 0 ? Math.randomInt(this._moveEffect[6]) : -Math.randomInt(this._moveEffect[6]);	
};

//==============================
// * Move Picture Effect
//==============================
Game_Picture.prototype.movePictureEfc = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = (0.1 + speed) + (Math.abs(value - real_value) / 160);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return value;
};

//==============================
// * Update Breath Effect
//==============================
Game_Picture.prototype.updateBreathEffect = function() {
	if (this._duration > 0) {return};
	if (this._breathEffect[1] === 0) {
		this._breathEffect[3] += this._breathEffect[4];
		if (this._breathEffect[3] >= this._breathEffect[5]) {
			this._breathEffect[3] = this._breathEffect[5];
			this._breathEffect[1] = 1;
		};
	} else {
		this._breathEffect[3] -= this._breathEffect[4];
		if (this._breathEffect[3] <= 0) {
			this._breathEffect[3] = 0;
			this._breathEffect[1] = 0;
		};
	};	
};

//==============================
// * Update Float Effect
//==============================
Game_Picture.prototype.updateFloatEffect = function() {
	if (this._duration > 0) {return};
	if (this._floatEffect[1] === 0) {
		this._floatEffect[3] -= this._floatEffect[5];
		if (this._floatEffect[3] <= -this._floatEffect[4]) {this._floatEffect[1] = 1};
	} else {
		this._floatEffect[3] += this._floatEffect[5];
		if (this._floatEffect[3] >= 0) {this._floatEffect[1] = 0};
	};	
};

//==============================
// * Update Shake
//==============================
Game_Picture.prototype.updateShake = function() {
	this._shake[1] --
	this._shake[2] = Math.random() * this._shake[4];
	this._shake[3] = Math.random() * this._shake[4];
	if (this._shake[1] <= 0) {
		if (this._shake[0]) {this._shake[1] = 20
		} else {
		   this._shake[2] = 0;
		   this._shake[3] = 0;
		};
	};
};

//==============================
// * Update Shake
//==============================
Game_Picture.prototype.updateShake2 = function() {
	this._shake2[6]++;
	if (this._shake2[6] < 3) {return};
	this._shake2[6] = 0;
	this._shake2[1] --;
	this._shake2[2] = Math.random() * this._shake2[4];
	this._shake2[3] = Math.random() * this._shake2[4];
	var r = Math.randomInt(2)
	this._shake2[5] = r === 1 ? Math.randomInt(5) : -Math.randomInt(5);
	if (this._shake2[1] <= 0) {
		if (this._shake2[0]) {this._shake2[1] = 20
		} else {
		   this._shake2[2] = 0;
		   this._shake2[3] = 0;
		};
	};
};

//==============================
// * Update Picture Pos Effct
//==============================
Game_Picture.prototype.updatePicPosEfct = function() {
	 if (this._positionData[0] === 1) {
		 this._position[0] = $gamePlayer.screenX();
		 this._position[1] = $gamePlayer.screenY();
	 } else if (this._positionData[0] === 2) {
		 var event = $gameMap.events()[this._positionData[4] - 1]
		 if (event && !event._erased && this._positionData[5] === $gameMap._mapId) {
		    this._position[0] = event.screenX();
		    this._position[1] = event.screenY();
		 } else {
		    this._position[0] = $gamePlayer.screenX();
		    this._position[1] = $gamePlayer.screenY();			 
		 };
	 } else {	 
		 this._position[0] = -$gameMap.pictFX();
		 this._position[1] = -$gameMap.pictFY();
	 };
	this._x = this.picX();
	this._y = this.picY();	 
};

//=============================================================================
// ** Sprite Picture
//=============================================================================	

//==============================
// * Update Bitmap
//==============================
var _mog_picefc_sprpic_updateBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function() {
	_mog_picefc_sprpic_updateBitmap.call(this);
	if (this.picture() && this.picture()._animeData[0]) {this.updateFrames(this.picture())};	
};

//==============================
// * Update Frames
//==============================
Sprite_Picture.prototype.updateFrames = function(picture) {
	if (!this.bitmap.isReady()) {this.visible = false;return};
	this.visible = true
	if (!this._picFrames) {this.setPicFrames(picture)};
	picture._animeData[2] ++
	if (picture._animeData[2] < picture._animeData[4]) {return};
	picture._animeData[2]  = 0
	this.setFrame(picture._animeData[3] * this._picFrames[3],0,this._picFrames[3],this._picFrames[4])
	picture._animeData[3] ++
	if (picture._animeData[3] >= this._picFrames[0]) {picture._animeData[3] = 0}
};

//==============================
// * set PicFrames
//==============================
Sprite_Picture.prototype.setPicFrames = function(picture) {
	var w = this.bitmap.width / picture._animeData[1]
	var h = this.bitmap.height;
	this._picFrames = [picture._animeData[1],0,0,w,h];
	this.setFrame(picture._animeData[3] * this._picFrames[3],0,this._picFrames[3],this._picFrames[4]);
};

//==============================
// * Update Origin
//==============================
var _mog_picefc_sprpic_updateOther = Sprite_Picture.prototype.updateOther;
Sprite_Picture.prototype.updateOther = function() {
	_mog_picefc_sprpic_updateOther.call(this)
    this.updatePicEffect();
};

//==============================
// * Update Pic Effect
//==============================
Sprite_Picture.prototype.updatePicEffect = function() {
	if (this.picture()._breathEffect[0]) {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
		this.y += this.height / 2;
	};
	if (this.picture()._positionData[0] === 0) { 
	   this.x += this.picture()._shake[2] + this.picture()._shake2[2];
	   this.y += this.picture()._shake[3] + this.picture()._shake2[3]; 
	   if (this.picture()._floatEffect[0]) {this.y += this.picture()._floatEffect[3]};
	};
};