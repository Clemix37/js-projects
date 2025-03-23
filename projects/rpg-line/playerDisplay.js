import { displayOnDivByid, IDS_DIVS } from "./utils.js";
import Player from "./Player.js";
import PlayerAction from "./PlayerAction.js";

/**
 * Display his name, money
 * @param {Player} player
 */
export function displayPlayerDetails(player) {
	displayOnDivByid(IDS_DIVS.PLAYER.name, player.name);
	displayOnDivByid(IDS_DIVS.PLAYER.level, `Level ${player.level}`);
	displayOnDivByid(IDS_DIVS.PLAYER.exp, `${player.exp} XP`);
	displayOnDivByid(IDS_DIVS.PLAYER.money, `${player.money} $`);
}

/**
 * Display the message to the user
 * Display player's actions
 * @param {string} msg
 * @param {PlayerAction[]} actions
 */
export function displayPlayerActions(msg, actions) {
	displayOnDivByid(IDS_DIVS.PLAYER.msg, msg);
	displayOnDivByid(
		IDS_DIVS.PLAYER.actions,
		actions.reduce(
			(acc, action) => acc + `<div class='btn-action' id='player-action-${action.id}'>${action.msg}</div>`,
			"",
		),
		true,
	);
}
