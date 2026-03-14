//=============================================================================
// Drill_AnimationGIF.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        动画 - 多层动画GIF
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_AnimationGIF +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你添加GIF，绑定在一个指定的动画上面。播放动画时能出现GIF。
 * 多个GIF可以设置在同一个动画中。
 * 要了解更详细的组合方法，去看看"多层组合背景,粒子,魔法圈,gif,视频.docx"。
 * 要了解更详细的设置效果，去看看"关于魔法效果与并行动画.docx"。
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面，战斗界面。
 *   作用于动画，伴随动画一起出现。
 * 2.动画GIF是一个具有持续时间的效果，分为 出现、持续、消失 三阶段。
 * 3.你需要在插件中一个个配置GIF绑定到动画上面。
 *  （绑定后，配置的动画和rmmv动画同时播放，rmmv动画你需要手动设置额外延时时间）
 * 4.你可以通过插件指令关闭所有动画GIF，做到长时间持续的魔法防御被打断。
 *   但是插件指令直接作用的是所有的GIF，你无法精确关闭一个动画的GIF。
 * 5.战斗界面中，会因为动画效果播放中而一直等到动画播放完才进行下一动作。
 *   如果你需要制作不等待的持续效果，你需要另外使用并行事件设置。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__anim_gif （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__anim_gif文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * GIF1 资源-GIF
 * GIF2 资源-GIF
 * GIF3 资源-GIF
 * ……
 *
 * 你可以在同一个动画里面加入非常多的不同种类的GIF，并且持续时间可以非常长。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制动画GIF的显示情况：
 * 
 * 插件指令：>动画GIF : 1 : 显示
 * 插件指令：>动画GIF : 3 : 隐藏
 *
 * 1.数字表示你在插件中配置对应的GIF编号。设置隐藏后，新动画不会显示GIF。
 * 2.作用于所有GIF对应的动画，但不包括播放中的动画GIF。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令对播放中的动画GIF进行设置：
 * 
 * 插件指令：>播放中的动画GIF : 1 : 立即显示
 * 插件指令：>播放中的动画GIF : 1 : 立即隐藏
 * 插件指令：>播放中的动画GIF : 1 : 立即显现
 * 插件指令：>播放中的动画GIF : 1 : 立即消失
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
 * 修改了内部结构。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 *
 *
 * @param ---GIF组 1至20---
 * @default
 *
 * @param GIF-1
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-2
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-3
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-4
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-5
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-6
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-7
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-8
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-9
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-10
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-11
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-12
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-13
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-14
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-15
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-16
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-17
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-18
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-19
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-20
 * @parent ---GIF组 1至20---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组21至40---
 * @default
 *
 * @param GIF-21
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-22
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-23
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-24
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-25
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-26
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-27
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-28
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-29
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-30
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-31
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-32
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-33
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-34
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-35
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-36
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-37
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-38
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-39
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-40
 * @parent ---GIF组21至40---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组41至60---
 * @default
 *
 * @param GIF-41
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-42
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-43
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-44
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-45
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-46
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-47
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-48
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-49
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-50
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-51
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-52
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-53
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-54
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-55
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-56
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-57
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-58
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-59
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-60
 * @parent ---GIF组41至60---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组61至80---
 * @default
 *
 * @param GIF-61
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-62
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-63
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-64
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-65
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-66
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-67
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-68
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-69
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-70
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-71
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-72
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-73
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-74
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-75
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-76
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-77
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-78
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-79
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-80
 * @parent ---GIF组61至80---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组81至100---
 * @default
 *
 * @param GIF-81
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-82
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-83
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-84
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-85
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-86
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-87
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-88
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-89
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-90
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-91
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-92
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-93
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-94
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-95
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-96
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-97
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-98
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-99
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-100
 * @parent ---GIF组81至100---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组101至120---
 * @default
 *
 * @param GIF-101
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-102
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-103
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-104
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-105
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-106
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-107
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-108
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-109
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-110
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-111
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-112
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-113
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-114
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-115
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-116
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-117
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-118
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-119
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-120
 * @parent ---GIF组101至120---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组121至140---
 * @default
 *
 * @param GIF-121
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-122
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-123
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-124
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-125
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-126
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-127
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-128
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-129
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-130
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-131
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-132
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-133
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-134
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-135
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-136
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-137
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-138
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-139
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-140
 * @parent ---GIF组121至140---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组141至160---
 * @default
 *
 * @param GIF-141
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-142
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-143
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-144
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-145
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-146
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-147
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-148
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-149
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-150
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-151
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-152
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-153
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-154
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-155
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-156
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-157
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-158
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-159
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-160
 * @parent ---GIF组141至160---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组161至180---
 * @default
 *
 * @param GIF-161
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-162
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-163
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-164
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-165
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-166
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-167
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-168
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-169
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-170
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-171
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-172
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-173
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-174
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-175
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-176
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-177
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-178
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-179
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-180
 * @parent ---GIF组161至180---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组181至200---
 * @default
 *
 * @param GIF-181
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-182
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-183
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-184
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-185
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-186
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-187
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-188
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-189
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-190
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-191
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-192
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-193
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-194
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-195
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-196
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-197
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-198
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-199
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 *
 * @param GIF-200
 * @parent ---GIF组181至200---
 * @type struct<animGIF>
 * @desc 动画GIF的详细配置信息。
 * @default 
 */
/*~struct~animGIF:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的动画GIF==
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
 * @desc 指定动画的id，GIF将会与动画相互绑定。
 * @default 0
 * 
 * @param 资源-GIF
 * @desc GIF的图片资源组，多张构成gif。
 * @default ["GIF-默认"]
 * @require 1
 * @dir img/Special__anim_gif/
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
 * @param 平移-GIF X
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最左边。
 * @default 0
 *
 * @param 平移-GIF Y
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
 * @desc GIF在同一个动画，并且在同一动画层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 * @param --动画过程--
 * @desc 
 *
 * @param 出现延迟
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc GIF将延迟一段时间显现，单位帧。
 * @default 0
 *
 * @param 出现时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc GIF显现的时间，单位帧。
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
 * @desc GIF显现的模式方法。
 * @default 横向显现
 *
 * @param 持续时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc GIF持续的时间，单位帧。
 * @default 220
 *
 * @param 消失时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc GIF显现的延迟时间。
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
 * @desc GIF消失的模式方法。
 * @default 普通淡出消失
 * 
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
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		AGi（Animation_Gif）
//		临时全局变量	DrillUp.g_AGi_xxx
//		临时局部变量	this._drill_AGi_xxx
//		存储数据变量	$gameSystem._drill_AGi_xxx
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
//			* Drill_AnimationGIF_Sprite【动画GIF】
//		
//		★必要注意事项：
//			1.容器的所有函数，都是对外的接口，名字已固定。
//				DrillUp.drill_aGIFs_xxxx
//			2.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			  动画层级比较特殊，为：
//				_drill_anim_charBack 			图片后面层
//				_drill_anim_back				动画后面层
//				_drill_anim_fore				动画前面层
//				_drill_duration_decreased		减一锁（多次覆写）
//				_drill_duration					延迟时间（多次覆写）
//
//		★其它说明细节：
//			1.插件详细原理说明见 Drill_AnimationCircle 。	
//			2.与 MOG_BattleHud 和 Drill_BattleCamera 有关联，用于定位第一人称下的动画位置。
//			3.在circle的基础上添加了gif播放功能，保留了3d效果。
//
//		★存在的问题：
//			暂无
//		
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationGIF = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AnimationGIF');
	
	DrillUp.g_AGi_GIF_max = 200;
	DrillUp.g_AGi_GIF = [];
	
	for (var i = 0; i < DrillUp.g_AGi_GIF_max; i++) {
		if( DrillUp.parameters['GIF-' + String(i+1) ] != "" ){
			DrillUp.g_AGi_GIF[i] = JSON.parse(DrillUp.parameters['GIF-' + String(i+1) ]);
			DrillUp.g_AGi_GIF[i]['id'] = i+1;
			DrillUp.g_AGi_GIF[i]['visible'] = String(DrillUp.g_AGi_GIF[i]["初始是否显示"] || "true") == "true";
			DrillUp.g_AGi_GIF[i]['anim'] = Number(DrillUp.g_AGi_GIF[i]["绑定的动画"]);
			DrillUp.g_AGi_GIF[i]['x'] = Number(DrillUp.g_AGi_GIF[i]["平移-GIF X"]);
			DrillUp.g_AGi_GIF[i]['y'] = Number(DrillUp.g_AGi_GIF[i]["平移-GIF Y"]);
			DrillUp.g_AGi_GIF[i]['blendMode'] = Number(DrillUp.g_AGi_GIF[i]["混合模式"]);
			DrillUp.g_AGi_GIF[i]['rotate'] = Number(DrillUp.g_AGi_GIF[i]["旋转速度"]);
			DrillUp.g_AGi_GIF[i]['anim_index'] = String(DrillUp.g_AGi_GIF[i]["动画层级"]);
			DrillUp.g_AGi_GIF[i]['zIndex'] = Number(DrillUp.g_AGi_GIF[i]["图片层级"]);
			
			DrillUp.g_AGi_GIF[i]['delay'] = Number(DrillUp.g_AGi_GIF[i]["出现延迟"]);
			DrillUp.g_AGi_GIF[i]['birth'] = Number(DrillUp.g_AGi_GIF[i]["出现时长"]);
			DrillUp.g_AGi_GIF[i]['birthMode'] = String(DrillUp.g_AGi_GIF[i]["出现模式"] || "横向展开");
			DrillUp.g_AGi_GIF[i]['sustain'] = Number(DrillUp.g_AGi_GIF[i]["持续时长"]);
			DrillUp.g_AGi_GIF[i]['death'] = Number(DrillUp.g_AGi_GIF[i]["消失时长"]);
			DrillUp.g_AGi_GIF[i]['deathMode'] = String(DrillUp.g_AGi_GIF[i]["消失模式"] || "普通淡出消失");
			
			DrillUp.g_AGi_GIF[i]['src_img'] = JSON.parse(DrillUp.g_AGi_GIF[i]["资源-GIF"]);
			DrillUp.g_AGi_GIF[i]['interval'] = Number(DrillUp.g_AGi_GIF[i]["帧间隔"]);
			DrillUp.g_AGi_GIF[i]['back_run'] = String(DrillUp.g_AGi_GIF[i]["是否倒放"] || "false") == "true";
			DrillUp.g_AGi_GIF[i]['src_bitmaps'] = [];
			
			DrillUp.g_AGi_GIF[i]['scale_x'] = Number(DrillUp.g_AGi_GIF[i]["缩放 X"] || 1.0);
			DrillUp.g_AGi_GIF[i]['scale_y'] = Number(DrillUp.g_AGi_GIF[i]["缩放 Y"] || 1.0);
			DrillUp.g_AGi_GIF[i]['skew_x'] = Number(DrillUp.g_AGi_GIF[i]["斜切 X"] || 0);
			DrillUp.g_AGi_GIF[i]['skew_y'] = Number(DrillUp.g_AGi_GIF[i]["斜切 Y"] || 0);
			
		}else{
			DrillUp.g_AGi_GIF[i] = [];
		}
	}
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_SpecialAnimGIF = function(filename) {
    return this.loadBitmap('img/Special__anim_gif/', filename, 0, true);
};

//=============================================================================
// * 播放中的动画GIF - 容器
//=============================================================================
	DrillUp.g_AGi_playing_tank = [];	//全局临时存储正在动画中播放的GIF（该操作可能不安全，但是目前没有别的方法）
	
	//设置 所有动画id 的GIF消失
	DrillUp.drill_aGIFs_setDeathById = function(tar_id) {
		for(var i in DrillUp.g_AGi_playing_tank){
			var temp = DrillUp.g_AGi_playing_tank[i];
			if( temp._drill_data['id'] == tar_id &&
				temp._drill_cur_time < temp._drill_time_all - temp._drill_time_death ){
				temp._drill_cur_time = temp._drill_time_all - temp._drill_time_death;
			}
		}
	}
	//设置 所有动画id 的GIF显现
	DrillUp.drill_aGIFs_setSustainById = function(tar_id) {
		for(var i in DrillUp.g_AGi_playing_tank){
			var temp = DrillUp.g_AGi_playing_tank[i];
			if( temp._drill_data['id'] == tar_id &&
				temp._drill_cur_time < temp._drill_time_delay ){
				temp._drill_cur_time = temp._drill_time_delay ;
			}
		}
	}
	//设置 战斗单位+动画id 的GIF消失（仅限战斗单位，tar_id = -1 表示单位的全部GIF）
	DrillUp.drill_aGIFs_setDeathByIdAndBattler = function(tar_id,battler) {
		for(var i in DrillUp.g_AGi_playing_tank){
			var temp = DrillUp.g_AGi_playing_tank[i];
			if( (temp._drill_data['anim'] == tar_id || tar_id == -1 ) && 
				temp._drill_parent_sprite != undefined  && 
				temp._drill_parent_sprite._battler == battler  && 
				temp._drill_cur_time < temp._drill_time_all - temp._drill_time_death ){
				temp._drill_cur_time = temp._drill_time_all - temp._drill_time_death;
			}
		}
	}
	//给未绑定的动画，绑定单位sprite
	DrillUp.drill_aGIFs_setBattlerSprite = function( battlerSprite ) {
		for(var i in DrillUp.g_AGi_playing_tank){
			var temp = DrillUp.g_AGi_playing_tank[i];
			if( temp._drill_parent_sprite == undefined ){
				temp._drill_parent_sprite = battlerSprite;
			}
		}
	}
	//帧刷新去除
	DrillUp.drill_aGIFs_updateDelete = function() {
		for (var i in DrillUp.g_AGi_playing_tank ) {	
			var temp = DrillUp.g_AGi_playing_tank[i];
			if( temp['_drill_time_all'] <= temp['_drill_cur_time']){
				DrillUp.g_AGi_playing_tank.splice(i,1);
				delete temp;
			}
			break;
		}
	}

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_AGi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_AGi_pluginCommand.call(this, command, args);
	if (command === '>动画GIF') {
		if(args.length == 4){
			var temp1 = Number(args[1]) - 1;
			var type = String(args[3]);
			if (type === '显示') {
				$gameSystem._drill_AGi_visible[temp1] = true;
			}
			if (type === '隐藏') {
				$gameSystem._drill_AGi_visible[temp1] = false;
			}
		}
	}
	if (command === '>播放中的动画GIF') {
		if(args.length == 4){
			var temp_id = Number(args[1]);
			var type = String(args[3]);
			if (type === '立即显示') {
				for(var i in DrillUp.g_AGi_playing_tank){
					if( DrillUp.g_AGi_playing_tank[i].id == temp_id ){
						DrillUp.g_AGi_playing_tank[i].visible = true;
					}
				}
			}
			if (type === '立即隐藏') {
				for(var i in DrillUp.g_AGi_playing_tank){
					if( DrillUp.g_AGi_playing_tank[i].id == temp_id ){
						DrillUp.g_AGi_playing_tank[i].visible = false;
					}
				}
			}
			if (type === '立即消失') {
				DrillUp.drill_aGIFs_setDeathById(temp_id);
			}
			if (type === '立即显现') {
				DrillUp.drill_aGIFs_setSustainById(temp_id);
			}
		}
	}
};

//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_AGi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_AGi_sys_initialize.call(this);
	this._drill_AGi_visible = [];
	for(var i = 0; i< DrillUp.g_AGi_GIF.length ;i++){
		this._drill_AGi_visible[i] = DrillUp.g_AGi_GIF[i]['visible'];
	}
};	

//=============================================================================
// ** 动画设置
//=============================================================================
//==============================
// * 动画-初始化
//==============================
var _drill_AGi_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
	_drill_AGi_initMembers.call(this);
	this._drill_duration = 0;			//最大持续时间
}

//==============================
// * 动画-设置
//==============================
var _drill_AGi_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	
	if( !this._drill_AGi_charBack ){	//图像后面层（预置，后续在父类中重置取出）
		this._drill_AGi_charBack = new Sprite();
		this.addChild(this._drill_AGi_charBack);
	}
	if( !this._drill_anim_back ){		//动画后面层
		this._drill_anim_back = new Sprite();
		this.addChild(this._drill_anim_back);
	}
    _drill_AGi_setup.call(this,target, animation, mirror, delay);
	
	if( !this._drill_anim_fore ){		//动画前面层
		this._drill_anim_fore = new Sprite();
		this.addChild(this._drill_anim_fore);
	}
	
    if (this._animation) {
		//alert(JSON.stringify(this._animation));
		for (var i = 0; i < DrillUp.g_AGi_GIF.length; i++) {			
			var anim_data = DrillUp.g_AGi_GIF[i];
			if(this._animation.id == anim_data['anim'] ){
				var temp = new Drill_AnimationGIF_Sprite( this._animation ,anim_data );
				DrillUp.g_AGi_playing_tank.push(temp);
				if( anim_data['anim_index'] == "在动画前面" ){
					this._drill_anim_fore.addChild(temp);
				}else if( anim_data['anim_index'] == "在动画后面" ){
					this._drill_anim_back.addChild(temp);
				}else if( anim_data['anim_index'] == "在图像后面" ){
					this._drill_AGi_charBack.addChild(temp);
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
var _drill_AGi_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    
	if( !this._drill_anim_charBack ){		//图像后面层
		this._drill_anim_charBack = new Sprite();
		this._battleField.addChild(this._drill_anim_charBack);
	}
	
	_drill_AGi_createEnemies.call(this);	
};

//==============================
// * 动画-图像后面层 -地图层定义
//==============================
var _drill_AGi_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( !this._drill_anim_charBack ){		//图像后面层
		this._drill_anim_charBack = new Sprite();
		this._tilemap.addChild(this._drill_anim_charBack);
	}
	
	_drill_AGi_createCharacters.call(this);
};
//==============================
// * 动画-图像后面层 -添加动画
//==============================
var _drill_AGi_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    _drill_AGi_startAnimation.call(this,animation, mirror, delay);
	
	DrillUp.drill_aGIFs_setBattlerSprite(this);	//绑定单位sprite
	
	var last_sprite = this._animationSprites[this._animationSprites.length - 1];	//获取到添加的动画
	if(	last_sprite._drill_AGi_charBack != undefined &&
		last_sprite._drill_AGi_charBack.children.length != 0){
			
		//-->战斗界面的敌人、玩家 + SV模式
		if( this.constructor.name == "Sprite_Enemy" 
			|| (this.constructor.name == "Sprite_Actor" && $gameSystem.isSideView() )
		){
			//alert(this.parent.parent.parent.constructor.name);	//上一层级 ._battleField >> ._baseSprite >> Spriteset_Battle
			if( this.parent != undefined && this.parent.parent != undefined && this.parent.parent.parent != undefined &&
				this.parent.parent.parent.constructor.name == "Spriteset_Battle"){
				
				var anims = last_sprite._drill_AGi_charBack.children;
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
					
				var anims = last_sprite._drill_AGi_charBack.children;
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
				
				var anims = last_sprite._drill_AGi_charBack.children;
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
var _drill_AGi_isPlaying = Sprite_Animation.prototype.isPlaying;
Sprite_Animation.prototype.isPlaying = function() {
    if( this._drill_duration > 0 ){
		return true;
	}
	return _drill_AGi_isPlaying.call(this);
};

//==============================
// * 动画-帧刷新
//==============================
var _drill_AGi_update = Sprite_Animation.prototype.update;
Sprite_Animation.prototype.update = function() {
	this._drill_duration_decreased = false;		//减一锁，确保多次继承后，减一后，不会继续执行减一方法。
	_drill_AGi_update.call(this);
	if(this._drill_duration_decreased == false){
		this._drill_duration--;
		this._drill_duration_decreased = true;
	}
}

//==============================
// * 动画-移除（空指针优化）
//==============================
var _drill_AGi_remove = Sprite_Animation.prototype.remove;
Sprite_Animation.prototype.remove = function() {
	if( this._target != undefined ){
		_drill_AGi_remove.call(this);
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
// ** GIF外部控制（消除sprite）
//=============================================================================
var _drill_AGi_timer_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function(sceneActive) {
    _drill_AGi_timer_update.call(this,sceneActive);
	DrillUp.drill_aGIFs_updateDelete();
};


//=============================================================================
// * Drill_AnimationGIF_Sprite 动画GIF
//=============================================================================
function Drill_AnimationGIF_Sprite() {
    this.initialize.apply(this, arguments);
};

Drill_AnimationGIF_Sprite.prototype = Object.create(Sprite.prototype);
Drill_AnimationGIF_Sprite.prototype.constructor = Drill_AnimationGIF_Sprite;

//==============================
// * 初始化-框架
//==============================
Drill_AnimationGIF_Sprite.prototype.initialize = function(animation,settings) {
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
	
	this.visible = settings['visible'];
	this.x = settings['x'];
	this.y = settings['y'];
	this._move = 0;
	this.blendMode = settings['blendMode'];
	this.zIndex = settings['zIndex'];
	this.opacity = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = $gameSystem._drill_AGi_visible[settings['id']-1];
	this._drill_is_charBack = false;	//是否在图片下方
	
	this._drill_GIFs = [];
	this._drill_GIFs_bitmap = [];
	this._drill_parent_sprite = null;	//跨层级跟随sprite的xy位置
	this.drill_createGIF();
	
};
//==============================
// * 初始化-GIF
//==============================
Drill_AnimationGIF_Sprite.prototype.drill_createGIF = function() {
	
	for(var j = 0; j < this._drill_data['src_img'].length ; j++){
		this._drill_data['src_bitmaps'].push(ImageManager.load_SpecialAnimGIF(this._drill_data['src_img'][j]));
	}
			
	var temp_sprite_bitmap = new Sprite();
	temp_sprite_bitmap.anchor.x = 0.5;
	temp_sprite_bitmap.anchor.y = 0.5;
	temp_sprite_bitmap.bitmap = this._drill_data['src_bitmaps'][0];
	
	var temp_sprite = new Sprite();		//GIF两层容器
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.scale.x = this._drill_data['scale_x'];
	temp_sprite.scale.y = this._drill_data['scale_y'];
	temp_sprite.skew.x = this._drill_data['skew_x'];
	temp_sprite.skew.y = this._drill_data['skew_y'];
	
	this._drill_GIF = temp_sprite;
	this._drill_GIF_bitmap = temp_sprite_bitmap;
	temp_sprite.addChild(temp_sprite_bitmap);
	this.addChild(temp_sprite);
	
}
//==============================
// * 帧刷新
//==============================
Drill_AnimationGIF_Sprite.prototype.update = function() {
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
	
	this._drill_cur_time += 1;
	this._drill_GIF_bitmap.rotation += this._drill_data['rotate'];
	
	this._move += 1;		//gif播放
	var inter = this._move ;
	inter = inter / this._drill_data['interval'];
	inter = inter % this._drill_data['src_bitmaps'].length;
	if(this._drill_data['back_run']){
		inter = this._drill_data['src_bitmaps'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	this._drill_GIF_bitmap.bitmap = this._drill_data['src_bitmaps'][inter];
	
}
//==============================
// * 出现状态
//==============================
Drill_AnimationGIF_Sprite.prototype.drill_birthState = function() {
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
Drill_AnimationGIF_Sprite.prototype.drill_deathState = function() {
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
// * GIF出现
//==============================
Drill_AnimationGIF_Sprite.prototype.drill_updateBirthing = function() {
	this.opacity += ( 255 - this.start_opacity )/this._drill_time_birth;
	
	this.drill_scaleX_move_to(this, 1, Math.abs(this.start_scale_x -1)/this._drill_time_birth);
	this.drill_scaleY_move_to(this, 1, Math.abs(this.start_scale_y -1)/this._drill_time_birth);
	
}
//==============================
// * GIF消失
//==============================
Drill_AnimationGIF_Sprite.prototype.drill_updateDying = function() {
	this.opacity -= ( 255 - this.tar_opacity )/this._drill_time_death;
	
	this.drill_scaleX_move_to(this, this.tar_scale_x, Math.abs(1-this.tar_scale_x)/this._drill_time_death);
	this.drill_scaleY_move_to(this, this.tar_scale_y, Math.abs(1-this.tar_scale_y)/this._drill_time_death);
	
}

//==============================
// * 缩放控制
//==============================
Drill_AnimationGIF_Sprite.prototype.drill_scaleX_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.x - s;
	if( ds < 0 ){ sprite.scale.x += speed; }
	if( ds > 0 ){ sprite.scale.x -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.x = s; }
}
Drill_AnimationGIF_Sprite.prototype.drill_scaleY_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.y - s;
	if( ds < 0 ){ sprite.scale.y += speed; }
	if( ds > 0 ){ sprite.scale.y -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.y = s; }
}

