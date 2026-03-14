//
//  移動ルート＋ ver1.00
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['MoveRoutePlus'] = 1.00;

/*:
 * @plugindesc (v1.00)[v1.1] 地图 - 设置移动路线指令扩展
 * @author Yana （Drill_up翻译+优化）
 *
 * @help 
 * =============================================================================
 * +++ MoveRoutePlus (v1.00) +++
 * By Yana
 * https://twitter.com/yanatsuki_
 * =============================================================================
 * 使得设置移动路线指令有一些更方便的脚本操作。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 以下为移动路线脚本快速指令：
 *
 * 移动路线脚本：上移n步
 * 移动路线脚本：左移n步
 * 移动路线脚本：右移n步
 * 移动路线脚本：下移n步
 * 移动路线脚本：左下移n步
 * 移动路线脚本：左上移n步
 * 移动路线脚本：右下移n步
 * 移动路线脚本：右上移n步
 * 移动路线脚本：前进n步
 * 移动路线脚本：后退n步
 * 移动路线脚本：接近玩家n步
 * 移动路线脚本：远离玩家n步
 * 移动路线脚本：随机移动n步
 * 
 * 移动路线脚本：moveUp(n)
 * 移动路线脚本：moveLeft(n)
 * 移动路线脚本：moveRight(n)
 * 移动路线脚本：moveDown(n)
 * 移动路线脚本：moveLeftDown(n)
 * 移动路线脚本：moveLeftUp(n)
 * 移动路线脚本：moveRightDown(n)
 * 移动路线脚本：moveRightUp(n)
 * 移动路线脚本：moveForward(n)
 * 移动路线脚本：moveBack(n)
 * 移动路线脚本：moveToward(n)
 * 移动路线脚本：moveAway(n)
 * 移动路线脚本：moveRandom(n)
 * 
 * 参数n：填入数字步数
 *        中文和英文的作用是一样的，只是写法不一样。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 如果你要进行比较复杂的移动操作，可以使用下面的脚本：
 *
 * 移动路线脚本：loopRoute(n,a)
 *
 * 参数a：移动编号
 *        第a个指令重复n次。
 *
 * ------------------------------------------------------
 * 利用規約 （Yana）
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 */

(function(){
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('MoveRoutePlus');

    ////////////////////////////////////////////////////////////////////////////////////

    var __GCharacter_setMoveRoute = Game_Character.prototype.setMoveRoute;
    Game_Character.prototype.setMoveRoute = function(moveRoute) {
        var mr = moveRoute;
        mr.list = this.deploymentMoveRoute(moveRoute);
        __GCharacter_setMoveRoute.call(this, mr);
    };
    
    var __GCharacter_forceMoveRoute = Game_Character.prototype.forceMoveRoute;
    Game_Character.prototype.forceMoveRoute = function(moveRoute) {
        var mr = moveRoute;
        mr.list = this.deploymentMoveRoute(moveRoute);
        __GCharacter_forceMoveRoute.call(this, mr);
    };
    
    Game_Character.prototype.deploymentMoveRoute = function(moveRoute) {
        var list = [];
        moveRoute.list.forEach(function(r){
            if (r.code === 45) {
                if (r.parameters[0].match(/^(?:moveDown|下移)\(?(\d+)\)?(?:步)?/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:1});
                } else if (r.parameters[0].match(/^(?:moveLeft|左移)\(?(\d+)\)?(?:步)?/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:2});
                } else if (r.parameters[0].match(/^(?:moveRight|右移)\(?(\d+)\)?(?:步)?/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:3});
                } else if (r.parameters[0].match(/^(?:moveUp|上移)\(?(\d+)\)?(?:步)?/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({code: 4});
                } else  if (r.parameters[0].match(/^(?:moveLeftDown|左下移)\(?(\d+)\)?(?:步)?/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:5});
                } else if (r.parameters[0].match(/^(?:moveRightDown|右下移)\(?(\d+)\)?(?:步)?/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:6});
                } else if (r.parameters[0].match(/^(?:moveRightUp|右上移)\(?(\d+)\)?(?:步)?/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:7});
                } else if (r.parameters[0].match(/^(?:moveLeftUp|左上移)\(?(\d+)\)?(?:步)?/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({code:8});
                } else if (r.parameters[0].match(/^moveForward\((\d+)\)/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({code:12});
                } else if (r.parameters[0].match(/^moveBack\((\d+)\)/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({code:13});
                } else if (r.parameters[0].match(/^moveToward\((\d+)\)/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:10});
                } else if (r.parameters[0].match(/^moveAway\((\d+)\)/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:11});
                } else if (r.parameters[0].match(/^moveRandom\((\d+)\)/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:9});
                } else if (r.parameters[0].match(/^前进(\d+)步/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({code:12});
                } else if (r.parameters[0].match(/^后退(\d+)步/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({code:13});
                } else if (r.parameters[0].match(/^接近玩家(\d+)步/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:10});
                } else if (r.parameters[0].match(/^远离玩家(\d+)步/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:11});
                } else if (r.parameters[0].match(/^随机移动(\d+)步/)) {
                    for (var i=0;i<Number(RegExp.$1);i++) list.push({code:9});
                } else if (r.parameters[0].match(/loopRoute\((.+)\)/)) {
                    var params = RegExp.$1.split(',');
                    var code = Number(params[1]);
                    var command = {code:code, parameters:[]};
                    var max = Number(params[0]);
                    switch(code) {
                        case 41:
                            command.parameters[0] = params[2];
                            command.parameters[1] = Number(params[3]);
                            for (var i = 0; i < max; i++) list.push(command);
                            break;
                        case 44:
                            var se = {name:'',pan:0,pitch:100,volume:100};
                            se.name = params[2];
                            if (params[3]) se.volume = Number(params[3]);
                            if (params[4]) se.pitch = Number(params[4]);
                            if (params[5]) se.pan = Number(params[5]);
                            command.parameters[0] = se;
                            for (var i = 0; i < max; i++) list.push(command);
                            break;
                        case 45:
                            command.parameters[0] = params[2];
                            for (var i = 0; i < max; i++) list.push(command);
                            break;
                        default:
                            if (params[2]) command.parameters[0] = Number(params[2]);
                            if (params[3]) command.parameters[1] = Number(params[3]);
                            for (var i = 0; i < max; i++) list.push(command);
                            break;
                    }
                } else {
                    list.push(r);
                }
            } else {
                list.push(r);
            }
        }.bind(this));
        return list;
    };
}());