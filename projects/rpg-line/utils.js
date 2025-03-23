import Utils from "../../js/classes/Utils.js";
import userActions from "./data/user-actions.json" with { type: "json" };
import PlayerAction from "./PlayerAction.js";

export const IDS_DIVS = {
	PLAYER: {
		name: "player-name",
		level: "player-level",
		exp: "player-exp",
		money: "player-money",
		msg: "msg-player",
		actions: "player-actions",
	},
	INTERATCTION: {
		name: "interaction-name",
		role: "interaction-role",
		msg: "msg-interaction",
	},
	COLS: {
		USER: "col-user",
		INTERACTIONS: "col-interactions",
	},
    ANIMATION_CHANGE: "animations-change",
};

export const ANIMATION_CLASSES = {
    GAIN: "gain",
    LOSS: "loss",
    NEUTRAL: "neutral",
};

/**
 * Gets the div by its id
 * If the div exists, display the content inside it
 * As html or not based on thir argument
 * @param {string} idDiv
 * @param {string} content
 * @param {boolean} isHtml
 */
export function displayOnDivByid(idDiv, content = "", isHtml = false) {
	const div = document.getElementById(idDiv);
	if (div) div[isHtml ? "innerHTML" : "innerText"] = content;
}

/**
 * Gets user actions based on ids
 * @param {number[]} ids 
 * @returns {PlayerAction[]}
 */
export function getUserActions(ids){
    return userActions.actions.filter(a => ids.includes(a.id)).map(a => new PlayerAction(a));
}

/**
 * There is a 50% chance there is nothing happening
 * @returns {boolean}
 */
export function isIdle() {
    const arr = [];
    for (let i = 0; i < 200; i++) {
        arr.push(i % 2 === 0 ? "idle" : "not idle");
    }
    const randomIndex = Utils.getRandomIndexFromArray(arr);
    return arr[randomIndex] === "idle";
}

/**
 * Clears interactions divs
 */
export function emptyInteractionsDivs(){
    displayOnDivByid(IDS_DIVS.INTERATCTION.msg);
    displayOnDivByid(IDS_DIVS.INTERATCTION.name);
    displayOnDivByid(IDS_DIVS.INTERATCTION.role);
}