//=================================================================================================
// Enemy of actor.js
//=================================================================================================
/*:
* @plugindesc 角色敌人。
* @author 芯☆淡茹水
* @help
*
* 〓 说明 〓
*
* 该插件可将敌人队伍设置为 以N个角色组合为敌人 的队伍。
* 该插件仅适用于开启了 SV侧视图战斗 的工程。
* 将 数据库-角色 作为敌人，以下简称 角色敌人 。
*
*
* 〓 插件命令 〓
*
* 1， 设置角色敌人战斗时，角色敌人的属性增幅百分比 => SetEaParamRate paramId rate
*     paramId : 属性ID 。（0：最大HP； 1：最大MP； 2：物攻； 3：物防； 4：魔攻； 5：魔防； 6：敏捷； 7:运气）
*     rate : 增幅的百分比值。（最小限制为 0）
*
* 2， 以某个游戏变量值为百分比，设置角色敌人的属性增幅百分比 => SetEaParamRateByVal paramId valId
*     paramId : 属性ID 。（同上）
*     valId : 游戏变量ID。
*
* ※ 以上设置属性百分比，均在战斗开始前设置，并且不予保留，战斗结束后会自动清零 ※
*
*
* 〓 角色敌人队伍备注与设置 〓
*
* 1， 角色敌人队伍的备注内容，全部写到 数据库 - 敌人队伍 - 队伍名字 里面。
*
* 2， 备注格式： <AE:id1=level,id2=level,id3=level...>
*     id=level : 表示为 角色ID=角色出场的等级 。 level 可以不写，表示保持当前等级或初始等级。
*     例：敌人队伍名字备注 => <AE:5=10,5=8,10,12=11>
*         表示为: 5号角色敌人，等级为 10， 一个
*                 5号角色敌人，等级为 8， 一个
*                 10号角色敌人，保持当前等级， 一个
*                 12号角色敌人，等级为 11， 一个
*
* 3， 挑战自我模式，敌人队伍名字备注 => <BeyondSelf>
*     该模式将会复制当前角色队伍所有战斗队员，包含其 等级， 装备， 技能，，，等，
*     除设置的属性增幅外，与玩家的战斗队伍一模一样，组成敌人队伍，与玩家进行战斗。
*
* 4， 备注了角色敌人的敌人队伍，请在 敌人队伍的位置编辑视窗 里，放上 大于等于 备注的角色敌人个数 的 敌人。
*     用这些放入的 敌人位置 ， 来决定 角色敌人 的战斗位置。
*
* 〓 角色掉落物品备注 〓
*
* 1，角色敌人的经验备注 => <ExpDrop:n>
*    n : 每一级的经验，实际经验为 n X 角色敌人等级
*
* 2，角色敌人的掉落金钱备注 => <GoldDrop:n>
*    n : 每一级的金钱，实际金钱为 n X 角色敌人等级
*
* 3，角色敌人掉落当前身上装备的爆率备注 => <EquipDropRate:n>
*    n : 爆率百分比值。
*
* ※ 以上3项备注，如果不掉落某一项，就不备注该项 ※
*
*
* 〓 条件判断 〓
*
* 判断是否在进行 角色敌人 的战斗 => 条件-脚本：$gameTemp.isEaBattle();
*
*/
//=================================================================================================
;var XdRsData = XdRsData || {};
XdRsData.ea = XdRsData.ea || {};
//=================================================================================================
XdRsData.ea.Game_Temp_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function() {
    XdRsData.ea.Game_Temp_initialize.call(this);
    this.onEaBattleEnd();
};
Game_Temp.prototype.isEaBattle = function() {
    return this._isEaBattle;
};
Game_Temp.prototype.setEaBattleSign = function() {
    this._isEaBattle = true;
};
Game_Temp.prototype.clearEaActorRateData = function() {
    this._eaActorRateData = [];
};
Game_Temp.prototype.eaActorParamRate = function(paramId) {
    return Math.max(this._eaActorRateData[paramId] || 0, 0) / 100;
};
Game_Temp.prototype.setEaActorParamRate = function(paramId, rate) {
    this._eaActorRateData[paramId] = rate;
};
Game_Temp.prototype.setEaActorParamRateByVal = function(paramId, valId) {
    this.setEaActorParamRate(paramId, $gameVariables.value(valId) || 0);
};
Game_Temp.prototype.onEaBattleEnd = function() {
    this._isEaBattle = false;
    this.clearEaActorRateData();
};
//=================================================================================================
Game_Actors.prototype.hasActor = function(actorId) {
    return !!this._data[actorId];
};
//=================================================================================================
Game_Actor.prototype.rebel = function(x, y, level) {
    this._screenX = x;
    this._screenY = y;
    this._isTraitor = true;
    this.changeLevel(level || this._level);
    this.recoverAll();
};
Game_Actor.prototype.isActor = function() {
    return !this._isTraitor;
};
Game_Actor.prototype.isEnemy = function() {
    return !!this._isTraitor;
};
Game_Actor.prototype.screenX = function() {
    return this._screenX || 0;
};
Game_Actor.prototype.screenY = function() {
    return this._screenY || 0;
};
XdRsData.ea.Game_Actor_index = Game_Actor.prototype.index;
Game_Actor.prototype.index = function() {
    if (this.isActor()) return XdRsData.ea.Game_Actor_index.call(this);
    return $gameTroop.members().indexOf(this);
};
XdRsData.ea.Game_Actor_paramRate = Game_Actor.prototype.paramRate;
Game_Actor.prototype.paramRate = function(paramId) {
    var last = XdRsData.ea.Game_Actor_paramRate.call(this, paramId);
    return last + (this._isTraitor ? $gameTemp.eaActorParamRate(paramId) : 0);
};
XdRsData.ea.Game_Actor_isBattleMember = Game_Actor.prototype.isBattleMember;
Game_Actor.prototype.isBattleMember = function() {
    if (this.isActor()) return XdRsData.ea.Game_Actor_isBattleMember.call(this);
    return this.index() >= 0;
};
XdRsData.ea.Game_Actor_friendsUnit = Game_Actor.prototype.friendsUnit;
Game_Actor.prototype.friendsUnit = function() {
    if (this._isTraitor) return $gameTroop;
    return XdRsData.ea.Game_Actor_friendsUnit.call(this);
};
XdRsData.ea.Game_Actor_opponentsUnit = Game_Actor.prototype.opponentsUnit;
Game_Actor.prototype.opponentsUnit = function() {
    if (this._isTraitor) return $gameParty;
    return XdRsData.ea.Game_Actor_opponentsUnit.call(this);
};
XdRsData.ea.Game_Actor_makeActions = Game_Actor.prototype.makeActions;
Game_Actor.prototype.makeActions = function() {
    if (this.isActor()) return XdRsData.ea.Game_Actor_makeActions.call(this);
    Game_Battler.prototype.makeActions.call(this);
    this.setActionState('undecided');
    this.makeAutoBattleActions();
};
XdRsData.ea.Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
Game_Actor.prototype.performCollapse = function() {
    if (this._isTraitor) return SoundManager.playEnemyCollapse();
    XdRsData.ea.Game_Actor_performCollapse.call(this);
};
Game_Actor.prototype.originalName = function() {
    return this.name();
};
Game_Actor.prototype.exp = function() {
    var exp = +(this.actor().meta.ExpDrop || 0);
    return exp * this._level;
};
Game_Actor.prototype.gold = function() {
    var gold = +(this.actor().meta.GoldDrop || 0);
    return gold * this._level;
};
Game_Actor.prototype.makeDropItems = function() {
    var rate = +(this.actor().meta.EquipDropRate || 0);
    if (rate <= 0) return [];
    var rate = rate * ($gameParty.hasDropItemDouble() ? 2 : 1);
    var arr = [];
    for (var i=0;i<this.equips().length;++i) {
        if (Math.randomInt(100) < rate) arr.push(this.equips()[i]);
    }
    return arr;
};
//=================================================================================================
Game_Troop.prototype.isActorTroop = function(troopId) {
    var troop = $dataTroops[troopId];
    if (!troop) return false;
    if (/<BeyondSelf>/.test(troop.name)) return true;
    if (/<AE:(\S+)>/.test(troop.name))   return true;
    return false;
};
Game_Troop.prototype.getNoteActorsData = function() {
    var arr = [];
    if (/<BeyondSelf>/.test(this.troop().name)) {
        var actors = $gameParty.battleMembers();
        for(var i=0;i<actors.length;++i) {
            arr.push({'actorId':actors[i].actorId()});
        }
    } else if (this.troop().name.match(/<AE:(\S+)>/)) {
        var data = RegExp.$1.split(',');
        for (var i=0;i<data.length;++i) {
            var id = +(data[i].split(/=/)[0]);
            if ($dataActors[id]) {
                var level = +(data[i].split(/=/)[1]);
                arr.push({'actorId':id, 'level':level});
            }
        }
    }
    return arr;
};
Game_Troop.prototype.setupActorEnemies = function(troopId) {
    if (!this.isActorTroop(troopId)) return false;
    this.clear();
    this._troopId = troopId;
    var actorsData = this.getNoteActorsData();
    for (var i=0;i<actorsData.length;++i) {
        var data = actorsData[i];
        var member = this.troop().members[i];
        var sx = member ? member.x : 0;
        var sy = member ? member.y : 0;
        var actor = null;
        if ($gameActors.hasActor(data.actorId)) {
            actor = JsonEx.makeDeepCopy($gameActors.actor(data.actorId));
        } else actor = new Game_Actor(data.actorId);
        actor.rebel(sx, sy, data.level);
        this._enemies.push(actor);
    }
    var result = this._enemies.length > 0;
    result && $gameTemp.setEaBattleSign();
    return result;
};
XdRsData.ea.Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
    !this.setupActorEnemies(troopId) && XdRsData.ea.Game_Troop_setup.call(this, troopId);
};
XdRsData.ea.Game_Troop_onBattleEnd = Game_Troop.prototype.onBattleEnd;
Game_Troop.prototype.onBattleEnd = function() {
    XdRsData.ea.Game_Troop_onBattleEnd.call(this);
    $gameTemp.onEaBattleEnd();
};
//=================================================================================================
XdRsData.ea.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    XdRsData.ea.Game_Interpreter_pluginCommand.call(this, command, args);
    command === 'SetEaParamRate' && $gameTemp.setEaActorParamRate(+args[0], +args[1]);
    command === 'SetEaParamRateByVal' && $gameTemp.setEaActorParamRateByVal(+args[0], +args[1]);
};
//=================================================================================================
XdRsData.ea.Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
Sprite_Actor.prototype.setBattler = function(battler) {
    XdRsData.ea.Sprite_Actor_setBattler.call(this, battler);
    if (this._actor) {
        this.scale.x = (this._actor.isEnemy() ? -1 : 1);
    }
};
XdRsData.ea.Sprite_Actor_moveToStartPosition = Sprite_Actor.prototype.moveToStartPosition;
Sprite_Actor.prototype.moveToStartPosition = function() {
    if (this._actor && this._actor.isEnemy()) return this.startMove(-300, 0, 0);
    XdRsData.ea.Sprite_Actor_moveToStartPosition.call(this);
};
XdRsData.ea.Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    if (this._actor && this._actor.isEnemy()) return this.setHome(this._actor.screenX(), this._actor.screenY());
    XdRsData.ea.Sprite_Actor_setActorHome.call(this, index);
};
XdRsData.ea.Sprite_Actor_stepForward = Sprite_Actor.prototype.stepForward;
Sprite_Actor.prototype.stepForward = function() {
    if (this._actor && this._actor.isEnemy()) return this.startMove(48, 0, 12);
    XdRsData.ea.Sprite_Actor_stepForward.call(this);
};
XdRsData.ea.Sprite_Actor_retreat = Sprite_Actor.prototype.retreat;
Sprite_Actor.prototype.retreat = function() {
    if (this._actor && this._actor.isEnemy()) return this.startMove(-300, 0, 0);
    XdRsData.ea.Sprite_Actor_retreat.call(this);
};
Sprite_Actor.prototype.startEffect = function(effectType) {
};
//=================================================================================================
XdRsData.ea.Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    if ($gameTemp.isEaBattle()) return this.createActorEnemies();
    XdRsData.ea.Spriteset_Battle_createEnemies.call(this);
};
Spriteset_Battle.prototype.createActorEnemies = function() {
    var enemies = $gameTroop.members();
    var sprites = [];
    for (var i = 0; i < enemies.length; i++) {
        sprites[i] = new Sprite_Actor(enemies[i]);
    }
    sprites.sort(this.compareEnemySprite.bind(this));
    for (var j = 0; j < sprites.length; j++) {
        this._battleField.addChild(sprites[j]);
    }
    this._enemySprites = sprites;
};
//=================================================================================================
// end
//=================================================================================================