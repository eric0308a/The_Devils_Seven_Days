//=============================================================================
// Drill_SenceShop.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        主菜单 - 全自定义商店界面
 * @author Drill_up
 *
 *
 * @help
 * =============================================================================
 * +++ Drill_SenceShop +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全自定义的商店界面。该界面包含一共7个窗口，一个按钮组。
 * 想了解更多窗口的设计，去看看"窗口与布局.docx"。
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，对商店做美化，并支持部分设定功能。
 * 可以通过 Drill_ItemCategory 物品类型 扩展出售的物品类型。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 服务员
 * 你可以在进入商店页面前修改服务员：
 *
 * 插件指令（服务员）：  shop_waitress A
 *
 * 参数A：服务员的编号
 *        与设置的编号相对应。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 倍率
 * 你可以通过插件指令手动设置商店的购买/出售倍率。
 *
 * 插件指令（购买倍率）：    shop_buy_rate B
 * 插件指令（出售倍率）：    shop_sell_rate B
 * 插件指令（恢复默认）：    shop_reset_rate
 * 插件指令（购买倍率变量）：shop_buy_rate_v C
 * 插件指令（出售倍率变量）：shop_sell_rate_v C
 *
 * 参数B：倍率值（小数）
 * 参数C：变量倍率
 *        根据变量的值来修改倍率。
 *        由于变量不能表示小数，这里根据变量的值取千分之一。
 *
 * 示例：
 * 插件指令：shop_buy_rate 1.05
 * （购买倍率设置为 105% ）
 * 插件指令：shop_buy_rate_v 22
 * （假设变量[22]值为 1100 ，则倍率为 110.0%）
 *
 * 注：1.通过倍率计算转换后最小值为1。
 *     2.乘积倍率后，小数点后面的位都会舍去。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 交换商店
 * 你可以通过插件指令手动设置商店的交换方式。
 *
 * 插件指令（开启）：shop_exchange_mode D E
 * 插件指令（关闭）：shop_exchange_off
 *
 * 参数D：交换的物品id
 * 参数E：交换的物品单位
 *        单位可以填入文字或者图标\I[]。
 *
 * 示例：
 * 插件指令：shop_exchange_mode 38 \I[546]
 * 插件指令：shop_exchange_off
 * （商店将使用 38号物品 作为交换对象，并且单位为 图标546 ）
 *
 * 注：1.商店只是把 金钱 换成了 樱桃（38号物品） 。
 *     2.倍率还是原来的金钱倍率，你需要通过乘积关系，手动调整新的倍率。
 *     3.物品交换商店最好不要有出售交换，玩家可能用这个来刷钱。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了商店的物品交换功能。优化了点击按钮部分。
 * [v1.2]
 * 添加了出售类型窗口的对齐方式，并修复了窗口宽度的bug。
 *
 * @param ----杂项----
 * @default 
 *
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 信息面板的整体布局。
 * @default 商店界面-整体布局
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 默认购买倍率
 * @parent ----杂项----
 * @desc 从商店购买物品价格的倍率，设置1.1表示为物品价格的1.1倍。
 * @default 1.000
 *
 * @param 默认出售倍率
 * @parent ----杂项----
 * @desc 从商店出售物品价格的倍率，设置0.6表示为物品价格的0.6倍。
 * @default 0.500
 *
 * @param ----帮助窗口----
 * @default 
 * 
 * @param 平移-帮助窗口 X
 * @parent ----帮助窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 250
 *
 * @param 平移-帮助窗口 Y
 * @parent ----帮助窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 520
 *
 * @param 帮助窗口起点 X
 * @parent ----帮助窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 帮助窗口起点 Y
 * @parent ----帮助窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 80
 *
 * @param 帮助窗口移动时长
 * @parent ----帮助窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 是否使用帮助窗口布局
 * @parent ----帮助窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-帮助窗口
 * @desc 帮助窗口的图片资源。
 * @parent 是否使用帮助窗口布局
 * @default 
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 平移-帮助窗口布局 X
 * @parent 是否使用帮助窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-帮助窗口布局 Y
 * @parent 是否使用帮助窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 帮助窗口宽度
 * @parent ----帮助窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 380
 *
 * @param 帮助窗口高度
 * @parent ----帮助窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 130
 *
 * @param 帮助窗口字体大小
 * @parent ----帮助窗口----
 * @type number
 * @min 1
 * @desc 帮助窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----金钱窗口----
 * @default 
 * 
 * @param 平移-金钱窗口 X
 * @parent ----金钱窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 平移-金钱窗口 Y
 * @parent ----金钱窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 528
 *
 * @param 金钱窗口起点 X
 * @parent ----金钱窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -100
 *
 * @param 金钱窗口起点 Y
 * @parent ----金钱窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 金钱窗口移动时长
 * @parent ----金钱窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 是否使用金钱窗口布局
 * @parent ----金钱窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-金钱窗口
 * @desc 金钱窗口的图片资源。
 * @parent 是否使用金钱窗口布局
 * @default 商店界面-金钱窗口
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 平移-金钱窗口布局 X
 * @parent 是否使用金钱窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 12
 *
 * @param 平移-金钱窗口布局 Y
 * @parent 是否使用金钱窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 10
 *
 * @param 金钱窗口宽度
 * @parent ----金钱窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 210
 *
 * @param 金钱窗口高度
 * @parent ----金钱窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 80
 *
 * @param 金钱窗口字体大小
 * @parent ----金钱窗口----
 * @type number
 * @min 1
 * @desc 金钱窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----选项按钮组----
 * @default 
 *
 * @param 平移-按钮起点 X
 * @parent ----选项按钮组----
 * @desc 按钮初始会出现在起点，x轴方向平移，单位像素。0为贴在最左边。
 * @default 660
 *
 * @param 平移-按钮起点 Y
 * @parent ----选项按钮组----
 * @desc 按钮初始会出现在起点，y轴方向平移，单位像素。0为贴在最上面。
 * @default 300
 *
 * @param 平移-激活的按钮 X
 * @parent ----选项按钮组----
 * @desc 按钮被激活后，移动到指定位置。x轴方向平移，单位像素。0为贴在最左边。
 * @default 120
 *
 * @param 平移-激活的按钮 Y
 * @parent ----选项按钮组----
 * @desc 按钮被激活后，移动到指定位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 135
 *
 * @param 资源-购买按钮
 * @desc 购买按钮的图片资源。
 * @parent ----选项按钮组----
 * @default 商店界面-选项购买
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 平移-购买按钮 X
 * @parent ----选项按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 370
 *
 * @param 平移-购买按钮 Y
 * @parent ----选项按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 210
 *
 * @param 资源-出售按钮
 * @desc 出售按钮的图片资源。
 * @parent ----选项按钮组----
 * @default 商店界面-选项出售
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 平移-出售按钮 X
 * @parent ----选项按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 370
 *
 * @param 平移-出售按钮 Y
 * @parent ----选项按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 295
 *
 * @param 资源-离开按钮
 * @desc 离开按钮的图片资源。
 * @parent ----选项按钮组----
 * @default 商店界面-选项离开
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 平移-离开按钮 X
 * @parent ----选项按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 370
 *
 * @param 平移-离开按钮 Y
 * @parent ----选项按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 380
 *
 * @param ----购买窗口----
 * @default 
 * 
 * @param 平移-购买窗口 X
 * @parent ----购买窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 260
 *
 * @param 平移-购买窗口 Y
 * @parent ----购买窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 66
 *
 * @param 购买窗口起点 X
 * @parent ----购买窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -80
 *
 * @param 购买窗口起点 Y
 * @parent ----购买窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 购买窗口移动时长
 * @parent ----购买窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 25
 *
 * @param 是否使用购买窗口布局
 * @parent ----购买窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-购买窗口
 * @desc 购买窗口的图片资源。
 * @parent 是否使用购买窗口布局
 * @default 商店界面-购买窗口
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 平移-购买窗口布局 X
 * @parent 是否使用购买窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-购买窗口布局 Y
 * @parent 是否使用购买窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 购买窗口宽度
 * @parent ----购买窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 370
 *
 * @param 购买窗口高度
 * @parent ----购买窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 340
 *
 * @param 购买窗口列数
 * @parent ----购买窗口----
 * @type number
 * @min 1
 * @desc 购买窗口的列数。
 * @default 1
 *
 * @param 购买窗口字体大小
 * @parent ----购买窗口----
 * @type number
 * @min 1
 * @desc 购买窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----持有数窗口----
 * @default 
 * 
 * @param 平移-持有数窗口 X
 * @parent ----持有数窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 22
 *
 * @param 平移-持有数窗口 Y
 * @parent ----持有数窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 430
 *
 * @param 持有数窗口起点 X
 * @parent ----持有数窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -50
 *
 * @param 持有数窗口起点 Y
 * @parent ----持有数窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 持有数窗口移动时长
 * @parent ----持有数窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 15
 *
 * @param 是否使用持有数窗口布局
 * @parent ----持有数窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-持有数窗口
 * @desc 持有数窗口的图片资源。
 * @parent 是否使用持有数窗口布局
 * @default 商店界面-持有数窗口
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 平移-持有数窗口布局 X
 * @parent 是否使用持有数窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default -11
 *
 * @param 平移-持有数窗口布局 Y
 * @parent 是否使用持有数窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 10
 *
 * @param 持有数窗口宽度
 * @parent ----持有数窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 190
 *
 * @param 持有数窗口高度
 * @parent ----持有数窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 80
 *
 * @param 持有数窗口字体大小
 * @parent ----持有数窗口----
 * @type number
 * @min 1
 * @desc 持有数窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----物品数量窗口----
 * @default 
 * 
 * @param 平移-物品数量窗口 X
 * @parent ----物品数量窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 260
 *
 * @param 平移-物品数量窗口 Y
 * @parent ----物品数量窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 370
 *
 * @param 物品数量窗口起点 X
 * @parent ----物品数量窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 物品数量窗口起点 Y
 * @parent ----物品数量窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 40
 *
 * @param 物品数量窗口移动时长
 * @parent ----物品数量窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 是否使用物品数量窗口布局
 * @parent ----物品数量窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-物品数量窗口
 * @desc 物品数量窗口的图片资源。
 * @parent 是否使用物品数量窗口布局
 * @default 商店界面-物品数量窗口
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 平移-物品数量窗口布局 X
 * @parent 是否使用物品数量窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-物品数量窗口布局 Y
 * @parent 是否使用物品数量窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 物品数量窗口宽度
 * @parent ----物品数量窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 370
 *
 * @param 物品数量窗口高度
 * @parent ----物品数量窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 130
 *
 * @param 物品数量窗口字体大小
 * @parent ----物品数量窗口----
 * @type number
 * @min 1
 * @desc 物品数量窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----出售窗口----
 * @default 
 * 
 * @param 平移-出售窗口 X
 * @parent ----出售窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 260
 *
 * @param 平移-出售窗口 Y
 * @parent ----出售窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 66
 *
 * @param 出售窗口起点 X
 * @parent ----出售窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -80
 *
 * @param 出售窗口起点 Y
 * @parent ----出售窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 出售窗口移动时长
 * @parent ----出售窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 25
 *
 * @param 是否使用出售窗口布局
 * @parent ----出售窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-出售窗口
 * @desc 出售窗口的图片资源。
 * @parent 是否使用出售窗口布局
 * @default 商店界面-出售窗口
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 平移-出售窗口布局 X
 * @parent 是否使用出售窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-出售窗口布局 Y
 * @parent 是否使用出售窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 出售窗口宽度
 * @parent ----出售窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 370
 *
 * @param 出售窗口高度
 * @parent ----出售窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 340
 *
 * @param 出售窗口列数
 * @parent ----出售窗口----
 * @type number
 * @min 1
 * @desc 出售窗口的列数。
 * @default 1
 *
 * @param 出售窗口字体大小
 * @parent ----出售窗口----
 * @type number
 * @min 1
 * @desc 出售窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----出售类型窗口----
 * @default 
 * 
 * @param 平移-出售类型窗口 X
 * @parent ----出售类型窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 15
 *
 * @param 平移-出售类型窗口 Y
 * @parent ----出售类型窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 180
 *
 * @param 出售类型窗口起点 X
 * @parent ----出售类型窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -80
 *
 * @param 出售类型窗口起点 Y
 * @parent ----出售类型窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 出售类型窗口移动时长
 * @parent ----出售类型窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 是否使用出售类型窗口布局
 * @parent ----出售类型窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-出售类型窗口
 * @desc 出售类型窗口的图片资源。
 * @parent 是否使用出售类型窗口布局
 * @default 商店界面-出售类型窗口
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 平移-出售类型窗口布局 X
 * @parent 是否使用出售类型窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-出售类型窗口布局 Y
 * @parent 是否使用出售类型窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 出售类型窗口宽度
 * @parent ----出售类型窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 170
 *
 * @param 出售类型窗口高度
 * @parent ----出售类型窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 240
 *
 * @param 出售类型窗口列数
 * @parent ----出售类型窗口----
 * @type number
 * @min 1
 * @desc 出售类型窗口的列数。
 * @default 1
 *
 * @param 出售类型窗口字体大小
 * @parent ----出售类型窗口----
 * @type number
 * @min 1
 * @desc 出售类型窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 出售类型对齐方式
 * @parent ----出售类型窗口----
 * @type select
 * @option 左对齐
 * @value left
 * @option 居中
 * @value center
 * @option 右对齐
 * @value right
 * @desc 选项文本的对齐方式，left - 左对齐，center- 居中，right - 右对齐。
 * @default left
 *
 * @param ----服务员----
 * @default 
 *
 * @param 服务员-1
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-2
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-3
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-4
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-5
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-6
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-7
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-8
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-9
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-10
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-11
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-12
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-13
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-14
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-15
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-16
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-17
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-18
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-19
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 *
 * @param 服务员-20
 * @parent ----服务员----
 * @type struct<ShopWaitress>
 * @desc 设置商店的服务员。
 * @default 
 * 
 *
 */
/*~struct~ShopWaitress:
 * 
 *
 * @param 资源-服务员
 * @desc 服务员的图片资源。
 * @default 
 * @require 1
 * @dir img/menus_shop/
 * @type file
 *
 * @param 平移-服务员 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 580
 *
 * @param 平移-服务员 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 200
 *
 * @param 服务员起点 X
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default 80
 *
 * @param 服务员起点 Y
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 服务员移动时长
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 50
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		临时全局变量	DrillUp.xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	$gameSystem._drill_xxx
//		全局存储变量	无
//		覆盖重写方法	重写方法非常多，未带 drill_ 前缀的都是
//
//插件记录：
//		rmmv本体的代码太烂，每个变量布局都被相互制约。
//		各窗口初始化全被写死了，如果覆盖某些泛用窗口又会影响其他的菜单。
//		所以这里采取的全是在初始化之后，修改窗口的各个参数。
//		有些参数由于内部关系，必须在初始化前就设置好，所以窗口的格式都有一些不同的小变动。（本来想完全统一写法的，现在没办法控制了）
//
//		（目前知道的最好的方法是继承 window_selectable 并新写9个窗口，展开全部方法，然而现在已经都写出来，晚了）
//		（另外，调整坐标和画素材的我被这个弄炸了……）
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_SenceShop = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_SenceShop');
    DrillUp.scShop_layout = String(DrillUp.parameters['资源-整体布局'] || "");
    DrillUp.scShop_layout_help = String(DrillUp.parameters['资源-帮助窗口'] || "");
    DrillUp.scShop_layout_gold = String(DrillUp.parameters['资源-金钱窗口'] || "");
    DrillUp.scShop_layout_buy = String(DrillUp.parameters['资源-购买窗口'] || "");
    DrillUp.scShop_layout_status = String(DrillUp.parameters['资源-持有数窗口'] || "");
    DrillUp.scShop_layout_number = String(DrillUp.parameters['资源-物品数量窗口'] || "");
    DrillUp.scShop_layout_sell = String(DrillUp.parameters['资源-出售窗口'] || "");
    DrillUp.scShop_layout_category = String(DrillUp.parameters['资源-出售类型窗口'] || "");
	
	DrillUp.scShop_btn_start_X = Number(DrillUp.parameters['平移-按钮起点 X'] || 25);
	DrillUp.scShop_btn_start_Y = Number(DrillUp.parameters['平移-按钮起点 Y'] || 130); 
	DrillUp.scShop_btn_active_X = Number(DrillUp.parameters['平移-激活的按钮 X'] || 25);
	DrillUp.scShop_btn_active_Y = Number(DrillUp.parameters['平移-激活的按钮 Y'] || 130);   
    DrillUp.scShop_btn_1 = String(DrillUp.parameters['资源-购买按钮'] || "");
	DrillUp.scShop_btn_1X = Number(DrillUp.parameters['平移-购买按钮 X'] || 370);
	DrillUp.scShop_btn_1Y = Number(DrillUp.parameters['平移-购买按钮 Y'] || 210);  
    DrillUp.scShop_btn_2 = String(DrillUp.parameters['资源-出售按钮'] || "");
	DrillUp.scShop_btn_2X = Number(DrillUp.parameters['平移-出售按钮 X'] || 370);
	DrillUp.scShop_btn_2Y = Number(DrillUp.parameters['平移-出售按钮 Y'] || 295);  
    DrillUp.scShop_btn_3 = String(DrillUp.parameters['资源-离开按钮'] || "");
	DrillUp.scShop_btn_3X = Number(DrillUp.parameters['平移-离开按钮 X'] || 370);
	DrillUp.scShop_btn_3Y = Number(DrillUp.parameters['平移-离开按钮 Y'] || 380);  
	DrillUp.scShop_buyingPer = Number(DrillUp.parameters['默认购买倍率'] || 1);
	DrillUp.scShop_sellingPer = Number(DrillUp.parameters['默认出售倍率'] || 0.5);
	
	DrillUp.scShop_help_x = Number(DrillUp.parameters['平移-帮助窗口 X'] || 30);
	DrillUp.scShop_help_y = Number(DrillUp.parameters['平移-帮助窗口 Y'] || 120);
	DrillUp.scShop_help_slideX = Number(DrillUp.parameters['帮助窗口起点 X'] || -100);
	DrillUp.scShop_help_slideY = Number(DrillUp.parameters['帮助窗口起点 Y'] || 0);
	DrillUp.scShop_help_slideTime = Number(DrillUp.parameters['帮助窗口移动时长'] || 30);
	DrillUp.scShop_help_Layout_visible = String(DrillUp.parameters['是否使用帮助窗口布局'] || "true") === "true";	
	DrillUp.scShop_help_LayoutX = Number(DrillUp.parameters['平移-帮助窗口布局 X'] || 0);
	DrillUp.scShop_help_LayoutY = Number(DrillUp.parameters['平移-帮助窗口布局 Y'] || 0);
	DrillUp.scShop_help_width = Number(DrillUp.parameters['帮助窗口宽度'] || 220);
	DrillUp.scShop_help_height = Number(DrillUp.parameters['帮助窗口高度'] || 460);
	DrillUp.scShop_help_fontsize = Number(DrillUp.parameters['帮助窗口字体大小'] || 22);
	
	DrillUp.scShop_gold_x = Number(DrillUp.parameters['平移-金钱窗口 X'] || 30);
	DrillUp.scShop_gold_y = Number(DrillUp.parameters['平移-金钱窗口 Y'] || 120);
	DrillUp.scShop_gold_slideX = Number(DrillUp.parameters['金钱窗口起点 X'] || -100);
	DrillUp.scShop_gold_slideY = Number(DrillUp.parameters['金钱窗口起点 Y'] || 0);
	DrillUp.scShop_gold_slideTime = Number(DrillUp.parameters['金钱窗口移动时长'] || 30);
	DrillUp.scShop_gold_Layout_visible = String(DrillUp.parameters['是否使用金钱窗口布局'] || "true") === "true";	
	DrillUp.scShop_gold_LayoutX = Number(DrillUp.parameters['平移-金钱窗口布局 X'] || 0);
	DrillUp.scShop_gold_LayoutY = Number(DrillUp.parameters['平移-金钱窗口布局 Y'] || 0);
	DrillUp.scShop_gold_width = Number(DrillUp.parameters['金钱窗口宽度'] || 220);
	DrillUp.scShop_gold_height = Number(DrillUp.parameters['金钱窗口高度'] || 460);
	DrillUp.scShop_gold_fontsize = Number(DrillUp.parameters['金钱窗口字体大小'] || 22);
		
	DrillUp.scShop_buy_x = Number(DrillUp.parameters['平移-购买窗口 X'] || 30);
	DrillUp.scShop_buy_y = Number(DrillUp.parameters['平移-购买窗口 Y'] || 120);
	DrillUp.scShop_buy_slideX = Number(DrillUp.parameters['购买窗口起点 X'] || -100);
	DrillUp.scShop_buy_slideY = Number(DrillUp.parameters['购买窗口起点 Y'] || 0);
	DrillUp.scShop_buy_slideTime = Number(DrillUp.parameters['购买窗口移动时长'] || 30);
	DrillUp.scShop_buy_Layout_visible = String(DrillUp.parameters['是否使用购买窗口布局'] || "true") === "true";	
	DrillUp.scShop_buy_LayoutX = Number(DrillUp.parameters['平移-购买窗口布局 X'] || 0);
	DrillUp.scShop_buy_LayoutY = Number(DrillUp.parameters['平移-购买窗口布局 Y'] || 0);
	DrillUp.scShop_buy_width = Number(DrillUp.parameters['购买窗口宽度'] || 220);
	DrillUp.scShop_buy_height = Number(DrillUp.parameters['购买窗口高度'] || 460);
	DrillUp.scShop_buy_col = Number(DrillUp.parameters['购买窗口列数'] || 1);
	DrillUp.scShop_buy_fontsize = Number(DrillUp.parameters['购买窗口字体大小'] || 22);
	
	DrillUp.scShop_status_x = Number(DrillUp.parameters['平移-持有数窗口 X'] || 30);
	DrillUp.scShop_status_y = Number(DrillUp.parameters['平移-持有数窗口 Y'] || 120);
	DrillUp.scShop_status_slideX = Number(DrillUp.parameters['持有数窗口起点 X'] || -100);
	DrillUp.scShop_status_slideY = Number(DrillUp.parameters['持有数窗口起点 Y'] || 0);
	DrillUp.scShop_status_slideTime = Number(DrillUp.parameters['持有数窗口移动时长'] || 30);
	DrillUp.scShop_status_Layout_visible = String(DrillUp.parameters['是否使用持有数窗口布局'] || "true") === "true";	
	DrillUp.scShop_status_LayoutX = Number(DrillUp.parameters['平移-持有数窗口布局 X'] || 0);
	DrillUp.scShop_status_LayoutY = Number(DrillUp.parameters['平移-持有数窗口布局 Y'] || 0);
	DrillUp.scShop_status_width = Number(DrillUp.parameters['持有数窗口宽度'] || 220);
	DrillUp.scShop_status_height = Number(DrillUp.parameters['持有数窗口高度'] || 460);
	DrillUp.scShop_status_fontsize = Number(DrillUp.parameters['持有数窗口字体大小'] || 22);
	
	DrillUp.scShop_number_x = Number(DrillUp.parameters['平移-物品数量窗口 X'] || 30);
	DrillUp.scShop_number_y = Number(DrillUp.parameters['平移-物品数量窗口 Y'] || 120);
	DrillUp.scShop_number_slideX = Number(DrillUp.parameters['物品数量窗口起点 X'] || -100);
	DrillUp.scShop_number_slideY = Number(DrillUp.parameters['物品数量窗口起点 Y'] || 0);
	DrillUp.scShop_number_slideTime = Number(DrillUp.parameters['物品数量窗口移动时长'] || 30);
	DrillUp.scShop_number_Layout_visible = String(DrillUp.parameters['是否使用物品数量窗口布局'] || "true") === "true";	
	DrillUp.scShop_number_LayoutX = Number(DrillUp.parameters['平移-物品数量窗口布局 X'] || 0);
	DrillUp.scShop_number_LayoutY = Number(DrillUp.parameters['平移-物品数量窗口布局 Y'] || 0);
	DrillUp.scShop_number_width = Number(DrillUp.parameters['物品数量窗口宽度'] || 220);
	DrillUp.scShop_number_height = Number(DrillUp.parameters['物品数量窗口高度'] || 460);
	DrillUp.scShop_number_fontsize = Number(DrillUp.parameters['物品数量窗口字体大小'] || 22);
	
	DrillUp.scShop_sell_x = Number(DrillUp.parameters['平移-出售窗口 X'] || 30);
	DrillUp.scShop_sell_y = Number(DrillUp.parameters['平移-出售窗口 Y'] || 120);
	DrillUp.scShop_sell_slideX = Number(DrillUp.parameters['出售窗口起点 X'] || -100);
	DrillUp.scShop_sell_slideY = Number(DrillUp.parameters['出售窗口起点 Y'] || 0);
	DrillUp.scShop_sell_slideTime = Number(DrillUp.parameters['出售窗口移动时长'] || 30);
	DrillUp.scShop_sell_Layout_visible = String(DrillUp.parameters['是否使用出售窗口布局'] || "true") === "true";	
	DrillUp.scShop_sell_LayoutX = Number(DrillUp.parameters['平移-出售窗口布局 X'] || 0);
	DrillUp.scShop_sell_LayoutY = Number(DrillUp.parameters['平移-出售窗口布局 Y'] || 0);
	DrillUp.scShop_sell_width = Number(DrillUp.parameters['出售窗口宽度'] || 220);
	DrillUp.scShop_sell_height = Number(DrillUp.parameters['出售窗口高度'] || 460);
	DrillUp.scShop_sell_col = Number(DrillUp.parameters['出售窗口列数'] || 1);
	DrillUp.scShop_sell_fontsize = Number(DrillUp.parameters['出售窗口字体大小'] || 22);
	
	DrillUp.scShop_category_x = Number(DrillUp.parameters['平移-出售类型窗口 X'] || 30);
	DrillUp.scShop_category_y = Number(DrillUp.parameters['平移-出售类型窗口 Y'] || 120);
	DrillUp.scShop_category_slideX = Number(DrillUp.parameters['出售类型窗口起点 X'] || -100);
	DrillUp.scShop_category_slideY = Number(DrillUp.parameters['出售类型窗口起点 Y'] || 0);
	DrillUp.scShop_category_slideTime = Number(DrillUp.parameters['出售类型窗口移动时长'] || 30);
	DrillUp.scShop_category_Layout_visible = String(DrillUp.parameters['是否使用出售类型窗口布局'] || "true") === "true";	
	DrillUp.scShop_category_LayoutX = Number(DrillUp.parameters['平移-出售类型窗口布局 X'] || 0);
	DrillUp.scShop_category_LayoutY = Number(DrillUp.parameters['平移-出售类型窗口布局 Y'] || 0);
	DrillUp.scShop_category_width = Number(DrillUp.parameters['出售类型窗口宽度'] || 220);
	DrillUp.scShop_category_height = Number(DrillUp.parameters['出售类型窗口高度'] || 460);
	DrillUp.scShop_category_col = Number(DrillUp.parameters['出售类型窗口列数'] || 1);
	DrillUp.scShop_category_fontsize = Number(DrillUp.parameters['出售类型窗口字体大小'] || 22);
    DrillUp.scShop_category_align  = String(DrillUp.parameters['出售类型对齐方式'] || "left");	
	
	DrillUp.scShop_waitress_list = [];
	DrillUp.scShop_waitress_list_max = 20;
	
	for (var i = 0; i < DrillUp.scShop_waitress_list_max; i++) {
		if( DrillUp.parameters['服务员-' + String(i+1) ] != "" ){
			DrillUp.scShop_waitress_list[i] = JSON.parse(DrillUp.parameters['服务员-' + String(i+1) ]);
			DrillUp.scShop_waitress_list[i]['src_img'] = String(DrillUp.scShop_waitress_list[i]["资源-服务员"]);
			DrillUp.scShop_waitress_list[i]['x'] = Number(DrillUp.scShop_waitress_list[i]["平移-服务员 X"]);
			DrillUp.scShop_waitress_list[i]['y'] = Number(DrillUp.scShop_waitress_list[i]["平移-服务员 Y"]);
			DrillUp.scShop_waitress_list[i]['slide_x'] = Number(DrillUp.scShop_waitress_list[i]["服务员起点 X"]);
			DrillUp.scShop_waitress_list[i]['slide_y'] = Number(DrillUp.scShop_waitress_list[i]["服务员起点 Y"]);
			DrillUp.scShop_waitress_list[i]['slide_time'] = Number(DrillUp.scShop_waitress_list[i]["服务员移动时长"]);
		}else{
			DrillUp.scShop_waitress_list[i] = [];
		}
	}
	
//=============================================================================
// ** ImageManager
//=============================================================================
ImageManager.loadMenuShop = function(filename) {
    return this.loadBitmap('img/menus_shop/', filename, 0, true);
};

//==============================
// * 插件指令
//==============================
var _scShop_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_scShop_Game_Interpreter_pluginCommand.call(this, command, args);
	//切换商店服务员
	if (command === 'shop_waitress') {
		if(args.length == 1){
			var temp = Number(args[0]) - 1;
			$gameSystem._drill_shop_waitress_id = temp;
		}
	}
	//价格倍率
	if (command === 'shop_buy_rate') {
		if(args.length == 1){
			var temp = Number(args[0]);
			$gameSystem._drill_shop_buy_rate = temp;
		}
	}
	if (command === 'shop_sell_rate') {
		if(args.length == 1){
			var temp = Number(args[0]);
			$gameSystem._drill_shop_sell_rate = temp;
		}
	}
	if (command === 'shop_buy_rate_v') {
		if(args.length == 1){
			var temp = Number(args[0]);
			$gameSystem._drill_shop_buy_rate = $gameVariables.value(temp) / 1000;
		}
	}
	if (command === 'shop_sell_rate_v') {
		if(args.length == 1){
			var temp = Number(args[0]);
			$gameSystem._drill_shop_sell_rate = $gameVariables.value(temp) / 1000;
		}
	}
	if (command === 'shop_reset_rate') {
		$gameSystem._drill_shop_buy_rate = DrillUp.scShop_buyingPer;
		$gameSystem._drill_shop_sell_rate = DrillUp.scShop_sellingPer;
	}
	//交换商店
	if (command === 'shop_exchange_mode') {
		if(args.length == 2){
			var temp1 = Number(args[0]);
			var temp2 = args[1];
			$gameSystem._drill_exchange_mode = true;
			$gameSystem._drill_exchange_item = temp1;
			$gameSystem._drill_exchange_unit = temp2;
		}
	}
	if (command === 'shop_exchange_off') {
		$gameSystem._drill_exchange_mode = false;
	}
	
};

//==============================
// * $gameSystem 存储数据初始化
// *（初始化一次，如果有存档数据，数值覆盖第二次，全局数据需要手动载入）
//==============================
var _drill_Shop_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_Shop_system_initialize.call(this);
	this._drill_shop_buy_rate = DrillUp.scShop_buyingPer;
	this._drill_shop_sell_rate = DrillUp.scShop_sellingPer;
};	


//==============================
// * 商店-初始化
//==============================
var _drill_Shop_initialize = Scene_Shop.prototype.initialize;
Scene_Shop.prototype.initialize = function() {
	_drill_Shop_initialize.call(this);
	
};

//==============================
// * 商店-创建
//==============================
Scene_Shop.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	
    this.createHelpWindow();
    this.createGoldWindow();
    this.createCommandWindow();
    this.createDummyWindow();
    this.createNumberWindow();
    this.createStatusWindow();
    this.createBuyWindow();
    this.createCategoryWindow();
    this.createSellWindow();
	
	this._commandWindow.zIndex = 1;	//窗口显示先后顺序重配
	this._helpWindow.zIndex = 2;
	this._buyWindow.zIndex = 3;
	this._numberWindow.zIndex = 4;
	this._categoryWindow.zIndex = 5;
	this._sellWindow.zIndex = 6;
	this._statusWindow.zIndex = 7;
	this._goldWindow.zIndex = 8;
	this.drill_sortByZIndex();
	
	this.drill_createLayout();
	this.drill_createButtons();
	this.drill_createWaitress();
};

Scene_Shop.prototype.drill_sortByZIndex = function() {
	this._windowLayer.children.sort(function(a, b){	//比较器
		if(!a.zIndex ){a.zIndex = 1;}
		if(!b.zIndex ){b.zIndex = 1;}
		return a.zIndex-b.zIndex;
	});
};

//==============================
// * 商店-在背景的上一层添加布局
//==============================
var _drill_Shop_createBackground = Scene_Shop.prototype.createBackground;
Scene_Shop.prototype.createBackground = function() {
	_drill_Shop_createBackground.call(this);
	this._field = new Sprite();
	this.addChild(this._field);	
}

//==============================
// * 商店-每帧刷新
//==============================
var _drill_Shop_update = Scene_Shop.prototype.update;
Scene_Shop.prototype.update = function() { 
	_drill_Shop_update.call(this);
	this.drill_updateHelpWindow();
	this.drill_updateGoldWindow();
	this.drill_updateBuyWindow();
	this.drill_updateStatusWindow();
	this.drill_updateNumberWindow();
	this.drill_updateSellWindow();
	this.drill_updateCategoryWindow();
	
	this.drill_updateButtons();
	this.drill_updateWaitress();
	
	this.drill_checkKeyTouch();			//键盘按键监听
    if (TouchInput.isTriggered()) {		//鼠标点击图片监听
		this.drill_checkImgTouch();
	};
}

//==============================
// * 商店-键盘按键监听
//==============================
Scene_Shop.prototype.drill_checkKeyTouch = function() {
	
	//键盘 - 选项按钮组
	if( this._commandWindow.active ){
		if (Input.isRepeated("up")) {this._commandWindow.cursorLeft();SoundManager.playCursor();}
		else if (Input.isRepeated("down")) {this._commandWindow.cursorRight();SoundManager.playCursor();}
	}
}
//==============================
// * 商店-鼠标点击图片监听
//==============================
Scene_Shop.prototype.drill_checkImgTouch = function() {
	
	//图片 - 选项按钮组
	if( this._commandWindow.active ){
		 for (var i = 0; i < this._drill_buttons.length; i++) {
			if (this.drill_isOnSprite(this._drill_buttons[i])) {
				if(this._commandWindow._index != i){	//点击未激活按钮
					SoundManager.playCursor();
					this._commandWindow._index = i;
				}else{	//点击已激活按钮
					SoundManager.playOk();
					this._commandWindow.active = false;
					if( i == 0 ){
						this.commandBuy();
					}
					if( i == 1 ){
						this.commandSell();
					}
					if( i == 2 ){
						this.popScene();
					}
				}
			};
		 };
	}
}
//==============================
// * 商店-鼠标点击图片范围判断
//==============================
Scene_Shop.prototype.drill_isOnSprite = function(sprite) {
	 var cw = sprite.bitmap.width / 2;
	 var ch = sprite.bitmap.height / 2;
	 if (sprite.visible === false) {return false};
	 if (sprite.opacity === 0) {return false};
	 if (TouchInput.x < sprite.x - cw) {return false};
	 if (TouchInput.x > sprite.x + cw) {return false};
	 if (TouchInput.y < sprite.y - ch) {return false};
	 if (TouchInput.y > sprite.y + ch) {return false};
	 return true;	
};

//==============================
// * 商店-整体布局
//==============================
Scene_Shop.prototype.drill_createLayout = function() {
	this._layout = new Sprite(ImageManager.loadMenuShop(DrillUp.scShop_layout));
	this._field.addChild(this._layout);	
};

//=============================================================================
// ** 商店-选项按钮组
//=============================================================================

//==============================
// * 商店-选项按钮窗口（直接隐藏）
//==============================
Scene_Shop.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_ShopCommand(0, this._purchaseOnly);
	this._commandWindow.y = Graphics.boxHeight * 2
    this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
    this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

//==============================
// * 商店-选项按钮初始化
//==============================
Scene_Shop.prototype.drill_createButtons = function() {
    this._drill_buttons = [];
	this._drill_buttons_data = [];		//建立按钮组
	
	var temp_btn_data1 = {};
	temp_btn_data1['bitmap'] = DrillUp.scShop_btn_1;
	temp_btn_data1['org_x'] = DrillUp.scShop_btn_1X;
	temp_btn_data1['org_y'] = DrillUp.scShop_btn_1Y;
	temp_btn_data1['Ani'] = 0;
	temp_btn_data1['start_x'] = DrillUp.scShop_btn_start_X;
	temp_btn_data1['start_y'] = DrillUp.scShop_btn_start_Y;
	temp_btn_data1['active_x'] = DrillUp.scShop_btn_active_X;
	temp_btn_data1['active_y'] = DrillUp.scShop_btn_active_Y;
	this._drill_buttons_data.push(temp_btn_data1);
	
	var temp_btn_data2 = {};
	temp_btn_data2['bitmap'] = DrillUp.scShop_btn_2;
	temp_btn_data2['org_x'] = DrillUp.scShop_btn_2X;
	temp_btn_data2['org_y'] = DrillUp.scShop_btn_2Y;
	temp_btn_data2['Ani'] = 0;
	temp_btn_data2['start_x'] = DrillUp.scShop_btn_start_X;
	temp_btn_data2['start_y'] = DrillUp.scShop_btn_start_Y;
	temp_btn_data2['active_x'] = DrillUp.scShop_btn_active_X;
	temp_btn_data2['active_y'] = DrillUp.scShop_btn_active_Y;
	this._drill_buttons_data.push(temp_btn_data2);
	
	var temp_btn_data3 = {};
	temp_btn_data3['bitmap'] = DrillUp.scShop_btn_3;
	temp_btn_data3['org_x'] = DrillUp.scShop_btn_3X;
	temp_btn_data3['org_y'] = DrillUp.scShop_btn_3Y;
	temp_btn_data3['Ani'] = 0;
	temp_btn_data3['start_x'] = DrillUp.scShop_btn_start_X;
	temp_btn_data3['start_y'] = DrillUp.scShop_btn_start_Y;
	temp_btn_data3['active_x'] = DrillUp.scShop_btn_active_X;
	temp_btn_data3['active_y'] = DrillUp.scShop_btn_active_Y;
	this._drill_buttons_data.push(temp_btn_data3);
	
    for (var i = 0; i < this._drill_buttons_data.length ; i++) {
		temp_btn = new Sprite();
		temp_btn.anchor.x = 0.5;
		temp_btn.anchor.y = 0.5;
		temp_btn.bitmap = ImageManager.loadMenuShop(this._drill_buttons_data[i]['bitmap']);
		temp_btn.x = this._drill_buttons_data[i]['start_x'];
		temp_btn.y = this._drill_buttons_data[i]['start_y'];
		temp_btn.opacity = 255;
		
		this._drill_buttons.push(temp_btn);
		this._field.addChild(temp_btn);
	};
	if( this._purchaseOnly ){ this._drill_buttons[1].visible = false }
};

//==============================
// * 商店-选项按钮切换选项
//==============================
Window_ShopCommand.prototype.cursorRight = function(wrap) {
    this._index += 1;
    if (this._index > 2) {
		this._index = 0;
    }
	if( this._purchaseOnly && this._index == 1 ){
		this._index += 1;
	}
};
//==============================
// * 商店-选项按钮切换选项
//==============================
Window_ShopCommand.prototype.cursorLeft = function(wrap) {
    this._index -= 1;
    if (this._index < 0) {
		this._index = 2;
    }
	if( this._purchaseOnly && this._index == 1 ){
		this._index -= 1;
	}
};
//==============================
// * 商店-选项按钮帧变化
//==============================
Scene_Shop.prototype.drill_updateButtons = function() {
	
	for (var i = 0; i < this._drill_buttons.length; i++) {
		var temp_btn = this._drill_buttons[i];
		var temp_btn_data = this._drill_buttons_data[i];
		//alert(JSON.stringify(temp_btn_data));
		
		if( this._commandWindow.active ){	//选择按钮时
			if (this._commandWindow._index === i )  {	//当前选中的按钮（缩放）
				if (temp_btn_data['Ani'] === 0) {
					this.drill_scale_move_to(temp_btn,1.30, 0.01);
					if (temp_btn.scale.x >= 1.30) {
						temp_btn_data['Ani'] = 1; 
					};
				} else  {
					this.drill_scale_move_to(temp_btn,1.00, 0.01);
					if (temp_btn.scale.x <= 1.00) {
						temp_btn_data['Ani'] = 0; 
					};				 
				};
				this.drill_opacity_move_to(temp_btn,255,20); 
				this.drill_button_move_to(temp_btn,temp_btn_data['org_x'],temp_btn_data['org_y'],7);
				
			} else {	//当前未选中的按钮（半隐藏）
				temp_btn_data['Ani'] = 0
				this.drill_scale_move_to(temp_btn,1.00, 0.01);
				this.drill_opacity_move_to(temp_btn,180,4); 
				this.drill_button_move_to(temp_btn,temp_btn_data['org_x'],temp_btn_data['org_y'],7);
			};
			
		}else{	//按钮激活时
			if (this._commandWindow._index === i )  {	//激活的按钮
				temp_btn_data['Ani'] = 0; 
				this.drill_scale_move_to(temp_btn,1.00, 0.01);
				this.drill_opacity_move_to(temp_btn,255,20); 
				this.drill_button_move_to(temp_btn,temp_btn_data['active_x'],temp_btn_data['active_y'],10);
				
			} else {	//未激活的按钮（隐藏）
				temp_btn_data['Ani'] = 0
				this.drill_scale_move_to(temp_btn,1.00, 0.01);
				this.drill_opacity_move_to(temp_btn,0,15); 
				this.drill_button_move_to(temp_btn,temp_btn_data['org_x'],temp_btn_data['org_y'],7);
			};
		}
	};
};

//==============================
// * 商店-选项按钮变化工具方法
//==============================
Scene_Shop.prototype.drill_button_move_to = function(sprite,x,y,speed) {
	var dx = sprite.x - x;
	var dy = sprite.y - y;
	if( dx < 0 ){ sprite.x += speed; }
	if( dx > 0 ){ sprite.x -= speed; }
	if( dy < 0 ){ sprite.y += speed; }
	if( dy > 0 ){ sprite.y -= speed; }
		
	if( Math.abs(dx) <= speed ){ sprite.x = x; }
	if( Math.abs(dy) <= speed ){ sprite.y = y; }
}
Scene_Shop.prototype.drill_opacity_move_to = function(sprite,o,speed) {
	var d_o = sprite.opacity - o;
	if( d_o < 0 ){ sprite.opacity += speed; }
	if( d_o > 0 ){ sprite.opacity -= speed; }
		
	if( Math.abs(d_o) <= speed ){ sprite.opacity = o; }
}
Scene_Shop.prototype.drill_scale_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.x - s;
	if( ds < 0 ){ sprite.scale.x += speed; }
	if( ds > 0 ){ sprite.scale.x -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.x = s; }
	sprite.scale.y = sprite.scale.x;
}

//=============================================================================
// ** 商店-帮助窗口
//=============================================================================

Scene_Shop.prototype.createHelpWindow = function() {
	var wx = DrillUp.scShop_help_x;
    var wy = DrillUp.scShop_help_y;
	var ww = DrillUp.scShop_help_width;
    var wh = DrillUp.scShop_help_height;
    this._helpWindow = new Window_Help();
    this._helpWindow.x = wx + DrillUp.scShop_help_slideX;
    this._helpWindow.y = wy + DrillUp.scShop_help_slideY;
    this._helpWindow.width = ww;
    this._helpWindow.height = wh;
	this._helpWindow.windowWidth = function(){ return ww;}
	this._helpWindow.windowHeight = function(){ return wh;}
	this._helpWindow.opacity = 0;
	this._helpWindow.contentsOpacity = 0;
	this._helpWindow._move = 0;
    this._helpWindow.standardFontSize = function(){ return DrillUp.scShop_help_fontsize;}
	if( DrillUp.scShop_help_Layout_visible ){
		this._layout_helpWindow = new Sprite(ImageManager.loadMenuShop(DrillUp.scShop_layout_help));
		this._layout_helpWindow.opacity = 0;
		this._field.addChild(this._layout_helpWindow);	
	}
    this.addWindow(this._helpWindow);
}
Scene_Shop.prototype.drill_updateHelpWindow = function() {
	this._helpWindow._move += 1;
	if( this._helpWindow._move <= DrillUp.scShop_help_slideTime ){
		this._helpWindow.x -= DrillUp.scShop_help_slideX / DrillUp.scShop_help_slideTime;
		this._helpWindow.y -= DrillUp.scShop_help_slideY / DrillUp.scShop_help_slideTime;
		this._helpWindow.contentsOpacity += 256 / DrillUp.scShop_help_slideTime;
		if( DrillUp.scShop_help_Layout_visible ){
			this._layout_helpWindow.x = this._helpWindow.x + DrillUp.scShop_help_LayoutX;
			this._layout_helpWindow.y = this._helpWindow.y + DrillUp.scShop_help_LayoutY;
			this._layout_helpWindow.opacity = this._helpWindow.contentsOpacity;
		}else{
			this._helpWindow.opacity += 256 / DrillUp.scShop_help_slideTime;
		}
	}
}


//=============================================================================
// ** 商店-金钱窗口
//=============================================================================

Window_Gold.prototype.initialize = function(x, y , width, height) {
    if(!width){var width = this.windowWidth();}
    if(!height){var height = this.windowHeight();}
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Scene_Shop.prototype.createGoldWindow = function() {
	var wx = DrillUp.scShop_gold_x;
    var wy = DrillUp.scShop_gold_y;
	var ww = DrillUp.scShop_gold_width;
    var wh = DrillUp.scShop_gold_height;
    this._goldWindow = new Window_Gold(wx,wy,ww,wh);
    this._goldWindow.x = wx + DrillUp.scShop_gold_slideX;
    this._goldWindow.y = wy + DrillUp.scShop_gold_slideY;
    this._goldWindow.width = ww;
    this._goldWindow.height = wh;
	this._goldWindow.windowWidth = function(){ return ww;}
	this._goldWindow.windowHeight = function(){ return wh;}
	this._goldWindow.opacity = 0;
	this._goldWindow.contentsOpacity = 0;
	this._goldWindow._move = 0;
    this._goldWindow.standardFontSize = function(){ return DrillUp.scShop_gold_fontsize;}
	if( DrillUp.scShop_gold_Layout_visible ){
		this._layout_goldWindow = new Sprite(ImageManager.loadMenuShop(DrillUp.scShop_layout_gold));
		this._layout_goldWindow.opacity = 0;
		this._field.addChild(this._layout_goldWindow);	
	}
    this.addWindow(this._goldWindow);
};

Scene_Shop.prototype.drill_updateGoldWindow = function() {
	this._goldWindow._move += 1;
	if( this._goldWindow._move <= DrillUp.scShop_gold_slideTime ){
		this._goldWindow.x -= DrillUp.scShop_gold_slideX / DrillUp.scShop_gold_slideTime;
		this._goldWindow.y -= DrillUp.scShop_gold_slideY / DrillUp.scShop_gold_slideTime;
		this._goldWindow.contentsOpacity += 256 / DrillUp.scShop_gold_slideTime;
		if( DrillUp.scShop_gold_Layout_visible ){
			this._layout_goldWindow.x = this._goldWindow.x + DrillUp.scShop_gold_LayoutX;
			this._layout_goldWindow.y = this._goldWindow.y + DrillUp.scShop_gold_LayoutY;
			this._layout_goldWindow.opacity = this._goldWindow.contentsOpacity;
		}else{
			this._goldWindow.opacity += 256 / DrillUp.scShop_gold_slideTime;
		}
	}
}	

//==============================
// * 商店-金钱窗口交换物设置
//==============================
Window_Gold.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
	
	if( $gameSystem._drill_exchange_mode ){
		this.drawCurrencyValue(this.value(),this.convertEscapeCharacters($gameSystem._drill_exchange_unit), x, 0, width);
	}else{
		this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
	}
};
Window_Gold.prototype.value = function() {
	if( $gameSystem._drill_exchange_mode ){
		return $gameParty.numItems( $dataItems[$gameSystem._drill_exchange_item ] );
	}else{
		return $gameParty.gold();
	}
};
Window_Gold.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};
var _drill_window_gold_drawCurrencyValue = Window_Gold.prototype.drawCurrencyValue;
Window_Gold.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
	if( $gameSystem._drill_exchange_mode ){
		var unitWidth = Math.min(80, this.textWidth(unit));
		this.resetTextColor();
		this.drawText(value, x, y, width - unitWidth - 6, 'right');
		this.changeTextColor(this.systemColor());
		this.drawTextEx(unit, x + width - unitWidth, y );		//修改货币单位为图标
	}else{
		_drill_window_gold_drawCurrencyValue.call(this,value, unit, x, y, width);
	}
};

//==============================
// * 商店-空白窗口
//==============================
Scene_Shop.prototype.createDummyWindow = function() {
    var wy = Graphics.boxHeight * 2;
    var wh = 0;
    this._dummyWindow = new Window_Base(0, wy, Graphics.boxWidth, wh);
	this._dummyWindow.visible = false;
    this.addWindow(this._dummyWindow);
};

//=============================================================================
// ** 商店-购买窗口
//=============================================================================

//==============================
// * 商店-购买窗口初始化
//==============================
Scene_Shop.prototype.createBuyWindow = function() {
	var wx = DrillUp.scShop_buy_x;
    var wy = DrillUp.scShop_buy_y;
	var ww = DrillUp.scShop_buy_width;
    var wh = DrillUp.scShop_buy_height;
    this._buyWindow = new Window_ShopBuy(wx, wy, wh, this._goods);
    this._buyWindow.x = wx + DrillUp.scShop_buy_slideX;
    this._buyWindow.y = wy + DrillUp.scShop_buy_slideY;
    this._buyWindow.width = ww;
    this._buyWindow.height = wh;
	this._buyWindow.windowWidth = function(){ return ww;}
	this._buyWindow.windowHeight = function(){ return wh;}
	this._buyWindow.opacity = 0;
	this._buyWindow.contentsOpacity = 0;
	this._buyWindow.visible = false;
	this._buyWindow._move = 0;
	this._buyWindow.standardFontSize = function(){ return DrillUp.scShop_buy_fontsize;}
	this._buyWindow.maxCols = function(){ return DrillUp.scShop_buy_col;}
    this._buyWindow.hide = function(){ return null;}	//购买窗口禁止瞬间隐藏
	if( DrillUp.scShop_buy_Layout_visible ){
		this._layout_buyWindow = new Sprite(ImageManager.loadMenuShop(DrillUp.scShop_layout_buy));
		this._layout_buyWindow.opacity = 0;
		this._field.addChild(this._layout_buyWindow);	
	}
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._buyWindow.hide();
    this._buyWindow.setHandler('ok',     this.onBuyOk.bind(this));
    this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
    this.addWindow(this._buyWindow);
};

//==============================
// * 商店-购买窗口帧变化
//==============================
Scene_Shop.prototype.drill_updateBuyWindow = function() {
	if( this._buyWindow.active ||
		(this._commandWindow._index === 0 && this._numberWindow.active ) ){	//购买窗口显示
		if( this._buyWindow._move < DrillUp.scShop_buy_slideTime ){
			this._buyWindow.x -= DrillUp.scShop_buy_slideX / DrillUp.scShop_buy_slideTime;
			this._buyWindow.y -= DrillUp.scShop_buy_slideY / DrillUp.scShop_buy_slideTime;
			this._buyWindow.contentsOpacity += 256 / DrillUp.scShop_buy_slideTime;
			if( DrillUp.scShop_buy_Layout_visible ){
				this._layout_buyWindow.x = this._buyWindow.x + DrillUp.scShop_buy_LayoutX;
				this._layout_buyWindow.y = this._buyWindow.y + DrillUp.scShop_buy_LayoutY;
				this._layout_buyWindow.opacity = this._buyWindow.contentsOpacity;
			}else{
				this._buyWindow.opacity += 256 / DrillUp.scShop_buy_slideTime;
			}
		}
		this._buyWindow._move += 1;
		this._buyWindow.visible = true;
		if( this._buyWindow._move >= DrillUp.scShop_buy_slideTime ){ this._buyWindow._move = DrillUp.scShop_buy_slideTime }
		
	}else{	//购买窗口隐藏
		if( this._buyWindow._move > 0 ){
			this._buyWindow.x += DrillUp.scShop_buy_slideX / DrillUp.scShop_buy_slideTime;
			this._buyWindow.y += DrillUp.scShop_buy_slideY / DrillUp.scShop_buy_slideTime;
			this._buyWindow.contentsOpacity -= 256 / DrillUp.scShop_buy_slideTime;
			if( DrillUp.scShop_buy_Layout_visible ){
				this._layout_buyWindow.x = this._buyWindow.x + DrillUp.scShop_buy_LayoutX;
				this._layout_buyWindow.y = this._buyWindow.y + DrillUp.scShop_buy_LayoutY;
				this._layout_buyWindow.opacity = this._buyWindow.contentsOpacity;
			}else{
				this._buyWindow.opacity -= 256 / DrillUp.scShop_buy_slideTime;
			}
		}
		this._buyWindow._move -= 1;
		if( this._buyWindow._move <= 0 ){ this._buyWindow._move = 0;this._buyWindow.visible = false; }
	}
}	

//==============================
// * 商店-执行购买
//==============================
Scene_Shop.prototype.doBuy = function(number) {
	if( $gameSystem._drill_exchange_mode ){
		$gameParty.loseItem($dataItems[$gameSystem._drill_exchange_item], number*this.buyingPrice() );
	}else{
		$gameParty.loseGold(number * this.buyingPrice() );
	}
    $gameParty.gainItem(this._item, number);
};

//==============================
// * 商店-购买倍率
//==============================
Window_ShopBuy.prototype.price = function(item) {		
	var result = Math.floor( (this._price[this._data.indexOf(item)] || 0) * $gameSystem._drill_shop_buy_rate );
	if( result == 0 ){ result = 1;}
	return result;
};


//=============================================================================
// ** 商店-持有数窗口
//=============================================================================

//==============================
// * 商店-持有数窗口初始化
//==============================
Scene_Shop.prototype.createStatusWindow = function() {
	var wx = DrillUp.scShop_status_x;
    var wy = DrillUp.scShop_status_y;
	var ww = DrillUp.scShop_status_width;
    var wh = DrillUp.scShop_status_height;
    this._statusWindow = new Window_ShopStatus(wx, wy, ww, wh);
    this._statusWindow.x = wx + DrillUp.scShop_status_slideX;
    this._statusWindow.y = wy + DrillUp.scShop_status_slideY;
    this._statusWindow.width = ww;
    this._statusWindow.height = wh;
	this._statusWindow.windowWidth = function(){ return ww;}
	this._statusWindow.windowHeight = function(){ return wh;}
	this._statusWindow.opacity = 0;
	this._statusWindow.contentsOpacity = 0;
	this._statusWindow.visible = false;
	this._statusWindow._move = 0;
	this._statusWindow.standardFontSize = function(){ return DrillUp.scShop_status_fontsize;}
    this._statusWindow.hide = function(){ return null;}
	if( DrillUp.scShop_status_Layout_visible ){
		this._layout_statusWindow = new Sprite(ImageManager.loadMenuShop(DrillUp.scShop_layout_status));
		this._layout_statusWindow.opacity = 0;
		this._field.addChild(this._layout_statusWindow);	
	}
    this._statusWindow.hide();
    this.addWindow(this._statusWindow);
};

//==============================
// * 商店-持有数窗口帧变化
//==============================
Scene_Shop.prototype.drill_updateStatusWindow = function() {
	if( this._statusWindow.active ){	//持有数窗口显示
		if( this._statusWindow._move < DrillUp.scShop_status_slideTime ){
			this._statusWindow.x -= DrillUp.scShop_status_slideX / DrillUp.scShop_status_slideTime;
			this._statusWindow.y -= DrillUp.scShop_status_slideY / DrillUp.scShop_status_slideTime;
			this._statusWindow.contentsOpacity += 256 / DrillUp.scShop_status_slideTime;
			if( DrillUp.scShop_status_Layout_visible ){
				this._layout_statusWindow.x = this._statusWindow.x + DrillUp.scShop_status_LayoutX;
				this._layout_statusWindow.y = this._statusWindow.y + DrillUp.scShop_status_LayoutY;
				this._layout_statusWindow.opacity = this._statusWindow.contentsOpacity;
			}else{
				this._statusWindow.opacity += 256 / DrillUp.scShop_status_slideTime;
			}
		}
		this._statusWindow._move += 1;
		this._statusWindow.visible = true;
		if( this._statusWindow._move >= DrillUp.scShop_status_slideTime ){ this._statusWindow._move = DrillUp.scShop_status_slideTime }
		
	}else{	//持有数窗口隐藏
		if( this._statusWindow._move > 0 ){
			this._statusWindow.x += DrillUp.scShop_status_slideX / DrillUp.scShop_status_slideTime;
			this._statusWindow.y += DrillUp.scShop_status_slideY / DrillUp.scShop_status_slideTime;
			this._statusWindow.contentsOpacity -= 256 / DrillUp.scShop_status_slideTime;
			if( DrillUp.scShop_status_Layout_visible ){
				this._layout_statusWindow.x = this._statusWindow.x + DrillUp.scShop_status_LayoutX;
				this._layout_statusWindow.y = this._statusWindow.y + DrillUp.scShop_status_LayoutY;
				this._layout_statusWindow.opacity = this._statusWindow.contentsOpacity;
			}else{
				this._statusWindow.opacity -= 256 / DrillUp.scShop_status_slideTime;
			}
		}
		this._statusWindow._move -= 1;
		if( this._statusWindow._move <= 0 ){ this._statusWindow._move = 0;this._statusWindow.visible = false; }
	}
}	
//==============================
// * 商店-持有数窗口刷新
//==============================
var _drill_scShop_Status_refresh = Window_ShopStatus.prototype.refresh;
Window_ShopStatus.prototype.refresh = function() {
	this.contents.fontSize = DrillUp.scShop_status_fontsize;
	_drill_scShop_Status_refresh.call(this);
	this._move = 0;
	this.opacity = 0;
	this.contentsOpacity = 0;
	this.x = DrillUp.scShop_status_x + DrillUp.scShop_status_slideX ;
	this.y = DrillUp.scShop_status_y + DrillUp.scShop_status_slideY ;
};


//=============================================================================
// ** 商店-物品数量窗口
//=============================================================================

//==============================
// * 商店-物品数量窗口
//==============================
Scene_Shop.prototype.createNumberWindow = function() {
	var wx = DrillUp.scShop_number_x;
    var wy = DrillUp.scShop_number_y;
	var ww = DrillUp.scShop_number_width;
    var wh = DrillUp.scShop_number_height;
    this._numberWindow = new Window_ShopNumber(wx, wy, wh);
    this._numberWindow.x = wx + DrillUp.scShop_number_slideX;
    this._numberWindow.y = wy + DrillUp.scShop_number_slideY;
    this._numberWindow.width = ww;
    this._numberWindow.height = wh;
	this._numberWindow.windowWidth = function(){ return ww;}
	this._numberWindow.windowHeight = function(){ return wh;}
	this._numberWindow.opacity = 0;
	this._numberWindow.contentsOpacity = 0;
	this._numberWindow.visible = false;
	this._numberWindow._move = 0;
	this._numberWindow.standardFontSize = function(){ return DrillUp.scShop_number_fontsize;}
    this._numberWindow.hide = function(){ return null;}
    this._numberWindow.lineHeight = function(){ return DrillUp.scShop_number_fontsize;}
	if( DrillUp.scShop_number_Layout_visible ){
		this._layout_numberWindow = new Sprite(ImageManager.loadMenuShop(DrillUp.scShop_layout_number));
		this._layout_numberWindow.opacity = 0;
		this._field.addChild(this._layout_numberWindow);	
	}
    this._numberWindow.hide();
    this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
    this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
    this.addWindow(this._numberWindow);
};

Scene_Shop.prototype.drill_updateNumberWindow = function() {
	if( this._numberWindow.active ){	//物品数量显示
		if( this._numberWindow._move < DrillUp.scShop_number_slideTime ){
			this._numberWindow.x -= DrillUp.scShop_number_slideX / DrillUp.scShop_number_slideTime;
			this._numberWindow.y -= DrillUp.scShop_number_slideY / DrillUp.scShop_number_slideTime;
			this._numberWindow.contentsOpacity += 256 / DrillUp.scShop_number_slideTime;
			if( DrillUp.scShop_number_Layout_visible ){
				this._layout_numberWindow.x = this._numberWindow.x + DrillUp.scShop_number_LayoutX;
				this._layout_numberWindow.y = this._numberWindow.y + DrillUp.scShop_number_LayoutY;
				this._layout_numberWindow.opacity = this._numberWindow.contentsOpacity;
			}else{
				this._numberWindow.opacity += 256 / DrillUp.scShop_number_slideTime;
			}
		}
		this._numberWindow._move += 1;
		this._numberWindow.visible = true;
		if( this._numberWindow._move >= DrillUp.scShop_number_slideTime ){ this._numberWindow._move = DrillUp.scShop_number_slideTime }
		
	}else{	//物品数量隐藏
		if( this._numberWindow._move > 0 ){
			this._numberWindow.x += DrillUp.scShop_number_slideX / DrillUp.scShop_number_slideTime;
			this._numberWindow.y += DrillUp.scShop_number_slideY / DrillUp.scShop_number_slideTime;
			this._numberWindow.contentsOpacity -= 256 / DrillUp.scShop_number_slideTime;
			if( DrillUp.scShop_number_Layout_visible ){
				this._layout_numberWindow.x = this._numberWindow.x + DrillUp.scShop_number_LayoutX;
				this._layout_numberWindow.y = this._numberWindow.y + DrillUp.scShop_number_LayoutY;
				this._layout_numberWindow.opacity = this._numberWindow.contentsOpacity;
			}else{
				this._numberWindow.opacity -= 256 / DrillUp.scShop_number_slideTime;
			}
		}
		this._numberWindow._move -= 1;
		if( this._numberWindow._move <= 0 ){ this._numberWindow._move = 0; this._numberWindow.visible = false;  }
	}
}	

//==============================
// * 商店-物品数量（交换物计算）
//==============================
Window_ShopNumber.prototype.drawTotalPrice = function() {
    var total = this._price * this._number;
    var width = this.contentsWidth() - this.textPadding();
	
	if( $gameSystem._drill_exchange_mode ){
		this.drawCurrencyValue(total, this.convertEscapeCharacters($gameSystem._drill_exchange_unit), 0, this.priceY(), width);
	}else{
		this.drawCurrencyValue(total, this._currencyUnit, 0, this.priceY(), width);
	}
};
var _drill_window_number_drawCurrencyValue = Window_ShopNumber.prototype.drawCurrencyValue;
Window_ShopNumber.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    if($gameSystem._drill_exchange_mode){
		var unitWidth = Math.min(80, this.textWidth(unit));
		this.resetTextColor();
		this.drawText(value, x, y, width - unitWidth - 6, 'right');
		this.changeTextColor(this.systemColor());
		this.drawTextEx(unit, x + width - unitWidth + 5, y-5 );		//修改货币单位为图标
	}else{
		_drill_window_number_drawCurrencyValue.call(this,value, unit, x, y, width);
	}
};

//=============================================================================
// ** 商店-出售窗口
//=============================================================================

//==============================
// * 商店-出售窗口初始化
//==============================
Scene_Shop.prototype.createSellWindow = function() {
	var wx = DrillUp.scShop_sell_x;
    var wy = DrillUp.scShop_sell_y;
	var ww = DrillUp.scShop_sell_width;
    var wh = DrillUp.scShop_sell_height;
    this._sellWindow = new Window_ShopSell(wx, wy, ww, wh);
    this._sellWindow.x = wx + DrillUp.scShop_sell_slideX;
    this._sellWindow.y = wy + DrillUp.scShop_sell_slideY;
    this._sellWindow.width = ww;
    this._sellWindow.height = wh;
	this._sellWindow.windowWidth = function(){ return ww;}
	this._sellWindow.windowHeight = function(){ return wh;}
	this._sellWindow.opacity = 0;
	this._sellWindow.contentsOpacity = 0;
	this._sellWindow.visible = false;
	this._sellWindow._move = 0;
	this._sellWindow.standardFontSize = function(){ return DrillUp.scShop_sell_fontsize;}
	this._sellWindow.maxCols = function(){ return DrillUp.scShop_sell_col;}
    this._sellWindow.hide = function(){ return null;}
	if( DrillUp.scShop_sell_Layout_visible ){
		this._layout_sellWindow = new Sprite(ImageManager.loadMenuShop(DrillUp.scShop_layout_sell));
		this._layout_sellWindow.opacity = 0;
		this._field.addChild(this._layout_sellWindow);	
	}
    this._sellWindow.setHelpWindow(this._helpWindow);
    this._sellWindow.hide();
    this._sellWindow.setHandler('ok',     this.onSellOk.bind(this));
    this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
    this._categoryWindow.setItemWindow(this._sellWindow);
    this.addWindow(this._sellWindow);
};

//==============================
// * 商店-出售窗口帧变化
//==============================
Scene_Shop.prototype.drill_updateSellWindow = function() {
	if( this._sellWindow.active ||
		(this._commandWindow._index === 1 && this._numberWindow.active ) ){	//出售窗口显示
		if( this._sellWindow._move < DrillUp.scShop_sell_slideTime ){
			this._sellWindow.x -= DrillUp.scShop_sell_slideX / DrillUp.scShop_sell_slideTime;
			this._sellWindow.y -= DrillUp.scShop_sell_slideY / DrillUp.scShop_sell_slideTime;
			this._sellWindow.contentsOpacity += 256 / DrillUp.scShop_sell_slideTime;
			if( DrillUp.scShop_sell_Layout_visible ){
				this._layout_sellWindow.x = this._sellWindow.x + DrillUp.scShop_sell_LayoutX;
				this._layout_sellWindow.y = this._sellWindow.y + DrillUp.scShop_sell_LayoutY;
				this._layout_sellWindow.opacity = this._sellWindow.contentsOpacity;
			}else{
				this._sellWindow.opacity += 256 / DrillUp.scShop_sell_slideTime;
			}
		}
		this._sellWindow._move += 1;
		this._sellWindow.visible = true;
		if( this._sellWindow._move >= DrillUp.scShop_sell_slideTime ){ this._sellWindow._move = DrillUp.scShop_sell_slideTime }
		
	}else{	//出售窗口隐藏
		if( this._sellWindow._move > 0 ){
			this._sellWindow.x += DrillUp.scShop_sell_slideX / DrillUp.scShop_sell_slideTime;
			this._sellWindow.y += DrillUp.scShop_sell_slideY / DrillUp.scShop_sell_slideTime;
			this._sellWindow.contentsOpacity -= 256 / DrillUp.scShop_sell_slideTime;
			if( DrillUp.scShop_sell_Layout_visible ){
				this._layout_sellWindow.x = this._sellWindow.x + DrillUp.scShop_sell_LayoutX;
				this._layout_sellWindow.y = this._sellWindow.y + DrillUp.scShop_sell_LayoutY;
				this._layout_sellWindow.opacity = this._sellWindow.contentsOpacity;
			}else{
				this._sellWindow.opacity -= 256 / DrillUp.scShop_sell_slideTime;
			}
		}
		this._sellWindow._move -= 1;
		if( this._sellWindow._move <= 0 ){ this._sellWindow._move = 0; this._sellWindow.visible = false; }
		
	}
}	

//==============================
// * 商店-执行出售
//==============================
Scene_Shop.prototype.doSell = function(number) {
	if( $gameSystem._drill_exchange_mode ){
		$gameParty.gainItem($dataItems[$gameSystem._drill_exchange_item], number*this.sellingPrice() );
	}else{
		$gameParty.gainGold(number * this.sellingPrice());
	}
    $gameParty.loseItem(this._item, number);
};
//==============================
// * 商店-出售倍率
//==============================
Scene_Shop.prototype.sellingPrice = function() {
	var result = Math.floor( this._item.price * $gameSystem._drill_shop_sell_rate );
	if( result == 0 ){ result = 1;}
	return result;
};

//=============================================================================
// ** 商店-出售类型窗口
//=============================================================================

//==============================
// * 商店-出售类型窗口初始化
//==============================
Scene_Shop.prototype.createCategoryWindow = function() {
	var wx = DrillUp.scShop_category_x;
    var wy = DrillUp.scShop_category_y;
	var ww = DrillUp.scShop_category_width;
    var wh = DrillUp.scShop_category_height;
    this._categoryWindow = new Window_ShopItemCategory();
    this._categoryWindow.x = wx + DrillUp.scShop_category_slideX;
    this._categoryWindow.y = wy + DrillUp.scShop_category_slideY;
    this._categoryWindow.width = ww;
    this._categoryWindow.height = wh;
	this._categoryWindow.windowWidth = function(){ return ww;}
	this._categoryWindow.windowHeight = function(){ return wh;}
	this._categoryWindow.opacity = 0;
	this._categoryWindow.contentsOpacity = 0;
	this._categoryWindow.visible = false;
	this._categoryWindow._move = 0;
	this._categoryWindow.standardFontSize = function(){ return DrillUp.scShop_category_fontsize;}
    this._categoryWindow.hide = function(){ return null;}
	if( DrillUp.scShop_category_Layout_visible ){
		this._layout_categoryWindow = new Sprite(ImageManager.loadMenuShop(DrillUp.scShop_layout_category));
		this._layout_categoryWindow.opacity = 0;
		this._field.addChild(this._layout_categoryWindow);	
	}
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.hide();
    this._categoryWindow.deactivate();
    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
    this.addWindow(this._categoryWindow);
};

//==============================
// * 商店-出售类型窗口帧变化
//==============================
Scene_Shop.prototype.drill_updateCategoryWindow = function() {
	if( this._categoryWindow.active ){	//出售类型窗口显示
		if( this._categoryWindow._move < DrillUp.scShop_category_slideTime ){
			this._categoryWindow.x -= DrillUp.scShop_category_slideX / DrillUp.scShop_category_slideTime;
			this._categoryWindow.y -= DrillUp.scShop_category_slideY / DrillUp.scShop_category_slideTime;
			this._categoryWindow.contentsOpacity += 256 / DrillUp.scShop_category_slideTime;
			if( DrillUp.scShop_category_Layout_visible ){
				this._layout_categoryWindow.x = this._categoryWindow.x + DrillUp.scShop_category_LayoutX;
				this._layout_categoryWindow.y = this._categoryWindow.y + DrillUp.scShop_category_LayoutY;
				this._layout_categoryWindow.opacity = this._categoryWindow.contentsOpacity;
			}else{
				this._categoryWindow.opacity += 256 / DrillUp.scShop_category_slideTime;
			}
			this._categoryWindow._move += 1;
			this._categoryWindow.visible = true;
			if( this._categoryWindow._move >= DrillUp.scShop_category_slideTime ){ this._categoryWindow._move = DrillUp.scShop_category_slideTime }
		}
		
	}else{	//出售类型窗口隐藏
		if( this._categoryWindow._move > 0 ){
			this._categoryWindow.x += DrillUp.scShop_category_slideX / DrillUp.scShop_category_slideTime;
			this._categoryWindow.y += DrillUp.scShop_category_slideY / DrillUp.scShop_category_slideTime;
			this._categoryWindow.contentsOpacity -= 256 / DrillUp.scShop_category_slideTime;
			if( DrillUp.scShop_category_Layout_visible ){
				this._layout_categoryWindow.x = this._categoryWindow.x + DrillUp.scShop_category_LayoutX;
				this._layout_categoryWindow.y = this._categoryWindow.y + DrillUp.scShop_category_LayoutY;
				this._layout_categoryWindow.opacity = this._categoryWindow.contentsOpacity;
			}else{
				this._categoryWindow.opacity -= 256 / DrillUp.scShop_category_slideTime;
			}
			this._categoryWindow._move -= 1;
			if( this._categoryWindow._move <= 0 ){ this._categoryWindow._move = 0;this._categoryWindow.visible = false; }
		}
	}
}	

//==============================
// * 商店-手动新建一个出售物品类型窗口
//==============================
function Window_ShopItemCategory() {
    this.initialize.apply(this, arguments);
}

Window_ShopItemCategory.prototype = Object.create(Window_Command.prototype);
Window_ShopItemCategory.prototype.constructor = Window_ShopItemCategory;

Window_ShopItemCategory.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
};

Window_ShopItemCategory.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};

Window_ShopItemCategory.prototype.makeCommandList = function() {
    this.addCommand(TextManager.item,    'item');
    this.addCommand(TextManager.weapon,  'weapon');
    this.addCommand(TextManager.armor,   'armor');
    this.addCommand(TextManager.keyItem, 'keyItem');
};
Window_ShopItemCategory.prototype.windowWidth = function() {
    return DrillUp.scShop_category_width;
};
Window_ShopItemCategory.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};
Window_ShopItemCategory.prototype.maxCols = function() {
    return DrillUp.scShop_category_col;
};
Window_ShopItemCategory.prototype.itemTextAlign = function() {
    return DrillUp.scShop_category_align;
};

//=============================================================================
// ** 商店-服务员
//=============================================================================
Scene_Shop.prototype.drill_createWaitress = function() {
	if( !$gameSystem._drill_shop_waitress_id ){$gameSystem._drill_shop_waitress_id = 0;}
	this._cur_waitress = DrillUp.scShop_waitress_list[$gameSystem._drill_shop_waitress_id];
	
	this._drill_waitress = new Sprite( ImageManager.loadMenuShop(this._cur_waitress['src_img']) );
	this._drill_waitress.x = this._cur_waitress['x'] + this._cur_waitress['slide_x'] ;
	this._drill_waitress.y = this._cur_waitress['y'] + this._cur_waitress['slide_y'] ;
	this._drill_waitress.opacity = 0 ;
	this._drill_waitress._move = 0 ;
	this._field.addChild(this._drill_waitress);	
}

Scene_Shop.prototype.drill_updateWaitress = function() {
	if( !this._drill_waitress){return;}
	if( !this._drill_waitress.bitmap.isReady()){return;}
	
	if( this._drill_waitress._move < this._cur_waitress['slide_time'] ){
		this._drill_waitress.x -= this._cur_waitress['slide_x'] / this._cur_waitress['slide_time'] ;
		this._drill_waitress.y -= this._cur_waitress['slide_y'] / this._cur_waitress['slide_time'] ;
		this._drill_waitress.opacity += 256 / this._cur_waitress['slide_time'] ;
		this._drill_waitress._move += 1;
	}
}	

