//=============================================================================
// Drill_LayerGif.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        地图 - 多层地图GIF
 * @author Drill_up
 * 
 * @Drill_LE_param "GIF层-%d"
 * @Drill_LE_parentKey "---GIF层组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LGi_layers_length"
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerGif +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在地图界面中放置一个或者多个GIF。
 * 【支持插件关联资源的打包、加密】
 * ★★必须放在 mog多层天气效果 插件的后面★★
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   可以在地图的五个层级放多层不同的GIF。
 * 2.该插件可以装饰地图的各种层级。要了解更详细的组合方法，
 *   去看看"多层组合背景,粒子,魔法圈,gif,视频.docx"。
 * 地图绑定：
 *   (1.每个配置绑定到一个指定的地图，可以多个配置绑定到同一个地图。
 *      注意配置中"所属地图"参数，"所属地图"要与你的地图id相对应。
 *   (2.留意rmmv编辑器下方的状态栏，地图id、坐标、缩放比例、事件id
 *      都有信息显示。
 * 地图层级：
 *   (1.你可以将背景放置在地图的五种层级中，分别为：
 *      下层、中层、上层、图片层、最顶层
 *   (2.地图层级之间的关系为：
 *      rmmv远景 < 下层 < rmmv图块 < 中层 < rmmv玩家/事件 < 上层
 *      < rmmv图片 < 图片层 < rmmv对话框 < 最顶层
 *   (3.最顶层的背景，可以把地图界面最高层的对话框、窗口也给挡住。
 *   (4.处于同一 地图层级 时，将根据 图片层级 再先后排序。
 * 位移比：
 *   (1.根据物理相对运动知识，近大远小，近快远慢的原则。要让GIF看起
 *      来真的”远”，那需要设置位移比接近1.00，越接近1.00越远。
 *   (2.需要注意的是，rmmv远景和镜头位移比固定是0.00，所以rmmv的远景
 *      每次调整都感觉不像远景，你需要换掉适合的含位移比的图层。
 * 细节：
 *   (1.插件指令操作的变化结果，是永久性的。
 *   (2.操作隐藏的GIF 或者 操作其他地图的GIF，插件指令都会有效。
 *      注意，插件指令变化的是增量，增加用正数，减少用负数。
 * 设计：
 *   (1.将GIF放置在画面正中心方法：
 *      平移：（408,312） 这时候，17,13图块是正中心
 *      位移图块偏移 = 实际图块位置 - 中心图块/2
 *      例如放在图块x66位置，66 - 17/2 = 57.5‬，57.5‬为设置的图块偏移。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__layer_gif （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__layer_gif文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 背景层1 资源-背景
 * 背景层2 资源-背景
 * 背景层3 资源-背景
 * ……
 *
 * 所有素材都放在Map__layer_gif文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动修改地图GIF的各个属性：
 *
 * 插件指令：>地图GIF : 11 : 显示
 * 插件指令：>地图GIF : 11 : 隐藏
 *
 * 插件指令：>地图GIF : 11 : 变坐标 : 60 : 100 : 100
 * 插件指令：>地图GIF : 11 : 变透明 : 60 : 255
 * 插件指令：>地图GIF : 11 : 变速度 : 60 : 1.0 : 1.0
 * 插件指令：>地图GIF : 11 : 变转速 : 60 : 0.314
 * 插件指令：>地图GIF : 11 : 变缩放 : 60 : 1.2 : 1.2
 * 插件指令：>地图GIF : 11 : 变斜切 : 60 : 1.0 : 1.0
 * 插件指令：>地图GIF : 11 : 变混合模式 : 2
 * 插件指令：>地图GIF : 11 : 锁定帧
 * 插件指令：>地图GIF : 11 : 解锁帧
 * 插件指令：>地图GIF : 11 : 设置当前帧 : 1
 * 
 * 1.最前面的数字表示 配置的GIF 编号。
 * 2.变坐标后面表示 x位置，y位置，时长 。坐标变化效果与速度叠加。
 * 3.变透明后面表示 透明度，时长 。
 * 4.变转速后面表示 时长，旋转速度 。
 * 5.变缩放后面表示 时长，x大小，y大小 。
 * 6.变斜切后面表示 时长，x斜率，y斜率 。
 * 7.设置当前帧后面表示 帧数，1 表示动画所处的第1帧 。
 * 8.混合模式为瞬间切换，去看看"pixi的渲染混合模式"。
 * 9.插件指令的变化是永久性的。
 *   如果你想瞬间切换，设置时长为0即可。
 * 10.操作隐藏的GIF 或者 操作其他地图的GIF，插件指令仍然有效。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   在地图中放置多个GIF，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【31.67ms】
 *              100个事件的地图中，平均消耗为：【22.19ms】
 *               50个事件的地图中，平均消耗为：【20.08ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.从原理上来说，多层GIF只是固定放置的贴图，但由于事件数量会挤占
 *   部分计算资源，所以消耗会稍微增大一些。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件关联的资源文件夹。
 * [v1.2]
 * 修复了单独使用插件时出错的bug。
 * [v1.3]
 * 修复了背景处于中层时，会和事件、图块相互闪烁的bug。
 *
 *
 *
 * @param ---GIF层组 1至20---
 * @default
 *
 * @param GIF层-1
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-2
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-3
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-4
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-5
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-6
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-7
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-8
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-9
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-10
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-11
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-12
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-13
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-14
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-15
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-16
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-17
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-18
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-19
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-20
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组21至40---
 * @default
 *
 * @param GIF层-21
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-22
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-23
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-24
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-25
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-26
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-27
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-28
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-29
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-30
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-31
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-32
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-33
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-34
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-35
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-36
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-37
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-38
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-39
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-40
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组41至60---
 * @default
 *
 * @param GIF层-41
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-42
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-43
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-44
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-45
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-46
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-47
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-48
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-49
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-50
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-51
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-52
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-53
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-54
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-55
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-56
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-57
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-58
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-59
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-60
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组61至80---
 * @default
 *
 * @param GIF层-61
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-62
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-63
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-64
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-65
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-66
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-67
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-68
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-69
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-70
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-71
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-72
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-73
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-74
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-75
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-76
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-77
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-78
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-79
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-80
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组81至100---
 * @default
 *
 * @param GIF层-81
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-82
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-83
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-84
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-85
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-86
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-87
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-88
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-89
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-90
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-91
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-92
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-93
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-94
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-95
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-96
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-97
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-98
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-99
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-100
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组101至120---
 * @default
 *
 * @param GIF层-101
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-102
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-103
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-104
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-105
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-106
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-107
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-108
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-109
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-110
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-111
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-112
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-113
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-114
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-115
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-116
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-117
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-118
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-119
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-120
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组121至140---
 * @default
 *
 * @param GIF层-121
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-122
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-123
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-124
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-125
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-126
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-127
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-128
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-129
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-130
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-131
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-132
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-133
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-134
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-135
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-136
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-137
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-138
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-139
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-140
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组141至160---
 * @default
 *
 * @param GIF层-141
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-142
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-143
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-144
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-145
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-146
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-147
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-148
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-149
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-150
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-151
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-152
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-153
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-154
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-155
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-156
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-157
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-158
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-159
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-160
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组161至180---
 * @default
 *
 * @param GIF层-161
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-162
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-163
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-164
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-165
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-166
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-167
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-168
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-169
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-170
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-171
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-172
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-173
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-174
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-175
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-176
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-177
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-178
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-179
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-180
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组181至200---
 * @default
 *
 * @param GIF层-181
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-182
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-183
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-184
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-185
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-186
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-187
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-188
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-189
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-190
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-191
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-192
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-193
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-194
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-195
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-196
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-197
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-198
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-199
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-200
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 */
/*~struct~LGiMapGIF:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的地图GIF==
 *
 * @param 所属地图
 * @type number
 * @min 1
 * @desc 该GIF将放在指定对应的地图id中。
 * @default 1
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-GIF
 * @desc png图片资源组，多张构成gif。
 * @default ["GIF-默认地图GIF"]
 * @require 1
 * @dir img/Map__layer_gif/
 * @type file[]
 *
 * @param 帧间隔
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 平移-GIF X
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 平移-GIF Y
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 位移比X
 * @desc 与玩家地图的镜头位置有关，设置1.00，GIF和镜头的位移一致。设置0.00则GIF不随镜头移动，紧贴地图。负数则反向移动。
 * @default 0.00
 *
 * @param 位移比Y
 * @desc 与玩家地图的镜头位置有关，设置1.00，GIF和镜头的位移一致。设置0.00则GIF不随镜头移动，紧贴地图。负数则反向移动。
 * @default 0.00
 *
 * @param 位移图块偏移 X
 * @desc 与位移比相关，图片的中心点所在的图块X偏移量。单位图块，可为小数。
 * @default 0
 *
 * @param 位移图块偏移 Y
 * @desc 与位移比相关，图片的中心点所在的图块Y偏移量。单位图块，可为小数。
 * @default 0
 *
 * @param 地图层级
 * @type select
 * @option 下层
 * @value 下层
 * @option 中层
 * @value 中层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 地图所在的层级位置，具体关系看看插件说明。
 * @default 中层
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc GIF在同一个地图层，先后排序的位置，0表示最后面。
 * @default 4
 * 
 * @param --3d效果--
 * @desc 
 * 
 * @param 缩放 X
 * @parent --3d效果--
 * @desc GIF的缩放X值，默认比例1.0。缩放将会使得GIF看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 缩放 Y
 * @parent --3d效果--
 * @desc GIF的缩放Y值，默认比例1.0。缩放将会使得GIF看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 斜切 X
 * @parent --3d效果--
 * @desc GIF的斜切X值，默认比例0.0。斜切将会使得GIF看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 斜切 Y
 * @parent --3d效果--
 * @desc GIF的斜切Y值，默认比例0.0。斜切将会使得GIF看起来旋转具有一定角度。
 * @default 0.0
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LGi（Layer_GIF）
//		临时全局变量	DrillUp.g_LGi_xxx
//		临时局部变量	this._drill_LGi_xxx
//		存储数据变量	$gameSystem._drill_LGi_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理) 每帧
//		性能测试因素	对话管理层
//		性能测试消耗	20.08ms
//		最坏情况		暂无
//		备注			暂无
//
//插件记录：
//		★大体框架与功能如下：
//			多层地图GIF：
//				->基本属性
//					->地图层级、图片层级（多插件相互作用）
//					->GIF播放
//					->GIF倒放
//					->镜头位移比
//				->可修改的属性
//					->显示隐藏
//					->坐标、速度、透明、混合模式
//					->缩放、斜切
//					->色调 ？x
//					->GIF帧数插件指令
//
//			地图界面全层级关系：
//				Spriteset： LowerLayer：	rmmv远景 < 下层 < rmmv图块 < 中层 < rmmv角色 < rmmv鼠标目的地 < 上层 < rmmv天气
//							UpperLayer：	< rmmv图片 < (时间框层) < (闪烁幕布层) < 图片层
//											< MOG的ui层【_hudField】 < ui层【_drill_map_top_board】
//				AllWindows：WindowLayer：	< rmmv对话框 < rmmv滚动文章 < 最顶层【_drill_SenceTopArea】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.使用插件指令变化时，changing将会作为一个变化容器，根据时间对【数据】进行改变。
//			3.原理基于【定量】赋值，【你直接用_displayX就可以了】,增量赋值方法绕太多远路！
//			4.【这里的镜头位移比是相减，而背景的是相加】。
//
//		★其它说明细节：
//			1.不要通过覆写创建函数来穿插远景和前景，直接在插入点抱方法的大腿。
//			2.循环时，_displayY会舍去取余，你需要控制图片的位置偏移的取余量不变。
//			3.默认所有窗口都在 _windowLayer 中，通过addWindow添加。
//			  而最顶层就在 _windowLayer 的后面，作为另外一个父类层。
//				
//		★存在的问题：
//			1.位移图块偏移 X为小数，但是不明原因必须用【parseInt】才能解析小数。
//			  使用Number会变成NAN。
//


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerGif = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerGif');

	DrillUp.g_LGi_layers_length = 200;
	DrillUp.g_LGi_layers = [];
	for (var i = 0; i < DrillUp.g_LGi_layers_length; i++) {
		if( DrillUp.parameters['GIF层-' + String(i+1) ] != "" ){
			DrillUp.g_LGi_layers[i] = JSON.parse(DrillUp.parameters['GIF层-' + String(i+1) ]);
			DrillUp.g_LGi_layers[i]['id'] = Number(i)+1;
			DrillUp.g_LGi_layers[i]['map'] = Number(DrillUp.g_LGi_layers[i]["所属地图"]);
			DrillUp.g_LGi_layers[i]['visible'] = String(DrillUp.g_LGi_layers[i]["初始是否显示"] || "true") == "true";
			DrillUp.g_LGi_layers[i]['src_img'] = JSON.parse(DrillUp.g_LGi_layers[i]["资源-GIF"]);;
			DrillUp.g_LGi_layers[i]['x'] = Number(DrillUp.g_LGi_layers[i]["平移-GIF X"]);
			DrillUp.g_LGi_layers[i]['y'] = Number(DrillUp.g_LGi_layers[i]["平移-GIF Y"]);
			DrillUp.g_LGi_layers[i]['opacity'] = Number(DrillUp.g_LGi_layers[i]["透明度"]);
			DrillUp.g_LGi_layers[i]['blendMode'] = Number(DrillUp.g_LGi_layers[i]["混合模式"]);
			DrillUp.g_LGi_layers[i]['layer_index'] = String(DrillUp.g_LGi_layers[i]["地图层级"]);
			DrillUp.g_LGi_layers[i]['zIndex'] = Number(DrillUp.g_LGi_layers[i]["图片层级"]);
			
			DrillUp.g_LGi_layers[i]['XPer'] = Number(DrillUp.g_LGi_layers[i]["位移比X"]);
			DrillUp.g_LGi_layers[i]['YPer'] = Number(DrillUp.g_LGi_layers[i]["位移比Y"]);
			DrillUp.g_LGi_layers[i]['tile_x'] = parseInt(DrillUp.g_LGi_layers[i]["位移图块偏移 X"] || 0);
			DrillUp.g_LGi_layers[i]['tile_y'] = parseInt(DrillUp.g_LGi_layers[i]["位移图块偏移 Y"] || 0);
			
			DrillUp.g_LGi_layers[i]['interval'] = Number(DrillUp.g_LGi_layers[i]["帧间隔"]);
			DrillUp.g_LGi_layers[i]['back_run'] = String(DrillUp.g_LGi_layers[i]["是否倒放"] || "false") == "true";
			DrillUp.g_LGi_layers[i]['scale_x'] = Number(DrillUp.g_LGi_layers[i]["缩放 X"] || 1.0);
			DrillUp.g_LGi_layers[i]['scale_y'] = Number(DrillUp.g_LGi_layers[i]["缩放 Y"] || 1.0);
			DrillUp.g_LGi_layers[i]['skew_x'] = Number(DrillUp.g_LGi_layers[i]["斜切 X"] || 0);
			DrillUp.g_LGi_layers[i]['skew_y'] = Number(DrillUp.g_LGi_layers[i]["斜切 Y"] || 0);
			
		}else{
			DrillUp.g_LGi_layers[i] = [];
		}
	}

//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapLayerGIF = function(filename) {
    return this.loadBitmap('img/Map__layer_gif/', filename, 0, true);
};
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_LGi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LGi_pluginCommand.call(this, command, args);
	
	if (command === '>地图GIF') { // >地图GIF : 1 : 显示
		if(args.length >= 4){
			var changing = {};
			changing['destroy'] = false;
			changing['time'] = 0;
			changing['id'] = Number(args[1]) ;
			changing['type'] = String(args[3]);
			if( args[5] != undefined ){ changing['data1'] = Number(args[5]); }
			if( args[7] != undefined ){ changing['data2'] = Number(args[7]); }
			if( args[9] != undefined ){ changing['data3'] = Number(args[9]); }
			if( args[11] != undefined ){ changing['data4'] = Number(args[11]); }
			if( args[13] != undefined ){ changing['data5'] = Number(args[13]); }
			$gameSystem._drill_LGi_dataTank_changing.push(changing);
		}
	}
};
//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_LGi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LGi_sys_initialize.call(this);
	
	this._drill_LGi_dataTank_changing = [];	//插件指令变化容器

	this._drill_LGi_dataTank = [];			//GIF数据总容器
	this._drill_LGi_dataTank_map = [];		//当前地图的GIF容器
	for(var i = 0; i< DrillUp.g_LGi_layers.length ;i++){
		var temp_data = DrillUp.g_LGi_layers[i];
			
		var data = {};
		data.id = temp_data['id'];						//id
		data.map = temp_data['map'];					//所属地图
		data.visible = temp_data['visible'];			//显示
		data.src_img = temp_data['src_img'];			//资源背景
		data.x = temp_data['x'];						//x
		data.y = temp_data['y'];						//y
		data.opacity = temp_data['opacity'];			//透明度
		data.blendMode = temp_data['blendMode'];		//混合模式
		data.layer_index = temp_data['layer_index'];	//地图层级
		data.zIndex = temp_data['zIndex'];				//图片层级
		
		data.XPer = temp_data['XPer'];					//位移比x
		data.YPer = temp_data['YPer'];					//位移比y
		data.tile_x = temp_data['tile_x'];				//位移图块偏移 X
		data.tile_y = temp_data['tile_y'];				//位移图块偏移 Y
		
		data.interval = temp_data['interval'];			//帧间隔
		data.back_run = temp_data['back_run'];			//是否倒放
		data.scale_x = temp_data['scale_x'];			//缩放x
		data.scale_y = temp_data['scale_y'];			//缩放y
		data.skew_x = temp_data['skew_x'];				//斜切x
		data.skew_y = temp_data['skew_y'];				//斜切y
		
		data.gif_time = 0;		//gif帧
		data.cameraX = 0;		//实际镜头的x精确坐标
		data.cameraY = 0;		//
		data.loopX = 0;			//循环地图中，走动循环的次数
		data.loopY = 0;			//
		data.loopFixX = 0;		//循环地图中，把displayX取余的部分加回
		data.loopFixY = 0;		//
		
		data.curX = 0;			//当前x位置（速度累加的结果）（暂未使用）
		data.curY = 0;			//
		
		this._drill_LGi_dataTank.push(data);
	}
};	

//=============================================================================
// ** 地图
//=============================================================================
//==============================
// ** 地图 - 初始化
//==============================
var _drill_LGi_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_LGi_setup.call(this,mapId);
	
	this.drill_LGi_initMapdata();
}
Game_Map.prototype.drill_LGi_initMapdata = function() {
	$gameSystem._drill_LGi_dataTank_map = [];		//刷新当前地图的GIF
	for(var i = 0; i< $gameSystem._drill_LGi_dataTank.length ;i++){
		var data = $gameSystem._drill_LGi_dataTank[i];
		if( data.map == this._mapId ){
			$gameSystem._drill_LGi_dataTank_map.push(data);
		}
	}
}
//==============================
// * 地图 - 进地图初始镜头位置（图块）
//==============================
var _drill_LGi_Map_setDisplayPos = Game_Map.prototype.setDisplayPos;
Game_Map.prototype.setDisplayPos = function(x, y) {
    _drill_LGi_Map_setDisplayPos.call(this, x, y);
	
	for(var i = 0; i< $gameSystem._drill_LGi_dataTank_map.length ;i++){
		var data = $gameSystem._drill_LGi_dataTank_map[i];
		//data.cameraX = this._displayX * this.tileWidth();
		//data.cameraY = this._displayY * this.tileHeight();
		data.cameraX = (this._displayX + data.loopFixX - data.tile_x) * this.tileWidth() ;
		data.cameraY = (this._displayY + data.loopFixY - data.tile_y) * this.tileHeight() ;
	}
};

//==============================
// * 镜头移动 - 下
//==============================
var _drill_LGi_Map_scrollDown = Game_Map.prototype.scrollDown;
Game_Map.prototype.scrollDown = function(distance) {
    if (this.isLoopVertical() && this._displayY + distance >= $dataMap.height) {
		for(var i =0; i<$gameSystem._drill_LGi_dataTank_map.length; i++){
			var data = $gameSystem._drill_LGi_dataTank_map[i];
			if( data.map == this._mapId ){
				data.loopY += 1;
				data.loopFixY = data.loopY * $dataMap.height;
			}
		}
	}
    _drill_LGi_Map_scrollDown.call(this, distance);
	
	for(var i =0; i<$gameSystem._drill_LGi_dataTank_map.length; i++){
		var data = $gameSystem._drill_LGi_dataTank_map[i];
		data.cameraY = (this._displayY + data.loopFixY - data.tile_y) * this.tileHeight();
	}
};
//==============================
// * 镜头移动 - 上
//==============================
var _drill_LGi_Map_scrollUp = Game_Map.prototype.scrollUp;
Game_Map.prototype.scrollUp = function(distance) {
    if (this.isLoopVertical() && this._displayY - distance <= 0 ) {
		for(var i =0; i<$gameSystem._drill_LGi_dataTank_map.length; i++){
			var data = $gameSystem._drill_LGi_dataTank_map[i];
			if( data.map == this._mapId ){
				data.loopY -= 1;
				data.loopFixY = data.loopY * $dataMap.height;
			}
		}
	}
    _drill_LGi_Map_scrollUp.call(this, distance);
	
	for(var i =0; i<$gameSystem._drill_LGi_dataTank_map.length; i++){
		var data = $gameSystem._drill_LGi_dataTank_map[i];
		data.cameraY = (this._displayY + data.loopFixY - data.tile_y) * this.tileHeight();
	}
};
//==============================
// * 镜头移动 - 左
//==============================
var _drill_LGi_Map_scrollLeft = Game_Map.prototype.scrollLeft;
Game_Map.prototype.scrollLeft = function(distance) {
    if (this.isLoopHorizontal() && this._displayX - distance <= 0) {
		for(var i =0; i<$gameSystem._drill_LGi_dataTank_map.length; i++){
			var data = $gameSystem._drill_LGi_dataTank_map[i];
			if( data.map == this._mapId ){
				data.loopX -= 1;
				data.loopFixX = data.loopX * $dataMap.width;
			}
		}
	}
    _drill_LGi_Map_scrollLeft.call(this, distance);
	
	for(var i =0; i<$gameSystem._drill_LGi_dataTank_map.length; i++){
		var data = $gameSystem._drill_LGi_dataTank_map[i];
		data.cameraX = (this._displayX + data.loopFixX - data.tile_x) * this.tileWidth();
	}
};
//==============================
// * 镜头移动 - 右
//==============================
var _drill_LGi_Map_scrollRight = Game_Map.prototype.scrollRight;
Game_Map.prototype.scrollRight = function(distance) {
    if (this.isLoopHorizontal() && this._displayX + distance >= $dataMap.width) {
		for(var i =0; i<$gameSystem._drill_LGi_dataTank_map.length; i++){
			var data = $gameSystem._drill_LGi_dataTank_map[i];
			if( data.map == this._mapId ){
				data.loopX += 1;
				data.loopFixX = data.loopX * $dataMap.width;
			}
		}
	}
    _drill_LGi_Map_scrollRight.call(this, distance);
	
	for(var i =0; i<$gameSystem._drill_LGi_dataTank_map.length; i++){
		var data = $gameSystem._drill_LGi_dataTank_map[i];
		data.cameraX = (this._displayX + data.loopFixX - data.tile_x) * this.tileWidth();
	}
};

//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 下层
//==============================
var _drill_LGi_layer_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_LGi_layer_createParallax.call(this);		//rmmv远景 < 下层 < rmmv图块
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// ** 中层
//==============================
var _drill_LGi_layer_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_LGi_layer_createTilemap.call(this);		//rmmv图块 < 中层 < rmmv角色
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// ** 上层
//==============================
var _drill_LGi_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_LGi_layer_createDestination.call(this);	//rmmv鼠标目的地 < 上层 < rmmv天气
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 图片层
//==============================
var _drill_LGi_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_LGi_layer_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// ** 最顶层
//==============================
var _drill_LGi_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LGi_layer_createAllWindows.call(this);	//rmmv对话框 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Map.prototype.drill_LGi_sortByZIndex = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//=============================================================================
// ** 地图绘制层 控制
//=============================================================================
//==============================
// * 创建
//==============================
var _drill_LGi_Scene_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LGi_Scene_createAllWindows.call(this);
	this.drill_LGi_create();	
};
Scene_Map.prototype.drill_LGi_create = function() {
	this._drill_LGi_spriteTank = [];
	this._drill_LGi_spriteTank_bitmap = [];
	
	var data_tank = $gameSystem._drill_LGi_dataTank_map;
	for(var i=0; i< data_tank.length; i++){
		var temp_data = data_tank[i];
		var temp_sprite_bitmap = new Sprite();
		temp_sprite_bitmap._drill_src_bitmaps = [];
		for(var j = 0; j < temp_data['src_img'].length ; j++){
			temp_sprite_bitmap._drill_src_bitmaps.push(ImageManager.load_MapLayerGIF(temp_data['src_img'][j]));
		}
		temp_sprite_bitmap.bitmap = temp_sprite_bitmap._drill_src_bitmaps[0] ;
		temp_sprite_bitmap.anchor.x = 0.5;
		temp_sprite_bitmap.anchor.y = 0.5;
		this._drill_LGi_spriteTank_bitmap.push(temp_sprite_bitmap);
		
		var temp_sprite = new Sprite();
		temp_sprite.x = temp_data.x ;
		temp_sprite.y = temp_data.y ;
		temp_sprite.opacity = temp_data.opacity ;
		temp_sprite.blendMode = temp_data.blendMode ;
		//temp_sprite.rotate = temp_data.rotate;
		temp_sprite.zIndex = temp_data.zIndex ;
		temp_sprite.layer_index = temp_data.layer_index ;
		temp_sprite.scale.x = temp_data.scale_x;
		temp_sprite.scale.y = temp_data.scale_y;
		temp_sprite.skew.x = temp_data.skew_x;
		temp_sprite.skew.y = temp_data.skew_y;
		temp_sprite.addChild(temp_sprite_bitmap);
		
		this._drill_LGi_spriteTank.push(temp_sprite);
		if( temp_sprite['layer_index'] == '下层' ){
			this._spriteset._drill_mapDownArea.addChild(temp_sprite);
		}
		if( temp_sprite['layer_index'] == '中层' ){
			this._spriteset._drill_mapCenterArea.addChild(temp_sprite);
		}
		if( temp_sprite['layer_index'] == '上层' ){
			this._spriteset._drill_mapUpArea.addChild(temp_sprite);
		}
		if( temp_sprite['layer_index'] == '图片层' ){
			this._spriteset._drill_mapPicArea.addChild(temp_sprite);
		}
		if( temp_sprite['layer_index'] == '最顶层' ){
			this._drill_SenceTopArea.addChild(temp_sprite);
		}
	}
	this.drill_LGi_sortByZIndex();		//排序
}

//==============================
// * 帧刷新
//==============================
var _drill_LGi_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_LGi_scene_update.call(this);
	if( this.isActive() ){
		this.drill_LGi_updateBase();		//基本属性
		this.drill_LGi_updateChange();		//变化属性
	}
};
//==============================
// * 帧刷新 - 基本属性
//==============================
Scene_Map.prototype.drill_LGi_updateBase = function() {
	var sprite_tank = this._drill_LGi_spriteTank ;
	var sprite_tank_bitmap = this._drill_LGi_spriteTank_bitmap ;
	var data_tank = $gameSystem._drill_LGi_dataTank_map;
	
	for(var i=0; i< sprite_tank.length; i++){
		var temp_sprite = sprite_tank[i];
		var temp_sprite_bitmap = sprite_tank_bitmap[i];
		var temp_data = data_tank[i];
		if ( temp_sprite_bitmap['_drill_src_bitmaps'].length != 0 ) {
			temp_sprite.visible = temp_data.visible;
			temp_sprite.opacity = temp_data.opacity;
			temp_sprite.blendMode = temp_data.blendMode;
			
			// > 播放gif
			if( temp_data._lock != true ){
				temp_data.gif_time += 1;
			}
			var inter = temp_data.gif_time ;
			inter = inter / temp_data['interval'];
			inter = inter % temp_sprite_bitmap['_drill_src_bitmaps'].length;
			if(temp_data['back_run']){
				inter = temp_sprite_bitmap['_drill_src_bitmaps'].length - 1 - inter;
			}
			inter = Math.floor(inter);
			temp_sprite_bitmap.bitmap = temp_sprite_bitmap['_drill_src_bitmaps'][inter];
			
			temp_sprite.x = temp_data.x - temp_data.cameraX * (1 - temp_data.XPer) + temp_data.curX;
			temp_sprite.y = temp_data.y - temp_data.cameraY * (1 - temp_data.YPer) + temp_data.curY;
			//初始位移 - 镜头位移 * 位移比 + GIF位移
		}
	}
};
//==============================
// * 帧刷新 - 变化属性
//==============================
Scene_Map.prototype.drill_LGi_updateChange = function() {
	var data_tank = $gameSystem._drill_LGi_dataTank_map;
	var sprite_tank = this._drill_LGi_spriteTank;
	var change_tank = $gameSystem._drill_LGi_dataTank_changing;
	//if(change_tank.length > 0){
	//	alert(JSON.stringify(change_tank));
	//	alert(JSON.stringify(data_tank));
	//}
	
	for(var i=0; i< data_tank.length; i++){		//只变数据，不变sprite
		var temp_data = data_tank[i];
		var temp_sprite = sprite_tank[i];
		for(var j=0; j< change_tank.length; j++){
			var temp_change = change_tank[j];
			if( temp_data.id == temp_change.id && temp_change.destroy == false ){
				temp_change.time += 1;
				if( temp_change.type == "显示" ){
					temp_data.visible = true;
					temp_change.destroy = true;
				}
				if( temp_change.type == "隐藏" ){
					temp_data.visible = false;
					temp_change.destroy = true;
				}
				if( temp_change.type == "变混合模式" ){
					temp_data.blendMode = temp_change.data1;
					temp_change.destroy = true;
				}
				if( temp_change.type == "变坐标" ){
					if( temp_change.time == 1 ){
						temp_change._dest = Math.max( temp_change.data1,1 );
						temp_change._x = temp_change.data2 - temp_data.x;
						temp_change._y = temp_change.data3 - temp_data.y;
					}
					if( temp_change.time <= temp_change._dest ){
						temp_data.x += temp_change._x / temp_change._dest;
						temp_data.y += temp_change._y / temp_change._dest;
					}
					if( temp_change.time >= temp_change._dest ){
						temp_change.destroy = true;
					}
				}
				if( temp_change.type == "变透明" ){
					if( temp_change.time == 1 ){
						temp_change._dest = Math.max( temp_change.data1,1 );
						temp_change._opacity = temp_change.data2 - temp_data.opacity;
					}
					temp_data.opacity += temp_change._opacity / temp_change._dest;
					if( temp_change.time >= temp_change._dest ){
						temp_change.destroy = true;
					}
				}
				if( temp_change.type == "变转速" ){
					if( temp_change.time == 1 ){
						temp_change._dest = Math.max( temp_change.data1,1 );
						temp_change._rotate = temp_change.data2 - temp_data.rotate;
					}
					temp_data.rotate += temp_change._rotate / temp_change._dest;
					if( temp_change.time >= temp_change._dest ){
						temp_change.destroy = true;
					}
				}
				/*变色调*/
				if( temp_change.type == "变缩放" ){
					if( temp_change.time == 1 ){
						temp_change._dest = Math.max( temp_change.data1,1 );
						temp_change._scale_x = temp_change.data2 - temp_sprite.scale.x;
						temp_change._scale_y = temp_change.data3 - temp_sprite.scale.y;
					}
					temp_sprite.scale.x += temp_change._scale_x / temp_change._dest;
					temp_sprite.scale.y += temp_change._scale_y / temp_change._dest;
					if( temp_change.time >= temp_change._dest ){
						temp_change.destroy = true;
					}
				}
				if( temp_change.type == "变斜切" ){
					if( temp_change.time == 1 ){
						temp_change._dest = Math.max( temp_change.data1,1 );
						temp_change._skew_x = temp_change.data2 - temp_sprite.skew.x;
						temp_change._skew_y = temp_change.data3 - temp_sprite.skew.y;
					}
					temp_sprite.skew.x += temp_change._skew_x / temp_change._dest;
					temp_sprite.skew.y += temp_change._skew_y / temp_change._dest;
					if( temp_change.time >= temp_change._dest ){
						temp_change.destroy = true;
					}
				}
				if( temp_change.type == '设置当前帧' ){
					temp_data.gif_time = ( temp_change.data1 - 1 ) * temp_data['interval'];
					temp_change.destroy = true;
				}
				if( temp_change.type == "锁定帧" ){
					temp_data._lock = true;
					temp_change.destroy = true;
				}
				if( temp_change.type == "解锁帧" ){
					temp_data._lock = false;
					temp_change.destroy = true;
				}
			}
		}
	}
	
	//清除变化集
	for(var j=change_tank.length-1; j>0; j--){
		if( change_tank[j].destroy == true ){
			change_tank.splice(j, 1);
		}
	}
}


