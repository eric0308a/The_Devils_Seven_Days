//=============================================================================
// MOG_PictureGallery.js
//=============================================================================

/*:
 * @plugindesc (v1.5)[v1.5]  面板 - 画廊
 * @author Moghunter （Drill_up翻译+优化）
 *
 * @param ---杂项---
 * @desc
 *
 * @param 资源-整体布局
 * @parent ---杂项---
 * @desc 画廊的整体布局。
 * @default 画廊-整体布局
 * @require 1
 * @dir img/Menu__picturegallery/
 * @type file
 *
 * @param 是否在菜单中显示
 * @parent ---杂项---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default false
 *
 * @param 用语-菜单名称
 * @parent ---杂项---
 * @desc 菜单项显示的名称。
 * @default 画廊
 *
 * @param 是否在标题窗口中显示
 * @parent ---杂项---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true-显示,false-不显示。注意数据存储的位置，如果是正常存储，标题将打开上一存档的数据。没有存档则会报错。
 * @default false
 *
 * @param 用语-标题窗口名称
 * @parent 是否在标题窗口中显示
 * @desc 标题窗口显示的名称。
 * @default 画廊
 *
 * @param 数据是否全局存储
 * @parent 是否在标题窗口中显示
 * @type boolean
 * @on 全局存储
 * @off 正常存储
 * @desc true-存储在全局游戏中,false-存在存档记录中,音乐书的解锁隐藏状态存储位置。(该设置不会立即生效,要多试)
 * @default false
 *
 * @param 用语-完成度
 * @parent ---杂项---
 * @desc 表示"完成度"的信息用语。
 * @default 完成度
 *
 * @param 用语-未解锁图片
 * @parent ---杂项---
 * @desc 表示未解锁图片的信息用语。
 * @default -未知图片-
 *
 * @param 资源-未解锁图片
 * @parent ---杂项---
 * @desc 未解锁时的图片资源。
 * @default 画廊-未解锁图片
 * @require 1
 * @dir img/Menu__picturegallery/
 * @type file
 *
 * @param 是否显示帮助信息
 * @parent ---杂项---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-帮助信息
 * @parent ---杂项---
 * @parent 是否显示帮助信息
 * @desc 帮助信息的图片资源。
 * @default 画廊-帮助信息
 * @require 1
 * @dir img/Menu__picturegallery/
 * @type file
 *
 * @param 平移-帮助信息 X
 * @parent ---杂项---
 * @parent 是否显示帮助信息
 * @desc 菜单左上角的点为基准，x轴方向平移，单位像素。
 * @default 0
 *
 * @param 平移-帮助信息 Y
 * @parent ---杂项---
 * @parent 是否显示帮助信息
 * @desc 菜单左上角的点为基准，y轴方向平移，单位像素。
 * @default 0
 *
 * @param 帮助信息持续时间
 * @parent ---杂项---
 * @parent 是否显示帮助信息
 * @type number
 * @min 1
 * @desc 帮助信息的持续时间，单位帧，到时会自动收起。（1秒60帧）
 * @default 90
 * 
 * @param 双击灵敏度
 * @parent ---杂项---
 * @desc 双击鼠标将会退出当前图片的显示。该数值调整双击的间隔灵敏度，单位帧。（1秒60帧）
 * @default 10
 *
 * @param 图片自适应按键
 * @parent ---杂项---
 * @desc 图片根据屏幕大小进行缩放的功能按键。如果你修改了此项，记得把帮助信息也修改了。
 * @default pagedown
 *
 *
 * @param ---图片窗口---
 * @desc
 * 
 * @param 平移-图片窗口 X
 * @parent ---图片窗口---
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 10
 *
 * @param 平移-图片窗口 Y
 * @parent ---图片窗口---
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 110
 *
 * @param 图片窗口起点 X
 * @parent ---图片窗口---
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -80
 *
 * @param 图片窗口起点 Y
 * @parent ---图片窗口---
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 图片窗口移动时长
 * @parent ---图片窗口---
 * @type number
 * @min 1
 * @desc 从原位置到偏移的位置所需的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 是否使用图片窗口布局
 * @parent ---图片窗口---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-图片窗口
 * @desc 图片窗口的图片资源。
 * @parent 是否使用图片窗口布局
 * @default 
 * @require 1
 * @dir img/Menu__picturegallery/
 * @type file
 *
 * @param 平移-图片窗口布局 X
 * @parent 是否使用图片窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-图片窗口布局 Y
 * @parent 是否使用图片窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 图片窗口宽度
 * @parent ---图片窗口---
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 800
 *
 * @param 图片窗口高度
 * @parent ---图片窗口---
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 400
 *
 * @param 图片窗口字体大小
 * @parent ---图片窗口---
 * @type number
 * @min 1
 * @desc 图片窗口的字体大小。
 * @default 22
 *
 * @param 图片窗口列数
 * @parent ---图片窗口---
 * @type number
 * @min 1
 * @desc 图片窗口的列数。注意你的图片比例与窗口的高宽关系。
 * @default 4
 *
 * @param 资源-画廊图片
 * @parent ---图片窗口---
 * @desc 画廊图片的图片资源。设置多少，画廊就有多少张。图片大小没有限制。（添加后，记得删掉旧存档）
 * @default 
 * @require 1
 * @dir img/Menu__picturegallery/
 * @type file[]
 * 
 * @param 平移-图片 X
 * @parent ---图片窗口---
 * @desc 以每张图片自己的分配点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 23
 *
 * @param 平移-图片 Y
 * @parent ---图片窗口---
 * @desc 以每张图片自己的分配点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 25 
 *
 * @param 是否显示标签
 * @parent ---图片窗口---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * 每张图片下面将显示一串文字。
 * @default true
 *
 * @param 标签是否为图片名
 * @parent ---图片窗口---
 * @parent 是否显示标签
 * @type boolean
 * @on 是
 * @off 否
 * @desc true - 是，false - 否
 * @default true
 *
 * @param 用语-标签前缀
 * @parent ---图片窗口---
 * @parent 是否显示标签
 * @desc 表示标签的前缀用语。如果设置了图片名，该项没有效果。
 * 设置"图-"则为：图-1，图-2，图-3……
 * @default 图-
 *
 * @param 平移-标签 X
 * @parent ---图片窗口---
 * @parent 是否显示标签
 * @desc 以图片中心下方的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-标签 Y
 * @parent ---图片窗口---
 * @parent 是否显示标签
 * @desc 以图片中心下方的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default -32
 *
 *
 *
 * @param ---完成度窗口---
 * @desc
 * 
 * @param 平移-完成度窗口 X
 * @parent ---完成度窗口---
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 10
 *
 * @param 平移-完成度窗口 Y
 * @parent ---完成度窗口---
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 510
 *
 * @param 完成度窗口起点 X
 * @parent ---完成度窗口---
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -80
 *
 * @param 完成度窗口起点 Y
 * @parent ---完成度窗口---
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 完成度窗口移动时长
 * @parent ---完成度窗口---
 * @type number
 * @min 1
 * @desc 从原位置到偏移的位置所需的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 是否使用完成度窗口布局
 * @parent ---完成度窗口---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-完成度窗口
 * @desc 完成度窗口的完成度资源。
 * @parent 是否使用完成度窗口布局
 * @default 画廊-完成度窗口
 * @require 1
 * @dir img/Menu__picturegallery/
 * @type file
 *
 * @param 平移-完成度窗口布局 X
 * @parent 是否使用完成度窗口布局
 * @desc 修正完成度的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-完成度窗口布局 Y
 * @parent 是否使用完成度窗口布局
 * @desc 修正完成度的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 完成度窗口宽度
 * @parent ---完成度窗口---
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 230
 *
 * @param 完成度窗口高度
 * @parent ---完成度窗口---
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 90
 *
 * @param 完成度窗口字体大小
 * @parent ---完成度窗口---
 * @type number
 * @min 1
 * @desc 完成度窗口的字体大小。
 * @default 22
 *
 *
 * @help  
 * =============================================================================
 * +++ MOG - Picture Gallery (v1.5) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 画廊系统，你可以在菜单中收集或查看画廊的图片。
 * 【现已支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   属于自定义的面板，用于展示画册集。
 * 2.你需要至少配置一张图片才能进入画廊面板。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__picturegallery （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__picturegallery文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 使用背景，需要配置资源文件：
 *
 * 资源-未解锁图片
 * 资源-帮助信息
 * 资源-画廊图片
 *
 * 帮助信息图片会被分成上下两个部分，分别用于 选择提示 和 图片缩放 提示。
 * 画廊系统的缩略图都直接压缩，如果比例不合适的话，缩略图会很丑……
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 最初的画廊所有图片都是上锁的，你需要通过插件指令来设置：
 *
 * 插件指令（解锁）：enable_picture : A
 * 插件指令（上锁）：disable_picture : A
 *
 * 参数A：图片的id号
 *        id是以你配置的资源文件的顺序来决定的。1表示画廊图片中第1张图片。
 *
 * 注意，如果你添加了新的图片，最好删掉旧存档，因为图片的数量被存入了存档。
 * 不删存档，插件指令可能对后加的图片不起作用。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令，直接打开画廊页面。
 *
 * 插件指令：open_picture_gallery
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 使得该插件支持关联资源的打包、加密。
 * 部署时勾选去除无关文件，本插件中相关的文件不会被去除。
 * [v1.2]
 * 将原本mog插件复杂冗余的配置转成简单易懂的文件列表配置。
 * 添加了 标签是否为图片名 选项。
 * [v1.3]
 * 修复了画廊的一些显示错误的问题。
 * 将画廊的两个窗口参数全部搬出，可配置。
 * 使得音乐书可以添加到标题窗口里面。并添加了插件指令。
 * [v1.4]
 * 修改了插件分类。
 * [v1.5]
 * 修改了插件关联的资源文件夹。
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_PictureGallery = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_PictureGallery');
    Moghunter.picturegallery_command_menu = String(Moghunter.parameters['是否在菜单中显示'] || "false");
    Moghunter.picturegallery_command_name = String(Moghunter.parameters['用语-菜单名称'] || "画廊");
    Moghunter.picturegallery_title_command_menu = String(Moghunter.parameters['是否在标题窗口中显示'] || "false");
    Moghunter.picturegallery_title_command_name = String(Moghunter.parameters['用语-标题窗口名称'] || "画廊");
    Moghunter.picturegallery_title_data_global = String(Moghunter.parameters['数据是否全局存储'] || "false") === "true";
	Moghunter.picturegallery_completion_word = String(Moghunter.parameters['用语-完成度'] || "完成度");
	Moghunter.picturegallery_locked_word = String(Moghunter.parameters['用语-未解锁图片'] || "-未知图片-");
	
	Moghunter.picturegallery_thumbnail_x = Number(Moghunter.parameters['平移-图片 X'] || 23);
	Moghunter.picturegallery_thumbnail_y = Number(Moghunter.parameters['平移-图片 Y'] || 25);
	Moghunter.picturegallery_number_for_filename = String(Moghunter.parameters['标签是否为图片名'] || "true");
    Moghunter.picturegallery_number_show = String(Moghunter.parameters['是否显示标签'] || "true");
	Moghunter.picturegallery_number_word = String(Moghunter.parameters['用语-标签前缀'] || "图-");
	Moghunter.picturegallery_number_x = Number(Moghunter.parameters['平移-标签 X'] || 0);
	Moghunter.picturegallery_number_y = Number(Moghunter.parameters['平移-标签 Y'] || -32);	
	Moghunter.picturegallery_double_click_speed = Number(Moghunter.parameters['双击灵敏度'] || 10);	
	Moghunter.picturegallery_fit_screen_key = String(Moghunter.parameters['图片自适应按键'] || 'pagedown');
	Moghunter.picturegallery_setWallpaper = String(Moghunter.parameters['设置图片为背景（功能目前无效）'] || "false");
	Moghunter.picturegallery_wallpaper_key = String(Moghunter.parameters['设置图片按键（功能目前无效）'] || 'pageup');
	Moghunter.picturegallery_info = String(Moghunter.parameters['是否显示帮助信息'] || 'true');
	Moghunter.picturegallery_infoX = Number(Moghunter.parameters['平移-帮助信息 X'] || 0);
	Moghunter.picturegallery_infoY = Number(Moghunter.parameters['平移-帮助信息 Y'] || 0);
	Moghunter.picturegallery_infoDuration = Number(Moghunter.parameters['帮助信息持续时间'] || 90);
	
	Moghunter.picturegallery_window_x = Number(Moghunter.parameters['平移-图片窗口 X'] || 10);
	Moghunter.picturegallery_window_y = Number(Moghunter.parameters['平移-图片窗口 Y'] || 110);
	Moghunter.picturegallery_window_slideX = Number(Moghunter.parameters['图片窗口起点 X'] || -80);
	Moghunter.picturegallery_window_slideY = Number(Moghunter.parameters['图片窗口起点 Y'] || 0);
	Moghunter.picturegallery_window_slideTime = Number(Moghunter.parameters['图片窗口移动时长'] || 30);
	Moghunter.picturegallery_window_Layout_visible = String(Moghunter.parameters['是否使用图片窗口布局'] || "true") === "true";	
	Moghunter.picturegallery_window_LayoutX = Number(Moghunter.parameters['平移-图片窗口布局 X'] || 0);
	Moghunter.picturegallery_window_LayoutY = Number(Moghunter.parameters['平移-图片窗口布局 Y'] || 0);
	Moghunter.picturegallery_window_width = Number(Moghunter.parameters['图片窗口宽度'] || 800);
	Moghunter.picturegallery_window_height = Number(Moghunter.parameters['图片窗口高度'] || 400);
	Moghunter.picturegallery_window_fontsize = Number(Moghunter.parameters['图片窗口字体大小'] || 22);
	Moghunter.picturegallery_window_col = Number(Moghunter.parameters['图片窗口列数'] || 4);
	
	Moghunter.picturegallery_comp_x = Number(Moghunter.parameters['平移-完成度窗口 X'] || 10);
	Moghunter.picturegallery_comp_y = Number(Moghunter.parameters['平移-完成度窗口 Y'] || 510);
	Moghunter.picturegallery_comp_slideX = Number(Moghunter.parameters['完成度窗口起点 X'] || -80);
	Moghunter.picturegallery_comp_slideY = Number(Moghunter.parameters['完成度窗口起点 Y'] || 0);
	Moghunter.picturegallery_comp_slideTime = Number(Moghunter.parameters['完成度窗口移动时长'] || 30);
	Moghunter.picturegallery_comp_Layout_visible = String(Moghunter.parameters['是否使用完成度窗口布局'] || "true") === "true";	
	Moghunter.picturegallery_comp_LayoutX = Number(Moghunter.parameters['平移-完成度窗口布局 X'] || 0);
	Moghunter.picturegallery_comp_LayoutY = Number(Moghunter.parameters['平移-完成度窗口布局 Y'] || 0);
	Moghunter.picturegallery_comp_width = Number(Moghunter.parameters['完成度窗口宽度'] || 230);
	Moghunter.picturegallery_comp_height = Number(Moghunter.parameters['完成度窗口高度'] || 90);
	Moghunter.picturegallery_comp_fontsize = Number(Moghunter.parameters['完成度窗口字体大小'] || 22);
	
	Moghunter.src_pic_layout = String(Moghunter.parameters['资源-整体布局']);
	Moghunter.src_pic_window_layout = String(Moghunter.parameters['资源-图片窗口']);
	Moghunter.src_pic_comp_layout = String(Moghunter.parameters['资源-完成度窗口']);
	Moghunter.src_pic_no_data = String(Moghunter.parameters['资源-未解锁图片']);
	Moghunter.src_pic_help = String(Moghunter.parameters['资源-帮助信息']);
	Moghunter.picgl_data = []
	if( Moghunter.parameters['资源-画廊图片'] != "" ){
		//parse对空值转换会报错
		Moghunter.picgl_data = JSON.parse(Moghunter.parameters['资源-画廊图片']);
	}else{
		Moghunter.picgl_data = [] ;
	}
//=============================================================================
// ** 全局读取
//=============================================================================
	var _drill_global = DataManager.loadGlobalInfo();
	//alert(JSON.stringify(_drill_global));
	if( !Moghunter.global_mog_picturegallery ){	//游戏没关情况
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_mog_picturegallery"] ){		//游戏关闭后，重开读取global中的配置
			Moghunter.global_mog_picturegallery = _drill_global[0]["_global_mog_picturegallery"];
		}else{
			Moghunter.global_mog_picturegallery = [];
			for(var i = 0; i < Moghunter.picgl_data.length; i++){	//初始化
				Moghunter.global_mog_picturegallery.push( false );
			}
		}
	}
	
	
//=============================================================================
// ** 全局存储
//=============================================================================
var _mog_picturegallery_saveGlobal = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function(info) {	//第0个存档为全局存档
	if(!info[0]){info[0] = []};
	info[0]["_global_mog_picturegallery"] = Moghunter.global_mog_picturegallery;
	_mog_picturegallery_saveGlobal.call(this,info);
};

DataManager.forceSaveGlobalInfo = function() {		//强制存储（任何改变的全局变量的地方都需要调用该方法）
	var globalInfo = this.loadGlobalInfo() || [];
	globalInfo[0] = this.makeSavefileInfo();
	this.saveGlobalInfo(globalInfo);
};
	
//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Picture Gallery
//==============================
ImageManager.loadPicturegallery = function(filename) {
    return this.loadBitmap("img/Menu__picturegallery/", filename, 0, true);
};	

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_picturegallery_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_picturegallery_pluginCommand.call(this,command, args)
	if (command === "open_picture_gallery")  {$gameSystem.picturegallery()};
	if (command === "enable_picture"
		&& Number(args[1]) <= Moghunter.global_mog_picturegallery.length )  {
		Moghunter.global_mog_picturegallery[Number(args[1])-1] = true;
		DataManager.forceSaveGlobalInfo();
		$gameSystem.enable_picture(Number(args[1]),true);
	};
	if (command === "disable_picture"
		&& Number(args[1]) <= Moghunter.global_mog_picturegallery.length )  {
		Moghunter.global_mog_picturegallery[Number(args[1])-1] = false;
		DataManager.forceSaveGlobalInfo();
		$gameSystem.enable_picture(Number(args[1]),false);
	};
	return true;
};
 
//=============================================================================
// ** Game_System
//=============================================================================	

//==============================
// * Make Picture List
//==============================
Game_System.prototype.make_picture_list = function() {
	
	this._picgl_data = [];
	for(var i = 0; i <Moghunter.picgl_data.length ; i++ ){
		this._picgl_data[i] = [false, Moghunter.picgl_data[i] ];
	}		
	
};

//==============================
// * Enable Picture
//==============================
Game_System.prototype.enable_picture = function(value,enable) {
	var pic_id = Math.max(value - 1,0)
	if (!this._picgl_data || !this._picgl_data[pic_id]) {return};
    if (!this._picgl_data[pic_id]) {this._picgl_data[pic_id] = [true,""]};
	this._picgl_data[pic_id][0] = enable;
};

//==============================
// * Picture Gallery
//==============================
Game_System.prototype.picturegallery = function() {
	if (!this._picgl_data || this._picgl_data.length === 0) {
		SoundManager.playBuzzer();
		alert("MOG_PictureGallery.js 面板-画廊： \n 找不到图片资源文件，请在插件中配置至少一张图片到画廊中。");
		SceneManager.exit();
		return;
	};
    SoundManager.playOk();
    SceneManager.push(Scene_Picture_Gallery);
};


//=============================================================================
// ** Scene Tittle 标题选项
//=============================================================================	
var _mog_picturegallery_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _mog_picturegallery_createCommandWindow.call(this);
	this._commandWindow.setHandler('PictureGallery',  this.commandPictureGallery.bind(this));
};
Scene_Title.prototype.commandPictureGallery = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Picture_Gallery);
};
var _mog_picturegallery_wtc_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _mog_picturegallery_wtc_makeCommandList.call(this);
	if(Moghunter.picturegallery_title_command_menu === "true" ){
		this.addCommand(String(Moghunter.picturegallery_title_command_name),   'PictureGallery');
	}
};	

//=============================================================================
// ** Scene Map
//=============================================================================	

//==============================
// * Initialize
//==============================
var _alias_mog_picturegallery_create = Scene_Map.prototype.create
Scene_Map.prototype.create = function() {
	_alias_mog_picturegallery_create.call(this)
	if (!$gameSystem._picgl_data) {$gameSystem.make_picture_list();};
	if( Moghunter.picturegallery_title_data_global ){	//值其实已经存了全局和分档两次，这里只切换读取哪一个
		for(var i = 0 ;i < Moghunter.global_mog_picturegallery.length ; i++){
			$gameSystem.enable_picture( i+1 ,Moghunter.global_mog_picturegallery[i]);
		}
	}
}

//=============================================================================
// ** Window Picture List
//=============================================================================	
function Window_PictureList() {
    this.initialize.apply(this, arguments);
};

Window_PictureList.prototype = Object.create(Window_Selectable.prototype);
Window_PictureList.prototype.constructor = Window_PictureList;

//==============================
// * Initialize
//==============================
Window_PictureList.prototype.initialize = function(x, y, width, height,pictures,no_data_pic) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._pictures = pictures;
	this._pic_no_data = no_data_pic;
	this._pic_thumb = [];
	this._pic_name = [];
	this._check_data = false;
	this._data = $gameSystem._picgl_data;
	this.activate();
	this.select(0);	
	this.refresh();
};

//==============================
// * MaxCols
//==============================
Window_PictureList.prototype.maxCols = function() {
    return Moghunter.picturegallery_window_col;
};

//==============================
// * MaxItems
//==============================
Window_PictureList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

//==============================
// * IsCurrentItemEnabled
//==============================
Window_PictureList.prototype.isCurrentItemEnabled = function(i) {
    return this._data[i][0];
};

//==============================
// * itemHeight
//==============================
Window_PictureList.prototype.itemHeight = function() {
    return this.itemWidth() - (this.itemWidth() / 3);
};

//==============================
// * Refresh
//==============================
Window_PictureList.prototype.refresh = function() {
	this.createContents();	
	this.contents.clear();	
	this.contents.fontsize = Moghunter.picturegallery_window_fontsize;
	for (var i = 0; i < this._pic_thumb.length; i++) {
		 this._pic_thumb[i].visible = false;
		 this._pic_name[i].visible = false;
	};	
　  this.drawAllItems();
};

//==============================
// * DrawItem
//==============================
Window_PictureList.prototype.drawItem = function(i) {	
    if (this._data[i]) {
		var rect = this.itemRect(i);
		 if (!this._pic_thumb[i]) {this.create_thumb(i,rect)};
         this.refresh_position(i,rect)
    };
};

//==============================
// * Refresh Position
//==============================
Window_PictureList.prototype.refresh_position = function(i,rect) {	
	 this._pic_thumb[i].x = rect.x + Moghunter.picturegallery_thumbnail_x;
	 this._pic_thumb[i].y = rect.y + Moghunter.picturegallery_thumbnail_y;
	 this._pic_name[i].x = 	this._pic_thumb[i].x + Moghunter.picturegallery_number_x;	 
	 this._pic_name[i].y = 	this._pic_thumb[i].y + rect.height + Moghunter.picturegallery_number_y;
	 this._pic_thumb[i].visible = true;
	 this._pic_name[i].visible = true;
};

//==============================
// * Create Thumb
//==============================
Window_PictureList.prototype.create_thumb = function(i,rect) {
    var pic_w = rect.width - 10;
    var pic_h = rect.height - 15;	
	var title_name = "";
	if( this._data[i][0] ){
		if( Moghunter.picturegallery_number_for_filename === "true" ){
			title_name = Moghunter.picgl_data[i];
		}else{
			title_name = Moghunter.picturegallery_number_word + " " + String(i + 1);
		}
	}else{
		title_name = Moghunter.picturegallery_locked_word ;
	}
	if (this.isCurrentItemEnabled(i)) {
        this._pic_thumb[i] = new Sprite(this._pictures[i]);
		this._pic_thumb[i].scX = pic_w / this._pictures[i].width;
		this._pic_thumb[i].scY = pic_h / this._pictures[i].height;
        this._pic_thumb[i].scale.x = this._pic_thumb[i].scX;
	    this._pic_thumb[i].scale.y = this._pic_thumb[i].scY;
	}
	else {
		this._pic_thumb[i] = new Sprite(this._pic_no_data);
		this._pic_thumb[i].scX = pic_w / this._pic_no_data.width;
		this._pic_thumb[i].scY = pic_h	/ this._pic_no_data.height;		
        this._pic_thumb[i].scale.x = this._pic_thumb[i].scX;
	    this._pic_thumb[i].scale.y = this._pic_thumb[i].scY;
	};
	this.addChild(this._pic_thumb[i]);		
	this._pic_name[i] = new Sprite(new Bitmap(rect.width - 10, 32))
	this._pic_name[i].bitmap.fontSize = 20; 
	if( Moghunter.picturegallery_number_show === "true"){
		this._pic_name[i].bitmap.drawText( title_name, 0, 0, rect.width - 10,32,"center");
	}
	this.addChild(this._pic_name[i]);	
};

//==============================
// * Update
//==============================
Window_PictureList.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
	//if (this.opacity === 0) {this.visible = false}
	//else {this.visible = true};
	for (var i = 0; i < this._pic_thumb.length; i++) {
		 this._pic_thumb[i].opacity = this.contentsOpacity;
		 this._pic_name[i].opacity = this.contentsOpacity;
	};
};

//==============================
// * Process OK
//==============================
Window_PictureList.prototype.processOk = function() {
	this._check_data = true;
};

//==============================
// * isOKEnable
//==============================
Window_PictureList.prototype.isOkEnabled = function() {
    return true;
};

//==============================
// * Max Com
//==============================
Window_PictureList.prototype.maxCom = function() {
    return this._pic_thumb.length
};

//==============================
// * processWheel
//==============================
Window_PictureList.prototype.processWheel = function() {
	if (Imported.MOG_MenuCursor) {return};
    if (this.active) {
        var threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            this._index++;
			SoundManager.playCursor();
			if (this._index > (this.maxItems() - 1)) {this._index = 0};	
			this.select(this._index)		
        };
        if (TouchInput.wheelY <= -threshold) {
            this._index--;
			SoundManager.playCursor();
			if (this._index < 0) {this._index = (this.maxItems()  - 1)};
			this.select(this._index)	
        };
    };
};

//==============================
// * Need Update Back Opacity
//==============================
Window_PictureList.prototype.needUpdateBackOpacity = function() {
   return false;
};

//=============================================================================
// ** Window_PictureComp
//=============================================================================	
function Window_PictureComp() {
    this.initialize.apply(this, arguments);
}

Window_PictureComp.prototype = Object.create(Window_Base.prototype);
Window_PictureComp.prototype.constructor = Window_PictureComp;

//==============================
// * Initialize
//==============================
Window_PictureComp.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._data = $gameSystem._picgl_data;
	this._comp_word = Moghunter.picturegallery_completion_word;
	this._data_comp = [];
	for (var i = 0; i < this._data.length; i++) {
		if (this._data[i][0]) {this._data_comp.push(this._data[i][1])};
	};
    this.refresh();
};

//==============================
// * Refresh
//==============================
Window_PictureComp.prototype.refresh = function() {
    this.contents.clear();
	this.contents.fontSize = Moghunter.picturegallery_comp_fontsize;
	var comp = Math.floor((this._data_comp.length / this._data.length) * 100)
	var comp2 = "(" + this._data_comp.length + "/" + this._data.length + ")"	
    this.drawText(this._comp_word + " " + comp + " % ", 0, 0, 200,"left");
	this.drawText(comp2, 0, 0, (this.width - 36),"right");
};

//==============================
// * Need Update Back Opacity
//==============================
Window_PictureComp.prototype.needUpdateBackOpacity = function() {
   return false;
};

if (String(Moghunter.picturegallery_command_menu) === "true") {
	//=============================================================================
	// ** Window MenuCommand
	//=============================================================================	

	//==============================
	// * make Command List
	//==============================
	var _alias_mog_picgal_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		_alias_mog_picgal_addOriginalCommands.call(this);
		this.addPictureGallery();
	};
		
	//==============================
	// * Add Music Book
	//==============================	
	Window_MenuCommand.prototype.addPictureGallery = function() {
		this.addCommand(String(Moghunter.picturegallery_command_name), 'picture_gallery', true);
	};	
		
	//=============================================================================
	// ** Scene Menu
	//=============================================================================	

	//==============================
	// * create Command Window
	//==============================
	var _alias_mog_picgal_reateCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		_alias_mog_picgal_reateCommandWindow.call(this); 
		this._commandWindow.setHandler('picture_gallery',      this.commandPictureGallery.bind(this));
		if (Imported.MOG_TimeSystem && Moghunter.timeWindow_menu) {	
			this._commandWindow.height -= this._commandWindow.itemHeight();
		};
	};

	//==============================
	// * Picture Gallery
	//==============================
	Scene_Menu.prototype.commandPictureGallery = function() {	
		$gameSystem.picturegallery();
	};
};

//=============================================================================
// ** Scene Picture Gallery
//=============================================================================	
function Scene_Picture_Gallery() {
    this.initialize.apply(this, arguments);
}
Scene_Picture_Gallery.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Picture_Gallery.prototype.constructor = Scene_Picture_Gallery;

//==============================
// * Initialize
//==============================
Scene_Picture_Gallery.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	if (!$gameSystem._picgl_data) {$gameSystem.make_picture_list();};
	if( Moghunter.picturegallery_title_data_global ){	//值其实已经存了全局和分档两次，这里只切换读取哪一个
		for(var i = 0 ;i < Moghunter.global_mog_picturegallery.length ; i++){
			$gameSystem.enable_picture( i+1 ,Moghunter.global_mog_picturegallery[i]);
		}
	}
	this._data = $gameSystem._picgl_data;
	this._playing_index = -1;
    this.load_all_pictures();
	this.press_cancel = [0,0];
	this.show = [false,0];
	this._pxy = [0,0,0,0];
	this._pxy_old = [0,0,0,0,1];
	this._mxy = [0,0];
	this._wheel_d = 0;
	this._txv = null;
	this._fullMode = false;
	this._wallpaper = String(Moghunter.picturegallery_setWallpaper) === "true" ? true : false;
	this._wheelY_old = TouchInput.wheelY;
	this._fit_screen_key = String(Moghunter.picturegallery_fit_screen_key);
	this._wallpaper_key = String(Moghunter.picturegallery_wallpaper_key);
};

//==============================
// * Load All Pictures
//==============================
Scene_Picture_Gallery.prototype.load_all_pictures = function() {
	this._picture_cache = [];
	this._picture_data = [];
	this._no_data_pic = ImageManager.loadPicturegallery(Moghunter.src_pic_no_data);
	for (var i = 0; i < this._data.length; i++) {
	   this._picture_cache.push(ImageManager.loadPicturegallery(this._data[i][1]))
	   this._picture_data[i] = [-1,-1]
	};
};

//==============================
// * Refresh Picture Data
//==============================
Scene_Picture_Gallery.prototype.refresh_picture_data = function() {
	for (var i = 0; i < this._picture_cache.length; i++) {
		this._picture_data[i][0] = this._picture_cache[i].width;
		this._picture_data[i][1] = this._picture_cache[i].height;
	};
	this._field = new Sprite();
	this.addChild(this._field);	//布局（先画，其图层都被放在后面）
	this.create_layout();
	this.create_window_comp();
    this.create_window_list();		
	this.create_backgrounds();
	if (String(Moghunter.picturegallery_info) === "true") {this.createInfo()};
};

//==============================
// * Pic Move
//==============================
Scene_Picture_Gallery.prototype.createInfo = function() {
    this._info = new Sprite(ImageManager.loadPicturegallery(Moghunter.src_pic_help));
	this._info.visible = false;
	this._info._duration = 0;
	this._info._phase = [0,-1,0];
	this._info._index = 0;
	this._info.org = [Moghunter.picturegallery_infoX,Moghunter.picturegallery_infoY];
	this._info.x = this._info.org[0];
	this._info.y = this._info.org[1] - 50;
	this.addChild(this._info);
};

//==============================
// * Pic Move
//==============================
Scene_Picture_Gallery.prototype.move_to = function(type,value) {
	if (this._fullMode) {return};
	this._pxy[type] += value;
	this._pxy[type] = this._pxy[type].clamp(this._pxy[type + 2], 0);
};

//==============================
// * Move Speed
//==============================
Scene_Picture_Gallery.prototype.move_speed = function(type,value) {
	return (this._picture_data[this.index()][0] / 120) + 1
};

//==============================
// * Limit X
//==============================
Scene_Picture_Gallery.prototype.limitX = function() {
	return (Graphics.boxWidth - this._picture_data[this.index()][0]);
};

//==============================
// * Limit Y
//==============================
Scene_Picture_Gallery.prototype.limitY = function() {
	return Graphics.boxHeight - this._picture_data[this.index()][1];
};

//==============================
// * Data
//==============================
Scene_Picture_Gallery.prototype.data = function() {
	if (!this._w_list) {return null}
	return this._data[this._w_list._index];
};

//==============================
// * Index
//==============================
Scene_Picture_Gallery.prototype.index = function() {
   if (!this._w_list) {return -1};
   return this._w_list._index;
};

//==============================
// * Create Layout
//==============================
Scene_Picture_Gallery.prototype.create_layout = function() {
    this._layout = new Sprite(ImageManager.loadPicturegallery(Moghunter.src_pic_layout));
	this.addChild(this._layout);	
};

//==============================
// * Create Background
//==============================
Scene_Picture_Gallery.prototype.create_backgrounds = function() {
    this._picture = new Sprite();
	this._picture._ani = [false,0,0,0];
	this.addChild(this._picture);	
};

//==============================
// * Create Window Comp
//==============================
Scene_Picture_Gallery.prototype.create_window_comp = function() {
    var wx = Moghunter.picturegallery_comp_x + Moghunter.picturegallery_comp_slideX;
    var wy = Moghunter.picturegallery_comp_y + Moghunter.picturegallery_comp_slideY;
    var ww = Moghunter.picturegallery_comp_width;
    var wh = Moghunter.picturegallery_comp_height;
	this._w_comp = new Window_PictureComp(wx,wy,ww,wh)
	this._w_comp._move = 0;
	this._w_comp.opacity = 0;
	this._w_comp.contentsOpacity = 0;
	this.addChild(this._w_comp);
	if( Moghunter.picturegallery_comp_Layout_visible ){
		this._w_comp_layout = new Sprite(ImageManager.loadPicturegallery(Moghunter.src_pic_comp_layout));
		this._w_comp_layout.x = Moghunter.picturegallery_comp_LayoutX;
		this._w_comp_layout.y = Moghunter.picturegallery_comp_LayoutY;
		this._field.addChild(this._w_comp_layout);
	}
};

//==============================
// * Create Window List
//==============================
Scene_Picture_Gallery.prototype.create_window_list = function() {
    var wx = Moghunter.picturegallery_window_x + Moghunter.picturegallery_window_slideX;
    var wy = Moghunter.picturegallery_window_y + Moghunter.picturegallery_window_slideY;
    var ww = Moghunter.picturegallery_window_width;
    var wh = Moghunter.picturegallery_window_height;	
	this._w_list = new Window_PictureList(wx,wy,ww,wh,this._picture_cache,this._no_data_pic);
	this._w_list._move = 0;
	this._w_list.opacity = 0;
	this._w_list.contentsOpacity = 0;
	this._w_list.setHandler('cancel',   this.popScene.bind(this));	
	this.addChild(this._w_list);
	if( Moghunter.picturegallery_window_Layout_visible ){
		this._w_list_layout = new Sprite(ImageManager.loadPicturegallery(Moghunter.src_pic_window_layout));
		this._w_list_layout.x = Moghunter.picturegallery_window_LayoutX;
		this._w_list_layout.y = Moghunter.picturegallery_window_LayoutY;
		this._field.addChild(this._w_list_layout);
	}
}; 

//==============================
// * Refresh Data
//==============================
Scene_Picture_Gallery.prototype.refresh_data = function() {
	this._w_list._check_data = false;
	this.show[1] = 2;
	if (!this.data()[0]) {this.nodata_effect();return}
	if (this.show[0]) {this.show[0] = false ; return};
	SoundManager.playOk();
    this.set_new_data();
	this._playing_index = this.index();
};

//==============================
// * Set Full Mode
//==============================
Scene_Picture_Gallery.prototype.set_FullMode = function() {
	this._fullMode = true;
	this._pxy_old = [this._pxy[0],this._pxy[1],
	this._picture.anchor.x,this._picture.anchor.y,this._picture.scale.x];
	this._pxy[0] = Graphics.boxWidth / 2;
	this._pxy[1] = Graphics.boxHeight / 2;
	this._picture.anchor.x = 0.5;
	this._picture.anchor.y = 0.5;
    var pic_w = Graphics.boxWidth;
    var pic_h = Graphics.boxHeight;
    this._picture.scale.x = pic_w / this._picture.width;
    this._picture.scale.y = pic_h / this._picture.height;
};

//==============================
// * Set Normal Mode
//==============================
Scene_Picture_Gallery.prototype.set_NormalMode = function() {
	this._fullMode = false;
	this._pxy[0] = this._pxy_old[0];
	this._pxy[1] = this._pxy_old[1];
	this._picture.anchor.x = this._pxy_old[2];
	this._picture.anchor.y = this._pxy_old[3];
    this._picture.scale.x = this._pxy_old[4];
    this._picture.scale.y = this._pxy_old[4];
};

//==============================
// * Change Picture Mode
//==============================
Scene_Picture_Gallery.prototype.changePictureMode = function() {
	SoundManager.playCursor();	
    if (!this._fullMode) {this.set_FullMode()}
	else {this.set_NormalMode()};
};

//==============================
// * SeT zoom
//==============================
Scene_Picture_Gallery.prototype.set_zoom = function(value) {
      if (this._fullMode) {return};
	  this._picture.scale.x += value;
      if (this._picture.scale.x > 1.50) {this._picture.scale.x = 1.50};
	  if (this._picture.scale.x < 1.00) {this._picture.scale.x = 1.00};
	  this._picture.scale.y = this._picture.scale.x;
};

//==============================
// * No Data Effect
//==============================
Scene_Picture_Gallery.prototype.nodata_effect = function() {
   SoundManager.playBuzzer();
   this.show[0] = false;
   this._playing_index = this.index();
};

//==============================
// * Set New Data
//==============================
Scene_Picture_Gallery.prototype.set_new_data = function() {
   this.show[0] = true;
   this._info._phase[0] = 1;
   this.press_cancel[1] = 20;
   this._pxy = [this.limitX() / 2,this.limitY() / 2,this.limitX(),this.limitY()];
   this._pxy[0] = this._pxy[0].clamp(this._pxy[2], 0);
   this._pxy[1] = this._pxy[1].clamp(this._pxy[3], 0);
   this._picture.bitmap = this._picture_cache[this.index()];
   this._picture.anchor.x = 0;
   this._picture.anchor.y = 0;
   this._picture.opacity = 0;
   this._picture.scale.x = 1.00;
   this._picture.scale.y = 1.00;
   if (this.limitX() > 0) {this._picture.anchor.x = 0.5};
   if (this.limitY() > 0) {this._picture.anchor.y = 0.5};
   this._fullMode = false;
};

//==============================
// * Update Window
//==============================
Scene_Picture_Gallery.prototype.update_window = function() {
	if (this.show[1] > 0) {this.show[1] -= 1};
	this._w_list.active = !this.show[0];		 
    if (this.show[0]) {
	    this._picture.opacity += 15;	//查看大图
		 
		this._w_comp._move -= 256/Moghunter.picturegallery_comp_slideTime;
		if( this._w_comp._move > 0 ){
			this._w_comp.x += Moghunter.picturegallery_comp_slideX/Moghunter.picturegallery_comp_slideTime;
			this._w_comp.y += Moghunter.picturegallery_comp_slideY/Moghunter.picturegallery_comp_slideTime;
			this._w_comp.contentsOpacity -= 256/Moghunter.picturegallery_comp_slideTime ;
			if(Moghunter.picturegallery_comp_Layout_visible){
				this._w_comp.opacity = 0;
				this._w_comp_layout.x = this._w_comp.x + Moghunter.picturegallery_comp_LayoutX;
				this._w_comp_layout.y = this._w_comp.y + Moghunter.picturegallery_comp_LayoutY;
				this._w_comp_layout.opacity = this._w_comp.contentsOpacity;
			}else{
				this._w_comp.opacity = this._w_comp.contentsOpacity;
			}
		}else{
			this._w_comp._move = 0;
		}
		
		this._w_list._move -= 256/Moghunter.picturegallery_window_slideTime;
		if( this._w_list._move > 0 ){
			this._w_list.x += Moghunter.picturegallery_window_slideX/Moghunter.picturegallery_window_slideTime;
			this._w_list.y += Moghunter.picturegallery_window_slideY/Moghunter.picturegallery_window_slideTime;
			this._w_list.contentsOpacity -= 256/Moghunter.picturegallery_window_slideTime ;
			if(Moghunter.picturegallery_window_Layout_visible){
				this._w_list.opacity = 0;
				this._w_list_layout.x = this._w_list.x + Moghunter.picturegallery_window_LayoutX;
				this._w_list_layout.y = this._w_list.y + Moghunter.picturegallery_window_LayoutY;
				this._w_list_layout.opacity = this._w_list.contentsOpacity;
			}else{
				this._w_list.opacity = this._w_list.contentsOpacity;
			}
		}else{
			this._w_list._move = 0;
		}
		 
	} else {
		this._picture.opacity -= 15;	//离开大图

		this._w_comp._move += 256/Moghunter.picturegallery_comp_slideTime;
		if( this._w_comp._move < 256 ){
			this._w_comp.x -= Moghunter.picturegallery_comp_slideX/Moghunter.picturegallery_comp_slideTime;
			this._w_comp.y -= Moghunter.picturegallery_comp_slideY/Moghunter.picturegallery_comp_slideTime;
			this._w_comp.contentsOpacity += 256/Moghunter.picturegallery_comp_slideTime ;
			if(Moghunter.picturegallery_comp_Layout_visible){
				this._w_comp.opacity = 0;
				this._w_comp_layout.x = this._w_comp.x + Moghunter.picturegallery_comp_LayoutX;
				this._w_comp_layout.y = this._w_comp.y + Moghunter.picturegallery_comp_LayoutY;
				this._w_comp_layout.opacity = this._w_comp.contentsOpacity;
			}else{
				this._w_comp.opacity = this._w_comp.contentsOpacity;
			}
		}else{
			this._w_comp._move = 256;
		}
		
		this._w_list._move += 256/Moghunter.picturegallery_window_slideTime;
		if( this._w_list._move < 256 ){
			this._w_list.x -= Moghunter.picturegallery_window_slideX/Moghunter.picturegallery_window_slideTime;
			this._w_list.y -= Moghunter.picturegallery_window_slideY/Moghunter.picturegallery_window_slideTime;
			this._w_list.contentsOpacity += 256/Moghunter.picturegallery_window_slideTime ;
			if(Moghunter.picturegallery_window_Layout_visible){
				this._w_list.opacity = 0;
				this._w_list_layout.x = this._w_list.x + Moghunter.picturegallery_window_LayoutX;
				this._w_list_layout.y = this._w_list.y + Moghunter.picturegallery_window_LayoutY;
				this._w_list_layout.opacity = this._w_list.contentsOpacity;
			}else{
				this._w_list.opacity = this._w_list.contentsOpacity;
			}
		}else{
			this._w_list._move = 256;
		}
	};
	
	if (this._backgroundSpriteNew) {
	    this._backgroundSpriteNew.opacity = this._w_list.contentsOpacity;
	};
}; 

//==============================
// * Update Picture Animation
//==============================
Scene_Picture_Gallery.prototype.updatePictureAnimation = function() {
     this._picture.opacity -= 15;
	 this._picture.scale.x += 0.01;
	 this._picture.scale.y = this._picture.scale.x;
	 if (this._picture.opacity <= 0) {
		 this._picture._ani[0] = false;
		 this.refresh_data();
	 };
};

//==============================
// * Update Input For Picture
//==============================
Scene_Picture_Gallery.prototype.update_input_for_picture = function() {  
    this.update_Input();
    this.update_TouchInput();
    this.update_picture_position();
};

//==============================
// * Update Picture Position
//==============================
Scene_Picture_Gallery.prototype.update_picture_position = function() {  
	if (this._pxy[2] <= 0) {this._picture.x = this._pxy[0];}
	else {this._picture.x = (Graphics.boxWidth / 2)};
	if (this._pxy[3] <= 0) {this._picture.y = this._pxy[1];}
	else {this._picture.y = (Graphics.boxHeight / 2)};
	this._picture.scale.y = this._picture.scale.x;	
};

//==============================
// * Update Input
//==============================
Scene_Picture_Gallery.prototype.update_Input = function() { 
    if (this.needReturnToList()) {this.return_to_data_list();};
	if (Input.isPressed("right")) {this.move_to(0,-this.move_speed())};
    if (Input.isPressed("left")) {this.move_to(0,this.move_speed())};
	if (Input.isPressed("down")) {this.move_to(1,-this.move_speed())};
	if (Input.isPressed("up")) {this.move_to(1,this.move_speed())};
	if (Input.isTriggered(this._fit_screen_key)) {this.changePictureMode()};
	if (Input.isTriggered(this._wallpaper_key)) {this.setBackground()};
};
  
//==============================
// * Need Return to List
//==============================
Scene_Picture_Gallery.prototype.needReturnToList = function() { 
   if (TouchInput.isCancelled() && !TouchInput.isPressed()) {return true};
   if (Input.isTriggered("cancel")) {return true};
   if (Input.isTriggered("ok")) {return true};
   return false;
};
  
//==============================
// * Return To Data List
//==============================
Scene_Picture_Gallery.prototype.return_to_data_list = function() {  
    SoundManager.playCancel();
	this._info._phase[0] = 0;
    this.refresh_data();
};

//==============================
// * Set Background
//==============================
Scene_Picture_Gallery.prototype.setBackground = function() {  
    $gameSystem._backgroundName = String(Moghunter.picgl_data[this._w_list._index + 1]);
	this.set_FullMode();
	this._info._phase[0] = 0;
	this._picture._ani[0] = true;
	SoundManager.playOk();
};

//==============================
// * Set Wheel Action
//==============================
Scene_Picture_Gallery.prototype.setWheelAction = function() {  
    this._wheel_d = 5;
	if ( ( Imported.MOG_MenuBackground ) && this._wallpaper) {
		if (TouchInput.wheelY > 0) {
		   this.changePictureMode();
		} else {
		   this.setBackground();
		};
	} else {
		this.changePictureMode();
	};
};



//==============================
// * Update Touch Input
//==============================
Scene_Picture_Gallery.prototype.update_TouchInput = function() {     
    if (TouchInput.isTriggered() && this.press_cancel[0] > 0 && this.press_cancel[1] === 0) {this.return_to_data_list();};
   	if (this._wheel_d > 0) {this._wheel_d -= 1}
	if (this._wheel_d === 0 && TouchInput.wheelY != 0) {this.setWheelAction()};
	if (TouchInput.isPressed()) {
		if (TouchInput.isCancelled()) {this.setBackground()};
		this.press_cancel[0] = Moghunter.picturegallery_double_click_speed;
        this._moveTo_TouchInput();
	} else {
		this._txv = null;
	};	
};

//==============================
// * MoveTo Touch Input
//==============================
Scene_Picture_Gallery.prototype._moveTo_TouchInput = function() {
    	if (this._fullMode) {return};
		if (!this._txv) {this._txv = [this._picture.x + TouchInput._x,this._picture.y + TouchInput._y];
			this._mxy[0] = TouchInput._x - this._txv[0];
			this._mxy[1] = TouchInput._y - this._txv[1];		
		};
		var mv = (this._mxy[0]) - (TouchInput._x - this._txv[0]);
		this.move_to(0,-mv);
		var mv = this._mxy[1] - (TouchInput._y - this._txv[1]);
		this.move_to(1,-mv)	;
    	this._mxy[0] = TouchInput._x - this._txv[0];
	    this._mxy[1] = TouchInput._y - this._txv[1];
};

//==============================
// * Need Update Input
//==============================
Scene_Picture_Gallery.prototype.needUpdateInput = function() {
	if (this.show[1] != 0) {return false};
	if (this._w_list.active) {return false};
	if (this._picture._ani[0]) {return false};
	return true;
};

//==============================
// * Refresh Info
//==============================
Scene_Picture_Gallery.prototype.refreshInfo = function() {
	var w = this._info.bitmap.width;
	var h = this._info.bitmap.height / 2;
	var i = h * this._info._phase[0];
	this._info.setFrame(0,i,w,h)
    this._info.opacity = 0;
    this._info._phase[1] = this._info._phase[0];
	this._info._phase[2] = 0;
	this._info._duration = Number(Moghunter.picturegallery_infoDuration);
	this._info.y = this._info.org[1] - 50;
	this._info.visible = true;
};

//==============================
// * Update Pic Info
//==============================
Scene_Picture_Gallery.prototype.updateInfo = function() {    
	if (this._info._phase[0] != this._info._phase[1]) {this.refreshInfo()};
	if (this._info._phase[2] === 0) {
		this._info.opacity += 5;
		if (this._info.y < this._info.org[1]) {
			this._info.y += 3
		    if (this._info.y > this._info.org[1]) {this._info.y = this._info.org[1]};
		};
		if (this._info.opacity >= 255) {this._info._phase[2] = 1};
	} else if (this._info._phase[2] === 1) {
		this._info.y = this._info.org[1];
		this._info._duration--;
		if (this._info._duration <= 0) {this._info._phase[2] = 2};
	} else {
		if (this._info.opacity > 0) {
			this._info.opacity -= 5;
			this._info.y -= 3;
		};
	};
};

//==============================
// * Update
//==============================
Scene_Picture_Gallery.prototype.update = function() {
	Scene_MenuBase.prototype.update.call(this);
	if (this._picture_data[0][1] === -1 && this._picture_cache[0].isReady()) {this.refresh_picture_data()};
	if (this._picture_data[0][1] === -1) {return;};
	if (!this.data()) {return};
	if (this._w_list._check_data) {this.refresh_data()};
    if (!this._picture._ani[0]) {
		this.update_window(); 
	} else {
		this.updatePictureAnimation();
	};
	if (this.needUpdateInput()) {this.update_input_for_picture()};
	if (this._info && this._info.bitmap.isReady()) {this.updateInfo()};
	if (this.press_cancel[0] > 0) {this.press_cancel[0] -= 1};
	if (this.press_cancel[1] > 0) {this.press_cancel[1] -= 1};
};