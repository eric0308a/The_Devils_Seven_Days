//=============================================================================
// Drill_MiniPlateForEvent.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        鼠标 - 事件说明窗口
 * @author Drill_up
 *
 * @param ---窗口---
 * @default 
 *
 * @param 布局模式
 * @parent ---窗口---
 * @type select
 * @option 默认窗口布局
 * @value 默认窗口布局
 * @option 黑底布局
 * @value 黑底布局
 * @option 系统窗口布局
 * @value 系统窗口布局
 * @option 图片窗口布局
 * @value 图片窗口布局
 * @desc 窗口背景布局的模式。
 * @default 黑底布局
 *
 * @param 布局透明度
 * @parent 布局模式
 * @type number
 * @min 0
 * @max 255
 * @desc 布局的透明度，0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 资源-系统窗口布局
 * @parent 布局模式
 * @desc 配置该资源，可以使得该窗口有与默认不同的系统窗口。
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 资源-图片窗口布局
 * @parent 布局模式
 * @desc 背景图片布局的资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 平移-图片窗口布局 X
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-图片窗口布局 Y
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 是否锁定窗口位置
 * @parent ---窗口---
 * @type boolean
 * @on 锁定
 * @off 关闭
 * @desc true - 锁定，false - 关闭，将面板锁定在一个固定的地方，而不是跟随鼠标位置走。
 * @default false
 *
 * @param 平移-锁定位置 X
 * @parent 是否锁定窗口位置
 * @desc 将面板锁定在一个固定的地方，而不是跟随鼠标位置走。x轴方向平移，单位像素，0为贴在最左边。
 * @default 0
 *
 * @param 平移-锁定位置 Y
 * @parent 是否锁定窗口位置
 * @desc 将面板锁定在一个固定的地方，而不是跟随鼠标位置走。y轴方向平移，单位像素，0为贴在最上面。
 * @default 0
 *
 * @param 窗口行间距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容之间的行间距。（rmmv默认标准：36）
 * @default 10
 *
 * @param 窗口内边距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容与窗口外框的内边距。（rmmv默认标准：18）
 * @default 10
 *
 * @param 窗口字体大小
 * @parent ---窗口---
 * @type number
 * @min 1
 * @desc 窗口的字体大小。注意图标无法根据字体大小变化。（rmmv默认标准：28）
 * @default 22
 *
 * @param 窗口附加宽度
 * @parent ---窗口---
 * @desc 在当前自适应的基础上，再额外增加的宽度。可为负数。
 * @default 0
 *
 * @param 窗口附加高度
 * @parent ---窗口---
 * @desc 在当前自适应的基础上，再额外增加的高度。可为负数。
 * @default 0
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_MiniPlateForEvent +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得鼠标靠近事件时，可以显示窗口说明。
 * 关于窗口的配置介绍，去看看"窗口与布局.docx"。
 * ★★必须放在所有"基于"的插件后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用，必须拥有下面插件作为基础，才能运行：
 * 基于：
 *   - Drill_CoreOfInput 系统 - 输入设备核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件的行走图。
 *   单独对鼠标有效。另支持触屏按住。
 * 2.由于该窗口的大小是变化的，所以布局可以设定四种。
 *   如果是触屏情况，可能需要将窗口锁定在一个固定位置，方便查看信息。
 * 3.一个事件只能对应一个鼠标触发窗口方式，设置多个没有效果。
 * 4.如果说明中没有任何字符，将不显示这个状态的说明内容。
 * 5.写了一个"=>事件说明窗口"后，后面可以跟非常多的"=:"内容。
 * 6.你可以附加一定的宽度高度来适应被遮住的文字，但是不要加太多。
 * 7.如果你想改变事件的内容信息，通过第二页的事件注释即可。
 *   另外，你需要确保第一页和第二页的行走图不是同一张。
 *   因为面板接触显示的触发范围与行走图大小相关，大行走图的鼠标接触范围也大。
 *   同一张行走图情况下，考虑到优化，鼠标范围默认不刷新。所以需要换图来触发刷新。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/system
 * 先确保项目img文件夹下是否有system文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-系统窗口布局
 * 资源-图片窗口布局
 *
 * 系统窗口与rmmv默认的window.png图片一样，可设置为不同的皮肤。
 * 图片布局不能根据窗口内容自适应，你需要合理控制的设置的说明文字。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令手动控制类型情况：
 * （第一个冒号两边都有一个空格，=:后面的文字表示一行的内容。）
 * 
 * 事件注释：=>事件说明窗口 : 鼠标接近 : 显示下列说明
 *           =:第一行内容
 *           =:第二行内容
 * 事件注释：=>事件说明窗口 : 鼠标左键按下[持续] : 显示下列说明
 * 事件注释：=>事件说明窗口 : 鼠标滚轮按下[持续] : 显示下列说明
 * 事件注释：=>事件说明窗口 : 鼠标右键按下[持续] : 显示下列说明
 * 事件注释：=>事件说明窗口 : 触屏按下[持续] : 显示下列说明
 *
 * 注意，一条注释最多能填入六行，如果你要设置更多内容，多加几个注释即可。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令，临时显示/隐藏窗口设置。
 * （注意，冒号后面有两个空格。）
 *
 * 插件指令：>事件说明窗口 : 本事件 : 隐藏说明
 * 插件指令：>事件说明窗口 : 本事件 : 显示说明
 * 插件指令：>事件说明窗口 : 2 : 隐藏说明
 * 插件指令：>事件说明窗口 : 3 : 显示说明
 *
 * 数字对应的事件的id。
 * 隐藏是暂时性的，切换了地图或者改变了事件的图像，就会失效。
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
 * 时间复杂度： o(n^2) + o(图像处理) 每帧
 * 测试方法：   指定地图中放置10个带有说明窗口的事件，测试触发情况。
 * 测试结果：   200个事件的地图中，平均消耗为：【32.18ms】
 *              100个事件的地图中，平均消耗为：【30.09ms】
 *               50个事件的地图中，平均消耗为：【22.95ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.目前并没有设置大量含说明窗口的事件进行测试。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了附加宽度附加高度设置。
 * [v1.2]
 * 优化了窗口层级的位置。
 * [v1.3]
 * 分离了核心，优化了插件性能。添加了锁定功能。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		MPFE (Mini_Plate_For_Event)
//		临时全局变量	DrillUp.g_MPFE_xxx
//		临时局部变量	this._drill_MPFE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2) + o(图像处理) 每帧
//		性能测试因素	鼠标乱晃
//		性能测试消耗	30.09ms
//		最坏情况		当前视角，存在大批说明窗口的事件，并且玩家的鼠标乱晃。
//						（该插件目前没有对最坏情况进行实测。）
//
//插件记录：
//		★大体框架与功能如下：
//			事件说明窗口：
//				->显示隐藏
//				->鼠标事件
//				->多行内容
//				->内容转义
//				->窗口皮肤
//		
//		★必要注意事项：
//			1.插件的面板画在ui层。
//
//		★其它说明细节：
//			1.该插件原理为 鼠标触发事件 和 状态和buff说明窗口 的组合效果。
//			  实际上结合后，改动非常大，结构已经截然不同了。
//			2.地图界面最容易造成卡顿问题，稍不注意，计算量就暴涨，一定要加约束。
//			  （窗口的宽高不要轻易修改，每次修改都会重画）
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MiniPlateForEvent = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MiniPlateForEvent');
	
	DrillUp.g_MPFE_layout_type = String(DrillUp.parameters['布局模式'] || "黑底布局");
	DrillUp.g_MPFE_opacity = Number(DrillUp.parameters['布局透明度'] || 255);
	DrillUp.g_MPFE_layout_window = String(DrillUp.parameters['资源-系统窗口布局'] );
	DrillUp.g_MPFE_layout_pic = String(DrillUp.parameters['资源-图片窗口布局'] );
	DrillUp.g_MPFE_layout_pic_x = Number(DrillUp.parameters['平移-图片窗口布局 X'] );
	DrillUp.g_MPFE_layout_pic_y = Number(DrillUp.parameters['平移-图片窗口布局 Y'] );
	DrillUp.g_MPFE_lock_enable = String(DrillUp.parameters['是否锁定窗口位置'] || "false") === "true";
	DrillUp.g_MPFE_lock_x = Number(DrillUp.parameters['平移-锁定位置 X'] || 0);
	DrillUp.g_MPFE_lock_y = Number(DrillUp.parameters['平移-锁定位置 Y'] || 0);
	DrillUp.g_MPFE_lineheight = Number(DrillUp.parameters['窗口行间距'] || 10);
	DrillUp.g_MPFE_padding = Number(DrillUp.parameters['窗口内边距'] || 18);
	DrillUp.g_MPFE_fontsize = Number(DrillUp.parameters['窗口字体大小'] || 22);
	DrillUp.g_MPFE_ex_width = Number(DrillUp.parameters['窗口附加宽度'] || 0);
	DrillUp.g_MPFE_ex_height = Number(DrillUp.parameters['窗口附加高度'] || 0);
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput ){
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_MPFE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MPFE_pluginCommand.call(this, command, args);
	if (command === '>事件说明窗口') { // >事件说明窗口 : A : 隐藏说明
		if(args.length == 4){
			var temp1 = String(args[1]) ;
			var type = String(args[3]);
			if( type == '隐藏说明' ){ 
				var e_id = 0;
				if( temp1 == "本事件" ){ 
					e_id = this._eventId;
				}else{
					e_id = Number(temp1);
				}
				$gameMap.drill_MPFE_setDataVisible( e_id , false );
			}
			if( type == '显示说明' ){
				var e_id = 0;
				if( temp1 == "本事件" ){ 
					e_id = this._eventId;
				}else{
					e_id = Number(temp1);
				}
				$gameMap.drill_MPFE_setDataVisible( e_id , true );
			}
		}
	}
};

//=============================================================================
// ** 事件初始化
//=============================================================================
//==============================
// * 贴图初始化
//==============================
var _drill_MPFE_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character) {		//图像改变，范围就改变
	_drill_MPFE_setCharacter.call(this,character);
    this.drill_MPFE_setupTrigger();
};
Sprite_Character.prototype.drill_MPFE_setupTrigger = function() {

	if( this._character && this._character.constructor.name === "Game_Event" ){
		var page = this._character.page();
		if ( page ) {
			var list_ = this._character.list();
			var context_ = [];
			var start_count = false;	//rmmv每行都存储在不同位置。
			var type = "";
			for(var i=0; i<list_.length; i++){
				var l = list_[i];
				if (l.code === 108 || l.code === 408) {
					var row = l.parameters[0];
					var args = l.parameters[0].split(' ');
					var command = args.shift();
					if (command == "=>事件说明窗口"){	//=>事件说明窗口 : 鼠标滚轮按下[持续] : 显示下列说明 =:xxxx =:xxx
						if(args.length >= 2){
							if(args[1]){ type = String(args[1]); }
							if(args[3]){ var temp1 = String(args[3]); }
							if( temp1 == "显示下列说明" ){
								start_count = true;
								continue;
							}
						}
					};
					if( start_count == true ){
						if(row.contains("=:")){
							context_.push(row.replace("=:",""));
						}else{
							start_count = false;
						}
					}
				};
			};
			if(context_.length != 0){		//添加多条内容
				var obj = {};
				obj._event_id = this._character._eventId;	//只能存数据，不能存对象指针
				obj._type = type;
				obj._context = context_;
				obj._enable = true;
				$gameMap.drill_MPFE_pushData(obj);
			}
		}
	}
};
//==============================
// * Game_Map初始化
//==============================
var _drill_MPFE_gmap_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {	
	_drill_MPFE_gmap_initialize.call(this);
	this._drill_MPFE_data = [];
};

//==============================
// * Game_Map刷地图
//==============================
var _drill_MPFE_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_MPFE_gmap_setup.call(this,mapId);
	this._drill_MPFE_data = [];
}
//==============================
// * Game_Map加入条件
//==============================
Game_Map.prototype.drill_MPFE_pushData = function(obj) {	
	var can_push = true;
	
	for(var i=0; i<this._drill_MPFE_data.length; i++){	//重复的不插入
		var temp_obj = this._drill_MPFE_data[i];
		if( temp_obj._event_id == obj._event_id &&
			temp_obj._type == obj._type ){
				
			can_push  = false;
		}
	}
	if( can_push ){
		this._drill_MPFE_data.push(obj);
	}
};
//==============================
// * Game_Map去除条件
//==============================
Game_Map.prototype.drill_MPFE_setDataVisible = function(event_id,v) {	
	
	for(var i = this._drill_MPFE_data.length-1; i >= 0; i--){
		var temp_obj = this._drill_MPFE_data[i];
		if( temp_obj._event_id == event_id ){
			temp_obj._enable = v;
		}
	}
}
//==============================
// * 创建面板（ui层）
//==============================
var _drill_MPFE_Scene_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function() {
	_drill_MPFE_Scene_createSpriteset.call(this);
	if (!this._drill_map_ui_board) {
		this._drill_map_ui_board = new Sprite();
		this.addChild(this._drill_map_ui_board);
	};
	if( !this._drill_mini_event_plate ){		//只建立一个窗口
		this._drill_mini_event_plate = new Drill_MiniPlateForEvent_Window();
		this._drill_mini_event_plate.zIndex = 1;
		this._drill_map_ui_board.addChild(this._drill_mini_event_plate);
	}
};

//=============================================================================
// ** 地图触发
//=============================================================================
//==============================
// * Scene_Map初始化
//==============================
//var _drill_MPFE_smap_initialize = Scene_Map.prototype.initialize
//Scene_Map.prototype.initialize = function() {	
//	_drill_MPFE_smap_initialize.call(this);
//	this._drill_MPFE_updating = false;
//}
//==============================
// * Scene_Map帧刷新（直接update函数不稳定，可能刷新很多次，用updateScene）
//==============================
var _drill_MPFE_smap_update = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {	
	_drill_MPFE_smap_update.call(this);
	
	var char_sprites = this._spriteset._characterSprites;	//从地图贴图找起 >> 找到含event的Sprite_Character >> 刷新事件的注释
	for(var i=0; i< char_sprites.length; i++){
		var temp_sprite = char_sprites[i];
		var temp_character = temp_sprite._character;
		if( temp_character && temp_character.constructor.name === "Game_Event" ){
			
			for( var j = 0; j< $gameMap._drill_MPFE_data.length; j++ ){
				var temp_obj = $gameMap._drill_MPFE_data[j];
				if( temp_character._eventId == temp_obj._event_id ){
					
					//刷新事件注释不需要找父类，因为这个函数就在Scene_Map中
					var cw = temp_sprite.patternWidth() ;
					var ch = temp_sprite.patternHeight() ;
					var check = {
						'x': temp_sprite.x - cw*temp_sprite.anchor.x,
						'y': temp_sprite.y - ch*temp_sprite.anchor.y,
						'w': cw,
						'h': ch,
						't': temp_obj._context,	
						'id': temp_character._eventId,
						'type': temp_obj._type,
						'enable': temp_obj._enable
					}
					
					this._drill_mini_event_plate.pushChecks(check);
							
				}
			}
		}
	}
};
	
//=============================================================================
// * Drill_MiniPlateForEvent_Window 说明面板（整个场景只有一个该窗口）
//		（该面板 与 Drill_MiniPlateForState_Window 结构一模一样）
//=============================================================================
function Drill_MiniPlateForEvent_Window() {
    this.initialize.apply(this, arguments);
};

Drill_MiniPlateForEvent_Window.prototype = Object.create(Window_Base.prototype);
Drill_MiniPlateForEvent_Window.prototype.constructor = Drill_MiniPlateForEvent_Window;

//==============================
// * 初始化-框架
//==============================
Drill_MiniPlateForEvent_Window.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	
	this._drill_layout_type = DrillUp.g_MPFE_layout_type;
	this._drill_opacity = DrillUp.g_MPFE_opacity;
	this._drill_win_skin = ImageManager.loadSystem(DrillUp.g_MPFE_layout_window);
	this._drill_pic = ImageManager.loadSystem(DrillUp.g_MPFE_layout_pic);
	this._drill_pic_x = DrillUp.g_MPFE_layout_pic_x;
	this._drill_pic_y = DrillUp.g_MPFE_layout_pic_y;
	
	this._drill_width = 0;
	this._drill_height = 0;
	this._drill_visible = false;
	this._drill_check_tank = [];
	
	this._cur_event_id = 0;
	
	this._windowBackSprite.zIndex = 2;
	this._windowFrameSprite.zIndex = 3;
	
	this.drill_createBackground();
	this.drill_createText();
	this.drill_sortBottomByZIndex();
};
Drill_MiniPlateForEvent_Window.prototype.standardFontSize = function() {
    return DrillUp.g_MPFE_fontsize;
};
Drill_MiniPlateForEvent_Window.prototype.standardPadding = function() {
    return DrillUp.g_MPFE_padding;
};

//==============================
// * 初始化-背景
//==============================
Drill_MiniPlateForEvent_Window.prototype.drill_createBackground = function() {
	
	this._drill_background = new Sprite();
	this._drill_background.zIndex = 1;
	this._drill_background.opacity = this._drill_opacity;
	this._windowBackSprite.opacity = 0;
	this._windowFrameSprite.opacity = 0;
	if( this._drill_layout_type == "图片窗口布局" ){
		this._drill_background.bitmap = this._drill_pic;
		this._drill_background.x = this._drill_pic_x;
		this._drill_background.y = this._drill_pic_y;
	}else if( this._drill_layout_type == "系统窗口布局" ){
		this.windowskin = this._drill_win_skin;
		this._windowBackSprite.opacity = this._drill_opacity;
		this._windowFrameSprite.opacity = this._drill_opacity;
	}else if( this._drill_layout_type == "默认窗口布局" ){
		this.opacity = this._drill_opacity;
		this._windowBackSprite.opacity = this._drill_opacity;
		this._windowFrameSprite.opacity = this._drill_opacity;
	}
	
	this._windowSpriteContainer.addChild(this._drill_background);
	//_windowSpriteContainer为窗口的最底层贴图
}
//==============================
// ** 底层层级排序
//==============================
Drill_MiniPlateForEvent_Window.prototype.drill_sortBottomByZIndex = function() {
   this._windowSpriteContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};

//==============================
// * 初始化-文本层
//==============================
Drill_MiniPlateForEvent_Window.prototype.drill_createText = function() {
	this.createContents();
    this.contents.clear();
}

//==============================
// * 帧刷新
//==============================
Drill_MiniPlateForEvent_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	this.updateChecks();
	this.updatePosition();
}
//==============================
// * 帧刷新-刷新位置
//==============================
Drill_MiniPlateForEvent_Window.prototype.updatePosition = function() {
	var cal_x = _drill_mouse_x;
	var cal_y = _drill_mouse_y;
	if( cal_x + this._drill_width > Graphics.boxWidth ){	//横向贴边控制
		cal_x = Graphics.boxWidth - this._drill_width;
	}
	if( cal_y + this._drill_height > Graphics.boxHeight ){	//纵向贴边控制
		cal_y = Graphics.boxHeight - this._drill_height;
	}
	if( DrillUp.g_MPFE_lock_enable == true ){		//锁定位置
		cal_x = DrillUp.g_MPFE_lock_x;
		cal_y = DrillUp.g_MPFE_lock_y;
	}
	
	this.x = cal_x;
	this.y = cal_y;
}
//==============================
// * 接口-添加状态图标判断
//==============================
Drill_MiniPlateForEvent_Window.prototype.pushChecks = function(c) {
	if( this._drill_check_tank.length < 1000){	//防止卡顿造成的过度积压
		this._drill_check_tank.push(c);
	}
}
//==============================
// * 帧刷新-判断激活
//==============================
Drill_MiniPlateForEvent_Window.prototype.updateChecks = function() {
	if( !this._drill_check_tank ){ this.visible = false ; return ;}
	
	var is_visible = false;
	var check_obj = null;
	for(var i=0; i<this._drill_check_tank.length; i++){
		var temp_check = this._drill_check_tank[i];
		
		if ( this.checkCondition(temp_check) ) { 
			is_visible = true; 
			check_obj = temp_check; 
			break; 
		}
	}
	
	//这里有三道锁，看起来会比较乱
	//（check.enable显示/隐藏 锁 ，this._drill_visible 接近/离开 锁，this._cur_event_id 落在不同事件上的锁）
	if( check_obj && check_obj.enable == true ){	
		if ( this._drill_visible == true ) {
			if( is_visible == true ){
				//显示中
				if(this._cur_event_id != check_obj.id){
					this._cur_event_id = check_obj.id;
					this.reflashTextMassage(check_obj.t);
				}
				
			}else{
				//显示中断
				this._drill_visible = false;
				this._drill_width = 0;
				this._drill_height = 0;
			}
		}else{
			if( is_visible == true ){
				//激活显示
				//this.reflashTextMassage(check_obj.t);
				//this._cur_event_id = check_obj.id ;
				this._drill_visible = true;
			}else{
				//隐藏中，不操作
			}
		}
	}else{
		this._drill_visible = false;
	}
	
	//（宽高不要轻易修改）
	this.visible = this._drill_visible;
	this._drill_check_tank = [];
}
//==============================
// * 激活-显示条件
//==============================
Drill_MiniPlateForEvent_Window.prototype.checkCondition = function(check) {
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if(check.type == "触屏按下[持续]"){
		var _x = TouchInput.x;
		var _y = TouchInput.y;
	}
	if(_x > check.x + check.w){ return false;}
	if(_x < check.x + 0){ return false;}
	if(_y > check.y + check.h){ return false;}
	if(_y < check.y + 0 ){ return false;}
	if(check.type == "鼠标左键按下[持续]"){
		if( TouchInput.drill_isLeftPressed() ){ return true; }else{ return false; }
	}else if(check.type == "鼠标滚轮按下[持续]"){
		if( TouchInput.drill_isMiddlePressed() ){ return true; }else{ return false; }
	}else if(check.type == "鼠标右键按下[持续]"){
		if( TouchInput.drill_isRightPressed() ){ return true; }else{ return false; }
	}else if(check.type == "触屏按下[持续]"){
		if( TouchInput.isPressed() ){ return true; }else{ return false; }
	}

	return true;
}

//==============================
// * 激活-刷新内容
//==============================
Drill_MiniPlateForEvent_Window.prototype.reflashTextMassage = function(contexts) {
	if(contexts.length == 0){ return }
	
	//1.内容获取
	var tar_width = 0;
	
	//2.长度判定（必须在绘制前）
	for (var i=0; i< contexts.length; i++) {
		var ic = 0;		//icon字符大小
		var temp = contexts[i];	
		var temp_s = temp.concat();
		temp_s = temp_s.replace(/\\C\[\d+\]/gi,'');
		temp_s = temp_s.replace(/\\I\[\d+\]/gi,function(){
			ic+=1;
			return '';
		}.bind(this));
		var temp_w = this.textWidth(temp_s) + ic * (this.standardFontSize() + 8);
		if( temp_w > tar_width ){
			tar_width = temp_w;
		}
	}
	this._drill_width = tar_width;
	this._drill_height = contexts.length * ( this.standardFontSize() + DrillUp.g_MPFE_lineheight);
	this._drill_width += this.standardPadding() * 2;
	this._drill_height += this.standardPadding() * 2;
	this._drill_width += DrillUp.g_MPFE_ex_width;
	this._drill_height += DrillUp.g_MPFE_ex_height;
	if( contexts.length == 0){	
		this._drill_width = 0;
		this._drill_height = 0;
	}
	this.width = this._drill_width;
	this.height = this._drill_height;
	
	//3.绘制内容
	this.createContents();
    this.contents.clear();
	for (var i=0; i< contexts.length; i++) {
		var x = 0;
		var y = 0 + i*( this.standardFontSize() + DrillUp.g_MPFE_lineheight);
		
		var temp = contexts[i];	
		this.drawTextEx(temp,x,y);
	}
	//if(contexts.length >= 1){
	//	alert(contexts);
	//	alert(this._drill_width);
	//	alert(this._drill_height);
	//}
	
	if( this._drill_layout_type == "黑底布局" ){
		this._drill_background_bitmap = new Bitmap(this._drill_width, this._drill_height);
		this._drill_background_bitmap.fillRect(0, 0 , this._drill_width, this._drill_height, "#000000");//背景黑框
		this._drill_background.bitmap = this._drill_background_bitmap;
	}
	
}
	
//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MiniPlateForEvent = false;
		alert(
			"【Drill_MiniPlateForEvent.js 鼠标 - 事件说明窗口】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心"
		);
}


