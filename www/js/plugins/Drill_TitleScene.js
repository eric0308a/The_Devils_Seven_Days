//=============================================================================
// Drill_TitleScene.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        标题 - 全自定义标题界面
 * @author Drill_up
 * 
 * @Drill_LE_param "布局样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_TSc_style_list_length"
 * 
 * @Drill_LE_param "背景音乐-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_TSc_bgm_list_length"
 * 
 * @help
 * =============================================================================
 * +++ Drill_TitleScene +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全自定义的标题界面。
 * ★★最好放在所有 标题类 插件的最后面★★
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件不能单独使用，必须基于 窗口辅助核心 插件。
 * 基于：
 *   - Drill_CoreOfWindowAuxiliary 系统 - 窗口辅助核心
 *     必须基于该插件才能显示描述内容。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于标题界面。
 * 2.该面板属于菜单面板，可以被标题背景、标题魔法圈等插件作用到。
 *   该面板关键字为：Scene_Title
 * 结构：
 *   (1.插件包含：1个标题贴图 + 1个选项窗口
 *      该插件只控制标题界面的功能部件。
 *   (2.窗口的布局规划没有限制，你可以去看看"窗口与布局.docx"。
 *      更多内容可以去看看"关于全自定义标题界面.docx"。
 * 全局存储：
 *   (1.该插件控制的背景音乐/布局样式编号将存储在全局文件中。
 *      如果游戏中修改了编号，则永久有效，不保存也有效。
 *   (2.更多详细介绍，去看看"关于全局存储.docx"。
 * 去掉标题界面：
 *   (1.如果你的游戏一开始就不想要标题界面，可以在参数中设置直接
 *      去掉标题界面。
 *   (2.去掉界面后，将切断下面两个路线：
 *      启动界面 -> 标题界面 -> 新游戏
 *      游戏结束界面 -> 标题界面 -> 退出游戏
 *   (3.你需要去 数据库>用语 中修改"回到标题"的字符串。 
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles1
 * 先确保项目img文件夹下是否有titles1文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 布局样式-1 资源-贴图
 * 布局样式-2 资源-贴图
 * 布局样式-3 资源-贴图
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以修改选项窗口的布局设置：
 * 
 * 插件指令：>标题界面 : 修改布局样式 : 样式[1]
 * 插件指令：>标题界面 : 修改背景音乐 : 音乐[1]
 *
 * 1."样式[1]"对应配置的样式的编号。
 * 2.注意，插件指令做出的改变是全局的。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 规范了插件指令格式。
 * [v1.2]
 * 该插件是"Drill_TitleWindow 标题窗口"的重写版本。
 * 重新编写了插件结构，并添加了去掉标题的功能。
 * 
 * 
 * @param ----杂项----
 * @default 
 *
 * @param 是否直接去掉标题界面
 * @parent ----杂项----
 * @type boolean
 * @on 跳过
 * @off 不跳过
 * @desc true - 跳过，false - 不跳过，进入游戏后，不会进入标题界面。
 * @default false
 *
 * @param 是否添加退出选项
 * @parent ----杂项----
 * @type boolean
 * @on 添加
 * @off 不添加
 * @desc true - 添加，false - 不添加
 * @default true
 *
 * @param 用语-退出选项
 * @parent ----杂项----
 * @desc 退出选项的用语显示文本。（新游戏、继续等其他选项，在 数据库>用语 中设置。）
 * @default 退出
 * 
 * @param ----标题贴图----
 * @default 
 *
 * @param 是否显示标题文字
 * @parent ----标题贴图----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 标题文字 X
 * @parent ----标题贴图----
 * @desc x轴方向平移，单位像素。0为文字中心贴在正中间。（可为负数）
 * @default 0
 *
 * @param 标题文字 Y
 * @parent ----标题贴图----
 * @desc y轴方向平移，单位像素。0为文字中心贴在最上面。
 * @default 156
 *
 * @param 标题文字字体大小
 * @parent ----标题贴图----
 * @type number
 * @min 1
 * @desc 标题文字的字体大小。
 * @default 72
 *
 * @param 标题文字描边厚度
 * @parent ----标题贴图----
 * @type number
 * @min 0
 * @desc 标题文字的描黑边的厚度，单位像素。
 * @default 8
 *  
 *
 * @param ----选项窗口----
 * @default 
 * 
 * @param 选项窗口 X
 * @parent ----选项窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 270
 *
 * @param 选项窗口 Y
 * @parent ----选项窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 285
 *
 * @param 选项窗口宽度
 * @parent ----选项窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 270
 *
 * @param 选项窗口高度
 * @parent ----选项窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和布局图片的宽高没有任何关系。
 * @default 320
 *
 * @param 选项窗口列数
 * @parent ----选项窗口----
 * @type number
 * @min 1
 * @desc 选项窗口的列数。
 * @default 1
 *
 * @param 选项对齐方式
 * @parent ----选项窗口----
 * @type select
 * @option 左对齐
 * @value left
 * @option 居中
 * @value center
 * @option 右对齐
 * @value right
 * @desc 选项文本的对齐方式，left - 左对齐，center - 居中，right - 右对齐。
 * @default center
 *
 * @param 选项窗口字体大小
 * @parent ----选项窗口----
 * @type number
 * @min 1
 * @desc 选项窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 选项窗口移动动画
 * @parent ----选项窗口----
 * @type struct<DrillWindowMoving>
 * @desc 窗口会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"45","移动延迟":"10","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"60","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 *
 * @param 选项窗口初始布局样式
 * @parent ----选项窗口----
 * @type number
 * @min 1
 * @desc 选项窗口使用的布局样式。
 * @default 1
 * 
 * @param 布局样式-1
 * @parent ----选项窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default {"布局类型":"默认皮肤","---单张背景贴图---":"","资源-贴图":"","贴图位置修正 X":"0","贴图位置修正 Y":"0"}
 *
 * @param 布局样式-2
 * @parent ----选项窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-3
 * @parent ----选项窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-4
 * @parent ----选项窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-5
 * @parent ----选项窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-6
 * @parent ----选项窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-7
 * @parent ----选项窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-8
 * @parent ----选项窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-9
 * @parent ----选项窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * @param 布局样式-10
 * @parent ----选项窗口----
 * @type struct<DrillWindowLayout>
 * @desc 控制窗口框架与窗口背景。
 * @default 
 * 
 * 
 * @param ----背景音乐----
 * @default
 *
 * @param 初始播放的音乐
 * @parent ----背景音乐----
 * @type number
 * @min 1
 * @desc 第一次进入标题界面时，播放的音乐的id。
 * @default 1
 *
 * @param 背景音乐-1
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-2
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-3
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-4
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-5
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-6
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-7
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-8
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-9
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-10
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-11
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-12
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-13
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-14
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-15
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-16
 * @parent ----背景音乐----
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * 
 */
/*~struct~DrillWindowMoving:
 *
 * @param 移动类型
 * @type select
 * @option 匀速移动
 * @value 匀速移动
 * @option 弹性移动
 * @value 弹性移动
 * @option 不移动
 * @value 不移动
 * @desc 初始的移动方式。
 * @default 匀速移动
 *
 * @param 移动时长
 * @type number
 * @min 1
 * @desc 起点位置回到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 移动延迟
 * @type number
 * @min 0
 * @desc 开始移动前的等待时间，单位帧。（1秒60帧）
 * @default 0
 *
 * @param ---起点---
 * @default 
 *
 * @param 坐标类型
 * @parent ---起点---
 * @type select
 * @option 相对坐标
 * @value 相对坐标
 * @option 绝对坐标
 * @value 绝对坐标
 * @desc 起点的坐标类型。
 * @default 相对坐标
 *
 * @param 起点-相对坐标 X
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向右，正数向左，单位像素。
 * @default 100
 * 
 * @param 起点-相对坐标 Y
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向上，正数向下，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 X
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最左边，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 Y
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最上面，单位像素。
 * @default 0
 * 
 */
/*~struct~DrillWindowLayout:
 *
 * @param 布局类型
 * @type select
 * @option 默认皮肤
 * @value 默认皮肤
 * @option 单张背景贴图
 * @value 单张背景贴图
 * @option 隐藏布局
 * @value 隐藏布局
 * @desc 窗口布局的类型。
 * @default 单张背景贴图
 *
 * @param ---单张背景贴图---
 * @default 
 *
 * @param 资源-贴图
 * @parent ---单张背景贴图---
 * @desc 窗口的背景贴图的资源。
 * @default 背景贴图
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 贴图位置修正 X
 * @parent ---单张背景贴图---
 * @desc 修正图片的位置用。以窗口的点为基准，负数向右，正数向左，单位像素。
 * @default 0
 *
 * @param 贴图位置修正 Y
 * @parent ---单张背景贴图---
 * @desc 修正图片的位置用。以窗口的点为基准，负数向上，正数向下，单位像素。
 * @default 0
 *
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		TSc (Title_Scene)
//		临时全局变量	DrillUp.g_TSc_xxx
//		临时局部变量	this._drill_TSc_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_TSc_styleId
//		覆盖重写方法	Scene_Title.prototype.drawGameTitle
//						Scene_Title.prototype.createCommandWindow
//						Scene_Title.prototype.playTitleMusic
//
//插件记录：
//		★大体框架与功能如下：
//			标题界面：
//				->退出选项
//				->跳过标题界面
//				->选项窗口
//				->背景音乐
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.本来打算把标题变成图片按钮的，但是由于各个插件都可以添加到标题，
//				复杂度太高，干脆还是保持原来的窗口模式。
//
//		★存在的问题：
//			暂无
//
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_TitleScene = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleScene');
	
	/*-----------------杂项------------------*/
	DrillUp.g_TSc_quit_option = String(DrillUp.parameters['是否添加退出选项'] || "true") === "true";
	DrillUp.g_TSc_quit_text = String(DrillUp.parameters['用语-退出选项'] || "退出");
	DrillUp.g_TSc_skip = String(DrillUp.parameters['是否直接去掉标题界面'] || "false") === "true";
	
	/*-----------------标题贴图------------------*/
	DrillUp.g_TSc_text_visible = String(DrillUp.parameters['是否显示标题文字'] || "true") === "true";	
	DrillUp.g_TSc_text_x = Number(DrillUp.parameters['标题文字 X'] || 30);
	DrillUp.g_TSc_text_y = Number(DrillUp.parameters['标题文字 Y'] || 120);
	DrillUp.g_TSc_text_fontsize = Number(DrillUp.parameters['标题文字字体大小'] || 72);
	DrillUp.g_TSc_text_outlineWidth = Number(DrillUp.parameters['标题文字描边厚度'] || 8);
	
	/*-----------------选项窗口------------------*/
	DrillUp.g_TSc_selWin_x = Number(DrillUp.parameters['选项窗口 X'] || 30);
	DrillUp.g_TSc_selWin_y = Number(DrillUp.parameters['选项窗口 Y'] || 120);
	DrillUp.g_TSc_selWin_width = Number(DrillUp.parameters['选项窗口宽度'] || 220);
	DrillUp.g_TSc_selWin_height = Number(DrillUp.parameters['选项窗口高度'] || 460);
	DrillUp.g_TSc_selWin_fontsize = Number(DrillUp.parameters['选项窗口字体大小'] || 22);
	DrillUp.g_TSc_selWin_col = Number(DrillUp.parameters['选项窗口列数'] || 1);
	DrillUp.g_TSc_selWin_align = String(DrillUp.parameters['选项对齐方式'] || "center");
	if( DrillUp.parameters['选项窗口移动动画'] != undefined && 
		DrillUp.parameters['选项窗口移动动画'] != "" ){
		DrillUp.g_TSc_selWin_slideAnim = JSON.parse( DrillUp.parameters['选项窗口移动动画'] );
		DrillUp.g_TSc_selWin_slideAnim['slideMoveType'] = String(DrillUp.g_TSc_selWin_slideAnim['移动类型'] || "匀速移动");
		DrillUp.g_TSc_selWin_slideAnim['slideTime'] = Number(DrillUp.g_TSc_selWin_slideAnim['移动时长'] || 20);
		DrillUp.g_TSc_selWin_slideAnim['slideDelay'] = Number(DrillUp.g_TSc_selWin_slideAnim['移动延迟'] || 0);
		DrillUp.g_TSc_selWin_slideAnim['slidePosType'] = String(DrillUp.g_TSc_selWin_slideAnim['坐标类型'] || "相对坐标");
		DrillUp.g_TSc_selWin_slideAnim['slideX'] = Number(DrillUp.g_TSc_selWin_slideAnim['起点-相对坐标 X'] || -100);
		DrillUp.g_TSc_selWin_slideAnim['slideY'] = Number(DrillUp.g_TSc_selWin_slideAnim['起点-相对坐标 Y'] || 0);
		DrillUp.g_TSc_selWin_slideAnim['slideAbsoluteX'] = Number(DrillUp.g_TSc_selWin_slideAnim['起点-绝对坐标 X'] || 0);
		DrillUp.g_TSc_selWin_slideAnim['slideAbsoluteY'] = Number(DrillUp.g_TSc_selWin_slideAnim['起点-绝对坐标 Y'] || 0);
	}else{
		DrillUp.g_TSc_selWin_slideAnim = {};
	}
	DrillUp.g_TSc_selWin_styleId = Number(DrillUp.parameters['选项窗口初始布局样式'] || 1);
	DrillUp.g_TSc_style_list_length = 10;
	DrillUp.g_TSc_style_list = [];
	for (var i = 0; i < DrillUp.g_TSc_style_list_length ; i++ ) {
		if( DrillUp.parameters['布局样式-'+String(i+1)] != undefined &&
			DrillUp.parameters['布局样式-'+String(i+1)] != "" ){
			DrillUp.g_TSc_style_list[i] = JSON.parse( DrillUp.parameters['布局样式-' + String(i+1)] );
			DrillUp.g_TSc_style_list[i]['layoutType'] = String(DrillUp.g_TSc_style_list[i]['布局类型'] || "默认皮肤");
			DrillUp.g_TSc_style_list[i]['layoutSrc'] = String(DrillUp.g_TSc_style_list[i]['资源-贴图'] || "");
			DrillUp.g_TSc_style_list[i]['layoutSrcFile'] = "img/titles1/";
			DrillUp.g_TSc_style_list[i]['layoutX'] = Number(DrillUp.g_TSc_style_list[i]['贴图位置修正 X'] || -100);
			DrillUp.g_TSc_style_list[i]['layoutY'] = Number(DrillUp.g_TSc_style_list[i]['贴图位置修正 Y'] || 0);
		}else{
			DrillUp.g_TSc_style_list[i] = {};
		}
	};
	
	/*------------------背景音乐-------------------*/
	DrillUp.g_TSc_bgmId = Number(DrillUp.parameters['初始播放的音乐'] || 1);
	DrillUp.g_TSc_bgm_list_length = 16;
	DrillUp.g_TSc_bgm_list= [];
	for (var i = 0; i < DrillUp.g_TSc_bgm_list_length; i++) {
		DrillUp.g_TSc_bgm_list[i] = String(DrillUp.parameters['背景音乐-' + String(i + 1)] || "");
	};
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowAuxiliary ){
	
	
	
//=============================================================================
// ** 全局
//=============================================================================
//==============================
// * 全局 - 读取
//==============================
	var _drill_global = DataManager.loadGlobalInfo();
	if( !DrillUp.global_TSc_styleId ){	//游戏没关情况
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_TSc_styleId"] ){		//游戏关闭后，重开读取global中的配置
			DrillUp.global_TSc_styleId = _drill_global[0]["_global_TSc_styleId"];
		}else{
			DrillUp.global_TSc_styleId = DrillUp.g_TSc_selWin_styleId - 1;
		}
	}
	if( !DrillUp.global_TSc_bgmId ){
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_TSc_bgmId"] ){
			DrillUp.global_TSc_bgmId = _drill_global[0]["_global_TSc_bgmId"];
		}else{
			DrillUp.global_TSc_bgmId = DrillUp.g_TSc_bgmId - 1;
		}
	}
//==============================
// * 全局 - 存储
//==============================
var _drill_TSc_saveGlobal = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function(info) {	//第0个存档为全局存档
	if(!info[0]){info[0] = []};
	info[0]["_global_TSc_styleId"] = DrillUp.global_TSc_styleId;
	info[0]["_global_TSc_bgmId"] = DrillUp.global_TSc_bgmId;
	_drill_TSc_saveGlobal.call(this,info);
};
DataManager.forceSaveGlobalInfo = function() {		//强制存储（任何改变的全局变量的地方都需要调用该方法）
	var globalInfo = this.loadGlobalInfo() || [];
	globalInfo[0] = this.makeSavefileInfo();
	this.saveGlobalInfo(globalInfo);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_TSc_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_TSc_pluginCommand.call(this, command, args);
	if( command === ">标题界面" || command === ">标题窗口") {
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type === "修改布局样式" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				DrillUp.global_TSc_styleId = Number(temp1) - 1;
				DataManager.forceSaveGlobalInfo();
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type === "修改背景音乐" ){
				temp1 = temp1.replace("音乐[","");
				temp1 = temp1.replace("]","");
				DrillUp.global_TSc_bgmId = Number(temp1) - 1;
				DataManager.forceSaveGlobalInfo();
			}
		}
		/*-----------------旧指令------------------*/
		if( args.length == 4 ){
			var temp1 = Number(args[1]) - 1;
			var type = String(args[3]);
			if( type === "改变布局" ){			//>标题窗口 : 1 : 改变布局
				DrillUp.global_TSc_styleId = temp1;
				DataManager.forceSaveGlobalInfo();
			}
		}
	}
	
	/*-----------------旧指令------------------*/
	if (command === '>标题背景') {
		if(args.length == 4){
			var temp1 = Number(args[1]) - 1;
			var type = String(args[3]);
			if (type === '改变音乐') {
				DrillUp.global_TSc_bgmId = temp1;
				DataManager.forceSaveGlobalInfo();
			}
		}
	}
};

//=============================================================================
// * 存储数据初始化
//=============================================================================
var _drill_TSc_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {	
	_drill_TSc_sys_initialize.call(this);
	// 无
};


//=============================================================================
// ** 去掉标题界面
//=============================================================================
//==============================
// * 去掉 - 启动界面跳转
//==============================
var _drill_TSc_boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	DataManager._drill_TSc_in_boot = true;
	_drill_TSc_boot_start.call(this);
};
//==============================
// * 去掉 - 启动界面跳转
//==============================
var _drill_TSc_gameEnd_toTitle = Scene_GameEnd.prototype.commandToTitle;
Scene_GameEnd.prototype.commandToTitle = function() {
	DataManager._drill_TSc_in_gameEnd = true;
    _drill_TSc_gameEnd_toTitle.call(this);
};
//==============================
// * 去掉 - 场景跳转限制
//==============================
var _drill_TSc_boot_goto = SceneManager.goto;
SceneManager.goto = function(sceneClass) {
	if( DrillUp.g_TSc_skip == true ){
		
		// > 从启动界面到标题
		if( DataManager._drill_TSc_in_boot == true && DataManager._drill_TBS_in_boot !== true && sceneClass == Scene_Title ){
			DataManager._drill_TSc_in_boot = false;
			
			DataManager.setupNewGame();
			SceneManager.goto(Scene_Map);
			
			return ;
		}
		// > 从游戏结束界面到标题
		if( DataManager._drill_TSc_in_gameEnd == true && sceneClass == Scene_Title ){
			DataManager._drill_TSc_in_gameEnd = false;
			
			SceneManager.exit();
			return ;
		}
	}
	_drill_TSc_boot_goto.call(this, sceneClass);
}


//=============================================================================
// ** 标题界面
//=============================================================================
//==============================
// * 标题-标题文字
//==============================
Scene_Title.prototype.drawGameTitle = function() {
    var x = DrillUp.g_TSc_text_x;
    var y = DrillUp.g_TSc_text_y;
    var maxWidth = Graphics.width;
    var text = $dataSystem.gameTitle;
    this._gameTitleSprite.bitmap.outlineColor = 'black';
    this._gameTitleSprite.bitmap.outlineWidth = DrillUp.g_TSc_text_outlineWidth;
    this._gameTitleSprite.bitmap.fontSize = DrillUp.g_TSc_text_fontsize;
    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, DrillUp.g_TSc_text_fontsize/2, 'center');
	this._gameTitleSprite.visible = DrillUp.g_TSc_text_visible;
};

//==============================
// * 标题-退出选项
//==============================
var _drill_TSc_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	_drill_TSc_createCommandWindow.call(this);
    this._commandWindow.setHandler('drill_title_quit',  this.drill_TSc_commandQuit.bind(this));
};
Scene_Title.prototype.drill_TSc_commandQuit = function() {
    this._commandWindow.close();
    SceneManager.pop();
};
var _drill_TSc_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _drill_TSc_makeCommandList.call(this);
	if( DrillUp.g_TSc_quit_option ){
		this.addCommand(DrillUp.g_TSc_quit_text, 'drill_title_quit');
	}
};


//=============================================================================
// ** 选项窗口
//=============================================================================
//==============================
// * 选项窗口 - 初始化
//==============================
var _drill_title_window_createCommandWindow_init = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	_drill_title_window_createCommandWindow_init.call(this);
	var i = DrillUp.global_TSc_styleId;		//全局存储的样式id
	var data = {
		"x": DrillUp.g_TSc_selWin_x,
		"y": DrillUp.g_TSc_selWin_y,
		"width": DrillUp.g_TSc_selWin_width,
		"height": DrillUp.g_TSc_selWin_height,
		"fontsize": DrillUp.g_TSc_selWin_fontsize,
		
		"slideMoveType": DrillUp.g_TSc_selWin_slideAnim['slideMoveType'],
		"slideTime": DrillUp.g_TSc_selWin_slideAnim['slideTime'],
		"slideDelay": DrillUp.g_TSc_selWin_slideAnim['slideDelay'],
		"slidePosType": DrillUp.g_TSc_selWin_slideAnim['slidePosType'],
		"slideX": DrillUp.g_TSc_selWin_slideAnim['slideX'],
		"slideY": DrillUp.g_TSc_selWin_slideAnim['slideY'],
		"slideAbsoluteX": DrillUp.g_TSc_selWin_slideAnim['slideAbsoluteX'],
		"slideAbsoluteY": DrillUp.g_TSc_selWin_slideAnim['slideAbsoluteY'],
		
		"layoutType": DrillUp.g_TSc_style_list[i]['layoutType'],
		"layoutX": DrillUp.g_TSc_style_list[i]['layoutX'],
		"layoutY": DrillUp.g_TSc_style_list[i]['layoutY'],
		"layoutSrc": DrillUp.g_TSc_style_list[i]['layoutSrc'],
		"layoutSrcFile": DrillUp.g_TSc_style_list[i]['layoutSrcFile'],
	}
	this._commandWindow.drill_COWA_changeParamData( data );			//辅助核心 - 控制窗口基本属性
	this._commandWindow.hide = function(){ return null; };
	this._commandWindow.refresh();
	this._commandWindow.open();
	this._commandWindow.drill_COWA_CPD_resetMove();
};
//==============================
// * 选项窗口 - 基本数据
//==============================
Window_TitleCommand.prototype.maxCols = function() {
    return DrillUp.g_TSc_selWin_col;
};
Window_TitleCommand.prototype.itemTextAlign = function() {
    return DrillUp.g_TSc_selWin_align;
};
//==============================
// * 选项窗口 - 帧刷新
//==============================
var _drill_TSc_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() { 
	_drill_TSc_update.call(this);
	this._commandWindow.drill_COWA_CPD_update();
}

//=============================================================================
// ** 标题背景音乐
//=============================================================================
Scene_Title.prototype.playTitleMusic = function() {
	var bgm = {};
	bgm.name = DrillUp.g_TSc_bgm_list[ DrillUp.global_TSc_bgmId ];		//全局存储的音乐id
	bgm.pitch = 100;
	bgm.volume = 100;
	$dataSystem.titleBgm = bgm;
	
    AudioManager.playBgm($dataSystem.titleBgm);
    AudioManager.stopBgs();
    AudioManager.stopMe();
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_TitleScene = false;
		alert(
			"【Drill_TitleScene.js 标题-全自定义标题界面】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}




