//==================================================
//  ZPM_SuperMove.js
//==================================================

/*:
 * @plugindesc [v3.2]        地图 - 超级移动核心
 * @author ZPM
 * @help
 * ==================================================
 * 使用注意事项:
 * ==================================================
 * 
 * 本插件含有众多重写函数,请谨慎使用.
 * 
 * 兼容将以扩展包的方式额外制作.
 * 
 * 为确保插件功能正常,请将本插件放于最下排.
 * 
 * 本插件有大量'插件指令'和'事件注释指令'.
 * 
 * 可实现单次行走距离突破1格的限制(可大可小,根据移动
 * 速度动态判断).
 * 
 * 可实现独立碰撞体积设定.
 * 
 * 本插件改写了事件的触发方法.
 * 
 * 事件的触发范围可设置多种类型,如:十字型,圆,扇形,矩形.
 * 可能随插件更新增加种类.
 * 
 * --------------------------------------------------
 * 
 * 注释指令的特别说明:
 * 
 * 注释指令的特性是,当事件的注释指令所在页面,满足激活
 * 条件,且排在所有满足条件页面的最后时,注释指令将自动
 * 执行.
 * 
 * 并不需要触发事件.
 * 
 * --------------------------------------------------
 * 
 * ==================================================
 * 插件指令:
 * ==================================================
 * 
 * --------------------------------------------------
 * 
 * >启用超级移动
 * 
 * >supermoveon
 * 
 * 功能说明:启用超级移动功能.
 * 
 * --------------------------------------------------
 * 
 * >禁用超级移动
 * 
 * >supermoveoff
 * 
 * 功能说明:禁用超级移动功能.
 * 
 * --------------------------------------------------
 * 
 * >角色碰撞体积[空格]数值[空格]数值
 * 
 * >actorboxsize[space]number[space]number
 * 
 * 功能说明:第一数值设置宽度,第二数值设置高度.
 * 将影响移动,触发相关.
 * 
 * 每个角色都有自己的碰撞体积,该指令将改变当前
 * 领队角色的碰撞体积,更换领队时,碰撞体积会改变
 * 但已修改碰撞体积的角色,会保留修改后的数值.
 * 数值以像素为单位,插件会自动纠正数值至12的n倍.
 * 
 * 关于宽度:以原坐标为基点,左右对称缩放.
 * 
 * 关于高度:以原坐标为基点,向上单方向缩放,下方不变
 * 
 * 额外说明:与事件图片大小无直接关系,可设置对应体积
 * 来应对不同尺寸图片从而达到视觉效果统一.
 * 默认体积为48*48.
 * 可通过编辑器数据库中角色面板,
 * 进行默认碰撞体积的设置.
 * 
 * 方法是:在对应角色的备注窗填写以下公式格式的一种.
 * <碰撞体积:48,48>
 * <actorboxsize:48 48>
 * <碰撞体积:144|96>
 * 请确保公式的完整性.
 * 
 * --------------------------------------------------
 * 
 * >八方向移动
 * 
 * >movedir8
 * 
 * 功能说明:开启八方向移动.
 * 
 * 额外说明:此参数为全局存储类型.
 * 
 * --------------------------------------------------
 * 
 * >四方向移动
 * 
 * >movedir4
 * 
 * 功能说明:关闭八方向,还原4方向移动.
 * 
 * 额外说明:此参数为全局存储类型.
 *  
 * --------------------------------------------------
 * 
 * >全局事件触发间隔[空格]数值
 * 
 * >defaulteventintervaltime[space]number
 * 
 * 功能说明:指定数值作为事件的默认触发间隔(帧).
 * 
 * 额外说明:此参数为全局存储类型,事件页注释指令可
 * 覆盖当页事件自身间隔参数.
 * 
 * --------------------------------------------------
 * 
 * >全局启用事件触发间隔
 * 
 * >defaulteventintervalon
 * 
 * 功能说明:设置事件默认状态下启用触发间隔.
 * 
 * 额外说明:此参数为全局存储类型,事件页注释指令可
 * 覆盖当页事件自身间隔参数.
 * 
 * --------------------------------------------------
 * 
 * >全局禁用事件触发间隔
 * 
 * >defaulteventintervaloff
 * 
 * 功能说明:设置事件默认状态下禁用触发间隔.
 * 
 * 额外说明:此参数为全局存储类型,事件页注释指令可
 * 覆盖当页事件自身间隔参数.
 * 
 * --------------------------------------------------
 * 
 * >玩家移速[空格]数值
 * 
 * >playermovespeed[space]number
 * 
 * 功能说明:修改玩家移动速度,系统默认为4.
 * 
 * 速度解析:可设置1 - 7,7种速度档次.
 * 
 * 额外说明:该参数会影响单次按键所行进的距离,
 * 及一帧移动距离,帧距离为行进距离的1 / 2.
 * 
 * --------------------------------------------------
 * 
 * >玩家跑速[空格]数值
 * 
 * >playerrunspeed[space]number
 * 
 * 功能说明:修改玩家奔跑速度,系统默认为4.
 * 将奔跑速度独立出来的目的是让玩家可随意
 * 在两种速度中切换.
 * 
 * --------------------------------------------------
 * 
 * >启用触摸传送
 * 
 * >touchtransferon
 * 
 * 功能说明:启用触摸传送功能.
 * 触摸传送是指使用鼠标或者其他方式移动时,不进行位移,
 * 而是直接通过瞬间传送的方式移动过去.
 * 不影响常规按键移动.
 * 
 * --------------------------------------------------
 * 
 * >禁用触摸传送
 * 
 * >touchtransferoff
 * 
 * 功能说明:禁用触摸传送功能.
 * 
 * --------------------------------------------------
 * 
 * >触摸传送计时[空格]数值
 * 
 * >touchtransferclocks[space]number
 * 
 * 功能说明:触摸传送开启时的玩家移动锁定时间.
 * 用于播放相关传送动画.
 * 
 * --------------------------------------------------
 * 
 * >触摸传送动画[空格]数值
 * 
 * >touchtransferanimationid[space]number
 * 
 * 功能说明:触摸传送开启时的动画ID.
 * 对应系统里的动画ID.
 * 
 * --------------------------------------------------
 * 
 * >启用强制奔跑
 * 
 * >playerforcedashingon
 * 
 * 功能说明:强制以奔跑方式移动.优先于其他条件判定.
 * 
 * --------------------------------------------------
 * 
 * >禁用强制奔跑
 * 
 * >playerforcedashingoff
 * 
 * 功能说明:取消强制奔跑.
 * 
 * --------------------------------------------------
 * 
 * ==================================================
 * 事件注释指令:[同一事件不同页不共享指令]
 * ==================================================
 * 
 * --------------------------------------------------
 * 
 * >事件碰撞体积[空格]数值[空格]数值
 * 
 * >eventboxsize[space]number[space]number
 * 
 * 功能说明:第一数值设置宽度,第二数值设置高度.
 * 将影响移动,触发相关.
 * 数值以像素为单位,插件会自动纠正数值至12的n倍
 * 
 * 关于宽度:以原坐标为基点,左右对称缩放.
 * 
 * 关于高度:以原坐标为基点,向上单方向缩放,下方不变.
 * 
 * 额外说明:与事件图片大小无直接关系,可设置对应体积
 * 来应对不同尺寸图片从而达到视觉效果统一.
 * 默认体积为48*48.
 * 
 * --------------------------------------------------
 * 
 * >事件触发范围类型[空格]数值
 * 
 * >eventtriggerrangetype[space]number
 * 
 * 功能说明:事件的触发响应范围类型.
 * 仅作用于"事件触发"类型事件的判定.
 * 默认为十字型,对应数字'1'
 * 请使用正整数,该功能与事件触发范围密切相关.
 * 
 * 类型说明:
 * <1>:十字型
 * 
 * >事件触发范围 [???] [???]
 * 设置两轴参数.
 * 数值对应<西北>两方向的触发范围.
 * 
 * >事件触发范围差值 [???] [???]
 * 设置对称方向的触发范围差值,
 * 未设置时默认为0差值.
 * 触发范围镜像对称.
 * 
 * <2>:带朝向跟随十字型
 * 
 * >事件触发范围 [???] [???]
 * 设置两轴参数.
 * 数值对应<左前>两方向的触发范围.
 * 跟随事件朝向动态变化,非镜像
 * 变化,而是旋转变化,8方向可用.
 * 
 * >事件触发范围差值 [???] [???]
 * 设置对称方向的触发范围差值,
 * 未设置时默认为0差值.
 * 触发范围镜像对称.
 * 
 * <3>:圆型
 * >事件触发范围半径 [???]
 * 设置半径.
 * 
 * <4>:扇形
 * 
 * >事件触发范围半径 [???]
 * 设置扇形半径.
 * 
 * >事件触发范围 [???] [???]
 * 设置起始角度和终止角度.
 * 
 * <5>:带朝向跟随扇形
 * 
 * >事件触发范围半径 [???]
 * 设置扇形半径.
 * 
 * >事件触发范围 [???] [???]
 * 设置起始角度和终止角度,
 * 扇形范围根据事件的朝向动态变化,
 * 该变化为旋转变化,8方向可用.
 * 
 * <6>:矩形
 * 
 * >事件触发范围 [???] [???]
 * 设置两轴参数.
 * 是以事件中心为矩形中心,
 * 数值对应矩形的西半部分宽度,
 * 及北半部分高度.
 * 
 * >事件触发范围差值 [???] [???]
 * 设置对称方向的触发范围差值,
 * 未设置时默认为0差值.
 * 触发范围镜像对称.
 * 
 * <7>:带朝向跟随矩形
 * 
 * >事件触发范围 [???] [???]
 * 设置两轴参数.
 * 是以事件中心为矩形中心,
 * 数值对应矩形的<左>半部分宽度,
 * 及<前>半部分高度.
 * 
 * >事件触发范围差值 [???] [???]
 * 设置对称方向的触发范围差值,
 * 未设置时默认为0差值.
 * 触发范围镜像对称.
 * 
 * --------------------------------------------------
 * 
 * >启用事件触发后玩家位置校正
 * 
 * >eventtriggeredplayerposadjuston
 * 
 * >禁用事件触发后玩家位置校正
 * 
 * >eventtriggeredplayerposadjustoff
 * 
 * 功能说明:事件触发成功时,是否对玩家坐标进行校正.
 * 插件参数设置的是全局默认开关.
 * 
 * 这里设置的是单独事件页的开关,可以覆盖全局开关.
 * 
 * 矫正是指:当玩家碰撞中心和事件碰撞中心不对齐时,
 * 对玩家坐标进行修正,且当玩家角色移动到规定位置后,
 * 事件才会开始执行.
 * 
 * --------------------------------------------------
 * 
 * >事件触发范围半径[空格]数值
 * 
 * >eventtriggerrangeradius[space]number
 * 
 * 功能说明:事件的触发响应范围的半径数值.
 * 仅作用于"事件触发"类型事件的判定.
 * 仅在对应范围类型时,才会被使用到.
 * 
 * --------------------------------------------------
 * 
 * >事件触发范围[空格]数值[空格]数值
 * 
 * >eventtriggerrange[space]number[space]number
 * 
 * 功能说明:第一数值设置X轴,第二数值设置Y轴.
 * 
 * 当范围类型为扇形时,第一数值设置起始角度,
 * 第二数值设置的是终止角度.
 * 
 * 该角度是以3点钟方向为起点,顺时针的旋转角度,
 * 设置的是角色方向为朝下(2)时的角度.
 * 
 * 仅作用于"事件触发"类型事件的判定,默认的触发
 * 范围为[0,0],可为负,数值以图块为单位,插件会
 * 自动纠正数值至0.25的n倍.
 * 
 * 例如:
 * 
 * >eventtriggerrange 2 2 
 * 
 * >事件触发范围 45 135
 * 
 * --------------------------------------------------
 * 
 * >事件触发范围差值[空格]数值[空格]数值
 * 
 * >eventtriggerrangeoffset[space]number[space]number
 * 
 * 功能说明:是事件触发范围的额外参数.
 * 第一个数值为左(西)右(东)两侧触发范围的差值.
 * 第二个数值为前(北)后(南)两侧触发范围的差值.
 * 当为正数时,左(西)|前(北)的触发范围比
 * 右(东)|后(南)大,且差值为本数值的绝对值.
 * 当为负数时,左(西)|前(北)的触发范围比
 * 右(东)|后(南)小,且差值为本数值的绝对值.
 * 
 * 当触发类型为固定类型时,以上方向为绝对方向,即画面
 * 显示的方向.
 * 
 * 当触发类型为随朝向时,以上方向为相对方向,即根据朝向
 * 的角色前后左右.
 * 
 * --------------------------------------------------
 * 
 * >启用事件目的地锚点
 * 
 * >targetposforevent
 * 
 * 功能说明:事件触发判定时,关键坐标的获取对象.
 * 目的地锚点指移动目的地坐标.
 * 
 * --------------------------------------------------
 * 
 * >启用事件显示位锚点
 * 
 * >realposforevent
 * 
 * 功能说明:事件触发判定时,关键坐标的获取对象.
 * 显示位锚点指当前画面所在坐标.
 * 
 * --------------------------------------------------
 * 
 * >启用事件超级移动
 * 
 * >eventsupermoveon
 * 
 * 功能说明:启用事件超级移动功能.
 * 
 * --------------------------------------------------
 * 
 * >禁用事件超级移动
 * 
 * >eventsupermoveoff
 * 
 * 功能说明:禁用事件超级移动功能.
 * 
 * --------------------------------------------------
 * 
 * >事件触发间隔[空格]数值
 * 
 * >eventintervaltime[space]number
 * 
 * 功能说明:调整当前事件页的触发间隔时间(帧).
 * 优先级高于全局设置.
 * 
 * --------------------------------------------------
 * 
 * >启用时间间隔
 * 
 * >eventintervalon
 * 
 * 功能说明:启用当前事件页的触发间隔.
 * 优先级高于全局设置.
 * 
 * --------------------------------------------------
 * 
 * >禁用时间间隔
 * 
 * >eventintervaloff
 * 
 * 功能说明:禁用当前事件页的触发间隔.
 * 优先级高于全局设置.
 * 
 * --------------------------------------------------
 * 
 * >事件搜索范围[空格]数值
 * 
 * >eventsearchscope[space]number
 * 
 * 功能说明:事件与玩家两坐标轴的距离差总和,不大于该
 * 数值时事件判定为玩家附近状态,请使用正整数,以图块
 * 为单位!MV官方设定的图块为48*48.
 * 
 * --------------------------------------------------
 * 
 * >启用强制常规移动
 * 
 * >forcenormalmoveon
 * 
 * 功能说明:禁用一切像素移动相关功能模块,包括
 * 移动单位距离,碰撞体积.
 * 这是一个全局存储参数.将影响其他存档.
 * 
 * 适合那些不需要像素移动和碰撞体积,但是想要
 * 八方向行走图或者自定义动画功能的同学使用.
 * 
 * --------------------------------------------------
 * 
 * >禁用强制常规移动
 * 
 * >forcenormalmoveoff
 * 
 * 功能说明:恢复像素移动相关功能模块的使用.
 * 这是一个全局存储参数.将影响其他存档.
 * 
 * --------------------------------------------------
 * 
 * ==================================================
 * 
 * v1.0         插件完成                2020/04/10
 * 
 * v1.1         追加图块边缘自动寻路    2020/04/24
 * 
 * 当通行受阻,且处于非通行图块边缘时(半格以内)
 * 自动转向移动.
 * 
 * v1.2         追加事件边缘自动寻路    2020/04/25
 * 
 * 当通行受阻,且处于阻挡事件边缘时(随事件体积)
 * 自动转向移动.
 * 
 * v1.3         优化边缘寻路            2020/04/27
 * 
 * v1.4         事件触发碰撞计算        2020/05/13
 * 
 * 修改事件触发范围设置的方式,由原像素单位改
 * 为图块单位,现在数值1相当于之前的48.
 * 
 * 引入SAT(Separating Axis Theorem)算法.
 * 
 * 事件触发类型中的由事件触发,这种方式的判定算法
 * 更新,由此,该类型将拥有更多样的触发模式可设置.
 * 在之前的固定方块模式的基础上,追加了:
 * >>>>>跟随事件面向的十字型触发范围(8方向)
 * >>>>>圆形触发范围
 * >>>>>固定朝向的扇形触发范围
 * >>>>>跟随事件面向的扇形触发范围(8方向)
 * 
 * 追加新的事件注释指令:
 * >事件触发范围半径
 * >eventtriggerrangeradius
 * 具体设置方法请查看注释指令'事件触发范围类型'
 * 的更新说明说明.
 * 
 * v1.5         追加调试模式            2020/05/14
 * 
 * 调试模式会显示物体的碰撞体积图块
 * 
 * 特殊脚本:
 * $gameMap.event(this._eventId).checkPlayerPos
 * ($gameMap.event(this._eventId)._ZPM_triggertype)
 *  && this.isOnCurrentMap();
 * 
 * 该脚本可使用于分支条件判定,以测试触发事件的是
 * 玩家按键,还是进入事件范围的被动触发.
 * 比如:某扇形范围的警哨,可在非触发范围进行主动触发
 * 从而达到不引发报警处理警哨的目的.
 * 
 * v1.6         优化插件            2020/05/15
 * 
 * 优化了行走判定,当路线被阻挡时,可不松按键的情况
 * 下,按其他方向键转向(仅在开启超级移动时有效).
 * 追加事件触发后是否校正坐标.
 * 开启校正时,事件会在校正完毕后再执行.
 * 
 * v1.7         修复小体积问题      2020/05/15
 * 
 * 修复了体积小于常规参数时,事件或者图块边缘鬼畜
 * 寻路的问题,优化事件判定.
 * 
 * v1.8         优化事件校正        2020/05/16
 * 
 * 新增两条事件注释指令,可以对事件页进行单独的
 * 校正开关设置,哪些事件需要做玩家位置校正,哪些
 * 不需要,可以分别设置了.
 * 
 * v1.9         追加触摸传送        2020/05/21
 * 
 * 追加对应该功能的4条指令.
 * 这是一个带动画的瞬移模块.
 * 插件改名为'超级移动核心'.
 * 插件兼容将通过扩展插件的形式进行追加.
 * 
 * v2.0         追加触发范围类型    2020/05/28
 * 
 * 完善触发机制.
 * 修复位置校正的通行判定.
 * 追加矩形的触发范围类型.
 * 追加新的触发范围相关参数及注释指令.
 * 矩形范围可控性更强.
 * 例如:
 * >eventboxsize 144,48
 * >eventtriggerrange -1 -1
 * >eventtriggerrangeoffset 0 -4
 * >eventtriggerrangetype 6
 * 
 * 以上指令设置了一个碰撞体积为三格宽,
 * 一格高的事件,该事件类型为6(固定矩形),
 * 触发范围及范围差值决定了该矩形的触发
 * 范围如下:
 * 
 * xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * x****************************x
 * x****************************x
 * xxxxxxxxxx**********xxxxxxxxxx
 *           **********
 *           **********
 *           **********
 *           **********
 *           **********
 *           **********
 *           **********
 *           **********
 *           **********
 *           **********
 *           **********
 *           **********
 * 
 * v2.1         奔跑速度独立化      2020/05/29
 * 
 * 将奔跑速度独立出来,可通过指令单独设置.
 * 
 * v2.2         完善跟随寻路        2020/06/09
 * 
 * 重写了跟随角色的寻路函数,不会穿墙了.
 * 修改了移动相关函数,修正抖动问题.
 * 
 * v2.3         追加八方向行走图    2020/06/24
 * 
 * 简化了调试模式,只显示碰撞体积了.
 * 追加校正奔跑开关.
 * 追加八方向行走图支持.
 * 追加自定义帧数行走图支持.
 * 追加一图多状态支持.
 * 一张行走图,可同时包含站立待机图,
 * 行走图,奔跑图.
 * 
 * 追加新的注释指令:
 * >事件初始帧
 * >eventoriginalpattern
 * 
 * 追加新的插件指令:
 * >角色初始帧
 * >characteroriginalpattern
 * 
 * 新角色备注指令:
 * <初始帧:4>
 * <originalpattern:4>
 * 
 * 4代表第4帧.
 * 
 * 行走图的资源文件名格式如下:
 * 
 * 格式一:
 * 
 * $&量子妹行走图.png
 * 表示使用帧数为3,且仅包含行走图的
 * 八方向行走图格式.
 * 
 * 以$#开头时,才会使用八方向的行走图.
 * 
 * 格式二:
 * 
 * $量子妹行走图[m8].png
 * 表示使用自定义帧数为8的四方向
 * 行走图.
 * 
 * 格式三:
 * 
 * $&量子妹[s6][m8][r8].png
 * 表示使用八方向,且待机图,行走图,奔跑图
 * 自定义帧数为8.
 * 
 * 注意,三种图的排列顺序应为
 * 待机图>>>>行走图>>>>奔跑图.
 * 
 * 八方向功能可与钻头的多帧行走图兼容,
 * 自定义帧功能优先级高于钻头的多帧行
 * 走图插件.
 * 
 * 注意!!八方向排列顺序为:
 * 
 * 2    2   2   2   2   2   2   2
 * 4    4   4   4   4   4   4   4
 * 6    6   6   6   6   6   6   6
 * 8    8   8   8   8   8   8   8
 * 1    1   1   1   1   1   1   1
 * 3    3   3   3   3   3   3   3
 * 7    7   7   7   7   7   7   7
 * 9    9   9   9   9   9   9   9
 * 
 * 以上为自定义总帧数为8的八方向图内容.
 * 其中数字代表朝向.
 * 
 * 当文件以$&&开头时,排列顺序将使用了
 * falcom格式:
 * 
 * 4    4   4   4   4   4   4   4
 * 7    7   7   7   7   7   7   7
 * 8    8   8   8   8   8   8   8
 * 9    9   9   9   9   9   9   9
 * 6    6   6   6   6   6   6   6
 * 3    3   3   3   3   3   3   3
 * 2    2   2   2   2   2   2   2
 * 1    1   1   1   1   1   1   1
 * 
 * v2.4         追加自定义动画     2020/07/08
 * 
 * 此动画为表情或者动作动画.
 * 
 * 追加新的注释指令:
 * >自定义动画资源图
 * >customanimepicture
 * >播放自定义动画
 * >playcustomanime
 * 
 * 追加新的插件指令:
 * >自定义动画资源图
 * >customanimepicture
 * >播放自定义动画
 * >playcustomanime
 * 
 * 追加新的备注指令:
 * <自定义动画资源图:???>
 * <customanimepicture:???>
 * 
 * 自定义动画资源图的文件名格式规则如下:
 * 
 * 首先,请参考mv官方自带的行走图素材img\characters\Vehicle.png
 * 每一种载具就相当于一种动画.
 * 
 * 文件名无任何参数时,就需要按参考图的分布进行绘制.
 * 
 * 如使用八方向,则请将文件名以$&开头,同样支持falcom格式
 * 的$&&.
 * 
 * 通过参考图我们可以发现,一张资源图有4X2共8种动画.
 * 那么这个排列也是可以修改的.规则如下:
 * 
 * 文件名中包含[???x???]时,将重新规划动画分布.
 * 
 * 例: [4x3] 表示每行有4种动画,共有3行.
 * 
 * 同样,每种动画的帧数也是可以自定义的,规则如下:
 * 
 * 文件名中包含[???c???]时,字母c前面的数字代表第几个动画,
 * 字母c后面的数字代表帧数.
 * 
 * 例:$&[2x2][3c6] 表示第三种(第二行第一种)动画有6帧,且这是
 * 一张八方向的自定义动画资源图.
 * 
 * v2.5         追加新功能          2020/07/10
 * 
 * 自定义动画播放时,按方向键或者确定键,
 * 将终止自定义动画(仅玩家).
 * 
 * 追加新的插件指令:
 * >待机随机动画触发时间
 * >randomstepanimetriggertime
 * >设置随机待机动画
 * >setrandomstepanime
 * 
 * 追加新的注释指令:
 * >自动执行脚本
 * >autoplayscript
 * >待机随机动画触发时间
 * >randomstepanimetriggertime
 * >设置随机待机动画
 * >setrandomstepanime
 * 
 * 追加新的备注指令:
 * <随机待机动画:???>
 * <randomstepanime:???>
 * 
 * v2.6         追加动画音效距离    2020/07/11
 * 
 * 根据动画离视角中心的距离,调整音效的
 * 声道平衡和音量.
 * 
 * v2.7         追加动画朝向新功能  2020/07/11
 * 
 * 现在可以通过设置朝向参数为0来保持原始朝向,
 * 也可以设置5来获取随机朝向了.
 * 
 * 追加新的注释指令:
 * >启用强制常规移动
 * >forcenormalmoveon
 * >禁用强制常规移动
 * >forcenormalmoveoff
 * 
 * v2.8         播放动画指令更新    2020/07/19
 * 
 * 注释指令及插件指令:
 * >播放自定义动画
 * >playcustomanime
 * 
 * 追加了新的参数.
 * 可在原格式基础上追加动画组循环播放的次数了.
 * 格式为原基础上再追加一个数值参数.
 * 具体可以查看相关指令说明.
 * 
 * 追加新的注释指令:
 * >启用待机随机动画背景播放
 * >rtabehindeventon
 * >禁用待机随机动画背景播放
 * >rtabehindeventoff
 * 
 * 追加新的插件指令:
 * >启用待机随机动画背景播放
 * >rtabehindeventon
 * >禁用待机随机动画背景播放
 * >rtabehindeventoff
 * 
 * 可设置目标的待机随机动画特性,当地图有事件进行中时,
 * 也可以播放随机待机动画.
 * 具体格式请查看指令说明.
 * 
 * v2.9         BUG修复及指令追加   2020/07/22
 * 
 * 追加新的注释指令:
 * >启用组内动画间隔期锁帧
 * >betweencaalockframeon
 * >禁用组内动画间隔期锁帧
 * >betweencaalockframeoff
 * 
 * 追加新的插件指令:
 * >启用组内动画间隔期锁帧
 * >betweencaalockframeon
 * >禁用组内动画间隔期锁帧
 * >betweencaalockframeoff
 * 
 * 可设置组内动画的间隔期是否锁定最后一帧.
 * 
 * v3.0         核心分离完成        2020/08/05
 * 
 * 动画核心分离完成,本插件只保留移动核心功能.
 * 
 * v3.1         追加新指令          2020/08/19
 * 
 * 追加新的插件指令:
 * >启用强制奔跑
 * >playerforcedashingon
 * >禁用强制奔跑
 * >playerforcedashingoff
 * 
 * v3.2         追加新指令          2020/09/08
 * >全局禁用开启
 * >全局禁用关闭
 * 
 * 由于是用于测试功能的指令,故不写入插件帮助中了.
 * 用于关闭插件功能和开启插件功能.
 * 
 * ==================================================
 * 
 * @param TestMode
 * @text 开启调试模式
 * @type boolean
 * @on true
 * @off false
 * @default false
 * @desc 调试模式将显示碰撞体积框,事件触发范围等.
 * 
 * @param BoxColor
 * @text 碰撞体积填充颜色
 * @parent TestMode
 * @type string
 * @desc 碰撞框颜色,使用rgba格式.
 * @default rgba(30, 180, 170, 0.4)
 *  
 * @param FollowsSpacing
 * @text 跟随间距
 * @type string
 * @desc 跟随角色的相互间隔,可以是小数.默认0.5
 * 当未开启超级移动时,间隔会无视小数取整.
 * @default 0.5
 * 
 * @param EventStartedPlayerAdjust
 * @text 玩家坐标校正
 * @type boolean
 * @on true
 * @off false
 * @default false
 * @desc 事件触发后是否对玩家位置进行校正.
 * 
 * @param AdjustingRun
 * @text 校正时是否奔跑
 * @type boolean
 * @on true
 * @off false
 * @default false
 * @desc 玩家位置校正时是否奔跑.
 * 
 * @param ImageCacheLimit
 * @text 图片缓存
 * @type number
 * @desc 图片缓存大小,单位是MB.
 * @default 256
 * 
 * @param WalkOrRunShortCutKey
 * @text 奔跑切换快捷键
 * @type number
 * @desc 快速切换行走与奔跑状态,默认快捷键为'/',
 * 就是那个问号,请使用键盘代码.
 * @default 191
 * 
 * @param TakeOff
 * @text 停用插件功能
 * @type boolean
 * @on true
 * @off false
 * @default false
 * @desc 禁用本插件所有功能.
 * 
 * @param DoNotResetEventCoreSetting
 * @text 事件翻页不重置关键设定
 * @type boolean
 * @on true
 * @off false
 * @default false
 * @desc 当事件翻页时,不恢复关键设置为默认,包括碰撞体积,锚点和位置矫正.
 * 
 */

//==================================================
//
//      临时全局变量    ZPM.xxx
//		临时局部变量	this._ZPM_xxx
//		存储数据变量	无
//		全局存储变量	ZPM.SuperMove_EventIntervalTimeForAllEvent
//                      ZPM.SuperMove_Movedir8
//                      ZPM.SuperMove_ForceNormalMove
//                      ZPM.SuperMove_EventIntervalOnOffForAllEvent
//		覆盖重写方法	44个 带@override标签
//
//==================================================

//==================================================
//**    SAT碰撞测试    **
//**    881 - 1921    **
//==================================================

// Version 0.8.0 - Copyright 2012 - 2018 -  Jim Riecken <jimr@jimr.ca>
//
// Released under the MIT License - https://github.com/jriecken/sat-js
//
// A simple library for determining intersections of circles and
// polygons using the Separating Axis Theorem.
/** @preserve SAT.js - Version 0.8.0 - Copyright 2012 - 2018 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */

/*global define: false, module: false*/
/*jshint shadow:true, sub:true, forin:true, noarg:true, noempty:true,
  eqeqeq:true, bitwise:true, strict:true, undef:true,
  curly:true, browser:true */

// Create a UMD wrapper for SAT. Works in:
//
//  - Plain browser via global SAT variable
//  - AMD loader (like require.js)
//  - Node.js
//
// The quoted properties all over the place are used so that the Closure Compiler
// does not mangle the exposed API in advanced mode.
/**
 * @param {*} root - The global scope
 * @param {Function} factory - Factory that creates SAT module
 */
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define['amd']) {
        define(factory);
    } else if (typeof exports === 'object') {
        module['exports'] = factory();
    } else {
        root['SAT'] = factory();
    }
}(this, function () {
    "use strict";

    var SAT = {};

    //
    // ## Vector
    //
    // Represents a vector in two dimensions with `x` and `y` properties.


    // Create a new Vector, optionally passing in the `x` and `y` coordinates. If
    // a coordinate is not specified, it will be set to `0`
    /**
     * @param {?number=} x The x position.
     * @param {?number=} y The y position.
     * @constructor
     */
    function Vector(x, y) {
        this['x'] = x || 0;
        this['y'] = y || 0;
    }
    SAT['Vector'] = Vector;
    // Alias `Vector` as `V`
    SAT['V'] = Vector;


    // Copy the values of another Vector into this one.
    /**
     * @param {Vector} other The other Vector.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['copy'] = Vector.prototype.copy = function (other) {
        this['x'] = other['x'];
        this['y'] = other['y'];
        return this;
    };

    // Create a new vector with the same coordinates as this on.
    /**
     * @return {Vector} The new cloned vector
     */
    Vector.prototype['clone'] = Vector.prototype.clone = function () {
        return new Vector(this['x'], this['y']);
    };

    // Change this vector to be perpendicular to what it was before. (Effectively
    // roatates it 90 degrees in a clockwise direction)
    /**
     * @return {Vector} This for chaining.
     */
    Vector.prototype['perp'] = Vector.prototype.perp = function () {
        var x = this['x'];
        this['x'] = this['y'];
        this['y'] = -x;
        return this;
    };

    // Rotate this vector (counter-clockwise) by the specified angle (in radians).
    /**
     * @param {!Number} angle The angle to rotate (in radians)
     * @return {Vector} This for chaining.
     */
    Vector.prototype['rotate'] = Vector.prototype.rotate = function (angle) {
        var x = this['x'];
        var y = this['y'];
        this['x'] = x * Math.cos(angle) - y * Math.sin(angle);
        this['y'] = x * Math.sin(angle) + y * Math.cos(angle);
        return this;
    };

    // Reverse this vector.
    /**
     * @return {Vector} This for chaining.
     */
    Vector.prototype['reverse'] = Vector.prototype.reverse = function () {
        this['x'] = -this['x'];
        this['y'] = -this['y'];
        return this;
    };


    // Normalize this vector.  (make it have length of `1`)
    /**
     * @return {Vector} This for chaining.
     */
    Vector.prototype['normalize'] = Vector.prototype.normalize = function () {
        var d = this.len();
        if (d > 0) {
            this['x'] = this['x'] / d;
            this['y'] = this['y'] / d;
        }
        return this;
    };

    // Add another vector to this one.
    /**
     * @param {Vector} other The other Vector.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['add'] = Vector.prototype.add = function (other) {
        this['x'] += other['x'];
        this['y'] += other['y'];
        return this;
    };

    // Subtract another vector from this one.
    /**
     * @param {Vector} other The other Vector.
     * @return {Vector} This for chaiing.
     */
    Vector.prototype['sub'] = Vector.prototype.sub = function (other) {
        this['x'] -= other['x'];
        this['y'] -= other['y'];
        return this;
    };

    // Scale this vector. An independent scaling factor can be provided
    // for each axis, or a single scaling factor that will scale both `x` and `y`.
    /**
     * @param {!Number} x The scaling factor in the x direction.
     * @param {?number=} y The scaling factor in the y direction.  If this
     *   is not specified, the x scaling factor will be used.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['scale'] = Vector.prototype.scale = function (x, y) {
        this['x'] *= x;
        this['y'] *= typeof y != 'undefined' ? y : x;
        return this;
    };

    // Project this vector on to another vector.
    /**
     * @param {Vector} other The vector to project onto.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['project'] = Vector.prototype.project = function (other) {
        var amt = this.dot(other) / other.len2();
        this['x'] = amt * other['x'];
        this['y'] = amt * other['y'];
        return this;
    };

    // Project this vector onto a vector of unit length. This is slightly more efficient
    // than `project` when dealing with unit vectors.
    /**
     * @param {Vector} other The unit vector to project onto.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['projectN'] = Vector.prototype.projectN = function (other) {
        var amt = this.dot(other);
        this['x'] = amt * other['x'];
        this['y'] = amt * other['y'];
        return this;
    };

    // Reflect this vector on an arbitrary axis.
    /**
     * @param {Vector} axis The vector representing the axis.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['reflect'] = Vector.prototype.reflect = function (axis) {
        var x = this['x'];
        var y = this['y'];
        this.project(axis).scale(2);
        this['x'] -= x;
        this['y'] -= y;
        return this;
    };

    // Reflect this vector on an arbitrary axis (represented by a unit vector). This is
    // slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
    /**
     * @param {Vector} axis The unit vector representing the axis.
     * @return {Vector} This for chaining.
     */
    Vector.prototype['reflectN'] = Vector.prototype.reflectN = function (axis) {
        var x = this['x'];
        var y = this['y'];
        this.projectN(axis).scale(2);
        this['x'] -= x;
        this['y'] -= y;
        return this;
    };

    // Get the dot product of this vector and another.
    /**
     * @param {Vector}  other The vector to dot this one against.
     * @return {!Number} The dot product.
     */
    Vector.prototype['dot'] = Vector.prototype.dot = function (other) {
        return this['x'] * other['x'] + this['y'] * other['y'];
    };

    // Get the squared length of this vector.
    /**
     * @return {!Number} The length^2 of this vector.
     */
    Vector.prototype['len2'] = Vector.prototype.len2 = function () {
        return this.dot(this);
    };

    // Get the length of this vector.
    /**
     * @return {!Number} The length of this vector.
     */
    Vector.prototype['len'] = Vector.prototype.len = function () {
        return Math.sqrt(this.len2());
    };

    // ## Circle
    //
    // Represents a circle with a position and a radius.

    // Create a new circle, optionally passing in a position and/or radius. If no position
    // is given, the circle will be at `(0,0)`. If no radius is provided, the circle will
    // have a radius of `0`.
    /**
     * @param {Vector=} pos A vector representing the position of the center of the circle
     * @param {?number=} r The radius of the circle
     * @constructor
     */
    function Circle(pos, r) {
        this['pos'] = pos || new Vector();
        this['r'] = r || 0;
        this['offset'] = new Vector();
    }
    SAT['Circle'] = Circle;

    // Compute the axis-aligned bounding box (AABB) of this Circle.
    //
    // Note: Returns a _new_ `Polygon` each time you call this.
    /**
     * @return {Polygon} The AABB
     */
    Circle.prototype['getAABB'] = Circle.prototype.getAABB = function () {
        var r = this['r'];
        var corner = this['pos'].clone().add(this['offset']).sub(new Vector(r, r));
        return new Box(corner, r * 2, r * 2).toPolygon();
    };

    // Set the current offset to apply to the radius.
    /**
     * @param {Vector} offset The new offset vector.
     * @return {Circle} This for chaining.
     */
    Circle.prototype['setOffset'] = Circle.prototype.setOffset = function (offset) {
        this['offset'] = offset;
        return this;
    };

    // ## Polygon
    //
    // Represents a *convex* polygon with any number of points (specified in counter-clockwise order)
    //
    // Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the
    // provided setters. Otherwise the calculated properties will not be updated correctly.
    //
    // `pos` can be changed directly.

    // Create a new polygon, passing in a position vector, and an array of points (represented
    // by vectors relative to the position vector). If no position is passed in, the position
    // of the polygon will be `(0,0)`.
    /**
     * @param {Vector=} pos A vector representing the origin of the polygon. (all other
     *   points are relative to this one)
     * @param {Array<Vector>=} points An array of vectors representing the points in the polygon,
     *   in counter-clockwise order.
     * @constructor
     */
    function Polygon(pos, points) {
        this['pos'] = pos || new Vector();
        this['angle'] = 0;
        this['offset'] = new Vector();
        this.setPoints(points || []);
    }
    SAT['Polygon'] = Polygon;

    // Set the points of the polygon. Any consecutive duplicate points will be combined.
    //
    // Note: The points are counter-clockwise *with respect to the coordinate system*.
    // If you directly draw the points on a screen that has the origin at the top-left corner
    // it will _appear_ visually that the points are being specified clockwise. This is just
    // because of the inversion of the Y-axis when being displayed.
    /**
     * @param {Array<Vector>=} points An array of vectors representing the points in the polygon,
     *   in counter-clockwise order.
     * @return {Polygon} This for chaining.
     */
    Polygon.prototype['setPoints'] = Polygon.prototype.setPoints = function (points) {
        // Only re-allocate if this is a new polygon or the number of points has changed.
        var lengthChanged = !this['points'] || this['points'].length !== points.length;
        if (lengthChanged) {
            var i;
            var calcPoints = this['calcPoints'] = [];
            var edges = this['edges'] = [];
            var normals = this['normals'] = [];
            // Allocate the vector arrays for the calculated properties
            for (i = 0; i < points.length; i++) {
                // Remove consecutive duplicate points
                var p1 = points[i];
                var p2 = i < points.length - 1 ? points[i + 1] : points[0];
                if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {
                    points.splice(i, 1);
                    i -= 1;
                    continue;
                }
                calcPoints.push(new Vector());
                edges.push(new Vector());
                normals.push(new Vector());
            }
        }
        this['points'] = points;
        this._recalc();
        return this;
    };

    // Set the current rotation angle of the polygon.
    /**
     * @param {!Number} angle The current rotation angle (in radians).
     * @return {Polygon} This for chaining.
     */
    Polygon.prototype['setAngle'] = Polygon.prototype.setAngle = function (angle) {
        this['angle'] = angle;
        this._recalc();
        return this;
    };

    // Set the current offset to apply to the `points` before applying the `angle` rotation.
    /**
     * @param {Vector} offset The new offset vector.
     * @return {Polygon} This for chaining.
     */
    Polygon.prototype['setOffset'] = Polygon.prototype.setOffset = function (offset) {
        this['offset'] = offset;
        this._recalc();
        return this;
    };

    // Rotates this polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `pos`).
    //
    // Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
    /**
     * @param {!Number} angle The angle to rotate (in radians)
     * @return {Polygon} This for chaining.
     */
    Polygon.prototype['rotate'] = Polygon.prototype.rotate = function (angle) {
        var points = this['points'];
        var len = points.length;
        for (var i = 0; i < len; i++) {
            points[i].rotate(angle);
        }
        this._recalc();
        return this;
    };

    // Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate
    // system* (i.e. `pos`).
    //
    // This is most useful to change the "center point" of a polygon. If you just want to move the whole polygon, change
    // the coordinates of `pos`.
    //
    // Note: This changes the **original** points (so any `offset` will be applied on top of this translation)
    /**
     * @param {!Number} x The horizontal amount to translate.
     * @param {!Number} y The vertical amount to translate.
     * @return {Polygon} This for chaining.
     */
    Polygon.prototype['translate'] = Polygon.prototype.translate = function (x, y) {
        var points = this['points'];
        var len = points.length;
        for (var i = 0; i < len; i++) {
            points[i]["x"] += x;
            points[i]["y"] += y;
        }
        this._recalc();
        return this;
    };


    // Computes the calculated collision polygon. Applies the `angle` and `offset` to the original points then recalculates the
    // edges and normals of the collision polygon.
    /**
     * @return {Polygon} This for chaining.
     */
    Polygon.prototype._recalc = function () {
        // Calculated points - this is what is used for underlying collisions and takes into account
        // the angle/offset set on the polygon.
        var calcPoints = this['calcPoints'];
        // The edges here are the direction of the `n`th edge of the polygon, relative to
        // the `n`th point. If you want to draw a given edge from the edge value, you must
        // first translate to the position of the starting point.
        var edges = this['edges'];
        // The normals here are the direction of the normal for the `n`th edge of the polygon, relative
        // to the position of the `n`th point. If you want to draw an edge normal, you must first
        // translate to the position of the starting point.
        var normals = this['normals'];
        // Copy the original points array and apply the offset/angle
        var points = this['points'];
        var offset = this['offset'];
        var angle = this['angle'];
        var len = points.length;
        var i;
        for (i = 0; i < len; i++) {
            var calcPoint = calcPoints[i].copy(points[i]);
            calcPoint["x"] += offset["x"];
            calcPoint["y"] += offset["y"];
            if (angle !== 0) {
                calcPoint.rotate(angle);
            }
        }
        // Calculate the edges/normals
        for (i = 0; i < len; i++) {
            var p1 = calcPoints[i];
            var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
            var e = edges[i].copy(p2).sub(p1);
            normals[i].copy(e).perp().normalize();
        }
        return this;
    };


    // Compute the axis-aligned bounding box. Any current state
    // (translations/rotations) will be applied before constructing the AABB.
    //
    // Note: Returns a _new_ `Polygon` each time you call this.
    /**
     * @return {Polygon} The AABB
     */
    Polygon.prototype["getAABB"] = Polygon.prototype.getAABB = function () {
        var points = this["calcPoints"];
        var len = points.length;
        var xMin = points[0]["x"];
        var yMin = points[0]["y"];
        var xMax = points[0]["x"];
        var yMax = points[0]["y"];
        for (var i = 1; i < len; i++) {
            var point = points[i];
            if (point["x"] < xMin) {
                xMin = point["x"];
            }
            else if (point["x"] > xMax) {
                xMax = point["x"];
            }
            if (point["y"] < yMin) {
                yMin = point["y"];
            }
            else if (point["y"] > yMax) {
                yMax = point["y"];
            }
        }
        return new Box(this['pos'].clone().add(new Vector(xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
    };

    // Compute the centroid (geometric center) of the polygon. Any current state
    // (translations/rotations) will be applied before computing the centroid.
    //
    // See https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon
    //
    // Note: Returns a _new_ `Vector` each time you call this.
    /**
     * @return {Vector} A Vector that contains the coordinates of the Centroid.
     */
    Polygon.prototype["getCentroid"] = Polygon.prototype.getCentroid = function () {
        var points = this["calcPoints"];
        var len = points.length;
        var cx = 0;
        var cy = 0;
        var ar = 0;
        for (var i = 0; i < len; i++) {
            var p1 = points[i];
            var p2 = i === len - 1 ? points[0] : points[i + 1]; // Loop around if last point
            var a = p1["x"] * p2["y"] - p2["x"] * p1["y"];
            cx += (p1["x"] + p2["x"]) * a;
            cy += (p1["y"] + p2["y"]) * a;
            ar += a;
        }
        ar = ar * 3; // we want 1 / 6 the area and we currently have 2*area
        cx = cx / ar;
        cy = cy / ar;
        return new Vector(cx, cy);
    };


    // ## Box
    //
    // Represents an axis-aligned box, with a width and height.


    // Create a new box, with the specified position, width, and height. If no position
    // is given, the position will be `(0,0)`. If no width or height are given, they will
    // be set to `0`.
    /**
     * @param {Vector=} pos A vector representing the bottom-left of the box (i.e. the smallest x and smallest y value).
     * @param {?number=} w The width of the box.
     * @param {?number=} h The height of the box.
     * @constructor
     */
    function Box(pos, w, h) {
        this['pos'] = pos || new Vector();
        this['w'] = w || 0;
        this['h'] = h || 0;
    }
    SAT['Box'] = Box;

    // Returns a polygon whose edges are the same as this box.
    /**
     * @return {Polygon} A new Polygon that represents this box.
     */
    Box.prototype['toPolygon'] = Box.prototype.toPolygon = function () {
        var pos = this['pos'];
        var w = this['w'];
        var h = this['h'];
        return new Polygon(new Vector(pos['x'], pos['y']), [
            new Vector(), new Vector(w, 0),
            new Vector(w, h), new Vector(0, h)
        ]);
    };

    // ## Response
    //
    // An object representing the result of an intersection. Contains:
    //  - The two objects participating in the intersection
    //  - The vector representing the minimum change necessary to extract the first object
    //    from the second one (as well as a unit vector in that direction and the magnitude
    //    of the overlap)
    //  - Whether the first object is entirely inside the second, and vice versa.
    /**
     * @constructor
     */
    function Response() {
        this['a'] = null;
        this['b'] = null;
        this['overlapN'] = new Vector();
        this['overlapV'] = new Vector();
        this.clear();
    }
    SAT['Response'] = Response;

    // Set some values of the response back to their defaults.  Call this between tests if
    // you are going to reuse a single Response object for multiple intersection tests (recommented
    // as it will avoid allcating extra memory)
    /**
     * @return {Response} This for chaining
     */
    Response.prototype['clear'] = Response.prototype.clear = function () {
        this['aInB'] = true;
        this['bInA'] = true;
        this['overlap'] = Number.MAX_VALUE;
        return this;
    };

    // ## Object Pools

    // A pool of `Vector` objects that are used in calculations to avoid
    // allocating memory.
    /**
     * @type {Array<Vector>}
     */
    var T_VECTORS = [];
    for (var i = 0; i < 10; i++) { T_VECTORS.push(new Vector()); }

    // A pool of arrays of numbers used in calculations to avoid allocating
    // memory.
    /**
     * @type {Array<Array<number>>}
     */
    var T_ARRAYS = [];
    for (var i = 0; i < 5; i++) { T_ARRAYS.push([]); }

    // Temporary response used for polygon hit detection.
    /**
     * @type {Response}
     */
    var T_RESPONSE = new Response();

    // Tiny "point" polygon used for polygon hit detection.
    /**
     * @type {Polygon}
     */
    var TEST_POINT = new Box(new Vector(), 0.000001, 0.000001).toPolygon();

    // ## Helper Functions

    // Flattens the specified array of points onto a unit vector axis,
    // resulting in a one dimensional range of the minimum and
    // maximum value on that axis.
    /**
     * @param {Array<Vector>} points The points to flatten.
     * @param {Vector} normal The unit vector axis to flatten on.
     * @param {Array<number>} result An array.  After calling this function,
     *   result[0] will be the minimum value,
     *   result[1] will be the maximum value.
     */
    function flattenPointsOn(points, normal, result) {
        var min = Number.MAX_VALUE;
        var max = -Number.MAX_VALUE;
        var len = points.length;
        for (var i = 0; i < len; i++) {
            // The magnitude of the projection of the point onto the normal
            var dot = points[i].dot(normal);
            if (dot < min) { min = dot; }
            if (dot > max) { max = dot; }
        }
        result[0] = min; result[1] = max;
    }

    // Check whether two convex polygons are separated by the specified
    // axis (must be a unit vector).
    /**
     * @param {Vector} aPos The position of the first polygon.
     * @param {Vector} bPos The position of the second polygon.
     * @param {Array<Vector>} aPoints The points in the first polygon.
     * @param {Array<Vector>} bPoints The points in the second polygon.
     * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons
     *   will be projected onto this axis.
     * @param {Response=} response A Response object (optional) which will be populated
     *   if the axis is not a separating axis.
     * @return {Boolean} true if it is a separating axis, false otherwise.  If false,
     *   and a response is passed in, information about how much overlap and
     *   the direction of the overlap will be populated.
     */
    function isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {
        var rangeA = T_ARRAYS.pop();
        var rangeB = T_ARRAYS.pop();
        // The magnitude of the offset between the two polygons
        var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
        var projectedOffset = offsetV.dot(axis);
        // Project the polygons onto the axis.
        flattenPointsOn(aPoints, axis, rangeA);
        flattenPointsOn(bPoints, axis, rangeB);
        // Move B's range to its position relative to A.
        rangeB[0] += projectedOffset;
        rangeB[1] += projectedOffset;
        // Check if there is a gap. If there is, this is a separating axis and we can stop
        if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
            T_VECTORS.push(offsetV);
            T_ARRAYS.push(rangeA);
            T_ARRAYS.push(rangeB);
            return true;
        }
        // This is not a separating axis. If we're calculating a response, calculate the overlap.
        if (response) {
            var overlap = 0;
            // A starts further left than B
            if (rangeA[0] < rangeB[0]) {
                response['aInB'] = false;
                // A ends before B does. We have to pull A out of B
                if (rangeA[1] < rangeB[1]) {
                    overlap = rangeA[1] - rangeB[0];
                    response['bInA'] = false;
                    // B is fully inside A.  Pick the shortest way out.
                } else {
                    var option1 = rangeA[1] - rangeB[0];
                    var option2 = rangeB[1] - rangeA[0];
                    overlap = option1 < option2 ? option1 : -option2;
                }
                // B starts further left than A
            } else {
                response['bInA'] = false;
                // B ends before A ends. We have to push A out of B
                if (rangeA[1] > rangeB[1]) {
                    overlap = rangeA[0] - rangeB[1];
                    response['aInB'] = false;
                    // A is fully inside B.  Pick the shortest way out.
                } else {
                    var option1 = rangeA[1] - rangeB[0];
                    var option2 = rangeB[1] - rangeA[0];
                    overlap = option1 < option2 ? option1 : -option2;
                }
            }
            // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
            var absOverlap = Math.abs(overlap);
            if (absOverlap < response['overlap']) {
                response['overlap'] = absOverlap;
                response['overlapN'].copy(axis);
                if (overlap < 0) {
                    response['overlapN'].reverse();
                }
            }
        }
        T_VECTORS.push(offsetV);
        T_ARRAYS.push(rangeA);
        T_ARRAYS.push(rangeB);
        return false;
    }
    SAT['isSeparatingAxis'] = isSeparatingAxis;

    // Calculates which Voronoi region a point is on a line segment.
    // It is assumed that both the line and the point are relative to `(0,0)`
    //
    //            |       (0)      |
    //     (-1)  [S]--------------[E]  (1)
    //            |       (0)      |
    /**
     * @param {Vector} line The line segment.
     * @param {Vector} point The point.
     * @return  {!Number} LEFT_VORONOI_REGION (-1) if it is the left region,
     *          MIDDLE_VORONOI_REGION (0) if it is the middle region,
     *          RIGHT_VORONOI_REGION (1) if it is the right region.
     */
    function voronoiRegion(line, point) {
        var len2 = line.len2();
        var dp = point.dot(line);
        // If the point is beyond the start of the line, it is in the
        // left voronoi region.
        if (dp < 0) { return LEFT_VORONOI_REGION; }
        // If the point is beyond the end of the line, it is in the
        // right voronoi region.
        else if (dp > len2) { return RIGHT_VORONOI_REGION; }
        // Otherwise, it's in the middle one.
        else { return MIDDLE_VORONOI_REGION; }
    }
    // Constants for Voronoi regions
    /**
     * @const
     */
    var LEFT_VORONOI_REGION = -1;
    /**
     * @const
     */
    var MIDDLE_VORONOI_REGION = 0;
    /**
     * @const
     */
    var RIGHT_VORONOI_REGION = 1;

    // ## Collision Tests

    // Check if a point is inside a circle.
    /**
     * @param {Vector} p The point to test.
     * @param {Circle} c The circle to test.
     * @return {Boolean} true if the point is inside the circle, false if it is not.
     */
    function pointInCircle(p, c) {
        var differenceV = T_VECTORS.pop().copy(p).sub(c['pos']).sub(c['offset']);
        var radiusSq = c['r'] * c['r'];
        var distanceSq = differenceV.len2();
        T_VECTORS.push(differenceV);
        // If the distance between is smaller than the radius then the point is inside the circle.
        return distanceSq <= radiusSq;
    }
    SAT['pointInCircle'] = pointInCircle;

    // Check if a point is inside a convex polygon.
    /**
     * @param {Vector} p The point to test.
     * @param {Polygon} poly The polygon to test.
     * @return {Boolean} true if the point is inside the polygon, false if it is not.
     */
    function pointInPolygon(p, poly) {
        TEST_POINT['pos'].copy(p);
        T_RESPONSE.clear();
        var result = testPolygonPolygon(TEST_POINT, poly, T_RESPONSE);
        if (result) {
            result = T_RESPONSE['aInB'];
        }
        return result;
    }
    SAT['pointInPolygon'] = pointInPolygon;

    // Check if two circles collide.
    /**
     * @param {Circle} a The first circle.
     * @param {Circle} b The second circle.
     * @param {Response=} response Response object (optional) that will be populated if
     *   the circles intersect.
     * @return {Boolean} true if the circles intersect, false if they don't.
     */
    function testCircleCircle(a, b, response) {
        // Check if the distance between the centers of the two
        // circles is greater than their combined radius.
        var differenceV = T_VECTORS.pop().copy(b['pos']).add(b['offset']).sub(a['pos']).sub(a['offset']);
        var totalRadius = a['r'] + b['r'];
        var totalRadiusSq = totalRadius * totalRadius;
        var distanceSq = differenceV.len2();
        // If the distance is bigger than the combined radius, they don't intersect.
        if (distanceSq > totalRadiusSq) {
            T_VECTORS.push(differenceV);
            return false;
        }
        // They intersect.  If we're calculating a response, calculate the overlap.
        if (response) {
            var dist = Math.sqrt(distanceSq);
            response['a'] = a;
            response['b'] = b;
            response['overlap'] = totalRadius - dist;
            response['overlapN'].copy(differenceV.normalize());
            response['overlapV'].copy(differenceV).scale(response['overlap']);
            response['aInB'] = a['r'] <= b['r'] && dist <= b['r'] - a['r'];
            response['bInA'] = b['r'] <= a['r'] && dist <= a['r'] - b['r'];
        }
        T_VECTORS.push(differenceV);
        return true;
    }
    SAT['testCircleCircle'] = testCircleCircle;

    // Check if a polygon and a circle collide.
    /**
     * @param {Polygon} polygon The polygon.
     * @param {Circle} circle The circle.
     * @param {Response=} response Response object (optional) that will be populated if
     *   they interset.
     * @return {Boolean} true if they intersect, false if they don't.
     */
    function testPolygonCircle(polygon, circle, response) {
        // Get the position of the circle relative to the polygon.
        var circlePos = T_VECTORS.pop().copy(circle['pos']).add(circle['offset']).sub(polygon['pos']);
        var radius = circle['r'];
        var radius2 = radius * radius;
        var points = polygon['calcPoints'];
        var len = points.length;
        var edge = T_VECTORS.pop();
        var point = T_VECTORS.pop();

        // For each edge in the polygon:
        for (var i = 0; i < len; i++) {
            var next = i === len - 1 ? 0 : i + 1;
            var prev = i === 0 ? len - 1 : i - 1;
            var overlap = 0;
            var overlapN = null;

            // Get the edge.
            edge.copy(polygon['edges'][i]);
            // Calculate the center of the circle relative to the starting point of the edge.
            point.copy(circlePos).sub(points[i]);

            // If the distance between the center of the circle and the point
            // is bigger than the radius, the polygon is definitely not fully in
            // the circle.
            if (response && point.len2() > radius2) {
                response['aInB'] = false;
            }

            // Calculate which Voronoi region the center of the circle is in.
            var region = voronoiRegion(edge, point);
            // If it's the left region:
            if (region === LEFT_VORONOI_REGION) {
                // We need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
                edge.copy(polygon['edges'][prev]);
                // Calculate the center of the circle relative the starting point of the previous edge
                var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
                region = voronoiRegion(edge, point2);
                if (region === RIGHT_VORONOI_REGION) {
                    // It's in the region we want.  Check if the circle intersects the point.
                    var dist = point.len();
                    if (dist > radius) {
                        // No intersection
                        T_VECTORS.push(circlePos);
                        T_VECTORS.push(edge);
                        T_VECTORS.push(point);
                        T_VECTORS.push(point2);
                        return false;
                    } else if (response) {
                        // It intersects, calculate the overlap.
                        response['bInA'] = false;
                        overlapN = point.normalize();
                        overlap = radius - dist;
                    }
                }
                T_VECTORS.push(point2);
                // If it's the right region:
            } else if (region === RIGHT_VORONOI_REGION) {
                // We need to make sure we're in the left region on the next edge
                edge.copy(polygon['edges'][next]);
                // Calculate the center of the circle relative to the starting point of the next edge.
                point.copy(circlePos).sub(points[next]);
                region = voronoiRegion(edge, point);
                if (region === LEFT_VORONOI_REGION) {
                    // It's in the region we want.  Check if the circle intersects the point.
                    var dist = point.len();
                    if (dist > radius) {
                        // No intersection
                        T_VECTORS.push(circlePos);
                        T_VECTORS.push(edge);
                        T_VECTORS.push(point);
                        return false;
                    } else if (response) {
                        // It intersects, calculate the overlap.
                        response['bInA'] = false;
                        overlapN = point.normalize();
                        overlap = radius - dist;
                    }
                }
                // Otherwise, it's the middle region:
            } else {
                // Need to check if the circle is intersecting the edge,
                // Change the edge into its "edge normal".
                var normal = edge.perp().normalize();
                // Find the perpendicular distance between the center of the
                // circle and the edge.
                var dist = point.dot(normal);
                var distAbs = Math.abs(dist);
                // If the circle is on the outside of the edge, there is no intersection.
                if (dist > 0 && distAbs > radius) {
                    // No intersection
                    T_VECTORS.push(circlePos);
                    T_VECTORS.push(normal);
                    T_VECTORS.push(point);
                    return false;
                } else if (response) {
                    // It intersects, calculate the overlap.
                    overlapN = normal;
                    overlap = radius - dist;
                    // If the center of the circle is on the outside of the edge, or part of the
                    // circle is on the outside, the circle is not fully inside the polygon.
                    if (dist >= 0 || overlap < 2 * radius) {
                        response['bInA'] = false;
                    }
                }
            }

            // If this is the smallest overlap we've seen, keep it.
            // (overlapN may be null if the circle was in the wrong Voronoi region).
            if (overlapN && response && Math.abs(overlap) < Math.abs(response['overlap'])) {
                response['overlap'] = overlap;
                response['overlapN'].copy(overlapN);
            }
        }

        // Calculate the final overlap vector - based on the smallest overlap.
        if (response) {
            response['a'] = polygon;
            response['b'] = circle;
            response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
        }
        T_VECTORS.push(circlePos);
        T_VECTORS.push(edge);
        T_VECTORS.push(point);
        return true;
    }
    SAT['testPolygonCircle'] = testPolygonCircle;

    // Check if a circle and a polygon collide.
    //
    // **NOTE:** This is slightly less efficient than polygonCircle as it just
    // runs polygonCircle and reverses everything at the end.
    /**
     * @param {Circle} circle The circle.
     * @param {Polygon} polygon The polygon.
     * @param {Response=} response Response object (optional) that will be populated if
     *   they interset.
     * @return {Boolean} true if they intersect, false if they don't.
     */
    function testCirclePolygon(circle, polygon, response) {
        // Test the polygon against the circle.
        var result = testPolygonCircle(polygon, circle, response);
        if (result && response) {
            // Swap A and B in the response.
            var a = response['a'];
            var aInB = response['aInB'];
            response['overlapN'].reverse();
            response['overlapV'].reverse();
            response['a'] = response['b'];
            response['b'] = a;
            response['aInB'] = response['bInA'];
            response['bInA'] = aInB;
        }
        return result;
    }
    SAT['testCirclePolygon'] = testCirclePolygon;

    // Checks whether polygons collide.
    /**
     * @param {Polygon} a The first polygon.
     * @param {Polygon} b The second polygon.
     * @param {Response=} response Response object (optional) that will be populated if
     *   they interset.
     * @return {Boolean} true if they intersect, false if they don't.
     */
    function testPolygonPolygon(a, b, response) {
        var aPoints = a['calcPoints'];
        var aLen = aPoints.length;
        var bPoints = b['calcPoints'];
        var bLen = bPoints.length;
        // If any of the edge normals of A is a separating axis, no intersection.
        for (var i = 0; i < aLen; i++) {
            if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, a['normals'][i], response)) {
                return false;
            }
        }
        // If any of the edge normals of B is a separating axis, no intersection.
        for (var i = 0; i < bLen; i++) {
            if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, b['normals'][i], response)) {
                return false;
            }
        }
        // Since none of the edge normals of A or B are a separating axis, there is an intersection
        // and we've already calculated the smallest overlap (in isSeparatingAxis).  Calculate the
        // final overlap vector.
        if (response) {
            response['a'] = a;
            response['b'] = b;
            response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
        }
        return true;
    }
    SAT['testPolygonPolygon'] = testPolygonPolygon;

    return SAT;
}));


//==================================================
//**    参数获取    **
//==================================================

var Imported = Imported || {};
Imported.ZPM_SuperMove = true;
var ZPM = ZPM || {};
ZPM.parameters = PluginManager.parameters('ZPM_SuperMove');
ZPM.SuperMove_TestMode = String(ZPM.parameters['TestMode'] || 'false') === 'true';
ZPM.SuperMove_BoxColor = String(ZPM.parameters['BoxColor'] || 'rgba(30, 180, 170, 0.4)');
ZPM.SuperMove_FollowsSpacing = Number(ZPM.parameters['FollowsSpacing'] || 0.5);
ZPM.SuperMove_FollowsSpacing -= (ZPM.SuperMove_FollowsSpacing % 0.5);
ZPM.SuperMove_EventStartedPlayerPosAdjust = String(ZPM.parameters['EventStartedPlayerAdjust'] || 'false') === 'true';
ZPM.SuperMove_ImageCacheLimit = Number(ZPM.parameters['ImageCacheLimit'] || 256);
ZPM.SuperMove_AdjustingRun = String(ZPM.parameters['AdjustingRun'] || 'false') === 'true';
ZPM.SuperMove_WalkOrRunShortCutKey = Number(ZPM.parameters['WalkOrRunShortCutKey'] || 191);
ZPM.SuperMove_TakeOff = String(ZPM.parameters['TakeOff'] || 'false') === 'true';
ZPM.SuperMove_DoNotResetEventCoreSetting = String(ZPM.parameters['DoNotResetEventCoreSetting'] || 'false') === 'true';
ZPM.SuperMove_ForceDashing = false;
ImageCache.limit = ZPM.SuperMove_ImageCacheLimit * 1024 * 1024;

//==================================================
//**    定义快捷键    **
//==================================================

Input.keyMapper[ZPM.SuperMove_WalkOrRunShortCutKey] = 'WORShortCutKey';

//==================================================
//**    PIXI版本读取    **
//==================================================

ZPM.PIXIVERSION = ZPM.PIXIVERSION || PIXI.VERSION.split(/\./)[0];

//==================================================
//**    全局读取    **
//==================================================

var _ZPM_Global = DataManager.loadGlobalInfo();

if (!ZPM.SuperMove_EventIntervalTimeForAllEvent) {
    if (_ZPM_Global && _ZPM_Global[0] && _ZPM_Global[0]["_Global_SuperMove_EventIntervalTimeForAllEvent"]) {
        ZPM.SuperMove_EventIntervalTimeForAllEvent = _ZPM_Global[0]["_Global_SuperMove_EventIntervalTimeForAllEvent"];
    } else {
        ZPM.SuperMove_EventIntervalTimeForAllEvent = 30;
    };
};

if (!ZPM.SuperMove_Movedir8) {
    if (_ZPM_Global && _ZPM_Global[0] && _ZPM_Global[0]["_Global_SuperMove_Movedir8"]) {
        ZPM.SuperMove_Movedir8 = _ZPM_Global[0]["_Global_SuperMove_Movedir8"];
    } else {
        ZPM.SuperMove_Movedir8 = false;
    };
};

if (!ZPM.SuperMove_ForceNormalMove) {
    if (_ZPM_Global && _ZPM_Global[0] && _ZPM_Global[0]["_Global_SuperMove_ForceNormalMove"]) {
        ZPM.SuperMove_ForceNormalMove = _ZPM_Global[0]["_Global_SuperMove_ForceNormalMove"];
    } else {
        ZPM.SuperMove_ForceNormalMove = false;
    };
};

if (!ZPM.SuperMove_EventIntervalOnOffForAllEvent) {
    if (_ZPM_Global && _ZPM_Global[0] && _ZPM_Global[0]["_Global_SuperMove_EventIntervalOnOffForAllEvent"]) {
        ZPM.SuperMove_EventIntervalOnOffForAllEvent = _ZPM_Global[0]["_Global_SuperMove_EventIntervalOnOffForAllEvent"];
    } else {
        ZPM.SuperMove_EventIntervalOnOffForAllEvent = true;
    };
};

//==================================================
//**    全局存储    **
//==================================================

var _ZPM_SuperMove_saveGlobal = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function (info) {
    if (!info[0]) {
        info[0] = [];
    };
    info[0]["_Global_SuperMove_EventIntervalTimeForAllEvent"] = ZPM.SuperMove_EventIntervalTimeForAllEvent;
    info[0]["_Global_SuperMove_EventIntervalOnOffForAllEvent"] = ZPM.SuperMove_EventIntervalOnOffForAllEvent;
    info[0]["_Global_SuperMove_Movedir8"] = ZPM.SuperMove_Movedir8;
    info[0]["_Global_SuperMove_ForceNormalMove"] = ZPM.SuperMove_ForceNormalMove;
    _ZPM_SuperMove_saveGlobal.call(this, info);
};

DataManager.forceSaveGlobalInfo = function () {
    var globalInfo = this.loadGlobalInfo() || [];
    globalInfo[0] = this.makeSavefileInfo();
    this.saveGlobalInfo(globalInfo);
};

//==================================================
//**    插件指令    **
//==================================================

var _ZPM_SuperMove_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _ZPM_SuperMove_pluginCommand.call(this, command, args);
    if ((command.toLowerCase() === '>启用超级移动') || (command.toLowerCase() === '>supermoveon')) {
        $gamePlayer._ZPM_SuperMove = true;
        $gamePlayer._followers.visibleFollowers().forEach(function (follower) { follower._ZPM_SuperMove = true; });
    };
    if ((command.toLowerCase() === '>禁用超级移动') || (command.toLowerCase() === '>supermoveoff')) {
        $gamePlayer._ZPM_SuperMove = false;
        $gamePlayer._followers.visibleFollowers().forEach(function (follower) { follower._ZPM_SuperMove = false; });
    };
    if ((command.toLowerCase() === '>八方向移动') || (command.toLowerCase() === '>movedir8')) {
        ZPM.SuperMove_Movedir8 = true;
        DataManager.forceSaveGlobalInfo();
    };
    if ((command.toLowerCase() === '>四方向移动') || (command.toLowerCase() === '>movedir4')) {
        ZPM.SuperMove_Movedir8 = false;
        DataManager.forceSaveGlobalInfo();
    };
    if ((command.toLowerCase() === '>全局事件触发间隔') || (command.toLowerCase() === '>defaulteventintervaltime')) {
        var t = args[0] ? Math.abs(parseInt(args[0])) : 30;
        t = t >= 0 ? t : 30;
        ZPM.SuperMove_EventIntervalTimeForAllEvent = t;
        DataManager.forceSaveGlobalInfo();
    };
    if ((command.toLowerCase() === '>全局启用事件触发间隔') || (command.toLowerCase() === '>defaulteventintervalon')) {
        ZPM.SuperMove_EventIntervalOnOffForAllEvent = true;
        DataManager.forceSaveGlobalInfo();
    };
    if ((command.toLowerCase() === '>全局禁用事件触发间隔') || (command.toLowerCase() === '>defaulteventintervaloff')) {
        ZPM.SuperMove_EventIntervalOnOffForAllEvent = false;
        DataManager.forceSaveGlobalInfo();
    };
    if ((command.toLowerCase() === '>玩家移速') || (command.toLowerCase() === '>playermovespeed')) {
        var s = args[0] ? Math.abs(parseInt(args[0])) : 4;
        s = s > 0 ? s : 4;
        s = s <= 7 ? s : 7;
        $gamePlayer.setMoveSpeed(s);
        $gamePlayer._ZPM_movespeed = s;
    };
    if ((command.toLowerCase() === '>玩家跑速') || (command.toLowerCase() === '>playerrunspeed')) {
        var s = args[0] ? Math.abs(parseInt(args[0])) : 4;
        s = s > 0 ? s : 4;
        s = s <= 7 ? s : 7;
        $gamePlayer._ZPM_runspeed = s;
    };
    if ((command.toLowerCase() === '>角色碰撞体积') || (command.toLowerCase() === '>actorboxsize')) {
        var w = Math.abs(parseInt(args[0]));
        var h = Math.abs(parseInt(args[1]));
        w = w - w % 12;
        w = w < 12 ? 12 : w;
        h = h - h % 12;
        h = h < 12 ? 12 : h;
        $gamePlayer._ZPM_triggerboxwidth = w / 48;
        $gamePlayer._ZPM_triggerboxheight = h / 48;
        $gameParty.leader()._ZPM_triggerboxwidth = w / 48;
        $gameParty.leader()._ZPM_triggerboxheight = h / 48;
        $gamePlayer._ZPM_triggercenteranchorY = 1 - $gamePlayer._ZPM_triggerboxheight / 2;
    };
    if ((command.toLowerCase() === '>启用触摸传送') || (command.toLowerCase() === '>touchtransferon')) {
        $gamePlayer._ZPM_touchtransfer = true;
    };
    if ((command.toLowerCase() === '>禁用触摸传送') || (command.toLowerCase() === '>touchtransferoff')) {
        $gamePlayer._ZPM_touchtransfer = false;
    };
    if ((command.toLowerCase() === '>触摸传送计时') || (command.toLowerCase() === '>touchtransferclocks')) {
        var t = args[0] ? Math.abs(parseInt(args[0])) : 30;
        t = t > 0 ? s : 30;
        $gamePlayer._ZPM_touchtransferclocks = t;
    };
    if ((command.toLowerCase() === '>触摸传送动画') || (command.toLowerCase() === '>touchtransferanimationid')) {
        var startid = args[0] ? Math.abs(parseInt(args[0])) : 1;
        var endid = args[1] ? Math.abs(parseInt(args[1])) : 1;
        startid = startid > 0 ? startid : 1;
        endid = endid > 0 ? endid : 1;
        $gamePlayer._ZPM_touchtransferstartanimationid = startid;
        $gamePlayer._ZPM_touchtransferendanimationid = endid
    };
    if ((command.toLowerCase() === '>启用强制奔跑') || (command.toLowerCase() === '>playerforcedashingon')) {
        ZPM.SuperMove_ForceDashing = true;
    };
    if ((command.toLowerCase() === '>禁用强制奔跑') || (command.toLowerCase() === '>playerforcedashingoff')) {
        ZPM.SuperMove_ForceDashing = false;
    };
    if ((command.toLowerCase() === '>全局禁用开启')) {
        ZPM.SuperMove_TakeOff = true;
    };
    if ((command.toLowerCase() === '>全局禁用关闭')) {
        ZPM.SuperMove_TakeOff = false;
    };
};

//==================================================
//**    显示,移动,坐标,事件触发    **
//==================================================

Game_CharacterBase.prototype.realX = function () {
    return this._realX;
};

Game_CharacterBase.prototype.realY = function () {
    return this._realY;
};

Game_CharacterBase.prototype.targetX = function () {
    return this._x;
};

Game_CharacterBase.prototype.targetY = function () {
    return this._y;
};

Game_CharacterBase.prototype.triggerboxcenterrealX = function () {
    return $gameMap.roundX(this._realX + this._ZPM_triggercenteranchorX);
};

Game_CharacterBase.prototype.triggerboxcenterrealY = function () {
    return $gameMap.roundY(this._realY + this._ZPM_triggercenteranchorY);
};

Game_CharacterBase.prototype.triggerboxcentertargetX = function () {
    return $gameMap.roundX(this._x + this._ZPM_triggercenteranchorX);
};

Game_CharacterBase.prototype.triggerboxcentertargetY = function () {
    return $gameMap.roundY(this._y + this._ZPM_triggercenteranchorY);
};

Game_CharacterBase.prototype.triggerboxwidth = function () {
    return this._ZPM_triggerboxwidth;
};

Game_CharacterBase.prototype.triggerboxheight = function () {
    return this._ZPM_triggerboxheight;
};

Game_Event.prototype.note = function () {
    var text = this.event().note;
    var string = text.split(/[:| ：,.，。]/);
    return string;
};

var _ZPM_SuperMove_Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function () {
    _ZPM_SuperMove_Game_CharacterBase_initMembers.call(this);
    this._ZPM_directionchanged = false;                                         //方向改变标签
    this._ZPM_movespeed = 4;                                                    //备份的移动速度
    this._ZPM_runspeed = 5;                                                     //奔跑的默认速度
    this._ZPM_damagefloorresistance = false;                                    //伤害地形是否抵抗
    this._ZPM_triggerboxwidth = 1;                                              //碰撞体积宽度
    this._ZPM_triggerboxheight = 1;                                             //碰撞体积高度
    this._ZPM_triggercenteranchorX = 0.5;                                       //碰撞体积中心锚点
    this._ZPM_triggercenteranchorY = 0.5;                                       //碰撞体积中心锚点
    this._ZPM_SuperMove = false;                                                //超级移动开关
    this._ZPM_triggercenter = false;                                            //判定类型标签,决定是使用显示坐标还是使用目的地坐标
    this._ZPM_triggerrangeX = 0;                                                //事件触发范围,有时为尺寸,有时为角度
    this._ZPM_triggerrangeY = 0;                                                //事件触发范围,有时为尺寸,有时为角度
    this._ZPM_triggerrangeradius = 1;                                           //事件触发范围,类圆范围的半径
    this._ZPM_eventintervalcount = 0;                                           //事件触发计时器
    this._ZPM_eventintervaltime = ZPM.SuperMove_EventIntervalTimeForAllEvent;   //事件触发计时器的计时阀值
    this._ZPM_eventinterval = ZPM.SuperMove_EventIntervalOnOffForAllEvent;      //事件触发计时器开关
    this._ZPM_rotatedangledegrees = 0;                                          //碰撞体积旋转角度
    this._ZPM_touchtransfer = false;                                            //触摸传送开关
    this._ZPM_touchtransferclock = 0;                                           //触摸传送后的动画计时器
    this._ZPM_touchtransferclocks = 30;                                         //触摸传送后的动画计时器的计时阀值
    this._ZPM_touchtransferstartanimationid = 1;                                //触摸传送后的动画ID
    this._ZPM_touchtransferendanimationid = 1;                                  //触摸传送后的动画ID
    this._ZPM_playerposadjusting = false;                                       //玩家坐标校正状态标签
    this._ZPM_eventstartedplayerposadjust = ZPM.SuperMove_EventStartedPlayerPosAdjust;
};

var _ZPM_SuperMove_Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
    var _ZPM_SM_note = String($dataActors[actorId].note);
    var _ZPM_SM_boxsize = (_ZPM_SM_note.match(/<碰撞体积:([^<>]*?)>/i) || _ZPM_SM_note.match(/<actorboxsize:([^<>]*?)>/i)) || ['<actorboxsize:48,48>', '48,48'];
    _ZPM_SM_boxsize = _ZPM_SM_boxsize[1].split(/[:| ：,.，。]/);
    var _ZPM_SM_w = Math.abs(parseInt(_ZPM_SM_boxsize[0]));
    var _ZPM_SM_h = Math.abs(parseInt(_ZPM_SM_boxsize[1]));
    _ZPM_SM_w = _ZPM_SM_w - _ZPM_SM_w % 12;
    _ZPM_SM_h = _ZPM_SM_h - _ZPM_SM_h % 12;
    _ZPM_SM_w = _ZPM_SM_w < 12 ? 12 : _ZPM_SM_w;
    _ZPM_SM_h = _ZPM_SM_h < 12 ? 12 : _ZPM_SM_h;
    this._ZPM_triggerboxwidth = _ZPM_SM_w / 48;
    this._ZPM_triggerboxheight = _ZPM_SM_h / 48;
    _ZPM_SuperMove_Game_Actor_setup.call(this, actorId);
};

var _ZPM_SuperMove_Game_Player_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function () {
    this._ZPM_triggerboxwidth = ZPM.SuperMove_ForceNormalMove ? 1 : $gameParty.leader()._ZPM_triggerboxwidth;
    this._ZPM_triggerboxheight = ZPM.SuperMove_ForceNormalMove ? 1 : $gameParty.leader()._ZPM_triggerboxheight;
    this._ZPM_triggercenteranchorY = 1 - this._ZPM_triggerboxheight / 2;
    _ZPM_SuperMove_Game_Player_refresh.call(this);
};

/**
 * @method animationWait
 * @memberof Game_CharacterBase
 * @desc 行走图动画周期,兼容钻头的多帧行走图.
 * @summary 继承型
 * @returns {Number}
 */
var _ZPM_SuperMove_Game_CharacterBase_animationWait = Game_CharacterBase.prototype.animationWait;
Game_CharacterBase.prototype.animationWait = function () {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_CharacterBase_animationWait.call(this);
    };
    if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
        return (18 - this.realMoveSpeed() * 1.5);
    };
    return _ZPM_SuperMove_Game_CharacterBase_animationWait.call(this);
};

var _ZPM_SuperMove_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function () {
    _ZPM_SuperMove_Game_Event_setupPageSettings.call(this);
    this.ZPM_SuperMove_initBoxSize();
};

/**
 * @method ZPM_SuperMove_initBoxSize
 * @memberof Game_Event
 * @desc 事件碰撞体积相关参数初始化,通过识别注释内容更改对应参数变量.
 * @summary 新增型
 * @returns {undefined} 
 */
Game_Event.prototype.ZPM_SuperMove_initBoxSize = function () {
    var page = this.page();
    if (!ZPM.SuperMove_DoNotResetEventCoreSetting) {
        this._ZPM_triggerboxwidth = 1;
        this._ZPM_triggerboxheight = 1;
        this._ZPM_triggercenteranchorX = 0.5;
        this._ZPM_triggercenteranchorY = 0.5;
        this._ZPM_eventstartedplayerposadjust = ZPM.SuperMove_EventStartedPlayerPosAdjust;
    };
    this._ZPM_SuperMove = false;
    this._ZPM_triggercenter = false;
    this._ZPM_triggertype = 1;                                                              //触发范围类型
    this._ZPM_triggerrangeX = 0;
    this._ZPM_triggerrangeY = 0;
    this._ZPM_triggerrangeradius = 1;
    this._ZPM_eventintervalcount = 0;
    this._ZPM_eventintervaltime = ZPM.SuperMove_EventIntervalTimeForAllEvent;
    this._ZPM_eventinterval = ZPM.SuperMove_EventIntervalOnOffForAllEvent;
    this._ZPM_eventsearchscope = 20;
    this._ZPM_rotatedangledegrees = 0;
    this._ZPM_playerposadjusting = false;                                                   //玩家坐标校正状态标签
    this._ZPM_triggerrangeoffsetX = 0;                                                      //触发范围左右差值
    this._ZPM_triggerrangeoffsetY = 0;                                                      //触发范围前后差值
    if (page) {
        this.list().forEach(function (l) {
            if (l.code === 108) {
                var comment = l.parameters[0].split(/[:| ：,.，。]/);
                if ((comment[0].toLowerCase() === '>启用强制常规移动') || (comment[0].toLowerCase() === '>forcenormalmoveon')) {
                    ZPM.SuperMove_ForceNormalMove = true;
                };
                if ((comment[0].toLowerCase() === '>禁用强制常规移动') || (comment[0].toLowerCase() === '>forcenormalmoveoff')) {
                    ZPM.SuperMove_ForceNormalMove = false;
                };
                if ((comment[0].toLowerCase() === '>事件碰撞体积') || (comment[0].toLowerCase() === '>eventboxsize')) {
                    if (comment.length == 3) {
                        var bw = Math.abs(parseInt(comment[1]));
                        var bh = Math.abs(parseInt(comment[2]));
                        bw = bw - bw % 12;
                        bw = bw < 12 ? 12 : bw;
                        bh = bh - bh % 12;
                        bh = bh < 12 ? 12 : bh;
                        this._ZPM_triggerboxwidth = ZPM.SuperMove_ForceNormalMove ? 1 : (bw / 48);
                        this._ZPM_triggerboxheight = ZPM.SuperMove_ForceNormalMove ? 1 : (bh / 48);
                        this._ZPM_triggercenteranchorX = 0.5;
                        this._ZPM_triggercenteranchorY = 1 - this._ZPM_triggerboxheight / 2;
                    };
                };
                if ((comment[0].toLowerCase() === '>事件触发范围类型') || (comment[0].toLowerCase() === '>eventtriggerrangetype')) {
                    if (comment.length == 2) {
                        var t = comment[1] ? Math.abs(parseInt(comment[1])) : 1;
                        t = t >= 1 ? t : 1;
                        this._ZPM_triggertype = t;
                    };
                };
                if ((comment[0].toLowerCase() === '>事件触发范围') || (comment[0].toLowerCase() === '>eventtriggerrange')) {
                    if (comment.length == 3) {
                        var etrx = Number(comment[1]);
                        var etry = Number(comment[2]);
                        etrx = etrx - etrx % 0.25;
                        etry = etry - etry % 0.25;
                        this._ZPM_triggerrangeX = etrx;
                        this._ZPM_triggerrangeY = etry;
                    };
                };
                if ((comment[0].toLowerCase() === '>事件触发范围差值') || (comment[0].toLowerCase() === '>eventtriggerrangeoffset')) {
                    if (comment.length == 3) {
                        var offsetx = Number(comment[1]);
                        var offsety = Number(comment[2]);
                        offsetx = offsetx - offsetx % 0.25;
                        offsety = offsety - offsety % 0.25;
                        this._ZPM_triggerrangeoffsetX = offsetx;
                        this._ZPM_triggerrangeoffsetY = offsety;
                    };
                };
                if ((comment[0].toLowerCase() === '>事件触发范围半径') || (comment[0].toLowerCase() === '>eventtriggerrangeradius')) {
                    if (comment.length == 2) {
                        var t = comment[1] ? Math.abs(comment[1]) : 1;
                        t = t >= 1 ? t : 1;
                        this._ZPM_triggerrangeradius = t;
                    };
                };
                if ((comment[0].toLowerCase() === '>启用事件目的地锚点') || (comment[0].toLowerCase() === '>targetposforevent')) {
                    this._ZPM_triggercenter = true;
                };
                if ((comment[0].toLowerCase() === '>启用事件显示位锚点') || (comment[0].toLowerCase() === '>realposforevent')) {
                    this._ZPM_triggercenter = false;
                };
                if ((comment[0].toLowerCase() === '>启用事件超级移动') || (comment[0].toLowerCase() === '>eventsupermoveon')) {
                    if (comment.length == 1) {
                        this._ZPM_SuperMove = true;
                    };
                };
                if ((comment[0].toLowerCase() === '>禁用事件超级移动') || (comment[0].toLowerCase() === '>eventsupermoveoff')) {
                    this._ZPM_SuperMove = false;
                };
                if ((comment[0].toLowerCase() === '>事件触发间隔') || (comment[0].toLowerCase() === '>eventintervaltime')) {
                    if (comment.length == 2) {
                        var t = comment[1] ? Math.abs(parseInt(comment[1])) : ZPM.SuperMove_EventIntervalTimeForAllEvent;
                        t = t >= 0 ? t : ZPM.SuperMove_EventIntervalTimeForAllEvent;
                        this._ZPM_eventintervaltime = t;
                    };
                };
                if ((comment[0].toLowerCase() === '>启用时间间隔') || (comment[0].toLowerCase() === '>eventintervalon')) {
                    this._ZPM_eventinterval = true;
                };
                if ((comment[0].toLowerCase() === '>禁用时间间隔') || (comment[0].toLowerCase() === '>eventintervaloff')) {
                    this._ZPM_eventinterval = false;
                };
                if ((comment[0].toLowerCase() === '>事件搜索范围') || (comment[0].toLowerCase() === '>eventsearchscope')) {
                    if (comment.length == 2) {
                        var t = comment[1] ? Math.abs(parseInt(comment[1])) : 20;
                        t = t >= 0 ? t : 20;
                        this._ZPM_eventsearchscope = t;
                    };
                };
                if ((comment[0].toLowerCase() === '>启用事件触发后玩家位置校正') || (comment[0].toLowerCase() === '>eventtriggeredplayerposadjuston')) {
                    this._ZPM_eventstartedplayerposadjust = true;
                };
                if ((comment[0].toLowerCase() === '>禁用事件触发后玩家位置校正') || (comment[0].toLowerCase() === '>eventtriggeredplayerposadjustoff')) {
                    this._ZPM_eventstartedplayerposadjust = false;
                };
            };
        }, this);
    };
};

/**
 * @method checkEventTriggerTouchFront
 * @memberof Game_CharacterBase
 * @desc 废除无法行动时的事件判定,改用对象独立判定.
 * @override
 * @summary 重写型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.checkEventTriggerTouchFront = function () {
    return false;
};

var _ZPM_SuperMove_Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function () {
    _ZPM_SuperMove_Game_Event_update.call(this);
    if (!ZPM.SuperMove_TakeOff) {
        if (this._pageIndex >= 0) {
            this.updateeventintervalcount();
            this.checkEventTriggerForSM();
        };
    };
};

Game_Event.prototype.updateeventintervalcount = function () {
    if (!$gameMap.isEventRunning() && !$gameMessage.isBusy() && this._ZPM_eventintervalcount != 0) {
        this._ZPM_eventintervalcount++;
        if (this._ZPM_eventintervalcount > this._ZPM_eventintervaltime) {
            this._ZPM_eventintervalcount = 0;
        };
    };
};

Game_Event.prototype.checkeventintervalcount = function () {
    return this._ZPM_eventintervalcount == 0;
};

/**
 * @method checkEventTriggerForSM
 * @memberof Game_Event
 * @desc 事件触发判定,仅针对事件触发类型,事件成功触发时,计时器赋值为1,开启计时,层层筛选以节省性能开支.
 * @summary 新增型
 * @returns {undefined} 
 */
Game_Event.prototype.checkEventTriggerForSM = function () {
    if (!$gamePlayer.isInAirship()) {
        if (!$gameMap.isEventRunning()) {
            if (!this.isJumping()) {
                if (this._trigger === 2) {
                    if (this.isNearThePlayer()) {
                        if (this._ZPM_eventinterval ? this.checkeventintervalcount() : true) {
                            if (this.checkPlayerPos(this._ZPM_triggertype)) {
                                this._ZPM_eventintervalcount = 1;
                                this.start();
                            };
                        };
                    };
                };
            };
        };
    };
};

var _ZPM_SuperMove_Game_Event_isNearThePlayer = Game_Event.prototype.isNearThePlayer;
Game_Event.prototype.isNearThePlayer = function () {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Event_isNearThePlayer.call(this);
    } else {
        var sx = Math.abs(this.deltaXFrom($gamePlayer.x));
        var sy = Math.abs(this.deltaYFrom($gamePlayer.y));
        return sx + sy < this._ZPM_eventsearchscope;
    };
};

/**
 * @method checkPlayerPos
 * @memberof Game_Event
 * @param {!Number} type - 事件类型值
 * @desc 事件触发玩家位置判定,负责判定玩家与事件的位置关系是否符合条件.
 * @summary 新增型
 * @returns {Boolean}
 * @todo 可扩展新的判定种类
 */
Game_Event.prototype.checkPlayerPos = function (type) {
    var ex = this.triggerboxcenterrealX();
    var ey = this.triggerboxcenterrealY();
    var px = $gamePlayer.triggerboxcenterrealX();
    var py = $gamePlayer.triggerboxcenterrealY();
    var ew = this.triggerboxwidth();
    var eh = this.triggerboxheight();
    var pw = $gamePlayer.triggerboxwidth();
    var ph = $gamePlayer.triggerboxheight();
    var tx = $gameMap.deltaX(ex, px);
    var ty = $gameMap.deltaY(ey, py);
    var dx = Math.abs(tx) - ew / 2 - pw / 2;
    var dy = Math.abs(ty) - eh / 2 - ph / 2;
    var west = $gameMap.roundX(ex - this._ZPM_triggerboxwidth / 2);
    var east = $gameMap.roundX(ex + this._ZPM_triggerboxwidth / 2);
    var north = $gameMap.roundY(ey - this._ZPM_triggerboxheight / 2);
    var south = $gameMap.roundY(ey + this._ZPM_triggerboxheight / 2);
    var bl0 = false;
    var bl1 = false;
    var bl2 = false;
    var bl3 = false;
    var rangex = this._ZPM_triggerrangeX;
    var rangea = rangex - this._ZPM_triggerrangeoffsetX;
    var rangey = this._ZPM_triggerrangeY;
    var rangeb = rangey - this._ZPM_triggerrangeoffsetY;
    var d = this._prelockDirection != 0 ? this._prelockDirection : this._direction;
    if (type === 1) {
        if ((dx > rangea && dx > rangex) || dy > rangey && dy > rangea) {
            return false;
        };
        if (rangex == 0) {
            bl0 = dx == 0 && dy < 0 && tx > 0;
        } else if (rangex > 0) {
            bl0 = dx < rangex && dy < 0 && tx > 0;
        } else {
            bl0 = dx < 0 && dy < 0;
        };
        if (bl0) {
            return true;
        };
        if (rangea == 0) {
            bl2 = dx == 0 && dy < 0 && tx < 0;
        } else if (rangea > 0) {
            bl2 = dx < rangea && dy < 0 && tx < 0;
        } else {
            bl2 = dx < 0 && dy < 0;
        };
        if (bl2) {
            return true;
        };
        if (rangey == 0) {
            bl1 = dy == 0 && dx < 0 && ty > 0;
        } else if (rangey > 0) {
            bl1 = dy < rangey && dx < 0 && ty > 0;
        } else {
            bl1 = dx < 0 && dy < 0;
        };
        if (bl1) {
            return true;
        };
        if (rangeb == 0) {
            bl3 = dy == 0 && dx < 0 && ty < 0;
        } else if (rangeb > 0) {
            bl3 = dy < rangeb && dx < 0 && ty < 0;
        } else {
            bl3 = dx < 0 && dy < 0;
        };
        if (bl3) {
            return true;
        };
        return false;
    };
    if (type === 2) {
        var a = Math.max(rangex, rangey, rangea, rangeb);
        if (dx > a && dy > a) {
            return false;
        };
        var pa = this.getBoxPoints(px * 48, py * 48, pw * 48, ph * 48);
        var pa0 = new Array();
        var pa1 = new Array();
        var pa2 = new Array();
        var pa3 = new Array();
        if (rangea == 0) {
            switch (d) {
                case 1:
                case 2:
                    bl0 = dx == 0 && dy < 0 && tx > 0;
                    break;
                case 4:
                case 7:
                    bl0 = dy == 0 && dx < 0 && ty > 0;
                    break;
                case 8:
                case 9:
                    bl0 = dx == 0 && dy < 0 && tx < 0;
                    break;
                case 6:
                case 3:
                    bl0 = dy == 0 && dx < 0 && ty < 0;
                    break;
            };
        } else if (rangea > 0) {
            switch (d) {
                case 1:
                    var i0 = west * 48 - Math.round(rangea * 48 / Math.sqrt(2));
                    var j0 = south * 48 - Math.round(rangea * 48 / Math.sqrt(2));
                    var i1 = east * 48 - Math.round(rangea * 48 / Math.sqrt(2));
                    var j1 = north * 48 - Math.round(rangea * 48 / Math.sqrt(2));
                    pa0.push((west * 48), (south * 48 - 1), i0, j0, i1, j1, (east * 48 - 1), (north * 48));
                case 2:
                    pa0.push(((west - rangea) * 48 + 1), (south * 48 - 1),
                        ((west - rangea) * 48 + 1), (north * 48 + 1),
                        (west * 48), (north * 48 + 1),
                        (west * 48), (south * 48 - 1));
                    break;
                case 7:
                    var i0 = west * 48 + Math.round(rangea * 48 / Math.sqrt(2));
                    var j0 = north * 48 - Math.round(rangea * 48 / Math.sqrt(2));
                    var i1 = east * 48 + Math.round(rangea * 48 / Math.sqrt(2));
                    var j1 = south * 48 - Math.round(rangea * 48 / Math.sqrt(2));
                    pa0.push((west * 48 + 1), (north * 48), i0, j0, i1, j1, (east * 48), ((south * 48) - 1));
                case 4:
                    pa0.push((west * 48 + 1), (north * 48),
                        (west * 48 + 1), ((north - rangea) * 48 + 1),
                        (east * 48 - 1), ((north - rangea) * 48 + 1),
                        (east * 48 - 1), (north * 48));
                    break;
                case 9:
                    var i0 = east * 48 + Math.round(rangea * 48 / Math.sqrt(2));
                    var j0 = north * 48 + Math.round(rangea * 48 / Math.sqrt(2));
                    var i1 = west * 48 + Math.round(rangea * 48 / Math.sqrt(2));
                    var j1 = south * 48 + Math.round(rangea * 48 / Math.sqrt(2));
                    pa0.push((west * 48 + 1), (south * 48), (east * 48), ((north * 48) + 1), i0, j0, i1, j1);
                case 8:
                    pa0.push((east * 48), (south * 48 - 1),
                        (east * 48), (north * 48 + 1),
                        ((east + rangea) * 48 - 1), (north * 48 + 1),
                        ((east + rangea) * 48 - 1), (south * 48 - 1));
                    break;
                case 3:
                    var i0 = west * 48 - Math.round(rangea * 48 / Math.sqrt(2));
                    var j0 = north * 48 + Math.round(rangea * 48 / Math.sqrt(2));
                    var i1 = east * 48 - Math.round(rangea * 48 / Math.sqrt(2));
                    var j1 = south * 48 + Math.round(rangea * 48 / Math.sqrt(2));
                    pa0.push(i0, j0, (west * 48), (north * 48 + 1), (east * 48 - 1), (south * 48), i1, j1);
                case 6:
                    pa0.push((west * 48 + 1), ((south + rangea) * 48 - 1),
                        (west * 48 + 1), (south * 48),
                        (east * 48 - 1), (south * 48),
                        (east * 48 - 1), ((south + rangea) * 48 - 1));
                    break;
            };
            bl0 = Math.testPolygonPolygon(pa, pa0);
        } else {
            bl0 = false;
        };
        if (rangeb == 0) {
            switch (d) {
                case 1:
                case 2:
                    bl1 = dy == 0 && dx < 0 && ty > 0;
                    break;
                case 4:
                case 7:
                    bl1 = dx == 0 && dy < 0 && tx < 0;
                    break;
                case 8:
                case 9:
                    bl1 = dy == 0 && dx < 0 && ty < 0;
                    break;
                case 6:
                case 3:
                    bl1 = dx == 0 && dy < 0 && tx > 0;
                    break;
            };
        } else if (rangeb > 0) {
            switch (d) {
                case 1:
                    var i0 = west * 48 + Math.round(rangeb * 48 / Math.sqrt(2));
                    var j0 = north * 48 - Math.round(rangeb * 48 / Math.sqrt(2));
                    var i1 = east * 48 + Math.round(rangeb * 48 / Math.sqrt(2));
                    var j1 = south * 48 - Math.round(rangeb * 48 / Math.sqrt(2));
                    pa1.push((west * 48 + 1), (north * 48), i0, j0, i1, j1, (east * 48), ((south * 48) - 1));
                case 2:
                    pa1.push((west * 48 + 1), (north * 48),
                        (west * 48 + 1), ((north - rangeb) * 48 + 1),
                        (east * 48 - 1), ((north - rangeb) * 48 + 1),
                        (east * 48 - 1), (north * 48));
                    break;
                case 7:
                    var i0 = east * 48 + Math.round(rangeb * 48 / Math.sqrt(2));
                    var j0 = north * 48 + Math.round(rangeb * 48 / Math.sqrt(2));
                    var i1 = west * 48 + Math.round(rangeb * 48 / Math.sqrt(2));
                    var j1 = south * 48 + Math.round(rangeb * 48 / Math.sqrt(2));
                    pa1.push((west * 48 + 1), (south * 48), (east * 48), ((north * 48) + 1), i0, j0, i1, j1);
                case 4:
                    pa1.push((east * 48), (south * 48 - 1),
                        (east * 48), (north * 48 + 1),
                        ((east + rangey) * 48 - 1), (north * 48 + 1),
                        ((east + rangey) * 48 - 1), (south * 48 - 1));
                    break;
                case 9:
                    var i0 = west * 48 - Math.round(rangeb * 48 / Math.sqrt(2));
                    var j0 = north * 48 + Math.round(rangeb * 48 / Math.sqrt(2));
                    var i1 = east * 48 - Math.round(rangeb * 48 / Math.sqrt(2));
                    var j1 = south * 48 + Math.round(rangeb * 48 / Math.sqrt(2));
                    pa1.push(i0, j0, (west * 48), (north * 48 + 1), (east * 48 - 1), (south * 48), i1, j1);
                case 8:
                    pa1.push((west * 48 + 1), ((south + rangeb) * 48 - 1),
                        (west * 48 + 1), (south * 48),
                        (east * 48 - 1), (south * 48),
                        (east * 48 - 1), ((south + rangeb) * 48 - 1));
                    break;
                case 3:
                    var i0 = west * 48 - Math.round(rangeb * 48 / Math.sqrt(2));
                    var j0 = south * 48 - Math.round(rangeb * 48 / Math.sqrt(2));
                    var i1 = east * 48 - Math.round(rangeb * 48 / Math.sqrt(2));
                    var j1 = north * 48 - Math.round(rangeb * 48 / Math.sqrt(2));
                    pa1.push((west * 48), (south * 48 - 1), i0, j0, i1, j1, (east * 48 - 1), (north * 48));
                case 6:
                    pa1.push(((west - rangeb) * 48 + 1), (south * 48 - 1),
                        ((west - rangeb) * 48 + 1), (north * 48 + 1),
                        (west * 48), (north * 48 + 1),
                        (west * 48), (south * 48 - 1));
                    break;
            };
            bl1 = Math.testPolygonPolygon(pa, pa1);
        } else {
            bl1 = false;
        };
        if (rangex == 0) {
            switch (d) {
                case 1:
                case 2:
                    bl2 = dx == 0 && dy < 0 && tx < 0;
                    break;
                case 4:
                case 7:
                    bl2 = dy == 0 && dx < 0 && ty < 0;
                    break;
                case 8:
                case 9:
                    bl2 = dx == 0 && dy < 0 && tx > 0;
                    break;
                case 6:
                case 3:
                    bl2 = dy == 0 && dx < 0 && ty > 0;
                    break;
            };
        } else if (rangex > 0) {
            switch (d) {
                case 1:
                    var i0 = east * 48 + Math.round(rangex * 48 / Math.sqrt(2));
                    var j0 = north * 48 + Math.round(rangex * 48 / Math.sqrt(2));
                    var i1 = west * 48 + Math.round(rangex * 48 / Math.sqrt(2));
                    var j1 = south * 48 + Math.round(rangex * 48 / Math.sqrt(2));
                    pa2.push((west * 48 + 1), (south * 48), (east * 48), ((north * 48) + 1), i0, j0, i1, j1);
                case 2:
                    pa2.push((east * 48), (south * 48 - 1),
                        (east * 48), (north * 48 + 1),
                        ((east + rangex) * 48 - 1), (north * 48 + 1),
                        ((east + rangex) * 48 - 1), (south * 48 - 1));
                    break;
                case 7:
                    var i0 = west * 48 - Math.round(rangex * 48 / Math.sqrt(2));
                    var j0 = north * 48 + Math.round(rangex * 48 / Math.sqrt(2));
                    var i1 = east * 48 - Math.round(rangex * 48 / Math.sqrt(2));
                    var j1 = south * 48 + Math.round(rangex * 48 / Math.sqrt(2));
                    pa2.push(i0, j0, (west * 48), (north * 48 + 1), (east * 48 - 1), (south * 48), i1, j1);
                case 4:
                    pa2.push((west * 48 + 1), ((south + rangex) * 48 - 1),
                        (west * 48 + 1), (south * 48),
                        (east * 48 - 1), (south * 48),
                        (east * 48 - 1), ((south + rangex) * 48 - 1));
                    break;
                case 9:
                    var i0 = west * 48 - Math.round(rangex * 48 / Math.sqrt(2));
                    var j0 = south * 48 - Math.round(rangex * 48 / Math.sqrt(2));
                    var i1 = east * 48 - Math.round(rangex * 48 / Math.sqrt(2));
                    var j1 = north * 48 - Math.round(rangex * 48 / Math.sqrt(2));
                    pa2.push((west * 48), (south * 48 - 1), i0, j0, i1, j1, (east * 48 - 1), (north * 48));
                case 8:
                    pa2.push(((west - rangex) * 48 + 1), (south * 48 - 1),
                        ((west - rangex) * 48 + 1), (north * 48 + 1),
                        (west * 48), (north * 48 + 1),
                        (west * 48), (south * 48 - 1));
                    break;
                case 3:
                    var i0 = west * 48 + Math.round(rangex * 48 / Math.sqrt(2));
                    var j0 = north * 48 - Math.round(rangex * 48 / Math.sqrt(2));
                    var i1 = east * 48 + Math.round(rangex * 48 / Math.sqrt(2));
                    var j1 = south * 48 - Math.round(rangex * 48 / Math.sqrt(2));
                    pa2.push((west * 48 + 1), (north * 48), i0, j0, i1, j1, (east * 48), ((south * 48) - 1));
                case 6:
                    pa2.push((west * 48 + 1), (north * 48),
                        (west * 48 + 1), ((north - rangey) * 48 + 1),
                        (east * 48 - 1), ((north - rangey) * 48 + 1),
                        (east * 48 - 1), (north * 48));
                    break;
            };
            bl2 = Math.testPolygonPolygon(pa, pa2);
        } else {
            bl2 = false;
        };
        if (rangey == 0) {
            switch (d) {
                case 1:
                case 2:
                    bl3 = dy == 0 && dx < 0 && ty < 0;
                    break;
                case 4:
                case 7:
                    bl3 = dx == 0 && dy < 0 && tx > 0;
                    break;
                case 8:
                case 9:
                    bl3 = dy == 0 && dx < 0 && ty > 0;
                    break;
                case 6:
                case 3:
                    bl3 = dx == 0 && dy < 0 && tx < 0;
                    break;
            };
        } else if (rangey > 0) {
            switch (d) {
                case 1:
                    var i0 = west * 48 - Math.round(rangey * 48 / Math.sqrt(2));
                    var j0 = north * 48 + Math.round(rangey * 48 / Math.sqrt(2));
                    var i1 = east * 48 - Math.round(rangey * 48 / Math.sqrt(2));
                    var j1 = south * 48 + Math.round(rangey * 48 / Math.sqrt(2));
                    pa3.push(i0, j0, (west * 48), (north * 48 + 1), (east * 48 - 1), (south * 48), i1, j1);
                case 2:
                    pa3.push((west * 48 + 1), ((south + rangey) * 48 - 1),
                        (west * 48 + 1), (south * 48),
                        (east * 48 - 1), (south * 48),
                        (east * 48 - 1), ((south + rangey) * 48 - 1));
                    break;
                case 7:
                    var i0 = west * 48 - Math.round(rangey * 48 / Math.sqrt(2));
                    var j0 = south * 48 - Math.round(rangey * 48 / Math.sqrt(2));
                    var i1 = east * 48 - Math.round(rangey * 48 / Math.sqrt(2));
                    var j1 = north * 48 - Math.round(rangey * 48 / Math.sqrt(2));
                    pa3.push((west * 48), (south * 48 - 1), i0, j0, i1, j1, (east * 48 - 1), (north * 48));
                case 4:
                    pa3.push(((west - rangey) * 48 + 1), (south * 48 - 1),
                        ((west - rangey) * 48 + 1), (north * 48 + 1),
                        (west * 48), (north * 48 + 1),
                        (west * 48), (south * 48 - 1));
                    break;
                case 9:
                    var i0 = west * 48 + Math.round(rangey * 48 / Math.sqrt(2));
                    var j0 = north * 48 - Math.round(rangey * 48 / Math.sqrt(2));
                    var i1 = east * 48 + Math.round(rangey * 48 / Math.sqrt(2));
                    var j1 = south * 48 - Math.round(rangey * 48 / Math.sqrt(2));
                    pa3.push((west * 48 + 1), (north * 48), i0, j0, i1, j1, (east * 48), ((south * 48) - 1));
                case 8:
                    pa3.push((west * 48 + 1), (north * 48),
                        (west * 48 + 1), ((north - rangey) * 48 + 1),
                        (east * 48 - 1), ((north - rangey) * 48 + 1),
                        (east * 48 - 1), (north * 48));
                    break;
                case 3:
                    var i0 = east * 48 + Math.round(rangey * 48 / Math.sqrt(2));
                    var j0 = north * 48 + Math.round(rangey * 48 / Math.sqrt(2));
                    var i1 = west * 48 + Math.round(rangey * 48 / Math.sqrt(2));
                    var j1 = south * 48 + Math.round(rangey * 48 / Math.sqrt(2));
                    pa3.push((west * 48 + 1), (south * 48), (east * 48), ((north * 48) + 1), i0, j0, i1, j1);
                case 6:
                    pa3.push((east * 48), (south * 48 - 1),
                        (east * 48), (north * 48 + 1),
                        ((east + rangey) * 48 - 1), (north * 48 + 1),
                        ((east + rangey) * 48 - 1), (south * 48 - 1));
                    break;
            };
            bl3 = Math.testPolygonPolygon(pa, pa3);
        } else {
            bl3 = false;
        };
        var bl = dx < 0 && dy < 0;
        return bl || bl0 || bl1 || bl2 || bl3;
    }
    if (type === 3) {
        return this.isCircleAndNoRotateRectangleOverlaped(ex, ey, this._ZPM_triggerrangeradius, px, py, pw, ph);
    };
    if (type === 4 || type === 5) {
        var startangle = parseInt(rangex);
        var endangle = parseInt(rangey);
        if (type === 5) {
            switch (d) {
                case 3:
                    startangle -= 45;
                    endangle -= 45;
                    break;
                case 6:
                    startangle -= 90;
                    endangle -= 90;
                    break;
                case 9:
                    startangle -= 135;
                    endangle -= 135;
                    break;
                case 8:
                    startangle += 180;
                    endangle += 180;
                    break;
                case 7:
                    startangle += 135;
                    endangle += 135;
                    break;
                case 4:
                    startangle += 90;
                    endangle += 90;
                    break;
                case 1:
                    startangle += 45;
                    endangle += 45;
                    break;
            };
        };
        startangle += 1;
        endangle -= 1;
        startangle = Number(startangle).mod(360);
        endangle = Number(endangle).mod(360);
        var bl = this.isCircleAndNoRotateRectangleOverlaped(ex, ey, this._ZPM_triggerrangeradius, px, py,
            $gamePlayer.triggerboxwidth(), $gamePlayer.triggerboxheight());
        var an = Math.floor(this.getAngleDegreesWithXFront(px, py, ex, ey));
        if (startangle > endangle) {
            bl0 = an >= startangle || an <= endangle;
        } else {
            bl0 = an >= startangle && an <= endangle;
        };
        var pa = this.getBoxPoints(px, py, pw, ph);
        var point1 = Math.rotatePoint((ex + this._ZPM_triggerrangeradius), ey, ex, ey, startangle);
        var point2 = Math.rotatePoint((ex + this._ZPM_triggerrangeradius), ey, ex, ey, endangle);
        point1.push(ex, ey);
        point2.push(ex, ey);
        bl1 = Math.testPolygonPolygon(pa, point1);
        bl2 = Math.testPolygonPolygon(pa, point2);
        return (bl && bl0) || bl1 || bl2;
    };
    if (type === 6 || type === 7) {
        var i0 = west * 48;
        var j0 = north * 48;
        var i1 = east * 48;
        var j1 = south * 48;
        var pa = this.getBoxPoints(px * 48, py * 48, pw * 48, ph * 48);
        var pa0 = new Array();
        if (rangex < 0) {
            i0 = i0 + ((Math.abs(rangex) < (ew / 2)) ? (Math.abs(rangex) * 48 + 1) : 1);
        } else {
            i0 = i0 - rangex * 48 + (rangex != 0 ? 1 : 0);
        };
        if (rangey < 0) {
            j0 = j0 + ((Math.abs(rangey) < (eh / 2)) ? (Math.abs(rangey) * 48 + 1) : 1);
        } else {
            j0 = j0 - rangey * 48 + (rangey != 0 ? 1 : 0);
        };
        if (rangea < 0) {
            i1 = i1 - ((Math.abs(rangea) < (ew / 2)) ? (Math.abs(rangea) * 48 + 1) : 1);
        } else {
            i1 = i1 + rangea * 48 - (rangea != 0 ? 1 : 0);
        };
        if (rangeb < 0) {
            j1 = j1 - ((Math.abs(rangeb) < (eh / 2)) ? (Math.abs(rangeb) * 48 + 1) : 1);
        } else {
            j1 = j1 + rangeb * 48 - (rangeb != 0 ? 1 : 0);
        };
        pa0.push(i0, j1, i0, j0, i1, j0, i1, j1);
        if (type === 7) {
            switch (d) {
                case 1:
                    pa0 = Math.rotatePolygon(ex * 48, ey * 48, 225, pa0);
                    break;
                case 2:
                    pa0 = Math.rotatePolygon(ex * 48, ey * 48, 180, pa0);
                    break;
                case 3:
                    pa0 = Math.rotatePolygon(ex * 48, ey * 48, 135, pa0);
                    break;
                case 4:
                    pa0 = Math.rotatePolygon(ex * 48, ey * 48, 270, pa0);
                    break;
                case 6:
                    pa0 = Math.rotatePolygon(ex * 48, ey * 48, 90, pa0);
                    break;
                case 7:
                    pa0 = Math.rotatePolygon(ex * 48, ey * 48, 315, pa0);
                    break;
                case 9:
                    pa0 = Math.rotatePolygon(ex * 48, ey * 48, 45, pa0);
                    break;
                default:
                    break;
            };
        };
        var bl = Math.testPolygonPolygon(pa, pa0);
        bl0 = dx < 0 && dy < 0;
        return bl || bl0;
    }
    return false;
};

Game_Event.prototype.unlock = function () {
    if (this._locked) {
        this._locked = false;
        this.setDirection(this._prelockDirection);
        this._prelockDirection = 0;
    };
};

/**
 * @method getAngleDegreesWithXFront
 * @memberof Game_CharacterBase
 * @param {!Number} sx - 起始顶点坐标X
 * @param {!Number} sy - 起始顶点坐标Y
 * @param {!Number} cx - 结束顶点坐标X(旋转中心)
 * @param {!Number} cy - 结束顶点坐标Y(旋转中心)
 * @param {?Boolean} [returnradians] - 是否返回弧度
 * @desc 两点连线与x轴的夹角度,通过绝对距离获取夹角度,返回角度或者弧度.
 * 3点钟方向顺时针
 * @summary 新增型
 * @returns {Number}} 
 */
Game_CharacterBase.prototype.getAngleDegreesWithXFront = function (sx, sy, cx, cy, returnradians) {
    var x = $gameMap.deltaX(sx, cx);
    var y = $gameMap.deltaY(sy, cy);
    var angle = Math.atan2(Math.abs(y), Math.abs(x)) * 180 / Math.PI;
    if (x == 0 && y == 0) {
        angle = 0;
    } else if (x == 0) {
        angle = y > 0 ? 90 : 270;
    } else if (y == 0) {
        angle = x > 0 ? 0 : 180;
    } else if (x > 0) {
        angle = y > 0 ? angle : (360 - angle);
    } else {
        angle = y > 0 ? (180 - angle) : (180 + angle);
    };
    return returnradians ? (angle * Math.PI / 180) : angle;
};

/**
 * @method isCircleAndNoRotateRectangleOverlaped
 * @memberof Game_CharacterBase
 * @param {!Number} cx - 圆的坐标X
 * @param {!Number} cy - 圆的坐标Y
 * @param {!Number} r - 圆半径
 * @param {!Number} rx - AABB的坐标X
 * @param {!Number} ry - AABB的坐标Y
 * @param {!Number} rw - AABB的宽
 * @param {!Number} rh - AABB的高
 * @desc 圆与轴对称矩形(AABB)重合判定.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.isCircleAndNoRotateRectangleOverlaped = function (cx, cy, r, rx, ry, rw, rh) {
    var x = $gameMap.deltaX(cx, rx);
    var y = $gameMap.deltaY(cy, ry);
    var minX = Math.min(x, rw / 2);
    var maxX = Math.max(minX, -rw / 2);
    var minY = Math.min(y, rh / 2);
    var maxY = Math.max(minY, -rh / 2);
    if ((maxX - x) * (maxX - x) + (maxY - y) * (maxY - y) < r * r) {
        return true;
    } else {
        return false;
    };
};

/**
 * @method Math.rotatePoint
 * @static
 * @param {!Number} x - 原始顶点坐标X
 * @param {!Number} y - 原始顶点坐标Y
 * @param {!Number} cx - 旋转中心点坐标X
 * @param {!Number} cy - 旋转中心点坐标Y
 * @param {!Number} angledegrees - 角度 3点钟方向顺时针
 * @desc 某顶点以另一顶点为中心进行旋转.
 * @summary 新增型
 * @returns {Array<Number>}
 */
Math.rotatePoint = function (x, y, cx, cy, angledegrees) {
    angledegrees = Number(angledegrees).mod(360);
    var cosv = Math.cos((angledegrees * Math.PI) / 180);
    var sinv = Math.sin((angledegrees * Math.PI) / 180);
    var p = new Array(2);
    p[0] = Number(((x - cx) * cosv - (y - cy) * sinv + cx).toFixed(2));
    p[1] = Number(((x - cx) * sinv + (y - cy) * cosv + cy).toFixed(2));
    return p;
};

/**
 * @method Math.rotatePolygon
 * @static
 * @param {!Number} cx - 旋转中心点坐标X
 * @param {!Number} cy - 旋转中心点坐标Y
 * @param {!Number} angledegrees - 角度
 * @param {!Array<Number>} pointsarray - 顶点坐标数组 顺时针获取,
 * pointsarray[0]为X,pointsarray[1]为Y,类推,请确保数组长度为偶数
 * @desc 以指定点为中心点进行多边形旋转,3点钟方向顺时针.
 * @summary 新增型
 * @returns {Array<Number>}
 */
Math.rotatePolygon = function (cx, cy, angledegrees, pointsarray) {
    var p1 = new Array();
    var p2 = new Array();
    for (i = 0; i < pointsarray.length / 2; i++) {
        var x = pointsarray[i * 2];
        var y = pointsarray[i * 2 + 1];
        p1 = Math.rotatePoint(x, y, cx, cy, angledegrees);
        p2[i * 2] = p1[0];
        p2[i * 2 + 1] = p1[1];
    };
    return p2;
};

/**
 * @method Math.testPolygonCircle
 * @static
 * @param {!Array<Number>} pointsarray - 多边形顶点坐标数组 
 * pointsarray[0]为X,pointsarray[1]为Y,类推,请确保数组长度为偶数
 * @param {!Number} cx - 旋转中心点坐标X
 * @param {!Number} cy - 旋转中心点坐标Y
 * @param {!Number} radius - 半径
 * @desc 多边形与圆碰撞测试 
 * SAT的多边形顶点坐标数组需要按逆时针获取,由于MV的Y轴特性,
 * pointsarray坐标数组因按顺时针获取.
 * @summary 新增型
 * @returns {Boolean}
 */
Math.testPolygonCircle = function (pointsarray, cx, cy, radius) {
    var V = SAT.Vector;
    var C = SAT.Circle;
    var P = SAT.Polygon;
    var pa = new Array();
    var circle = new C(new V(cx, -cy), radius);
    for (i = 0; i < pointsarray.length / 2; i++) {
        pa[i] = new V(pointsarray[i * 2], pointsarray[i * 2 + 1]);
    };
    var polygon = new P(new V(), pa);
    var collided = SAT.testPolygonCircle(polygon, circle);
    return collided;
};

/**
 * @method Math.testPolygonPolygon
 * @static 
 * @param {!Array<Number>} pointsarray1 - 多边形顶点坐标数组 
 * pointsarray1[0]为X,pointsarray1[1]为Y,类推,请确保数组长度为偶数
 * @param {!Array<Number>} pointsarray2 - 多边形顶点坐标数组 
 * pointsarray2[0]为X,pointsarray2[1]为Y,类推,请确保数组长度为偶数
 * @desc 多边形与多边形碰撞测试 
 * SAT的多边形顶点坐标数组需要按逆时针获取,由于MV的Y轴特性,
 * pointsarray坐标数组因按顺时针获取.
 * @summary 新增型
 * @returns {Boolean} 
 */
Math.testPolygonPolygon = function (pointsarray1, pointsarray2) {
    var V = SAT.Vector;
    var P = SAT.Polygon;
    var pa1 = new Array();
    var pa2 = new Array();
    var i, j;
    for (i = 0; i < pointsarray1.length / 2; i++) {
        pa1[i] = new V(pointsarray1[i * 2], pointsarray1[i * 2 + 1]);
    };
    for (j = 0; j < pointsarray2.length / 2; j++) {
        pa2[j] = new V(pointsarray2[j * 2], pointsarray2[j * 2 + 1]);
    };
    var polygon1 = new P(new V(), pa1);
    var polygon2 = new P(new V(), pa2);
    var collided = SAT.testPolygonPolygon(polygon1, polygon2);
    return collided;
}

/**
 * @method getBoxPoints
 * @memberof Game_CharacterBase
 * @param {!Number} x - 碰撞体矩形中心坐标X
 * @param {!Number} y - 碰撞体矩形中心坐标Y
 * @param {!Number} w - 碰撞体矩形宽度
 * @param {!Number} h - 碰撞体矩形高度
 * @param {?Number} [rotateangle] - 旋转
 * @desc 以MV坐标轴为基础,顺时针获取碰撞体矩形的顶点坐标 
 * 并以数组形式返回,如对象旋转角度变量不为0,则旋转.
 * @summary 新增型
 * @returns {Array<Number>} 
 */
Game_CharacterBase.prototype.getBoxPoints = function (x, y, w, h, rotateangle) {
    var pointsarray = new Array(8);
    pointsarray[0] = x - w / 2;
    pointsarray[1] = y - h / 2;
    pointsarray[2] = x + w / 2;
    pointsarray[3] = y - h / 2;
    pointsarray[4] = x + w / 2;
    pointsarray[5] = y + h / 2;
    pointsarray[6] = x - w / 2;
    pointsarray[7] = y + h / 2;
    if (rotateangle) {
        if (rotateangle != 0) {
            pointsarray = Math.rotatePolygon(x, y, rotateangle, pointsarray);
        };
    }
    return pointsarray;
};

Game_Map.prototype.roundXWithDirection = function (x, d, s) {
    s = s || 1;
    return this.roundX(x + (d === 6 ? s : d === 4 ? -s : 0));
};

Game_Map.prototype.roundYWithDirection = function (y, d, s) {
    s = s || 1;
    return this.roundY(y + (d === 2 ? s : d === 8 ? -s : 0));
};

Game_Map.prototype.xWithDirection = function (x, d, s) {
    s = s || 1;
    return x + (d === 6 ? s : d === 4 ? -s : 0);
};

Game_Map.prototype.yWithDirection = function (y, d, s) {
    s = s || 1;
    return y + (d === 2 ? s : d === 8 ? -s : 0);
};

Game_CharacterBase.prototype.realMoveSpeed = function () {
    return (this.isDashing() ? this._ZPM_runspeed : this._moveSpeed);
};

/**
 * @method updateDashing
 * @memberof Game_Player
 * @desc 追加校正奔跑开关,追加奔跑开关快捷按键.
 * @override
 * @summary 重写型
 * @returns {undefined} 
 */
Game_Player.prototype.updateDashing = function () {
    if (Input.isTriggered('WORShortCutKey')) {
        if (ConfigManager.alwaysDash) {
            ConfigManager.alwaysDash = false;
        } else {
            ConfigManager.alwaysDash = true;
        };
    };
    if (ZPM.SuperMove_ForceDashing) {
        this._dashing = true;
        return;
    };
    if (this.isMoving()) {
        return;
    }
    if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
        if (!ZPM.SuperMove_AdjustingRun && this._ZPM_playerposadjusting) {
            this._dashing = false;
        } else {
            this._dashing = this.isDashButtonPressed() || $gameTemp.isDestinationValid();
        };
    } else {
        this._dashing = false;
    }
};

var _ZPM_SuperMove_Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
Game_CharacterBase.prototype.moveStraight = function (d) {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_CharacterBase_moveStraight.call(this, d);
    };
    if (this._ZPM_SuperMove) {
        this._x = Number((this._x - this._x % 0.0625).toFixed(4));
        this._realX = Number((this._realX - this._realX % 0.0625).toFixed(4));
        this._y = Number((this._y - this._y % 0.0625).toFixed(4));
        this._realY = Number((this._realY - this._realY % 0.0625).toFixed(4));
    };
    var s = 1;
    if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
        s = this.distancePerFrame() * 2;
    };
    if (ZPM.SuperMove_ForceNormalMove) {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);
    };
    this.setMovementSuccess(this.canPass(this._x, this._y, d));
    if (this.isMovementSucceeded()) {
        this.moveStraightcore(d, s);
    } else {
        if (!this._ZPM_playerposadjusting) {
            this.setDirection(d);
        } else {
            this._ZPM_playerposadjusting = false;
        };
        this.checkEventTriggerTouchFront(d);
    };
};

/**
 * @method moveStraightcore
 * @memberof Game_CharacterBase
 * @param {!Number} d - 方向
 * @param {?Number} s - 速度
 * @desc 针对CharacterBase的moveStraight函数,拆分以方便兼容.
 * @summary 新增型
 * @returns {undefined} 
 */
Game_CharacterBase.prototype.moveStraightcore = function (d, s) {
    this.setDirection(d);
    this._x = $gameMap.roundXWithDirection(this._x, d, s);
    this._y = $gameMap.roundYWithDirection(this._y, d, s);
    this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d), s);
    this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d), s);
    this.increaseSteps();
};

var _ZPM_SuperMove_Game_CharacterBase_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
Game_CharacterBase.prototype.moveDiagonally = function (horz, vert) {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_CharacterBase_moveDiagonally.call(this, horz, vert);
    };
    if (this._ZPM_SuperMove) {
        this._x = Number((this._x - this._x % 0.0625).toFixed(4));
        this._realX = Number((this._realX - this._realX % 0.0625).toFixed(4));
        this._y = Number((this._y - this._y % 0.0625).toFixed(4));
        this._realY = Number((this._realY - this._realY % 0.0625).toFixed(4));
    };
    var s = 1;
    if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
        s = this.distancePerFrame() * 2;
    };
    if (ZPM.SuperMove_ForceNormalMove) {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);
    };
    this.setMovementSuccess(this.canPassDiagonally(this._x, this._y, horz, vert));
    if (this.isMovementSucceeded()) {
        this.moveDiagonallycore(horz, vert, s);
    } else {
        this._ZPM_playerposadjusting = false;
    }
    if (this._direction === this.reverseDir(horz)) {
        this.setDirection(horz);
    };
    if (this._direction === this.reverseDir(vert)) {
        this.setDirection(vert);
    };
    if (Imported.ZPM_CharacterAnime) {
        if (this._ZPM_d8animation) {
            this.setDirection(this.getShortDirection(horz, vert));
        };
    };
};

/**
 * @method moveDiagonallycore
 * @memberof Game_CharacterBase
 * @param {!Number} horz - X轴方向
 * @param {!Number} vert - Y轴方向
 * @param {?Number} s - 速度
 * @desc 针对CharacterBase的moveDiagonally函数,拆分以方便兼容.
 * @summary 新增型
 * @returns {undefined} 
 */
Game_CharacterBase.prototype.moveDiagonallycore = function (horz, vert, s) {
    this._x = $gameMap.roundXWithDirection(this._x, horz, s);
    this._y = $gameMap.roundYWithDirection(this._y, vert, s);
    this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), s);
    this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), s);
    this.increaseSteps();
};

var _ZPM_SuperMove_Game_Player_moveStraight = Game_Player.prototype.moveStraight;
Game_Player.prototype.moveStraight = function (d) {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Player_moveStraight.call(this, d);
    };
    if (this._ZPM_SuperMove) {
        this._x = Number((this._x - this._x % 0.0625).toFixed(4));
        this._realX = Number((this._realX - this._realX % 0.0625).toFixed(4));
        this._y = Number((this._y - this._y % 0.0625).toFixed(4));
        this._realY = Number((this._realY - this._realY % 0.0625).toFixed(4));
    };
    if (ZPM.SuperMove_ForceNormalMove) {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);
        Game_Character.prototype.moveStraight.call(this, d);
        if (this.canPass(this._x, this._y, d)) {
            this._followers.updateMove();
        };
    } else {
        var s = 1;
        if (this._ZPM_SuperMove) {
            s = this.distancePerFrame() * 2;
        };
        var bl = this.canPass(this._x, this._y, d, true);
        if (bl) {
            this.setMovementSuccess(true);
        } else {
            this.setMovementSuccess(false);
        };
        if (this.isMovementSucceeded()) {
            if (bl === true) {
                this.moveStraightcore(d, s);
                this._followers.updateMove();
            } else {
                if (this._ZPM_playerposadjusting) {
                    this._ZPM_playerposadjusting = false;
                };
                if (bl < s) {
                    this.moveStraightcore(d, bl);
                };
                if (!$gameMap.isAnyEventStarting()) {
                    this.checkEventTriggerTouchFront(d);
                };
                if ($gameMap.isAnyEventStarting()) {
                    return;
                };
                if (bl == parseInt(bl)) {
                    this.moveStraightcore(bl, s);
                } else {
                    if (this._ZPM_SuperMove) {
                        this.moveStraightcore(parseInt(bl), (bl - parseInt(bl)));
                    };
                };
            };
        } else {
            if (!this._ZPM_playerposadjusting) {
                this.setDirection(d);
            } else {
                this._ZPM_playerposadjusting = false;
            };
            this.checkEventTriggerTouchFront(d);
        };
    };
};

var _ZPM_SuperMove_Game_Player_moveDiagonally = Game_Player.prototype.moveDiagonally;
Game_Player.prototype.moveDiagonally = function (horz, vert) {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Player_moveDiagonally.call(this, horz, vert);
    };
    if (this._ZPM_SuperMove) {
        this._x = Number((this._x - this._x % 0.0625).toFixed(4));
        this._realX = Number((this._realX - this._realX % 0.0625).toFixed(4));
        this._y = Number((this._y - this._y % 0.0625).toFixed(4));
        this._realY = Number((this._realY - this._realY % 0.0625).toFixed(4));
    };
    if (ZPM.SuperMove_ForceNormalMove) {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);
        Game_Character.prototype.moveDiagonally.call(this, horz, vert);
        if (this.canPassDiagonally(this._x, this._y, horz, vert)) {
            this._followers.updateMove();
        };
    } else {
        var s = 1;
        if (this._ZPM_SuperMove) {
            s = this.distancePerFrame() * 2;
        };
        var bl = this.canPassDiagonally(this._x, this._y, horz, vert);
        if (bl) {
            this.setMovementSuccess(true);
            this.resetStopCount();
        } else {
            this._ZPM_playerposadjusting = false;
            this.setMovementSuccess(false);
        };
        var d;
        if (this._direction === this.reverseDir(horz)) {
            this.setDirection(horz);
        };
        if (this._direction === this.reverseDir(vert)) {
            this.setDirection(vert);
        };
        if (this._direction === horz) {
            d = vert;
        } else {
            d = horz;
        }
        if (this.isMovementSucceeded()) {
            this.moveDiagonallycore(horz, vert, s);
            if (Imported.ZPM_CharacterAnime) {
                if (this._ZPM_d8animation) {
                    this.setDirection(this.getShortDirection(horz, vert));
                };
            };
            this._followers.updateMove();
        } else {
            if (this.canPass(this._x, this._y, this._direction, true)) {
                this.moveStraight(this._direction);
            } else {
                this.checkEventTriggerTouchFront(this._direction);
                if (!$gameMap.isAnyEventStarting()) {
                    if (this.canPass(this._x, this._y, d, true)) {
                        this.moveStraight(d);
                    } else {
                        if (Imported.ZPM_CharacterAnime) {
                            if (this._ZPM_d8animation) {
                                this.setDirection(this.getShortDirection(horz, vert));
                            };
                        };
                    };
                };
            };
        };
    };
};

var _ZPM_SuperMove_Game_Follower_chaseCharacter = Game_Follower.prototype.chaseCharacter;
Game_Follower.prototype.chaseCharacter = function (character) {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Follower_chaseCharacter.call(this, character);
    };
    this._x = Number((this._x - this._x % 0.0625).toFixed(4));
    this._realX = Number((this._realX - this._realX % 0.0625).toFixed(4));
    this._y = Number((this._y - this._y % 0.0625).toFixed(4));
    this._realY = Number((this._realY - this._realY % 0.0625).toFixed(4));
    if (this.isMoving()) {
        return;
    };
    var s = 1;
    if (this._ZPM_SuperMove) {
        s = this.distancePerFrame() * 2;
    };
    if (ZPM.SuperMove_ForceNormalMove || !this._ZPM_SuperMove) {
        //this._x = Math.round(this._x);
        //this._y = Math.round(this._y);
        //s = 1;
        this._x = Math.round(character._realX);
        this._y = Math.round(character._realY);
        if (this._x != this._realX) {
            var tbl01 = (this._x > this._realX) && (Math.abs(this._x - this._realX) <= 1);
            var tbl02 = (this._x < this._realX) && (Math.abs(this._x - this._realX) > 1);
            this._realX = this._x + ((tbl01 || tbl02) ? -1 : 1);
        };
        if (this._y != this._realY) {
            var tbl03 = (this._y > this._realY) && (Math.abs(this._y - this._realY) <= 1);
            var tbl04 = (this._y < this._realY) && (Math.abs(this._y - this._realY) > 1);
            this._realY = this._y + ((tbl03 || tbl04) ? -1 : 1);
        };
        this.setDirection(character._direction);
        this.increaseSteps();
        return;
    };
    var w = this.triggerboxwidth();
    var h = this.triggerboxheight();
    var cw = character.triggerboxwidth();
    var ch = character.triggerboxheight();
    var cx = character.triggerboxcentertargetX();
    var cy = character.triggerboxcentertargetY();
    var tx = $gameMap.deltaX(this.triggerboxcentertargetX(), cx);
    var ty = $gameMap.deltaY(this.triggerboxcentertargetY(), cy);
    var dx = Math.abs(tx) - cw / 2 - w / 2;
    var dy = Math.abs(ty) - ch / 2 - h / 2;
    this.setMoveSpeed($gamePlayer.realMoveSpeed());
    var ds = this._ZPM_SuperMove ? ZPM.SuperMove_FollowsSpacing : Math.floor(ZPM.SuperMove_FollowsSpacing);
    if (dx >= ds || dy >= ds) {
        if (dx >= 14 || dy >= 8) {
            this._x = $gameMap.roundX(character._x + character._ZPM_triggercenteranchorX - this._ZPM_triggercenteranchorX);
            this._y = $gameMap.roundY(character._y + character._ZPM_triggercenteranchorY - this._ZPM_triggercenteranchorY);
            this._x = character._x;
            this._y = character._y;
            this._realX = this._x;
            this._realY = this._y;
            this.setDirection(character._direction);
            this.increaseSteps();
            return;
        };
        var horz = tx > 0 ? 4 : 6;
        var vert = ty > 0 ? 8 : 2;
        if (dx > ds && dy > ds) {
            if (this.canPassDiagonally(this._x, this._y, horz, vert)) {
                if (Math.abs(tx) < s || Math.abs(ty) < s) {
                    s = Math.min(Math.abs(tx), Math.abs(ty));
                };
                this.moveDiagonallycore(horz, vert, s);
                if (this._direction === this.reverseDir(horz)) {
                    this.setDirection(horz);
                };
                if (this._direction === this.reverseDir(vert)) {
                    this.setDirection(vert);
                };
                if (Imported.ZPM_CharacterAnime) {
                    if (this._ZPM_d8animation) {
                        this.setDirection(this.getShortDirection(horz, vert));
                    };
                };
                return;
            } else {
                if (dx >= dy) {
                    if (Math.abs(ty) >= s) {
                        if (this.canPass(this._x, this._y, vert)) {
                            this._y = $gameMap.roundYWithDirection(this._y, vert, s);
                            this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), s);
                            this.setDirection(vert);
                            this.increaseSteps();
                            return;
                        }
                    } else {
                        if (this.canPass(this._x, this._y, vert, Math.abs(ty))) {
                            this._y = $gameMap.roundYWithDirection(this._y, vert, Math.abs(ty));
                            this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), Math.abs(ty));
                            this.setDirection(vert);
                            this.increaseSteps();
                            return;
                        };
                    };
                    if (Math.abs(tx) >= s) {
                        if (this.canPass(this._x, this._y, horz)) {
                            this._x = $gameMap.roundXWithDirection(this._x, horz, s);
                            this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), s);
                            this.setDirection(horz);
                            this.increaseSteps();
                            return;
                        };
                    } else {
                        if (this.canPass(this._x, this._y, horz, Math.abs(tx))) {
                            this._x = $gameMap.roundXWithDirection(this._x, horz, Math.abs(tx));
                            this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), Math.abs(tx));
                            this.setDirection(horz);
                            this.increaseSteps();
                            return;
                        };
                    };
                };
                if (dy >= dx) {
                    if (Math.abs(tx) >= s) {
                        if (this.canPass(this._x, this._y, horz)) {
                            this._x = $gameMap.roundXWithDirection(this._x, horz, s);
                            this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), s);
                            this.setDirection(horz);
                            this.increaseSteps();
                            return;
                        };
                    } else {
                        if (this.canPass(this._x, this._y, horz, Math.abs(tx))) {
                            this._x = $gameMap.roundXWithDirection(this._x, horz, Math.abs(tx));
                            this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), Math.abs(tx));
                            this.setDirection(horz);
                            this.increaseSteps();
                            return;
                        };
                    };
                    if (Math.abs(ty) >= s) {
                        if (this.canPass(this._x, this._y, vert)) {
                            this._y = $gameMap.roundYWithDirection(this._y, vert, s);
                            this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), s);
                            this.setDirection(vert);
                            this.increaseSteps();
                            return;
                        }
                    } else {
                        if (this.canPass(this._x, this._y, vert, Math.abs(ty))) {
                            this._y = $gameMap.roundYWithDirection(this._y, vert, Math.abs(ty));
                            this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), Math.abs(ty));
                            this.setDirection(vert);
                            this.increaseSteps();
                            return;
                        };
                    };
                };
            };
        } else if (dx == ds && dy == ds) {
            switch (character._direction) {
                case 1:
                case 2:
                case 8:
                case 9:
                    var n, m;
                    n = $gameMap.roundX(character._x + character._ZPM_triggercenteranchorX - this._ZPM_triggercenteranchorX);
                    n = Math.abs($gameMap.deltaX(this._x, n));
                    m = this._x;
                    for (var i = 0; (i * s) < n; i++) {
                        var _x = $gameMap.roundX(m + (horz == 6 ? (i * s) : horz == 4 ? (- i * s) : 0));
                        if (this.canPass(_x, this._y, horz)) {
                            this._x = $gameMap.roundX(_x + (horz == 6 ? s : horz == 4 ? -s : 0));
                        } else {
                            if ((n - i * s) < s) {
                                if (this.canPass(_x, this._y, horz, (n - i * s))) {
                                    this._x = $gameMap.roundX(_x + (horz == 6 ? (n - i * s) : horz == 4 ? -(n - i * s) : 0));
                                };
                            };
                            break;
                        };
                    };
                    if (m != this._x) {
                        n = Math.abs($gameMap.deltaX(this._x, m));
                        if (n > s) {
                            this.setMoveSpeed($gamePlayer.realMoveSpeed() + 1);
                        };
                        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), n);
                        this.setDirection(horz);
                        this.increaseSteps();
                        break;
                    };
                    n = $gameMap.roundY(character._y + character._ZPM_triggercenteranchorY - this._ZPM_triggercenteranchorY);
                    n = Math.abs($gameMap.deltaY(this._y, n));
                    m = this._y;
                    for (var i = 0; (i * s) < n; i++) {
                        var _y = $gameMap.roundY(m + (vert == 2 ? (i * s) : vert == 8 ? (- i * s) : 0));
                        if (this.canPass(this._x, _y, vert)) {
                            this._y = $gameMap.roundY(_y + (vert == 2 ? s : vert == 8 ? -s : 0));
                        } else {
                            if ((n - i * s) < s) {
                                if (this.canPass(this._x, _y, vert, (n - i * s))) {
                                    this._y = $gameMap.roundY(_y + (vert == 2 ? (n - i * s) : vert == 8 ? -(n - i * s) : 0));
                                };
                            };
                            break;
                        };
                    };
                    if (m != this._y) {
                        n = Math.abs($gameMap.deltaY(this._y, m));
                        if (n > s) {
                            this.setMoveSpeed($gamePlayer.realMoveSpeed() + 1);
                        };
                        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), n);
                        this.setDirection(vert);
                        this.increaseSteps();
                        break;
                    };
                    break;
                case 3:
                case 6:
                case 4:
                case 7:
                    var n, m;
                    n = $gameMap.roundY(character._y + character._ZPM_triggercenteranchorY - this._ZPM_triggercenteranchorY);
                    n = Math.abs($gameMap.deltaY(this._y, n));
                    m = this._y;
                    for (var i = 0; (i * s) < n; i++) {
                        var _y = $gameMap.roundY(m + (vert == 2 ? (i * s) : vert == 8 ? (- i * s) : 0));
                        if (this.canPass(this._x, _y, vert)) {
                            this._y = $gameMap.roundY(_y + (vert == 2 ? s : vert == 8 ? -s : 0));
                        } else {
                            if ((n - i * s) < s) {
                                if (this.canPass(this._x, _y, vert, (n - i * s))) {
                                    this._y = $gameMap.roundY(_y + (vert == 2 ? (n - i * s) : vert == 8 ? -(n - i * s) : 0));
                                };
                            };
                            break;
                        };
                    };
                    if (m != this._y) {
                        n = Math.abs($gameMap.deltaY(this._y, m));
                        if (n > s) {
                            this.setMoveSpeed($gamePlayer.realMoveSpeed() + 1);
                        };
                        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), n);
                        this.setDirection(vert);
                        this.increaseSteps();
                        break;
                    };
                    n = $gameMap.roundX(character._x + character._ZPM_triggercenteranchorX - this._ZPM_triggercenteranchorX);
                    n = Math.abs($gameMap.deltaX(this._x, n));
                    m = this._x;
                    for (var i = 0; (i * s) < n; i++) {
                        var _x = $gameMap.roundX(m + (horz == 6 ? (i * s) : horz == 4 ? (- i * s) : 0));
                        if (this.canPass(_x, this._y, horz)) {
                            this._x = $gameMap.roundX(_x + (horz == 6 ? s : horz == 4 ? -s : 0));
                        } else {
                            if ((n - i * s) < s) {
                                if (this.canPass(_x, this._y, horz, (n - i * s))) {
                                    this._x = $gameMap.roundX(_x + (horz == 6 ? (n - i * s) : horz == 4 ? -(n - i * s) : 0));
                                };
                            };
                            break;
                        };
                    };
                    if (m != this._x) {
                        n = Math.abs($gameMap.deltaX(this._x, m));
                        if (n > s) {
                            this.setMoveSpeed($gamePlayer.realMoveSpeed() + 1);
                        };
                        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), n);
                        this.setDirection(horz);
                        this.increaseSteps();
                        break;
                    };
                    break;
            };
        } else if (dx > ds) {
            if (!ty == 0) {
                if (Math.abs(ty) >= s) {
                    if (this.canPassDiagonally(this._x, this._y, horz, vert)) {
                        this.moveDiagonally(horz, vert);
                        if (Imported.ZPM_CharacterAnime) {
                            if (this._ZPM_d8animation) {
                                this.setDirection(this.getShortDirection(horz, vert));
                            };
                        };
                        return;
                    };
                    if (this.canPass(this._x, this._y, vert)) {
                        this._y = $gameMap.roundYWithDirection(this._y, vert, s);
                        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), s);
                        this.setDirection(vert);
                        this.increaseSteps();
                        return;
                    }
                } else {
                    if (this.canPass(this._x, this._y, vert, Math.abs(ty))) {
                        this._y = $gameMap.roundYWithDirection(this._y, vert, Math.abs(ty));
                        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), Math.abs(ty));
                        this.setDirection(vert);
                        this.increaseSteps();
                        return;
                    };
                };
                if (Math.abs(tx) >= s) {
                    if (this.canPassDiagonally(this._x, this._y, horz, vert)) {
                        this.moveDiagonally(horz, vert);
                        return;
                    };
                    if (this.canPass(this._x, this._y, horz)) {
                        this._x = $gameMap.roundXWithDirection(this._x, horz, s);
                        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), s);
                        this.setDirection(horz);
                        this.increaseSteps();
                        return;
                    };
                } else {
                    if (this.canPass(this._x, this._y, horz, Math.abs(tx))) {
                        this._x = $gameMap.roundXWithDirection(this._x, horz, Math.abs(tx));
                        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), Math.abs(tx));
                        this.setDirection(horz);
                        this.increaseSteps();
                        return;
                    };
                };
            } else {
                var n, m;
                if (horz === 6) {
                    n = $gameMap.roundX(character._x + character._ZPM_triggercenteranchorX
                        - (character.triggerboxwidth() / 2)
                        - ds
                        - (this.triggerboxwidth() / 2)
                        - this._ZPM_triggercenteranchorX);
                } else {
                    n = $gameMap.roundX(character._x + character._ZPM_triggercenteranchorX
                        + (character.triggerboxwidth() / 2)
                        + ds
                        + (this.triggerboxwidth() / 2)
                        - this._ZPM_triggercenteranchorX);
                };
                n = Math.abs($gameMap.deltaX(this._x, n));
                m = this._x;
                for (var i = 0; (i * s) < n; i++) {
                    var _x = $gameMap.roundX(m + (horz == 6 ? (i * s) : horz == 4 ? (- i * s) : 0));
                    if (this.canPass(_x, this._y, horz)) {
                        this._x = $gameMap.roundX(_x + (horz == 6 ? s : horz == 4 ? -s : 0));
                    } else {
                        if ((n - i * s) < s) {
                            if (this.canPass(_x, this._y, horz, (n - i * s))) {
                                this._x = $gameMap.roundX(_x + (horz == 6 ? (n - i * s) : horz == 4 ? -(n - i * s) : 0));
                            };
                        };
                        break;
                    };
                };
                if (m != this._x) {
                    n = Math.abs($gameMap.deltaX(this._x, m));
                    if (n > s) {
                        //this.setMoveSpeed($gamePlayer.realMoveSpeed() + 1);
                    };
                    this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), n);
                    this.setDirection(horz);
                    this.increaseSteps();
                };
                return;
            };
        } else if (dy > ds) {
            if (!tx == 0) {
                if (Math.abs(tx) >= s) {
                    if (this.canPassDiagonally(this._x, this._y, horz, vert)) {
                        this.moveDiagonally(horz, vert);
                        if (Imported.ZPM_CharacterAnime) {
                            if (this._ZPM_d8animation) {
                                this.setDirection(this.getShortDirection(horz, vert));
                            };
                        };
                        return;
                    };
                    if (this.canPass(this._x, this._y, horz)) {
                        this._x = $gameMap.roundXWithDirection(this._x, horz, s);
                        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), s);
                        this.setDirection(horz);
                        this.increaseSteps();
                        return;
                    };
                } else {
                    if (this.canPass(this._x, this._y, horz, Math.abs(tx))) {
                        this._x = $gameMap.roundXWithDirection(this._x, horz, Math.abs(tx));
                        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz), Math.abs(tx));
                        this.setDirection(horz);
                        this.increaseSteps();
                        return;
                    };
                };
                if (Math.abs(ty) >= s) {
                    if (this.canPassDiagonally(this._x, this._y, horz, vert)) {
                        this.moveDiagonally(horz, vert);
                        return;
                    };
                    if (this.canPass(this._x, this._y, vert)) {
                        this._y = $gameMap.roundYWithDirection(this._y, vert, s);
                        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), s);
                        this.setDirection(vert);
                        this.increaseSteps();
                        return;
                    }
                } else {
                    if (this.canPass(this._x, this._y, vert, Math.abs(ty))) {
                        this._y = $gameMap.roundYWithDirection(this._y, vert, Math.abs(ty));
                        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), Math.abs(ty));
                        this.setDirection(vert);
                        this.increaseSteps();
                        return;
                    };
                };
            } else {
                var n, m;
                if (vert === 2) {
                    n = $gameMap.roundY(character._y + character._ZPM_triggercenteranchorY
                        - (character.triggerboxheight() / 2)
                        - ds
                        - (this.triggerboxheight() / 2)
                        - this._ZPM_triggercenteranchorY);
                } else {
                    n = $gameMap.roundY(character._y + character._ZPM_triggercenteranchorY
                        + (character.triggerboxheight() / 2)
                        + ds
                        + (this.triggerboxheight() / 2)
                        - this._ZPM_triggercenteranchorY);
                };
                n = Math.abs($gameMap.deltaY(this._y, n));
                m = this._y;
                for (var i = 0; (i * s) < n; i++) {
                    var _y = $gameMap.roundY(m + (vert == 2 ? (i * s) : vert == 8 ? (- i * s) : 0));
                    if (this.canPass(this._x, _y, vert)) {
                        this._y = $gameMap.roundY(_y + (vert == 2 ? s : vert == 8 ? -s : 0));
                    } else {
                        if ((n - i * s) < s) {
                            if (this.canPass(this._x, _y, vert, (n - i * s))) {
                                this._y = $gameMap.roundY(_y + (vert == 2 ? (n - i * s) : vert == 8 ? -(n - i * s) : 0));
                            };
                        };
                        break;
                    };
                };
                if (m != this._y) {
                    n = Math.abs($gameMap.deltaY(this._y, m));
                    if (n > s) {
                        //this.setMoveSpeed($gamePlayer.realMoveSpeed() + 1);
                    };
                    this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert), n);
                    this.setDirection(vert);
                    this.increaseSteps();
                };
                return;
            };
        };
    };
};

Game_Follower.prototype.canPass = function (x, y, d, ds) {
    if (ZPM.SuperMove_TakeOff) {
        return Game_Character.prototype.canPass.call(this, x, y, d);
    };
    var s = 1;
    if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
        s = this.distancePerFrame() * 2;
    };
    if (ZPM.SuperMove_ForceNormalMove) {
        x = Math.floor(x);
        y = Math.floor(y);
    };
    if (ds && ds > 0) {
        s = ds;
    };
    var x2 = $gameMap.roundXWithDirection(x, d, s);
    var y2 = $gameMap.roundYWithDirection(y, d, s);
    if (!this.isSuperMoveValid(x2, y2)) {
        return false;
    };
    if (!this.isMapSuperMovePassable(x, y, d, false, s)) {
        return false;
    };
    if (this.isCollidedWithCharactersbySM(x, y, d, false, s)) {
        return false;
    };
    return true;
};

Game_Follower.prototype.canPassDiagonally = function (x, y, horz, vert, ds) {
    if (ZPM.SuperMove_TakeOff) {
        return Game_Character.prototype.canPassDiagonally.call(this, x, y, horz, vert);
    };
    var s = 1;
    if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
        s = this.distancePerFrame() * 2;
    };
    if (ZPM.SuperMove_ForceNormalMove) {
        x = Math.round(x);
        y = Math.round(y);
    };
    if (ds && ds > 0) {
        s = ds;
    };
    var x2 = $gameMap.roundXWithDirection(x, horz, s);
    var y2 = $gameMap.roundYWithDirection(y, vert, s);
    if (this.canPass(x, y, vert, s) && this.canPass(x, y2, horz, s) && this.canPass(x, y, horz, s) && this.canPass(x2, y, vert, s)) {
        return true;
    }
    return false;
};

var _ZPM_SuperMove_Game_Followers_updateMove = Game_Followers.prototype.updateMove;
Game_Followers.prototype.updateMove = function () {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Followers_updateMove.call(this);
    };
    for (var i = 0; i < this._data.length; i++) {
        var precedingCharacter = (i > 0 ? this._data[i - 1] : $gamePlayer);
        this._data[i].chaseCharacter(precedingCharacter);
    };
};

var _ZPM_SuperMove_Game_Player_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function () {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Player_moveByInput.call(this);
    };
    if (!this.isMoving() && this.canMove()) {
        var direction = this.getInputDirection();
        if (this._ZPM_playerposadjusting) {             //校正状态屏蔽移动信号
            direction = 0;
        };
        if (direction > 0) {
            $gameTemp.clearDestination();
        } else if ($gameTemp.isDestinationValid()) {
            var x = $gameTemp.destinationX();
            var y = $gameTemp.destinationY();
            direction = this.findDirectionTo(x, y);
            if (direction == -1) {
                return;
            };
            if (direction > 0) {
                if (this._ZPM_touchtransfer && !this._ZPM_playerposadjusting) {                   //鼠标传送开关
                    if (this.canTouchTransfer(x, y)) {
                        var angle = this.getAngleDegreesWithXFront($gameMap.deltaX(x, this._x), $gameMap.deltaY(y, this._y), 0, 0);
                        var d = angle >= 45 && angle < 135 ? 2 : angle >= 135 && angle < 225 ? 4
                            : angle >= 225 && angle < 315 ? 8 : 6;
                        if (Imported.ZPM_CharacterAnime) {
                            if (this._ZPM_d8animation) {
                                d = angle > 0 && angle < 90 ? 3 : angle > 90 && angle < 180 ? 1
                                    : angle > 180 && angle < 270 ? 7 : angle > 270 && angle < 360 ? 9 : d;
                            };
                        };
                        this.setDirection(d);
                        this._ZPM_touchtransferclock = 1;       //传送动画计时
                        this._x = x;
                        this._y = y;
                        this.requestAnimation(this._ZPM_touchtransferstartanimationid);
                        $gameTemp.clearDestination();
                        return;
                    } else {
                        $gameTemp.clearDestination();
                    };
                };
            } else {
                this._ZPM_playerposadjusting = false;
            }
        }
        if (direction > 0) {
            this.executeMove(direction);
        }
    }
};

Game_Player.prototype.canTouchTransfer = function (x, y) {
    if (!this.isSuperMoveValid(x, y)) {
        return false;
    };
    if (this.isMapSuperMovePassable(x, y, 2, 3) || this.isMapSuperMovePassable(x, y, 4, 3) ||
        this.isMapSuperMovePassable(x, y, 6, 3) || this.isMapSuperMovePassable(x, y, 8, 3)) {
    } else {
        return false;
    };
    if (this.isCoincidedWithCharacters(x, y)) {
        return false;
    };
    return true;
};

Game_Player.prototype.isTouchTransfering = function () {
    if (this._ZPM_touchtransferclock > 0) {
        return true;
    } else {
        return false;
    };
};

Game_Player.prototype.isTouchTransferFinished = function () {
    if (this._ZPM_touchtransferclock > this._ZPM_touchtransferclocks) {
        this._ZPM_touchtransferclock = 0;
        return true;
    } else {
        return false;
    };
};

Game_Player.prototype.updateMove = function () {
    if (this.isTouchTransfering()) {
        this._ZPM_touchtransferclock++;
        if (this.isTouchTransferFinished()) {
            this._realX = this._x;
            this._realY = this._y;
            this.requestAnimation(this._ZPM_touchtransferendanimationid);
            this._followers.forEach(function (follower) {
                follower._x = this._x;
                follower._y = this._y;
                follower._realX = follower._x;
                follower._realY = follower._y;
            }, this);
            return;
        } else {
            return;
        };
    };
    Game_Character.prototype.updateMove.call(this);
};

Game_Player.prototype.canPass = function (x, y, d, type) {
    if (ZPM.SuperMove_TakeOff) {
        return Game_Character.prototype.canPass.call(this, x, y, d);
    };
    type = type || false;
    if (ZPM.SuperMove_ForceNormalMove) {
        return Game_Character.prototype.canPass.call(this, x, y, d);
    } else {
        var s = 1;
        if (this._ZPM_SuperMove) {
            s = this.distancePerFrame() * 2;
        };
        var x2 = $gameMap.roundXWithDirection(x, d, s);
        var y2 = $gameMap.roundYWithDirection(y, d, s);
        if (!this.isSuperMoveValid(x2, y2)) {
            return false;
        };
        if (this.isThrough() || this.isDebugThrough()) {
            return true;
        };
        if (!this.isMapSuperMovePassable(x, y, d)) {
            if (type) {
                var ds = this.isMapSuperMovePassable(x, y, d, 1);
                if (ds) {
                    if (this.isCollidedWithCharactersbySM(x, y, d)) {
                        var ds1 = this.isCollidedWithCharactersbySM(x, y, d, 1);
                        if (ds1) {
                            if (ds1 === true) {
                                return false;
                            } else {
                                return ds > ds1 ? Number(ds1) : Number(ds);
                            }
                        } else {
                            return Number(ds);
                        }
                    } else {
                        return Number(ds);
                    };
                };
                var d1 = this.isMapSuperMovePassable(x, y, d, 2);
                if (d1) {
                    if (this.isMapSuperMovePassable(x, y, d1)) {
                        if (this.isCollidedWithCharactersbySM(x, y, d1)) {
                            var ds3 = this.isCollidedWithCharactersbySM(x, y, d1, 1);
                            if (ds3) {
                                if (ds3 === true) {
                                    return false;
                                } else {
                                    return Number(d1) + Number(ds3);
                                };
                            } else {
                                return Number(d1);
                            };
                        } else {
                            return Number(d1);
                        };
                    } else {
                        var ds4 = this.isMapSuperMovePassable(x, y, d1, 1);
                        if (ds4) {
                            if (this.isCollidedWithCharactersbySM(x, y, d1)) {
                                var ds5 = this.isCollidedWithCharactersbySM(x, y, d1, 1);
                                if (ds5) {
                                    if (ds5 === true) {
                                        return false;
                                    } else {
                                        return ds4 > ds5 ? Number(ds5) : Number(ds4);
                                    };
                                } else {
                                    return Number(d1) + Number(ds4);
                                };
                            } else {
                                return Number(d1) + Number(ds4);
                            };
                        } else {
                            return false;
                        };
                    };
                };
            };
            return false;
        };
        if (this.isCollidedWithCharactersbySM(x, y, d)) {
            if (type) {
                var ds6 = this.isCollidedWithCharactersbySM(x, y, d, 1);
                if (ds6 && ds6 !== true) {
                    return Number(ds6);
                };
                var d2 = this.isCollidedWithCharactersbySM(x, y, d, 2);
                if (d2) {
                    if (d2 === true) {
                        return false;
                    } else {
                        var d3 = d2 - d2 % 2;
                        if (this.isMapSuperMovePassable(x, y, d3)) {
                            return Number(d2);
                        } else {
                            var ds7 = this.isMapSuperMovePassable(x, y, d3, 1);
                            if (ds7) {
                                var ds8 = d2 - d3;
                                ds8 = ds8 > ds7 ? ds7 : ds8;
                                return Number(d3) + Number(ds8);
                            } else {
                                return false;
                            }
                        };
                    };
                } else {
                    return false;
                };
            } else {
                return false;
            };
        };
        return true;
    };
};

var _ZPM_SuperMove_Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass;
Game_CharacterBase.prototype.canPass = function (x, y, d) {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_CharacterBase_canPass.call(this, x, y, d);
    };
    var s = 1;
    if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
        s = this.distancePerFrame() * 2;
    };
    if (ZPM.SuperMove_ForceNormalMove) {
        x = Math.floor(x);
        y = Math.floor(y);
    };
    var x2 = $gameMap.roundXWithDirection(x, d, s);
    var y2 = $gameMap.roundYWithDirection(y, d, s);
    if (!ZPM.SuperMove_ForceNormalMove) {
        if (!this.isSuperMoveValid(x2, y2)) {
            return false;
        };
        if (this.isThrough() || this.isDebugThrough()) {
            return true;
        };
        if (!this.isMapSuperMovePassable(x, y, d)) {
            return false;
        };
        if (this.isCollidedWithCharactersbySM(x, y, d)) {
            return false;
        };
    } else {
        if (!$gameMap.isValid(x2, y2)) { return false; };
        if (this.isThrough() || this.isDebugThrough()) { return true; };
        if (!this.isMapPassable(x, y, d)) { return false; };
        if (this.isCollidedWithCharacters(x2, y2)) { return false; };
    };
    return true;
};

var _ZPM_SuperMove_Game_CharacterBase_canPassDiagonally = Game_CharacterBase.prototype.canPassDiagonally;
Game_CharacterBase.prototype.canPassDiagonally = function (x, y, horz, vert) {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_CharacterBase_canPassDiagonally.call(this, x, y, horz, vert);
    };
    var s = 1;
    if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
        s = this.distancePerFrame() * 2;
    };
    if (ZPM.SuperMove_ForceNormalMove) {
        x = Math.round(x);
        y = Math.round(y);
    };
    var x2 = $gameMap.roundXWithDirection(x, horz, s);
    var y2 = $gameMap.roundYWithDirection(y, vert, s);
    if (this.canPass(x, y, vert) && this.canPass(x, y2, horz) && this.canPass(x, y, horz) && this.canPass(x2, y, vert)) {
        return true;
    }
    return false;
};

/**
 * @method isSuperMoveValid
 * @memberof Game_CharacterBase
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @desc 通行判定(是否有效坐标),通行判定的判定条件之一,判定目标坐标是否有效.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.isSuperMoveValid = function (x, y) {
    cx = x + this._ZPM_triggercenteranchorX;
    cy = y + this._ZPM_triggercenteranchorY;
    a = $gameMap.roundX(cx - this._ZPM_triggerboxwidth / 2);
    b = $gameMap.roundY(cy - this._ZPM_triggerboxheight / 2);
    c = $gameMap.roundX(cx + this._ZPM_triggerboxwidth / 2);
    d = $gameMap.roundY(cy + this._ZPM_triggerboxheight / 2);
    return a >= 0 && c <= $gameMap.width() && b >= 0 && d <= $gameMap.height();
};

/**
 * @method isSuperMoveValid
 * @memberof Game_Player
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @desc 通行判定(是否有效坐标),如为载具状态则调用载具函数.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_Player.prototype.isSuperMoveValid = function (x, y) {
    var vehicle = this.vehicle();
    if (vehicle) {
        return vehicle.isSuperMoveValid(x, y);
    } else {
        return Game_Character.prototype.isSuperMoveValid.call(this, x, y);
    };
};

/**
 * @method isMapSuperMovePassable
 * @memberof Game_Player
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @param {!Number} d - 方向
 * @param {?Number|Boolean} [type] - 阻挡情况是否寻路,详细说明请查看载具判定及通常判定,null为false.
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(地图通行|玩家角色),通行判定的判定条件之一,判定当前地图坐标玩家角色是否可通行,
 * 如是载具状态,则转载具判定,否则继承通常判定.
 * @summary 新增型
 * @returns {Number|Boolean} 
 */
Game_Player.prototype.isMapSuperMovePassable = function (x, y, d, type, ds) {
    var vehicle = this.vehicle();
    if (vehicle) {
        return vehicle.isMapSuperMovePassable(x, y, d, type, ds);
    } else {
        return Game_Character.prototype.isMapSuperMovePassable.call(this, x, y, d, type, ds);
    };
};

/**
 * @method isMapSuperMovePassable
 * @memberof Game_Vehicle
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @param {!Number} d - 方向
 * @param {?Number|Boolean} [type=false] - 阻挡情况是否寻路,
 * type为1时,当前方向碰撞体边是否与图块对应边重合,不重合时返回两边距离,重合返回false,
 * 注意,当两边距离大于当前角色移动速度时,应为可通行状态,本type状态返回false.
 * type为2时,当前方图块不可通行时,判定相邻边与图块中心最小距离是否小于0.5,
 * 大于时返回false,小于则继续判定该边方向与该图块同轴(根据方向90度旋转)的所有与碰撞体接触
 * 的图块是否可通行,有任意图块不可通行则返回false,否则返回方向数值.
 * type为3时,强制进行当前碰撞体积范围内的通行判定.
 * 其他数值或者null时,type=false.
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(地图通行|载具),通行判定的判定条件之一,判定当前地图坐标载具是否可通行,
 * 如是空艇,则判定为真,如三种载具都不是,则判定为false
 * @summary 新增型
 * @returns {Number|Boolean} 
 */
Game_Vehicle.prototype.isMapSuperMovePassable = function (x, y, d, type, ds) {
    type = type || false;
    if (this.isAirship() || this.isShip() || this.isBoat()) {
        if (this.isAirship()) {
            return true;
        };
        var s = 1;
        if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
            s = this.distancePerFrame() * 2;
        };
        if (ds) {
            s = ds;
        };
        var collidedbl = false;
        var west = $gameMap.roundX(x + this._ZPM_triggercenteranchorX - this._ZPM_triggerboxwidth / 2);
        var east = $gameMap.roundX(x + this._ZPM_triggercenteranchorX + this._ZPM_triggerboxwidth / 2);
        var north = $gameMap.roundY(y + this._ZPM_triggercenteranchorY - this._ZPM_triggerboxheight / 2);
        var south = $gameMap.roundY(y + this._ZPM_triggercenteranchorY + this._ZPM_triggerboxheight / 2);
        var ds = d == 2 ? (Math.ceil(south) - south) : d == 8 ? (north - Math.floor(north))
            : d == 4 ? (west - Math.floor(west)) : d == 6 ? (Math.ceil(east) - east) : false;
        if (type === 1) {
            if (ds != 0 && ds < s) {
                return ds;
            }
            if (ds >= s) {
                return true;
            }
        };
        if (ds < s || type === 3) {
            var x2 = $gameMap.roundXWithDirection(x, d, s);
            var y2 = $gameMap.roundYWithDirection(y, d, s);
            var d2 = this.reverseDir(d);
            var tx = $gameMap.roundX(x + this._ZPM_triggercenteranchorX - this._ZPM_triggerboxwidth / 2);
            var ty = $gameMap.roundY(y + this._ZPM_triggercenteranchorY - this._ZPM_triggerboxheight / 2);
            var tx2 = $gameMap.roundX(x2 + this._ZPM_triggercenteranchorX - this._ZPM_triggerboxwidth / 2);
            var ty2 = $gameMap.roundY(y2 + this._ZPM_triggercenteranchorY - this._ZPM_triggerboxheight / 2);
            var w = tx - parseInt(tx);
            var h = ty - parseInt(ty);
            var w2 = tx2 - parseInt(tx2);
            var h2 = ty2 - parseInt(ty2);
            var bx = Math.floor(tx);
            var by = Math.floor(ty);
            var bx2 = Math.floor(tx2);
            var by2 = Math.floor(ty2);
            for (i = 0; i < this._ZPM_triggerboxwidth + w; i++) {
                for (j = 0; j < this._ZPM_triggerboxheight + h; j++) {
                    var n = $gameMap.roundX(bx + i);
                    var m = $gameMap.roundY(by + j);
                    if (this.isBoat()) {
                        if (!$gameMap.isBoatPassable(n, m, d)) {
                            return false;
                        };
                    };
                    if (this.isShip()) {
                        if (!$gameMap.isShipPassable(n, m, d)) {
                            return false;
                        };
                    };
                };
                if (type === 3) {
                    return true;
                };
            };
            if (d === 4 || d === 6) {
                for (j = 0; j < this._ZPM_triggerboxheight + h2; j++) {
                    var n = $gameMap.roundX(bx2 + (d === 4 ? 0 : d === 6 ? Math.ceil(this._ZPM_triggerboxwidth - 1 + w2) : 0));
                    var m = $gameMap.roundY(by2 + j);
                    if (this.isBoat()) {
                        if (!$gameMap.isBoatPassable(n, m, d2)) {
                            if (type === 2) {
                                var dsy = $gameMap.deltaY((y + this._ZPM_triggercenteranchorY), (m + 0.5));
                                if (Math.abs(dsy) >= (this.triggerboxheight() >= 1 ? this.triggerboxheight() / 2 : 0.5)) {
                                    var y3 = $gameMap.roundY(y + (dsy > 0 ? (Math.ceil(south) - south) : (Math.floor(north) - north)));
                                    if (this.isCollidedWithCharactersbySM(x, y3, d, 1) === true) {
                                        return false;
                                    };
                                    if (dsy > 0) {
                                        for (testcollide = 0; testcollide < this.triggerboxheight(); testcollide++) {
                                            if (!$gameMap.isBoatPassable(n, $gameMap.roundY(m + testcollide + 1), d2)) {
                                                collidedbl = true;
                                                break;
                                            }
                                        };
                                        if (collidedbl) {
                                            return false;
                                        } else {
                                            return 2;
                                        }
                                    } else if (dsy < 0) {
                                        for (testcollide = 0; testcollide < this.triggerboxheight(); testcollide++) {
                                            if (!$gameMap.isBoatPassable(n, $gameMap.roundY(m - testcollide - 1), d2)) {
                                                collidedbl = true;
                                                break;
                                            }
                                        };
                                        if (collidedbl) {
                                            return false;
                                        } else {
                                            return 8;
                                        }
                                    } else {
                                        return false;
                                    };
                                } else {
                                    return false;
                                };
                            };
                            return false;
                        };
                    };
                    if (this.isShip()) {
                        if (!$gameMap.isShipPassable(n, m, d2)) {
                            if (type === 2) {
                                var dsy = $gameMap.deltaY((y + this._ZPM_triggercenteranchorY), (m + 0.5));
                                if (Math.abs(dsy) >= (this.triggerboxheight() >= 1 ? this.triggerboxheight() / 2 : 0.5)) {
                                    var y3 = $gameMap.roundY(y + (dsy > 0 ? (Math.ceil(south) - south) : (Math.floor(north) - north)));
                                    if (this.isCollidedWithCharactersbySM(x, y3, d, 1) === true) {
                                        return false;
                                    };
                                    if (dsy > 0) {
                                        for (testcollide = 0; testcollide < this.triggerboxheight(); testcollide++) {
                                            if (!$gameMap.isShipPassable(n, $gameMap.roundY(m + testcollide + 1), d2)) {
                                                collidedbl = true;
                                                break;
                                            }
                                        };
                                        if (collidedbl) {
                                            return false;
                                        } else {
                                            return 2;
                                        }
                                    } else if (dsy < 0) {
                                        for (testcollide = 0; testcollide < this.triggerboxheight(); testcollide++) {
                                            if (!$gameMap.isShipPassable(n, $gameMap.roundY(m - testcollide - 1), d2)) {
                                                collidedbl = true;
                                                break;
                                            }
                                        };
                                        if (collidedbl) {
                                            return false;
                                        } else {
                                            return 8;
                                        }
                                    } else {
                                        return false;
                                    };
                                } else {
                                    return false;
                                };
                            };
                            return false;
                        };
                    };
                };
            };
            if (d === 2 || d === 8) {
                for (i = 0; i < this._ZPM_triggerboxwidth + w2; i++) {
                    var n = $gameMap.roundX(bx2 + i);
                    var m = $gameMap.roundY(by2 + (d === 8 ? 0 : d === 2 ? Math.ceil(this._ZPM_triggerboxheight - 1 + h2) : 0));
                    if (this.isBoat()) {
                        if (!$gameMap.isBoatPassable(n, m, d2)) {
                            if (type === 2) {
                                var dsx = $gameMap.deltaX((x + this._ZPM_triggercenteranchorX), (n + 0.5));
                                if (Math.abs(dsx) >= (this.triggerboxwidth() >= 1 ? this.triggerboxwidth() / 2 : 0.5)) {
                                    var x3 = $gameMap.roundX(x + (dsx > 0 ? (Math.ceil(east) - east) : (Math.floor(west) - west)));
                                    if (this.isCollidedWithCharactersbySM(x3, y, d, 1) === true) {
                                        return false;
                                    };
                                    if (dsx > 0) {
                                        for (testcollide = 0; testcollide < this.triggerboxwidth(); testcollide++) {
                                            if (!$gameMap.isBoatPassable($gameMap.roundX(n + testcollide + 1), m, d2)) {
                                                collidedbl = true;
                                                break;
                                            }
                                        };
                                        if (collidedbl) {
                                            return false;
                                        } else {
                                            return 6;
                                        }
                                    } else if (dsx < 0) {
                                        for (testcollide = 0; testcollide < this.triggerboxwidth(); testcollide++) {
                                            if (!$gameMap.isBoatPassable($gameMap.roundX(n - testcollide - 1), m, d2)) {
                                                collidedbl = true;
                                                break;
                                            }
                                        };
                                        if (collidedbl) {
                                            return false;
                                        } else {
                                            return 4;
                                        }
                                    } else {
                                        return false;
                                    };
                                } else {
                                    return false;
                                };
                            };
                            return false;
                        };
                    };
                    if (this.isShip()) {
                        if (!$gameMap.isShipPassable(n, m, d2)) {
                            if (type === 2) {
                                var dsx = $gameMap.deltaX((x + this._ZPM_triggercenteranchorX), (n + 0.5));
                                if (Math.abs(dsx) >= (this.triggerboxwidth() >= 1 ? this.triggerboxwidth() / 2 : 0.5)) {
                                    var x3 = $gameMap.roundX(x + (dsx > 0 ? (Math.ceil(east) - east) : (Math.floor(west) - west)));
                                    if (this.isCollidedWithCharactersbySM(x3, y, d, 1) === true) {
                                        return false;
                                    };
                                    if (dsx > 0) {
                                        for (testcollide = 0; testcollide < this.triggerboxwidth(); testcollide++) {
                                            if (!$gameMap.isShipPassable($gameMap.roundX(n + testcollide + 1), m, d2)) {
                                                collidedbl = true;
                                                break;
                                            }
                                        };
                                        if (collidedbl) {
                                            return false;
                                        } else {
                                            return 6;
                                        }
                                    } else if (dsx < 0) {
                                        for (testcollide = 0; testcollide < this.triggerboxwidth(); testcollide++) {
                                            if (!$gameMap.isShipPassable($gameMap.roundX(n - testcollide - 1), m, d2)) {
                                                collidedbl = true;
                                                break;
                                            }
                                        };
                                        if (collidedbl) {
                                            return false;
                                        } else {
                                            return 4;
                                        }
                                    } else {
                                        return false;
                                    };
                                } else {
                                    return false;
                                };
                            };
                            return false;
                        };
                    };
                };
            };
            return true;
        } else {
            return true;
        }
    } else {
        return false;
    };
};

/**
 * @method isMapSuperMovePassable
 * @memberof Game_CharacterBase
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @param {!Number} d - 方向
 * @param {?Number|Boolean} [type=false] - 阻挡情况是否寻路,
 * type为1时,当前方向碰撞体边是否与图块对应边重合,不重合时返回两边距离,重合返回false,
 * 注意,当两边距离大于当前角色移动速度时,应为可通行状态,本type状态返回false.
 * type为2时,当前方图块不可通行时,判定相邻边与图块中心最小距离是否小于0.5,
 * 大于时返回false,小于则继续判定该边方向与该图块同轴(根据方向90度旋转)的所有与碰撞体接触
 * 的图块是否可通行,有任意图块不可通行则返回false,否则返回方向数值.
 * type为3时,强制进行当前碰撞体积范围内的通行判定.
 * 其他数值或者null时,type=false.
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(地图通行|通常判定),通行判定的判定条件之一,判定当前地图坐标角色是否可通行
 * 玩家角色和载具的判定有专用判定方法.
 * @summary 新增型
 * @returns {Number|Boolean} 
 */
Game_CharacterBase.prototype.isMapSuperMovePassable = function (x, y, d, type, ds) {
    type = type || false;
    var s = 1;
    if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
        s = this.distancePerFrame() * 2;
    };
    if (ds) {
        s = ds;
    };
    var collidedbl = false;
    var west = $gameMap.roundX(x + this._ZPM_triggercenteranchorX - this._ZPM_triggerboxwidth / 2);
    var east = $gameMap.roundX(x + this._ZPM_triggercenteranchorX + this._ZPM_triggerboxwidth / 2);
    var north = $gameMap.roundY(y + this._ZPM_triggercenteranchorY - this._ZPM_triggerboxheight / 2);
    var south = $gameMap.roundY(y + this._ZPM_triggercenteranchorY + this._ZPM_triggerboxheight / 2);
    var ds = d == 2 ? (Math.ceil(south) - south) : d == 8 ? (north - Math.floor(north))
        : d == 4 ? (west - Math.floor(west)) : d == 6 ? (Math.ceil(east) - east) : false;
    if (type === 1) {
        if (ds != 0 && ds < s) {
            return ds;
        }
        if (ds >= s) {
            return true;
        }
    };
    if (ds < s || type === 3) {
        var x2 = $gameMap.roundXWithDirection(x, d, s);
        var y2 = $gameMap.roundYWithDirection(y, d, s);
        var d2 = this.reverseDir(d);
        var tx = $gameMap.roundX(x + this._ZPM_triggercenteranchorX - this._ZPM_triggerboxwidth / 2);
        var ty = $gameMap.roundY(y + this._ZPM_triggercenteranchorY - this._ZPM_triggerboxheight / 2);
        var tx2 = $gameMap.roundX(x2 + this._ZPM_triggercenteranchorX - this._ZPM_triggerboxwidth / 2);
        var ty2 = $gameMap.roundY(y2 + this._ZPM_triggercenteranchorY - this._ZPM_triggerboxheight / 2);
        var w = tx - parseInt(tx);
        var h = ty - parseInt(ty);
        var w2 = tx2 - parseInt(tx2);
        var h2 = ty2 - parseInt(ty2);
        var bx = Math.floor(tx);
        var by = Math.floor(ty);
        var bx2 = Math.floor(tx2);
        var by2 = Math.floor(ty2);
        for (i = 0; i < this._ZPM_triggerboxwidth + w; i++) {
            for (j = 0; j < this._ZPM_triggerboxheight + h; j++) {
                var n = $gameMap.roundX(bx + i);
                var m = $gameMap.roundY(by + j);
                if (!$gameMap.isPassable(n, m, d)) {
                    return false;
                };
            };
            if (type === 3) {
                return true;
            };
        };
        if (d === 4 || d === 6) {
            for (j = 0; j < this._ZPM_triggerboxheight + h2; j++) {
                var n = $gameMap.roundX(bx2 + (d === 4 ? 0 : d === 6 ? Math.ceil(this._ZPM_triggerboxwidth - 1 + w2) : 0));
                var m = $gameMap.roundY(by2 + j);
                if (!$gameMap.isPassable(n, m, d2)) {
                    if (type === 2) {
                        var dsy = $gameMap.deltaY((y + this._ZPM_triggercenteranchorY), (m + 0.5));
                        if (Math.abs(dsy) >= (this.triggerboxheight() >= 1 ? this.triggerboxheight() / 2 : 0.5)) {
                            var y3 = $gameMap.roundY(y + (dsy > 0 ? (Math.ceil(south) - south) : (Math.floor(north) - north)));
                            if (this.isCollidedWithCharactersbySM(x, y3, d, 1) === true) {
                                return false;
                            };
                            if (dsy > 0) {
                                for (testcollide = 0; testcollide < this.triggerboxheight(); testcollide++) {
                                    if (!$gameMap.isPassable(n, $gameMap.roundY(m + testcollide + 1), d2)) {
                                        collidedbl = true;
                                        break;
                                    }
                                };
                                if (collidedbl) {
                                    return false;
                                } else {
                                    return 2;
                                }
                            } else if (dsy < 0) {
                                for (testcollide = 0; testcollide < this.triggerboxheight(); testcollide++) {
                                    if (!$gameMap.isPassable(n, $gameMap.roundY(m - testcollide - 1), d2)) {
                                        collidedbl = true;
                                        break;
                                    }
                                };
                                if (collidedbl) {
                                    return false;
                                } else {
                                    return 8;
                                }
                            } else {
                                return false;
                            };
                        } else {
                            return false;
                        };
                    };
                    return false;
                };
            };
        };
        if (d === 2 || d === 8) {
            for (i = 0; i < this._ZPM_triggerboxwidth + w2; i++) {
                var n = $gameMap.roundX(bx2 + i);
                var m = $gameMap.roundY(by2 + (d === 8 ? 0 : d === 2 ? Math.ceil(this._ZPM_triggerboxheight - 1 + h2) : 0));
                if (!$gameMap.isPassable(n, m, d2)) {
                    if (type === 2) {
                        var dsx = $gameMap.deltaX((x + this._ZPM_triggercenteranchorX), (n + 0.5));
                        if (Math.abs(dsx) >= (this.triggerboxwidth() >= 1 ? this.triggerboxwidth() / 2 : 0.5)) {
                            var x3 = $gameMap.roundX(x + (dsx > 0 ? (Math.ceil(east) - east) : (Math.floor(west) - west)));
                            if (this.isCollidedWithCharactersbySM(x3, y, d, 1) === true) {
                                return false;
                            };
                            if (dsx > 0) {
                                for (testcollide = 0; testcollide < this.triggerboxwidth(); testcollide++) {
                                    if (!$gameMap.isPassable($gameMap.roundX(n + testcollide + 1), m, d2)) {
                                        collidedbl = true;
                                        break;
                                    }
                                };
                                if (collidedbl) {
                                    return false;
                                } else {
                                    return 6;
                                }
                            } else if (dsx < 0) {
                                for (testcollide = 0; testcollide < this.triggerboxwidth(); testcollide++) {
                                    if (!$gameMap.isPassable($gameMap.roundX(n - testcollide - 1), m, d2)) {
                                        collidedbl = true;
                                        break;
                                    }
                                };
                                if (collidedbl) {
                                    return false;
                                } else {
                                    return 4;
                                }
                            } else {
                                return false;
                            };
                        } else {
                            return false;
                        };
                    };
                    return false;
                };
            }
        };
        return true;
    } else {
        return true;
    };
};

/**
 * @method isCollidedWithCharactersbySM
 * @memberof Game_Event
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @param {!Number} d - 方向
 * @param {?Boolean} [type] - 仅作为规范格式使用.
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(角色阻挡|事件专用汇总),包含阻挡判定的各种子判定函数
 * 相比通常用汇总,多一个针对玩家角色的判定函数.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_Event.prototype.isCollidedWithCharactersbySM = function (x, y, d, type, ds) {
    return this.isCollidedWithPlayerCharactersbySM(x, y, d, ds) || this.isCollidedWithVehiclesbySM(x, y, d, ds) || this.isCollidedWithEventsbySM(x, y, d, ds);
};

/**
 * @method isCollidedWithCharactersbySM
 * @memberof Game_Player
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @param {!Number} d - 方向
 * @param {?Boolean} [type] - 阻挡情况是否寻路,详细说明请查看子判定,null为false.
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(角色阻挡|通常用汇总),包含阻挡判定的各种子判定函数(玩家专用).
 * @summary 新增型
 * @returns {Number|Boolean} 
 */
Game_Player.prototype.isCollidedWithCharactersbySM = function (x, y, d, type, ds) {
    var vehicle = this.vehicle();
    if (vehicle) {
        if (ZPM.SuperMove_ForceNormalMove) {
            return vehicle.isCollidedWithCharactersbySM(x, y, d, ds);
        } else {
            return vehicle.isCollidedWithCharactersbySM(x, y, d, type, ds);
        };
    } else {
        if (ZPM.SuperMove_ForceNormalMove) {
            return Game_Character.prototype.isCollidedWithCharactersbySM.call(this, x, y, d, ds);
        } else {
            var bl1 = this.isCollidedWithVehiclesbySM(x, y, d, ds);
            if (bl1) {
                return true;
            } else {
                var bl2 = this.isCollidedWithEventsbySM(x, y, d, false, ds);
                if (bl2) {
                    if (type) {
                        if (type === 1) {
                            var bl3 = this.isCollidedWithEventsbySM(x, y, d, 1);
                            if (bl3) {
                                if (bl3 === true) {
                                    return true;
                                } else {
                                    return bl3;
                                };
                            } else {
                                return true;
                            };
                        };
                        if (type === 2) {
                            var bl4 = this.isCollidedWithEventsbySM(x, y, d, 2);
                            if (bl4) {
                                if (bl4 === true) {
                                    return true;
                                } else {
                                    var d2 = bl4 - (bl4 % 2);
                                    if (this.isCollidedWithVehiclesbySM(x, y, d2)) {
                                        return true;
                                    } else {
                                        return bl4;
                                    };
                                };
                            } else {
                                return true;
                            };
                        };
                        return true;
                    } else {
                        return true;
                    };
                } else {
                    return false;
                };
            };
        };
    };
};

/**
 * @method isCollidedWithCharactersbySM
 * @memberof Game_Vehicle
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @param {!Number} d - 方向
 * @param {?Boolean} [type] - 阻挡情况是否寻路,详细说明请查看子判定,null为false.
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(角色阻挡|通常用汇总),包含阻挡判定的各种子判定函数(载具专用).
 * @summary 新增型
 * @returns {Number|Boolean} 
 */
Game_Vehicle.prototype.isCollidedWithCharactersbySM = function (x, y, d, type, ds) {
    if (ZPM.SuperMove_ForceNormalMove) {
        return Game_Character.prototype.isCollidedWithCharactersbySM.call(this, x, y, d, ds);
    } else {
        var bl1 = this.isCollidedWithVehiclesbySM(x, y, d, ds);
        if (bl1) {
            return true;
        } else {
            var bl2 = this.isCollidedWithEventsbySM(x, y, d, false, ds);
            if (bl2) {
                if (type) {
                    if (type === 1) {
                        var bl3 = this.isCollidedWithEventsbySM(x, y, d, 1);
                        if (bl3) {
                            if (bl3 === true) {
                                return true;
                            } else {
                                return bl3;
                            };
                        } else {
                            return true;
                        };
                    };
                    if (type === 2) {
                        var bl4 = this.isCollidedWithEventsbySM(x, y, d, 2);
                        if (bl4) {
                            if (bl4 === true) {
                                return true;
                            } else {
                                var d2 = bl4 - (bl4 % 2);
                                if (this.isCollidedWithVehiclesbySM(x, y, d2)) {
                                    return true;
                                } else {
                                    return bl4;
                                };
                            };
                        } else {
                            return true;
                        };
                    };
                    return true;
                } else {
                    return true;
                };
            } else {
                return false;
            };
        };
    };
};

/**
 * @method isCollidedWithCharactersbySM
 * @memberof Game_CharacterBase
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @param {!Number} d - 方向
 * @param {?Boolean} [type] - 特定判定参数.
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(角色阻挡|通常用汇总),包含阻挡判定的各种子判定函数.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.isCollidedWithCharactersbySM = function (x, y, d, type, ds) {
    return this.isCollidedWithVehiclesbySM(x, y, d, ds) || this.isCollidedWithEventsbySM(x, y, d, type, ds);
};

/**
 * @method isCoincidedWithCharacters
 * @memberof Game_CharacterBase
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @desc 重合判定(基础型),是否与事件或者载具坐标重合.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.isCoincidedWithCharacters = function (x, y) {
    return this.isCoincidedWithVehicles(x, y) || this.isCoincidedWithEvents(x, y);
};

/**
 * @method isCoincidedWithEvents
 * @memberof Game_CharacterBase
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @desc 重合判定(子判定一:事件重合判定)(基础型).
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.isCoincidedWithEvents = function (x, y) {
    var events = $gameMap.events();
    return events.some(function (event) {
        if (event._pageIndex >= 0) {
            var bl = !event.isThrough() && this.isSomethingOverlaped(x, y, event) && event.isNormalPriority();
            return bl;
        } else {
            return false;
        }
    }, this);
};

/**
 * @method isCoincidedWithEvents
 * @memberof Game_Event
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @desc 重合判定(子判定一:事件重合判定)(事件用).
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_Event.prototype.isCoincidedWithEvents = function (x, y) {
    var e0 = $gameMap._events;
    var events = e0.slice(0);
    events.splice(this._eventId, 1);
    return events.some(function (event) {
        if (event._pageIndex >= 0) {
            var bl = !event.isThrough() && this.isSomethingOverlaped(x, y, event) && event.isNormalPriority();
            return bl;
        } else {
            return false;
        }
    }, this);
};

/**
 * @method isCoincidedWithVehicles
 * @memberof Game_CharacterBase
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @desc 重合判定(子判定二:载具重合判定)(基础型),是否与载具坐标重合.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.isCoincidedWithVehicles = function (x, y) {
    var boat = $gameMap.boat();
    var ship = $gameMap.ship();
    var bb = false;
    var bs = false;
    if (boat._mapId === $gameMap.mapId()) {
        bb = this.isSomethingOverlaped(x, y, boat);
    };
    if (ship._mapId === $gameMap.mapId()) {
        bs = this.isSomethingOverlaped(x, y, ship);
    };
    return (bb && !boat.isThrough()) || (bs && !ship.isThrough())
};

/**
 * @method isCoincidedWithVehicles
 * @memberof Game_Player
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @desc 重合判定(子判定二:载具重合判定)(玩家用),是否与载具坐标重合.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_Player.prototype.isCoincidedWithVehicles = function (x, y) {
    if (this.isInVehicle()) {
        return true;
    }
    var boat = $gameMap.boat();
    var ship = $gameMap.ship();
    var bb = false;
    var bs = false;
    if (boat._mapId === $gameMap.mapId()) {
        bb = this.isSomethingOverlaped(x, y, boat);
    };
    if (ship._mapId === $gameMap.mapId()) {
        bs = this.isSomethingOverlaped(x, y, ship);
    };
    return (bb && !boat.isThrough()) || (bs && !ship.isThrough())
};

/**
 * @method isCollidedWithSomethingbySM
 * @memberof Game_CharacterBase
 * @param {!Number} x 坐标X
 * @param {!Number} y 坐标Y
 * @param {!Number} d 方向
 * @param {!Object} obj 对象
 * @param {?Number|Boolean} [ds=false] 距离补正,如使用补正,必须为有效数字,可为小数.
 * @desc 距离及方向判定,是否相邻或者重合
 * @summary 新增型
 * @returns {Number|Boolean} 
 */
Game_CharacterBase.prototype.isCollidedWithSomethingbySM = function (x, y, d, obj, ds) {
    ds = ds ? Math.abs(ds) : false;
    var s = 1;
    if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
        s = this.distancePerFrame() * 2;
    };
    if (this._ZPM_triggercenter) {
        var tx = $gameMap.deltaX((x + this._ZPM_triggercenteranchorX), obj.triggerboxcentertargetX());
        var ty = $gameMap.deltaY((y + this._ZPM_triggercenteranchorY), obj.triggerboxcentertargetY());
    } else {
        var tx = $gameMap.deltaX((x + this._ZPM_triggercenteranchorX), obj.triggerboxcenterrealX());
        var ty = $gameMap.deltaY((y + this._ZPM_triggercenteranchorY), obj.triggerboxcenterrealY());
    };
    var dx = Math.abs(tx) - obj.triggerboxwidth() / 2 - this.triggerboxwidth() / 2;
    var dy = Math.abs(ty) - obj.triggerboxheight() / 2 - this.triggerboxheight() / 2;
    var bl;
    if (ds) {
        switch (d) {
            case 1:
            case 2:
                bl = dy < ds && dx < 0 && ty < 0 ? dy : false;
                break;
            case 4:
            case 7:
                bl = dx < ds && dy < 0 && tx > 0 ? dx : false;
                break;
            case 3:
            case 6:
                bl = dx < ds && dy < 0 && tx < 0 ? dx : false;
                break;
            case 8:
            case 9:
                bl = dy < ds && dx < 0 && ty > 0 ? dy : false;
                break;
            default:
                return false;
        };
        if (bl === false) {
            return false;
        } else {
            if (bl > 0) {
                return bl;
            } else {
                return true;
            }
        };
    } else {
        switch (d) {
            case 1:
            case 2:
                bl = dy < s && dx < 0 && ty < 0 ? dy : false;
                break;
            case 4:
            case 7:
                bl = dx < s && dy < 0 && tx > 0 ? dx : false;
                break;
            case 3:
            case 6:
                bl = dx < s && dy < 0 && tx < 0 ? dx : false;
                break;
            case 8:
            case 9:
                bl = dy < s && dx < 0 && ty > 0 ? dy : false;
                break;
            default:
                return false;
        };
        if (bl === false) {
            return false;
        } else {
            if (bl > 0) {
                return bl;
            } else {
                return true;
            }
        };
    };
};

/**
 * @method isCollidedWithEventsbySM
 * @memberof Game_CharacterBase
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @param {!Number} d - 方向
 * @param {?Number|Boolean} [type] - 阻挡情况是否寻路,
 * type为1时,当前方向碰撞体边是否与事件对应边重合,不重合时返回两边距离,重合返回true,
 * 注意,当两边距离大于当前角色移动速度时,应为可通行状态,本type状态返回常规判定值.
 * type为2时,当前事件阻挡时,判定相邻边与事件碰撞体中心最小距离是否小于事件对应边长/2,
 * 大于时返回true,小于则继续判定该边方向与该事件同轴(根据方向90度旋转)是否有其他事件阻挡,
 * 有阻挡则返回true,无阻挡时,再次根据前一步的方向进行type1型判定
 * 其他数值或者null时,type=false.
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(角色阻挡|通常用事件判定),通行判定的判定条件之一,判定是否有事件阻挡.
 * @summary 新增型
 * @returns {Number|Boolean} 
 */
Game_CharacterBase.prototype.isCollidedWithEventsbySM = function (x, y, d, type, ds) {
    var events = $gameMap.events();
    var ex, ey, eanchorX, eanchorY, tx, ty, eh, ew, ds;
    var bl1 = events.some(function (event) {
        if (event._pageIndex >= 0) {
            var bl = !event.isThrough() && this.isCollidedWithSomethingbySM(x, y, d, event, ds) && event.isNormalPriority();
            if (bl && type) {
                ew = event.triggerboxwidth();
                eh = event.triggerboxheight();
                ex = event._x;
                ey = event._y;
                eanchorX = event._ZPM_triggercenteranchorX;
                eanchorY = event._ZPM_triggercenteranchorY;
                tx = $gameMap.deltaX((x + this._ZPM_triggercenteranchorX), event.triggerboxcentertargetX());
                ty = $gameMap.deltaY((y + this._ZPM_triggercenteranchorY), event.triggerboxcentertargetY());
                ds = this.isCollidedWithSomethingbySM(x, y, d, event);
            };
            if (bl) {
                if (Imported.Drill_EventThrough) {                      //兼容钻头的事件穿透关系
                    if (this.drill_ETh_hasThroughTag()) {
                        if (event.drill_ETh_canThroughTagList(Object.keys(this._drill_ETh_char))) {
                            return !event.canPass(event._x, event._y, d);
                        }
                    }
                };
            };
            return bl;
        } else {
            return false;
        }
    }, this);
    if (bl1) {
        if (type === 1) {
            if (ds === true) {
                return true;
            } else {
                do {
                    var bl = events.some(function (event) {
                        if (event._pageIndex >= 0) {
                            var bl = !event.isThrough() && this.isCollidedWithSomethingbySM(x, y, d, event, ds) && event.isNormalPriority();
                            if (bl) {
                                ds = this.isCollidedWithSomethingbySM(x, y, d, event, ds);
                            };
                            return bl;
                        } else {
                            return false;
                        }
                    }, this);
                }
                while (bl && ds !== true);
                if (ds === true) {
                    return true;
                } else {
                    return ds;
                };
            };
        };
        if (type === 2) {
            var bl2 = events.some(function (event) {
                if (event._pageIndex >= 0) {
                    var bl = !event.isThrough() && this.isCollidedWithSomethingbySM(x, y, d, event) && event.isNormalPriority();
                    return bl && ((event._x != ex) || (event._y != ey));
                } else {
                    return false;
                }
            }, this);
            if (bl2) {
                return true;
            };
            var d2 = 0;
            if (d == 2 || d == 8) {
                if ((Math.abs(tx) >= ((this.triggerboxwidth() / 2) + (ew < 1 ? 0 : (ew / 2) - 0.5))) && (Math.abs(tx) >= ew / 2)) {
                    d2 = tx > 0 ? 6 : 4;
                } else {
                    return true;
                };
            };
            if (d == 4 || d == 6) {
                if (Math.abs(ty) >= ((this.triggerboxheight() / 2) + (eh < 1 ? 0 : (eh / 2) - 0.5)) && (Math.abs(ty) >= eh / 2)) {
                    d2 = ty > 0 ? 2 : 8;
                } else {
                    return true;
                };
            };
            var west = $gameMap.roundX(x + this._ZPM_triggercenteranchorX - this._ZPM_triggerboxwidth / 2);
            var east = $gameMap.roundX(x + this._ZPM_triggercenteranchorX + this._ZPM_triggerboxwidth / 2);
            var north = $gameMap.roundY(y + this._ZPM_triggercenteranchorY - this._ZPM_triggerboxheight / 2);
            var south = $gameMap.roundY(y + this._ZPM_triggercenteranchorY + this._ZPM_triggerboxheight / 2);
            var ewest = $gameMap.roundX(ex + eanchorX - ew / 2);
            var eeast = $gameMap.roundX(ex + eanchorX + ew / 2);
            var enorth = $gameMap.roundY(ey + eanchorY - eh / 2);
            var esouth = $gameMap.roundY(ey + eanchorY + eh / 2);
            var x2, y2;
            switch (d2) {
                case 2:
                    x2 = x;
                    y2 = $gameMap.roundY(y + Math.abs(esouth - north));
                    break;
                case 8:
                    x2 = x;
                    y2 = $gameMap.roundY(y - Math.abs(south - enorth));
                    break;
                case 4:
                    x2 = $gameMap.roundX(x - Math.abs(east - ewest));
                    y2 = y;
                    break;
                case 6:
                    x2 = $gameMap.roundX(x + Math.abs(eeast - west));
                    y2 = y;
                    break;
                default:
                    break;
            }
            if (!this.isMapSuperMovePassable(x2, y2, d, 1)) {
                return true;
            }
            var bl3 = events.some(function (event) {
                if (event._pageIndex >= 0) {
                    var bl = !event.isThrough() && this.isCollidedWithSomethingbySM(x, y, d2, event) && event.isNormalPriority();
                    if (bl) {
                        ds = this.isCollidedWithSomethingbySM(x, y, d2, event);
                    };
                    return bl;
                } else {
                    return false;
                }
            }, this);
            if (bl3) {
                if (ds === true) {
                    return true;
                } else {
                    do {
                        var bl = events.some(function (event) {
                            if (event._pageIndex >= 0) {
                                var bl = !event.isThrough() && this.isCollidedWithSomethingbySM(x, y, d2, event, ds) && event.isNormalPriority();
                                if (bl) {
                                    ds = this.isCollidedWithSomethingbySM(x, y, d2, event, ds);
                                };
                                return bl;
                            } else {
                                return false;
                            }
                        }, this);
                    }
                    while (bl && ds !== true);
                    if (ds === true) {
                        return true;
                    } else {
                        return ds + d2;
                    };
                };
            } else {
                return d2;
            }
        };
    };
    return bl1;
};

/**
 * @method isCollidedWithEventsbySM
 * @memberof Game_Event
 * @param {!Number} x 坐标X
 * @param {!Number} y 坐标Y
 * @param {!Number} d 方向
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(角色阻挡|事件专用事件判定),通行判定的判定条件之一,判定当前方向是否有事件阻挡物.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_Event.prototype.isCollidedWithEventsbySM = function (x, y, d, ds) {
    var e0 = $gameMap._events;
    var events = e0.slice(0);
    events.splice(this._eventId, 1);
    events = events.filter(function (event) {
        return !!event;
    });
    return events.some(function (event) {
        if (event._pageIndex >= 0) {
            var bl = !event.isThrough() && this.isCollidedWithSomethingbySM(x, y, d, event, ds) && event.isNormalPriority();
            if (bl) {
                if (Imported.Drill_EventThrough) {                      //兼容钻头的事件穿透关系
                    if (this.drill_ETh_hasThroughTag()) {
                        if (event.drill_ETh_canThroughTagList(Object.keys(this._drill_ETh_char))) {
                            return !event.canPass(event._x, event._y, d);
                        }
                    }
                };
            };
            return bl;
        } else {
            return false;
        }
    }, this);
};

/**
 * @method isCollidedWithVehiclesbySM
 * @memberof Game_Event
 * @param {!Number} x 坐标X
 * @param {!Number} y 坐标Y
 * @param {!Number} d 方向
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(角色阻挡|通常用载具判定),通行判定的判定条件之一,判定当前方向是否有载具阻挡物.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.isCollidedWithVehiclesbySM = function (x, y, d, ds) {
    var boat = $gameMap.boat();
    var ship = $gameMap.ship();
    var bb = false;
    var bs = false;
    if (boat._mapId === $gameMap.mapId()) {
        bb = this.isCollidedWithSomethingbySM(x, y, d, boat, ds);
    };
    if (ship._mapId === $gameMap.mapId()) {
        bs = this.isCollidedWithSomethingbySM(x, y, d, ship, ds);
    };
    return (bb && !boat.isThrough()) || (bs && !ship.isThrough())
};

/**
 * @method isCollidedWithVehiclesbySM
 * @memberof Game_Vehicle
 * @param {!Number} x 坐标X
 * @param {!Number} y 坐标Y
 * @param {!Number} d 方向
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(角色阻挡|通常用载具判定),通行判定的判定条件之一,判定当前方向是否有载具阻挡物,载具专用.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_Vehicle.prototype.isCollidedWithVehiclesbySM = function (x, y, d, ds) {
    var boat = $gameMap.boat();
    var ship = $gameMap.ship();
    var bb = false;
    var bs = false;
    if ($gamePlayer.isInShip()) {
        if (boat._mapId === $gameMap.mapId()) {
            bb = this.isCollidedWithSomethingbySM(x, y, d, boat, ds);
            return bb && true;
        } else {
            return false;
        }
    };
    if ($gamePlayer.isInBoat()) {
        if (ship._mapId === $gameMap.mapId()) {
            bs = this.isCollidedWithSomethingbySM(x, y, d, ship, ds);
            return bs && true;
        } else {
            return false;
        }
    };
    return false;
};

/**
 * @method isCollidedWithPlayerCharactersbySM
 * @memberof Game_Event
 * @param {!Number} x 坐标X
 * @param {!Number} y 坐标Y
 * @param {!Number} d 方向
 * @param {?Number} [ds] - 间隔距离,特定判定时才使用的参数.
 * @desc 通行判定(角色阻挡|事件专用玩家角色判定),通行判定的判定条件之一,判定当前方向是否有玩家角色阻挡物.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_Event.prototype.isCollidedWithPlayerCharactersbySM = function (x, y, d, ds) {
    var gp = $gamePlayer;
    if (gp.isThrough()) {
        return false;
    };
    var bp = this.isCollidedWithSomethingbySM(x, y, d, gp, ds);
    var gpf = gp._followers.visibleFollowers();
    var bf = gpf.some(function (follower) {
        return this.isCollidedWithSomethingbySM(x, y, d, follower, ds);
    }, this);
    if (Imported.Drill_EventThrough) {                      //兼容钻头的事件穿透关系
        if (this.drill_ETh_hasThroughTag()) {
            return (bp || bf) && this.isNormalPriority() && !this.isThrough() && !this.drill_ETh_canThroughTagList(Object.keys($gamePlayer._drill_ETh_char));
        }
    };
    return (bp || bf) && this.isNormalPriority() && !this.isThrough();
};

Game_Character.prototype.moveRandom = function () {
    var d = 2 + Math.randomInt(4) * 2;
    if (ZPM.SuperMove_ForceNormalMove) {
        this._x = Math.floor(this._x);
        this._y = Math.floor(this._y);
    };
    if (this.canPass(this._x, this._y, d)) {
        this.moveStraight(d);
    };
};

Spriteset_Battle.prototype.autotileType = function (z) {
    return $gameMap.autotileType(Math.round($gamePlayer.x), Math.round($gamePlayer.y), z);
};

Scene_Load.prototype.reloadMapIfUpdated = function () {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), Math.round($gamePlayer.x), Math.round($gamePlayer.y));
        $gamePlayer.requestMapReload();
    }
};

Game_Player.prototype.getInputDirection = function () {
    if (ZPM.SuperMove_Movedir8) {
        return Input.dir8;
    } else {
        return Input.dir4;
    };
};

Game_Player.prototype.executeMove = function (direction) {
    if (ZPM.SuperMove_Movedir8) {
        if (direction % 2 == 0) {
            this.moveStraight(direction);
        } else if (direction == 1 || direction == 3) {
            this.moveDiagonally(direction + 3, 2);
        } else if (direction == 7 || direction == 9) {
            this.moveDiagonally(direction - 3, 8);
        };
    } else {
        direction = direction == 1 ? 2 : direction == 3 ? 6 : direction == 7 ? 4 : direction == 9 ? 8 : direction;
        this.moveStraight(direction);
    };
};

/**
 * @method isOnLadder
 * @memberof Game_CharacterBase
 * @param {?Number=} [x=this.triggerboxcentertargetX()] - 坐标X,无传入时默认为当前显示坐标
 * @param {?Number=} [y=this.triggerboxcentertargetY()] - 坐标Y,无传入时默认为当前显示坐标
 * @desc 判定角色当前坐标是否在梯子上,以显示坐标为基础,碰撞体积任意部分满足条件即判定为真.
 * @override
 * @summary 重写型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.isOnLadder = function (x, y) {
    x = x ? x : this._realX;
    x = x + this._ZPM_triggercenteranchorX;
    y = y ? y : this._realY;
    y = y + this._ZPM_triggercenteranchorY;
    var tx = $gameMap.roundX(x - this._ZPM_triggerboxwidth / 2);
    var ty = $gameMap.roundY(y - this._ZPM_triggerboxheight / 2);
    var w = tx - parseInt(tx);
    var h = ty - parseInt(ty);
    var bx = Math.floor(tx);
    var by = Math.floor(ty);
    for (i = 0; i < this._ZPM_triggerboxwidth + w; i++) {
        for (j = 0; j < this._ZPM_triggerboxheight + h; j++) {
            if ($gameMap.isLadder($gameMap.roundX(bx + i), $gameMap.roundY(by + j))) {
                return true;
            };
        };
    };
    return false;
};

/**
 * @method isOnBush
 * @memberof Game_CharacterBase
 * @desc 判定角色当前坐标是否在灌木地形,新方法以显示中心坐标为参照.
 * @override
 * @summary 重写型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.isOnBush = function () {
    return $gameMap.isBush(Math.floor(this.triggerboxcenterrealX()), Math.floor(this.triggerboxcenterrealY()));
};

/**
 * @method refreshBushDepth
 * @memberof Game_CharacterBase
 * @desc 灌木地形半透明,半透明半身动态尺寸.
 * @override
 * @summary 重写型
 * @returns {undefined} 
 */
Game_CharacterBase.prototype.refreshBushDepth = function () {
    if (this.isNormalPriority() && !this.isObjectCharacter() &&
        this.isOnBush() && !this.isJumping()) {
        if (!this.isMoving()) {
            this._bushDepth = this._ZPM_triggerboxheight * 12;
        }
    } else {
        this._bushDepth = 0;
    }
};

/**
 * @method isOnDamageFloor
 * @memberof Game_Player
 * @param {?Number=} [x=this.triggerboxcentertargetX()] - 坐标X,无传入时默认为当前显示坐标
 * @param {?Number=} [y=this.triggerboxcentertargetY()] - 坐标Y,无传入时默认为当前显示坐标
 * @desc 伤害地形判定,碰撞体积任意部分处于伤害地形,且角色抵抗状态未开启,返回true.
 * @override
 * @summary 重写型
 * @returns {Boolean} 
 */
Game_Player.prototype.isOnDamageFloor = function (x, y) {
    x = x ? x : this._realX;
    x = x + this._ZPM_triggercenteranchorX;
    y = y ? y : this._realY;
    y = y + this._ZPM_triggercenteranchorY;
    var tx = $gameMap.roundX(x - this._ZPM_triggerboxwidth / 2);
    var ty = $gameMap.roundY(y - this._ZPM_triggerboxheight / 2);
    var w = tx - parseInt(tx);
    var h = ty - parseInt(ty);
    var bx = Math.floor(tx);
    var by = Math.floor(ty);
    for (i = 0; i < this._ZPM_triggerboxwidth + w; i++) {
        for (j = 0; j < this._ZPM_triggerboxheight + h; j++) {
            if ($gameMap.isDamageFloor($gameMap.roundX(bx + i), $gameMap.roundY(by + j))) {
                return !this.isInAirship() && !this._ZPM_damagefloorresistance;
            };
        };
    };
    return false;
};

/**
 * @method terrainTag
 * @memberof Game_CharacterBase
 * @param {?Number=} [x=this.triggerboxcentertargetX()] - 坐标X,无传入时默认为当前目的地坐标
 * @param {?Number=} [y=this.triggerboxcentertargetY()] - 坐标Y,无传入时默认为当前目的地坐标
 * @desc 获取角色当前坐标的地形标签,新方法以中心点为参照.
 * @override
 * @summary 重写型
 * @returns {Number} 
 */
Game_CharacterBase.prototype.terrainTag = function (x, y) {
    x = x ? x : this.triggerboxcentertargetX();
    y = y ? y : this.triggerboxcentertargetY();
    x = this.triggerboxwidth() > 1 ? Math.ceil(x) : Math.floor(x);
    y = this.triggerboxheight() > 1 ? Math.ceil(y) : Math.floor(y);
    return $gameMap.terrainTag(x, y);
};

/**
 * @method regionId
 * @memberof Game_CharacterBase
 * @param {?Number=} [x=this.triggerboxcentertargetX()] - 坐标X,无传入时默认为当前目的地坐标
 * @param {?Number=} [y=this.triggerboxcentertargetY()] - 坐标Y,无传入时默认为当前目的地坐标
 * @desc 获取角色当前坐标的区域ID,新方法以中心点为参照.
 * @override
 * @summary 重写型
 * @returns {Number} 
 */
Game_CharacterBase.prototype.regionId = function (x, y) {
    x = x ? x : this.triggerboxcentertargetX();
    y = y ? y : this.triggerboxcentertargetY();
    x = this.triggerboxwidth() > 1 ? Math.ceil(x) : Math.floor(x);
    y = this.triggerboxheight() > 1 ? Math.ceil(y) : Math.floor(y);
    return $gameMap.regionId(x, y);
};

/**
 * @method checkEventTriggerTouchFront
 * @memberof Game_Player
 * @param {!Number} d - 方向
 * @desc 玩家碰撞事件判定,触发方式重写.
 * @summary 新增型
 * @returns {undefined} 
 */
Game_Player.prototype.checkEventTriggerTouchFront = function (d) {
    if (ZPM.SuperMove_TakeOff) {
        return Game_Character.prototype.checkEventTriggerTouchFront.call(this, d);
    };
    this.startMapEventThere(d, [1]);
    if (this._ZPM_playerposadjusting || $gameMap.setupStartingEvent()) {
        return;
    };
    this.startMapEventHere([1]);
    if (this._ZPM_playerposadjusting || $gameMap.setupStartingEvent()) {
        return;
    };
    this.startMapEventThere(d, [1], true);
    if (this._ZPM_playerposadjusting || $gameMap.setupStartingEvent()) {
        return;
    };
    this.startMapEventHere([1], true);
};

/**
 * @method canPassTo
 * @memberof Game_Character
 * @param {!Number} x - 目标坐标X
 * @param {!Number} y - 目标坐标Y
 * @param {!Number} d - 方向
 * @param {!Number} ds - 距离
 * @desc 目的地移动函数专用.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_Character.prototype.canPassTo = function (x, y, d, ds) {
    var x2 = $gameMap.roundXWithDirection(x, d, ds);
    var y2 = $gameMap.roundYWithDirection(y, d, ds);
    if (!this.isSuperMoveValid(x2, y2)) {
        return false;
    };
    if (this.isThrough() || this.isDebugThrough()) {
        return true;
    };
    if (!this.isMapSuperMovePassable(x, y, d, false, ds)) {
        return false;
    };
    if (this.isCollidedWithCharactersbySM(x, y, d, false, ds)) {
        return false;
    };
    return true;
};

var _ZPM_SuperMove_Game_Character_findDirectionTo = Game_Character.prototype.findDirectionTo;
Game_Character.prototype.findDirectionTo = function (goalX, goalY) {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Character_findDirectionTo.call(this, goalX, goalY);
    };
    var tx = $gameMap.deltaX(this.triggerboxcentertargetX(), (goalX + 0.5));
    var ty = $gameMap.deltaY(this.triggerboxcentertargetY(), (goalY + 0.5));
    var dx = Math.abs(tx);
    var dy = Math.abs(ty);
    var dt = 1;
    var d;
    if (!ZPM.SuperMove_ForceNormalMove && this._ZPM_SuperMove) {
        dt = this.distancePerFrame() * 2;
    };
    if (dx < dt && dy < dt) {
        if (dx >= dy && dx != 0) {
            if (this.canPassTo(this._x, this._y, tx > 0 ? 4 : 6, dx)) {
                this._x = $gameMap.roundXWithDirection(this._x, tx > 0 ? 4 : 6, dx);
                this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(tx > 0 ? 4 : 6), dx);
                this.setDirection(tx > 0 ? 4 : 6);
                return -1;
            }
            if (dy != 0) {
                if (this.canPassTo(this._x, this._y, ty > 0 ? 8 : 2, dy)) {
                    this._y = $gameMap.roundYWithDirection(this._y, ty > 0 ? 8 : 2, dx);
                    this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(ty > 0 ? 8 : 2), dy);
                    this.setDirection(ty > 0 ? 8 : 2);
                    return -1;
                }
            }
        };
        if (dy >= dx && dy != 0) {
            if (this.canPassTo(this._x, this._y, ty > 0 ? 8 : 2, dy)) {
                this._y = $gameMap.roundYWithDirection(this._y, ty > 0 ? 8 : 2, dy);
                this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(ty > 0 ? 8 : 2), dy);
                this.setDirection(ty > 0 ? 8 : 2);
                return -1;
            }
            if (dx != 0) {
                if (this.canPassTo(this._x, this._y, tx > 0 ? 4 : 6, dx)) {
                    this._x = $gameMap.roundXWithDirection(this._x, tx > 0 ? 4 : 6, dx);
                    this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(tx > 0 ? 4 : 6), dx);
                    this.setDirection(tx > 0 ? 4 : 6);
                    return -1;
                }
            }
        };
        d = 0;
    } else {
        if (dt == 1) {
            return _ZPM_SuperMove_Game_Character_findDirectionTo.call(this, goalX, goalY);
        } else {
            if (dx >= dt && dy >= dt) {
                d = tx > 0 && ty > 0 ? 7 : tx < 0 && ty < 0 ? 3 : tx > 0 && ty < 0 ? 1 : tx < 0 && ty > 0 ? 9 : 0;
            } else if (dx >= dt) {
                d = tx > 0 ? 4 : 6;
            } else if (dy >= dt) {
                d = ty > 0 ? 8 : 2;
            } else {
                d = 0;
            };
            switch (d) {
                case 1:
                    if (!this.canPassDiagonally(this.x, this.y, 4, 2)) {
                        if (dx >= dy) {
                            if (this.canPass(this.x, this.y, 4)) {
                                if (this.reverseDir(this._direction) != 4) {
                                    d = 4;
                                    break;
                                }
                            } else {
                                if (this.canPass(this.x, this.y, 2)) {
                                    if (this.reverseDir(this._direction) != 2) {
                                        d = 2;
                                        break;
                                    }
                                }
                            };
                        };
                        if (dy >= dx) {
                            if (this.canPass(this.x, this.y, 2)) {
                                if (this.reverseDir(this._direction) != 2) {
                                    d = 2;
                                    break;
                                }
                            } else {
                                if (this.canPass(this.x, this.y, 4)) {
                                    if (this.reverseDir(this._direction) != 4) {
                                        d = 4;
                                        break;
                                    }
                                }
                            };
                        };
                        d = 0;
                    };
                    break;
                case 3:
                    if (!this.canPassDiagonally(this.x, this.y, 6, 2)) {
                        if (dx >= dy) {
                            if (this.canPass(this.x, this.y, 6)) {
                                if (this.reverseDir(this._direction) != 6) {
                                    d = 6;
                                    break;
                                }
                            } else {
                                if (this.canPass(this.x, this.y, 2)) {
                                    if (this.reverseDir(this._direction) != 2) {
                                        d = 2;
                                        break;
                                    }
                                }
                            };
                        };
                        if (dy >= dx) {
                            if (this.canPass(this.x, this.y, 2)) {
                                if (this.reverseDir(this._direction) != 2) {
                                    d = 2;
                                    break;
                                }
                            } else {
                                if (this.canPass(this.x, this.y, 6)) {
                                    if (this.reverseDir(this._direction) != 6) {
                                        d = 6;
                                        break;
                                    }
                                }
                            };
                        };
                        d = 0;
                    };
                    break;
                case 7:
                    if (!this.canPassDiagonally(this.x, this.y, 4, 8)) {
                        if (dx >= dy) {
                            if (this.canPass(this.x, this.y, 4)) {
                                if (this.reverseDir(this._direction) != 4) {
                                    d = 4;
                                    break;
                                }
                            } else {
                                if (this.canPass(this.x, this.y, 8)) {
                                    if (this.reverseDir(this._direction) != 8) {
                                        d = 8;
                                        break;
                                    }
                                }
                            };
                        };
                        if (dy >= dx) {
                            if (this.canPass(this.x, this.y, 8)) {
                                if (this.reverseDir(this._direction) != 8) {
                                    d = 8;
                                    break;
                                }
                            } else {
                                if (this.canPass(this.x, this.y, 4)) {
                                    if (this.reverseDir(this._direction) != 4) {
                                        d = 4;
                                        break;
                                    }
                                }
                            };
                        };
                        d = 0;
                    };
                    break;
                case 9:
                    if (!this.canPassDiagonally(this.x, this.y, 6, 8)) {
                        if (dx >= dy) {
                            if (this.canPass(this.x, this.y, 6)) {
                                if (this.reverseDir(this._direction) != 6) {
                                    d = 6;
                                    break;
                                }
                            } else {
                                if (this.canPass(this.x, this.y, 8)) {
                                    if (this.reverseDir(this._direction) != 8) {
                                        d = 8;
                                        break;
                                    }
                                }
                            };
                        };
                        if (dy >= dx) {
                            if (this.canPass(this.x, this.y, 8)) {
                                if (this.reverseDir(this._direction) != 8) {
                                    d = 8;
                                    break;
                                }
                            } else {
                                if (this.canPass(this.x, this.y, 6)) {
                                    if (this.reverseDir(this._direction) != 6) {
                                        d = 6;
                                        break;
                                    }
                                }
                            };
                        };
                        d = 0;
                    };
                    break;
            };
        };
    };
    return d;
};

var _ZPM_SuperMove_Game_Player_updateNonmoving = Game_Player.prototype.updateNonmoving;
Game_Player.prototype.updateNonmoving = function (wasMoving) {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Player_updateNonmoving.call(this, wasMoving);
    };
    if (!$gameMap.isEventRunning()) {
        if (wasMoving) {
            $gameParty.onPlayerWalk();
            this.startMapEventHere([1]);
            if (this._ZPM_playerposadjusting || $gameMap.setupStartingEvent()) {
                return;
            }
            this.startMapEventHere([1], true);
            if (this._ZPM_playerposadjusting || $gameMap.setupStartingEvent()) {
                return;
            }
        }
        if (this.triggerAction()) {
            return;
        }
        if (wasMoving) {
            this.updateEncounterCount();
        } else {
            if (!this._ZPM_playerposadjusting) {
                $gameTemp.clearDestination();
            }
        }
    }
};

var _ZPM_SuperMove_Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
Game_Player.prototype.triggerButtonAction = function () {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Player_triggerButtonAction.call(this);
    };
    if (Input.isTriggered('ok')) {
        if (this.getOnOffVehicle()) {
            return true;
        }
        this.startMapEventThere(this.direction(), [0, 1, 2]);
        if (this._ZPM_playerposadjusting || $gameMap.setupStartingEvent()) {
            return true;
        }
        this.startMapEventHere([0, 1, 2]);
        if (this._ZPM_playerposadjusting || $gameMap.setupStartingEvent()) {
            return true;
        }
        this.startMapEventThere(this.direction(), [0, 1, 2], true);
        if (this._ZPM_playerposadjusting || $gameMap.setupStartingEvent()) {
            return true;
        }
        this.startMapEventHere([0, 1, 2], true);
        if (this._ZPM_playerposadjusting || $gameMap.setupStartingEvent()) {
            return true;
        }
    };
    return false;
};

/**
 * @method triggerTouchAction
 * @extends Game_Player
 * @desc 鼠标按键触发判定.
 * 判定顺序(飞艇==>当前事件==>前方船只==>前方事件).
 * 任意条件成立则返回true,否则返回false.
 * @summary 继承型
 * @returns {Boolean}
 */
var _ZPM_SuperMove_Game_Player_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
Game_Player.prototype.triggerTouchAction = function (x, y) {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Player_triggerTouchAction.call(this);
    };
    x = !!x ? x : this._ZPM_triggercenter ? this._x : this._realX;
    y = !!y ? y : this._ZPM_triggercenter ? this._y : this._realY;
    if ($gameTemp.isDestinationValid()) {
        var d = this.direction();
        var destX = $gameTemp.destinationX();
        var destY = $gameTemp.destinationY();
        var tx = $gameMap.deltaX($gameMap.roundX(x + this._ZPM_triggercenteranchorX), (destX + 0.5));
        var ty = $gameMap.deltaY($gameMap.roundY(y + this._ZPM_triggercenteranchorY), (destY + 0.5));
        var bl = d == 2 ? Math.abs(tx) < (this.triggerboxwidth() / 2 + 0.5) && ty < 0
            : d == 8 ? Math.abs(tx) < (this.triggerboxwidth() / 2 + 0.5) && ty > 0
                : d == 4 ? Math.abs(ty) < (this.triggerboxheight() / 2 + 0.5) && tx > 0
                    : d == 6 ? Math.abs(ty) < (this.triggerboxheight() / 2 + 0.5) && tx < 0 : false;
        if (Math.abs(tx) < (this.triggerboxwidth() / 2 + 0.5) && Math.abs(ty) < (this.triggerboxheight() / 2 + 0.5)) {
            if (this.isSomethingOverlaped(this._x, this._y, $gameMap.airship())) {
                if (TouchInput.isTriggered() && this.getOnOffVehicle()) {
                    return true;
                };
            };
            if (TouchInput.isTriggered()) {
                this.startMapEventHere([0], false, x, y);
            };
            return this._ZPM_playerposadjusting || $gameMap.setupStartingEvent();
        }
        if (bl) {
            if (TouchInput.isTriggered() && this.getOnOffVehicle()) {
                return true;
            };
            if (TouchInput.isTriggered()) {
                this.startMapEventThere(d, [0], false, x, y);
            };
            return this._ZPM_playerposadjusting || $gameMap.setupStartingEvent();
        }
    };
    _ZPM_SuperMove_Game_Player_triggerTouchAction.call(this);
};

/**
 * @method startMapEventHere
 * @memberof Game_Player
 * @param {!Array<Number>} triggers - 事件类型数组 
 * @param {?Boolean=} [type=false] - 触发机制,详情请查看子函数
 * @param {?Number} x - 自定义坐标X,未定义则取对象自身坐标
 * @param {?Number} y - 自定义坐标Y,未定义则取对象自身坐标
 * @desc 事件触发(碰撞体积范围,位置可自定义),含周期判定.
 * @summary 新增型
 * @returns {undefined} 
 */
Game_Player.prototype.startMapEventHere = function (triggers, type, x, y) {
    type = type || false;
    x = !!x ? x : this._ZPM_triggercenter ? this._x : this._realX;
    y = !!y ? y : this._ZPM_triggercenter ? this._y : this._realY;
    if (!$gameMap.isEventRunning() && this.canStartLocalEvents()) {
        $gameMap.events().some(function (event) {
            if (event._pageIndex >= 0 && !event.isEmptyList() && (!event.isNormalPriority() || event.isThrough())) {
                if (event.isTriggerIn(triggers) && (event._ZPM_eventinterval ? event.checkeventintervalcount() : true)) {
                    var bl = this.checkEventPosHere(event, type, x, y);
                    if (bl) {
                        event._ZPM_eventintervalcount = 1;
                        if (event._ZPM_eventstartedplayerposadjust) {
                            this._ZPM_playerposadjusting = true;
                            this.adsorbObject(event);
                        }
                        event.start();
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }, this);
    };
};

/**
 * @method startMapEventThere
 * @memberof Game_Player
 * @param {!Number} d - 方向
 * @param {!Array<Number>} triggers - 事件类型数组 
 * @param {?Boolean=} [type=false] - 触发机制,详情请查看子函数
 * @param {?Number} x - 自定义坐标X,未定义则取对象自身坐标
 * @param {?Number} y - 自定义坐标Y,未定义则取对象自身坐标
 * @desc 事件触发(方向碰撞或重合),含周期判定.
 * 本方法重写了关于'柜台'事件的兼容机制,使得当目标方向与事件中间包含的有效'柜台'数
 * 从原始的只能有一个,修改为在有效地图范围内无限个.
 * @summary 新增型
 * @returns {undefined} 
 */
Game_Player.prototype.startMapEventThere = function (d, triggers, type, x, y) {
    d = d || 2;
    type = type || false;
    x = !!x ? x : this._ZPM_triggercenter ? this._x : this._realX;
    y = !!y ? y : this._ZPM_triggercenter ? this._y : this._realY;
    if (!$gameMap.isEventRunning() && this.canStartLocalEvents()) {
        $gameMap.events().some(function (event) {
            if (event._pageIndex >= 0 && !event.isEmptyList() && event.isNormalPriority()) {
                if (event.isTriggerIn(triggers) && (event._ZPM_eventinterval ? event.checkeventintervalcount() : true)) {
                    var ds = 0;
                    switch (d) {
                        case 2:
                            var y1 = $gameMap.roundY(Math.floor($gameMap.roundY(y + this._ZPM_triggercenteranchorY) + this.triggerboxheight() / 2));
                            if (y != $gameMap.roundY($gameMap.roundY(y + this._ZPM_triggercenteranchorY) + this.triggerboxheight() / 2)) {
                                break;
                            };
                            var x1 = Math.floor($gameMap.roundX(x + this._ZPM_triggercenteranchorX));
                            var n = $gameMap.height() - y1;
                            for (i = 0; i < n; i++) {
                                if (!$gameMap.isCounter(x1, $gameMap.roundY(y1 + i))) {
                                    break;
                                } else {
                                    ds++;
                                }
                            };
                            break;
                        case 4:
                            var x1 = $gameMap.roundX(Math.floor($gameMap.roundX(x + this._ZPM_triggercenteranchorX) - this.triggerboxwidth() / 2));
                            if (x1 != $gameMap.roundX($gameMap.roundX(x + this._ZPM_triggercenteranchorX) - this.triggerboxwidth() / 2)) {
                                break;
                            };
                            var y1 = Math.floor($gameMap.roundY(y + this._ZPM_triggercenteranchorY));
                            var n = $gameMap.width() - x1;
                            for (i = 1; i < n; i++) {
                                if (!$gameMap.isCounter($gameMap.roundX(x1 - i), y1)) {
                                    break;
                                } else {
                                    ds++;
                                }
                            };
                            break;
                        case 6:
                            var x1 = $gameMap.roundX(Math.floor($gameMap.roundX(x + this._ZPM_triggercenteranchorX) + this.triggerboxwidth() / 2));
                            if (x1 != $gameMap.roundX($gameMap.roundX(x + this._ZPM_triggercenteranchorX) + this.triggerboxwidth() / 2)) {
                                break;
                            };
                            var y1 = Math.floor($gameMap.roundY(y + this._ZPM_triggercenteranchorY));
                            var n = $gameMap.width() - x1;
                            for (i = 0; i < n; i++) {
                                if (!$gameMap.isCounter($gameMap.roundX(x1 + i), y1)) {
                                    break;
                                } else {
                                    ds++;
                                }
                            };
                            break;
                        case 8:
                            var y1 = $gameMap.roundY(Math.floor($gameMap.roundY(y + this._ZPM_triggercenteranchorY) - this.triggerboxheight() / 2));
                            if (y1 != $gameMap.roundY($gameMap.roundY(y + this._ZPM_triggercenteranchorY) - this.triggerboxheight() / 2)) {
                                break;
                            };
                            var x1 = Math.floor($gameMap.roundX(x + this._ZPM_triggercenteranchorX));
                            var n = $gameMap.height() - y1;
                            for (i = 1; i <= n; i++) {
                                if (!$gameMap.isCounter(x1, $gameMap.roundY(y1 - i))) {
                                    break;
                                } else {
                                    ds++;
                                }
                            };
                            break;
                    }
                    var bl = this.checkEventPosThere(d, ds, event, type, x, y);
                    if (bl) {
                        event._ZPM_eventintervalcount = 1;
                        if (event._ZPM_eventstartedplayerposadjust) {
                            this._ZPM_playerposadjusting = true;
                            this.alignWithObject(event);
                        }
                        event.start();
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }, this);
    };
};

/**
 * @method isEmptyList
 * @memberof Game_Event
 * @desc 判定当前事件页是否为空
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_Event.prototype.isEmptyList = function () {
    return (this.list() == null || this.list().length <= 1);
};

/**
 * @method checkEventPosHere
 * @memberof Game_Player
 * @param {!Object} obj - 对象事件
 * @param {!Boolean} type - 触发机制类型 
 * true时,两对象碰撞范围有任意重合即可判定为true,
 * false时,仅当原始对象碰撞中心进入目标对象碰撞范围时,才判定为true.
 * @param {!Number} x - 坐标X,原始对象坐标
 * @param {!Number} y - 坐标Y,原始对象坐标
 * @desc 碰撞体积范围内事件触发判定
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_Player.prototype.checkEventPosHere = function (obj, type, x, y) {
    var bl = false;
    var tx = $gameMap.deltaX($gameMap.roundX(x + this._ZPM_triggercenteranchorX), this._ZPM_triggercenter ? obj.triggerboxcentertargetX() : obj.triggerboxcenterrealX());
    var ty = $gameMap.deltaY($gameMap.roundY(y + this._ZPM_triggercenteranchorY), this._ZPM_triggercenter ? obj.triggerboxcentertargetY() : obj.triggerboxcenterrealY());
    /*-------------------------------------额外追加条件,当超级移动未开启时,玩家中心点需要在任意轴进入目标对象体积范围内------------------------------------------*/
    bl = Math.abs(tx) < (obj.triggerboxwidth() / 2 + (type ? (this.triggerboxwidth() / 2) : 0)) &&
        Math.abs(ty) < (obj.triggerboxheight() / 2 + (type ? (this.triggerboxheight() / 2) : 0)) &&
        (this._ZPM_SuperMove ? true : (Math.abs(tx) <= obj._ZPM_triggerboxwidth / 2 || Math.abs(ty) <= obj._ZPM_triggerboxheight / 2));
    return bl;
};

/**
 * @method checkEventPosThere
 * @memberof Game_Player
 * @param {!Number} d - 方向
 * @param {!Number} ds - 缩进,是处理'柜台'机制的关键参数,无柜台时请使用参数0
 * @param {!Object} obj - 对象事件
 * @param {!Boolean} type - 触发机制类型 
 * true时,两对象碰撞范围有任意该参数方向有效碰撞时(例如:两对象为X轴碰撞,则需要两对象碰撞中心
 * 的Y轴绝对距离小于原始对象碰撞体积高度/2+目标对象碰撞体积高度/2)
 * ,判定为true,
 * false时,两对象碰撞范围有任意该参数方向有效碰撞,且两对象碰撞中心位置关系符合该参数方向公式时
 * (例如:两对象为Y轴碰撞,则需要两对象碰撞中心的X轴绝对距离小于原始对象碰撞体积宽度/2),才判定为true.
 * @param {!Number} x - 坐标X,原始对象坐标
 * @param {!Number} y - 坐标Y,原始对象坐标
 * @desc 事件触发(方向碰撞或重合),根据碰撞体积判定位置关系
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_Player.prototype.checkEventPosThere = function (d, ds, obj, type, x, y) {
    var bl = false;
    var s = 1;
    if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
        s = this.distancePerFrame() * 2;
    };
    var tx = $gameMap.deltaX($gameMap.roundX(x + this._ZPM_triggercenteranchorX), this._ZPM_triggercenter ? obj.triggerboxcentertargetX() : obj.triggerboxcenterrealX());
    var ty = $gameMap.deltaY($gameMap.roundY(y + this._ZPM_triggercenteranchorY), this._ZPM_triggercenter ? obj.triggerboxcentertargetY() : obj.triggerboxcenterrealY());
    var dx = Math.abs(tx) - this.triggerboxwidth() / 2 - obj.triggerboxwidth() / 2;
    var dy = Math.abs(ty) - this.triggerboxheight() / 2 - obj.triggerboxheight() / 2;
    switch (d) {
        case 1:
            bl = dx < (ds + s) && dy < (ds + s) && tx >= 0 && ty <= 0 && (type ? true : (dx >= 0 && dy >= 0));
            break;
        case 2:
            bl = dy >= 0 && dy < (ds + s) && ty < 0 && Math.abs(tx) < (obj.triggerboxwidth() / 2 + (type ? (this.triggerboxwidth() / 2) : 0));
            break;
        case 3:
            bl = dx < (ds + s) && dy < (ds + s) && tx <= 0 && ty <= 0 && (type ? true : (dx >= 0 && dy >= 0));
            break;
        case 4:
            bl = dx >= 0 && dx < (ds + s) && tx > 0 && Math.abs(ty) < (obj.triggerboxheight() / 2 + (type ? (this.triggerboxheight() / 2) : 0));
            break;
        case 6:
            bl = dx >= 0 && dx < (ds + s) && tx < 0 && Math.abs(ty) < (obj.triggerboxheight() / 2 + (type ? (this.triggerboxheight() / 2) : 0));
            break;
        case 7:
            bl = dx < (ds + s) && dy < (ds + s) && tx >= 0 && ty >= 0 && (type ? true : (dx >= 0 && dy >= 0));
            break;
        case 8:
            bl = dy >= 0 && dy < (ds + s) && ty > 0 && Math.abs(tx) < (obj.triggerboxwidth() / 2 + (type ? (this.triggerboxwidth() / 2) : 0))
            break;
        case 9:
            bl = dx < (ds + s) && dy < (ds + s) && tx <= 0 && ty >= 0 && (type ? true : (dx >= 0 && dy >= 0));
            break;
        default:
            bl = false;
            break;
    };
    return bl;
};

/**
 * @method isEventRunning
 * @memberof Game_Map
 * @desc 是事件运行状态判定函数再原基础上增加额外条件:玩家是否处于校正状态中.
 * 校正状态下无视事件是否开启.
 * @summary 继承型
 * @returns {Boolean} 
 */
var _ZPM_SuperMove_Game_Map_isEventRunning = Game_Map.prototype.isEventRunning;
Game_Map.prototype.isEventRunning = function () {
    return (_ZPM_SuperMove_Game_Map_isEventRunning.call(this) && !$gamePlayer._ZPM_playerposadjusting);
}

Game_CharacterBase.prototype.adsorbObject = function (obj) {
    $gameTemp._destinationX = $gameMap.roundX(obj._x - 0.5 + obj._ZPM_triggercenteranchorX);
    $gameTemp._destinationY = $gameMap.roundY(obj._y - 0.5 + obj._ZPM_triggercenteranchorY);
};

Game_CharacterBase.prototype.alignWithObject = function (obj) {
    if (this._ZPM_triggercenter) {
        var tx = $gameMap.deltaX(this.triggerboxcentertargetX(), obj.triggerboxcentertargetX());
        var ty = $gameMap.deltaY(this.triggerboxcentertargetY(), obj.triggerboxcentertargetY());
    } else {
        var tx = $gameMap.deltaX(this.triggerboxcenterrealX(), obj.triggerboxcenterrealX());
        var ty = $gameMap.deltaY(this.triggerboxcenterrealY(), obj.triggerboxcenterrealY());
    };
    var angle = this.getAngleDegreesWithXFront(obj.triggerboxwidth(), obj.triggerboxheight(), 0, 0);
    var anglec = this.getAngleDegreesWithXFront(tx, ty, 0, 0);
    var d = anglec >= angle && anglec < (180 - angle) ? 8 : anglec >= (180 - angle) && anglec < (angle + 180) ? 6
        : anglec >= (angle + 180) && anglec < (360 - angle) ? 2 : 4;
    var dx = Math.abs(tx) - obj.triggerboxwidth() / 2 - this.triggerboxwidth() / 2;
    var dy = Math.abs(ty) - obj.triggerboxheight() / 2 - this.triggerboxheight() / 2;
    switch (d) {
        case 4:
        case 6:
            if (dy >= 0 && dx < 0) {
                $gameTemp._destinationX = $gameMap.roundX(obj._x + obj._ZPM_triggercenteranchorX - 0.5);
                $gameTemp._destinationY = $gameMap.roundY(this._y + this._ZPM_triggercenteranchorY - 0.5);
            } else {
                $gameTemp._destinationX = $gameMap.roundX(this._x + this._ZPM_triggercenteranchorX - 0.5);
                $gameTemp._destinationY = $gameMap.roundY(obj._y + obj._ZPM_triggercenteranchorY - 0.5);
            };
            break;
        case 2:
        case 8:
            if (dx >= 0 && dy < 0) {
                $gameTemp._destinationX = $gameMap.roundX(this._x + this._ZPM_triggercenteranchorX - 0.5);
                $gameTemp._destinationY = $gameMap.roundY(obj._y + obj._ZPM_triggercenteranchorY - 0.5);
            } else {
                $gameTemp._destinationX = $gameMap.roundX(obj._x + obj._ZPM_triggercenteranchorX - 0.5);
                $gameTemp._destinationY = $gameMap.roundY(this._y + this._ZPM_triggercenteranchorY - 0.5);
            };
        default:
            break;
    };
};

Game_CharacterBase.prototype.findDirectionToEvent = function (x, y, obj) {
    if (this._ZPM_triggercenter) {
        var tx = $gameMap.deltaX($gameMap.roundX(x + this._ZPM_triggercenteranchorX), obj.triggerboxcentertargetX());
        var ty = $gameMap.deltaY($gameMap.roundY(y + this._ZPM_triggercenteranchorY), obj.triggerboxcentertargetY());
    } else {
        var tx = $gameMap.deltaX($gameMap.roundX(x + this._ZPM_triggercenteranchorX), obj.triggerboxcenterrealX());
        var ty = $gameMap.deltaY($gameMap.roundY(y + this._ZPM_triggercenteranchorY), obj.triggerboxcenterrealY());
    };
    var angle = this.getAngleDegreesWithXFront(obj.triggerboxwidth(), obj.triggerboxheight(), 0, 0);
    var anglec = this.getAngleDegreesWithXFront(tx, ty, 0, 0);
    var d = anglec >= angle && anglec < (180 - angle) ? 8 : anglec >= (180 - angle) && anglec < (angle + 180) ? 6
        : anglec >= (angle + 180) && anglec < (360 - angle) ? 2 : 4;
    var dx = Math.abs(tx) - obj.triggerboxwidth() / 2 - this.triggerboxwidth() / 2;
    var dy = Math.abs(ty) - obj.triggerboxheight() / 2 - this.triggerboxheight() / 2;
    switch (d) {
        case 4:
        case 6:
            if (dy >= 0 && dx < 0) {
                d = ty > 0 ? 8 : 2;
            };
            break;
        case 2:
        case 8:
            if (dx >= 0 && dy < 0) {
                d = tx > 0 ? 4 : 6;
            };
        default:
            break;
    };
    if (Imported.ZPM_CharacterAnime) {
        if (this._ZPM_d8animation) {
            d = anglec > 10 && anglec < 80 ? 7 : anglec > 100 && anglec < 170 ? 9 : anglec > 190 && anglec < 260 ? 3
                : anglec > 270 && anglec < 350 ? 1 : d;
        };
    };
    if (tx == 0 && ty == 0) {
        d = this._direction;
    };
    return d;
};

var _ZPM_SuperMove_Game_Map_setupStartingMapEvent = Game_Map.prototype.setupStartingMapEvent;
Game_Map.prototype.setupStartingMapEvent = function () {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Map_setupStartingMapEvent.call(this);
    };
    var events = this.events();
    if ($gamePlayer._ZPM_playerposadjusting) {
        return false;
    }
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.isStarting()) {
            if (event._ZPM_eventstartedplayerposadjust) {
                $gamePlayer.setDirection($gamePlayer.findDirectionToEvent($gamePlayer._x, $gamePlayer._y, event));
            };
            if (event.isTriggerIn([0, 1, 2])) {
                event.turnTowardPlayer();;
            }
            event.clearStartingFlag();
            this._interpreter.setup(event.list(), event.eventId());
            return true;
        }
    }
    return false;
};

var _ZPM_SuperMove_Game_Temp_setDestination = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function (x, y) {
    if ($gamePlayer._ZPM_playerposadjusting) {                  //修正当矫正状态时鼠标点击操作会改变移动目的地的错误
        return;
    };
    _ZPM_SuperMove_Game_Temp_setDestination.call(this, x, y);
};

var _ZPM_SuperMove_Game_Character_turnTowardCharacter = Game_Character.prototype.turnTowardCharacter;
Game_Character.prototype.turnTowardCharacter = function (obj) {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Character_turnTowardCharacter.call(this, obj);
    };
    obj = obj ? obj : $gamePlayer;
    if (this._ZPM_triggercenter) {
        var tx = $gameMap.deltaX(this.triggerboxcentertargetX(), obj.triggerboxcentertargetX());
        var ty = $gameMap.deltaY(this.triggerboxcentertargetY(), obj.triggerboxcentertargetY());
    } else {
        var tx = $gameMap.deltaX(this.triggerboxcenterrealX(), obj.triggerboxcenterrealX());
        var ty = $gameMap.deltaY(this.triggerboxcenterrealY(), obj.triggerboxcenterrealY());
    };
    var angle = this.getAngleDegreesWithXFront(this.triggerboxwidth(), this.triggerboxheight(), 0, 0);
    var anglec = this.getAngleDegreesWithXFront(tx, ty, 0, 0);
    var d = anglec >= angle && anglec < (180 - angle) ? 8 : anglec >= (180 - angle) && anglec < (angle + 180) ? 6
        : anglec >= (angle + 180) && anglec < (360 - angle) ? 2 : 4;
    var dx = Math.abs(tx) - obj.triggerboxwidth() / 2 - this.triggerboxwidth() / 2;
    var dy = Math.abs(ty) - obj.triggerboxheight() / 2 - this.triggerboxheight() / 2;
    switch (d) {
        case 4:
        case 6:
            if (dy >= 0 && dx < 0) {
                d = ty > 0 ? 8 : 2;
            };
            break;
        case 2:
        case 8:
            if (dx >= 0 && dy < 0) {
                d = tx > 0 ? 4 : 6;
            };
        default:
            break;
    };
    if (Imported.ZPM_CharacterAnime) {
        if (this._ZPM_d8animation) {
            d = anglec > 10 && anglec < 80 ? 7 : anglec > 100 && anglec < 170 ? 9 : anglec > 190 && anglec < 260 ? 3
                : anglec > 270 && anglec < 350 ? 1 : d;
        };
    };
    if (tx == 0 && ty == 0) {
        d = this._direction;
    };
    this.setDirection(d);
};

/**
 * @method CollidedWithSomething
 * @memberof Game_CharacterBase
 * @param {!Number} x - 坐标X,原始对象坐标
 * @param {!Number} y - 坐标Y,原始对象坐标
 * @param {!Number} d - 方向
 * @param {!Object} obj - 目标对象
 * @desc 对象相邻判定 
 * 两对象碰撞范围有任意该参数方向有效碰撞时(例如:两对象为X轴碰撞,则需要两对象碰撞中心
 * 的Y轴绝对距离小于原始对象碰撞体积高度/2+目标对象碰撞体积高度/2),判定为true.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.CollidedWithSomething = function (x, y, d, obj) {
    var s = 1;
    x = !!x ? x : this._x;
    y = !!y ? y : this._y;
    if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
        s = this.distancePerFrame() * 2;
    };
    var tx = $gameMap.deltaX($gameMap.roundX(x + this._ZPM_triggercenteranchorX), obj.triggerboxcentertargetX());
    var ty = $gameMap.deltaY($gameMap.roundY(y + this._ZPM_triggercenteranchorY), obj.triggerboxcentertargetY());
    var dx = Math.abs(tx) - obj.triggerboxwidth() / 2 - this.triggerboxwidth() / 2;
    var dy = Math.abs(ty) - obj.triggerboxheight() / 2 - this.triggerboxheight() / 2;
    var bl = d == 2 ? dy < s && dx < 0 && ty < 0 : d == 8 ? dy < s && dx < 0 && ty > 0
        : d == 4 ? dx < s && dy < 0 && tx > 0 : d == 6 ? dx < s && dy < 0 && tx < 0 : false;
    return bl;
};

/**
 * @method isSomethingOverlaped
 * @memberof Game_CharacterBase
 * @param {!Number} x - 坐标X,原始对象坐标
 * @param {!Number} y - 坐标Y,原始对象坐标
 * @param {!Object} obj - 目标对象
 * @desc 对象重合判定,两对象碰撞范围有任意重合即可判定为true.
 * @summary 新增型
 * @returns {Boolean} 
 */
Game_CharacterBase.prototype.isSomethingOverlaped = function (x, y, obj) {
    return Math.abs($gameMap.roundX(x + this._ZPM_triggercenteranchorX - obj._x - obj._ZPM_triggercenteranchorX)) <
        (this._ZPM_triggerboxwidth / 2 + obj._ZPM_triggerboxwidth / 2) &&
        Math.abs($gameMap.roundY(y + this._ZPM_triggercenteranchorY - obj._y - obj._ZPM_triggercenteranchorY)) <
        (this._ZPM_triggerboxheight / 2 + obj._ZPM_triggerboxheight / 2);
};

var _ZPM_SuperMove_Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
Game_Player.prototype.getOnVehicle = function () {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Player_getOnVehicle.call(this);
    };
    var direction = this.direction();
    if (this.isSomethingOverlaped(this.x, this.y, $gameMap.airship()) && $gameMap.airship()._mapId === $gameMap.mapId()) {
        this._vehicleType = 'airship';
    } else if (this.CollidedWithSomething(this.x, this.y, direction, $gameMap.ship()) && $gameMap.ship()._mapId === $gameMap.mapId()) {
        this._vehicleType = 'ship';
    } else if (this.CollidedWithSomething(this.x, this.y, direction, $gameMap.boat()) && $gameMap.boat()._mapId === $gameMap.mapId()) {
        this._vehicleType = 'boat';
    }
    if (this.isInVehicle()) {
        this._vehicleGettingOn = true;
        this.VehicleONPosition(this._vehicleType);
        this.gatherFollowers();
    }
    return this._vehicleGettingOn;
};

var _ZPM_SuperMove_Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
Game_Player.prototype.getOffVehicle = function () {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Player_getOffVehicle.call(this);
    };
    if (this.isVehicleLandOk(this.x, this.y, this.direction())) {
        if (this.isInAirship()) {
            this.setDirection(2);
        }
        this._followers.synchronize(this.x, this.y, this.direction());
        var type = 'boat';
        if (this.isInShip()) {
            type = 'ship';
        }
        this.vehicle().getOff();
        if (!this.isInAirship()) {
            this.VehicleOFFPosition(type);
            this.setTransparent(false);
        }
        this._vehicleGettingOff = true;
        this.setMoveSpeed(this._ZPM_movespeed);
        this.setThrough(false);
        this.makeEncounterCount();
        this.gatherFollowers();
    }
    return this._vehicleGettingOff;
};

/**
 * @method isVehicleLandOk
 * @memberof Game_Player
 * @param {!Number} x - 坐标X
 * @param {!Number} y - 坐标Y
 * @param {!Number} d - 方向
 * @desc 载具着陆判定.
 * @override
 * @summary 重写型
 * @returns {Boolean} 
 * @todo 如有载具方面的扩展计划,需考虑修改本函数.
 */
Game_Player.prototype.isVehicleLandOk = function (x, y, d) {
    if (this.isInAirship()) {
        var tx = $gameMap.roundX(x + this._ZPM_triggercenteranchorX - this._ZPM_triggerboxwidth / 2);
        var ty = $gameMap.roundY(y + this._ZPM_triggercenteranchorY - this._ZPM_triggerboxheight / 2);
        var w = tx - parseInt(tx);
        var h = ty - parseInt(ty);
        var bx = Math.floor(tx);
        var by = Math.floor(ty);
        for (i = 0; i < this._ZPM_triggerboxwidth + w; i++) {
            for (j = 0; j < this._ZPM_triggerboxheight + h; j++) {
                if (!$gameMap.isAirshipLandOk($gameMap.roundX(bx + i), $gameMap.roundY(by + j))) {
                    return false;
                };
            };
        };
        var bl = $gameMap.events().some(function (event) {
            return this.isSomethingOverlaped(x, y, event);
        }, this);
        if (bl || (this.isSomethingOverlaped(x, y, $gameMap.boat()) && $gameMap.boat()._mapId === $gameMap.mapId()) ||
            (this.isSomethingOverlaped(x, y, $gameMap.ship()) && $gameMap.ship()._mapId === $gameMap.mapId())) {
            return false;
        };
    } else {
        switch (d) {
            case 1:
                y = $gameMap.roundY(y + this.vehicle()._ZPM_triggerboxheight / 2 + this._ZPM_triggerboxheight / 2);
                x = $gameMap.roundX(x - this.vehicle()._ZPM_triggerboxwidth / 2 - this._ZPM_triggerboxwidth / 2);
                break;
            case 2:
                y = $gameMap.roundY(y + this.vehicle()._ZPM_triggerboxheight / 2 + this._ZPM_triggerboxheight / 2);
                break;
            case 3:
                y = $gameMap.roundY(y + this.vehicle()._ZPM_triggerboxheight / 2 + this._ZPM_triggerboxheight / 2);
                x = $gameMap.roundX(x + this.vehicle()._ZPM_triggerboxwidth / 2 + this._ZPM_triggerboxwidth / 2);
                break;
            case 4:
                x = $gameMap.roundX(x - this.vehicle()._ZPM_triggerboxwidth / 2 - this._ZPM_triggerboxwidth / 2);
                break;
            case 6:
                x = $gameMap.roundX(x + this.vehicle()._ZPM_triggerboxwidth / 2 + this._ZPM_triggerboxwidth / 2);
                break;
            case 7:
                x = $gameMap.roundX(x - this.vehicle()._ZPM_triggerboxwidth / 2 - this._ZPM_triggerboxwidth / 2);
                y = $gameMap.roundY(y - this.vehicle()._ZPM_triggerboxheight / 2 - this._ZPM_triggerboxheight / 2);
                break;
            case 8:
                y = $gameMap.roundY(y - this.vehicle()._ZPM_triggerboxheight / 2 - this._ZPM_triggerboxheight / 2);
                break;
            case 9:
                x = $gameMap.roundX(x + this.vehicle()._ZPM_triggerboxwidth / 2 + this._ZPM_triggerboxwidth / 2);
                y = $gameMap.roundY(y - this.vehicle()._ZPM_triggerboxheight / 2 - this._ZPM_triggerboxheight / 2);
                break;
        };
        var tx = $gameMap.roundX(x + this._ZPM_triggercenteranchorX - this._ZPM_triggerboxwidth / 2);
        var ty = $gameMap.roundY(y + this._ZPM_triggercenteranchorY - this._ZPM_triggerboxheight / 2);
        var w = tx - parseInt(tx);
        var h = ty - parseInt(ty);
        var bx = Math.floor(tx);
        var by = Math.floor(ty);
        for (i = 0; i < this._ZPM_triggerboxwidth + w; i++) {
            for (j = 0; j < this._ZPM_triggerboxheight + h; j++) {
                if (!$gameMap.isValid($gameMap.roundX(bx + i), $gameMap.roundY(by + j))) {
                    return false;
                };
                if (!$gameMap.isPassable($gameMap.roundX(bx + i), $gameMap.roundY(by + j), this.reverseDir(d))) {
                    return false;
                };
            };
        };
        var bl = $gameMap.events().some(function (event) {
            return this.isSomethingOverlaped(x, y, event);
        }, this);
        if (bl) {
            return false;
        };
    };
    return true;
};

/**
 * @method VehicleOFFPosition
 * @memberof Game_Player
 * @param {!String} type - 载具类型
 * @desc 载具乘降后位置修正,根据碰撞体积修正载具上下位置.
 * @override
 * @summary 重写型
 * @returns {Boolean} 
 * @todo 如有载具方面的扩展计划,需考虑修改本函数.
 */
Game_Player.prototype.VehicleOFFPosition = function (type) {
    type = type || 'boat';
    var t;
    if (type == 'boat') {
        t = $gameMap.boat();
    } else if (type == 'ship') {
        t = $gameMap.ship();
    } else if (type == 'airship') {
        t = $gameMap.airship();
    };
    switch (this.direction()) {
        case 1:
            this._x = $gameMap.roundX(this._x - t._ZPM_triggerboxwidth / 2 - this._ZPM_triggerboxwidth / 2);
            this._y = $gameMap.roundY(this._y + t._ZPM_triggerboxheight / 2 + this._ZPM_triggerboxheight / 2);
            break;
        case 2:
            this._x = t._x;
            this._y = $gameMap.roundY(this._y + t._ZPM_triggerboxheight / 2 + this._ZPM_triggerboxheight / 2);
            break;
        case 3:
            this._x = $gameMap.roundX(this._x + t._ZPM_triggerboxwidth / 2 + this._ZPM_triggerboxwidth / 2);
            this._y = $gameMap.roundY(this._y + t._ZPM_triggerboxheight / 2 + this._ZPM_triggerboxheight / 2);
            break;
        case 4:
            this._y = t._y;
            this._x = $gameMap.roundX(this._x - t._ZPM_triggerboxwidth / 2 - this._ZPM_triggerboxwidth / 2);
            break;
        case 6:
            this._y = t._y;
            this._x = $gameMap.roundX(this._x + t._ZPM_triggerboxwidth / 2 + this._ZPM_triggerboxwidth / 2);
            break;
        case 7:
            this._x = $gameMap.roundX(this._x - t._ZPM_triggerboxwidth / 2 - this._ZPM_triggerboxwidth / 2);
            this._y = $gameMap.roundY(this._y - t._ZPM_triggerboxheight / 2 - this._ZPM_triggerboxheight / 2);
            break;
        case 8:
            this._x = t._x;
            this._y = $gameMap.roundY(this._y - t._ZPM_triggerboxheight / 2 - this._ZPM_triggerboxheight / 2);
            break;
        case 9:
            this._x = $gameMap.roundX(this._x + t._ZPM_triggerboxwidth / 2 + this._ZPM_triggerboxwidth / 2);
            this._y = $gameMap.roundY(this._y - t._ZPM_triggerboxheight / 2 - this._ZPM_triggerboxheight / 2);
            break;
    };
};

/**
 * @method VehicleONPosition
 * @memberof Game_Player
 * @param {!String} type - 载具类型
 * @desc 载具乘降后位置修正,根据碰撞体积修正载具上下位置.
 * @override
 * @summary 重写型
 * @returns {Boolean} 
 * @todo 如有载具方面的扩展计划,需考虑修改本函数.
 */
Game_Player.prototype.VehicleONPosition = function (type) {
    type = type || 'walk';
    switch (type) {
        case 'airship':
            this._x = $gameMap.airship()._x;
            this._y = $gameMap.airship()._y;
            break;
        case 'ship':
            this._x = $gameMap.ship()._x;
            this._y = $gameMap.ship()._y;
            break;
        case 'boat':
            this._x = $gameMap.boat()._x;
            this._y = $gameMap.boat()._y;
            break;
        case 'walk':
            this._x = this._realX;
            this._y = this._realY;
            break;
    };
};

var _ZPM_SuperMove_Game_Followers_update = Game_Followers.prototype.update;
Game_Followers.prototype.update = function () {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Followers_update.call(this);
    };
    if (this.areGathering()) {
        if (!this.areMoving()) {
            this.forEach(function (follower) {
                follower._x = $gameMap.roundX($gamePlayer._x + $gamePlayer._ZPM_triggercenteranchorX - follower._ZPM_triggercenteranchorX);
                follower._y = $gameMap.roundY($gamePlayer._y + $gamePlayer._ZPM_triggercenteranchorY - follower._ZPM_triggercenteranchorY);
            }, this);
        }
        if (this.areGathered()) {
            this._gathering = false;
        }
    }
    this.forEach(function (follower) {
        follower.update();
    }, this);
};

var _ZPM_SuperMove_Game_Followers_areGathered = Game_Followers.prototype.areGathered;
Game_Followers.prototype.areGathered = function () {
    if (ZPM.SuperMove_TakeOff) {
        return _ZPM_SuperMove_Game_Followers_areGathered.call(this);
    };
    return this.visibleFollowers().every(function (follower) {
        return !follower.isMoving() &&
            follower.triggerboxcenterrealX() == $gamePlayer.triggerboxcenterrealX() &&
            follower.triggerboxcenterrealY() == $gamePlayer.triggerboxcenterrealY();
    }, this);
};

/**
 * @method updateEncounterCount
 * @memberof Game_Player
 * @desc 遇敌计时,兼容超级移动.
 * @override
 * @summary 重写型
 * @returns {undefined} 
 */
Game_Player.prototype.updateEncounterCount = function () {
    if (this.canEncounter()) {
        if (this._ZPM_SuperMove && !ZPM.SuperMove_ForceNormalMove) {
            this._encounterCount -= (this.encounterProgressValue() * this.distancePerFrame() * 2);
        } else {
            this._encounterCount -= this.encounterProgressValue();
        }
    }
};

/**
 * @method encounterProgressValue
 * @memberof Game_Player
 * @desc 遇敌计时数值,兼容超级移动.
 * @override
 * @summary 重写型
 * @returns {Number} 
 */
Game_Player.prototype.encounterProgressValue = function () {
    var value = this.isOnBush() ? 2 : 1;
    if ($gameParty.hasEncounterHalf()) {
        value *= 0.5;
    }
    if (this.isInShip()) {
        value *= 0.5;
    }
    return value;
};

/**
 * @method setDirection
 * @memberof Game_CharacterBase
 * @param {!Number} d - 方向
 * @desc 设置角色方向,当方向锁定时不进行设置,当设置方向与当前方向相同时,
 * 局部变量标签_ZPM_directionchanged为false,当不相同时,为true.
 * 用于某些方向关联的动态处理函数.
 * @summary 继承型
 * @returns {undefined} 
 */
var _ZPM_SuperMove_Game_CharacterBase_setDirection = Game_CharacterBase.prototype.setDirection;
Game_CharacterBase.prototype.setDirection = function (d) {
    if (!this.isDirectionFixed() && d) {
        if (this._direction != d) {
            this._ZPM_directionchanged = true;
        } else {
            this._ZPM_directionchanged = false;
        };
    };
    _ZPM_SuperMove_Game_CharacterBase_setDirection.call(this, d);
};

/**
 * @static
 * @method _setupEventHandlers
 * @memberof TouchInput
 * @desc 明确了_onWheel的Passive参数.
 * @summary 重写型
 * @override
 * @private
 * @returns {undefined} 
 */
TouchInput._setupEventHandlers = function () {
    var isSupportPassive = Utils.isSupportPassiveEvent();
    document.addEventListener('mousedown', this._onMouseDown.bind(this));
    document.addEventListener('mousemove', this._onMouseMove.bind(this));
    document.addEventListener('mouseup', this._onMouseUp.bind(this));
    document.addEventListener('wheel', this._onWheel.bind(this), isSupportPassive ? { passive: false } : false);
    document.addEventListener('touchstart', this._onTouchStart.bind(this), isSupportPassive ? { passive: false } : false);
    document.addEventListener('touchmove', this._onTouchMove.bind(this), isSupportPassive ? { passive: false } : false);
    document.addEventListener('touchend', this._onTouchEnd.bind(this));
    document.addEventListener('touchcancel', this._onTouchCancel.bind(this));
    document.addEventListener('pointerdown', this._onPointerDown.bind(this));
};

//==================================================
//**    调试模式    **
//==================================================

if (ZPM.SuperMove_TestMode) {
    var _ZPM_SuperMove_Sprite_Character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function (character) {
        _ZPM_SuperMove_Sprite_Character_initialize.call(this, character);
        this._boxbg = new Sprite();
        this._boxbg.anchor.x = 0.5;
        this._boxbg.anchor.y = 1;
        this.addChild(this._boxbg);
        this._boxbg.bitmap = new Bitmap(character.triggerboxwidth() * 48, character.triggerboxheight() * 48);
        this._boxbg.bitmap.fillAll(ZPM.SuperMove_BoxColor);
    };
    var _ZPM_SuperMove_Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function () {
        _ZPM_SuperMove_Sprite_Character_update.call(this);
        if ((this._boxbg.bitmap.width != (this._character.triggerboxwidth() * 48)) || (this._boxbg.bitmap.height != (this._character.triggerboxheight() * 48))) {
            this._boxbg.bitmap.resize(this._character.triggerboxwidth() * 48, this._character.triggerboxheight() * 48);
            this._boxbg._refresh();
        };
    };
};