//=============================================================================
// MOG_ActorPictureCM.js
//=============================================================================

/*:
 * @plugindesc (v1.3)[v1.2]  战斗 - 角色图像
 * @author Moghunter （Drill_up翻译+优化）
 *
 * @param 是否使用角色图
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 平移-角色图 X
 * @desc 0表示在最左边，816表示在最右边。x轴方向平移，单位像素。
 * @default 500
 *
 * @param 平移-角色图 Y
 * @desc 注意，0表示在最下面，624表示在最上面。y轴方向平移，单位像素。
 * @default 0 
 *
 * @param 是否使用角色背景图
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 平移-角色背景图 X
 * @desc 默认靠在最右边，在此基础x轴方向平移，单位像素。
 * @default 0
 *
 * @param 平移-角色背景图 Y
 * @desc 默认贴在最上面，在此基础y轴方向平移，单位像素。
 * @default 0
 *
 * @param --角色组 1至20--
 * @default 
 *
 * @param 角色-1-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-1-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-2-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-2-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-3-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-3-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-4-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-4-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-5-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-5-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-6-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-6-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-7-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-7-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-8-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-8-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-9-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-9-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-10-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-10-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-11-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-11-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-12-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-12-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-13-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-13-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-14-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-14-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-15-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-15-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-16-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-16-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-17-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-17-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-18-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-18-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-19-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-19-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-20-前视图
 * @parent --角色组 1至20--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-20-背景图
 * @parent --角色组 1至20--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param --角色组21至40--
 * @default 
 *
 * @param 角色-21-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-21-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-22-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-22-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-23-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-23-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-24-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-24-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-25-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-25-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-26-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-26-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-27-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-27-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-28-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-28-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-29-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-29-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-30-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-30-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-31-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-31-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-32-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-32-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-33-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-33-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-34-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-34-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-35-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-35-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-36-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-36-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-37-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-37-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-38-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-38-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-39-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-39-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-40-前视图
 * @parent --角色组21至40--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-40-背景图
 * @parent --角色组21至40--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param --角色组41至60--
 * @default 
 *
 * @param 角色-41-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-41-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-42-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-42-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-43-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-43-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-44-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-44-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-45-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-45-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-46-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-46-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-47-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-47-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-48-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-48-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-49-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-49-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-50-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-50-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-51-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-51-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-52-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-52-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-53-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-53-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-54-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-54-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-55-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-55-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-56-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-56-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-57-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-57-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-58-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-58-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-59-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-59-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-60-前视图
 * @parent --角色组41至60--
 * @desc 角色前视图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 角色-60-背景图
 * @parent --角色组41至60--
 * @desc 角色背景图的图片资源。没有图片可以不设置。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @help  
 * =============================================================================
 * +++ MOG - Actor Picture CM (v1.4) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 战斗时选择一个玩家，会出现两张图片用于描述角色，一个为角色图片，
 * 另一个为背景图片。
 * 【现已支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 先确保项目img文件夹下是否有pictures文件夹！ （img/pictures）
 * 如果没有，需要自己建立。这里需要在角色组中手动配置：
 * 
 *  角色-1-前视图（数字1对应角色配置中编号为1的角色）
 *  角色-1-背景图
 *  角色-2-前视图
 *  角色-2-背景图
 *  ……
 *
 * 如果没有相应的图片资源，你可以不配置。
 * 
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 使得该插件支持关联资源的打包、加密。
 * 部署时勾选去除无关文件，本插件中相关的文件不会被去除。
 * [v1.2]
 * 修正了部分与ATB的兼容性。
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_ActorPictureCM = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_ActorPictureCM');
    Moghunter.actor_cm1_visible = String(Moghunter.parameters['是否使用角色图'] || "true");
	Moghunter.actor_cm_x = Number(Moghunter.parameters['平移-角色图 X'] || 500);
    Moghunter.actor_cm_y = Number(Moghunter.parameters['平移-角色图 Y'] || 0);
	Moghunter.actor_cm2_visible = String(Moghunter.parameters['是否使用角色背景图'] || "true");
	Moghunter.actor_cm2_x = Number(Moghunter.parameters['平移-角色背景图 X'] || 0);
    Moghunter.actor_cm2_y = Number(Moghunter.parameters['平移-角色背景图 Y'] || 0);
	Moghunter.actor_cm_z = Number(Moghunter.parameters['Z Mode'] || 0);
	
	Moghunter.actor_list_length = 60;
	Moghunter.actor_cm_list = {};
	Moghunter.actor_cm2_list = {};
	for (Moghunter.i = 1; Moghunter.i <= Moghunter.actor_list_length ; ++Moghunter.i) {
	  Moghunter.line = "String(Moghunter.parameters['角色-" + Moghunter.i + "-前视图'])";
	  Moghunter.actor_cm_list[Moghunter.i] = eval(Moghunter.line);
	  Moghunter.line = "String(Moghunter.parameters['角色-" + Moghunter.i + "-背景图'])";
	  Moghunter.actor_cm2_list[Moghunter.i] = eval(Moghunter.line);
	};
	
//=============================================================================
// ** Game_Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_actorcm_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_alias_mog_actorcm_temp_initialize.call(this);
    this._actor_cm_visible = false;
};	
	
//=============================================================================
// ** Spriteset Battle
//=============================================================================

//==============================
// * CreateSpriteset
//==============================
var _alias_mog_actorcm_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
   _alias_mog_actorcm_createLowerLayer.call(this);
   if (Moghunter.actor_cm_z === 0) {
      this.actorPictureCM = new Actor_CMPicture();
      this.actorPictureCM.z = 20;
      this.addChild(this.actorPictureCM);
   };
};

//=============================================================================
// * Actor_CMPicture
//=============================================================================
function Actor_CMPicture() {
    this.initialize.apply(this, arguments);
};

Actor_CMPicture.prototype = Object.create(Sprite.prototype);
Actor_CMPicture.prototype.constructor = Actor_CMPicture;

//==============================
// * Initialize
//==============================
Actor_CMPicture.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);	
    this.load_actor_cm_pictures();
	this._mp_level = 1;
	this._mp_cur_level = 1;
	this.z = 20;
	if (String(Moghunter.actor_cm2_visible) === "true") {
  	   this._sprite_actor_cm_lay = new Sprite();
	   this._sprite_actor_cm_lay.x = Graphics.boxWidth + Moghunter.actor_cm2_x;
	   this._sprite_actor_cm_lay.y = Moghunter.actor_cm2_y;
	   this._sprite_actor_cm_lay.opacity = 0;
	   this._sprite_actor_cm_lay.visible = false;
       this.addChild(this._sprite_actor_cm_lay);	
	};	
	if (String(Moghunter.actor_cm1_visible) === "true") {
	   this._sprite_actor_cm = new Sprite();
	   this._sprite_actor_cm.anchor.x = 0.5;
	   this._sprite_actor_cm.y = this._actor_cm_data[2];
	   this.addChild(this._sprite_actor_cm);
	};
};

//==============================
// * Load Actor CM Pictures
//==============================	
Actor_CMPicture.prototype.load_actor_cm_pictures = function() {
	this._sprite_actor_cm_data = [Graphics.width,0,0]
	this._actor_cm_data = [null,Moghunter.actor_cm_x,Moghunter.actor_cm_y];
	this._actor_cm_data[3] = this._actor_cm_data[1] - 100;
	this._actor_cm_img = [];
	var members = $gameParty.battleMembers();
	if (String(Moghunter.actor_cm1_visible) === "true") {		
		for (var i = 0; i < members.length; i++) {
			this._actor_cm_img[members[i]._actorId] = ImageManager.loadPicture(Moghunter.actor_cm_list[members[i]._actorId])
		};
	};
	if (String(Moghunter.actor_cm2_visible) === "true") {
		this._actor_cm2_img = [];
		for (var i = 0; i < members.length; i++) {
			this._actor_cm2_img[members[i]._actorId] = ImageManager.loadPicture(Moghunter.actor_cm2_list[members[i]._actorId])
		};		
	};
};

//==============================
// * Update
//==============================
Actor_CMPicture.prototype.update = function() {
	Sprite.prototype.update.call(this);
	if ($gameTemp._actor_cm_visible) {
		
		/*
		if( BattleManager.actor() && BattleManager.actor()._mp > 50 ){
			this._mp_level = 1;
		}
		if( BattleManager.actor() && BattleManager.actor()._mp <= 50 ){
			this._mp_level = 2;
		}
		if( this._mp_cur_level != this._mp_level ){
			this._mp_cur_level = this._mp_level;
			//修改这块部分，可以根据特殊条件，变换立绘
			//alert(this._mp_cur_level);
			//this.actor_cm_refresh();
		}*/
		
		if (this._actor_cm_data[0] != BattleManager.actor()) {this.actor_cm_refresh()};	
        if (this._sprite_actor_cm) {this.update_actor_cm_show()};
		if (this._sprite_actor_cm_lay) {this.update_actor_cm_lay_show()};
	} else {
        if (this._sprite_actor_cm) {this.update_actor_cm_hide()};
		if (this._sprite_actor_cm_lay) {this.update_actor_cm_lay_hide()};
	};
};

//==============================
// * Update Actor CM Show
//==============================
Actor_CMPicture.prototype.update_actor_cm_show = function() {	
	this._sprite_actor_cm.opacity += 15;
	if (this._sprite_actor_cm.x < this._actor_cm_data[1])
	   {this._sprite_actor_cm.x += 7;
	   	   if (this._sprite_actor_cm.x > this._actor_cm_data[1]) {this._sprite_actor_cm.x = this._actor_cm_data[1]}; 
	};
};

//==============================
// * Update Actor CM Hide
//==============================
Actor_CMPicture.prototype.update_actor_cm_hide = function() {
	this._sprite_actor_cm.opacity -= 15;
	if ( (this._sprite_actor_cm.x > this._actor_cm_data[3])) {
		this._sprite_actor_cm.x -= 7;
	    if (this._sprite_actor_cm.x < this._actor_cm_data[3]) {this._sprite_actor_cm.x = this._actor_cm_data[3]};
	};
};

//==============================
// * Update Actor CM Lay Show
//==============================
Actor_CMPicture.prototype.update_actor_cm_lay_show = function() {	
    this._sprite_actor_cm_lay.opacity += 15;
	if (this._sprite_actor_cm_lay.x > this._sprite_actor_cm_data[0])
	   {this._sprite_actor_cm_lay.x -= this._sprite_actor_cm_data[1];
	  if (this._sprite_actor_cm_lay.x < this._sprite_actor_cm_data[0]) {this._sprite_actor_cm_lay.x = this._sprite_actor_cm_data[0]};
	};
};

//==============================
// * Update Actor CM Lay Hide
//==============================
Actor_CMPicture.prototype.update_actor_cm_lay_hide = function() {
	this._sprite_actor_cm_lay.opacity -= 15;
	if ( (this._sprite_actor_cm_lay.x < Graphics.boxWidth)) {
		this._sprite_actor_cm_lay.x += this._sprite_actor_cm_data[1];
	    if (this._sprite_actor_cm_lay.x > Graphics.boxWidth) {this._sprite_actor_cm_lay.x = Graphics.boxWidth};
	};
};

//==============================
// * Actor CM Refresh
//==============================
Actor_CMPicture.prototype.actor_cm_refresh = function() {
	this._actor_cm_data[0] = BattleManager.actor();
	if(!this._actor_cm_data[0]){return}
	var actor_id = this._actor_cm_data[0]._actorId
	if (this._sprite_actor_cm) {
		if (!this._actor_cm_img[actor_id]) {
			this._actor_cm_img[actor_id] = ImageManager.loadPicture(Moghunter.actor_cm_list[members[i]._actorId])
		};
		this._sprite_actor_cm.bitmap = this._actor_cm_img[actor_id];
		this._sprite_actor_cm.opacity = 0;	
		this._sprite_actor_cm.x = this._actor_cm_data[3];
		if (this._sprite_actor_cm.bitmap.isReady()) {
			this._sprite_actor_cm.y = this._actor_cm_data[2] + Graphics.boxHeight - this._sprite_actor_cm.bitmap.height;
		};
    };	
	if (this._sprite_actor_cm_lay) {
		if (!this._actor_cm2_img[actor_id]) {
			this._actor_cm2_img[actor_id] = ImageManager.loadPicture(Moghunter.actor_cm2_list[members[i]._actorId]);
		};		
		this._sprite_actor_cm_lay.bitmap = this._actor_cm2_img[actor_id];
		if (this._actor_cm2_img[actor_id].isReady()) {
     	   this._sprite_actor_cm_data[0] = Graphics.boxWidth - this._sprite_actor_cm_lay.bitmap.width + Moghunter.actor_cm2_x;
	       this._sprite_actor_cm_data[1] = Math.max((this._sprite_actor_cm_lay.bitmap.width / 13),1);
	    };
		this._sprite_actor_cm_lay.x = Graphics.boxWidth + Moghunter.actor_cm2_x;
		this._sprite_actor_cm_lay.opacity = 0;
		this._sprite_actor_cm_lay.visible = true;
	};
};







//==============================
// * Update
//==============================
var _alias_mog_actorcm_scbat_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_alias_mog_actorcm_scbat_update.call(this);
	$gameTemp._actor_cm_visible = this.sprite_actor_cm_visible();
};

//==============================
// * Sprite Actor CM Visible
//==============================
Scene_Battle.prototype.sprite_actor_cm_visible = function() {
	if (!BattleManager.actor()) {return false};
	if (this._actorWindow.active) {return false};
	if (this._enemyWindow.active) {return false};
	if (this._partyCommandWindow.active) {return false};
	if (!BattleManager.isInputting()) {return false};
	return true;
};