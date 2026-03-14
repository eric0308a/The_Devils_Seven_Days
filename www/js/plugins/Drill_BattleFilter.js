//=============================================================================
// Drill_BattleFilter.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        战斗 - 滤镜效果
 * @author Drill_up
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_BattleFilter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以给通过插件指令给整个战斗设置滤镜。
 * 想要更多了解滤镜，可以去看看"滤镜效果大家族.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，且不依赖于任何插件。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于战斗 图片层 以下的所有层。
 * 2.纯色滤镜、着色滤镜、模糊滤镜、噪点滤镜 相互独立，且效果可以相互叠加。
 *   添加滤镜的先后顺序不同，能产生不同的叠加效果。
 *   要关闭滤镜，设置0即可。
 * 3.由于滤镜作用于 所有贴图 的特殊性。
 *    - 战斗滤镜只能瞬间切换。
 *    - 没有 波动滤镜 。
 *    - 着色滤镜的程度只有0和255，中间过渡的1-254默认视为255。
 * 4.你可以让画面闪一下来达到中间过渡的效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令设置滤镜：
 * （注意，冒号左右两边有空格）
 *
 * 插件指令：>战斗滤镜 : 纯色滤镜 : 纯黑 : 155
 * 插件指令：>战斗滤镜 : 纯色滤镜 : 纯蓝 : 155
 * 插件指令：>战斗滤镜 : 纯色滤镜 : 纯绿 : 155
 * 插件指令：>战斗滤镜 : 纯色滤镜 : 纯红 : 155
 * 插件指令：>战斗滤镜 : 纯色滤镜 : 黄色 : 155
 * 插件指令：>战斗滤镜 : 纯色滤镜 : 紫色 : 155
 * 插件指令：>战斗滤镜 : 纯色滤镜 : 青色 : 155
 *                     
 * 插件指令：>战斗滤镜 : 着色滤镜 : 黑白 : 255
 * 插件指令：>战斗滤镜 : 着色滤镜 : 反色 : 255
 * 插件指令：>战斗滤镜 : 着色滤镜 : 鲜艳 : 255
 * 插件指令：>战斗滤镜 : 着色滤镜 : 漂白 : 255
 * 插件指令：>战斗滤镜 : 着色滤镜 : 饱和度降低 : 255
 * 插件指令：>战斗滤镜 : 着色滤镜 : 古墨水画色 : 255
 * 插件指令：>战斗滤镜 : 着色滤镜 : 古铜色 : 255
 * 插件指令：>战斗滤镜 : 着色滤镜 : 宝丽来相机色 : 255
 * 插件指令：>战斗滤镜 : 着色滤镜 : 红绿蓝翻转 : 255
 * 插件指令：>战斗滤镜 : 着色滤镜 : 夜色 : 255
 * 插件指令：>战斗滤镜 : 着色滤镜 : 致幻色 : 255
 * 
 * 插件指令：>战斗滤镜 : 填充滤镜 : 纯黑 : 255 : 60
 * 插件指令：>战斗滤镜 : 填充滤镜 : 纯蓝 : 255 : 60
 * 插件指令：>战斗滤镜 : 填充滤镜 : 纯绿 : 255 : 60
 * 插件指令：>战斗滤镜 : 填充滤镜 : 纯红 : 255 : 60
 * 插件指令：>战斗滤镜 : 填充滤镜 : 黄色 : 255 : 60
 * 插件指令：>战斗滤镜 : 填充滤镜 : 紫色 : 255 : 60
 * 插件指令：>战斗滤镜 : 填充滤镜 : 青色 : 255 : 60
 * 插件指令：>战斗滤镜 : 填充滤镜 : 纯白 : 255 : 60
 * 插件指令：>战斗滤镜 : 填充滤镜 : #dd99ff : 255 : 60
 *                     
 * 插件指令：>战斗滤镜 : 模糊滤镜 : 255
 * 插件指令：>战斗滤镜 : 噪点滤镜 : 155
 * 
 * 1.滤镜后面的两个参数表示：目标程度，变化时长。
 * 2.目标程度范围为1-255。
 *   255的程度最强烈。0表示关闭滤镜。
 *   比如，纯蓝滤镜的255表示敌人图像完全过滤为蓝色。
 * 3.着色滤镜的程度这里只有0和255，中间过渡默认视为255。
 * 4.填充滤镜的"#dd99ff"为自定义颜色代码，你可以填入自定义颜色。
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
 * 时间复杂度： o(n)*o(贴图处理)*o(滤镜) 每帧
 * 测试方法：   在不同数量敌人下打开滤镜，检测性能。
 * 测试结果：   不打开地图滤镜时，消耗为：【5ms以下】
 *              8个敌人的战斗中，平均消耗为：【122.41ms】
 *              4个敌人的战斗中，平均消耗为：【108.36ms】
 *              2个敌人的战斗中，平均消耗为：【79.40ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的【50ms】范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.滤镜是性能消耗大户，因为带滤镜的图片效果都是通过即时演算形成的。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 3.由于战斗滤镜作用于所有图片，并且还可以与其它滤镜效果叠加。
 *   该插件的性能测试结果极不稳定。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了填充滤镜功能。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BFi（Battle_Filter）
//		临时全局变量	无
//		临时局部变量	this._drill_BFi_s
//		存储数据变量	$gameSystem._drill_BFi.xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n)*o(贴图处理)*o(滤镜) 每帧
//		性能测试因素	开滤镜的战斗
//		性能测试消耗	update 393.24（本体） 272.41（开滤镜）
//		最坏情况		开启滤镜就是最坏情况。
//		备注			不开滤镜比开滤镜还省时间……我明显能看到开滤镜时掉了3帧，
//						然而性能测试居然那么不准。
//
//		
//插件记录：
//		★大体框架与功能如下：
//			战斗滤镜效果：
//				->纯色滤镜
//				->着色滤镜（特殊）
//				->填充滤镜
//				->模糊滤镜
//				->噪点滤镜
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.原理见 Drill_LayerFilter 。
//			2.完全没有修改。只替换了下面字符：
//				LFi				->	BFi
//				地图滤镜		->	战斗滤镜
//				Spriteset_Map	->	Spriteset_Battle
//				
//		★存在的问题：
//			暂无
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleFilter = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BattleFilter');

	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_BFi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BFi_pluginCommand.call(this, command, args);
	if (command === '>战斗滤镜') { // >战斗滤镜 : 纯色滤镜 : 纯蓝 : 155
		if(args.length == 4 || args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( args[5]!=undefined ){ var temp2 = Number(args[5]); }
			
			if( type == "纯色滤镜" ){
				if( temp2 == 0 ){
					$gameSystem._drill_BFi.pureBoard.type_tar = "";
				}else{
					$gameSystem._drill_BFi.pureBoard.type_tar = temp1;
				}
				$gameSystem._drill_BFi.pureBoard.o_tar = temp2;
			}
			if( type == "填充滤镜" ){
				if( temp2 == 0 ){
					$gameSystem._drill_BFi.fillBoard.type_tar = "";
				}else{
					$gameSystem._drill_BFi.fillBoard.type_tar = temp1;
				}
				$gameSystem._drill_BFi.fillBoard.o_tar = temp2;
			}
			if( type == "着色滤镜" ){
				if( temp2 == 0 ){
					$gameSystem._drill_BFi.colorFilter.type_tar = "";
				}else{
					$gameSystem._drill_BFi.colorFilter.type_tar = temp1;
				}
				$gameSystem._drill_BFi.colorFilter.o_tar = temp2;
			}
			if( type == "模糊滤镜" ){
				$gameSystem._drill_BFi.blurFilter.o_tar = Number(temp1);
			}
			if( type == "噪点滤镜" ){
				$gameSystem._drill_BFi.noiseFilter.o_tar = Number(temp1);
			}
		}
	}
};

//=============================================================================
// ** 存储数据初始化
//=============================================================================
var _drill_BFi_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BFi_system_initialize.call(this);
	this._drill_BFi = {};
	this._drill_BFi.pureBoard = {} ;
	this._drill_BFi.pureBoard.type_cur = "" ;
	this._drill_BFi.pureBoard.type_tar = "" ;
	this._drill_BFi.pureBoard.o_cur = 0 ;
	this._drill_BFi.pureBoard.o_tar = 0 ;
	this._drill_BFi.fillBoard = {} ;
	this._drill_BFi.fillBoard.type_cur = "" ;
	this._drill_BFi.fillBoard.type_tar = "" ;
	this._drill_BFi.fillBoard.o_cur = 0 ;
	this._drill_BFi.fillBoard.o_tar = 0 ;
	this._drill_BFi.colorFilter = {} ;
	this._drill_BFi.colorFilter.type_cur = "" ;
	this._drill_BFi.colorFilter.type_tar = "" ;
	this._drill_BFi.colorFilter.o_cur = 0 ;
	this._drill_BFi.colorFilter.o_tar = 0 ;
	this._drill_BFi.blurFilter = {} ;
	this._drill_BFi.blurFilter.o_cur = 0 ;
	this._drill_BFi.blurFilter.o_tar = 0 ;
	this._drill_BFi.noiseFilter = {} ;
	this._drill_BFi.noiseFilter.o_cur = 0 ;
	this._drill_BFi.noiseFilter.o_tar = 0 ;
};	


//=============================================================================
// ** 地图 贴图
//=============================================================================
//==============================
// ** 初始化
//==============================
var _drill_BFi_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
	_drill_BFi_initialize.call(this);
	
	this._drill_BFi_s = {}
	this._drill_BFi_s.colorFilter = null;
	this._drill_BFi_s.blurFilter = null;
	this._drill_BFi_s.noiseFilter = null;
	
	$gameSystem._drill_BFi.pureBoard.type_cur = "" ;
	$gameSystem._drill_BFi.pureBoard.o_cur = 0 ;
	$gameSystem._drill_BFi.fillBoard.type_cur = "" ;
	$gameSystem._drill_BFi.fillBoard.o_cur = 0 ;
	$gameSystem._drill_BFi.colorFilter.type_cur = "" ;
	$gameSystem._drill_BFi.colorFilter.o_cur = 0 ;
	$gameSystem._drill_BFi.blurFilter.o_cur = 0 ;
	$gameSystem._drill_BFi.noiseFilter.o_cur = 0 ;
}

//==============================
// ** 图片层 的后面
//==============================
var _drill_BFi_layer_createUpperLayer = Spriteset_Battle.prototype.createUpperLayer;
Spriteset_Battle.prototype.createUpperLayer = function() {
	if( !this._drill_BFi_pureBoard ){
		this._drill_BFi_pureBoard = new Sprite();
		this.addChild(this._drill_BFi_pureBoard);	
	}
	if( !this._drill_BFi_fillBoard ){
		this._drill_BFi_fillBoard = new Sprite();
		this.addChild(this._drill_BFi_fillBoard);	
	}
	_drill_BFi_layer_createUpperLayer.call(this);	//rmmv鼠标目的地 < 上层 < rmmv天气
}

//==============================
// ** 帧刷新
//==============================
var _drill_BFi_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
	_drill_BFi_update.call(this);
	
	if(this._drill_BFi_s){
		this.drill_BFi_updatePureBoard();
		this.drill_BFi_updateFillBoard();
		this.drill_BFi_updateColorFilter();
		this.drill_BFi_updateBlurFilter();
		this.drill_BFi_updateNoiseFilter();
	}
}
//==============================
// ** 帧刷新 - 纯色滤镜
//==============================
Spriteset_Battle.prototype.drill_BFi_updatePureBoard = function() {
	var _BFi = $gameSystem._drill_BFi;
	if( _BFi.pureBoard.type_cur != _BFi.pureBoard.type_tar ){
		_BFi.pureBoard.type_cur = _BFi.pureBoard.type_tar;
		
		var bitmap = new Bitmap(Graphics.boxWidth,Graphics.boxHeight);
		var temp_color = "";
		if( _BFi.pureBoard.type_cur == "纯黑" ){ temp_color = "#000000" }
		if( _BFi.pureBoard.type_cur == "纯红" ){ temp_color = "#ff0000" }
		if( _BFi.pureBoard.type_cur == "纯蓝" ){ temp_color = "#0000ff" }
		if( _BFi.pureBoard.type_cur == "纯绿" ){ temp_color = "#00ff00" }
		if( _BFi.pureBoard.type_cur == "黄色" ){ temp_color = "#ffff00" }
		if( _BFi.pureBoard.type_cur == "紫色" ){ temp_color = "#ff00ff" }
		if( _BFi.pureBoard.type_cur == "青色" ){ temp_color = "#00ffff" }
		if( temp_color != "" ){
			bitmap.fillRect(0, 0, Graphics.boxWidth,Graphics.boxHeight, temp_color );
		}
		this._drill_BFi_pureBoard.bitmap = bitmap;
		this._drill_BFi_pureBoard.blendMode = 2;
	}
	if( _BFi.pureBoard.o_cur != _BFi.pureBoard.o_tar ){
		_BFi.pureBoard.o_cur = _BFi.pureBoard.o_tar;
		
		this._drill_BFi_pureBoard.opacity = _BFi.pureBoard.o_cur;
	}
}
//==============================
// ** 帧刷新 - 填充滤镜
//==============================
Spriteset_Battle.prototype.drill_BFi_updateFillBoard = function() {
	var _BFi = $gameSystem._drill_BFi;
	if( _BFi.fillBoard.type_cur != _BFi.fillBoard.type_tar ){
		_BFi.fillBoard.type_cur = _BFi.fillBoard.type_tar;
		
		var bitmap = new Bitmap(Graphics.boxWidth,Graphics.boxHeight);
		var temp_color = "";
		if( _BFi.fillBoard.type_cur == "纯黑" ){ temp_color = "#000000" }
		if( _BFi.fillBoard.type_cur == "纯红" ){ temp_color = "#ff0000" }
		if( _BFi.fillBoard.type_cur == "纯蓝" ){ temp_color = "#0000ff" }
		if( _BFi.fillBoard.type_cur == "纯绿" ){ temp_color = "#00ff00" }
		if( _BFi.fillBoard.type_cur == "黄色" ){ temp_color = "#ffff00" }
		if( _BFi.fillBoard.type_cur == "紫色" ){ temp_color = "#ff00ff" }
		if( _BFi.fillBoard.type_cur == "青色" ){ temp_color = "#00ffff" }
		if( _BFi.fillBoard.type_cur == "纯白" ){ temp_color = "#ffffff" }
		if( (/^#/g).test( _BFi.fillBoard.type_cur ) ){ temp_color = _BFi.fillBoard.type_cur }
		if( temp_color != "" ){
			bitmap.fillRect(0, 0, Graphics.boxWidth,Graphics.boxHeight, temp_color );
		}
		this._drill_BFi_fillBoard.bitmap = bitmap;
		this._drill_BFi_fillBoard.blendMode = 0;
	}
	if( _BFi.fillBoard.o_cur != _BFi.fillBoard.o_tar ){
		_BFi.fillBoard.o_cur = _BFi.fillBoard.o_tar;
		
		this._drill_BFi_fillBoard.opacity = _BFi.fillBoard.o_cur;
	}
}
//==============================
// ** 帧刷新 - 着色滤镜
//==============================
Spriteset_Battle.prototype.drill_BFi_updateColorFilter = function() {
	var _BFi = $gameSystem._drill_BFi;
	if( _BFi.colorFilter.type_cur != _BFi.colorFilter.type_tar ){
		_BFi.colorFilter.type_cur = _BFi.colorFilter.type_tar;
		_BFi.colorFilter.o_cur = _BFi.colorFilter.o_tar;
		
		if( this.filters == null){
			var f_intermediary = [];
		}else{
			var f_intermediary = this.filters;
		}
		
		if(this._drill_BFi_s.colorFilter != null){	//去除滤镜
			var index = f_intermediary.indexOf(this._drill_BFi_s.colorFilter); 
			if (index != -1) { 
				f_intermediary.splice(index, 1); 
			}
			this._drill_BFi_s.colorFilter = null;
		}
		
		if( _BFi.colorFilter.o_cur != 0 ){	//重新加滤镜
			this._drill_BFi_s.colorFilter = new PIXI.filters.ColorMatrixFilter();
			//this._drill_BFi_s.colorFilter.reset();
			if( _BFi.colorFilter.type_cur == "黑白"){ this._drill_BFi_s.colorFilter.blackAndWhite(true); }
			if( _BFi.colorFilter.type_cur == "反色"){ this._drill_BFi_s.colorFilter.negative(true); }
			if( _BFi.colorFilter.type_cur == "古墨水画色"){ this._drill_BFi_s.colorFilter.sepia(true); }
			if( _BFi.colorFilter.type_cur == "鲜艳"){ this._drill_BFi_s.colorFilter.technicolor(true); }
			if( _BFi.colorFilter.type_cur == "宝丽来相机色"){ this._drill_BFi_s.colorFilter.polaroid(true); }
			if( _BFi.colorFilter.type_cur == "红绿蓝翻转"){ this._drill_BFi_s.colorFilter.toBGR(true); }
			if( _BFi.colorFilter.type_cur == "古铜色"){ this._drill_BFi_s.colorFilter.browni(true); }
			if( _BFi.colorFilter.type_cur == "致幻色"){ this._drill_BFi_s.colorFilter.lsd(true); }
			if( _BFi.colorFilter.type_cur == "漂白"){ this._drill_BFi_s.colorFilter.brightness(2,false); }
			if( _BFi.colorFilter.type_cur == "饱和度降低"){ this._drill_BFi_s.colorFilter.greyscale(4,false); }
			if( _BFi.colorFilter.type_cur == "夜色"){ this._drill_BFi_s.colorFilter.night(0.3,false); }
			
			f_intermediary.push(this._drill_BFi_s.colorFilter);
		}
		this.filters = f_intermediary;
	}
}
//==============================
// ** 帧刷新 - 模糊滤镜
//==============================
Spriteset_Battle.prototype.drill_BFi_updateBlurFilter = function() {
	var _BFi = $gameSystem._drill_BFi;
	if( _BFi.blurFilter.o_cur != _BFi.blurFilter.o_tar ){
		_BFi.blurFilter.o_cur = _BFi.blurFilter.o_tar;
		
		if( this.filters == null){
			var f_intermediary = [];
		}else{
			var f_intermediary = this.filters;
		}
		
		if(this._drill_BFi_s.blurFilter != null){	//去除滤镜
			var index = f_intermediary.indexOf(this._drill_BFi_s.blurFilter); 
			if (index != -1) { 
				f_intermediary.splice(index, 1); 
			}
			this._drill_BFi_s.blurFilter = null;
		}
		
		if( _BFi.blurFilter.o_cur != 0 ){	//重新加滤镜
			this._drill_BFi_s.blurFilter = new PIXI.filters.BlurFilter();
			this._drill_BFi_s.blurFilter.blur = _BFi.blurFilter.o_cur / 255 * 8;
			
			f_intermediary.push(this._drill_BFi_s.blurFilter);
		}
		this.filters = f_intermediary;
	}
}
//==============================
// ** 帧刷新 - 噪点滤镜
//==============================
Spriteset_Battle.prototype.drill_BFi_updateNoiseFilter = function() {
	var _BFi = $gameSystem._drill_BFi;
	if( _BFi.noiseFilter.o_cur != _BFi.noiseFilter.o_tar ){
		_BFi.noiseFilter.o_cur = _BFi.noiseFilter.o_tar;
		
		if( this.filters == null){
			var f_intermediary = [];
		}else{
			var f_intermediary = this.filters;
		}
		
		if(this._drill_BFi_s.noiseFilter != null){	//去除滤镜
			var index = f_intermediary.indexOf(this._drill_BFi_s.noiseFilter); 
			if (index != -1) { 
				f_intermediary.splice(index, 1); 
			}
			this._drill_BFi_s.noiseFilter = null;
		}
		
		if( _BFi.noiseFilter.o_cur != 0 ){	//重新加滤镜
			this._drill_BFi_s.noiseFilter = new PIXI.filters.NoiseFilter();
			this._drill_BFi_s.noiseFilter.noise = _BFi.noiseFilter.o_cur / 255 * 4;
			
			f_intermediary.push(this._drill_BFi_s.noiseFilter);
		}
		this.filters = f_intermediary;
	}
	
	if( this._drill_BFi_s.noiseFilter ){	//随机噪点
		this._drill_BFi_s.noiseFilter.seed = Math.random();
	}
}

	

