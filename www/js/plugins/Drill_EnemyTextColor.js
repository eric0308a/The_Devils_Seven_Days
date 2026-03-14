//=============================================================================
// Drill_EnemyTextColor.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        UI - 敌人文本颜色
 * @author Drill_up
 *
 *
 * @param MOG-敌人指针是否变色
 * @type boolean
 * @on 变色
 * @off 不变色
 * @desc true - 变色，false - 不变色，敌人指针插件也会变色。
 * @default true
 *
 * @param BOSS框是否变色
 * @type boolean
 * @on 变色
 * @off 不变色
 * @desc true - 变色，false - 不变色，高级BOSS框插件也会变色。
 * @default true
 *
 * @param 消息窗口是否变色
 * @type boolean
 * @on 变色
 * @off 不变色
 * @desc true - 变色，false - 不变色，注意，该设置需要 战斗-窗口提示消息 插件才能生效。
 * @default true
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EnemyTextColor +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以任意设置敌人的文本颜色。
 * 如果想了解高级颜色设置方法，去看看"关于文本颜色.docx"。
 * ★★必须放在插件 MOG_BattleCursor 敌人指针 的后面★★
 * ★★必须放在插件 高级BOSS生命固定框 的后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用，必须基于核心。
 * 基于：
 *   - Drill_CoreOfColor 系统-颜色核心
 *     需要该核心才能修改颜色。
 * 作用于：
 *   - Drill_WindowLog 窗口提示消息 ★★[v1.3]及以上★★
 *     结合目标插件，可以使得战斗中的消息提示敌人名字变色。
 *    （消息窗口只支持数字颜色）
 *   - MOG_BattleCursor 敌人指针
 *     可以使得目标插件的指针文本变色。
 *   - MOG_BossHP boss生命固定框
 *     可以使得目标插件的boss框的文本变色。
 *   - Drill_GaugeForBoss 高级boss生命固定框 ★★[v1.1]及以上★★
 *     可以使得目标插件的boss框的文本变色。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面。
 *   作用于战斗界面和窗口界面中的敌人名字。
 * 2.目前不支持敌人图鉴的变色。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件：
 * 在要修改颜色的敌人设置中，添加注释即可：
 *
 * <颜色:1>
 * <颜色:#FF4444>
 *
 * <高级颜色:1>
 *
 * 颜色后面的数字1对应你配置中的第1个颜色。你也可以直接贴颜色代码。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 敌人颜色：
 * 如果你要改变敌人颜色，那么可以使用下面插件指令：
 * （冒号两边都有一个空格）
 * 
 * 插件指令（普通）：>文本颜色 : B : 敌人普通 : A1
 * 插件指令（高级）：>文本颜色 : B : 敌人高级 : A2
 * 
 * 参数A1：颜色编号
 *         也可以直接是颜色代码#ffffff（但是消息窗口只支持数字颜色）
 * 参数A2：高级颜色编号
 *         对应配置的高级渐变色的编号。
 * 参数B： 敌人id号
 *
 * 高级颜色和普通颜色设置可以相互覆盖，修改后永久有效。
 * 
 * 示例：
 * 插件指令：>文本颜色 : 1 : 敌人普通 : 1
 * 插件指令：>文本颜色 : 1 : 敌人普通 : #FF4444
 * （修改 1号敌人 为 颜色1红色，注意消息窗口只支持数字颜色）
 * 插件指令：>文本颜色 : 1 : 敌人普通 : #FFFFFF
 * （1号敌人文本变白色）
 * 插件指令：>文本颜色 : 5 : 敌人高级 : 1
 * （修改 5号敌人 为 高级颜色1白红渐变）
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 敌人颜色变量：
 * 如果你要使得与相关的变量进行绑定，使用插件指令：
 * （冒号两边都有一个空格）
 *
 * 插件指令（普通）：>变量文本颜色 : D : 敌人普通 : C1
 * 插件指令（高级）：>变量文本颜色 : D : 敌人高级 : C2
 * 
 * 参数C1：颜色变量编号
 * 参数C2：高级颜色变量编号
 * 参数D： 物品变量id号
 *
 * 示例：
 * >变量文本颜色 : 4 : 敌人普通 : 5
 * （修改编号为 变量4值 对应的敌人id，为 变量5值 对应的颜色编号）
 * 
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
 * 测试结果：   战斗界面的角色文本，消耗为：【5ms以下】
 *              地图界面的角色文本，消耗为：【5ms以下】
 *              菜单界面的角色文本，消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.单次执行的插件计算量都非常小，消耗可以完全不计。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得消息窗口中的颜色也会变化。
 * [v1.2]
 * 使得你可以通过插件指令来修改敌人的文本颜色。
 * [v1.3]
 * 使得你可以设置高级颜色渐变，并可以在对话窗口中使用高级颜色。
 * [v1.4]
 * 规范修改了插件指令设置。
 * [v1.5]
 * 优化了高级颜色在某些特殊情况下不起效果的问题。
 * [v1.6]
 * 添加了与高级bosshp插件相互扩展的功能。
 * [v1.7]
 * 与高级bosshp插件一同更新。
 * [v1.8]
 * 修改了内部结构。
 * [v1.9]
 * 分离了颜色核心。添加了插件性能说明。
 *
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		ETC (Enemy_Text_Color)
//		临时全局变量	DrillUp.g_ETC_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_ETC_xxx
//		全局存储变量	无
//		覆盖重写方法	Window_BattleEnemy.prototype.drawItem
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)
//		性能测试因素	菜单界面
//		性能测试消耗	目前未找到消耗值
//		最坏情况		暂无
//		备注			无
//
//插件记录：
//		★大体框架与功能如下：
//			敌人文本颜色：
//				->敌人指针
//				->boss框
//				->插件指令
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.敌人文本颜色中关联了 mog指针、bosshp，敌人选择窗口 。
//			2.Bitmap.drill_elements_drawText用于控制颜色渐变的位置修正。（目前不理解为啥bitmap绘制渐变时会产生brush偏移的情况。）
//
//		★存在的问题：
//			1.插件的作用域不是很稳定，如果有某部分的改动，则随时可能牵连其它插件一起升级。
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EnemyTextColor = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_EnemyTextColor');
    DrillUp.g_ETC_mogCursor = String(DrillUp.parameters['MOG-敌人指针是否变色'] || "true") === "true";
    DrillUp.g_ETC_mogBoss = String(DrillUp.parameters['BOSS框是否变色'] || "true") === "true";
    DrillUp.g_ETC_message = String(DrillUp.parameters['消息窗口是否变色'] || "true") === "true";
    //DrillUp.g_ETC_ebook = String(DrillUp.parameters['敌人图鉴是否变色'] || "true") === "true";

	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfColor ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_ETC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ETC_pluginCommand.call(this, command, args);
	if (command === '>文本颜色') {	// >文本颜色 : B : 敌人普通 : A1
		if(args.length == 6){
			var temp1 = Number(args[1]);
			var temp2 = String(args[5]);
			var type = String(args[3]);
			if( type == '敌人普通' ){
				if( temp2.slice(0,1) === "#" ){
					$gameSystem._drill_ETC_enemy[temp1] = temp2;
					$gameSystem._drill_ETC_enemyCount[temp1] = -1;
				}else{
					$gameSystem._drill_ETC_enemy[temp1] = String(DrillUp.drill_COC_getColor( Number(temp2) -1 )) ;
					$gameSystem._drill_ETC_enemyCount[temp1] = Number(temp2) ;
				}
			}
			if( type == '敌人高级' ){
				$gameSystem._drill_ETC_enemy[temp1] = String(DrillUp.drill_COC_getSeniorColor( Number(temp2) -1 )) ;
				$gameSystem._drill_ETC_enemyCount[temp1] = Number(temp2) + 100 ;
			}
		}
	}
	if (command === '>变量文本颜色') {
		if(args.length == 6){
			var temp1 = $gameVariables.value( Number(args[1]) ) ;
			var temp2 = $gameVariables.value( Number(args[5]) ) ;
			var type = String(args[3]);
			if( type == '敌人普通' ){
				$gameSystem._drill_ETC_enemy[temp1] = String(DrillUp.drill_COC_getColor( temp2-1 )) ;
				$gameSystem._drill_ETC_enemyCount[temp1] = Number(temp2) -1;
			}
			if( type == '敌人高级' ){
				$gameSystem._drill_ETC_enemy[temp1] = String(DrillUp.drill_COC_getSeniorColor( temp2-1 )) ;
				$gameSystem._drill_ETC_enemyCount[temp1] = Number(temp2) + 100 ;
			}
		}
	}
};
//=============================================================================
// ** 读取注释初始化
//=============================================================================
var _drill_ETC_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_ETC_initialize.call(this);
	this._drill_ETC_enemy = [];
	this._drill_ETC_enemyCount = [];
	for( var i = 0; i < $dataEnemies.length; i++ ){
		if( $dataEnemies[i] == null ){
			this._drill_ETC_enemy[i] = "";
			this._drill_ETC_enemyCount[i] = -1;
			continue;
		}
		var note = String($dataEnemies[i].note);
		var re_color = /<颜色:([^<>]*?)>/; 				//正则获取（返回数组，第二个为匹配内容）
		var color = (note.match(re_color)) || [];
		var re_colorG = /<高级颜色:([^<>]*?)>/; 	
		var colorG = (note.match(re_colorG)) || [];
		if(color != "" && color != [] ){
			if( color[1].slice(0,1) === "#" ){
				this._drill_ETC_enemy[i] = color;
				this._drill_ETC_enemyCount[i] = -1;
			}else{
				this._drill_ETC_enemy[i] = String(DrillUp.drill_COC_getColor( Number(color[1]) -1 )) ;
				this._drill_ETC_enemyCount[i] = Number(color[1]) ;	//(101开始)
			}
		}else if( colorG != "" && colorG != [] ){	//高级颜色编号
			this._drill_ETC_enemy[i] = DrillUp.drill_COC_getSeniorColor( Number(colorG[1]) -1 );
			this._drill_ETC_enemyCount[i] = Number(colorG[1]) + 100 ; //(201开始)
		}else{
			this._drill_ETC_enemy[i] = "";
			this._drill_ETC_enemyCount[i] = -1;
		}
	}
	//alert(JSON.stringify(this._drill_ETC_enemy));
};

//=============================================================================
// ** 覆写函数 （敌人选择窗口绘制）
//=============================================================================
Window_BattleEnemy.prototype.drawItem = function(index) {
	var color = $gameSystem._drill_ETC_enemy[index];
	if(color != ""){
		this.changeTextColor(color);
	}
    var name = this._enemies[index].name();
    var rect = this.itemRectForText(index);
    this.drawText(name, rect.x, rect.y, rect.width);
	this.resetTextColor();
};



//=============================================================================
// ** 与mog指针相适应
//=============================================================================
var _drill_ETC_mogCursor_refresh = BattleCursor.prototype.refresh_arrow_name;
BattleCursor.prototype.refresh_arrow_name = function(battler,sprite) {
	if(Imported.MOG_BattleCursor && DrillUp.g_ETC_mogCursor){
		//for(var a in battler){
		//	textb ="key:"+a+" value:"+ battler[a]+"\n";
		//	alert(textb);
		//}
		//battler._enemyId
		if( battler._enemyId ){
			var color = $gameSystem._drill_ETC_enemy[battler._enemyId];
			if(color != ""){
				sprite.bitmap.textColor = color;
			}
		}
		_drill_ETC_mogCursor_refresh.call(this,battler,sprite);
		sprite.bitmap.textColor = "#ffffff";
	}else{
		_drill_ETC_mogCursor_refresh.call(this,battler,sprite);
	}
};

//=============================================================================
// ** 与mog bosshp相适应
//=============================================================================
if( Imported.MOG_BossHP ){
	var _drill_ETC_mogBossHP_refresh = Sprite_BossHP.prototype.refresh_name;
	Sprite_BossHP.prototype.refresh_name = function() {
		
		if( DrillUp.g_ETC_mogBoss){
			if( this._battler ){
				var color = $gameSystem._drill_ETC_enemy[this._battler._enemyId];
				if(color != ""){
					this._name.bitmap.textColor = color;
				}
			}
			_drill_ETC_mogBossHP_refresh.call(this);
			this._name.bitmap.textColor = "#ffffff";
		}else{
			_drill_ETC_mogBossHP_refresh.call(this);
		}
	};
}
//=============================================================================
// ** 与 Drill_GaugeForBoss 相适应
//=============================================================================
if( Imported.Drill_GaugeForBoss ){
	var _drill_ETC_GFB_drawName = Drill_GFB_StyleSprite.prototype.drill_drawName;
	Drill_GFB_StyleSprite.prototype.drill_drawName = function() {
		
		if( DrillUp.g_ETC_mogBoss){
			var color = $gameSystem._drill_ETC_enemy[this._drill_enemy._enemyId];
			if( color != "" ){
				this._drill_name_sprite.bitmap.textColor = color;
			}
			_drill_ETC_GFB_drawName.call(this);
			this._drill_name_sprite.bitmap.textColor = "#ffffff";
		}else{
			_drill_ETC_GFB_drawName.call(this);
		}
	};
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EnemyTextColor = false;
		alert(
			"【Drill_EnemyTextColor.js UI-敌人文本颜色】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfColor 系统-颜色核心"
		);
}
