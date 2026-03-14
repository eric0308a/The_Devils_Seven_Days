//=============================================================================
// Drill_CoreOfWindowAuxiliary.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        系统 - 窗口辅助核心
 * @author Drill_up
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfWindowAuxiliary +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件为基础核心，单用没有任何效果。
 * ★★尽量放在最靠上的位置★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、地图界面、战斗界面。
 *   作用于rmmv所有窗口，添加辅助功能。
 * 2.插件提供窗口"移动动画"、"布局"的配置功能。
 *   对部分插件还提供表达式功能。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础插件，下列插件需要该核心才能运行：
 * 作用于：
 *   - Drill_CoreOfScreenRoller     系统 - 滚轴核心
 *   - Drill_SceneSelfplateA        面板 - 全自定义信息面板A
 *   - Drill_SceneSelfplateB        面板 - 全自定义信息面板B
 *   - Drill_SceneSelfplateC        面板 - 全自定义信息面板C
 *   - Drill_SceneSelfplateD        面板 - 全自定义信息面板D
 *   - Drill_SceneShop              面板 - 全自定义商店界面
 *   - Drill_SceneLimitedShop       面板 - 限量商店
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 表达式
 * 子插件的部分窗口中支持一些简单的表达式，如下：
 * （内容中的冒号为英文冒号。冒号之间没空格。）
 * 
 * <复制:2:文字>
 * <复制:\v[21]:文字>
 * 1.中间填2，表示内容复制2个，
 *   比如，"ii<复制:2:aaa>ii" = "iiaaaaaaii"
 * 2.中间填\v[21]变量，则会根据变量值，复制指定变量的数量。
 *   比如"<复制:\v[21]:#>"，#号将会被复制变量21的值的数量。
 *
 * <单选:21:结果A:结果B>
 * 1.数字表示开关id，如果开关为on，则会输出结果A，如果开关为off，则输
 *   出结果B。
 *
 * <分隔:0:1>
 * 1.中间的数字表示颜色数字，后面的数字表示分隔线厚度。
 *   比如"<分隔:0:1>"，整行会变成一条厚度为1，颜色为0（白色）的分隔线。
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
 * 工作类型：   单次执行 / 持续执行
 * 时间复杂度： o(n^4) / o(n^2)每帧
 * 测试方法1：  以正常流程进行游戏，记录参数消耗。
 * 测试结果1：  菜单界面，平均消耗为：【7.27ms】
 * 测试方法2：  以正常流程进行游戏，记录贴图消耗。
 * 测试结果2：  菜单界面，平均消耗为：【13.61ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.插件有单次执行的辅助功能，子插件的窗口进行内容刷新时，会调用
 *   该插件的函数，刷新所有内容会消耗部分量。
 * 3.插件还有持续执行的辅助功能，当窗口/贴图移动时，会产生一定的
 *   贴图处理的消耗量。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		COWA (Core_Of_Window_Auxiliary)
//		临时全局变量	无
//		临时局部变量	this._drill_COWA_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		单次执行
//		时间复杂度		o(n^4) 每帧
//		性能测试因素	来回切换选项、描述。
//		性能测试消耗	7.27ms(信息面板A)	8.35ms/13.61ms(限量商店)
//		最坏情况		暂无
//		备注			由于该插件恰好处于树根位置，300ms的贴图消耗会变成这个插件的消耗。
//
//插件记录：
//		★大体框架与功能如下：
//			窗口辅助核心：
//				绘制内容 DTLE 
//					->把指定的文字画在面板中
//					->固定行间距/自适应行间距
//					->表达式
//						->分割线
//						->重复字符
//						->对齐命令
//						->条件字符		x
//						->滤镜字符？
//				数据修改 CPD
//					->位置、高宽
//					->移动动画
//						->起点相对坐标/起点绝对坐标
//						->匀速移动/弹性移动/不移动
//					->布局设置
//						->默认皮肤/单张背景贴图/隐藏布局
//				贴图移动 SBM
//					->贴图移动动画
//					->窗口移动动画
//			
//		★核心接口说明：
//			1.整个核心提供多个功能【装饰函数集】。
//			  功能定制性很高，具体调用方法见函数。
//			2.主要作用域在【窗口 + 菜单界面的一些贴图】。
//			  用法在后面有详细说明，这里不赘述。
//
//		★存在的问题：
//			暂无
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfWindowAuxiliary = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfWindowAuxiliary');
	
	

//=============================================================================
// ** 绘制内容 DTLE
// **
// **		类型：装饰函数集
// **		功能：1.rmmv本体的函数：drawText(...) 单行绘制，不包括\i[2]图标等特殊字符
// **			    rmmv本体的函数：drawTextEx(...) 单行绘制，包括\i[2]图标等特殊字符
// **			  2.这里提供：drill_COWA_drawTextListEx(...) 多行绘制 + 特殊字符 + 表达式
// **		接口：单个函数：
// **			    window.drill_COWA_drawTextListEx( context_list, options );
// **		说明：1.调用接口时，注意画布的重建问题，重建与高宽有关系。
// **			  2.你需要了解函数的绘制流程，必要时，要断开部分函数，自己写绘制流程。
//=============================================================================
//==============================
// * DTLE - 开始绘制（接口，单次调用）
//
//			说明：Ex字符绘制。
//			参数：字符串列表，选项参数
//			返回：无
//==============================
Window_Base.prototype.drill_COWA_drawTextListEx = function( context_list, options ){
	
	// > 默认值
	options = this.drill_COWA_DTLE_checkOptions(options);
	
	// > 表达式 - 转义字符
	if( options['convertEnabled'] == true ){
		context_list = this.drill_COWA_convertEscapeCharacterInList( context_list );
	}
	
	// > 计算字符高宽
	this.drill_COWA_DTLE_calculateHeightAndWidth( context_list, options );
	
	// > 画布重建
    this.createContents();
    this.contents.clear();
	
	// > 开始绘制
	this.drill_COWA_DTLE_startDraw( context_list, options );
}
//==============================
// * DTLE - 默认值
//==============================
Window_Base.prototype.drill_COWA_DTLE_checkOptions = function( options ){
	if( options == undefined ){ options = {}; };
	if( options['convertEnabled'] == undefined ){ options['convertEnabled'] = true };		//表达式开关
	if( options['autoLineheight'] == undefined ){ options['autoLineheight'] = true };		//是否自适应行间距
	if( options['lineheight'] == undefined ){ options['lineheight'] = 28 };					//行间距
	if( options['align'] == undefined ){ options['align'] = "左对齐" };						//对齐方式
	return options;
}
//==============================
// * DTLE - 计算高宽
//
//			说明：返回每行内容的宽度和高度。
//			参数：字符串列表，选项参数
//			返回：高度列表 this.drill_COWA_heightList
//				  宽度列表 this.drill_COWA_widthList
//==============================
Window_Base.prototype.drill_COWA_DTLE_calculateHeightAndWidth = function( context_list, options ){
	var height_list = [];
	var width_list = [];
	for (var i=0; i < context_list.length; i++) {
		var temp_text = context_list[i];
		var textState = { 'index': 0, 'x': 0, 'y': 0, 'left': 0 };
		textState.text = this.convertEscapeCharacters( temp_text );
		var hh = this.calcTextHeight(textState, false);									//计算字符高度
		var ww = this.drawTextEx(textState.text,0,0) + this.standardPadding() * 2 ;		//计算字符宽度（只有画出来了才有值）
		height_list.push(hh);
		width_list.push(ww);
	}
	this.drill_COWA_heightList = height_list;
	this.drill_COWA_widthList = width_list;
}
//==============================
// * DTLE - 开始绘制
//
//			说明：绘制字符。
//			参数：字符串列表，选项参数
//			返回：无
//==============================
Window_Base.prototype.drill_COWA_DTLE_startDraw = function( context_list, options ){
	var xx = 0 ;
	var yy = 0 ;
	for (var i=0; i < context_list.length; i++) {
		var temp_text = context_list[i];
		
		// > 对齐方式
		xx = 0;
		if( options['align'] == "居中" ){
			xx = this.width/2 - this.drill_COWA_widthList[i]/2;
		}
		if( options['align'] == "右对齐" ){
			xx = this.width - this.drill_COWA_widthList[i];
		}
		
		// > 表达式 - 绘制字符
		if( this.drill_COWA_isMatchDrawCharacter( temp_text ) && options['convertEnabled'] ){
			this.drill_COWA_convertDrawCharacter( temp_text, yy );
		}else{
			this.drawTextEx(temp_text,xx,yy);
		}
		
		// > 划分行间距
		if( options['autoLineheight'] == true ){
			yy += this.drill_COWA_heightList[i];	//自适应行间距
		}else{
			yy += options['lineheight'];			//固定行间距
		}
	}
}

//==============================
// * DTLE - 表达式 - 转义字符
//
//			说明：只是将字符串转义，只影响字符。
//			参数：字符串列表
//			返回：字符串列表（转义后的）
//==============================
Window_Base.prototype.drill_COWA_convertEscapeCharacterInList = function( text_list ){
	var converted_list = [];
	for (var i=0; i < text_list.length; i++) {
		var temp_text = text_list[i];
		temp_text = this.drill_COWA_convertEscapeCharacter( temp_text );
		converted_list.push(temp_text);
	}
	return converted_list;
}
//==============================
// * DTLE - 表达式 - 转义字符
//
//			说明：只是将字符串转义，只影响字符。
//			参数：字符串
//			返回：字符串（转义后的）
//==============================
Window_Base.prototype.drill_COWA_convertEscapeCharacter = function( text ){
	var result_text = text;
	
	// > 复制内容
	var re_A = /<复[制]?:[^<>:]*:[^<>:]*>/g;		
	var re_ma_A = (result_text.match(re_A) || []);
	for( var i=0; i < re_ma_A.length; i++ ){		//同一行可能出现多个表达式
		var temp_org = String(re_ma_A[i]);
		var temp_str = String(re_ma_A[i]);
		temp_str = temp_str.replace("<","");
		temp_str = temp_str.replace(">","");
		var temp_list = temp_str.split(":");
		
		var result = "";
		var num = 0;
		var num_str = temp_list[1];
		if( num_str.slice(0,2) == "\\v" || num_str.slice(0,2) == "\\V" ){
			num = Number(num_str.slice(3,num_str.length-1));
			num = $gameVariables.value(num);
		}else{
			num = Number(temp_list[1]);
		}
		for(var j =0; j < num; j++){
			result += temp_list[2];
		}
		
		result_text = result_text.replace(temp_org,result);
	}
	
	// > 单选内容
	var re_B = /<单选:[^<>:]*:[^<>:]*:[^<>:]*>/g;		
	var re_ma_B = (result_text.match(re_B) || []);
	for( var i=0; i < re_ma_B.length; i++ ){		//同一行可能出现多个表达式
		var temp_org = String(re_ma_B[i]);
		var temp_str = String(re_ma_B[i]);
		temp_str = temp_str.replace("<","");
		temp_str = temp_str.replace(">","");
		var temp_list = temp_str.split(":");
		
		var result = "";
		var s_id = Number(temp_list[1]);
		if( $gameSwitches.value(s_id) ){
			result += temp_list[2];
		}else{
			result += temp_list[3];
		}
		
		result_text = result_text.replace(temp_org,result);
	}
	
	return result_text;
}
//==============================
// * DTLE - 表达式 - 绘制字符
// 
//			说明：这里的两个函数为【过程函数】，直接操作contents对象。
//==============================
Window_Base.prototype.drill_COWA_isMatchDrawCharacter = function( drawing_text ){
	if( drawing_text.match(/<分隔:[^<>:]*:[^<>:]*>/) ){ return true; }
	return false;
}
Window_Base.prototype.drill_COWA_convertDrawCharacter = function( drawing_text, yy ){
	
	// > 分隔符（分隔:颜色:厚度）
	var re_A = /<分隔:[^<>:]*:[^<>:]*>/g;		
	var re_ma_A = (drawing_text.match(re_A) || []);
	if( re_ma_A.length == 1 ){
		var temp_str = String(re_ma_A[0]);
		temp_str = temp_str.replace("<","");
		temp_str = temp_str.replace(">","");
		var temp_list = temp_str.split(":");
		
		//（固定出现该字符时将整行都绘制）
		this.contents.fillRect(4, yy + this.standardFontSize()/2 - Number(temp_list[2])/2 , this.width - 8, Number(temp_list[2]), this.textColor(temp_list[1]));
	}
	
}


//=============================================================================
// ** 窗口属性修改 CPD
// **
// **		类型：装饰函数集
// **		功能：建立窗口后，初始化参数的操作。【包含窗口与布局的标准属性设置】
// **			  直接初始化一个window容易被参数交联弄的晕头转向，
// **			  这里聚拢了接口与参数，方便统一控制。
// **		接口：初始化修改：
// **			    window.drill_COWA_drawTextListEx( context_list, options );
// **			  在scene中帧刷新：
// **			    this._xxx_window.drill_COWA_CPD_update();
// **			  重新移动：
// **				this._xxx_window.drill_COWA_CPD_resetMove();
// **		说明：1.执行修改方法后，contents将会被强制重建，你需要refresh内容。
// **			  2.必须要求scene亲自控制窗口的update。硬性规定。
//=============================================================================
//==============================
// * CPD - 修改窗口属性（接口，单次调用）
//			
//			说明：执行该方法后，contents将会被强制重建，你需要refresh内容。
//			参数：见默认值
//			返回：无
//==============================
Window_Base.prototype.drill_COWA_changeParamData = function( data ){
	
	// > 默认值
	data['enable'] = true;																//开关
	if( data['x'] == undefined ){ data['x'] = this.x };									//平移x
	if( data['y'] == undefined ){ data['y'] = this.y };									//平移y
	//if( data['opacity'] == undefined ){ data['opacity'] = 255 };						//透明度
	if( data['width'] == undefined ){ data['width'] = this.width };						//宽度
	if( data['height'] == undefined ){ data['height'] = this.height };					//高度
	if( data['fontsize'] == undefined ){ data['fontsize'] = this.standardFontSize(); };	//字体大小
	
	data['slideCur'] = 0;																//移动 - 当前时间
	if( data['slideDelay'] == undefined ){ data['slideDelay'] = 0 };					//移动 - 延迟
	if( data['slideTime'] == undefined ){ data['slideTime'] = 0 };						//移动 - 时长
	if( data['slideMoveType'] == undefined ){ data['slideMoveType'] = "匀速移动" };		//移动 - 移动类型（匀速移动/弹性移动/不移动）
	if( data['slidePosType'] == undefined ){ data['slidePosType'] = "相对坐标" };		//移动 - 起点-坐标类型（相对坐标/绝对坐标）
	if( data['slideX'] == undefined ){ data['slideX'] = 0 };							//移动 - 起点-相对坐标x
	if( data['slideY'] == undefined ){ data['slideY'] = 0 };							//移动 - 起点-相对坐标y
	if( data['slideAbsoluteX'] == undefined ){ data['slideAbsoluteX'] = 0 };			//移动 - 起点-绝对坐标x
	if( data['slideAbsoluteY'] == undefined ){ data['slideAbsoluteY'] = 0 };			//移动 - 起点-绝对坐标y
	
	if( data['layoutType'] == undefined ){ data['layoutType'] = "默认皮肤" };			//布局 - 布局类型（默认皮肤/单张背景贴图/隐藏布局）
	if( data['layoutSrc'] == undefined ){ data['layoutSrc'] = "" };						//布局 - 资源贴图
	if( data['layoutSrcFile'] == undefined ){ data['layoutSrcFile'] = "img/system/" };	//布局 - 资源文件夹
	if( data['layoutX'] == undefined ){ data['layoutX'] = 0 };							//布局 - 位置修正x
	if( data['layoutY'] == undefined ){ data['layoutY'] = 0 };							//布局 - 位置修正y
	
	// > 参数初始化
	this._drill_COWA_CPD_data = data;
	this.drill_COWA_CPD_initMove();			//初始化 - 移动属性 
	this.drill_COWA_CPD_initFrame();		//初始化 - 窗口高宽 
	this.drill_COWA_CPD_initLayout();		//初始化 - 贴图布局 
}
//==============================
// * CPD - 帧刷新（接口，实时调用）
//
//			说明：必须要求scene亲自控制update。（window可以自己update，但是这里是硬性规定）
//			参数：无
//			返回：无
//==============================
Window_Base.prototype.drill_COWA_CPD_update = function(){
	if( this._drill_COWA_CPD_data['enable'] == false ){ return; }

	this._drill_COWA_layer.visible = !this.isClosed();			//帧刷新 - 与 打开/关闭 的窗口透明度同步
	this._drill_COWA_layoutOpacity = this.openness;				//
	
	this.drill_COWA_CPD_updateMove();							//帧刷新 - 移动属性 
}
//==============================
// * CPD - 移动属性 - 重新移动（接口，单次调用）
//
//			说明：使得透明度/移动的功能重新播放一遍。
//			参数：无
//			返回：无
//==============================
Window_Base.prototype.drill_COWA_CPD_resetMove = function(){
	var data = this._drill_COWA_CPD_data;
	if( data['slideMoveType'] == "不移动" ){ return; }
	
	data['slideCur'] = 0;
	this.contentsOpacity = 0;
	this._drill_COWA_frameOpacity = 0;
	this._drill_COWA_layoutOpacity = 0;
}
//==============================
// * CPD - 初始化
//==============================
var _drill_COWA_CPD_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height){
	_drill_COWA_CPD_initialize.call(this, x, y, width, height);
	this._drill_COWA_CPD_data = {};
	this._drill_COWA_CPD_data['enable'] = false;
}
//==============================
// * CPD - 底层部件
//==============================
var _drill_COWA_CPD__createAllParts = Window_Base.prototype._createAllParts;
Window_Base.prototype._createAllParts = function() {
	this._drill_COWA_layer = new Sprite();			//背景层（窗口最底层）
	this.addChild( this._drill_COWA_layer );
	_drill_COWA_CPD__createAllParts.call(this);
}
//==============================
// * CPD - 移动属性 - 初始化
//==============================
Window_Base.prototype.drill_COWA_CPD_initMove = function(){
	var data = this._drill_COWA_CPD_data;
	
	if( data['slidePosType'] == "相对坐标" ){
		this.x = data['x'] + data['slideX'];
		this.y = data['y'] + data['slideY'];
	}
	if( data['slidePosType'] == "绝对坐标" ){
		this.x = data['slideAbsoluteX'];
		this.y = data['slideAbsoluteY'];
	}
	if( data['slideMoveType'] == "不移动" ){
		this.x = data['x'];
		this.y = data['y'];
	}
}
//==============================
// * CPD - 移动属性 - 帧刷新
//==============================
Window_Base.prototype.drill_COWA_CPD_updateMove = function(){
	var data = this._drill_COWA_CPD_data;
	
	// > 时间控制
	data['slideDelay'] -= 1;
	if( data['slideDelay'] >= 0 ){ this.drill_COWA_CPD_resetMove(); return; }
	data['slideCur'] += 1;
	if( data['slideCur'] > data['slideTime'] ){ return; }
	if( data['slideMoveType'] == "不移动" ){ return; }
	
	// > 移动
	var xx = data['x'];
	var yy = data['y'];
	var dx = 0;
	var dy = 0;
	if( data['slidePosType'] == "相对坐标" ){
		dx = data['slideX'];
		dy = data['slideY'];
	}
	if( data['slidePosType'] == "绝对坐标" ){
		dx = data['slideAbsoluteX'] - data['x'];	//窗口的上层一般直接为scene，所以绝对坐标不会被叠加。
		dy = data['slideAbsoluteY'] - data['y'];
	}
	if( data['slideMoveType'] == "匀速移动" ){
		xx += dx - dx / data['slideTime'] * data['slideCur'];
		yy += dy - dy / data['slideTime'] * data['slideCur'];
	}
	if( data['slideMoveType'] == "弹性移动" ){		//r = 1/2*a*t^2
		var ax = 2 * dx / data['slideTime'] / data['slideTime'];
		var ay = 2 * dy / data['slideTime'] / data['slideTime'];
		var c_time = data['slideTime'] - data['slideCur'];
		xx += 0.5 * ax * c_time * c_time ;
		yy += 0.5 * ay * c_time * c_time ;
	}
	if( data['slideCur'] == data['slideTime'] ){	//最后一刻锁定坐标位置
		xx = data['x'];
		yy = data['y'];
	}
	this.x = xx;
	this.y = yy;
	
	
	// > 透明度
	if( data['layoutType'] == "默认皮肤" ){ 
		this.contentsOpacity = 255 / data['slideTime'] * data['slideCur'];
		this._drill_COWA_frameOpacity = 255 / data['slideTime'] * data['slideCur'];
		this._drill_COWA_layoutOpacity = 0;
	}
	if( data['layoutType'] == "单张背景贴图" ){ 
		this.contentsOpacity = 255 / data['slideTime'] * data['slideCur'];
		this._drill_COWA_frameOpacity = 0;
		this._drill_COWA_layoutOpacity = 255 / data['slideTime'] * data['slideCur'];
	}
	if( data['layoutType'] == "隐藏布局" ){ 
		this.contentsOpacity = 255 / data['slideTime'] * data['slideCur'];
		this._drill_COWA_frameOpacity = 0;
		this._drill_COWA_layoutOpacity = 0;
	}
}
//==============================
// * CPD - 窗口高宽 - 初始化
//==============================
Window_Base.prototype.drill_COWA_CPD_initFrame = function(){
	var data = this._drill_COWA_CPD_data;
	this.width = data['width'];
	this.height = data['height'];
	this.standardFontSize = function(){ return this._drill_COWA_CPD_data['fontsize']; }
	
	this.createContents();	//重刷画布
}
//==============================
// * CPD - 贴图布局 - 初始化
//==============================
Window_Base.prototype.drill_COWA_CPD_initLayout = function(){
	var data = this._drill_COWA_CPD_data;
	
	var temp_sprite = new Sprite();
	if( data['layoutType'] == "单张背景贴图" ){ 
		temp_sprite.bitmap = ImageManager.loadBitmap( data['layoutSrcFile'], data['layoutSrc'], 0, true);
	}
	temp_sprite.x = data['layoutX'];
	temp_sprite.y = data['layoutY'];
	this._drill_COWA_backSprite = temp_sprite ;
	this._drill_COWA_layer.addChild( temp_sprite );
	
	// > 透明度
	if( data['layoutType'] == "默认皮肤" ){ 
		this.contentsOpacity = 255;
		this._drill_COWA_frameOpacity = 255;
		this._drill_COWA_layoutOpacity = 0;
	}
	if( data['layoutType'] == "单张背景贴图" ){ 
		this.contentsOpacity = 255;
		this._drill_COWA_frameOpacity = 0;
		this._drill_COWA_layoutOpacity = 255;
	}
	if( data['layoutType'] == "隐藏布局" ){ 
		this.contentsOpacity = 255;
		this._drill_COWA_frameOpacity = 0;
		this._drill_COWA_layoutOpacity = 0;
	}
}
//==============================
// * CPD - 透明属性 - 布局透明定义
//==============================
Object.defineProperty(Window_Base.prototype, '_drill_COWA_layoutOpacity', {
    get: function() {
        return this._drill_COWA_layer.alpha * 255;
    },
    set: function(value) {
        this._drill_COWA_layer.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});
//==============================
// * CPD - 透明属性 - 窗口框架透明定义
//==============================
Object.defineProperty(Window.prototype, '_drill_COWA_frameOpacity', {	//这部分其实已经被rmmv定义为"opacity"
    get: function() {													//但为了防止概念混淆，这里重新定义一次
        return this._windowSpriteContainer.alpha * 255;
    },
    set: function(value) {
        this._windowSpriteContainer.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});



//=============================================================================
// ** 贴图移动动画 SBM
// **
// **		类型：装饰函数集
// **		功能：对菜单界面贴图的一些简单平移移动属性（菜单界面专用）。
// **			  注意，菜单界面专用，其它界面的去找 弹道核心-两点式 。
// **		接口：移动初始化：
// **			    sprite.drill_COWA_setButtonMove( data );
// **			  重新移动：
// **				sprite.drill_COWA_SBM_resetMove();
// **		说明：1.函数只控制x和y，不控制透明度。
// **			  2.贴图会自动update。
// **			  3.函数原本是给按钮贴图专用，但是后来由于都有共性，于是就开放定义了。
// **			    但是仍然仅限 菜单界面 用。
//=============================================================================
//==============================
// * SBM - 移动初始化（接口，单次调用）
//
//			说明：正在移动时，xy的值会被套牢。移动结束后解套。
//			参数：见默认值
//			返回：无
//==============================
Sprite.prototype.drill_COWA_setButtonMove = function( data ){
	
	// > 默认值
	data['enable'] = true;																//开关
	if( data['x'] == undefined ){ data['x'] = this.x };									//平移x
	if( data['y'] == undefined ){ data['y'] = this.y };									//平移y
	//if( data['opacity'] == undefined ){ data['opacity'] = 255 };						//透明度
	
	data['slideCur'] = 0;																//移动 - 当前时间
	if( data['slideDelay'] == undefined ){ data['slideDelay'] = 0 };					//移动 - 延迟
	if( data['slideTime'] == undefined ){ data['slideTime'] = 0 };						//移动 - 时长
	if( data['slideMoveType'] == undefined ){ data['slideMoveType'] = "匀速移动" };		//移动 - 移动类型（匀速移动/弹性移动/不移动）
	if( data['slidePosType'] == undefined ){ data['slidePosType'] = "相对坐标" };		//移动 - 起点-坐标类型（相对坐标/绝对坐标）
	if( data['slideX'] == undefined ){ data['slideX'] = 0 };							//移动 - 起点-相对坐标x
	if( data['slideY'] == undefined ){ data['slideY'] = 0 };							//移动 - 起点-相对坐标y
	if( data['slideAbsoluteX'] == undefined ){ data['slideAbsoluteX'] = 0 };			//移动 - 起点-绝对坐标x
	if( data['slideAbsoluteY'] == undefined ){ data['slideAbsoluteY'] = 0 };			//移动 - 起点-绝对坐标y
	
	this._drill_COWA_SBM_data = data;
	this.drill_COWA_SBM_initMove();		//初始化 - 移动属性 
}
//==============================
// * SBM - 移动属性 - 重新移动（接口，单次调用）
//
//			说明：使得透明度/移动的功能重新播放一遍。
//==============================
Sprite.prototype.drill_COWA_SBM_resetMove = function(){
	var data = this._drill_COWA_SBM_data;
	if( data['slideMoveType'] == "不移动" ){ return; }
	
	data['slideCur'] = 0;
	this.drill_COWA_SBM_initMove();
	//（按钮不控制透明度）
}
//==============================
// * SBM - 初始化
//==============================
var _drill_COWA_SBM_initialize = Sprite.prototype.initialize;
Sprite.prototype.initialize = function(bitmap){
	_drill_COWA_SBM_initialize.call(this, bitmap);
	this._drill_COWA_SBM_data = {};
	this._drill_COWA_SBM_data['enable'] = false;
}
//==============================
// * SBM - 帧刷新
//==============================
var _drill_COWA_SBM_update = Sprite.prototype.update;
Sprite.prototype.update = function(){
	_drill_COWA_SBM_update.call(this);
	if( this._drill_COWA_SBM_data['enable'] == false ){ return; }
	
	this.drill_COWA_SBM_updateMove();	//帧刷新 - 移动属性 
}
//==============================
// * SBM - 移动属性 - 初始化
//==============================
Sprite.prototype.drill_COWA_SBM_initMove = function(){
	var data = this._drill_COWA_SBM_data;
	
	if( data['slidePosType'] == "相对坐标" ){
		this.x = data['x'] + data['slideX'];
		this.y = data['y'] + data['slideY'];
	}
	if( data['slidePosType'] == "绝对坐标" ){
		this.x = data['slideAbsoluteX'];
		this.y = data['slideAbsoluteY'];
	}
	if( data['slideMoveType'] == "不移动" ){
		this.x = data['x'];
		this.y = data['y'];
		//（按钮不控制透明度）
	}
}
//==============================
// * SBM - 移动属性 - 帧刷新
//==============================
Sprite.prototype.drill_COWA_SBM_updateMove = function(){
	var data = this._drill_COWA_SBM_data;
	
	// > 时间控制
	data['slideDelay'] -= 1;
	if( data['slideDelay'] >= 0 ){ return; }
	data['slideCur'] += 1;
	if( data['slideCur'] > data['slideTime'] ){ return; }
	if( data['slideMoveType'] == "不移动" ){ return; }
	
	// > 移动
	var xx = data['x'];
	var yy = data['y'];
	var dx = 0;
	var dy = 0;
	if( data['slidePosType'] == "相对坐标" ){
		dx = data['slideX'];
		dy = data['slideY'];
	}
	if( data['slidePosType'] == "绝对坐标" ){
		dx = data['slideAbsoluteX'] - data['x'];	//窗口的上层一般直接为scene，所以绝对坐标不会被叠加。
		dy = data['slideAbsoluteY'] - data['y'];
	}
	if( data['slideMoveType'] == "匀速移动" ){
		xx += dx - dx / data['slideTime'] * data['slideCur'];
		yy += dy - dy / data['slideTime'] * data['slideCur'];
	}
	if( data['slideMoveType'] == "弹性移动" ){		//r = 1/2*a*t^2
		var ax = 2 * dx / data['slideTime'] / data['slideTime'];
		var ay = 2 * dy / data['slideTime'] / data['slideTime'];
		var c_time = data['slideTime'] - data['slideCur'];
		xx += 0.5 * ax * c_time * c_time ;
		yy += 0.5 * ay * c_time * c_time ;
	}
	if( data['slideCur'] == data['slideTime'] ){	//最后一刻锁定坐标位置
		xx = data['x'];
		yy = data['y'];
	}
	this.x = xx;
	this.y = yy;
	
	// > 透明度
	//	（按钮不控制透明度）
}

//=============================================================================
// ** 窗口移动动画 SBM
// **
// **		类型：装饰函数集
// **		功能：对菜单界面窗口的一些简单平移移动属性（菜单界面专用）。
// **			  注意，菜单界面专用，其它界面的去找 弹道核心-两点式 。
// **		接口：移动初始化：
// **			    window.drill_COWA_setButtonMove( data );
// **			  在scene中帧刷新：
// **			    this._xxx_window.drill_COWA_SBM_update();
// **			  重新移动：
// **				window.drill_COWA_SBM_resetMove();
// **		说明：1.函数只控制x和y，不控制透明度。
// **			  2.必须要求scene亲自控制窗口的update。硬性规定。
//=============================================================================
//==============================
// * 窗口SBM - 初始化
//
//			说明：正在移动时，xy的值会被套牢。移动结束后解套。
//			参数：见默认值
//			返回：无
//==============================
var _drill_COWA_SBM_w_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height){
	_drill_COWA_SBM_w_initialize.call(this, x, y, width, height);
	this._drill_COWA_SBM_data = {};
	this._drill_COWA_SBM_data['enable'] = false;
}
//==============================
// * 窗口SBM - 帧刷新（接口，实时调用）
//
//			说明：必须要求scene亲自控制update。（window的update只对激活的窗口有效）
//==============================
Window_Base.prototype.drill_COWA_SBM_update = function(){
	if( this._drill_COWA_SBM_data['enable'] == false ){ return; }
	
	this.drill_COWA_SBM_updateMove();	//帧刷新 - 移动属性 
}
//==============================
// * 窗口SBM - 相似方法
//==============================
Window_Base.prototype.drill_COWA_setButtonMove = Sprite.prototype.drill_COWA_setButtonMove;
Window_Base.prototype.drill_COWA_SBM_resetMove = Sprite.prototype.drill_COWA_SBM_resetMove;
Window_Base.prototype.drill_COWA_SBM_initMove = Sprite.prototype.drill_COWA_SBM_initMove;
Window_Base.prototype.drill_COWA_SBM_updateMove = Sprite.prototype.drill_COWA_SBM_updateMove;


