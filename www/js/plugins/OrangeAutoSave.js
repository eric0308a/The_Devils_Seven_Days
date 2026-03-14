/*=============================================================================
 * Orange - AutoSave
 * By Hudell - www.hudell.com
 * OrangeAutoSave.js
 * Version: 1.1.1
 * Free for commercial and non commercial use.
 *=============================================================================*/
/*:
 * @plugindesc (v1.1)[v1.0]  系统 - 自动存档
 * @author Hudell （Drill_up翻译）
 *
 * @param 是否覆盖到上个存档
 * @type boolean
 * @on 覆盖
 * @off 不覆盖
 * @desc true - 覆盖，false - 不覆盖。如果不覆盖，则存储到指定存档编号文件。
 * @default false
 *
 * @param 存档编号
 * @type number
 * @min 1
 * @desc 自动存档将覆盖到指定的存档文件中。
 * @default 1
 *
 * @param 是否自动触发（脚本）
 * @type boolean
 * @on 触发
 * @off 不触发
 * @desc true - 触发，false - 不触发。任何脚本调用了玩家传送的方法，都会自动存档。包括场所移动。
 * @default false
 *
 * @param 是否自动触发（场所移动）
 * @type boolean
 * @on 触发
 * @off 不触发
 * @desc true - 触发，false - 不触发。使用场所移动指令时，会自动存档。
 * @default false
 *
 * @help
 * =============================================================================
 * +++ Orange - AutoSave (v1.1) +++
 * By Hudell
 * https://www.hudell.com
 * =============================================================================
 * 可以设置在指定的地方自动存档。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、地图界面、战斗界面。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以手动设置存档，使用以下脚本：
 *
 * 脚本：DataManager.autoSave();
 *
 *
 */
var Imported = Imported || {};
var Hudell = Hudell || {};
Hudell.OrangeAutoSave = Hudell.OrangeAutoSave || {};

(function($) {
  "use strict";

  var Parameters = PluginManager.parameters('OrangeAutoSave');
  if (Parameters.length === 0) {
    throw new Error("Couldn't find Hudell's OrangeAutoSave parameters.");
  }
  $.Param = {};
  $.enabled = true;
  $.skipCalls = 0;

  // Param validation

  if (Parameters['存档编号'] !== "false") {
    $.Param.saveSlot = Number(Parameters['存档编号'] || 1);
  } else {
    $.Param.saveSlot = 99;
  }

  $.Param.saveOnPluginTransfer = (Parameters['是否自动触发（脚本）'] || "").toLowerCase() === "true";
  $.Param.saveOnTransferCommand = (Parameters['是否自动触发（场所移动）'] || "").toLowerCase() !== "false";
  $.Param.autoSaveSlot = (Parameters['是否覆盖到上个存档'] || "").toLowerCase() !== "false";
  $.Param.currentSaveSlot = $.Param.saveSlot;

  // Code

  $.getSaveSlot = function() {
    return $.Param.currentSaveSlot;
  };

  $.skipNextCall = function() {
    $.skipCalls++;
  };

  $.doAutoSave = function() {
    $gameSystem.onBeforeSave();
    DataManager.saveGameWithoutRescue($.getSaveSlot());
  };

  //Only change the performTransfer method if it's activated through params
  if ($.Param.saveOnPluginTransfer) {
    $.oldGamePlayer_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function() {
      $.oldGamePlayer_performTransfer.call(this);
      
      if ($.skipCalls > 0) {
        $.skipCalls--;
        return;
      }

      if (this._newMapId > 0) {
        if ($.enabled) {
          $.doAutoSave();
        }
      }
    };

    //Changes setupNewGame so that the initial player transfer doesn't trigger an auto save
    $.oldDataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
      $.skipNextCall();
      $.oldDataManager_setupNewGame.call(this);
    };

    //Changes reloadMapIfUpdated so that loading a game doesn't trigger an auto save
    $.oldSceneLoad_reloadMapIfUpdated = Scene_Load.prototype.reloadMapIfUpdated;
    Scene_Load.prototype.reloadMapIfUpdated = function() {
      if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $.skipNextCall();
      }

      $.oldSceneLoad_reloadMapIfUpdated.call(this);
    };

  //Only change the command if the performTransfer is disabled and the transfer command is enabled
  } else if ($.Param.saveOnTransferCommand) {
    $.oldGameInterpreter_command201 = Game_Interpreter.prototype.command201;
    Game_Interpreter.prototype.command201 = function() {
      $.oldGameInterpreter_command201.call(this);
      
      if ($gamePlayer.isTransferring() && $.enabled) {
        $.doAutoSave();
      }
    };
  }

  if ($.Param.autoSaveSlot) {
    var oldDataManager_saveGameWithoutRescue = DataManager.saveGameWithoutRescue;
    DataManager.saveGameWithoutRescue = function(savefileId) {
      oldDataManager_saveGameWithoutRescue.call(this, savefileId);
      $.Param.currentSaveSlot = savefileId;
    };

    var oldDataManager_loadGameWithoutRescue = DataManager.loadGameWithoutRescue;
    DataManager.loadGameWithoutRescue = function(savefileId) {
      oldDataManager_loadGameWithoutRescue.call(this, savefileId);
      $.Param.currentSaveSlot = savefileId;
    };

    var autoSaveSlot_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
      autoSaveSlot_setupNewGame.call(this);
      $.Param.currentSaveSlot = $.Param.saveSlot;
    };
  }

  DataManager.autoSave = $.doAutoSave;
})(Hudell.OrangeAutoSave);

Imported.OrangeAutoSave = 1.1;
