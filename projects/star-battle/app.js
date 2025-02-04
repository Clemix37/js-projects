import Utils from "../../js/classes/Utils.js";

//#region Properties & constants

const btnUpdate = document.getElementById("btn-update-game");
const grid = document.getElementById("grid");
const result = document.getElementById("result");
const sizeInput = document.getElementById("size");
const windowRules = document.getElementById("window-rules");
let size = 8;
let colors = [];
let userGrid = [];
let solution = [];
let crownsPositions = [];
let gridAreas = [];
let mustReloadGrid = false;

//#endregion

//#region Utils

/**
 * Generate a random number between a range
 * @param {number} min default = 0
 * @param {number} max default = SIZE
 * @returns {number}
 */
function generateRandomIndex(min = 0, max = size) {
	return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Colors a cell
 * @param {HTMLTdElement} cell
 * @param {string} bgColor
 * @param {string} color
 */
function colorCell(cell, bgColor, color = "black") {
	cell.style.border = "1px solid black";
	cell.style.backgroundColor = bgColor;
	cell.style.color = color;
	cell.setAttribute("data-colored", true);
}

/**
 * Reset variables
 */
function resetVariables() {
	mustReloadGrid = false; // Will be updated in createCrowns
	solution = [];
	crownsPositions = [];
	gridAreas = [];
	userGrid = [];
	colors = [];
	result.innerHTML = "";
	size = +sizeInput.value;
	for (let i = 0; i < size; i++) {
		colors.push(Utils.genRandomColor());
	}
}

/**
 * Checks if nb crowns is same as SIZE, if not, will never be victory
 * Check if every crown is placed like the solution
 * Displays the victory
 * Detach events for cells
 * @returns {void}
 */
function checkForVictory() {
	const nbCrowns = userGrid.flatMap((row) => row).filter((cell) => cell === 1).length;
	if (nbCrowns !== size) return;
	// Check for number of crowns in each row
	const arrayContainsOneCrowns = (arr) => arr.every((row, indexRow) => row.filter((cell) => cell === 1).length === 1);
	const everyRowContainsOneCrown = arrayContainsOneCrowns(userGrid);
	if (!everyRowContainsOneCrown) return;
	// Check for number of crowns in each column
	const everyColumnContainsOneCrown = arrayContainsOneCrowns(
		userGrid.map((row, indexRow) => userGrid.map((internalRow) => internalRow[indexRow])),
	);
	if (!everyColumnContainsOneCrown) return;
	// Check for diagonals
	const userCrownsPositions = userGrid.map((row, indexRow) => ({
		row: indexRow,
		col: row.findIndex((cell) => cell === 1),
	}));
	const containsCrownsTouching = userCrownsPositions.some((userCrownPosition) =>
		userCrownsPositions.some(
			(pos) =>
				((pos.row === userCrownPosition.row + 1 || pos.row === userCrownPosition.row - 1) &&
					pos.col === userCrownPosition.col - 1) ||
				((pos.row === userCrownPosition.row + 1 || pos.row === userCrownPosition.row - 1) &&
					pos.col === userCrownPosition.col + 1),
		),
	);
	if (containsCrownsTouching) return;
	result.innerHTML = "VICTORY"; // Displays wins
	addOrNotCellsEvents(false); // Removes event listeners
}

//#endregion

//#region Creation

/**
 * Creates the grid with default 0
 */
function createGrid() {
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			(userGrid[i] ??= []).push(null);
			(solution[i] ??= []).push(0);
		}
	}
}

/**
 * Create crowns randomly by places
 * By checking if a crown doesn't already exists in column or diagonally
 */
function createCrowns() {
	for (let i = 0; i < size; i++) {
		// On same line it is impossible, because we generate a unique index by row
		let generatedRandomIndex;
		let counterWhile = 0;
		do {
			generatedRandomIndex = generateRandomIndex();
			counterWhile++;
		} while (
			(counterWhile < 100) &
			(solution.filter((line) => line[generatedRandomIndex]).length > 0 || // On same column
				solution[i - 1]?.[generatedRandomIndex - 1] || // Diagonal up left
				solution[i - 1]?.[generatedRandomIndex + 1] || // Diagonal up right
				solution[i + 1]?.[generatedRandomIndex - 1] || // Diagonal down left
				solution[i + 1]?.[generatedRandomIndex + 1]) // Diagonal down right
		);
		if (counterWhile === 100) {
			mustReloadGrid = true;
			break;
		}
		crownsPositions.push({ x: generatedRandomIndex, y: i });
		solution[i][generatedRandomIndex] = 1;
	}
}

/**
 * Creates left and right areas for a unique row
 */
function createLeftRightAreas() {
	for (let i = 0; i < crownsPositions.length; i++) {
		const crownPosition = crownsPositions[i];
		const randomRightIndexToStop =
			crownPosition.x == size ? crownPosition.x : generateRandomIndex(crownPosition.x, size);
		const randomLeftIndexToStop = crownPosition.x === 0 ? 0 : generateRandomIndex(0, crownPosition.x);
		// For every cell between left and right
		for (let j = randomLeftIndexToStop; j <= randomRightIndexToStop; j++) {
			const cellTd = document.querySelector(`tr[data-row="${crownPosition.y}"] td[data-col="${j}"]`);
			// We add style to the cell
			colorCell(cellTd, colors[i]);
		}
		gridAreas.push({ left: randomLeftIndexToStop, right: randomRightIndexToStop, crownPosition });
	}
}

/**
 * Creates cells for top and bottom for a unique column
 */
function createTopBottomAreas() {
	/**
	 * Check for above cells not taken and colors them
	 * @param {boolean} forTop
	 */
	const createCells = (forTop) => {
		for (let i = forTop ? 0 : gridAreas.length - 1; forTop ? i < gridAreas.length : i > 0; forTop ? i++ : i--) {
			const gridArea = gridAreas[i];
			// If first row, no above cells
			if (gridArea.crownPosition.y === 0) continue;
			for (let j = gridArea.left; j <= gridArea.right; j++) {
				// Gets every cell above cell in same column
				const cellsAboveCol = [
					...document.querySelectorAll(`td[data-colored="false"][data-col="${j}"]`),
				].filter(
					(td) => (forTop ? +td.dataset.row < i : +td.dataset.row > i), // We only want those above current row
				);
				cellsAboveCol.forEach((cellAbove) => colorCell(cellAbove, colors[i]));
			}
		}
	};
	createCells(true); // Top cells
	createCells(false); // Bottom cells
}

//#endregion

//#region Display

/**
 * Displays the grid by line adding a flex div
 * And icons based on value
 */
function displayGrid() {
	grid.innerHTML = userGrid.reduce(
		(accLine, currLine, indexRow) =>
			accLine +
			`<tr class="flex" data-row="${indexRow}">` +
			currLine.reduce(
				(acc, curr, indexCol) =>
					acc + `<td data-row="${indexRow}" data-col="${indexCol}" data-colored="false"></td>`,
				"",
			) +
			"</tr>",
		"",
	);
}

//#endregion

//#region Events

/**
 * Will add a cross for firt click, crown for second and reset it for third
 * @param {ClickEvent} e
 */
function onClickTd(e) {
	const tdClicked = e.currentTarget;
	const row = +tdClicked.dataset.row;
	const col = +tdClicked.dataset.col;
	// If cell is 1, reset to null, if cell is 0, set to 1, else set to 0
	userGrid[row][col] = userGrid[row][col] ? null : userGrid[row][col] === 0 ? 1 : 0;
	// If cell is 1, display crown
	tdClicked.innerHTML = userGrid[row][col]
		? "<i class='fas fa-crown'></i>"
		: userGrid[row][col] === 0
		? "<i class='fas fa-times'></i>"
		: "";
	checkForVictory();
}

/**
 * Attach events on td for grid
 * @param {boolean} willAttach default to true
 */
function addOrNotCellsEvents(willAttach = true) {
	const everyTds = document.querySelectorAll("#grid td");
	for (let i = 0; i < everyTds.length; i++) {
		const td = everyTds[i];
		td.removeEventListener("click", onClickTd);
		if (willAttach) td.addEventListener("click", onClickTd);
	}
}

/**
 * Add events for rules buttons
 */
function addRulesEvents() {
	// Open rules
	const btnOpenRules = document.getElementById("btn-open-rules");
	btnOpenRules.removeEventListener("click", openRules);
	btnOpenRules.addEventListener("click", openRules);
	// Close rules
	const btnCloseRulesWindow = document.getElementById("btn-close-window-rules");
	btnCloseRulesWindow.removeEventListener("click", closeRules);
	btnCloseRulesWindow.addEventListener("click", closeRules);
}

//#endregion

//#region Rules

/**
 * Shows the modal of the rules
 */
function openRules() {
	windowRules.showModal();
}

/**
 * Close the modal of the rules
 */
function closeRules() {
	windowRules.close();
}

//#endregion

/**
 * Creates the grid
 * Create crowns places
 * Displays grid
 */
function update() {
	do {
		console.clear();
		resetVariables();
		createGrid();
		createCrowns();
		displayGrid();
		createLeftRightAreas();
		createTopBottomAreas();
	} while (mustReloadGrid);
	addOrNotCellsEvents();
	addRulesEvents();
}

update();
btnUpdate.addEventListener("click", update);
window.userGrid = userGrid;
