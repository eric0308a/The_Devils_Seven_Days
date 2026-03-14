/*:
@plugindesc for making enemy based on actor data
<EST ACTOR ENEMY MV>
@author Estriole
@target MV

@param Main Setting
@desc

@param AddEnemyStat
@text Add Enemy Stat
@desc set to true if you want to add databse enemy stat on top of the actor stat
@type boolean
@default false
@parent Main Setting

@param DisableEnemyLevel
@text DisableEnemyLevel
@desc set to true if you want to disable Enemy using Actor Level.
@type boolean
@default false
@parent Main Setting

@help
 ■ Information      ╒══════════════════════════╛
 EST - ACTOR ENEMY MV
 Version: 1.0
 By Estriole
 File name: .js

 ■ Introduction     ╒══════════════════════════╛
 This plugin is for making an enemy that based on Actor data.
 For example you have a party member which later BETRAY your party
 and you need to battle it. the strength of the enemy will clone
 the actor stats... including all traits from class and equipments.
 you can equip good item to the betrayer actor to make the actor enemy 
 more deadly or you can 'poison' the actor before the battle so the
 enemy start with poison state...

 ■ Features         ╒══════════════════════════╛
 - create enemy that use actor data
 - all traits from actor also inherited by the enemy including equiped items etc.
 - if actor inflicted by state before battle. it will inherit that
 at the start of battle. (will removed later if the state have turn based expiration)
 - enemy can use actor Attack Skill Id.

  ■ Changelog       ╒══════════════════════════╛
 v1.0 2020.10.22           Finish the plugin

 ■ Plugin Download ╒══════════════════════════╛
 https://www.dropbox.com/s/r3xpvwqa60ka3ny/EST_ACTOR_ENEMY_MV.js?dl=0

 ■ Screenshots ╒══════════════════════════╛
 Coming Soon

 ■ Demo ╒══════════════════════════╛
 https://www.dropbox.com/sh/vhf1jhpydfr3vne/AACXtmj85frlI81AAmAcK50Ha?dl=0
 click download to download the entire folder.

 ■ How to use       ╒══════════════════════════╛
 add notetags at the Enemy Database
 <actor_enemy: x>

 change x to actor id in database.

 ■ Dependencies     ╒══════════════════════════╛
 none

 ■ Compatibility    ╒══════════════════════════╛
 MV is new engine... so i cannot say for sure. 
 but it should be compatible with most things.

 ■ Parameters       ╒══════════════════════════╛
 @param AddEnemyStat
   true => will add enemy database stat on top of actor stat
   false => purely use actor stat

 @param DisableEnemyLevel
   true => enemy did not use actor level
   false => enemy use actor level

 
 ■ License          ╒══════════════════════════╛
 Free to use in all project (except the one containing pornography)
 as long as i credited (ESTRIOLE). 

 ■ Extra Credit ╒══════════════════════════╛
 none

 ■ Support          ╒══════════════════════════╛
 While I'm flattered and I'm glad that people have been sharing and 
 asking support for scripts in other RPG Maker communities, I would 
 like to ask that you please avoid posting my scripts outside of where 
 I frequent because it would make finding support and fixing bugs 
 difficult for both of you and me.
   
 If you're ever looking for support, I can be reached at the following:
 [ http://forums.rpgmakerweb.com/ ]
 pm me : estriole

 also support to compatibility with VisuStella is not possible.
 because their code is obfuscated thus cannot be read by human.
 if there's incompatibility... please ask VisuStella Team.

 ■ Donate  ╒══════════════════════════╛
 If you want to support my work you can donate here
 https://paypal.me/Estriole

 ■ Author's Notes   ╒══════════════════════════╛
 None

*/
var EST = EST || {};
EST.ActorEnemy = EST.ActorEnemy || {};
EST.ActorEnemy.pluginName=document.currentScript.src.split('/').slice(-1)[0].slice(0,-3).replace(/\%20/g," ");

EST.ActorEnemy.Parameters = PluginManager.parameters(EST.ActorEnemy.pluginName);
EST.ActorEnemy.Parameters.AddEnemyStat = JSON.parse(EST.ActorEnemy.Parameters.AddEnemyStat) || false;
EST.ActorEnemy.Parameters.DisableEnemyLevel = JSON.parse(EST.ActorEnemy.Parameters.DisableEnemyLevel) || false;

(function($){
// extend new method to recover HPMP only
Game_BattlerBase.prototype.recoverHPMP = function() {
    this._hp = this.mhp;
    this._mp = this.mmp;
};

//initialize the enemy and check the actor exist or not
$.Game_Enemy_initialize = Game_Enemy.prototype.initialize
Game_Enemy.prototype.initialize = function(enemyId, x, y) {
	$.Game_Enemy_initialize.call(this, enemyId, x, y);
	if (!EST.ActorEnemy.Parameters.DisableEnemyLevel) this._level = 0;
	this._actorEnemy = this.getActorEnemy();
	this.recoverHPMP();
};

//function to get actor enemy based on notetags
Game_Enemy.prototype.getActorEnemy = function() {
if (!$dataEnemies[this._enemyId]) return null;
if (!$dataEnemies[this._enemyId].note.match(/<actor_enemy:(.*)>/im)) return null;
var actor = $gameActors.actor(JSON.parse($dataEnemies[this._enemyId].note.match(/<actor_enemy:(.*)>/im)[1]));
if (!actor) return null; 
if (actor && !EST.ActorEnemy.Parameters.DisableEnemyLevel) this._level = actor.level;
return actor;
};

//redirect the enemy to actor instead.
$.Game_Enemy_traitObjects = Game_Enemy.prototype.traitObjects;
Game_Enemy.prototype.traitObjects = function() {
	if (!this._actorEnemy) return $.Game_Enemy_traitObjects.call(this);
	var trait = this._actorEnemy.traitObjects() 
	trait = trait.concat(this.states());
	if (trait) return trait;
    return $.Game_Enemy_traitObjects.call(this);
};

$.Game_Enemy_paramBase = Game_Enemy.prototype.paramBase;
Game_Enemy.prototype.paramBase = function(paramId) {
	if (!this._actorEnemy) return $.Game_Enemy_paramBase.call(this,paramId);
	var value = this._actorEnemy.paramBase(paramId);
	if (value && EST.ActorEnemy.Parameters.AddEnemyStat) value += $.Game_Enemy_paramBase.call(this,paramId);
 	if (value) return value;
 	return $.Game_Enemy_paramBase.call(this,paramId);
};

$.Game_Enemy_paramPlus = Game_Enemy.prototype.paramPlus;
Game_Enemy.prototype.paramPlus = function(paramId) {
	if (!this._actorEnemy) return $.Game_Enemy_paramPlus.call(this,paramId);
	var value = this._actorEnemy.paramPlus(paramId);
	if (value) value += $.Game_Enemy_paramPlus.call(this, paramId);
	if (value) return value;
	return $.Game_Enemy_paramPlus.call(this,paramId);
};

// enemy name reroute
$.Game_Enemy_originalName = Game_Enemy.prototype.originalName;
Game_Enemy.prototype.originalName = function() {
	if(!this._actorEnemy) return $.Game_Enemy_originalName.call(this);
	return this._actorEnemy.name();
	return $.Game_Enemy_originalName.call(this);
};

//transforming enemy;
$.Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
	$.Game_Enemy_transform.call(this, enemyId);
	if (!EST.ActorEnemy.Parameters.DisableEnemyLevel) this._level = 0;	
	this._actorEnemy = this.getActorEnemy();
    this.refresh();
    if (this.numActions() > 0) this.makeActions();
};

//replacing Enemy (Attack skill 1) with Actor Attack skill 
$.Game_Action_setEnemyAction = Game_Action.prototype.setEnemyAction
Game_Action.prototype.setEnemyAction = function(action) {
	if (!this.subject()._actorEnemy) return $.Game_Action_setEnemyAction.call(this,action);
	if (action.skillId == 1){
		action.skillId = this.subject()._actorEnemy.attackSkillId();
	}
	$.Game_Action_setEnemyAction.call(this,action);
};

//creating defineproperty for enemy level 
if (!EST.ActorEnemy.Parameters.DisableEnemyLevel)
{
	Object.defineProperty(Game_Enemy.prototype, "level", {
   	 get: function() {
        return this._level;
   	 },
     configurable: true
	});
};

})(EST.ActorEnemy);