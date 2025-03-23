import store from "../../js/classes/SessionStore.js";
import { displayInteraction, getRandomInteraction, getRandomNpc } from "./interactions.js";
import Player from "./Player.js";
import PlayerAction from "./PlayerAction.js";
import { displayPlayerDetails } from "./playerDisplay.js";
import {
	ANIMATION_CLASSES,
	displayOnDivByid,
	emptyInteractionsDivs,
	getUserActions,
	IDS_DIVS,
	isIdle,
} from "./utils.js";

//#region Properties and constants

/**
 * @type {Player}
 */
const player = new Player(store.get(Player.SESSION_KEY, {}));
const encounters = store.get("cwd-rpg-encounters", []);
const actionsDone = store.get("cwd-rpg-actions-done", []).map((a) => new PlayerAction(a));
const DELAY_ANIMATIONS = 2000;

//#endregion

//#region Utils

/**
 * Asks the player's name and saves it
 * @returns {void}
 */
function askPlayerName() {
	const name = prompt("What will be your player's name ?");
	// if no name or empty spaces, ask again
	if (!name || name.trim() === "") return askPlayerName();
	// Saving player's name
	player.name = name;
	save();
}

/**
 * Saves the player configuration
 */
function save() {
	store.set(Player.SESSION_KEY, player.toJSON());
	store.set("cwd-rpg-encounters", encounters);
	store.set("cwd-rpg-actions-done", actionsDone);
}

/**
 * Add number of XP in arguments
 * Check for level upgrading
 * And if so, display an animation
 * @param {number} nbToAdd
 * @returns {void}
 */
function addXp(nbToAdd = 1) {
	player.exp += nbToAdd;
	addAnimation(`+${nbToAdd} XP`, ANIMATION_CLASSES.GAIN);
	if (player.exp < Player.MAX_XP_BY_LEVEL) return;
	const nbLevelMore = Math.floor(player.exp / Player.MAX_XP_BY_LEVEL);
	player.level += nbLevelMore;
	player.exp -= nbLevelMore * Player.MAX_XP_BY_LEVEL;
	addAnimation(`+${nbLevelMore} Level`);
}

//#endregion

//#region Animations

/**
 * Create a span element and adds it inside animations
 * Adds its animation class
 * Removes it after animation duration
 * @param {string} msg
 * @param {string} animationClass
 */
function addAnimation(msg, animationClass = ANIMATION_CLASSES.NEUTRAL) {
	const divAnimations = document.getElementById(IDS_DIVS.ANIMATION_CHANGE);
	const span = document.createElement("span"); // Create the element
	span.classList.add(animationClass); // Adds the animation class
	span.innerText = msg; // Display the message
	divAnimations.appendChild(span);
	setTimeout(() => {
		span.remove(); // Deletes the element
	}, DELAY_ANIMATIONS);
}

//#endregion

//#region Events

/**
 * Deletes the actions buttons from the DOM
 * @param {PlayerAction[]} actions
 * @param {Function} callback
 */
function deleteEventsBtnsActions(actions, callback) {
	for (let i = 0; i < actions.length; i++) {
		const action = actions[i];
		const btn = document.getElementById(`btn-user-action-${action.id}`);
		if (!btn) continue;
		btn.removeEventListener("click", callback);
		btn.remove();
	}
}

//#endregion

/**
 * Displays a button for going next interaction
 */
function displayNextButton() {
	displayOnDivByid(IDS_DIVS.PLAYER.actions, `<button id="btn-next" class="button is(large">Next</button>`, true);
	const btn = document.getElementById("btn-next");
	btn.removeEventListener("click", interact);
	btn.addEventListener("click", interact);
}

/**
 * Display buttons for actions
 * Attach events on these buttons just displayed
 * @param {PlayerAction[]} actions
 * @param {Function} callback
 */
function displayUserActions(actions, callback) {
	if (!callback) throw new Error("No callback given for user actions");
	const content = actions.reduce((acc, action) => acc + action.getTemplate(), "");
	displayOnDivByid(IDS_DIVS.PLAYER.actions, content, true);
	for (let i = 0; i < actions.length; i++) {
		const action = actions[i];
		const btn = document.getElementById(`btn-user-action-${action.id}`);
		if (!btn) continue;
		btn.removeEventListener("click", callback);
		btn.addEventListener("click", callback);
	}
}

function interact() {
	emptyInteractionsDivs();
	if (isIdle()) return displayIdle();
	console.log(encounters, actionsDone);
	const npc = getRandomNpc(
		player,
		encounters.map((n) => n.id),
		actionsDone.map((a) => a.id),
	);
	encounters.push(npc);
	const interaction = getRandomInteraction(npc.id);
	const userActions = getUserActions(interaction.idsUserActions);
	displayInteraction(npc, interaction, player.name);
	const executeCode = (e) => {
		const idUserAction = +e.currentTarget.dataset.id;
		deleteEventsBtnsActions(userActions, executeCode); // Destroy events
		emptyInteractionsDivs(); // Clears fields
		const action = userActions.find((a) => a.id === idUserAction);
		executeAction(action);
	};
	displayUserActions(userActions, executeCode);
}

/**
 * Display the player's details
 * Save data
 * After two seconds, relaunch interaction
 */
function afterAction() {
	displayPlayerDetails(player);
	save(); // Save player's details
}

/**
 * Display a message for idle
 * Adds an XP
 * Call after action
 */
function displayIdle() {
	displayOnDivByid(IDS_DIVS.INTERATCTION.name, "You are just walking and nothing happens for the moment");
	addXp();
	afterAction();
	displayNextButton();
}

/**
 * Evaluate the code in string
 * Adds an experience point
 * @param {PlayerAction} action
 */
function executeAction(action) {
	actionsDone.push(action);
	eval(action.code);
	// So that both are not displayed together
	setTimeout(() => {
		addXp();
		afterAction();
		interact();
	}, 100);
}

/**
 * Display player's details
 * Interact
 */
function play() {
	displayPlayerDetails(player);
	interact();
}

// When opening if no name for player, then ask for it
if (!player.name) askPlayerName();
play();
