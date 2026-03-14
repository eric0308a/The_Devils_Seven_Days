//=============================================================================
// Drill_LayerSynchronizedReflection.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        行走图 - 图块同步镜像
 * @author Drill_up
 * 
 * @Drill_LE_param "地图镜面-%d"
 * @Drill_LE_parentKey "---地图镜面组%d至%d---"
 * @Drill_LE_var "null"
 *
 * @help  
 * =============================================================================
 * +++ Drill_LayerSynchronizedReflection +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以让图块反射出与基准线垂直的镜像，并且镜像支持大部分效果。
 * ★★尽量放在所有 行走图效果 的插件后面，放后面可以支持更多叠加效果★★ 
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   事件、玩家、跟随队员都有效。
 * 2.注意区分 镜面 和 镜像 关系。
 *   建议先了解基本定义"显示与透明度.docx"。
 *   更多详细内容，去看看"关于镜像与镜面.docx"。
 * 地图开关：
 *   (1.不反射镜像指令 或者 没有在镜面上 都只是镜像不显示，并不是不存在。
 *      如果你要完全关闭镜像，需要添加地图备注来禁用整张地图的镜像。
 * 镜面：
 *   (1.你可以直接设置 地形标志 或者 区域标记 的图块变成镜面。
 *      没有设置的图块将不为镜面，会遮挡事件镜像。
 *      注意，每个图块都是48x48的正方体镜面，若要处理复杂情况，见文档。
 *   (2.反射遇到循环地图的边缘时，会出现镜像关闭的现象。
 *      这是由于镜面无法在地图边缘同时出现两个。
 * 同步镜像：
 *   (1.同步镜像能支持大部分动作效果，包括跳跃、透明度、多帧行走图。
 *   (2.所有事件都默认开启镜像，并且开启透明同步。
 *      通过事件复制器生成的新事件也支持镜像。
 *   (3.同步镜像不支持滤镜、粉碎效果。
 *   (4.该插件可以与 同步镜像 插件同时使用，但是只有同步和倒影两个镜像。
 *      而现实生活中，两面垂直的镜子会反射出三个镜像。
 * 镜像边：
 *   (1.同步镜像是根据反射的基准线，同步反射出来镜像。
 *      相当于墙壁上的大镜子的垂直镜像。而不是倒影。
 *   (2.你朝向上（面向镜面）时，镜像是朝向下的。你可以设置注释锁定镜像的朝向。
 *      也可以不锁定，镜面反射的物体不一致也可以成为一种玩法。
 * 设计：
 *   (1.你可以直接画一张大的镜面图，用于特殊的解谜，将密码写在镜面上。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 地图开关
 * 你可以在地图备注中设置镜像的开关与关闭，在地图中添加：
 * （注意，地图备注的冒号没有空格，插件指令的冒号两边有空格）
 * 
 * 地图备注：=>启用图块同步镜像
 * 地图备注：=>禁用图块同步镜像
 *
 * 地图备注：=>设置同步镜像边:288
 * 插件指令：>图块同步镜像 : 设置同步镜像边 : 288
 * 插件指令：>图块同步镜像 : 设置同步镜像模式 : 等距同步
 * 插件指令：>图块同步镜像 : 设置同步镜像模式 : 单行同步
 * 
 * 1.地图中的事件过多（300以上）的镜像可能会拖慢速度，你可以直接禁用
 *   整张地图的镜像，节省计算量。
 * 2.你可以根据地图中的镜子的Y轴位置，来调整同步镜像边的位置。
 *   也可以调整同步模式。地图备注和插件指令设置后，永久有效。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 镜面
 * 如果你的地图不大，可以像画阴影一样，将整个地图变成一个大镜面。
 * （注意，冒号没有空格）
 * 
 * 地图备注：=>镜面:资源文件名
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件 - 镜面
 * 资源路径：img/Map__reflection （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__reflection文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。这里需要手动配置：
 * 
 * 地图镜面-1
 * 地图镜面-2
 * ……
 *
 * 地图镜面的资源需要和地图的大小一模一样。
 * 为( 图块长x48,图块宽x48 )像素
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 同步镜像
 * 所有镜像默认开启反射，如果你想关闭某些事件的镜像，可以使用下面设置。
 * 
 * 事件备注：<不反射镜像>
 *
 * 事件注释：=>图块同步镜像 : 不反射镜像
 * 事件注释：=>图块同步镜像 : 开启反射镜像
 * 
 * 插件指令：>图块同步镜像 : 玩家 : 不反射镜像
 * 插件指令：>图块同步镜像 : 玩家 : 开启反射镜像
 * 插件指令：>图块同步镜像 : 本事件 : 不反射镜像
 * 插件指令：>图块同步镜像 : 本事件 : 开启反射镜像
 * 插件指令：>图块同步镜像 : 事件[10] : 不反射镜像
 * 插件指令：>图块同步镜像 : 事件[10] : 开启反射镜像
 *
 * 1.数字表示事件id。
 * 2.事件注释的 不反射镜像和开启反射镜像 可以针对不同的事件页进行设置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 行走图锁定
 * 如果你设置的是静态的物件朝向上或下，行走图是不一致的。
 * 这时候，你可以添加注释锁定镜像的行走图朝向：
 *
 * 事件注释：=>图块同步镜像 : 锁定镜像朝向
 * 事件注释：=>图块同步镜像 : 关闭锁定镜像朝向
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 透明同步
 * 你可以关闭镜像的透明度与事件的统一同步的设置：
 * 
 * 事件注释：=>图块同步镜像 : 关闭镜像透明同步
 * 事件注释：=>图块同步镜像 : 开启镜像透明同步
 * 
 * 插件指令：>图块同步镜像 : 玩家 : 关闭镜像透明同步
 * 插件指令：>图块同步镜像 : 玩家 : 开启镜像透明同步
 * 插件指令：>图块同步镜像 : 本事件 : 关闭镜像透明同步
 * 插件指令：>图块同步镜像 : 本事件 : 开启镜像透明同步
 * 插件指令：>图块同步镜像 : 事件[10] : 关闭镜像透明同步
 * 插件指令：>图块同步镜像 : 事件[10] : 开启镜像透明同步
 *
 * 1."镜像透明同步"是指：
 *   镜像透明度 随着 事件透明度 变化而变化。
 *   镜像透明状态 随着 事件透明状态 变化而变化。
 * 2.关闭后，你可以设置 透明度为0 或 开启透明状态 的事件，
 *   却具有不透明的反射镜像。（镜中小爱丽丝）
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   开启地图的同步镜像开关，设置图块。
 *              去物体管理层、地理管理层、镜像管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【107.95ms】
 *              100个事件的地图中，平均消耗为：【74.94ms】
 *               50个事件的地图中，平均消耗为：【52.21ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.考虑到性能优化，如果镜像离开了镜头，那么可以直接关闭镜像，减少
 *   消耗量。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。并且修复了角色隐身时，镜像不隐身的bug。
 * [v1.2]
 * 优化了内部结构，并且添加了性能测试说明。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 添加了 镜像离开镜头是否自动关闭 的性能优化功能。
 * [v1.5]
 * 修复了镜像图像在的事件图像上面的bug。
 * [v1.6]
 * 修改了插件指令格式，修改了透明状态控制。
 *
 * 
 *
 * @param 所有地图是否默认启用镜像
 * @parent ----操作面板----
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc 设置地图默认启用禁用开关。对于不同的地图情况，添加地图备注。
 * @default false
 *
 * @param 初始同步镜像边
 * @type number
 * @min 0
 * @desc 反射出同步镜像的反射边缘Y轴位置，单位像素。（一个图块为48像素）
 * @default 288
 *
 * @param 同步模式
 * @type select
 * @option 等距同步
 * @value 等距同步
 * @option 单行同步
 * @value 单行同步
 * @desc 等距同步：根据事件与反射边的距离，反射镜像。单行同步：无视距离，所有镜像都被挤在一行反射边中。
 * @default 等距同步
 *
 * @param 图块标记
 * @desc 指定标记数字的图块将会具有反射效果，可以设置多个。（1-7）
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 *
 * @param 区域标记
 * @desc 指定标记的R区域将会具有反射效果，可以设置多个。（1-255）
 * @type number[]
 * @min 1
 * @max 255
 * @default ["12"]
 *
 * @param 镜像透明比例
 * @type number
 * @min 0
 * @max 100
 * @desc 镜像的透明度百分比的比例，0表示完全透明，100表示完全不透明。能与动作效果叠加。
 * @default 35
 *
 * @param 镜像离开镜头是否自动关闭
 * @type boolean
 * @on 自动关闭
 * @off 禁用
 * @desc 考虑到性能优化，如果镜像离开了镜头，可以直接关闭镜像。
 * @default true
 * 
 * @param ---地图镜面组 1至20---
 * @default 
 *
 * @param 地图镜面-1
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-2
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-3
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-4
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-5
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-6
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-7
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-8
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-9
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-10
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-11
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-12
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-13
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-14
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-15
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-16
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-17
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-18
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-19
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-20
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param --地图镜面组21至40--
 * @default 
 *
 * @param 地图镜面-21
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-22
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-23
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-24
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-25
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-26
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-27
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-28
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-29
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-30
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-31
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-32
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-33
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-34
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-35
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-36
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-37
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-38
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-39
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-40
 * @parent --地图镜面组21至40--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param --地图镜面组41至60--
 * @default 
 *
 * @param 地图镜面-41
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-42
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-43
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-44
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-45
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-46
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-47
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-48
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-49
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-50
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-51
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-52
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-53
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-54
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-55
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-56
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-57
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-58
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-59
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-60
 * @parent --地图镜面组41至60--
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LSR（Layer_Synchronized_Reflection）
//		临时全局变量	DrillUp.g_LSR_xxx
//		临时局部变量	无
//		存储数据变量	this._drill_LSR_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//	
//		工作类型		持续执行
//		时间复杂度		o(n)*o(贴图处理) 每帧
//		性能测试因素	镜像管理层50事件 跑一圈
//		性能测试消耗			不优化		离开镜头优化
//						低谷期：30.90ms		18.70ms
//						（未出现高峰期）
//		最坏情况		只要镜像多，就是最坏情况。
//		备注			图像处理减少的消耗，不是很好测，但是也有值。
//						在200事件的地图中，可以直接减少70%的消耗。
//						因为出了镜头的镜像暂停刷新，缩小了范围，200事件就变成了50个事件的消耗。
//
//插件记录：
//		★大体框架与功能如下：
//			图块同步镜像：
//				->镜面
//					->地图图块遮罩
//					->镜面对称线
//				->镜像
//					->显示隐藏
//					->镜像载入
//					->镜像跳跃、动作效果（继承）
//					->透明同步
//				->优化
//					->镜头外的镜像隐藏
//					x->镜像滤镜（消耗太大）
//					x->镜像粉碎（需要额外控制作用）
// 
//		★私有类如下：
//			* Drill_Sprite_LSR_Mask【地图图块遮罩】
//
//		★必要注意事项：
//			1.部分插件含手动屏蔽镜像：
//				Drill_EventFilter			行走图 - 滤镜效果
//				Drill_EventShatterEffect	行走图 - 方块粉碎效果
//
//		★其它说明细节：
//			1.反射原理并不难，每个事件都附带一个一模一样的镜像，根据对称线同步动作即可。
//			2.建立了一个层 this._drill_LSR_layer 存放所有镜像，在地形贴图的上面，角色图层的下面。
//			3,注意，事件的_transparent是与visible不一样的特殊控制变量。
//
//		★存在的问题：
//			1.定义一个镜像后，事件的 动画贴图和气泡贴图 会被镜面遮挡。（已解决）
//			2.进入循环地图边缘后，由于遮罩不是循环的，刷新位置后会出现镜像消失问题。
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerSynchronizedReflection = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerSynchronizedReflection');
	
	if( DrillUp.parameters['图块标记'] != "" ){
		DrillUp.g_LSR_terrainIds = (JSON.parse( DrillUp.parameters['图块标记'])).map(function(n){ return Number(n) });;
	}else{
		DrillUp.g_LSR_terrainIds = ([]).map(function(n){ return Number(n) }); ;
	}
	if( DrillUp.parameters['区域标记'] != "" ){
		DrillUp.g_LSR_areaIds = (JSON.parse( DrillUp.parameters['区域标记'])).map(function(n){ return Number(n) });;
	}else{
		DrillUp.g_LSR_areaIds = ([]).map(function(n){ return Number(n) }); ;
	}
    DrillUp.g_LSR_edge = Number(DrillUp.parameters['初始同步镜像边']) || 288;
	DrillUp.g_LSR_mode = String(DrillUp.parameters['同步模式'] || "等距同步");	
    DrillUp.g_LSR_opacity_per = Number(DrillUp.parameters['镜像透明比例']) || 35;
	DrillUp.g_LSR_map_default = String(DrillUp.parameters['所有地图是否默认启用镜像'] || "false") === "true";	
	DrillUp.g_LSR_auto_close = String(DrillUp.parameters['镜像离开镜头是否自动关闭'] || "true") === "true";	
	DrillUp.g_LSR_reflectionMap = "";
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapReflection = function(filename) {
    return this.loadBitmap('img/Map__reflection/', filename, 0, true);
};
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_LSR_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_LSR_pluginCommand.call(this, command, args);
	if (command === ">图块同步镜像") { //>图块同步镜像 : 玩家 : 不反射镜像
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			
			if( temp1 == "设置同步镜像边" ){ 
				$gameSystem._drill_LSR_edge = Number(type);
			}
			if( temp1 == "设置同步镜像模式" ){ 
				$gameSystem._drill_LSR_mode = String(type);
			}
			
			if( temp1 == "玩家" ){ 
				if( type == "不反射镜像" ){
					$gamePlayer._drill_LSR_isReflect = false;
					$gamePlayer.followers().forEach(function(f){ f._drill_LSR_isReflect = false; },this);
				}
				if( type == "开启反射镜像" ){
					$gamePlayer._drill_LSR_isReflect = true;
					$gamePlayer.followers().forEach(function(f){ f._drill_LSR_isReflect = true; },this);
				}
			}else if( temp1 == "本事件" ){ 
				if( type == "不反射镜像" ){
					$gameMap.event( this._eventId )._drill_LSR_isReflect = false;
				}
				if( type == "开启反射镜像" ){
					$gameMap.event( this._eventId )._drill_LSR_isReflect = true;
				}
			}
			var re = /^\d+$/;	//数字
			if( re.test(temp1) || temp1.indexOf("事件[") != -1 ){
				temp1 = temp1.replace("事件[","");
				temp1 = temp1.replace("]","");
				if( type == "不反射镜像" ){
					$gameMap.event( Number(temp1) )._drill_LSR_isReflect = false;
				}
				if( type == "开启反射镜像" ){
					$gameMap.event( Number(temp1) )._drill_LSR_isReflect = true;
				}
			}
		}
	}
};

//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_LSR_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_LSR_sys_initialize.call(this);
    this._drill_LSR_edge = DrillUp.g_LSR_edge ;
    this._drill_LSR_mode = DrillUp.g_LSR_mode ;
};

//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件 - 注释设置
//==============================
var _drill_LSR_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_LSR_setupPage.call(this);
    this.drill_LSR_setupReflect();
};
Game_Event.prototype.drill_LSR_setupReflect = function() {
	if(this.event().meta){
		this._drill_LSR_isReflect = (this.event().meta['不反射镜像'] || false) == false;
	}
	
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>图块同步镜像"){	//=>图块同步镜像 : 不反射镜像
				if(args.length == 2){
					if(args[1]){ var type = String(args[1]); }
					if( type == "不反射镜像" ){
						this._drill_LSR_isReflect = false;
					}
					if( type == "开启反射镜像" ){
						this._drill_LSR_isReflect = true;
					}
					if( type == "关闭镜像透明同步" ){
						this._drill_LSR_isOpacitySync = false;
					}
					if( type == "开启镜像透明同步" ){
						this._drill_LSR_isOpacitySync = true;
					}
					if( type == "锁定镜像朝向" ){
						this._drill_LSR_isLockDir = true;
					}
					if( type == "关闭锁定镜像朝向" ){
						this._drill_LSR_isLockDir = false;
					}
				}
			};
		};
	}, this);};
};

//=============================================================================
// ** 地图备注
//=============================================================================
var _drill_LSR_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_LSR_map_setup.call(this, mapId);
	this.drill_LSR_setupReflection();
};
Game_Map.prototype.drill_LSR_setupReflection = function() {
	this._drill_LSR_enable = DrillUp.g_LSR_map_default;
	DrillUp.g_LSR_reflectionMap = "" ;
	$dataMap.note.split(/[\r\n]+/).forEach(function(note) {
		var text_ = note.split(':');
		if( text_[0] === "=>镜面"){
			DrillUp.g_LSR_reflectionMap = text_[1] || "";
		}
		if( text_[0] === "=>启用图块同步镜像"){
			this._drill_LSR_enable = true;
		}
		if( text_[0] === "=>禁用图块同步镜像"){
			this._drill_LSR_enable = false;
		}
		if( text_[0] === "=>设置同步镜像边"){
			$gameSystem._drill_LSR_edge = Number(text_[1] || "0");
		}
	},this);
};

//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体初始化
//==============================
var _drill_LSR_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _drill_LSR_initMembers.call(this);
	this._drill_LSR_isReflect = true;
	this._drill_LSR_isOpacitySync = true;
	this._drill_LSR_isLockDir = false;
};
//==============================
// * 获取 - 反射
//==============================
Game_CharacterBase.prototype.drill_LSR_isReflect = function() {
	return this._drill_LSR_isReflect;
};
//==============================
// * 获取 - 镜像同步
//==============================
Game_CharacterBase.prototype.drill_LSR_isOpacitySync = function() {
	return this._drill_LSR_isOpacitySync;
};
//==============================
// * 获取 - 锁定镜像朝向
//==============================
Game_CharacterBase.prototype.drill_LSR_isLockDir = function() {
	return this._drill_LSR_isLockDir;
};

//==============================
// * 固定帧初始值
//==============================
var _Drill_LSR_s_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
	_Drill_LSR_s_updatePosition.call(this);
	if( this.rotation != 0 ){ this.rotation = 0; }
	if( this.scale.x != 1 ){ this.scale.x = 1; }
	if( this.scale.y != 1 ){ this.scale.y = 1; }
	if( this.skew.x != 0 ){ this.skew.x = 0; }
	if( this.skew.y != 0 ){ this.skew.y = 0; }
	//从这里开始，参数都被固定值（不需要考虑多次update的叠加影响）
};

//=============================================================================
// ** 地图
//=============================================================================
//==============================
// * 地图 - 建立镜像（Tilemap层）
//==============================
var _drill_LSR_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_LSR_createTilemap.call(this);
	this.drill_LSR_createReflect();
};
Spriteset_Map.prototype.drill_LSR_createReflect = function() {
	if($gameMap._drill_LSR_enable != true){ return; }
	
	//>建立贴图
	this._drill_LSR_sprites = [];
	$gameMap.events().forEach(function(event) {					//事件
		this._drill_LSR_sprites.push(new Drill_Sprite_LSR(event));
	}, this);
	$gamePlayer.followers().reverseEach(function(follower) {	//跟随队员
		this._drill_LSR_sprites.push(new Drill_Sprite_LSR(follower));
	}, this);
	this._drill_LSR_sprites.push(new Drill_Sprite_LSR($gamePlayer));	//玩家
	
	//>建立遮罩（将反射的图块全部涂白）
	this._drill_LSR_layer = new Sprite();
	this._drill_LSR_layer_mask = new Drill_Sprite_LSR_Mask();
	for (var i = 0; i < this._drill_LSR_sprites.length; i++) {
		this._drill_LSR_layer.addChild(this._drill_LSR_sprites[i]);
	}
	this._drill_LSR_layer.addChild(this._drill_LSR_layer_mask);		//遮罩原型（如果不addchild，Sprite是不会update的）
	this._drill_LSR_layer.mask = this._drill_LSR_layer_mask;		//遮罩
	this._drill_LRR_layer.z = 0.55;									//_tilemap z轴：1.事件下方 3.事件相同 5.事件上方 6.影子 7.气泡 8.动画层 9.鼠标目的地
																	//_tilemap再下面就是父类图块自身了，再下面是Parallax
	
	this._tilemap.addChild(this._drill_LSR_layer);
	
};
//==============================
// * 地图 - 确认物体数量
//==============================
var _drill_LSR_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	_drill_LSR_createCharacters.call(this);
	this._drill_LSR_CharSpriteLen = this._characterSprites.length;	//>记录物体数量
};
//==============================
// * 帧刷新 - 新事件的镜像
//==============================
var _drill_LSR_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	_drill_LSR_update.call(this);
	this.drill_LSR_updateNewEventReflect();
}
Spriteset_Map.prototype.drill_LSR_updateNewEventReflect = function() {
	if($gameMap._drill_LSR_enable != true){ return; }
	
	if( this._characterSprites.length > this._drill_LSR_CharSpriteLen){
		for(var i = this._drill_LSR_CharSpriteLen; i<this._characterSprites.length; i++ ){
			var temp_sprite = new Drill_Sprite_LSR(this._characterSprites[i]._character);
			this._drill_LSR_sprites.push(temp_sprite);
			this._drill_LSR_layer.addChild(temp_sprite);
		}
		this._drill_LSR_CharSpriteLen = this._characterSprites.length;
	}
}

//=============================================================================
// ** 镜像贴图类（直接继承玩家贴图）
//=============================================================================
function Drill_Sprite_LSR() {
	this.initialize.apply(this, arguments);
}
Drill_Sprite_LSR.prototype = Object.create(Sprite_Character.prototype);
Drill_Sprite_LSR.prototype.constructor = Drill_Sprite_LSR;

//==============================
// * 初始化
//==============================
Drill_Sprite_LSR.prototype.initialize = function(character) {
	Sprite_Character.prototype.initialize.call(this,character);
	this.opacity = 0;
	this._destroyed = false;
};

//==============================
// * 优化 - 镜头之外的事件，不刷新镜像
//==============================
Drill_Sprite_LSR.prototype.drill_LSR_isNearTheScreen = function() {
	if( !this._character ){ return false; }	//无事件的贴图直接跳过
	
    var gw = Graphics.width + 48*4;		//加宽识别范围
    var gh = Graphics.height + 48*4;
    var tw = $gameMap.tileWidth();
    var th = $gameMap.tileHeight();
    var px = this._character.scrolledX() * tw + tw / 2 - gw / 2;
    var py = this._character.scrolledY() * th + th / 2 - gh / 2;
    return px >= -gw && px <= gw && py >= -gh && py <= gh;
}

//==============================
// * 帧刷新
//==============================
Drill_Sprite_LSR.prototype.update = function() {
    //Sprite_Base.prototype.update.call(this);
    //this.updateBitmap();
    //this.updateFrame();
    //this.updatePosition();
    //this.updateAnimation();
    //this.updateBalloon();
    //this.updateOther();
	
	//>性能优化
	if( DrillUp.g_LSR_auto_close && !this.drill_LSR_isNearTheScreen() ){	//不在镜头范围内，直接关闭update（能直接节省210ms左右性能）
		this.visible = false;
		return;
	}
	
	Sprite_Character.prototype.update.call(this);
	
	//>位移
	if( $gameSystem._drill_LSR_mode == "单行同步" ){
		//单行同步
		var real_fix_y = Math.round( (this._character.scrolledY() + 1)*$gameMap.tileHeight() - this._character.shiftY());
		this.y = $gameSystem._drill_LSR_edge + this.y - real_fix_y;
	}else{
		//等距同步
		var real_fix_y = Math.round( (this._character.scrolledY() + 1)*$gameMap.tileHeight() - this._character.shiftY());
		this.y = $gameSystem._drill_LSR_edge *2 + 48 - this.y + (this.y - real_fix_y)*2;
	}
	//>透明度
	if( this._character.drill_LSR_isOpacitySync() ){
		this.opacity = Math.min( this._character._opacity ,255) /100 * DrillUp.g_LSR_opacity_per;
	}else{
		this.opacity = 255 /100 * DrillUp.g_LSR_opacity_per;
	}
	//>可见
	this.visible = this._character.drill_LSR_isReflect() && !this._destroyed ;
	if( this._character.drill_LSR_isOpacitySync() && this._character._transparent == true ){ 	//透明状态同步
		this.visible = false; 
	}
	
};
//==============================
// * 行走图倒转
//==============================
Drill_Sprite_LSR.prototype.characterPatternY = function() {
	if( this._character.direction() == 2 && !this._character.drill_LSR_isLockDir() ){ return (8-2) /2 ; }
	if( this._character.direction() == 8 && !this._character.drill_LSR_isLockDir() ){ return (2-2) /2 ; }
    return (this._character.direction() - 2) / 2;
};

//==============================
// * 去掉影响的部分
//==============================
Drill_Sprite_LSR.prototype.updateAnimation = function() {}	//动画遮挡
Drill_Sprite_LSR.prototype.updateBalloon = function() {}	//气泡遮挡

//==============================
// * 兼容mog粒子
//==============================
if(Imported.MOG_CharParticles){
	Drill_Sprite_LSR.prototype.canUpdateParticles = function() {
		return false;
	}
}
//==============================
// * 兼容mog粉碎
//==============================
if(Imported.MOG_CharParticles){
	Drill_Sprite_LSR.prototype.createShatterSprites = function() {
		this._destroyed = true;
		return;
	}
	Drill_Sprite_LSR.prototype.updateShatterEffect = function() {
		this._destroyed = true;
		return;
	}
}

//=============================================================================
// ** 地图图块遮罩
//		（由于是mask，所以只能用sprite）
//=============================================================================
function Drill_Sprite_LSR_Mask() {
	this.initialize.apply(this, arguments);
}
Drill_Sprite_LSR_Mask.prototype = Object.create(Sprite.prototype);
Drill_Sprite_LSR_Mask.prototype.constructor = Drill_Sprite_LSR_Mask;

//==============================
// * 初始化
//==============================
Drill_Sprite_LSR_Mask.prototype.initialize = function() {
	Sprite.prototype.initialize.call(this);
	
	if( DrillUp.g_LSR_reflectionMap != "" ){
		this.bitmap = ImageManager.load_MapReflection(DrillUp.g_LSR_reflectionMap);
	}else{
		this.bitmap = new Bitmap( $gameMap.width()*$gameMap.tileWidth() , $gameMap.height()*$gameMap.tileHeight() );
		//alert($gameMap.displayX())
		//alert($gameMap.displayY())
		//alert($gameMap.width())
		//this.bitmap.fillRect(100, 100, 500, 500, "#ffffff");
		for(var xx = 0; xx< $gameMap.width() ;xx++){
			for(var yy = 0; yy< $gameMap.height() ;yy++){
			
				var terrainTag = $gameMap.terrainTag(xx, yy);
				var regionId = $gameMap.regionId(xx, yy);
				if( DrillUp.g_LSR_terrainIds.contains(terrainTag) ||  DrillUp.g_LSR_areaIds.contains(regionId) ){
					this.bitmap.fillRect( 
						xx* $gameMap.tileWidth() , 
						yy* $gameMap.tileHeight(), 
						$gameMap.tileWidth(), 
						$gameMap.tileHeight(), 
						"#ffffff");
				}else{
					this.bitmap.fillRect( 
						xx* $gameMap.tileWidth() , 
						yy* $gameMap.tileHeight(), 
						$gameMap.tileWidth(), 
						$gameMap.tileHeight(), 
						"#000000");
				}
			}
		}
	}
}
//==============================
// * 帧刷新
//==============================
Drill_Sprite_LSR_Mask.prototype.update = function() {
	Sprite.prototype.update.call(this);
	this.x = -$gameMap.displayX()* $gameMap.tileWidth();
	this.y = -$gameMap.displayY()* $gameMap.tileHeight();
}


