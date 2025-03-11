import WaterSort from "./classes/WaterSort.js";

const colors = ["#93ebed", "#F9B9F2", "#820B8A", "#FAFF7F"];
const additionalColors = ["blue", "green", "red", "cyan"];
const game = document.getElementById("game");
const label = document.getElementById("lbl-msg-game");
const txtHeightTube = document.getElementById("txt-height-tube");
const gameOptions = document.getElementById("game-options");
// Buttons
const btnRestart = document.getElementById("btn-restart-game");
const btnReset = document.getElementById("btn-reset-game");
const btnGameOptions = document.getElementById("btn-display-options");
// Utils
/**
 * @type {WaterSort}
 */
let waterSort = null;

function toggleGameOptions() {
	gameOptions.style.display = gameOptions.style.display === "none" ? "flex" : "none";
	waterSort?.displayRestartButton();
}

// EVENTS
btnGameOptions.addEventListener("click", () => {
	toggleGameOptions();
});
btnRestart.addEventListener("click", restart);

function restart() {
	toggleGameOptions();
	waterSort = new WaterSort();
	const heigthTubeDisplayed = +txtHeightTube.value;
	const heightOfTube =
		heigthTubeDisplayed < WaterSort.MIN_HEIGHT_TUBE ? WaterSort.MIN_HEIGHT_TUBE : heigthTubeDisplayed;
	const finalColors = [
		...colors,
		...additionalColors.filter((newColor, i) => i + WaterSort.MIN_HEIGHT_TUBE < heightOfTube),
	];
	waterSort.generate({
		heightOfTube,
		nbOfTubes: heightOfTube,
		div: game,
		labelElement: label,
		restartBtn: btnRestart,
		resetGameBtn: btnReset,
		colors: finalColors,
	});
}

restart();
