//=============================================================================
// RPG Maker MZ - Command window position (Combat)
//-----------------------------------------------------------------------------
// Izy_CommandWindowPos.js
// This plugin was requested by Accendor. This plugin reposition the combat party and command window in battle.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc V1.01 This plugin was requested by Accendor. This plugin reposition the combat party and command window in battle.
 * @author Izyees Fariz
 * @url https://forums.rpgmakerweb.com/
 *
 * @help
 *
 * This plugin was requested by Accendor. For any edit/improvement/fix please
 * contact me at the forum (izyees).
 * This plugin reposition the coordinate of the command window.
 * Use the text tab in the plugin manager to input a negative value.
 * 
 * This plugin does not provide plugin commands.
 *
 * Change Log:
 *   V1.01 - Add an option to change the row.
 *
 * @param WinX
 * @text Window X coordinate
 * @desc Set the X coordinate of the battle window. The default value was set to 0. Use text for negative values.
 * @default 0
 * @type number
 *
 *
 * @param WinY
 * @text Window Y coordinate
 * @desc Set the Y coordinate of the battle window.  The default value was set to 0. Use text for negative values.
 * @default 0
 * @type number
 *
 * @param WinRow
 * @text Window Rows
 * @desc Set the total row of the battle window. The default value was set to 4. Negative values are not supported.
 * @default 4
 * @type number
 */
 
 var Izyees = Izyees || {};
 Izyees.plugins = Izyees.plugins || {};
 Izyees.plugins.Accendor = {};
 Izyees.plugins.Accendor.params = PluginManager.parameters('Izy_CommandWindowPos');
 
 (function(){
	const Params = Izyees.plugins.Accendor.params;
	
	//The party command window
	Scene_Battle.prototype.partyCommandWindowRect = function() {
		const ww = 192;
		const wh = this.calcWindowHeight(Params.WinRow, true);
		const wx = Params.WinX;
		const wy = Params.WinY;
		return new Rectangle(wx, wy, ww, wh);
	};

	//The actor command window
	Scene_Battle.prototype.actorCommandWindowRect = function() {
		const ww = 192;
		const wh = this.calcWindowHeight(Params.WinRow, true);
		const wx = Params.WinX;
		const wy = Params.WinY;
		return new Rectangle(wx, wy, ww, wh);
	};
	
	//Remove the commandWindow.y callout
	Scene_Battle.prototype.createActorCommandWindow = function() {
		const rect = this.actorCommandWindowRect();
		const commandWindow = new Window_ActorCommand(rect);
		commandWindow.setHandler("attack", this.commandAttack.bind(this));
		commandWindow.setHandler("skill", this.commandSkill.bind(this));
		commandWindow.setHandler("guard", this.commandGuard.bind(this));
		commandWindow.setHandler("item", this.commandItem.bind(this));
		commandWindow.setHandler("cancel", this.commandCancel.bind(this));
		this.addWindow(commandWindow);
		this._actorCommandWindow = commandWindow;
	};

 })();