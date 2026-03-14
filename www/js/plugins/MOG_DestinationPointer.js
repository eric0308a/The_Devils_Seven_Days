//=============================================================================
// MOG_DestinationPointer.js
//=============================================================================

/*:
 * @plugindesc (v1.0)[v1.3]  地图 - 鼠标指向标
 * @author Moghunter （Drill_up翻译+优化）
 *
 * @param 资源-指向标
 * @desc 鼠标指向标的图片资源。
 * @default 鼠标指向标-箭头
 * @require 1
 * @dir img/Map__ui/
 * @type file
 *
 * @param 资源-指向标阴影
 * @desc 鼠标指向标阴影的图片资源。漂浮效果时使用。
 * @default 鼠标指向标-阴影
 * @require 1
 * @dir img/Map__ui/
 * @type file
 *
 * @param 偏移-指向标 X
 * @desc 以指向标的点为基准，x轴方向平移，单位像素。
 * @default 0
 *
 * @param 偏移-指向标 Y
 * @desc 以指向标的点为基准，y轴方向平移，单位像素。
 * @default 0 
 *
 * @param 是否使用平滑运动
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 是否使用缩放效果
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default false
 *
 * @param 是否使用闪烁效果
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default false
 *
 * @param 是否使用漂浮效果
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 混合模式
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 旋转速度
 * @desc 正数逆时针，负数顺时针，单位 弧度/帧。(1秒60帧)
 * 6.28表示一圈，设置0.01表示大概10秒转一圈，设置0则不旋转。
 * @default 0 
 * 
 * @param gif动画帧数
 * @type number
 * @min 1
 * @desc 1表示不使用gif动画。帧数设置为4，会把资源分割成4份，然后依次循环播放。
 * @default 1
 *
 * @param gif动画播放速度
 * @type number
 * @min 1
 * @desc 速度为帧/每张图。设置10表示每10帧跳转至下一帧图片。
 * （1秒60帧）
 * @default 4
 *
 * @help  
 * =============================================================================
 * +++ MOG - Destination Pointer (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 玩家鼠标点击地图的某一个点时，会飘出一个指向标。
 * 玩家到了目的地后指向标消失。
 * 【现已支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__ui （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__ui文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 使用鼠标指向标，需要配置资源文件：
 *
 * 资源-指向标
 * 资源-指向标阴影（漂浮效果用到，不漂浮可以不设置）
 *
 * （如果设置了gif动画，那么就要按照帧数，将图片的每一帧从左往右依次添加，
 * 存储成Destination.png一张图。插件会根据设置对图片进行切割。）
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   持续执行
 * 时间复杂度： o(n)*o(贴图处理)
 * 测试方法：   以正常流程测试，并记录性能。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.插件只有一个图层，并且只有鼠标点击时才会启用，找到的消耗为
 *   4.97ms，可以看做没有消耗。
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 使得该插件支持关联资源的打包、加密。
 * 部署时勾选去除无关文件，本插件中相关的文件不会被去除。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 * [v1.3]
 * 添加了插件性能测试说明。
 */
//
//		工作类型		单次执行
//		时间复杂度		o(n)*o(贴图处理)
//		性能测试因素	乱跑
//		性能测试消耗	4.97ms   3.81ms 200
//		最坏情况		无	
//		备注			无

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_DestinationCursor = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_DestinationPointer');
    Moghunter.destCursor_X = Number(Moghunter.parameters['偏移-指向标 X'] || 0);
    Moghunter.destCursor_Y = Number(Moghunter.parameters['偏移-指向标 Y'] || 0);
	Moghunter.destCursor_slide = String(Moghunter.parameters['是否使用平滑运动'] || 'true');
    Moghunter.destCursor_BlendMode = Number(Moghunter.parameters['混合模式'] || 0);
	Moghunter.destCursor_Rotation = Number(Moghunter.parameters['旋转速度'] || 0);
    Moghunter.destCursor_Zoom = String(Moghunter.parameters['是否使用缩放效果'] || 'false');
    Moghunter.destCursor_Fade = String(Moghunter.parameters['是否使用闪烁效果'] || 'false');
	Moghunter.destCursor_Float = String(Moghunter.parameters['是否使用漂浮效果'] || 'true');
    Moghunter.destCursor_Frames = Number(Moghunter.parameters['gif动画帧数'] || 1);
	Moghunter.destCursor_FramesSpeed = Number(Moghunter.parameters['gif动画播放速度'] || 1);
	Moghunter.src_Destination = String(Moghunter.parameters['资源-指向标']);
	Moghunter.src_Destination_Shadow = String(Moghunter.parameters['资源-指向标阴影']);
	
		
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapUi = function(filename) {
    return this.loadBitmap('img/Map__ui/', filename, 0, true);
};

//=============================================================================
// ** Spriteset Map 
//=============================================================================
//==============================
// * create Destination
//==============================
// >>>>>>> Overwritten Function >>>>>> 
Spriteset_Map.prototype.createDestination = function() {
    this._destinationSprite = new Sprite_DestinationPointer();
    this._destinationSprite.z = 9;
    this._tilemap.addChild(this._destinationSprite);
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//=============================================================================
// **  Sprite_Destination Pointer
//=============================================================================
function Sprite_DestinationPointer() {
    this.initialize.apply(this, arguments);
}

Sprite_DestinationPointer.prototype = Object.create(Sprite.prototype);
Sprite_DestinationPointer.prototype.constructor = Sprite_DestinationPointer;

//==============================
// * Initialize
//==============================
Sprite_DestinationPointer.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.setup();
	this.loadbBitmaps();
	if (this._shadow) {this.createSpritePointer()};
    this.createBitmap();
	this.update();
};

//==============================
// * setup
//==============================
Sprite_DestinationPointer.prototype.setup = function() {
	this._shadow = String(Moghunter.destCursor_Float) == 'true' ? true : false;
	var fy = this._shadow ? -16 : 0;
    this._xf = Number(Moghunter.destCursor_X);
	this._yf = Number(Moghunter.destCursor_Y) + fy;
	this._slideMove = String(Moghunter.destCursor_slide) == 'true' ? true : false;
	this._nextX = 0;
	this._nextY = 0;
	this._zoomAni = String(Moghunter.destCursor_Zoom) == 'true' ? true : false;
	this._fadeAni = String(Moghunter.destCursor_Fade ) == 'true' ? true : false;
	this._floatAni = String(Moghunter.destCursor_Float) == 'true' ? true : false;
	this._floatAniI = 0;
	this._floatAniY = 0;
    this._frames = Math.min(Math.max(Moghunter.destCursor_Frames,1),999);
	this._framesIndex = 0; 
	this._framesSpeed = Math.min(Math.max(Moghunter.destCursor_FramesSpeed,1),999);	
	this._framesAni = 0;
	this._rotationSpeed = Number(Moghunter.destCursor_Rotation);
	this.blendMode = Moghunter.destCursor_BlendMode;
	this._mode = 0;
	this._data = [-1,-1];
	this._data2 = [-1,-1];
	this._frameCount = 0;
	this.opacity = 0;
};

//==============================
// * load Bitmaps
//==============================
Sprite_DestinationPointer.prototype.loadbBitmaps = function() {
	this._bitmapImg1 = ImageManager.load_MapUi(Moghunter.src_Destination);
	if (this._shadow) {
		this._bitmapImg2 = ImageManager.load_MapUi(Moghunter.src_Destination_Shadow);
	} else {
        this._bitmapImg2 = new Bitmap(16,16);
	};
};

//==============================
// * get Data
//==============================
Sprite_DestinationPointer.prototype.getData = function() {
    this._data[0] = this._bitmapImg1.width / this._frames;
	this._data[1] = this._bitmapImg1.height;
	var sprite = this._pointer ? this._pointer : this;
	if (this._frames > 1) {this.refreshFrameAnimation(sprite)};
};

//==============================
// * create Sprite Pointer
//==============================
Sprite_DestinationPointer.prototype.createSpritePointer = function() {
    this._pointer = new Sprite(this._bitmapImg1);
    this._pointer.anchor.x = 0.5;
    this._pointer.anchor.y = 0.5;	
    this.addChild(this._pointer);
};

//==============================
// * create Bitmap
//==============================
Sprite_DestinationPointer.prototype.createBitmap = function() {
	var bt = this._pointer ? this._bitmapImg2 : this._bitmapImg1;
    this.bitmap = bt;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

//==============================
// * refresh Frame Animation
//==============================
Sprite_DestinationPointer.prototype.refreshFrameAnimation = function(sprite) {
     var ws = this._data[0] * this._framesIndex;
     sprite.setFrame(ws,0,this._data[0],this._data[1]);
     this._framesIndex++;
	 if (this._framesIndex >= this._frames) {this._framesIndex = 0};
};

//==============================
// * x Pos
//==============================
Sprite_DestinationPointer.prototype.xPos = function() {
	var x = $gameTemp.destinationX();
	var xo = this._pointer ? 0 : this._xf;
	return xo + ($gameMap.adjustX(x) + 0.5) * $gameMap.tileWidth();
};

//==============================
// * y Pos
//==============================
Sprite_DestinationPointer.prototype.yPos = function() {
	var y = $gameTemp.destinationY();
	var f = this._pointer ? 0 : this._floatAniY;
	var yo = this._pointer ? 0 : this._yf;
	return yo + f + (($gameMap.adjustY(y) + 0.5) * $gameMap.tileHeight());
};

//==============================
// * move to Pos
//==============================
Sprite_DestinationPointer.prototype.movetoPos = function(value,real_value) {
	if (value == real_value) {return value};
	var dnspeed = 5 + (Math.abs(value - real_value) / 10);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * update Position
//==============================
Sprite_DestinationPointer.prototype.updatePosition = function() {
    if (this._slideMove) {	   
	   this.x = this.movetoPos(this.x,this.xPos());
       this.y = this.movetoPos(this.y,this.yPos());
	} else {
       this.x = this.xPos();
       this.y = this.yPos();
	};
	if (this._pointer) {
		this._pointer.x = this._xf;
		this._pointer.y = this._floatAniY + this._yf;
    };
};

//==============================
// * update Zoom Animation
//==============================
Sprite_DestinationPointer.prototype.updateZoomAnimation = function(sprite) {
    sprite.scale.x = 1 + this._frameCount / 20;
    sprite.scale.y = sprite.scale.x;
};

//==============================
// * update Fade Animation
//==============================
Sprite_DestinationPointer.prototype.updateFadeAnimation = function(sprite) {
     sprite.opacity = (20 - this._frameCount) * 25;
};

//==============================
// * update Float Animation
//==============================
Sprite_DestinationPointer.prototype.updateFloatAnimation = function() {
	  this._floatAniI++;
	  if (this._floatAniI < 13) {
		  this._floatAniY--;
	  } else if (this._floatAniI < 26) {
		  this._floatAniY++;
	  } else {
		  this._floatAniI = 0;
		  this._floatAniY = 0;
	  };
};

//==============================
// * update Frame Animation
//==============================
Sprite_DestinationPointer.prototype.updateFrameAnimation = function(sprite) {
	this._framesAni++;
	if (this._framesAni < this._framesSpeed) {return};
	this._framesAni = 0;
    this.refreshFrameAnimation(sprite);
};

//==============================
// * update Rotation Animation
//==============================
Sprite_DestinationPointer.prototype.updateRotationAnimation = function(sprite) {
	sprite.rotation += this._rotationSpeed;
};

//==============================
// * update Animation
//==============================
Sprite_DestinationPointer.prototype.updateAnimation = function() {
    this._frameCount++;
    this._frameCount %= 20;
	var sprite = this._pointer ? this._pointer : this;
	if (this._zoomAni) {this.updateZoomAnimation(sprite)};
	if (this._fadeAni && $gameTemp.isDestinationValid()) {this.updateFadeAnimation(sprite)};
	if (this._rotationSpeed != 0) {this.updateRotationAnimation(sprite)};
	if (this._floatAni) {this.updateFloatAnimation()};
	if (this._frames > 1) {this.updateFrameAnimation(sprite)};
};

//==============================
// * update Sprites
//==============================
Sprite_DestinationPointer.prototype.updateSprites = function() {
    this.updatePosition();
    this.updateAnimation();
    this.visible = true;
};

//==============================
// * update Disabled
//==============================
Sprite_DestinationPointer.prototype.updateDisabled = function() {
	if (this.opacity > 0) {
	    this.opacity -= 15;
	    this.updateAnimation();
    } else { 
        this.updateClear();
	};
};

//==============================
// * update Clear
//==============================
Sprite_DestinationPointer.prototype.updateClear = function() {
	this.x = $gamePlayer.screenX();
	this.y = $gamePlayer.screenY();
	this._frameCount = 0;
	this.visible = false;
	this._floatAniI = 0;
	this._floatAniY = 0;
};

//==============================
// * update Base
//==============================
Sprite_DestinationPointer.prototype.updateBase = function() {
    if ($gameTemp.isDestinationValid()){
		this.opacity = 255;
        this.updateSprites();
    } else {
        this.updateDisabled();
    };
};

//==============================
// * Update
//==============================
Sprite_DestinationPointer.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (this._data[0] < 0) {
		if (this._bitmapImg1.isReady()) {this.getData()};
	} else {
		this.updateBase();
	};
};