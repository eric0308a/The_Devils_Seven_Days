//=============================================================================
// MOG_BattlebackEX.js
//=============================================================================

/*:
 * @plugindesc (v1.2)[v1.2]  战斗 - 动态战斗背景
 * @author Moghunter （Drill_up翻译+优化）
 *
 * @param --背景组 1至20--
 * @default 
 *
 * @param 背景-1
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-2
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-3
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-4
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-5
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-6
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-7
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-8
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-9
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-10
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-11
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-12
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-13
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-14
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-15
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-16
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-17
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-18
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-19
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-20
 * @parent --背景组 1至20--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param --背景组21至40--
 * @default 
 *
 * @param 背景-21
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-22
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-23
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-24
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-25
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-26
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-27
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-28
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-29
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-30
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-31
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-32
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-33
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-34
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-35
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-36
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-37
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-38
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-39
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-40
 * @parent --背景组21至40--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param --背景组41至60--
 * @default 
 *
 * @param 背景-41
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-42
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-43
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-44
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-45
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-46
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-47
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-48
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-49
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-50
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-51
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-52
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-53
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-54
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-55
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-56
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-57
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-58
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-59
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-60
 * @parent --背景组41至60--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param --背景组61至80--
 * @default 
 *
 * @param 背景-61
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-62
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-63
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-64
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-65
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-66
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-67
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-68
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-69
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-70
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-71
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-72
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-73
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-74
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-75
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-76
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-77
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-78
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-79
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param 背景-80
 * @parent --背景组61至80--
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks1/
 * @type file
 *
 * @param --前景组 1至20--
 * @default 
 *
 * @param 前景-1
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-2
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-3
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-4
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-5
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-6
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-7
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-8
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-9
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-10
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-11
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-12
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-13
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-14
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-15
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-16
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-17
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-18
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-19
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-20
 * @parent --前景组 1至20--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param --前景组21至40--
 * @default 
 *
 * @param 前景-21
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-22
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-23
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-24
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-25
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-26
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-27
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-28
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-29
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-30
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-31
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-32
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-33
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-34
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-35
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-36
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-37
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-38
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-39
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @param 前景-40
 * @parent --前景组21至40--
 * @desc 前景的图片资源。
 * @default 
 * @require 1
 * @dir img/battlebacks2/
 * @type file
 *
 * @help  
 * =============================================================================
 * +++ MOG Battleback EX (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 战斗背景将被分成许多图层，可以添加许多动态图片。
 * 【现已支持插件关联资源的打包、加密】
 * ★★会影响内部的设定文件★★
 *
 * -----------------------------------------------------------------------------
 * ----关于与YEP的脚本冲突
 * 如果你使用了YEP_CoreEngine（引擎核心）脚本，其中的变量Scale Battlebacks
 * （战斗背景重置）请设置为关闭（false）状态。
 *
 * -----------------------------------------------------------------------------
 * ----素材规则
 * rmmv自身会把背景图进行裁剪！数据库中背景和真实运行起来的背景完全不一样！
 * （如果你希望玩家能完整看见素材背景图的全貌，去资源文件中看图示。）
 *
 * 背景图大小控制原理：固定816*624的窗口。
 *     如果图片大了，放置在中心，只显示816*624。
 *     如果图片小了，会强行拉扯成1000*740的图片，然后只显示816*624。
 *     范围内的图，放大缩小窗口都只是对816*624的内容进行缩放。
 *  【具体情况看资源中的切割图示，红线表示不用插件，rmmv默认让玩家看到的被
 *   裁剪的区域，黄线表示使用插件后，额外裁剪的部分。】
 *
 * 动态图片的原理一样，将图片放置在中心点，以外部分循环平铺处理。
 * （动态图片如果小了也会被拉扯成1000*740的图片）
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 前景的图片资源，分别放在前景组中。 （img/battlebacks1文件夹）
 * 背景的图片资源，分别放在背景组中。 （img/battlebacks2文件夹）
 * 配置没有固定顺序，可以随机配置在组中。
 * 但是关键字设置要与配置的文件名相互匹配！
 * 前景背景相互的关系需要仔细查看 参数C图层类型 。以确定资源的位置。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 如果要修改战斗背景为动态的图层，在触发战斗前使用插件指令：
 * （注意：所有冒号":"两边字符都是空格，ABCDEFG参数不能包含空格！）
 *
 * 插件指令：
 * bb_ex : A : B : C : D : E : F : G
 * 
 * 参数A：图层编号
 *        数值编号越大的图层，显示在越上面
 *        （最好从3开始编号，因为1和2是rmmv的原设置战斗场景的背景图和前景图。）
 * 参数B：资源文件
 *        填入文件名，不需要.png后缀
 * 参数C：图层类型（前景背景的配置位置可以随意，但是名字必须匹配。）
 *        该插件改变了原来的图层设定，实际显示先后如下：
 *          Lower - 放在敌人后面的资源都在背景组（img/battlebacks1/）中
 *          敌人
 *          Upper - 放在敌人前面的资源都在前景组（img/battlebacks2/）中
 *        原设定先后顺序是这样：
 *          背景图 - 资源在img/battlebacks1/中
 *          前景图 - 资源在img/battlebacks2/中
 *          敌人
 *        你可以使用原设定的函数，然后使用插件指令，双方都不冲突，只是资源放
 *        的位置会比较乱。
 * 参数D：速度-X轴方向（可以为小数）
 *        正数为向左移动，负数为向右移动。
 * 参数E：速度-Y轴方向（可以为小数）
 *        正数为向上移动，负数为向下移动。
 * 参数F：混合模式
 *        pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * 参数G：镜头透视
 *        如果你使用了mog镜头插件，镜头移动时，背景会根据镜头移动做微小移动。
 *        0表示不移动，50表示，如果你的镜头移动了100的像素距离，背景会根据你
 *        的方向跟着移动50的距离。
 *
 * 插件指令：
 * bb_ex_clear
 *
 * 该插件指令将清除所有添加的图层。
 * 在设计动态背景方面，应该养成先清除背景，后添加背景的习惯。
 *
 * 示例：
 * 插件指令：bb_ex_clear
 * 插件指令：bb_ex : 3 : 数字领域 : Lower : 0.2 : 0 : 0 : 0
 * 插件指令：bb_ex : 4 : F黑结界 : Lower : 0 : 0 : 0 : 0
 * 插件指令：bb_ex : 5 : F数字1 : Lower : 1.8 : 0 : 0 : 50
 * 插件指令：bb_ex : 6 : F雪 : Upper : 1 : -5 : 0 : 50
 *
 * 注意！如果你选择了打包加密，请务必检查你的插件指令的文件名是否配置在背景组
 * 或者前景组中！
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up修改优化：
 * [v1.1]
 * 原来的插件有一个bug，第一次读取场景没有问题，第二次读取场景时，使用同一张
 * 背景，会造成那个背景显示不出来。此bug已修复。
 * [v1.2]
 * 使得该插件支持关联资源的打包、加密。
 * 部署时勾选去除无关文件，本插件中相关的文件不会被去除。
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_BattlebackEX = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_BattlebackEX');
	
//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bbex_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias_mog_bbex_sys_initialize.call(this);
    this._bbex_data = [];
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_bbex_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_bbex_pluginCommand.call(this,command, args)
	if (command === "bb_ex")  {
		var index =  Math.min(Math.max(args[1],1),100);index -= 1;		
		$gameSystem._bbex_data[index] = [];
		$gameSystem._bbex_data[index][0] = String(args[3]);
		$gameSystem._bbex_data[index][1] = String(args[5]);
		$gameSystem._bbex_data[index][2] = Number(args[7]);
		$gameSystem._bbex_data[index][3] = Number(args[9]);
		$gameSystem._bbex_data[index][4] =  Math.min(Math.max(Number(args[11]),0),2);
		if (args[13]) {
		   var rate = Math.min(Math.max(Number(args[13]),-100),100)
		   $gameSystem._bbex_data[index][5] = rate;}
	};
	if (command === "bb_ex_clear")  {$gameSystem._bbex_data = []};
	return true;
};

//=============================================================================
// ** SpritesetBattle Prototype
//=============================================================================	
var _alias_mog_sprt_createBattleField = Spriteset_Battle.prototype.createBattleField;
Spriteset_Battle.prototype.createBattleField = function() {    
	_alias_mog_sprt_createBattleField.call(this);
	this.bbexSetup();
};

//=============================================================================
// ** BbexSetup
//=============================================================================	
Spriteset_Battle.prototype.bbexSetup = function() {
	this._bbexcfix = Utils.RPGMAKER_VERSION >= "1.3.3" ? true : false;
	this._bbData = [];	
	for (var i = 0; i < $gameSystem._bbex_data.length; i++) {	 
	     if (i === 0 && !$gameSystem._bbex_data[0]) {this._bbData.push($gameSystem._bbex_data[0])};
		 if (i === 1 && !$gameSystem._bbex_data[1]) {this._bbData.push($gameSystem._bbex_data[1])};
		 if ($gameSystem._bbex_data[i]) {this._bbData.push($gameSystem._bbex_data[i])};
	};
    this._bbPlaneLower = new Sprite();
	this._bbPlaneLower.z = 0;
    this._battleField.addChild(this._bbPlaneLower);	
};

//==============================
// * createBBUperPlane
//==============================
Spriteset_Battle.prototype.createBbUpperPlane  = function() {
    this._bbPlaneUpper = new Sprite();
	this._bbPlaneUpper.z = 10;
    this._battleField.addChild(this._bbPlaneUpper);	
};

//==============================
// * setbbBitmap
//==============================
Spriteset_Battle.prototype.setbbBitmap = function(index) {
	if (this._bbData[index][1] === "Lower") {
        return ImageManager.loadBattleback1(this._bbData[index][0]);
	} else {
		return ImageManager.loadBattleback2(this._bbData[index][0]);
	};
};

//==============================
// * createActors
//==============================
var _alias_mog_bbex_createActors = Spriteset_Battle.prototype.createActors
Spriteset_Battle.prototype.createActors = function() {	
	_alias_mog_bbex_createActors.call(this);
	this.createBbUpperPlane();
};

//==============================
// * createLower Layer
//==============================
var _alias_mog_bbex_sprtbat_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer
Spriteset_Battle.prototype.createLowerLayer  = function() {
	_alias_mog_bbex_sprtbat_createLowerLayer.call(this);    
	this.createBattlebacks();
};
	
//==============================
// * createBattlebacks
//==============================
Spriteset_Battle.prototype.createBattlebacks = function() {
	this.addBattleback(this._back1Sprite,0);
	this.addBattleback(this._back2Sprite,1);
	this._backSpriteEx = [];
	for (var i = 2; i < this._bbData.length; i++) {
	    this._backSpriteEx[i] = new TilingSprite();
		this.addBattleback(this._backSpriteEx[i],i);
  	};
};	
	
//==============================
// * add BattleBack
//==============================
Spriteset_Battle.prototype.addBattleback = function(sprite,index) {
    var margin = 32;
    var x = -this._battleField.x - margin;
    var y = -this._battleField.y - margin;
    var width = Graphics.width + margin * 2;
    var height = Graphics.height + margin * 2;	
	if (this._bbData[index]) {
		sprite.bitmap = this.setbbBitmap(index)
	} else {
		if (index === 0) {
           sprite.bitmap = this.battleback1Bitmap();
		} else {
		   sprite.bitmap = this.battleback2Bitmap();
		};
	};
    sprite.move(x, y, width, height);
	this.setbbexOrgInit(sprite);
	if (!this._bbData[index] || this._bbData[index][1] === "Lower") {
        this._bbPlaneLower.addChild(sprite);
	} else {
		this._bbPlaneUpper.addChild(sprite);		
	};
	if (this._bbData[index]) {sprite.blendMode = this._bbData[index][4]};
};

//==============================
// * createBattleback
//==============================
Spriteset_Battle.prototype.createBattleback = function() {
	this._back1Sprite = new TilingSprite();
    this.setbbexOrgInit(this._back1Sprite);	
    this._back2Sprite = new TilingSprite();
	this.setbbexOrgInit(this._back2Sprite);
};

//==============================
// * setBBexOrgInt
//==============================
Spriteset_Battle.prototype.setbbexOrgInit = function(sprite) {
	sprite.init = 0;
	sprite.ox = 0;
	sprite.oy = 0;
	sprite.ow = this._bbexcfix ? Graphics.boxWidth / 2 : 0;
	sprite.oh = this._bbexcfix ? Graphics.boxHeight / 2 : 0;
    sprite.origin.x = sprite.ow;
	sprite.origin.y = sprite.oh;
};

//==============================
// * Is BBEX Visible
//==============================
Spriteset_Battle.prototype.isbbEXVisible = function(sprite) {
	 if (!Imported.MOG_BattleCamera) {return true}
	 if (!this._bbexcfix) {return true}
     if (!sprite.bitmap) {return false};
	 if (!sprite.bitmap.isReady()) {return false};
	 if (!sprite.init) {return false};
	 return true
};

//==============================
// * updateBBEXVisible
//==============================
Spriteset_Battle.prototype.updateBBEXVisible = function(sprite) {
    sprite.visible = false;
	if (sprite.bitmap.isReady()) {this.setBBEXVisible(sprite)};
};

//==============================
// * set BBEX Visible
//==============================
Spriteset_Battle.prototype.setBBEXVisible = function(sprite) {
    sprite.visible = true;
	sprite.init = true;
	sprite.ow = sprite.bitmap.width / 2;
	sprite.oh = sprite.bitmap.height / 2;	
    sprite.origin.x = sprite.ow;
	sprite.origin.y = sprite.oh;	
};

//==============================
// * updateBattleback
//==============================
var _alias_mog_bbex_updateBattleback = Spriteset_Battle.prototype.updateBattleback;
Spriteset_Battle.prototype.updateBattleback = function() {
	_alias_mog_bbex_updateBattleback.call(this);
    this.updateBattlebackEffects();
};

//==============================
// * updateScroll
//==============================
Spriteset_Battle.prototype.updateScroll = function(sprite,index) {
	 sprite.ox += this._bbData[index][2];
	 sprite.oy += this._bbData[index][3];
     sprite.origin.x = sprite.ox + sprite.ow;
	 sprite.origin.y = sprite.oy + sprite.oh;
};

//==============================
// * update BBEX Opacity
//==============================
Spriteset_Battle.prototype.updateBBEXOpacity = function(sprite) {
	if (!this._back1Sprite) {return};
	sprite.opacity = this._back1Sprite.opacity;
};

//==============================
// * updateBattlebackEffects
//==============================
Spriteset_Battle.prototype.updateBattlebackEffects = function() {	
    if (!this.isbbEXVisible(this._back1Sprite)) {this.updateBBEXVisible(this._back1Sprite)};
	if (!this.isbbEXVisible(this._back2Sprite)) {this.updateBBEXVisible(this._back2Sprite)};
	if (this._bbData[0]) {this.updateScroll(this._back1Sprite,0);};
	if (this._bbData[1]) {this.updateScroll(this._back2Sprite,1);};	
	for (var i = 2; i < this._bbData.length; i++) {
	   if (!this.isbbEXVisible(this._backSpriteEx[i])) {this.updateBBEXVisible(this._backSpriteEx[i])};	   
	   this.updateScroll(this._backSpriteEx[i],i);
	   this.updateBBEXOpacity(this._backSpriteEx[i]);
	};
};