//=============================================================================
// MOG_LimitedVisibility.js
//=============================================================================
/*:
 * @plugindesc (v1.0)[v1.2]  地图 - 简单光源精灵
 * @author Moghunter （Drill_up翻译+优化）
 *
 * @param 平移-光源 X
 * @desc 以光源的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-光源 Y
 * @desc 以光源的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default -24
 *
 * @param 光源旋转半径
 * @type number
 * @min 0
 * @desc Area de movimento do círculo.
 * @default 60
 *
 * @param 是否根据玩家朝向变化
 * @type boolean
 * @on 变化
 * @off 不变化
 * @desc true - 变化，false - 不变化。只能变化四方向，对角方向不支持。
 * @default true
 *
 * @param 平移-精灵 X
 * @desc 以精灵的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-精灵 Y
 * @desc 以精灵的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 精灵动画帧
 * @type number
 * @min 1
 * @desc 1表示不使用gif动画。帧数设置为4，会把资源分割成4份，然后依次循环播放。
 * @default 3
 *
 * @param 精灵帧播放速度
 * @type number
 * @min 1
 * @desc 速度为帧/每张图。设置10表示每10帧跳转至下一帧图片。（1秒60帧）
 * @default 6
 *
 * @param --精灵组--
 * @default 
 *
 * @param 精灵-1
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-2
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-3
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-4
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-5
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-6
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-7
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-8
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-9
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-10
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-11
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-12
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-13
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-14
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-15
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-16
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-17
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-18
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-19
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 精灵-20
 * @parent --精灵组--
 * @desc 精灵的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 *
 * @param --阴影组--
 * @default 
 *
 * @param 阴影-1
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-2
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-3
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-4
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-5
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-6
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-7
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-8
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-9
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-10
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-11
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-12
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-13
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-14
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-15
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-16
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-17
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-18
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-19
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 阴影-20
 * @parent --阴影组--
 * @desc 阴影的图片资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @help  
 * =============================================================================
 * +++ MOG - Limited Visibility (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 通过阴影图片来制造简单昏暗效果。
 * 只有围绕主角一个光源，阴影图片多大，阴影就有多大。
 *
 * -----------------------------------------------------------------------------
 * ----相似插件
 * 该插件与 TerraxLighting.js  地图–多光源特效 的功能是一样的。
 * （二者可以叠加使用，但是效果差强人意。）
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 精灵和阴影的图片资源，分别配置在组中。（img/system文件夹）
 * 配置没有固定顺序，可以随机配置在组中。
 * 但是关键字设置要与配置的文件名相互匹配！
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 需要通过插件指令来开启光源精灵，一次只能设置一个光源精灵：
 * （注意，插件的冒号两边都有一个空格）
 *
 * 插件指令（启用）：limitedvisibility : A : B : C : D
 * 插件指令（关闭）：clearvisibility
 *
 * 参数A：移动方式
 *        0 - 保持不动， 1 - 环绕
 * 参数B：精灵图片资源
 *        不需要.png后缀，但是要确保和配置的文件名一致。
 *        如果没有图片，可以填写"无"。
 * 参数C：阴影图片资源
 *        不需要.png后缀，但是要确保和配置的文件名一致。
 * 参数D：阴影亮度
 *        0为全亮，255为全黑。
 *
 * 光源需要根据你自定义的阴影图片来控制光线，如果阴影图片是一个长方形的
 * 完全透明的图片，那么地图上会显示一个长方形的可见区域。
 * 注意，阴影图片的中心也就是光源的中心。
 *
 * 示例：
 * 插件指令：limitedvisibility : 0 : 无 : 光源精灵-阴影3 : 255
 * 插件指令：limitedvisibility : 1 : 光源精灵-精灵1 : 光源精灵-阴影2 : 255
 * 插件指令：clearvisibility
 * 
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 使得该插件支持关联资源的打包、加密。
 * 部署时勾选去除无关文件，本插件中相关的文件不会被去除。
 * [v1.2]
 * 添加了根据玩家朝向变化光线的功能。
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_LimitedVisibility = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_LimitedVisibility');  
    Moghunter.lightSphereX = Number(Moghunter.parameters['平移-光源 X'] || 0);
    Moghunter.lightSphereY = Number(Moghunter.parameters['平移-光源 Y'] || -24);
	Moghunter.lightSphereObjectR = Number(Moghunter.parameters['光源旋转半径'] || 60);
	Moghunter.lightSphereObjectF = Number(Moghunter.parameters['精灵动画帧'] || 1);
	Moghunter.lightSphereObjectA = Number(Moghunter.parameters['精灵帧播放速度'] || 6);
    Moghunter.lightSphereObjectX = Number(Moghunter.parameters['平移-精灵 X'] || 0);
    Moghunter.lightSphereObjectY = Number(Moghunter.parameters['平移-精灵 Y'] || 0);	
    Moghunter.lightSphere_is_change = String(Moghunter.parameters['是否根据玩家朝向变化'] || "true");	
	
	
//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_sphLight_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_sphLight_pluginCommand.call(this,command, args)
    if (command === "limitedvisibility")  {
		type = Number(args[1]);
		fileName1 = String(args[3]);
		if(fileName1==="无"){fileName1 = ""};
		fileName2 = String(args[5]);
		opc = String(args[7]);
        $gameSystem._lsphereData = [true,type,0,null,fileName1,fileName2,opc];
	} else if (command === "clearvisibility")  {
		 $gameSystem._lsphereData = [true,-1,0,null,"","",255];
	};
	return true;
};

//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_SpLight_Gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _mog_SpLight_Gsys_initialize.call(this);
	this._lsphereData = [false,-1,0,null,"","",255];
};	
	
//=============================================================================
// ** Scene Map
//=============================================================================

//==============================
// * Terminate
//==============================
var _mog_Splight_scMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	if (this._spriteset) {this._spriteset.recordSphereData()};
    _mog_Splight_scMap_terminate.call(this);
};

//=============================================================================
// ** Spriteset Map
//=============================================================================

//==============================
// * create Lower Layer
//==============================
var _mog_spLight_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    _mog_spLight_createLowerLayer.call(this);
	this.createSphereLight();
};

//==============================
// * create Sphere Light
//==============================
Spriteset_Map.prototype.createSphereLight = function() {
	 if ($gameSystem._lsphereData[3]) {$gameSystem._lsphereData[0] = true};
     this._sphereLight = new SpriteSphereLight();
	 this.addChild(this._sphereLight);
};

//==============================
// * Record Particles Data
//==============================
Spriteset_Map.prototype.recordSphereData = function() {
     if (this._sphereLight._Sphere.bitmap) {this._sphereLight.recordSphereData()};
};	

//=============================================================================
// ** SpriteSphereLight
//=============================================================================
function SpriteSphereLight() {
    this.initialize.apply(this, arguments);
};
SpriteSphereLight.prototype = Object.create(Sprite.prototype);
SpriteSphereLight.prototype.constructor = SpriteSphereLight;

//==============================
// * Initialize
//==============================
SpriteSphereLight.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.opacity = 0;
	this._data = [false,0,0,0,0];
	this._pi = 2.0 * Math.PI;
	this._np = [0,0,0,0];
	this._rol_range = Moghunter.lightSphereObjectR;
	this.createBlackField();
    this.createLight();
	this.createSphere();
	this.updatePosition();
};

//==============================
// * record Sphere Data
//==============================
SpriteSphereLight.prototype.recordSphereData = function() {
   $gameSystem._lsphereData[3] = [];
   $gameSystem._lsphereData[3][0] = this.opacity;
   $gameSystem._lsphereData[3][1] = this.x;
   $gameSystem._lsphereData[3][2] = this.y;
   $gameSystem._lsphereData[3][3] = this._Sphere.x;
   $gameSystem._lsphereData[3][4] = this._Sphere.y;
   $gameSystem._lsphereData[3][5] = this._np;
   $gameSystem._lsphereData[3][6] = this._SphereData;
   $gameSystem._lsphereData[3][7] = this._data;
};
   
//==============================
// * Load Sphere Data
//==============================
SpriteSphereLight.prototype.loadSphereData = function() {
   this.opacity = $gameSystem._lsphereData[3][0];
   this.x = $gameSystem._lsphereData[3][1];
   this.y = $gameSystem._lsphereData[3][2];
   this._Sphere.x = $gameSystem._lsphereData[3][3];
   this._Sphere.y = $gameSystem._lsphereData[3][4];
   this._np = $gameSystem._lsphereData[3][5];
   this._SphereData = $gameSystem._lsphereData[3][6];
   this._data = $gameSystem._lsphereData[3][7];
   $gameSystem._lsphereData[3] = null;
};

//==============================
// * create Black Field
//==============================
SpriteSphereLight.prototype.createBlackField = function() {
    this._blackField = new Sprite();
	this.addChild(this._blackField);
};

//==============================
// * createLight
//==============================
SpriteSphereLight.prototype.createLight = function() {
	this._lightSprite = new Sprite();
	this._lightSprite.anchor.x = 0.5;
	this._lightSprite.anchor.y = 0.5;
	this.addChild(this._lightSprite);
};

//==============================
// * createSphere
//==============================
SpriteSphereLight.prototype.createSphere = function() {
	this._Sphere = new Sprite();
	this._SphereData = [-10,0,0,0,0,0];
	this.addChild(this._Sphere);
};

//==============================
// * Refresh Bitmap
//==============================
SpriteSphereLight.prototype.refreshBitmap = function() {
	this._blackField.bitmap = new Bitmap(this.screenCW()*2,this.screenCH()*2);
	this._blackField.bitmap.fillAll('black');	
	this._blackField.anchor.x = 0.5;
	this._blackField.anchor.y = 0.5;
    this._Sphere.bitmap = ImageManager.loadSystem($gameSystem._lsphereData[4]);
	this._lightSprite.bitmap = ImageManager.loadSystem($gameSystem._lsphereData[5]);
};

//==============================
// * Clear
//==============================
SpriteSphereLight.prototype.clearBitmap = function() {
	this.opacity = 0;
    this._Sphere.bitmap = null;
	this._lightSprite.bitmap = null;
};

//==============================
// * refreshSphere
//==============================
SpriteSphereLight.prototype.refreshSphere = function() {
    var wd = this._SphereData[0] * this._SphereData[2];
    this._Sphere.setFrame(wd,0,this._SphereData[0],this._SphereData[1]);
	this._SphereData[2]++;
	if (this._SphereData[2] > Moghunter.lightSphereObjectF-1) {this._SphereData[2] = 0};
};

//==============================
// * updateSphere
//==============================
SpriteSphereLight.prototype.updateSphere = function() {
	this._SphereData[3]++;
	if (this._SphereData[3] < this._SphereData[4]) {return};
	this._SphereData[3] = 0;
    this.refreshSphere();
};

//==============================
// * Mode
//==============================
SpriteSphereLight.prototype.mode = function() {
    return $gameSystem._lsphereData[1];
};

//==============================
// * screen CW
//==============================
SpriteSphereLight.prototype.screenCW = function() {
     return  Math.floor(Graphics.boxWidth * 2) + 64;
};

//==============================
// * screen CH
//==============================
SpriteSphereLight.prototype.screenCH = function() {
     return  Math.floor(Graphics.boxHeight * 2) + 64;
};

//==============================
// * posX
//==============================
SpriteSphereLight.prototype.posX = function() {
     return $gamePlayer.screenX() + this._data[1] + Moghunter.lightSphereX - Math.floor(this.screenCW() / 2);
};

//==============================
// * posY
//==============================
SpriteSphereLight.prototype.posY = function() {
     return $gamePlayer.screenY() + this._data[2] + Moghunter.lightSphereY - Math.floor(this.screenCH() / 2);
};

//==============================
// * Reset Bitmap
//==============================
SpriteSphereLight.prototype.resetBitmap = function() {
    this._data = [false,0,0,0,0];
    this._np = [0,0,0,0];
    this._SphereData = [-10,0,0,0,0,0];
	$gameSystem._lsphereData[0] = false;
	if ($gameSystem._lsphereData[1] === -1) {
		 this.clearBitmap();
		 this._data[0] = true;
	} else {
		 this.refreshBitmap();
	};
};

//==============================
// * refresh Rect
//==============================
SpriteSphereLight.prototype.refreshRect = function() {
	if ($gameSystem._lsphereData[0]) {this.resetBitmap();return};
	if (!this._Sphere.bitmap) {this.refreshBitmap()};
	if (!this._Sphere.bitmap.isReady() || !this._lightSprite.bitmap.isReady()) {return};
	this._SphereData = [this._Sphere.bitmap.width / Moghunter.lightSphereObjectF,this._Sphere.bitmap.height,0,0,
	                     Moghunter.lightSphereObjectF,Moghunter.lightSphereObjectA];
	this.refreshSphere();
	var w = this._lightSprite.bitmap.width ;
	var h = this._lightSprite.bitmap.height;
	var b_x = (this._blackField.bitmap.width /2) - (w/2);
	var b_y = (this._blackField.bitmap.height /2) - (h/2);
	var cx = Math.floor((this.screenCW() / 2));
	var cy = Math.floor((this.screenCH() / 2));
	//var x1 = cx -  Math.floor((w / 2));
	//var y1 = cy -  Math.floor((h / 2));
	var x2 = cx -  Math.floor((this._SphereData[0] / 2));
	var y2 = cy -  Math.floor((this._SphereData[1] / 2));	
	this._lightSprite.x = cx;
	this._lightSprite.y = cy;
	this._blackField.x = cx;
	this._blackField.y = cy;
	this._blackField.bitmap.clearRect(b_x, b_y, w, h);
	if( Moghunter.lightSphere_is_change === "true" ){
		if( $gamePlayer.direction() === 2 ){	//下
			this._target_rotation = 0;
		}
		if( $gamePlayer.direction() === 4 ){	//左
			this._target_rotation = Math.PI / 2;
		}
		if( $gamePlayer.direction() === 6 ){	//右
			this._target_rotation = Math.PI + Math.PI / 2;
		}
		if( $gamePlayer.direction() === 8 ){	//上
			this._target_rotation = Math.PI;
		}
	}
	this._Sphere.x = x2;
	this._Sphere.y = y2;
	if ($gameSystem._lsphereData[3]) {
	   this.loadSphereData();
	} else {
	   //this.opacity = 0;	
	};
	this._data[0] = true;	
};

//==============================
// * moveTo
//==============================
SpriteSphereLight.prototype.moveToP = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 5 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * update Animation
//==============================
SpriteSphereLight.prototype.updateAnimation = function() {
   if (this.mode() === 1) {
	   this.updateCircle();
   } else {
	   this._data[1] = 0;
	   this._data[2] = 0;
   };
};

//==============================
// * Update Ring
//==============================
SpriteSphereLight.prototype.updateCirclePosition = function() {
 	  var rol_index = 1 / 160;
	  var si = 0;
	  var i = this._np[2];
	  this._np[2]++
	  if (this._np[2] > 160) {this._np[2] = 0}
      var now_p = rol_index * (si - i);
      var r_p = this._pi * -now_p;
      this._np[0] = Math.floor(this._rol_range * Math.sin(r_p));
      this._np[1] = -Math.floor(this._rol_range * Math.cos(r_p));
};

//==============================
// * update Circle
//==============================
SpriteSphereLight.prototype.updateCircle = function() {
   this.updateCirclePosition();
   this._data[1] = this.moveToP(this._data[1],this._np[0],10);
   this._data[2] = this.moveToP(this._data[2],this._np[1],10);
};

//==============================
// * update Position
//==============================
SpriteSphereLight.prototype.updatePosition = function() {
	this.x = this.posX();
	this.y = this.posY();
};

//==============================
// * max Opacity
//==============================
SpriteSphereLight.prototype.maxOpacity = function() {
 	return $gameSystem._lsphereData[6];
};
	
//==============================
// * Update
//==============================
SpriteSphereLight.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (this.needRefresh ()) {this.refreshRect()};
	if (!this._lightSprite.bitmap) {return};
	if (!this._lightSprite.bitmap.isReady()) {return};
	if (this.opacity < this.maxOpacity()) {this.opacity += 5};
	this.rotateByDirection();
	this.updateSphere();
	this.updateAnimation();
    this.updatePosition();
};

//==============================
// * need Refresh
//==============================
SpriteSphereLight.prototype.needRefresh = function() {
     if (!this._data[0] && this._lightSprite.bitmap && this._lightSprite.bitmap.isReady()) {return true};
	 if ($gameSystem._lsphereData[0]) {return true};
     return false;
};

//==============================
// * rotate by direction
//==============================
SpriteSphereLight.prototype.rotateByDirection = function() {
	if ($gameSystem._lsphereData[0]) {this.resetBitmap();return};
	if (!this._Sphere.bitmap) {this.refreshBitmap()};
	if (!this._Sphere.bitmap.isReady() || !this._lightSprite.bitmap.isReady()) {return};
	if( Moghunter.lightSphere_is_change === "true" ){
	
		var pi = Math.PI;
		if (this._direction != $gamePlayer.direction()){
			this._direction = $gamePlayer.direction();
			if( $gamePlayer.direction() === 2 ){	//下
				this._target_rotation = 0;
			}
			if( $gamePlayer.direction() === 4 ){	//左
				this._target_rotation = pi / 2;
			}
			if( $gamePlayer.direction() === 6 ){	//右
				this._target_rotation = pi + pi / 2;
			}
			if( $gamePlayer.direction() === 8 ){	//上
				this._target_rotation = pi;
			}
			var angle =  this._target_rotation - this._blackField.rotation;
			if( angle >= pi ){
				this._rotate_dir = -1;	//顺时针
			}else if( angle <= pi*-1 ){
				this._rotate_dir = 1;	//逆时针
			}else if( angle > 0 ){
				this._rotate_dir = 1;
			}else{
				this._rotate_dir = -1;
			}
		}
		if( this._target_rotation != this._blackField.rotation ){
			var angle = this._blackField.rotation - this._target_rotation;
			if( Math.abs(angle) < 0.1 ){
				this._blackField.rotation = this._target_rotation;
				this._lightSprite.rotation = this._target_rotation;
				this._rotate_dir = 0;
			}else{
				this._blackField.rotation += 0.09 * this._rotate_dir;
				this._lightSprite.rotation += 0.09 * this._rotate_dir;
			}
			if(this._blackField.rotation >= pi*2){
				this._blackField.rotation -= pi*2;
				this._lightSprite.rotation -= pi*2;
			}
			if(this._blackField.rotation < 0){
				this._blackField.rotation += pi*2;
				this._lightSprite.rotation += pi*2;
			}
		}
	}
}