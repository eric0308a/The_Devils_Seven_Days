//=============================================================================
// MOG_SkipWindowLog.js
//=============================================================================

/*:
 * @plugindesc (v1.2)[v1.0]  战斗 - 去掉窗口提示消息
 * @author Moghunter （Drill_up翻译）
 *
 * @param 战斗间隔
 * @type number
 * @min 0
 * @desc 释放技能或者攻击后间隔的时间，单位帧。（1秒60帧）
 * @default 10 
 *
 * @param 是否显示战斗开始对话
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示，xxxx出现的对话框。
 * @default true
 *
 * @param 是否显示先发制人对话
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @help  
 * =============================================================================
 * +++ MOG - Skip Window Log (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 去掉窗口提示消息。
 * mog原插件，该插件将直接去掉所有消息。建议使用可配置的消息的插件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件冲突
 * 该插件与 YEP_BattleEngineCore 战斗核心 插件直接冲突，需要做必要取舍。
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_SkipWindowLog = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_SkipWindowLog');
    Moghunter.winLogSpeed = Number(Moghunter.parameters['战斗间隔'] || 10);
	Moghunter.battleStartMessage = String(Moghunter.parameters['是否显示战斗开始对话'] || "false");
	Moghunter.battlePreemptiveMessage = String(Moghunter.parameters['是否显示先发制人对话'] || "true");
//=============================================================================
// ** Window BattleLog
//=============================================================================

//==============================
// * Refresh 
//==============================
Window_BattleLog.prototype.refresh = function(text) { 
   this.visible = false;
};

//==============================
// * Message Speed
//==============================
Window_BattleLog.prototype.messageSpeed = function() {
	if (Imported.MOG_FlashDamage) {if ($gameTemp._flashDamage) {return 0}};
    return Moghunter.winLogSpeed;
};


//=============================================================================
// ** Battle Manager
//=============================================================================

//==============================
// * Refresh 
//==============================
BattleManager.displayStartMessages = function() {
    if (String(Moghunter.battleStartMessage) === "true") {
		$gameTroop.enemyNames().forEach(function(name) {
			$gameMessage.add(TextManager.emerge.format(name));
		});
	};
	if (String(Moghunter.battlePreemptiveMessage) === "true") {
    if (this._preemptive) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
	};
};