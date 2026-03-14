//=============================================================================
// Drill_AnimationCircle.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        动画 - 多层动画魔法圈
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_AnimationCircle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你添加魔法圈，绑定在一个指定的动画上面。播放动画时能出现魔法圈。
 * 多个魔法圈可以设置在同一个动画中。
 * 要了解更详细的组合方法，去看看"多层组合背景,粒子,魔法圈,gif,视频.docx"。
 * 要了解更详细的设置效果，去看看"关于魔法效果与并行动画.docx"。
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面，战斗界面。
 *   作用于动画，伴随动画一起出现。
 * 2.动画魔法圈是一个具有持续时间的效果，分为 出现、持续、消失 三阶段。
 * 3.你需要在插件中一个个配置魔法圈绑定到动画上面。
 *  （绑定后，配置的动画和rmmv动画同时播放，rmmv动画你需要手动设置额外延时时间）
 * 4.你可以通过插件指令关闭所有动画魔法圈，做到长时间持续的魔法防御被打断。
 *   但是插件指令直接作用的是所有的魔法圈，你无法精确关闭一个动画的魔法圈。
 * 5.战斗界面中，会因为动画效果播放中而一直等到动画播放完才进行下一动作。
 *   如果你需要制作不等待的持续效果，你需要另外使用并行事件设置。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__anim （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__anim文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 魔法圈1 资源-魔法圈
 * 魔法圈2 资源-魔法圈
 * 魔法圈3 资源-魔法圈
 * ……
 *
 * 你可以在同一个动画里面加入非常多的不同种类的魔法圈，并且持续时间可以非常长。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制动画魔法圈的显示情况：
 * 
 * 插件指令：>动画魔法圈 : 1 : 显示
 * 插件指令：>动画魔法圈 : 3 : 隐藏
 *
 * 1.数字表示你在插件中配置对应的GIF编号。设置隐藏后，新动画不会显示GIF。
 * 2.作用于所有GIF对应的动画，但不包括播放中的动画GIF。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令对播放中的动画魔法圈进行设置：
 * 
 * 插件指令：>播放中的动画魔法圈 : 1 : 立即显示
 * 插件指令：>播放中的动画魔法圈 : 1 : 立即隐藏
 * 插件指令：>播放中的动画魔法圈 : 1 : 立即显现
 * 插件指令：>播放中的动画魔法圈 : 1 : 立即消失
 *
 * 1.数字表示当前你在插件中配置对应的GIF编号。
 * 2.立即显示/隐藏作用于播放中的GIF是否显示。
 *   立即显现作用是消除GIF的延迟时长。
 *   立即消失作用是使得播放中的GIF立刻进入消失状态。
 * 3.具体使用方法，可以去物体管理层西北角的"中断蓄力动画"看看。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 可以使得魔法圈设置在图像的后面。优化了插件扩展关系。
 * [v1.2]
 * 修改了内部结构。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 *
 *
 * @param ---魔法圈组 1至20---
 * @default
 *
 * @param 魔法圈-1
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-2
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-3
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-4
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-5
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-6
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-7
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-8
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-9
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-10
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-11
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-12
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-13
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-14
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-15
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-16
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-17
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-18
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-19
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-20
 * @parent ---魔法圈组 1至20---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组21至40---
 * @default
 *
 * @param 魔法圈-21
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-22
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-23
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-24
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-25
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-26
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-27
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-28
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-29
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-30
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-31
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-32
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-33
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-34
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-35
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-36
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-37
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-38
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-39
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-40
 * @parent ---魔法圈组21至40---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组41至60---
 * @default
 *
 * @param 魔法圈-41
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-42
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-43
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-44
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-45
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-46
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-47
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-48
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-49
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-50
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-51
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-52
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-53
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-54
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-55
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-56
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-57
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-58
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-59
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-60
 * @parent ---魔法圈组41至60---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组61至80---
 * @default
 *
 * @param 魔法圈-61
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-62
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-63
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-64
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-65
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-66
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-67
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-68
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-69
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-70
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-71
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-72
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-73
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-74
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-75
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-76
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-77
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-78
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-79
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-80
 * @parent ---魔法圈组61至80---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组81至100---
 * @default
 *
 * @param 魔法圈-81
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-82
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-83
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-84
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-85
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-86
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-87
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-88
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-89
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-90
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-91
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-92
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-93
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-94
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-95
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-96
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-97
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-98
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-99
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-100
 * @parent ---魔法圈组81至100---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组101至120---
 * @default
 *
 * @param 魔法圈-101
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-102
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-103
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-104
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-105
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-106
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-107
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-108
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-109
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-110
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-111
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-112
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-113
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-114
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-115
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-116
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-117
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-118
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-119
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-120
 * @parent ---魔法圈组101至120---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组121至140---
 * @default
 *
 * @param 魔法圈-121
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-122
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-123
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-124
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-125
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-126
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-127
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-128
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-129
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-130
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-131
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-132
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-133
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-134
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-135
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-136
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-137
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-138
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-139
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-140
 * @parent ---魔法圈组121至140---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组141至160---
 * @default
 *
 * @param 魔法圈-141
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-142
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-143
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-144
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-145
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-146
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-147
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-148
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-149
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-150
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-151
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-152
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-153
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-154
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-155
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-156
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-157
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-158
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-159
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-160
 * @parent ---魔法圈组141至160---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组161至180---
 * @default
 *
 * @param 魔法圈-161
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-162
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-163
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-164
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-165
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-166
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-167
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-168
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-169
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-170
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-171
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-172
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-173
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-174
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-175
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-176
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-177
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-178
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-179
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-180
 * @parent ---魔法圈组161至180---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组181至200---
 * @default
 *
 * @param 魔法圈-181
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-182
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-183
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-184
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-185
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-186
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-187
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-188
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-189
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-190
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-191
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-192
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-193
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-194
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-195
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-196
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-197
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-198
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-199
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-200
 * @parent ---魔法圈组181至200---
 * @type struct<animCircle>
 * @desc 动画魔法圈的详细配置信息。
 * @default 
 */
/*~struct~animCircle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的动画魔法圈==
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 绑定的动画
 * @type animation
 * @desc 指定动画的id，魔法圈将会与动画相互绑定。
 * @default 0
 *
 * @param 资源-魔法圈
 * @desc 魔法圈的图片资源。
 * @default 动画魔法圈-默认
 * @require 1
 * @dir img/Special__anim/
 * @type file
 *
 * @param 平移-魔法圈 X
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最左边。
 * @default 0
 *
 * @param 平移-魔法圈 Y
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最上面。
 * @default 0
 *
 * @param 混合模式
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 旋转速度
 * @desc 正数逆时针，负数顺时针，单位 弧度/帧。(1秒60帧)
 * 6.28表示一圈，设置0.01表示大概10秒转一圈，设置0则不旋转。
 * @default 0.01
 *
 * @param 动画层级
 * @type select
 * @option 在图像后面
 * @value 在图像后面
 * @option 在动画后面
 * @value 在动画后面
 * @option 在动画前面
 * @value 在动画前面
 * @desc 粒子所属的动画层级。图像后面是指：战斗时，敌人/玩家图像的后面，地图中，事件图像的后面。
 * @default 在动画后面
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 魔法圈在同一个动画，并且在同一动画层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 * @param --动画过程--
 * @desc 
 *
 * @param 出现延迟
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 魔法圈将延迟一段时间显现，单位帧。
 * @default 0
 *
 * @param 出现时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 魔法圈显现的时间，单位帧。
 * @default 60
 *
 * @param 出现模式
 * @parent --动画过程--
 * @type select
 * @option 横向显现
 * @value 横向显现
 * @option 纵向显现
 * @value 纵向显现
 * @option 放大显现
 * @value 放大显现
 * @option 缩小显现
 * @value 缩小显现
 * @option 普通淡入显现
 * @value 普通淡入显现
 * @desc 魔法圈显现的模式方法。
 * @default 横向显现
 *
 * @param 持续时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 魔法圈持续的时间，单位帧。
 * @default 220
 *
 * @param 消失时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 魔法圈显现的延迟时间。
 * @default 30
 *
 * @param 消失模式
 * @parent --动画过程--
 * @type select
 * @option 横向消失
 * @value 横向消失
 * @option 纵向消失
 * @value 纵向消失
 * @option 放大消失
 * @value 放大消失
 * @option 缩小消失
 * @value 缩小消失
 * @option 普通淡出消失
 * @value 普通淡出消失
 * @desc 魔法圈消失的模式方法。
 * @default 普通淡出消失
 * 
 * @param --3d效果--
 * @desc 
 * 
 * @param 缩放 X
 * @parent --3d效果--
 * @desc 魔法圈的缩放X值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 缩放 Y
 * @parent --3d效果--
 * @desc 魔法圈的缩放Y值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 斜切 X
 * @parent --3d效果--
 * @desc 魔法圈的斜切X值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 斜切 Y
 * @parent --3d效果--
 * @desc 魔法圈的斜切Y值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ACi (Animation_Circle)
//		临时全局变量	DrillUp.g_ACi_xxx
//		临时局部变量	this._drill_ACi_xxx
//		存储数据变量	$gameSystem._drill_ACi_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		★大体框架与功能如下：
//			动画魔法圈：
//				->0.延迟 1.开始 2.持续 3.结束
//				->出现/消失效果
//				->图像后面层
//				->插件指令立即消失
//		
//		★私有类如下：
//			* Drill_AnimationCircle_Sprite【动画魔法圈】
//
//		★必要注意事项：
//			1.容器的所有函数，都是对外的接口，名字已固定。
//				DrillUp.drill_aCircles_xxxx
//			2.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			  动画层级比较特殊，为：
//				_drill_anim_charBack 			图片后面层
//				_drill_anim_back				动画后面层
//				_drill_anim_fore				动画前面层
//				_drill_duration_decreased		减一锁（多次覆写）
//				_drill_duration					延迟时间（多次覆写）
//
//		★其它说明细节：
//			1.该插件的原理模式与菜单魔法圈有较大不同，虽然配置原理相似。
//			  最开始做的是仅限于地图中固定的蓄力魔法阵。
//			  但是那一类插件局限性太大，还需要考虑播放时间，而且还要阻止魔法蓄力的事件移动。
//			  后来发现其实魔法圈可以其实直接绑定在动画容器中，因为动画时绑定在所有sprite_base中的，任何地方都可以播放动画。一劳永逸。
//			  rmmv底层，任何sprite都绑定了一个动画容器_animationSprites，这就使得动画可以在很多地方被播放。
//			2.【动画容器_animationSprites】绕等级★，
//			  将魔法圈sprite绑定在动画中，在动画基础上，扩展动画播放的效果。
//			  但是绑定之后，结束效果会出现比较麻烦的情况。
//			  不好获取所有正在播放的动画。
//			  （后面都是通过绕路来添加其他插件的控制条件）
//			3.【图像后面层】绕等级★★，
//			  为了使得动画在角色身后，找父类找到最顶层的 Spriteset_Battle，然后找到指定的子类层，添加。
//			  并且要绑定随时变化的敌人/玩家位置。
//			  ._drill_anim_charBack 图片后面层
//			  ._drill_ACi_charBack 图片后面层（临时）
//			  ._drill_parent_sprite 确定跟随位移
//			4.【设置 战斗单位+动画id 的魔法圈消失】绕等级★★★
//			  在设置._drill_parent_sprite的基础上，
//			  因为找到了battler_sprite，就能找到battler，于是将这个battler指针作为条件来进行判断。
//			  （地图事件贴图的后面，原理与战斗寻找一样，这里不赘述）
//			5.与 MOG_BattleHud 和 Drill_BattleCamera 有关联，用于定位第一人称下的动画位置。
//
//		★存在的问题：
//			暂无
//
//	
//	
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationCircle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AnimationCircle');
	
	DrillUp.g_ACi_max = 200;
	DrillUp.g_ACi = [];
	
	for (var i = 0; i < DrillUp.g_ACi_max; i++) {
		if( DrillUp.parameters['魔法圈-' + String(i+1) ] != "" ){
			DrillUp.g_ACi[i] = JSON.parse(DrillUp.parameters['魔法圈-' + String(i+1) ]);
			DrillUp.g_ACi[i]['id'] = i+1;
			DrillUp.g_ACi[i]['visible'] = String(DrillUp.g_ACi[i]["初始是否显示"] || "true") == "true";
			DrillUp.g_ACi[i]['anim'] = Number(DrillUp.g_ACi[i]["绑定的动画"]);
			DrillUp.g_ACi[i]['src_img'] = String(DrillUp.g_ACi[i]["资源-魔法圈"]);
			DrillUp.g_ACi[i]['x'] = Number(DrillUp.g_ACi[i]["平移-魔法圈 X"]);
			DrillUp.g_ACi[i]['y'] = Number(DrillUp.g_ACi[i]["平移-魔法圈 Y"]);
			DrillUp.g_ACi[i]['blendMode'] = Number(DrillUp.g_ACi[i]["混合模式"]);
			DrillUp.g_ACi[i]['rotate'] = Number(DrillUp.g_ACi[i]["旋转速度"]);
			DrillUp.g_ACi[i]['anim_index'] = String(DrillUp.g_ACi[i]["动画层级"]);
			DrillUp.g_ACi[i]['zIndex'] = Number(DrillUp.g_ACi[i]["图片层级"]);
			
			DrillUp.g_ACi[i]['delay'] = Number(DrillUp.g_ACi[i]["出现延迟"]);
			DrillUp.g_ACi[i]['birth'] = Number(DrillUp.g_ACi[i]["出现时长"]);
			DrillUp.g_ACi[i]['birthMode'] = String(DrillUp.g_ACi[i]["出现模式"] || "横向展开");
			DrillUp.g_ACi[i]['sustain'] = Number(DrillUp.g_ACi[i]["持续时长"]);
			DrillUp.g_ACi[i]['death'] = Number(DrillUp.g_ACi[i]["消失时长"]);
			DrillUp.g_ACi[i]['deathMode'] = String(DrillUp.g_ACi[i]["消失模式"] || "普通淡出消失");
			
			DrillUp.g_ACi[i]['scale_x'] = Number(DrillUp.g_ACi[i]["缩放 X"] || 1.0);
			DrillUp.g_ACi[i]['scale_y'] = Number(DrillUp.g_ACi[i]["缩放 Y"] || 1.0);
			DrillUp.g_ACi[i]['skew_x'] = Number(DrillUp.g_ACi[i]["斜切 X"] || 0);
			DrillUp.g_ACi[i]['skew_y'] = Number(DrillUp.g_ACi[i]["斜切 Y"] || 0);
		}else{
			DrillUp.g_ACi[i] = [];
		}
	}
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_SpecialAnim = function(filename) {
    return this.loadBitmap('img/Special__anim/', filename, 0, true);
};

//=============================================================================
// * 播放中的动画魔法圈 - 容器
//=============================================================================
	DrillUp.g_ACi_playing_tank = [];	//全局临时存储正在动画中播放的魔法圈（该操作可能不安全，但是目前没有别的方法）
	
	//获取 所有动画id 的魔法圈消失
	DrillUp.drill_aCircles_getCirclesById = function(tar_id) {
		var result = [];
		for(var i in DrillUp.g_ACi_playing_tank){
			var temp = DrillUp.g_ACi_playing_tank[i];
			if( temp._drill_data['id'] == tar_id ){
				result.push(temp);
			}
		}
		return result;
	}
	//设置 所有动画id 的魔法圈消失
	DrillUp.drill_aCircles_setDeathById = function(tar_id) {
		for(var i in DrillUp.g_ACi_playing_tank){
			var temp = DrillUp.g_ACi_playing_tank[i];
			if( temp._drill_data['id'] == tar_id &&
				temp._drill_cur_time < temp._drill_time_all - temp._drill_time_death ){
				temp._drill_cur_time = temp._drill_time_all - temp._drill_time_death;
			}
		}
	}
	//设置 所有动画id 的魔法圈显现
	DrillUp.drill_aCircles_setSustainById = function(tar_id) {
		for(var i in DrillUp.g_ACi_playing_tank){
			var temp = DrillUp.g_ACi_playing_tank[i];
			if( temp._drill_data['id'] == tar_id &&
				temp._drill_cur_time < temp._drill_time_delay ){
				temp._drill_cur_time = temp._drill_time_delay ;
			}
		}
	}
	//设置 战斗单位+动画id 的魔法圈消失（仅限战斗单位，tar_id = -1 表示单位的全部魔法圈）
	DrillUp.drill_aCircles_setDeathByIdAndBattler = function(tar_id,battler) {
		for(var i in DrillUp.g_ACi_playing_tank){
			var temp = DrillUp.g_ACi_playing_tank[i];
			if( (temp._drill_data['anim'] == tar_id || tar_id == -1 ) && 
				temp._drill_parent_sprite != undefined  && 
				temp._drill_parent_sprite._battler == battler  && 
				temp._drill_cur_time < temp._drill_time_all - temp._drill_time_death ){
				temp._drill_cur_time = temp._drill_time_all - temp._drill_time_death;
			}
		}
	}
	//给未绑定的动画，绑定单位sprite
	DrillUp.drill_aCircles_setBattlerSprite = function( battlerSprite ) {
		for(var i in DrillUp.g_ACi_playing_tank){
			var temp = DrillUp.g_ACi_playing_tank[i];
			if( temp._drill_parent_sprite == undefined ){
				temp._drill_parent_sprite = battlerSprite;
			}
		}
	}
	//帧刷新去除
	DrillUp.drill_aCircles_updateDelete = function() {
		for (var i in DrillUp.g_ACi_playing_tank ) {	
			var temp = DrillUp.g_ACi_playing_tank[i];
			if( temp['_drill_time_all'] <= temp['_drill_cur_time']){
				DrillUp.g_ACi_playing_tank.splice(i,1);
				delete temp;
			}
			break;
		}
	}

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_ACi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ACi_pluginCommand.call(this, command, args);
	if (command === '>动画魔法圈') {
		if(args.length == 4){
			var temp1 = Number(args[1]) - 1;
			var type = String(args[3]);
			if (type === '显示') {
				$gameSystem._drill_ACi_visible[temp1] = true;
			}
			if (type === '隐藏') {
				$gameSystem._drill_ACi_visible[temp1] = false;
			}
		}
	}
	if (command === '>播放中的动画魔法圈') {
		if(args.length == 4){
			var temp_id = Number(args[1]) ;
			var type = String(args[3]);
			if (type === '立即显示') {
				for(var i in DrillUp.g_ACi_playing_tank){
					if( DrillUp.g_ACi_playing_tank[i].id == temp_id ){
						DrillUp.g_ACi_playing_tank[i].visible = true;
					}
				}
				$gameSystem._drill_ACi_visible[i] = true;
			}
			if (type === '立即隐藏') {
				for(var i in DrillUp.g_ACi_playing_tank){
					if( DrillUp.g_ACi_playing_tank[i].id == temp_id ){
						DrillUp.g_ACi_playing_tank[i].visible = false;
					}
				}
				$gameSystem._drill_ACi_visible[i] = false;
			}
			if (type === '立即消失') {
				DrillUp.drill_aCircles_setDeathById(temp_id);
			}
			if (type === '立即显现') {
				DrillUp.drill_aCircles_setSustainById(temp_id);
			}
		}
	}
};

//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_ACi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ACi_sys_initialize.call(this);
	this._drill_ACi_visible = [];
	for(var i = 0; i< DrillUp.g_ACi.length ;i++){
		this._drill_ACi_visible[i] = DrillUp.g_ACi[i]['visible'];
	}
};	

//=============================================================================
// ** 动画设置
//=============================================================================
//==============================
// * 动画-初始化
//==============================
var _drill_ACi_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
	_drill_ACi_initMembers.call(this);
	this._drill_duration = 0;			//最大持续时间
}

//==============================
// * 动画-设置
//==============================
var _drill_ACi_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	
	if( !this._drill_ACi_charBack ){	//图像后面层（预置，后续在父类中重置取出）
		this._drill_ACi_charBack = new Sprite();
		this.addChild(this._drill_ACi_charBack);
	}
	if( !this._drill_anim_back ){		//动画后面层
		this._drill_anim_back = new Sprite();
		this.addChild(this._drill_anim_back);
	}
    _drill_ACi_setup.call(this,target, animation, mirror, delay);
	
	if( !this._drill_anim_fore ){		//动画前面层
		this._drill_anim_fore = new Sprite();
		this.addChild(this._drill_anim_fore);
	}
	
    if (this._animation) {
		//alert(JSON.stringify(this._animation));
		for (var i = 0; i < DrillUp.g_ACi.length; i++) {			
			var anim_data = DrillUp.g_ACi[i];
			if(this._animation.id == anim_data['anim'] ){
				var temp = new Drill_AnimationCircle_Sprite( this._animation ,anim_data );
				DrillUp.g_ACi_playing_tank.push(temp);
				if( anim_data['anim_index'] == "在动画前面" ){
					this._drill_anim_fore.addChild(temp);
				}else if( anim_data['anim_index'] == "在动画后面" ){
					this._drill_anim_back.addChild(temp);
				}else if( anim_data['anim_index'] == "在图像后面" ){
					this._drill_ACi_charBack.addChild(temp);
				}
				this._drill_duration =  Math.max(this._drill_duration, Math.max( temp._drill_time_all + 1 , this._duration));
			}
		}
		this.drill_sortByZIndex();
	}
};


//==============================
// * 动画-图像后面层 -战斗层定义
//==============================
var _drill_ACi_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    
	if( !this._drill_anim_charBack ){		//图像后面层
		this._drill_anim_charBack = new Sprite();
		this._battleField.addChild(this._drill_anim_charBack);
	}
	
	_drill_ACi_createEnemies.call(this);	
};

//==============================
// * 动画-图像后面层 -地图层定义
//==============================
var _drill_ACi_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( !this._drill_anim_charBack ){		//图像后面层
		this._drill_anim_charBack = new Sprite();
		this._tilemap.addChild(this._drill_anim_charBack);
	}
	
	_drill_ACi_createCharacters.call(this);
};
//==============================
// * 动画-图像后面层 -添加动画
//==============================
var _drill_ACi_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    _drill_ACi_startAnimation.call(this,animation, mirror, delay);
	
	DrillUp.drill_aCircles_setBattlerSprite(this);	//绑定单位sprite
	
	var last_sprite = this._animationSprites[this._animationSprites.length - 1];	//获取到添加的动画
	if(	last_sprite._drill_ACi_charBack != undefined &&
		last_sprite._drill_ACi_charBack.children.length != 0){

		//-->战斗界面的敌人、玩家 + SV模式
		if( this.constructor.name == "Sprite_Enemy" 
			|| (this.constructor.name == "Sprite_Actor" && $gameSystem.isSideView() )
		){
			//alert(this.parent.parent.parent.constructor.name);	//上一层级 ._battleField >> ._baseSprite >> Spriteset_Battle
			if( this.parent != undefined && this.parent.parent != undefined && this.parent.parent.parent != undefined &&
				this.parent.parent.parent.constructor.name == "Spriteset_Battle"){
				
				var anims = last_sprite._drill_ACi_charBack.children;
				var len = anims.length;		//注意，操作会改变anims数组的长度
				for(var i = 0; i<len; i++){
					anims[0]._drill_is_charBack = true;
					this.parent.parent.parent._drill_anim_charBack.addChild(anims[0]);	//重复addChild会被移走
				}
			}
		}
		//-->战斗界面的玩家 + 第一人称 + 使用了角色窗口
		if( this.constructor.name == "Sprite_Actor" && !$gameSystem.isSideView() && Imported.MOG_BattleHud ){
			//alert(this.parent.parent.constructor.name);//上一层级 ._hudField >> Scene_Base
			
			if( this.parent != undefined && this.parent.parent != undefined && 
				this.parent.parent._spriteset != undefined &&
				this.parent.parent._spriteset.constructor.name == "Spriteset_Battle"){
					
				var anims = last_sprite._drill_ACi_charBack.children;
				var len = anims.length;		//注意，操作会改变anims数组的长度
				for(var i = 0; i<len; i++){
					anims[0]._drill_is_charBack = true;
					this.parent.parent._spriteset._drill_anim_charBack.addChild(anims[0]);
				}
			}
		}
		//-->地图中的事件
		if( this.constructor.name == "Sprite_Character" ){
			//alert(this.parent.parent.parent.constructor.name);//上一层级 ._tilemap >> ._baseSprite >> Spriteset_Map
			
			if( this.parent != undefined && this.parent.parent != undefined && this.parent.parent.parent != undefined &&
				this.parent.parent.parent.constructor.name == "Spriteset_Map"){
				
				var anims = last_sprite._drill_ACi_charBack.children;
				var len = anims.length;		//注意，操作会改变anims数组的长度
				for(var i = 0; i<len; i++){
					anims[0]._drill_is_charBack = true;
					this.parent.parent.parent._drill_anim_charBack.addChild(anims[0]);
				}
			}
		}
	}
};


//==============================
// * 动画-播放中
//==============================
var _drill_ACi_isPlaying = Sprite_Animation.prototype.isPlaying;
Sprite_Animation.prototype.isPlaying = function() {
    if( this._drill_duration > 0 ){
		return true;
	}
	return _drill_ACi_isPlaying.call(this);
};

//==============================
// * 动画-帧刷新
//==============================
var _drill_ACi_update = Sprite_Animation.prototype.update;
Sprite_Animation.prototype.update = function() {
	this._drill_duration_decreased = false;		//减一锁，确保多次继承后，减一后，不会继续执行减一方法。
	_drill_ACi_update.call(this);
	if(this._drill_duration_decreased == false){
		this._drill_duration--;
		this._drill_duration_decreased = true;
	}
}

//==============================
// * 动画-移除（空指针优化）
//==============================
var _drill_ACi_remove = Sprite_Animation.prototype.remove;
Sprite_Animation.prototype.remove = function() {
	if( this._target != undefined ){
		_drill_ACi_remove.call(this);
	}else{
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
};

//==============================
// ** 层级排序
//==============================
Sprite_Animation.prototype.drill_sortByZIndex = function() {
   this._drill_anim_back.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._drill_anim_fore.children.sort(function(a, b){return a.zIndex-b.zIndex});
};


//=============================================================================
// ** 魔法圈外部控制（消除sprite）
//=============================================================================
var _drill_ACi_timer_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function(sceneActive) {
    _drill_ACi_timer_update.call(this,sceneActive);
	DrillUp.drill_aCircles_updateDelete();
};


//=============================================================================
// * Drill_AnimationCircle_Sprite 动画魔法圈
//=============================================================================
function Drill_AnimationCircle_Sprite() {
    this.initialize.apply(this, arguments);
};

Drill_AnimationCircle_Sprite.prototype = Object.create(Sprite.prototype);
Drill_AnimationCircle_Sprite.prototype.constructor = Drill_AnimationCircle_Sprite;

//==============================
// * 初始化-框架
//==============================
Drill_AnimationCircle_Sprite.prototype.initialize = function(animation,settings) {
	Sprite.prototype.initialize.call(this);
	this._animation = animation;		//存入设置数据
	this._drill_data = settings;
	
	this._drill_cur_time = 0;			//魔法阵当前时间
	this._drill_cur_model = 0;			//魔法阵阶段：0.延迟 1.开始 2.持续 3.结束
	this._drill_time_delay = settings['delay'];			//出现延迟
	this._drill_time_birth = settings['birth'];			//出现时长
	this._drill_time_sustain = settings['sustain'];		//持续时长
	this._drill_time_death = settings['death'];			//消失时长
	this._drill_time_all = this._drill_time_delay + this._drill_time_birth + this._drill_time_sustain + this._drill_time_death;
	
	this.x = settings['x'];
	this.y = settings['y'];
	this.blendMode = settings['blendMode'];
	this.zIndex = settings['zIndex'];
	this.opacity = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = $gameSystem._drill_ACi_visible[settings['id']-1];
	this._drill_is_charBack = false;	//是否在图片下方
	
	this._drill_circles = [];
	this._drill_circles_bitmap = [];
	this._drill_parent_sprite = null;	//跨层级跟随sprite的xy位置
	this.drill_createCircle();
	
};
//==============================
// * 初始化-魔法圈
//==============================
Drill_AnimationCircle_Sprite.prototype.drill_createCircle = function() {
	
	var temp_sprite_bitmap = new Sprite(ImageManager.load_SpecialAnim(this._drill_data['src_img']));
	temp_sprite_bitmap.anchor.x = 0.5;
	temp_sprite_bitmap.anchor.y = 0.5;
	
	var temp_sprite = new Sprite();		//魔法圈两层容器
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.scale.x = this._drill_data['scale_x'];
	temp_sprite.scale.y = this._drill_data['scale_y'];
	temp_sprite.skew.x = this._drill_data['skew_x'];
	temp_sprite.skew.y = this._drill_data['skew_y'];
	
	this._drill_circle = temp_sprite;
	this._drill_circle_bitmap = temp_sprite_bitmap;
	temp_sprite.addChild(temp_sprite_bitmap);
	this.addChild(temp_sprite);
	
}
//==============================
// * 帧刷新
//==============================
Drill_AnimationCircle_Sprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	if( this._drill_is_charBack == true ){		//图片后面层
		var _sprite = this._drill_parent_sprite;
		this.x = this._drill_data['x'] + _sprite.x;
		this.y = this._drill_data['y'] + _sprite.y;
		if( _sprite.constructor.name == "Sprite_Enemy" ){	//敌人位置修正
			this.y -= _sprite.width/2;
		}
		if( Imported.Drill_BattleCamera && _sprite.constructor.name == "Sprite_Actor" && !$gameSystem.isSideView() ){	//玩家第一人称位置修正（镜头）
			this.x -= $gameTemp._drill_cam_pos[0];
			this.y -= $gameTemp._drill_cam_pos[1];
		}
		if( _sprite.constructor.name == "Sprite_Character" ){	//地图位置修正
			this.y -= 24;
		}
	}
	
	if( this._drill_cur_time == 0){
		this.drill_birthState();
		this.drill_deathState();
	}
	this._drill_cur_time += 1;
	if( this._drill_cur_time < this._drill_time_delay){
		this._drill_cur_model = 0;
	}else if( this._drill_cur_time < this._drill_time_delay + this._drill_time_birth  ){
		this._drill_cur_model = 1;
	}else if( this._drill_cur_time < this._drill_time_delay + this._drill_time_birth + this._drill_time_sustain ){
		this._drill_cur_model = 2;
	}else{
		this._drill_cur_model = 3;
	}
	
	if(this._drill_cur_model == 1){
		this.drill_updateBirthing();
	}else if(this._drill_cur_model == 3){
		this.drill_updateDying();
	}
	
	this._drill_circle_bitmap.rotation += this._drill_data['rotate'];
}
//==============================
// * 出现状态
//==============================
Drill_AnimationCircle_Sprite.prototype.drill_birthState = function() {
	this.start_scale_x = 1;
	this.start_scale_y = 1;
	this.start_opacity = 0;
	if(this._drill_data['birthMode'] == "横向显现"){
		this.scale.y = 0;
		this.opacity = 0;
		this.start_scale_y = 0;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "纵向显现"){
		this.scale.x = 0;
		this.opacity = 0;
		this.start_scale_x = 0;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "放大显现"){
		this.scale.x = 0;
		this.scale.y = 0;
		this.opacity = 0;
		this.start_scale_x = 0;
		this.start_scale_y = 0;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "缩小显现"){
		this.scale.x = 2;
		this.scale.y = 2;
		this.opacity = 0;
		this.start_scale_x = 2;
		this.start_scale_y = 2;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "普通淡入显现"){
		this.opacity = 0;
		this.start_opacity = 0;
	}
}
//==============================
// * 消失状态
//==============================
Drill_AnimationCircle_Sprite.prototype.drill_deathState = function() {
	this.tar_scale_x = 1;
	this.tar_scale_y = 1;
	this.tar_opacity = 255;
	if(this._drill_data['deathMode'] == "横向消失"){
		this.tar_scale_y = 0;
		this.tar_opacity = 0;
	}else if(this._drill_data['deathMode'] == "纵向消失"){
		this.tar_scale_x = 0;
		this.tar_opacity = 0;
	}else if(this._drill_data['deathMode'] == "放大消失"){
		this.tar_scale_x = 2;
		this.tar_scale_y = 2;
		this.tar_opacity = 0;
	}else if(this._drill_data['deathMode'] == "缩小消失"){
		this.tar_scale_x = 0;
		this.tar_scale_y = 0;
		this.tar_opacity = 0;
	}else if(this._drill_data['deathMode'] == "普通淡出消失"){
		this.tar_opacity = 0;
	}
}
//==============================
// * 魔法圈出现
//==============================
Drill_AnimationCircle_Sprite.prototype.drill_updateBirthing = function() {
	this.opacity += ( 255 - this.start_opacity )/this._drill_time_birth;
	
	this.drill_scaleX_move_to(this, 1, Math.abs(this.start_scale_x -1)/this._drill_time_birth);
	this.drill_scaleY_move_to(this, 1, Math.abs(this.start_scale_y -1)/this._drill_time_birth);
	
}
//==============================
// * 魔法圈消失
//==============================
Drill_AnimationCircle_Sprite.prototype.drill_updateDying = function() {
	this.opacity -= ( 255 - this.tar_opacity )/this._drill_time_death;
	
	this.drill_scaleX_move_to(this, this.tar_scale_x, Math.abs(1-this.tar_scale_x)/this._drill_time_death);
	this.drill_scaleY_move_to(this, this.tar_scale_y, Math.abs(1-this.tar_scale_y)/this._drill_time_death);
	
}

//==============================
// * 缩放控制
//==============================
Drill_AnimationCircle_Sprite.prototype.drill_scaleX_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.x - s;
	if( ds < 0 ){ sprite.scale.x += speed; }
	if( ds > 0 ){ sprite.scale.x -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.x = s; }
}
Drill_AnimationCircle_Sprite.prototype.drill_scaleY_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.y - s;
	if( ds < 0 ){ sprite.scale.y += speed; }
	if( ds > 0 ){ sprite.scale.y -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.y = s; }
}

