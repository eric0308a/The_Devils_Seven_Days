//=============================================================================
// Drill_EventAutoTransparent.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        行走图 - 玩家接近自动透明化
 * @author Drill_up
 * 
 *
 * @param 最小透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 玩家接近的事件变透明的最小透明度。
 * @default 125
 *
 * @param 透明度变化速度
 * @type number
 * @min 0
 * @max 255
 * @desc 透明度变透明的速度。
 * @default 10
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventAutoTransparent +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得某些事件在玩家绕到其后面时，自动透明。
 * 可用于遮挡物、屋檐、柱子、乌云、草丛等事件。
 * 更多详细内容，去看看"关于行走图与图块.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对事件有效。
 * 2.注意，开启自动化后，透明度会被绑定，实时变化，
 *   你对于该事件的透明度其他操作会受到干扰。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要在指定事件中，添加自动透明注释：
 * 
 * 事件注释：=>玩家接近自动透明化 : 开启
 * 事件注释：=>玩家接近自动透明化 : 关闭
 * 
 * 1.透明化设置是跨事件页的，如果你需要关闭，需要在其他事件页使用
 *   关闭注释。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你需要在指定事件中，添加自动透明注释：
 * 
 * 事件注释：=>玩家接近自动透明化 : 条件 : 只要接触就透明
 * 事件注释：=>玩家接近自动透明化 : 条件 : 绕到背后透明
 * 
 * 1.默认为"绕到背后透明"。
 * 2.需要注意一点，接近的条件，是根据玩家行走图的方形区域，与事件
 *   行走图的方形区域相交来决定的。
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
 * 时间复杂度： o(n^2)
 * 测试方法：   在体积放置了大量柱子，测试自动透明性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【19.89ms】
 *              100个事件的地图中，平均消耗为：【11.19ms】
 *               50个事件的地图中，平均消耗为：【8.70ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.该插件会持续对玩家与事件之间的关系进行透明控制，但消耗并不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EATran（Event_Auto_Transparent）
//		临时全局变量	DrillUp.g_EATran_xxx
//		临时局部变量	this._drill_EATran_xxx
//		存储数据变量	$gameSystem._drill_EATran_idTank
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)
//		性能测试因素	125个事件的地图，放置了40柱子，测试自动透明性能。
//		性能测试消耗	19.89ms（refresh函数的消耗）
//		最坏情况		所有事件都设置了自动透明，负载将持续与玩家相互交错。
//		备注			暂无
//
//插件记录：
//		★大体框架与功能如下：
//			玩家接近自动透明化：
//				->id与贴图绑定容器
//				->矩形碰撞
//				->玩家在事件前面不透明
//
//		★必要注意事项：
//			1.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【重刷容器】。
//				【该插件 数据 在存储容器中，与 贴图 不同】。
//			2.该容器原理与 Drill_MouseTriggerEvent 鼠标触发事件 的容器相似。
//			  目的是为了保持id与贴图一致性。实现贴图与事件绑定，贴图影响事件数据。
//				$gameSystem._drill_EATran_idTank = [];				//缓冲池 - 事件id
//				$gameTemp._drill_EATran_sprites = [];				//缓冲池 - 事件贴图
//
//		★其它说明细节：
//			1.该插件不受镜头缩放大小影响。因为是贴图之间对比碰撞面积。
//
//		★存在的问题：
//			暂无
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventAutoTransparent = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventAutoTransparent');
	
	DrillUp.g_EATran_min = Number(DrillUp.parameters['最小透明度'] || 125);
	DrillUp.g_EATran_speed = Number(DrillUp.parameters['透明度变化速度'] || 10);
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_EATran_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_EATran_pluginCommand.call(this, command, args);
	//...暂无
};

//==============================
// * 注释初始化
//==============================
var _drill_EATran_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EATran_event_setupPage.call(this);
    this.drill_EATran_setupPage();
};
Game_Event.prototype.drill_EATran_setupPage = function() {
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>玩家接近自动透明化"){	//=>玩家接近自动透明化 : 开启
				if(args.length == 2){
					var type = String(args[1]);
					if( type == "开启" ){
						$gameSystem.drill_EATran_pushId( Number(this._eventId) );
					}
					if( type == "关闭" ){
						$gameSystem.drill_EATran_removeId( Number(this._eventId) );
					}
				}
				if(args.length == 4){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( type == "条件" ){
						this._drill_EATran_type = temp1;
					}
				}
			};
		};
	}, this);};
};

//=============================================================================
// ** 存储变量初始化
//=============================================================================
//==============================
// * 存储容器 - 初始化
//==============================
var _drill_EATran_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {	
	_drill_EATran_sys_initialize.call(this);
	this._drill_EATran_idTank = [];						//缓冲池 - 事件id
}
//==============================
// * 存储容器 - 添加
//==============================
Game_System.prototype.drill_EATran_pushId = function( id ) {	
	for(var i=0; i< this._drill_EATran_idTank.length; i++){	//重复的不插入
		if( this._drill_EATran_idTank[i] == id ){
			return;
		}
	}
	this._drill_EATran_idTank.push( id );
};
//==============================
// * 存储容器 - 去除
//==============================
Game_System.prototype.drill_EATran_removeId = function( id ) {	
	for(var i=this._drill_EATran_idTank.length-1; i>=0; i--){
		if( this._drill_EATran_idTank[i] == id ){
			this._drill_EATran_idTank.splice(i,1);
			$gameTemp._drill_EATran_sprites.splice(i,1);
		}
	}
};

//=============================================================================
// ** 容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_EATran_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_EATran_temp_initialize.call(this);
	this._drill_EATran_sprites = [];				//缓冲池 - 事件贴图
	this._drill_EATran_player_sprite = null;		//缓冲池 - 玩家贴图
	//...											//（暂不考虑一体化）
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EATran_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameSystem._drill_EATran_idTank = [];				//缓冲池 - 事件id
	$gameTemp._drill_EATran_sprites = [];				//缓冲池 - 事件贴图
														//（注意，要在事件注释的前面）
	_drill_EATran_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EATran_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	for( var i = 0; i < $gameSystem._drill_EATran_idTank.length; i++ ){
		$gameTemp._drill_EATran_sprites[i] = null;
	}
	_drill_EATran_smap_createCharacters.call(this);
}
//=============================================================================
// ** 地图界面（Scene_Map）
//=============================================================================
//==============================
// * 帧刷新
//==============================
var _drill_EATran_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_EATran_smap_update.call(this);
	if( this.isActive() ){
		this.drill_EATran_refreshArray();
		this.drill_EATran_updateTransparent();
	}
}
//==============================
// * 帧刷新 - 容器中与id绑定的贴图刷新
//==============================
Scene_Map.prototype.drill_EATran_refreshArray = function() {
	if( $gameSystem._drill_EATran_idTank.length == 0 ){ return; }
	
	// > 事件的贴图
	for( var i = 0; i < $gameSystem._drill_EATran_idTank.length; i++ ){
		var temp_id = $gameSystem._drill_EATran_idTank[i];		//鼠标数据（存储）
		var temp_obj = $gameTemp._drill_EATran_sprites[i];		//鼠标贴图（临时）
		if( !temp_obj ){
			
			var char_sprites = this._spriteset._characterSprites;	//从地图贴图找起 >> 找到含event的Sprite_Character >> 存入触发集合
			for(var j=0; j< char_sprites.length; j++){
				var temp_sprite = char_sprites[j];
				var temp_character = temp_sprite._character;
				if( temp_character && temp_character instanceof Game_Event && temp_character._eventId == temp_id ){
					$gameTemp._drill_EATran_sprites[i] = temp_sprite;
				}
			}
		}
	}
	// > 玩家的贴图
	var char_sprites = this._spriteset._characterSprites;
	for(var j=0; j< char_sprites.length; j++){
		var temp_sprite = char_sprites[j];
		var temp_character = temp_sprite._character;
		if( temp_character && temp_character instanceof Game_Player ){
			$gameTemp._drill_EATran_player_sprite = temp_sprite;
		}
	}
}
//==============================
// * 帧刷新 - 容器中与id绑定的贴图刷新
//==============================
Scene_Map.prototype.drill_EATran_updateTransparent = function() {
	if( $gameSystem._drill_EATran_idTank.length == 0 ){ return; }
	
	for(var i=0; i< $gameSystem._drill_EATran_idTank.length; i++){			//根据触发集合，遍历触发
		var temp_sprite = $gameTemp._drill_EATran_sprites[i];
		var temp_id = $gameSystem._drill_EATran_idTank[i];
		var player_sprite = $gameTemp._drill_EATran_player_sprite;
		if( this.drill_EATran_isBitmapReady( temp_sprite ) ){					//贴图已加载
		
			var e = $gameMap.event( temp_id );
			var is_coverd = false;
			if( e._drill_EATran_type == "只要接触就透明" ){
				if( this.drill_EATran_isCovered( player_sprite,temp_sprite ) ){
					is_coverd = true;
				}
			}else{
				if( this.drill_EATran_isCovered( player_sprite,temp_sprite )	//与玩家贴图碰撞
					&& e.y > $gamePlayer.y ){
					is_coverd = true;
				}
			}
			
			if( is_coverd ){
				if( e.opacity() > DrillUp.g_EATran_min ){
					e.setOpacity( e.opacity() - DrillUp.g_EATran_speed );
				}
			}else{
				if( e.opacity() < 255 ){
					e.setOpacity( e.opacity() + DrillUp.g_EATran_speed );
				}
			}
		}
	}
}

//==============================
// * 贴图判定 - 是否准备完毕
//==============================
Scene_Map.prototype.drill_EATran_isBitmapReady = function( sprite ) {
	 if (!sprite ){ return false };
	 if (!sprite.bitmap ){ return false };
	 if (!sprite.bitmap.isReady() ){ return false };
	 if (sprite.visible === false) {return false};
	 if (sprite.opacity === 0) {return false};
	 return true;	
}
//==============================
// * 贴图判定 - 是否相互碰撞
//==============================
Scene_Map.prototype.drill_EATran_isCovered = function( sprite_A , sprite_B ) {
	
	var cw1 = sprite_A.patternWidth();
	var ch1 = sprite_A.patternHeight();
	var x1 = sprite_A.x + 0 - cw1*sprite_A.anchor.x;
	var y1 = sprite_A.y + 0 - ch1*sprite_A.anchor.y;
	var x2 = sprite_A.x + cw1 - cw1*sprite_A.anchor.x;
	var y2 = sprite_A.y + ch1 - ch1*sprite_A.anchor.y;
	
	var cw2 = sprite_B.patternWidth();
	var ch2 = sprite_B.patternHeight();
	var x3 = sprite_B.x + 0 - cw2*sprite_B.anchor.x;
	var y3 = sprite_B.y + 0 - ch2*sprite_B.anchor.y;
	var x4 = sprite_B.x + cw2 - cw2*sprite_B.anchor.x;
	var y4 = sprite_B.y + ch2 - ch2*sprite_B.anchor.y;
	
	var minx = Math.max(x1, x3);
	var miny = Math.max(y1, y3);
	var maxx = Math.min(x2, x4);
	var maxy = Math.min(y2, y4);
	
	//return minx <= maxx && miny <= maxy ;
	return minx < maxx && miny < maxy ;
};



