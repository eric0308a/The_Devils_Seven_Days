//=============================================================================
// Drill_CoreOfBallistics.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        系统 - 弹道核心
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfBallistics +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能够描述一群粒子/碎片/子弹运动的轨迹。
 * 该插件为基础核心，单独使用没有效果。
 * ★★尽量放在最靠上的位置★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础插件，作用于下列插件：
 * 作用于：
 *   - Drill_CoreOfGaugeMeter        系统 - 参数条核心
 *   - Drill_CoreOfGaugeNumber       系统 - 参数数字核心
 *   - Drill_CoreOfShatterEffect     系统 - 方块粉碎核心
 *   - Drill_CoreOfParticle          系统 - 粒子核心（待填坑）
 *   - Drill_STG_ShootingCore        STG - 子弹发射核心（待填坑）
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于贴图。
 * 弹道：
 *   (1.该插件的主要功能为数学计算。
 *      绘制对应的二维曲线。可以去看看文档"关于弹道.docx"。
 *   (2.配置项分为 极坐标模式 与 直角坐标模式。
 *      输入相关配置参数，经过推演，可得到结果数组。
 *      结果数组即子弹运动的轨迹，可以正向播放，也可以倒放。
 *   (3.子插件会根据自身特点，控制不同情况的弹道。
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
 * 工作类型：   单次执行
 * 时间复杂度： o(n^2)
 * 测试方法：   在各个界面中以正常游戏流程进行测试。
 * 测试结果：   战斗界面，消耗为：【5ms以下】
 *              地图界面，消耗为：【5ms以下】
 *              菜单界面，消耗为：【5ms以下】
 * 特殊测试：   参数条核心，制造了210个弹出条，反复调用弹道核心
 *              进行数学推演，造成消耗【208.17ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.由于核心只进行一次粒子路程的数学计算，计算完毕后不再工作，
 *   所以消耗可以忽略不计。
 * 3.插件原理上，属于单次执行的核心，而如果子插件反复调用数学计
 *   算，消耗一样会上去。而且都算核心的消耗，不算子插件消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了两点式计算功能。
 * [v1.2]
 * 优化了内部接口的结构。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COBa（Core_Of_Ballistics）
//		临时全局变量	无
//		临时局部变量	this._drill_COBa_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		单次执行
//		时间复杂度		o(n^2)
//		性能测试因素	无
//		性能测试消耗	无
//		最坏情况		不可估计
//		备注			虽然无法测试该核心的消耗，但是由于核心只进行一次粒子路程的数学
//						计算，计算完毕后不再工作，可以确定消耗小于5ms。
//
//插件记录：
//		★大体框架与功能如下：
//			弹道：
//				->接口
//					->轨迹数列
//					->随机因子
//				->坐标
//					->极坐标：方向+速度
//					->直角坐标：x速度+y速度
//				->速度
//					->只初速度
//					->初速度+波动量
//					->初速度+波动量+加速度
//					->初速度+波动量+加速度+最大最小
//					->路程计算公式
//					->锚点控制	x
//				->方向
//					->固定方向
//					->四周扩散（线性/随机）
//					->扇形范围方向（线性/随机）
//					->方向公式	x
//				->透明度
//					->固定数值
//					->线性变化
//					->锚点控制		x
//					->透明度公式	x
//
//		★必要注意事项：
//			1.插件提供数学计算，setBallistics初始化配置，preBallistics预推演数据。
//			  注意，初始化和预推演都没有返回值。且预推演函数中的 obj 是一个对象指针。
//			
//		★其它说明细节：
//			1.随机因子是一个非常特殊的结构，作用是使得轨迹既有随机性，又不会在重新赋值时出现轨迹重置现象。
//			  如果你要锁定随机因子，在data中加上因子的设定即可。【通常情况下随机因子是不需要赋值的。】
//		
//		★核心接口说明：
//			1.整个核心提供多个可调用的函数接口。	
//			2.用法：
//					// > 移动
//					$gameTemp.drill_COBa_setBallisticsMove( data );							//初始化
//					$gameTemp.drill_COBa_preBallisticsMove( obj, index , orgX, orgY );		//推演赋值
//					// > 透明度
//					$gameTemp.drill_COBa_setBallisticsOpacity( data );						//初始化
//					$gameTemp.drill_COBa_preBallisticsOpacity( obj, index , orgX, orgY );	//推演赋值
//					// > 旋转
//					$gameTemp.drill_COBa_setBallisticsRotate( data );						//初始化
//					$gameTemp.drill_COBa_preBallisticsRotate( obj, index , orgX, orgY );	//推演赋值
//	
//			  【注意，初始化和推演函数不要隔得太远】因为有可能会被重叠推演盖掉。
//			  obj用于放配置数据，执行完后，结果集会放到下面两个数组中：
//			  		obj['_drill_COBa_x']
//			  		obj['_drill_COBa_y']
//			  obj可以是个对象，空数组也可以，只要能放结果就可以。（data['movementTime'] 时长 就是数组的长度。）
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfBallistics = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfBallistics');


//=============================================================================
// ** 临时变量
//=============================================================================
var _drill_COBa_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(bitmap){
	_drill_COBa_initialize.call(this, bitmap);
	this._drill_COBa_moveData = {};
	this._drill_COBa_opacityData = {};
	this._drill_COBa_rotateData = {};
}

//=============================================================================
// ** 移动弹道
//=============================================================================
//==============================
// * 移动弹道 - 初始化（接口，单次调用）
//
//			说明：给传来的data进行初始赋值，主要功能为数学计算。
//			参数：见默认值，执行接口后，data指针中将被赋值弹道数据。
//			返回：无
//==============================
Game_Temp.prototype.drill_COBa_setBallisticsMove = function( data ){
	this._drill_COBa_moveData = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	var data = this._drill_COBa_moveData;
	
	//   移动（movement）
	if( data['movementNum'] == undefined ){ data['movementNum'] = 1 };								//移动 - 子弹数量
	if( data['movementTime'] == undefined ){ data['movementTime'] = 1 };							//移动 - 时长
	if( data['movementMode'] == undefined ){ data['movementMode'] = "极坐标模式" };					//移动 - 移动模式（极坐标模式/直角坐标模式）
	//   极坐标（polar）		
	if( data['polarSpeedType'] == undefined ){ data['polarSpeedType'] = "只初速度" };				//极坐标 - 速度 - 类型
	if( data['polarSpeedBase'] == undefined ){ data['polarSpeedBase'] = 0 };						//极坐标 - 速度 - 初速度
	if( data['polarSpeedRandom'] == undefined ){ data['polarSpeedRandom'] = 0 };					//极坐标 - 速度 - 速度随机波动量
	if( data['polarSpeedInc'] == undefined ){ data['polarSpeedInc'] = 0 };							//极坐标 - 速度 - 加速度
	if( data['polarSpeedMax'] == undefined ){ data['polarSpeedMax'] = 0 };							//极坐标 - 速度 - 最大速度
	if( data['polarSpeedMin'] == undefined ){ data['polarSpeedMin'] = 0 };							//极坐标 - 速度 - 最小速度
	if( data['polarDistanceFormula'] == undefined ){ data['polarDistanceFormula'] = "return 0" };	//极坐标 - 速度 - 路程计算公式
	if( data['polarDirType'] == undefined ){ data['polarDirType'] = "固定方向" };					//极坐标 - 方向 - 类型
	if( data['polarDirFixed'] == undefined ){ data['polarDirFixed'] = 0 };							//极坐标 - 方向 - 固定方向
	if( data['polarDirSectorFace'] == undefined ){ data['polarDirSectorFace'] = 0 };				//极坐标 - 方向 - 扇形朝向
	if( data['polarDirSectorDegree'] == undefined ){ data['polarDirSectorDegree'] = 0 };			//极坐标 - 方向 - 扇形角度
	if( data['polarDirFormula'] == undefined ){ data['polarDirFormula'] = "0" };					//极坐标 - 方向 - 方向公式
	//   直角坐标（cartesian）
	if( data['cartXSpeedType'] == undefined ){ data['cartXSpeedType'] = "只初速度" };				//直角坐标 - x - 类型
	if( data['cartXSpeedBase'] == undefined ){ data['cartXSpeedBase'] = 0 };						//直角坐标 - x - 初速度
	if( data['cartXSpeedRandom'] == undefined ){ data['cartXSpeedRandom'] = 0 };					//直角坐标 - x - 速度随机波动量
	if( data['cartXSpeedInc'] == undefined ){ data['cartXSpeedInc'] = 0 };							//直角坐标 - x - 加速度
	if( data['cartXSpeedMax'] == undefined ){ data['cartXSpeedMax'] = 0 };							//直角坐标 - x - 最大速度
	if( data['cartXSpeedMin'] == undefined ){ data['cartXSpeedMin'] = 0 };							//直角坐标 - x - 最小速度
	if( data['cartXDistanceFormula'] == undefined ){ data['cartXDistanceFormula'] = "return 0" };	//直角坐标 - x - 路程计算公式
	if( data['cartYSpeedType'] == undefined ){ data['cartYSpeedType'] = "只初速度" };				//直角坐标 - y - 类型
	if( data['cartYSpeedBase'] == undefined ){ data['cartYSpeedBase'] = 0 };						//直角坐标 - y - 初速度
	if( data['cartYSpeedRandom'] == undefined ){ data['cartYSpeedRandom'] = 0 };					//直角坐标 - y - 速度随机波动量
	if( data['cartYSpeedInc'] == undefined ){ data['cartYSpeedInc'] = 0 };							//直角坐标 - y - 加速度
	if( data['cartYSpeedMax'] == undefined ){ data['cartYSpeedMax'] = 0 };							//直角坐标 - y - 最大速度
	if( data['cartYSpeedMin'] == undefined ){ data['cartYSpeedMin'] = 0 };							//直角坐标 - y - 最小速度
	if( data['cartYDistanceFormula'] == undefined ){ data['cartYDistanceFormula'] = "return 0" };	//直角坐标 - y - 路程计算公式
	//   两点式（twoPoint）
	if( data['twoPointType'] == undefined ){ data['twoPointType'] = "匀速移动" };					//两点式 - 类型（匀速移动/弹性移动/……）
	if( data['twoPointDifferenceX'] == undefined ){ data['twoPointDifferenceX'] = 0 };				//两点式 - 距离差值x
	if( data['twoPointDifferenceY'] == undefined ){ data['twoPointDifferenceY'] = 0 };				//两点式 - 距离差值y
	if( data['twoPointInc'] == undefined ){ data['twoPointInc'] = 0 };								//两点式 - 加速度比
	
	//   公式obj
	eval("data['polarDistanceFunction'] = function(id,time,v0,vRan,a,vMax,vMin){ "+data['polarDistanceFormula']+" }" );
	eval("data['polarDirFunction'] = function(id,time){ "+data['polarDirFormula']+" }" );
	eval("data['cartXDistanceFunction'] = function(id,time,v0,vRan,a,vMax,vMin){ "+data['cartXDistanceFormula']+" }" );
	eval("data['cartYDistanceFunction'] = function(id,time,v0,vRan,a,vMax,vMin){ "+data['cartYDistanceFormula']+" }" );
	//   随机因子（RandomFactor）
	if( data['polarSpeedRandomFactor'] == undefined ){ data['polarSpeedRandomFactor'] = -1 };		//极坐标 - 速度 - 随机因子（锁定随机值专用,0-1之间）
	if( data['polarDirRandomFactor'] == undefined ){ data['polarDirRandomFactor'] = -1 };			//极坐标 - 方向 - 随机因子（锁定随机值专用,0-1之间）
	if( data['cartXSpeedRandomFactor'] == undefined ){ data['cartXSpeedRandomFactor'] = -1 };		//直角坐标 - x - 随机因子（锁定随机值专用,0-1之间）
	if( data['cartYSpeedRandomFactor'] == undefined ){ data['cartYSpeedRandomFactor'] = -1 };		//直角坐标 - y - 随机因子（锁定随机值专用,0-1之间）
	
}
//==============================
// * 移动弹道 - 预推演（接口，单次调用）
//
//			说明：根据当前的弹道参数设置，开始计算轨迹，主要功能为数学计算。
//			参数：对象容器，对象编号，初始x位置，初始y位置
//				  执行后，obj_data指针中将被赋值弹道结果。
//			返回：无
//==============================
Game_Temp.prototype.drill_COBa_preBallisticsMove = function( obj_data, obj_index, orgX, orgY ){
	var data = this._drill_COBa_moveData;
	
	obj_data['_drill_COBa_x'] = [];
	obj_data['_drill_COBa_y'] = [];
	obj_data['_drill_COBa_x'][0] = orgX;
	obj_data['_drill_COBa_y'][0] = orgY;
		
	if( data['movementMode'] == "极坐标模式"){
		
		// > 随机值（只有随机值和时间没有关系）
		var randomSpeed = Math.random();	//速度随机因子
		var randomDirValue = Math.random();	//方向随机因子
		if( data['polarSpeedRandomFactor'] != -1 ){ randomSpeed = data['polarSpeedRandomFactor']; }
		if( data['polarDirRandomFactor'] != -1 ){ randomDirValue = data['polarDirRandomFactor']; }
		
		for(var time=1; time < data['movementTime']; time++){
			// > 方向
			var dir = 0;
			if( data['polarDirType'] == "固定方向"){
				dir = data['polarDirFixed'];
			}
			if( data['polarDirType'] == "四周扩散(线性)"){
				dir = 360 * obj_index / data['movementNum'];
			}
			if( data['polarDirType'] == "四周扩散(随机)"){
				dir = 360 * randomDirValue;
			}
			if( data['polarDirType'] == "四周扩散(抖动)"){
				dir = 360 * randomDirValue + 30 * Math.random();
			}
			if( data['polarDirType'] == "扇形范围方向(线性)"){
				var degree = data['polarDirSectorDegree'];
				if( data['movementNum'] > 1 ){
					dir = data['polarDirSectorFace'] + degree * obj_index / (data['movementNum'] - 1) - degree/2;
				}else{
					dir = data['polarDirSectorFace'];
				}
			}
			if( data['polarDirType'] == "扇形范围方向(随机)"){		//扇形的线性和随机的配置角度是反的，目前不明原因
				var degree = data['polarDirSectorDegree'];
				dir = data['polarDirSectorFace'] + degree * (randomDirValue - 0.5);
			}
			if( data['polarDirType'] == "方向公式"){
				dir = data['polarDirFunction'].call(this, obj_index, time );
			}
			dir = dir / 180 * Math.PI;
			
			// > 速度
			var radius = 0;
			if( data['polarSpeedType'] == "只初速度"){
				var v0 = data['polarSpeedBase'];
				radius = time * v0;		
			}
			if( data['polarSpeedType'] == "初速度+波动量"){
				var v0 = data['polarSpeedBase'] + data['polarSpeedRandom'] * (randomSpeed - 0.5);
				radius = time * v0;	
			}
			if( data['polarSpeedType'] == "初速度+波动量+加速度"){
				var v0 = data['polarSpeedBase'];
				var vRan = data['polarSpeedRandom'] * (randomSpeed - 0.5);
				var a = data['polarSpeedInc'];
				radius = (v0+vRan)*time+0.5*a*time*time;
			}
			if( data['polarSpeedType'] == "初速度+波动量+加速度+最大最小"){
				var v0 = data['polarSpeedBase'];
				var vRan = data['polarSpeedRandom'] * (randomSpeed - 0.5);
				var a = data['polarSpeedInc'];
				var vMax = data['polarSpeedMax'];
				var vMin = data['polarSpeedMin'];
				
				var v1 = (v0+vRan) + a*time;
				var d = (v0+vRan)*time+0.5*a*time*time;
				if( v1 >= vMax ){
					var m_v = v1-vMax;
					var m_t = (v1-vMax)/a;
					d = d - m_v*m_t+0.5*a*m_t*m_t;
				}
				if( v1 <= vMin ){
					var m_v = v1-vMin;
					var m_t = (v1-vMin)/a;
					d = d - m_v*m_t+0.5*a*m_t*m_t;
				}
				radius = d;
			}
			if( data['polarSpeedType'] == "路程计算公式"){
				var v0 = data['polarSpeedBase'];
				var vRan = data['polarSpeedRandom'] * (randomSpeed - 0.5);
				var a = data['polarSpeedInc'];
				var vMax = data['polarSpeedMax'];
				var vMin = data['polarSpeedMin'];
				radius = data['polarDistanceFunction'].call(this, obj_index, time, v0, vRan, a, vMax, vMin );
			}
		
			var xx = 0;
			var yy = 0;
			xx = orgX + radius * Math.cos(dir);
			yy = orgY + radius * Math.sin(dir);
			obj_data['_drill_COBa_x'].push(xx);
			obj_data['_drill_COBa_y'].push(yy);
		}
	}
	
	if( data['movementMode'] == "直角坐标模式"){
		
		// > 随机值（只有随机值和时间没有关系）
		var x_randomSpeed = Math.random();	//速度随机因子
		var y_randomSpeed = Math.random();	//方向随机因子
		if( data['cartXSpeedRandomFactor'] != -1 ){ x_randomSpeed = data['cartXSpeedRandomFactor']; }
		if( data['cartYSpeedRandomFactor'] != -1 ){ y_randomSpeed = data['cartYSpeedRandomFactor']; }
		
		for(var time=1; time < data['movementTime']; time++){
			
			// > 速度
			var xx = 0;
			if( data['cartXSpeedType'] == "只初速度"){
				var v0 = data['cartXSpeedBase'];
				xx = time * v0;		
			}
			if( data['cartXSpeedType'] == "初速度+波动量"){
				var v0 = data['cartXSpeedBase'] + data['cartXSpeedRandom'] * (x_randomSpeed - 0.5);
				xx = time * v0;	
			}
			if( data['cartXSpeedType'] == "初速度+波动量+加速度"){
				var v0 = data['cartXSpeedBase'];
				var vRan = data['cartXSpeedRandom'] * (x_randomSpeed - 0.5);
				var a = data['cartXSpeedInc'];
				xx = (v0+vRan)*time+0.5*a*time*time;
			}
			if( data['cartXSpeedType'] == "初速度+波动量+加速度+最大最小"){
				var v0 = data['cartXSpeedBase'];
				var vRan = data['cartXSpeedRandom'] * (x_randomSpeed - 0.5);
				var a = data['cartXSpeedInc'];
				var vMax = data['cartXSpeedMax'];
				var vMin = data['cartXSpeedMin'];
				
				var v1 = (v0+vRan) + a*time;
				var d = (v0+vRan)*time+0.5*a*time*time;
				if( v1 >= vMax ){
					var m_v = v1-vMax;
					var m_t = (v1-vMax)/a;
					d = d - m_v*m_t+0.5*a*m_t*m_t;
				}
				if( v1 <= vMin ){
					var m_v = v1-vMin;
					var m_t = (v1-vMin)/a;
					d = d - m_v*m_t+0.5*a*m_t*m_t;
				}
				xx = d;
			}
			if( data['cartXSpeedType'] == "路程计算公式"){
				var v0 = data['cartXSpeedBase'];
				var vRan = data['cartXSpeedRandom'] * (x_randomSpeed - 0.5);
				var a = data['cartXSpeedInc'];
				var vMax = data['cartXSpeedMax'];
				var vMin = data['cartXSpeedMin'];
				xx = data['cartXDistanceFunction'].call(this, obj_index, time, v0, vRan, a, vMax, vMin );
			}
			
			// > 速度
			var yy = 0;
			if( data['cartYSpeedType'] == "只初速度"){
				var v0 = data['cartYSpeedBase'];
				yy = time * v0;		
			}
			if( data['cartYSpeedType'] == "初速度+波动量"){
				var v0 = data['cartYSpeedBase'] + data['cartYSpeedRandom'] * (y_randomSpeed - 0.5);
				yy = time * v0;	
			}
			if( data['cartYSpeedType'] == "初速度+波动量+加速度"){
				var v0 = data['cartYSpeedBase'];
				var vRan = data['cartYSpeedRandom'] * (y_randomSpeed - 0.5);
				var a = data['cartYSpeedInc'];
				yy = (v0+vRan)*time+0.5*a*time*time;
			}
			if( data['cartYSpeedType'] == "初速度+波动量+加速度+最大最小"){
				var v0 = data['cartYSpeedBase'];
				var vRan = data['cartYSpeedRandom'] * (y_randomSpeed - 0.5);
				var a = data['cartYSpeedInc'];
				var vMax = data['cartYSpeedMax'];
				var vMin = data['cartYSpeedMin'];
				
				var v1 = (v0+vRan) + a*time;
				var d = (v0+vRan)*time+0.5*a*time*time;
				if( v1 >= vMax ){
					var m_v = v1-vMax;
					var m_t = (v1-vMax)/a;
					d = d - m_v*m_t+0.5*a*m_t*m_t;
				}
				if( v1 <= vMin ){
					var m_v = v1-vMin;
					var m_t = (v1-vMin)/a;
					d = d - m_v*m_t+0.5*a*m_t*m_t;
				}
				yy = d;
			}
			if( data['cartYSpeedType'] == "路程计算公式"){
				var v0 = data['cartYSpeedBase'];
				var vRan = data['cartYSpeedRandom'] * (y_randomSpeed - 0.5);
				var a = data['cartYSpeedInc'];
				var vMax = data['cartYSpeedMax'];
				var vMin = data['cartYSpeedMin'];
				yy = data['cartYDistanceFunction'].call(this, obj_index, time, v0, vRan, a, vMax, vMin );
			}
		
			xx = orgX + xx;
			yy = orgY + yy;
			obj_data['_drill_COBa_x'].push(xx);
			obj_data['_drill_COBa_y'].push(yy);
		}
	}	
	
	if( data['movementMode'] == "两点式"){
		
		for(var time=1; time < data['movementTime']; time++){
			// > 速度
			var xx = 0;
			var yy = 0;
			
			if( data['twoPointType'] == "不移动"){
				xx = data['twoPointDifferenceX'];
				yy = data['twoPointDifferenceY'];
			}
			
			if( data['twoPointType'] == "匀速移动"){
				xx = time * data['twoPointDifferenceX']/data['movementTime'];
				yy = time * data['twoPointDifferenceY']/data['movementTime'];
			}
			
			if( data['twoPointType'] == "增减速移动"){	
				var d = data['twoPointDifferenceX'];		//先加速后减速
				var t = data['movementTime'];
				var v_max = d/t*2;
				var a = v_max/t*2;
				if( time < t/2 ){
					xx = a*time*time/2;
				}else{
					var t_p = time - t/2;
					xx = d/2 + v_max*t_p - a*t_p*t_p/2;
				}
				
				var d = data['twoPointDifferenceY'];
				var t = data['movementTime'];
				var v_max = d/t*2;
				var a = v_max/t*2;
				if( time < t/2 ){
					yy = a*time*time/2;
				}else{
					var t_p = time - t/2;
					yy = d/2 + v_max*t_p - a*t_p*t_p/2;
				}
			}
			
			if( data['twoPointType'] == "弹性移动"){
				var dx = data['twoPointDifferenceX'];	//r = 1/2*a*t^2
				var dy = data['twoPointDifferenceY'];
				var t = data['movementTime'];
				var ax = 2 * dx / t / t;
				var ay = 2 * dy / t / t;	
				var c_time = t - time;
				xx = -1 * 0.5 * ax * c_time * c_time ;
				yy = -1 * 0.5 * ay * c_time * c_time ;
			}
			
			xx = orgX + xx;
			yy = orgY + yy;
			obj_data['_drill_COBa_x'].push(xx);
			obj_data['_drill_COBa_y'].push(yy);
		}
	}
}


//=============================================================================
// ** 透明度弹道
//=============================================================================
//==============================
// * 透明度弹道 - 初始化（接口，单次调用）
//
//			说明：给传来的data进行初始赋值，主要功能为数学计算。
//			参数：见默认值，执行接口后，data指针中将被赋值旋转角数据。
//			返回：无
//==============================
Game_Temp.prototype.drill_COBa_setBallisticsOpacity = function( data ){
	this._drill_COBa_opacityData = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	var data = this._drill_COBa_opacityData;
	
	// > 默认值
	if( data['opacityTime'] == undefined ){ data['opacityTime'] = 1 };						//透明度 - 变化时长
	if( data['opacityType'] == undefined ){ data['opacityType'] = "固定数值" };				//透明度 - 类型（固定数值/线性变化/锚点控制/计算公式）
	
	if( data['opacityFix'] == undefined ){ data['opacityFix'] = 0 };						//透明度 - 固定值
	if( data['opacityFixRandom'] == undefined ){ data['opacityFixRandom'] = 0 };			//透明度 - 固定值(随机)
	if( data['opacityTarget'] == undefined ){ data['opacityTarget'] = 0 };					//透明度 - 目标透明度
	if( data['opacityDelay'] == undefined ){ data['opacityDelay'] = 30 };					//透明度 - 变化延迟
	if( data['opacityTranTime'] == undefined ){ data['opacityTranTime'] = 30 };				//透明度 - 变化时长
	if( data['opacityPoints'] == undefined ){ data['opacityPoints'] = [{'x':0,'y':0},{'x':45,'y':255},{'x':65,'y':255},{'x':100,'y':0}] };	//透明度 - 默认锚点
	if( data['opacityFormula'] == undefined ){ data['opacityFormula'] = "return 0" };		//透明度 - 计算公式
		
	//公式obj
	eval("data['opacityFunction'] = function(id,time,oRan,o0,o1,o2,t1,t2){ "+data['opacityFormula']+" }" );
	
	//随机因子
	if( data['opacityRandomFactor'] == undefined ){ data['opacityRandomFactor'] = -1 };		//极坐标 - 速度 - 随机因子（锁定随机值专用,0-1之间）
	
}
//==============================
// * 透明度弹道 - 预推演（接口，单次调用）
//
//			说明：根据当前的弹道参数设置，开始计算轨迹，主要功能为数学计算。
//			参数：对象容器，对象编号，初始旋转角
//				  执行后，obj_data指针中将被赋值弹道结果。
//			返回：无
//==============================
Game_Temp.prototype.drill_COBa_preBallisticsOpacity = function( obj_data, obj_index, orgOpacity ){
	var data = this._drill_COBa_opacityData;
	obj_data['_drill_COBa_opacity'] = [];
	obj_data['_drill_COBa_opacity'][0] = orgOpacity;

	// > 随机值
	var randomOpacity = Math.random();	//透明度随机因子
	if( data['opacityRandomFactor'] != -1 ){ randomOpacity = data['opacityRandomFactor']; }

	for(var time=1; time < data['opacityTime']; time++){
		// > 透明度（直角坐标模式）
		var opacity = 0;
		if( data['opacityType'] == "固定数值"){
			var o1 = data['opacityFix'];
			opacity = o1;
		}
		if( data['opacityType'] == "固定数值(随机)"){
			var o1 = data['opacityFix'];
			var oRan = data['opacityFixRandom'] * (randomOpacity - 0.5);
			opacity = o1 + oRan;
		}
		if( data['opacityType'] == "线性变化"){
			var o2 = data['opacityTarget'];
			var t1 = data['opacityDelay'];
			var t2 = data['opacityTranTime'];
			if( time <= t1 ){
				opacity = orgOpacity;
			}else if( time <= t1 + t2 ){
				var p_time = time - t1;
				opacity = orgOpacity + (o2 - orgOpacity) / t2 * p_time;
			}else{
				opacity = o2;
			}
		}
		if( data['opacityType'] == "锚点控制"){
			//...
		}
		if( data['opacityType'] == "计算公式"){
			var o0 = orgOpacity;
			var o1 = data['opacityFix'];
			var oRan = data['opacityFixRandom'] * (randomOpacity - 0.5);
			var o2 = data['opacityTarget'];
			var t1 = data['opacityDelay'];
			var t2 = data['opacityTranTime'];
			opacity = data['opacityFunction'].call(this, obj_index, time, oRan, o0, o1, o2, t1, t2 );
		}
		
		obj_data['_drill_COBa_opacity'].push(opacity);
	}
}

//=============================================================================
// ** 旋转角弹道
//=============================================================================
//==============================
// * 旋转角弹道 - 初始化（接口，单次调用）
//
//			说明：给传来的data进行初始赋值，主要功能为数学计算。
//			参数：见默认值，执行接口后，data指针中将被赋值旋转角数据。
//			返回：无
//==============================
Game_Temp.prototype.drill_COBa_setBallisticsRotate = function( data ){
	this._drill_COBa_rotateData = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	var data = this._drill_COBa_rotateData;
	
	// > 默认值
	
}
//==============================
// * 旋转角弹道 - 预推演（接口，单次调用）
//
//			说明：根据当前的弹道参数设置，开始计算轨迹，主要功能为数学计算。
//			参数：对象容器，对象编号，初始旋转角
//				  执行后，obj_data指针中将被赋值弹道结果。
//			返回：无
//==============================
Game_Temp.prototype.drill_COBa_preBallisticsRotate = function( obj_data, obj_index, orgRotation ){
	var data = this._drill_COBa_rotateData;
	
}




