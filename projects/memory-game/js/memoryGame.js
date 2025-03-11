import Utils from "../../../js/classes/Utils.js";

const IDS_BTNS = {
	PLAY: "btn-play-memory-game",
	RED: "btn-memory-red",
	BLUE: "btn-memory-blue",
	GREEN: "btn-memory-green",
	YELLOW: "btn-memory-yellow",
};
const btnPlay = document.getElementById(IDS_BTNS.PLAY);
const btnBlue = document.getElementById(IDS_BTNS.BLUE);
const btnRed = document.getElementById(IDS_BTNS.RED);
const btnGreen = document.getElementById(IDS_BTNS.GREEN);
const btnYellow = document.getElementById(IDS_BTNS.YELLOW);

const btns = [btnBlue, btnRed, btnGreen, btnYellow];
let orderOfBtns = [];
let userOrderOfBtns = [];
let level = 0;
let botTurn = true;

//#region Game

/**
 * Empty every value
 * Play the next bot's turn
 */
function restart() {
	level = 0;
	orderOfBtns = [];
	userOrderOfBtns = [];
	botTurn = true;
	playBotTurn();
}

/**
 * Triggers the click event
 * Adds the active class on the button
 * @param {HTMLButtonElement} btn
 */
function playBtn(btn) {
	btn?.click();
	btn?.classList.add("active");
}

/**
 * Instantiate values for user
 * Randomize the buttons array
 * Wait for the border to show before going to next button click
 * Listen for the user's turn
 */
async function playBotTurn() {
	botTurn = true;
	level++; // Upgrade for the next level
	displayInBtnsCol();
	const randomBtns = Utils.shuffleArray(btns);
	const newBtn = randomBtns[Utils.getRandomIndexFromArray(randomBtns)];
	orderOfBtns.push(newBtn);
	for (let i = 0; i < orderOfBtns.length; i++) {
		const btn = orderOfBtns[i];
		playBtn(btn);
		// Keeps the border
		await waitForNextDisplay(btn, 750);
		// Wait for the removal of the border before next iteration
		await waitForNextDisplay(btn, 250);
	}
	listenUserTurn();
}

/**
 * Get the button clicked from its id
 * Check the input from the user if it's correct or not
 * @param {EventObject} e
 * @returns {void}
 */
function addOrderOfUser(e) {
	if (botTurn) return;
	const idBtn = e.currentTarget.id;
	const btn = getBtnById(idBtn);
	userOrderOfBtns.push(btn);
	displayUserTurn();
	checkUserCorrect();
}

//#endregion

//#region Utils

/**
 * Waits a second to remove the active class on the button and go to next iteration
 * @param {HTMLButtonElement} btn
 * @param {number} timing
 * @returns {Promise<void>}
 */
function waitForNextDisplay(btn, timing = 750) {
	return new Promise((resolve) => {
		setTimeout(() => {
			btn?.classList.remove("active");
			resolve();
		}, timing);
	});
}

/**
 * Check if every value from the user is same as bot or not played yet
 * If correct, go to next bot's turn
 * If not, display the error
 * @returns {void}
 */
function checkUserCorrect() {
	const idsBtnsBot = orderOfBtns.map((btn) => btn.id);
	const idsBtnUser = userOrderOfBtns.map((btn) => btn.id);
	const isCorrect = idsBtnsBot.every((idBot, i) => (idsBtnUser[i] && idBot === idsBtnUser[i]) || !idsBtnUser[i]);
	// If the user is correct, we wait a demi-second to play the bot turn
	if (isCorrect && idsBtnsBot.length === idsBtnUser.length) return setTimeout(playBotTurn, 500);
	else if (!isCorrect) {
		alert("Incorrect from the user");
		restart();
	}
}

/**
 * Returns button from the id given as argument
 * @param {string?} id
 * @returns {HTMLButtonElement}
 */
function getBtnById(id = null) {
	switch (id) {
		case IDS_BTNS.BLUE:
			return btnBlue;
		case IDS_BTNS.GREEN:
			return btnGreen;
		case IDS_BTNS.RED:
			return btnRed;
		case IDS_BTNS.YELLOW:
			return btnYellow;
		default:
			return null;
	}
}

//#endregion

//#region Display

/**
 * Display the argument inside the btns column
 * @param {string} display
 */
function displayInBtnsCol(display = "") {
	const div = document.getElementById("div-colonne-btns");
	div.innerHTML = display;
}

/**
 * Gets the color of the button clicked each round
 * And display them inside the column
 */
function displayUserTurn() {
	const display = userOrderOfBtns.reduce((prev, btn) => `${prev}<div class="ligne">${btn.dataset.color}</div>`, "");
	displayInBtnsCol(display);
}

//#endregion

//#region Events

/**
 * Instantiate values for the user's turn
 */
function listenUserTurn() {
	userOrderOfBtns = [];
	botTurn = false;
}

/**
 * Attach button events on the DOM
 */
function attachEvents() {
	btnPlay.addEventListener("click", restart);
	btnRed.addEventListener("click", addOrderOfUser);
	btnBlue.addEventListener("click", addOrderOfUser);
	btnGreen.addEventListener("click", addOrderOfUser);
	btnYellow.addEventListener("click", addOrderOfUser);
}

//#endregion

attachEvents();
