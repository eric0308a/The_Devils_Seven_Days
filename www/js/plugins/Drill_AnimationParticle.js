//=============================================================================
// Drill_AnimationParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        动画 - 多层动画粒子
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_AnimationParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你添加粒子，绑定在一个指定的动画上面。播放动画时能出现粒子。
 * 多个粒子可以设置在同一个动画中。
 * 要了解更详细的组合方法，去看看"多层组合背景,粒子,魔法圈,gif,视频.docx"。
 * 要了解更详细的设置效果，去看看"关于魔法效果与并行动画.docx"。
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面，战斗界面。
 *   作用于动画，伴随动画一起出现。
 * 2.动画粒子是一个具有持续时间的效果，分为 出现、持续、消失 三阶段。
 * 3.你需要在插件中一个个配置粒子绑定到动画上面。
 *  （绑定后，配置的动画和rmmv动画同时播放，rmmv动画你需要手动设置额外延时时间）
 * 4.你可以通过插件指令关闭所有动画粒子，做到长时间持续的魔法防御被打断。
 *   但是插件指令直接作用的是所有的粒子，你无法精确关闭一个动画的粒子。
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
 * 粒子1 资源-粒子
 * 粒子2 资源-粒子
 * 粒子3 资源-粒子
 * ……
 * 
 * 你可以在同一个动画里面加入非常多的不同种类的粒子，并且持续时间可以非常长。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制动画粒子的显示情况：
 * 
 * 插件指令：>动画粒子 : 1 : 显示
 * 插件指令：>动画粒子 : 3 : 隐藏
 *
 * 1.数字表示你在插件中配置对应的GIF编号。设置隐藏后，新动画不会显示GIF。
 * 2.作用于所有GIF对应的动画，但不包括播放中的动画GIF。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令对播放中的动画粒子进行设置：
 * 
 * 插件指令：>播放中的动画粒子 : A : 立即显示
 * 插件指令：>播放中的动画粒子 : A : 立即隐藏
 * 插件指令：>播放中的动画粒子 : A : 立即显现
 * 插件指令：>播放中的动画粒子 : A : 立即消失
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
 * 可以使得粒子设置在图像的后面。优化了插件扩展关系。
 * [v1.2]
 * 修改了内部结构。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 *
 *
 * @param ---粒子组 1至20---
 * @default
 *
 * @param 粒子-1
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-2
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-3
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-4
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-5
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-6
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-7
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-8
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-9
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-10
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-11
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-12
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-13
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-14
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-15
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-16
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-17
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-18
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-19
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-20
 * @parent ---粒子组 1至20---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组21至40---
 * @default
 *
 * @param 粒子-21
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-22
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-23
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-24
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-25
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-26
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-27
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-28
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-29
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-30
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-31
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-32
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-33
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-34
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-35
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-36
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-37
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-38
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-39
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-40
 * @parent ---粒子组21至40---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组41至60---
 * @default
 *
 * @param 粒子-41
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-42
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-43
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-44
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-45
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-46
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-47
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-48
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-49
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-50
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-51
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-52
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-53
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-54
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-55
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-56
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-57
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-58
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-59
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-60
 * @parent ---粒子组41至60---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组61至80---
 * @default
 *
 * @param 粒子-61
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-62
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-63
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-64
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-65
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-66
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-67
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-68
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-69
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-70
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-71
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-72
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-73
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-74
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-75
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-76
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-77
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-78
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-79
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-80
 * @parent ---粒子组61至80---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组81至100---
 * @default
 *
 * @param 粒子-81
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-82
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-83
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-84
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-85
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-86
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-87
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-88
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-89
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-90
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-91
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-92
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-93
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-94
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-95
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-96
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-97
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-98
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-99
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-100
 * @parent ---粒子组81至100---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组101至120---
 * @default
 *
 * @param 粒子-101
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-102
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-103
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-104
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-105
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-106
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-107
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-108
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-109
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-110
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-111
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-112
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-113
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-114
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-115
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-116
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-117
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-118
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-119
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-120
 * @parent ---粒子组101至120---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组121至140---
 * @default
 *
 * @param 粒子-121
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-122
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-123
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-124
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-125
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-126
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-127
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-128
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-129
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-130
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-131
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-132
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-133
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-134
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-135
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-136
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-137
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-138
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-139
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-140
 * @parent ---粒子组121至140---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组141至160---
 * @default
 *
 * @param 粒子-141
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-142
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-143
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-144
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-145
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-146
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-147
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-148
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-149
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-150
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-151
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-152
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-153
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-154
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-155
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-156
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-157
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-158
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-159
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-160
 * @parent ---粒子组141至160---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组161至180---
 * @default
 *
 * @param 粒子-161
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-162
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-163
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-164
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-165
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-166
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-167
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-168
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-169
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-170
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-171
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-172
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-173
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-174
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-175
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-176
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-177
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-178
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-179
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-180
 * @parent ---粒子组161至180---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组181至200---
 * @default
 *
 * @param 粒子-181
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-182
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-183
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-184
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-185
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-186
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-187
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-188
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-189
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-190
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-191
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-192
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-193
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-194
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-195
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-196
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-197
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-198
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-199
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-200
 * @parent ---粒子组181至200---
 * @type struct<animParticle>
 * @desc 动画粒子的详细配置信息。
 * @default 
 */
/*~struct~animParticle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的动画粒子==
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
 * @desc 指定动画的id，粒子将会与动画相互绑定。
 * @default 0
 *
 * @param 资源-粒子
 * @desc 粒子的图片资源。
 * @default 动画粒子-默认
 * @require 1
 * @dir img/Special__anim/
 * @type file
 *
 * @param 平移-粒子 X
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最左边。
 * @default 0
 *
 * @param 平移-粒子 Y
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
 * @desc 粒子在同一个动画，并且在同一动画层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 * @param --动画过程--
 * @desc 
 *
 * @param 出现延迟
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 粒子将延迟一段时间显现，单位帧。
 * @default 0
 *
 * @param 出现时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 粒子显现的时间，单位帧。
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
 * @desc 粒子显现的模式方法。
 * @default 横向显现
 *
 * @param 持续时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 粒子持续的时间，单位帧。
 * @default 220
 *
 * @param 消失时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 粒子显现的延迟时间。
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
 * @desc 粒子消失的模式方法。
 * @default 普通淡出消失
 * 
 * 
 * @param --粒子设置--
 * @desc 
 * 
 * @param 粒子数量
 * @parent --粒子设置--
 * @type number
 * @min 0
 * @desc 出现的粒子数量。
 * @default 15
 *
 * @param 粒子自旋转速度
 * @parent --粒子设置--
 * @desc 正数逆时针，负数顺时针，单位 弧度/帧。(1秒60帧)
 * 6.28表示一圈，设置0.01表示大概10秒转一圈，设置0则不旋转。
 * @default 0.03
 *
 * @param 粒子生命周期
 * @parent --粒子设置--
 * @type number
 * @min 5
 * @desc 一个粒子从显现到消失的周期时长，单位帧。(1秒60帧)
 * @default 45
 *
 * @param 粒子出现范围
 * @parent --粒子设置--
 * @type number
 * @min 0
 * @desc 以动画中心为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。
 * @default 40
 *
 * @param 粒子速度
 * @parent --粒子设置--
 * @desc 粒子会按照指定方向移动，单位像素。正数向指定方向前进，负数反向移动。
 * @default 1.00
 *
 * @param 粒子移动模式
 * @parent --粒子设置--
 * @type select
 * @option 四周扩散
 * @value 四周扩散
 * @option 固定方向
 * @value 固定方向
 * @option 指定方向小范围随机
 * @value 指定方向小范围随机
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 四周扩散
 *
 * @param 粒子移动方向
 * @parent --粒子设置--
 * @parent 粒子移动模式
 * @type number
 * @min 0
 * @desc 固定方向或者指定方向将需要指定该项，单位角度。90度表示向下，0度表示向右。
 * @default 90
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		APa (Animation_Particle)
//		临时全局变量	DrillUp.g_APa_xxx
//		临时局部变量	this._drill_APa_xxx
//		存储数据变量	$gameSystem._drill_APa_xxx
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
//			* Drill_AnimationParticle_Sprite【动画粒子】
//		
//		★必要注意事项：
//			1.容器的所有函数，都是对外的接口，名字已固定。
//				DrillUp.drill_aParticles_xxxx
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
//
//		★存在的问题：
//			1.目前所有粒子的配置以及方法都没有统一化。

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationParticle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AnimationParticle');
	
	DrillUp.g_APa_max = 200;
	DrillUp.g_APa = [];
	
	for (var i = 0; i < DrillUp.g_APa_max; i++) {
		if( DrillUp.parameters['粒子-' + String(i+1) ] != "" ){
			DrillUp.g_APa[i] = JSON.parse(DrillUp.parameters['粒子-' + String(i+1) ]);
			DrillUp.g_APa[i]['id'] = i+1;
			DrillUp.g_APa[i]['visible'] = String(DrillUp.g_APa[i]["初始是否显示"] || "true") == "true";
			DrillUp.g_APa[i]['anim'] = Number(DrillUp.g_APa[i]["绑定的动画"]);
			DrillUp.g_APa[i]['src_img'] = String(DrillUp.g_APa[i]["资源-粒子"]);
			DrillUp.g_APa[i]['x'] = Number(DrillUp.g_APa[i]["平移-粒子 X"]);
			DrillUp.g_APa[i]['y'] = Number(DrillUp.g_APa[i]["平移-粒子 Y"]);
			DrillUp.g_APa[i]['blendMode'] = Number(DrillUp.g_APa[i]["混合模式"]);
			DrillUp.g_APa[i]['count'] = Number(DrillUp.g_APa[i]["粒子数量"]);
			DrillUp.g_APa[i]['speed'] = Number(DrillUp.g_APa[i]["粒子速度"]);
			DrillUp.g_APa[i]['rotation'] = Number(DrillUp.g_APa[i]["粒子自旋转速度"]);
			DrillUp.g_APa[i]['range'] = Number(DrillUp.g_APa[i]["粒子出现范围"]);
			DrillUp.g_APa[i]['movingMode'] = String(DrillUp.g_APa[i]["粒子移动模式"]);
			DrillUp.g_APa[i]['movingAngle'] = Number(DrillUp.g_APa[i]["粒子移动方向"]);
			DrillUp.g_APa[i]['life'] = Number(DrillUp.g_APa[i]["粒子生命周期"]);
			DrillUp.g_APa[i]['anim_index'] = String(DrillUp.g_APa[i]["动画层级"]);
			DrillUp.g_APa[i]['zIndex'] = Number(DrillUp.g_APa[i]["图片层级"]);
			
			DrillUp.g_APa[i]['delay'] = Number(DrillUp.g_APa[i]["出现延迟"]);
			DrillUp.g_APa[i]['birth'] = Number(DrillUp.g_APa[i]["出现时长"]);
			DrillUp.g_APa[i]['birthMode'] = String(DrillUp.g_APa[i]["出现模式"] || "横向展开");
			DrillUp.g_APa[i]['sustain'] = Number(DrillUp.g_APa[i]["持续时长"]);
			DrillUp.g_APa[i]['death'] = Number(DrillUp.g_APa[i]["消失时长"]);
			DrillUp.g_APa[i]['deathMode'] = String(DrillUp.g_APa[i]["消失模式"] || "普通淡出消失");

		}else{
			DrillUp.g_APa[i] = [];
		}
	}
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_SpecialAnim = function(filename) {
    return this.loadBitmap('img/Special__anim/', filename, 0, true);
};

//=============================================================================
// * 播放中的动画粒子 - 容器
//=============================================================================
	DrillUp.g_APa_playing_tank = [];	//全局临时存储正在动画中播放的粒子（该操作可能不安全，但是目前没有别的方法）
	
	//设置 所有动画id 的粒子消失
	DrillUp.drill_aParticles_setDeathById = function(tar_id) {
		for(var i in DrillUp.g_APa_playing_tank){
			var temp = DrillUp.g_APa_playing_tank[i];
			if( temp._drill_data['id'] == tar_id &&
				temp._drill_cur_time < temp._drill_time_all - temp._drill_time_death ){
				temp._drill_cur_time = temp._drill_time_all - temp._drill_time_death;
			}
		}
	}
	//设置 所有动画id 的粒子显现
	DrillUp.drill_aParticles_setSustainById = function(tar_id) {
		for(var i in DrillUp.g_APa_playing_tank){
			var temp = DrillUp.g_APa_playing_tank[i];
			if( temp._drill_data['id'] == tar_id &&
				temp._drill_cur_time < temp._drill_time_delay ){
				temp._drill_cur_time = temp._drill_time_delay ;
			}
		}
	}
	//设置 战斗单位+动画id 的粒子消失（仅限战斗单位，tar_id = -1 表示单位的全部粒子）
	DrillUp.drill_aParticles_setDeathByIdAndBattler = function(tar_id,battler) {
		for(var i in DrillUp.g_APa_playing_tank){
			var temp = DrillUp.g_APa_playing_tank[i];
			if( (temp._drill_data['anim'] == tar_id || tar_id == -1 ) && 
				temp._drill_parent_sprite != undefined  && 
				temp._drill_parent_sprite._battler == battler  && 
				temp._drill_cur_time < temp._drill_time_all - temp._drill_time_death ){
				temp._drill_cur_time = temp._drill_time_all - temp._drill_time_death;
			}
		}
	}
	//给未绑定的动画，绑定单位sprite
	DrillUp.drill_aParticles_setBattlerSprite = function( battlerSprite ) {
		for(var i in DrillUp.g_APa_playing_tank){
			var temp = DrillUp.g_APa_playing_tank[i];
			if( temp._drill_parent_sprite == undefined ){
				temp._drill_parent_sprite = battlerSprite;
			}
		}
	}
	//帧刷新去除
	DrillUp.drill_aParticles_updateDelete = function() {
		for (var i in DrillUp.g_APa_playing_tank ) {	
			var temp = DrillUp.g_APa_playing_tank[i];
			if( temp['_drill_time_all'] <= temp['_drill_cur_time']){
				DrillUp.g_APa_playing_tank.splice(i,1);
				delete temp;
			}
			break;
		}
	}

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_APa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_APa_pluginCommand.call(this, command, args);
	if (command === '>动画粒子') {
		if(args.length == 4){
			var temp1 = Number(args[1]) - 1;
			var type = String(args[3]);
			if (type === '显示') {
				$gameSystem._drill_APa_visible[temp1] = true;
			}
			if (type === '隐藏') {
				$gameSystem._drill_APa_visible[temp1] = false;
			}
		}
	}
	if (command === '>播放中的动画粒子') {
		if(args.length == 4){
			var temp_id = Number(args[1]);
			var type = String(args[3]);
			if (type === '立即显示') {
				for(var i in DrillUp.g_APa_playing_tank){
					if( DrillUp.g_APa_playing_tank[i].id == temp_id ){
						DrillUp.g_APa_playing_tank[i].visible = true;
					}
				}
			}
			if (type === '立即隐藏') {
				for(var i in DrillUp.g_APa_playing_tank){
					if( DrillUp.g_APa_playing_tank[i].id == temp_id ){
						DrillUp.g_APa_playing_tank[i].visible = false;
					}
				}
			}
			if (type === '立即消失') {
				DrillUp.drill_aParticles_setDeathById(temp_id);
			}
			if (type === '立即显现') {
				DrillUp.drill_aParticles_setSustainById(temp_id);
			}
		}
	}
};

//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_APa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_APa_sys_initialize.call(this);
	this._drill_APa_visible = [];
	for(var i = 0; i< DrillUp.g_APa.length ;i++){
		this._drill_APa_visible[i] = DrillUp.g_APa[i]['visible'];
	}
};	

//=============================================================================
// ** 动画设置
//=============================================================================
//==============================
// * 动画-初始化
//==============================
var _drill_APa_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
	_drill_APa_initMembers.call(this);
	this._drill_duration = 0;			//最大持续时间（取动画粒子、魔法圈的最大时长）
}

//==============================
// * 动画-设置
//==============================
var _drill_APa_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	
	if( !this._drill_APa_charBack ){	//图像后面层（预置，后续在父类中重置取出）
		this._drill_APa_charBack = new Sprite();
		this.addChild(this._drill_APa_charBack);
	}
	if( !this._drill_anim_back ){		//动画后面层
		this._drill_anim_back = new Sprite();
		this.addChild(this._drill_anim_back);
	}
    _drill_APa_setup.call(this,target, animation, mirror, delay);
	
	if( !this._drill_anim_fore ){		//动画前面层
		this._drill_anim_fore = new Sprite();
		this.addChild(this._drill_anim_fore);
	}
    if (this._animation) {
		//alert(JSON.stringify(this._animation));
		for (var i = 0; i < DrillUp.g_APa.length; i++) {		
			var anim_data = DrillUp.g_APa[i];
			if(this._animation.id == anim_data['anim'] ){
				var temp = new Drill_AnimationParticle_Sprite( this._animation ,anim_data );
				DrillUp.g_APa_playing_tank.push(temp);
				if( anim_data['anim_index'] == "在动画前面" ){
					this._drill_anim_fore.addChild(temp);
				}else if( anim_data['anim_index'] == "在动画后面" ){
					this._drill_anim_back.addChild(temp);
				}else if( anim_data['anim_index'] == "在图像后面" ){
					this._drill_APa_charBack.addChild(temp);
				}
				this._drill_duration = Math.max(this._drill_duration, Math.max( temp._drill_time_all + 1 , this._duration));
			}
		}
		this.drill_sortByZIndex();
	}
};

//==============================
// * 动画-图像后面层 -战斗层定义
//==============================
var _drill_APa_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    
	if( !this._drill_anim_charBack ){		//图像后面层
		this._drill_anim_charBack = new Sprite();
		this._battleField.addChild(this._drill_anim_charBack);
	}
	
	_drill_APa_createEnemies.call(this);	
};
//==============================
// * 动画-图像后面层 -地图层定义
//==============================
var _drill_APa_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( !this._drill_anim_charBack ){		//图像后面层
		this._drill_anim_charBack = new Sprite();
		this._tilemap.addChild(this._drill_anim_charBack);
	}
	
	_drill_APa_createCharacters.call(this);
};
//==============================
// * 动画-图像后面层 -添加动画
//==============================
var _drill_APa_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    _drill_APa_startAnimation.call(this,animation, mirror, delay);
	
	DrillUp.drill_aParticles_setBattlerSprite(this);	//绑定单位sprite
	
	var last_sprite = this._animationSprites[this._animationSprites.length - 1];	//获取到添加的动画
	if(	last_sprite._drill_APa_charBack != undefined &&
		last_sprite._drill_APa_charBack.children.length != 0){
		
		//-->战斗界面的敌人、玩家
		if( this.constructor.name == "Sprite_Enemy" 
			|| (this.constructor.name == "Sprite_Actor" && $gameSystem.isSideView() )
		){
			//alert(this.parent.parent.parent.constructor.name);	//上一层级 ._battleField >> ._baseSprite >> Spriteset_Battle
			if( this.parent != undefined && this.parent.parent != undefined && this.parent.parent.parent != undefined &&
				this.parent.parent.parent.constructor.name == "Spriteset_Battle"){
				
				var anims = last_sprite._drill_APa_charBack.children;
				var len = anims.length;		//注意，操作会改变anims数组的长度
				for(var i = 0; i<len; i++){
					anims[0]._drill_is_charBack = true;
					this.parent.parent.parent._drill_anim_charBack.addChild(anims[0]);	//重复addChild会被移走
				}
			}
		}
		//-->战斗界面的玩家+第一人称+使用了角色窗口
		if( this.constructor.name == "Sprite_Actor" && !$gameSystem.isSideView() && Imported.MOG_BattleHud ){
			//alert(this.parent.parent.constructor.name);//上一层级 ._hudField >> Scene_Base
			
			if( this.parent != undefined && this.parent.parent != undefined && 
				this.parent.parent._spriteset != undefined &&
				this.parent.parent._spriteset.constructor.name == "Spriteset_Battle"){
					
				var anims = last_sprite._drill_APa_charBack.children;
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
				
				var anims = last_sprite._drill_APa_charBack.children;
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
var _drill_APa_isPlaying = Sprite_Animation.prototype.isPlaying;
Sprite_Animation.prototype.isPlaying = function() {
    if( this._drill_duration > 0 ){
		return true;
	}
	return _drill_APa_isPlaying.call(this);
};

//==============================
// * 动画-帧刷新
//==============================
var _drill_APa_update = Sprite_Animation.prototype.update;
Sprite_Animation.prototype.update = function() {
	this._drill_duration_decreased = false;		//减一锁，确保多次继承后，减一后，不会继续执行减一方法。
	_drill_APa_update.call(this);
	if(this._drill_duration_decreased == false){
		this._drill_duration--;
		this._drill_duration_decreased = true;
	}
}

//==============================
// * 动画-移除（空指针优化）
//==============================
var _drill_APa_remove = Sprite_Animation.prototype.remove;
Sprite_Animation.prototype.remove = function() {
	if( this._target != undefined ){
		_drill_APa_remove.call(this);
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
// ** 粒子外部控制（消除sprite）
//=============================================================================
var _drill_APa_timer_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function(sceneActive) {
    _drill_APa_timer_update.call(this,sceneActive);
	DrillUp.drill_aParticles_updateDelete();
};


//=============================================================================
// * Drill_AnimationParticle_Sprite 动画粒子
//=============================================================================
function Drill_AnimationParticle_Sprite() {
    this.initialize.apply(this, arguments);
};

Drill_AnimationParticle_Sprite.prototype = Object.create(Sprite.prototype);
Drill_AnimationParticle_Sprite.prototype.constructor = Drill_AnimationParticle_Sprite;

//==============================
// * 初始化-框架
//==============================
Drill_AnimationParticle_Sprite.prototype.initialize = function(animation,settings) {
	Sprite.prototype.initialize.call(this);
	this._animation = animation;		//存入设置数据
	this._drill_data = settings;
	
	this._drill_cur_time = 0;			//当前时间
	this._drill_cur_model = 0;			//阶段：0.延迟 1.开始 2.持续 3.结束
	this._drill_time_delay = settings['delay'];			//出现延迟
	this._drill_time_birth = settings['birth'];			//出现时长
	this._drill_time_sustain = settings['sustain'];		//持续时长
	this._drill_time_death = settings['death'];			//消失时长
	this._drill_time_all = this._drill_time_delay + this._drill_time_birth + this._drill_time_sustain + this._drill_time_death;
	
	this.visible = settings['visible'];
	this.x = settings['x'];
	this.y = settings['y'];
	this.blendMode = settings['blendMode'];
	this.zIndex = settings['zIndex'];
	this.opacity = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = $gameSystem._drill_APa_visible[settings['id']-1];
	this._drill_is_charBack = false;	//是否在图片下方
	
	this._drill_particles = [];
	this._drill_parent_sprite = null;	//跨层级跟随sprite的xy位置
	this.drill_createParticle();
	
};
//==============================
// * 初始化-粒子
//==============================
Drill_AnimationParticle_Sprite.prototype.drill_createParticle = function() {
	
	for( var j = 0; j < this._drill_data['count'] ; j++ ){
		var par = new Sprite(ImageManager.load_SpecialAnim(this._drill_data['src_img']));
		par.anchor.x = 0.5;
		par.anchor.y = 0.5;
		par.cur_life = Math.random() * this._drill_data['life'];
		
		var r = Math.random() * this._drill_data['range'];	//随机圆形出现位置
		var t = Math.PI / 180 * ( 360 * Math.random() );
		par.x = r * Math.cos(t);
		par.y = r * Math.sin(t);
		par.opacity = 0;
		par.cur_r = r;
		par.cur_t = t;
		par.cur_random = Math.random();	//随机因子
		
		this._drill_particles.push(par);
		this.addChild(par);
	}
	
}
//==============================
// * 帧刷新
//==============================
Drill_AnimationParticle_Sprite.prototype.update = function() {
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
	if( this._drill_cur_time < this._drill_time_delay ){
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
	
	for(var i=0; i < this._drill_particles.length ; i++ ){
		var par = this._drill_particles[i];
		par.rotation += par.cur_random * this._drill_data['rotation'];
		par.cur_life += 1;
		if( par.cur_life > this._drill_data['life']){
			//位置
			par.cur_life = 0;
			var r = Math.random() * this._drill_data['range'];	//随机圆形出现位置
			var t = Math.PI / 180 * ( 360 * Math.random() );
			par.x = r * Math.cos(t);
			par.y = r * Math.sin(t);
			par.opacity = 0;
			//方向属性
			par.cur_r = r;
			par.cur_t = t;	//默认产生的为四周扩散
			if(this._drill_data['movingMode'] == "固定方向"){
				par.cur_t = Math.PI / 180 * this._drill_data['movingAngle'];
			}else if( this._drill_data['movingMode'] == "指定方向小范围随机" ){
				par.cur_t = Math.PI / 180 * (this._drill_data['movingAngle'] - (Math.random() - 0.5) * 30 );
			}
		}
		par.x += this._drill_data['speed'] * Math.cos(par.cur_t);
		par.y += this._drill_data['speed'] * Math.sin(par.cur_t);
		
		if(par.cur_life > this._drill_data['life'] * 0.8 ){
			par.opacity -= 255/ (this._drill_data['life'] * 0.2);
		}else{
			par.opacity += 255/ (this._drill_data['life'] * 0.1);
		}
	}
}
//==============================
// * 出现状态
//==============================
Drill_AnimationParticle_Sprite.prototype.drill_birthState = function() {
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
Drill_AnimationParticle_Sprite.prototype.drill_deathState = function() {
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
// * 粒子出现
//==============================
Drill_AnimationParticle_Sprite.prototype.drill_updateBirthing = function() {
	this.opacity += ( 255 - this.start_opacity )/this._drill_time_birth;
	
	this.drill_scaleX_move_to(this, 1, Math.abs(this.start_scale_x -1)/this._drill_time_birth);
	this.drill_scaleY_move_to(this, 1, Math.abs(this.start_scale_y -1)/this._drill_time_birth);
	
}
//==============================
// * 粒子消失
//==============================
Drill_AnimationParticle_Sprite.prototype.drill_updateDying = function() {
	this.opacity -= ( 255 - this.tar_opacity )/this._drill_time_death;
	
	this.drill_scaleX_move_to(this, this.tar_scale_x, Math.abs(1-this.tar_scale_x)/this._drill_time_death);
	this.drill_scaleY_move_to(this, this.tar_scale_y, Math.abs(1-this.tar_scale_y)/this._drill_time_death);
	
}

//==============================
// * 缩放控制
//==============================
Drill_AnimationParticle_Sprite.prototype.drill_scaleX_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.x - s;
	if( ds < 0 ){ sprite.scale.x += speed; }
	if( ds > 0 ){ sprite.scale.x -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.x = s; }
}
Drill_AnimationParticle_Sprite.prototype.drill_scaleY_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.y - s;
	if( ds < 0 ){ sprite.scale.y += speed; }
	if( ds > 0 ){ sprite.scale.y -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.y = s; }
}

