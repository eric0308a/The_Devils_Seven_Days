//=============================================================================
// Drill_MouseIllumination.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        鼠标 - 自定义照明效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_MouseIllumination +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可以使得鼠标能够支持自定义照明效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件不能单独使用，必须基于插件：
 * 基于：
 *   - Drill_LayerIllumination     地图 - 自定义照明效果
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于鼠标。
 * 2.详细内容可以去看看"关于自定义照明效果.docx"。
 * 鼠标照明：
 *   (1.鼠标照明插件激活后，会一直有一个光源跟随鼠标。
 *   (2.限时动态照明出现后不会跟随鼠标移动。
 *   (3.插件指令设置只在当前地图有效，离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令控制网格指向标：
 * 
 * 插件指令：>自定义照明 : 物体照明 : 鼠标 : 照明[1]
 * 插件指令：>自定义照明 : 物体照明 : 鼠标 : 关闭照明
 *
 * 1.插件指令设置只在当前地图有效，离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 限时动态照明
 * 你可以通过插件指令临时添加动态照明：
 * 
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐淡去 : 持续时间[180] : 鼠标 : 照明[17]
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐显现 : 持续时间[180] : 鼠标 : 照明[17]
 * 插件指令：>自定义照明 : 限时动态照明 : 保持亮度 : 持续时间[10] : 鼠标 : 照明[17]
 * 
 * 1.限时动态照明在持续时间结束后，会被清除。多用于临时效果。
 * 2.限时动态照明出现后不会跟随鼠标移动。
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
 * 时间复杂度： o(n^2)*o(贴图处理)*o(遮罩渲染)
 * 测试方法：   去光源管理层，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【12.19ms】
 *              100个事件的地图中，平均消耗为：【14.94ms】
 *               50个事件的地图中，平均消耗为：【12.56ms】
 *               20个事件的地图中，平均消耗为：【13.75ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 10ms 范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.插件是基于光照插件运行的，虽然鼠标的单个光源消耗并不多。
 *   但是与基础插件的消耗加起来，还是不容小视。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MIl（Mouse_Destination）
//		临时全局变量	无
//		临时局部变量	this._drill_MIl_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理)*o(遮罩渲染)
//		性能测试因素	光源管理层，乱跑
//		性能测试消耗	12.56ms
//		最坏情况		无
//		备注			无
//
//插件记录：
//		★大体框架与功能如下：
//			鼠标照明：
//				->鼠标的 物体照明
//				->鼠标的 限时动态照明
//
//		★私有类如下：
//			* Drill_MIl_MouseFakeEvent【鼠标伪事件】
//		
//		★必要注意事项：
//			1.注意 MIl 和 LIl 的区别，该插件与基础插件的粘性较大。
//			
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//		
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MouseIllumination = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MouseIllumination');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_LayerIllumination ){


//=============================================================================
// * 插件指令
//=============================================================================
var _drill_MIl_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MIl_pluginCommand.call(this, command, args);
	
	if( command === ">自定义照明" ){
		
		if( $gameSystem._drill_LIl_enable == false ){ return; }	//如果未开，则插件指令无效
		
		/*-----------------物体照明------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var unit = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "物体照明" ){
				if( unit == "鼠标" ){
					if( temp2.indexOf("照明[") != -1 ){
						temp2 = temp2.replace("照明[","");
						temp2 = temp2.replace("]","");
						temp2 = Number(temp2);
						$gameMap._drill_MIl_fakeEvent._drill_LIl._light_id = Number(temp2) - 1;
						$gameTemp._drill_LIl_needRefresh = true;
					}
					if( temp2 == "关闭照明" ){
						$gameMap._drill_MIl_fakeEvent._drill_LIl._light_id = -1;
					}
				}
			}
		}
		/*-----------------限时动态照明------------------*/
		if(args.length == 10){
			var type = String(args[1]);
			var oType = String(args[3]);
			var temp1 = String(args[5]);
			var pos = String(args[7]);
			var temp3 = String(args[9]);
			if( type == "限时动态照明" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				temp3 = temp3.replace("照明[","");
				temp3 = temp3.replace("]","");
				temp3 = Number(temp3);
				
				var e_pos = null;
				if( pos == "鼠标" ){
					// > 鼠标坐标
					var mouse_x = _drill_mouse_x;
					var mouse_y = _drill_mouse_y;
					if( Imported.Drill_LayerCamera ){		//镜头缩放
						mouse_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );	
						mouse_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );	
					}
					// > 坐标转换
					var x = $gameMap._displayX + mouse_x / $gameMap.tileWidth();
					var y = $gameMap._displayY + mouse_y / $gameMap.tileHeight();
					// > 坐标中心点修正
					e_pos = [ x-0.5, y-0.5 ];
				}
				
				if( e_pos ){
					var data = {
						"light_id":temp3 - 1,				
						"light_type":"限时动态照明",
						"light_oType":oType,
						"life":temp1,
						"realX":Number(e_pos[0]),
						"realY":Number(e_pos[1]),
					}
					$gameMap._drill_LIl_fakeEvents.push( new Drill_LIl_FakeEvent( data ) );
					$gameTemp._drill_LIl_needRefresh = true;		
					//alert($gameMap._drill_LIl_fakeEvents.length);
				}
				
			}
		}
	}
};


//=============================================================================
// ** 鼠标伪事件
//=============================================================================
//==============================
// * 鼠标伪事件 - 定义
//==============================
function Drill_MIl_MouseFakeEvent() {
	this.initialize.apply(this, arguments);
}
Drill_MIl_MouseFakeEvent.prototype = Object.create(Drill_LIl_FakeEvent.prototype);
Drill_MIl_MouseFakeEvent.prototype.constructor = Drill_MIl_MouseFakeEvent;

//==============================
// * 鼠标伪事件 - 初始化
//==============================
Drill_MIl_MouseFakeEvent.prototype.initialize = function( data ) {
	Drill_LIl_FakeEvent.prototype.initialize.call(this, data );
}
//==============================
// * 鼠标伪事件 - 帧刷新
//==============================
Drill_MIl_MouseFakeEvent.prototype.update = function() {
	//Drill_LIl_FakeEvent.prototype.update.call(this);
	
	// > 鼠标坐标
	var mouse_x = _drill_mouse_x;
	var mouse_y = _drill_mouse_y;
	if( Imported.Drill_LayerCamera ){		//镜头缩放
		mouse_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );	
		mouse_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );	
	}
	// > 坐标转换
	var x = $gameMap._displayX + mouse_x / $gameMap.tileWidth();
	var y = $gameMap._displayY + mouse_y / $gameMap.tileHeight();
	
	// > 坐标中心点修正
	this._realX = x-0.5;
	this._realY = y-0.5;
}

//==============================
// * 容器 - 切换地图时
//==============================
var _drill_LIl_MIl_resetFakeEvents = Game_Map.prototype.drill_LIl_resetFakeEvents;
Game_Map.prototype.drill_LIl_resetFakeEvents = function() {
	_drill_LIl_MIl_resetFakeEvents.call(this);
	
	var data = {					//鼠标伪事件初始化
		"light_id": -1,				//	光源id
		"light_type":"物体照明",	//	光源类型
		"light_oType":"",			//	光源变化因素（不需要）
		"life":10,					//	持续时间（帧刷新不减）
		"realX":0,					//	x（实时追踪鼠标）
		"realY":0,					//	y
	}
	this._drill_MIl_fakeEvent = new Drill_MIl_MouseFakeEvent( data );
	this._drill_LIl_fakeEvents.push( this._drill_MIl_fakeEvent );
};


//=============================================================================
// ** 获取鼠标位置（输入设备核心的片段）
//=============================================================================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event) {		//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MouseIllumination = false;
		alert(
			"【Drill_MouseIllumination.js 鼠标 - 自定义照明效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_LayerIllumination 地图 - 自定义照明效果"
		);
}

