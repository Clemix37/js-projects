const messageBox = document.getElementById('messageBox');
const btnLaunchGame = document.getElementById('btnLaunchGame');
const table = document.getElementById("table");
let isPlaying = false;
let playerPlaying = 0;
let playerWon = 0;
let played = [[null,null,null],[null,null,null],[null,null,null]];
const symbols = ["X", "O"];

/* Generate the HTML content of the table with each cell and its necessary data */
const generateTable = () => {
    let res = ``;
    for (let i = 0; i < 3; i++) {
        res += `<tr>`
        for (let j = 0; j < 3; j++) {
            res += `<td id="cell-${i}-${j}" class="cell" data-row="${i}" data-cell="${j}"></td>`;
        }
        res += `</tr>`
    }
    table.innerHTML = res;
};

/* Attach click event on every cell */
const generateEvents = () => {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        cell.addEventListener("click", onCellClicked);
    }
};

const onCellClicked = (e) => {
    if(!isPlaying) return;
    const rowIndex = parseInt(e.currentTarget.dataset.row);
    const cellIndex = parseInt(e.currentTarget.dataset.cell);
    if(isNaN(rowIndex) || isNaN(cellIndex)) return;
    // Check if the cell is not already used
    if(!!played[rowIndex][cellIndex]) return displayMessage("Cell already used");
    // Save the player symbol where the player clicked, so that the cell is used
    const actualSymbol = symbols[playerPlaying-1];
    played[rowIndex][cellIndex] = actualSymbol;
    // Display the player symbol
    const cell = document.getElementById(`cell-${rowIndex}-${cellIndex}`);
    cell.innerText = actualSymbol;
    // We check if the game has ended by winning or no more cells to use
    checkEndGame();
    // We switch the player playing
    changePlayerPlaying();
};

const checkEndGame = () => {
    // TODO: use playerWon
    let isEveryCellFilled = true;
    // For every row
    for (let i = 0; i < played.length; i++) {
        const row = played[i];
        const upRow = played[i-1];
        const downRow = played[i+1];
        const existDownAndUpRow = !!upRow && !!downRow;
        // For every cell in the row
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            const leftCell = row[j-1];
            const rightCell = row[j+1];
            const cellLeftAndRightExisting = !!leftCell && !!rightCell;
            // Winning on the same line
            const cdnRowWinning = cellLeftAndRightExisting && cell === leftCell && cell === rightCell;
            // Winning on the same column
            const cdnColWinning = existDownAndUpRow && cell === upRow[j] && cell === downRow[j];
            // Winning in diagonals
            const cdnDiagWinning = existDownAndUpRow && ((upRow[j-1] === cell && downRow[j+1] === cell) || (upRow[j+1] === cell && downRow[j-1] === cell));
            if(!cell) isEveryCellFilled = false;
            else if(cdnRowWinning || cdnColWinning || cdnDiagWinning) {
                playerWon = playerPlaying;
                return generateWin();
            }
        }
    }
    // Each cell is filled, it's a draw
    if(isEveryCellFilled && isPlaying) generateDraw();
};

/* Hide the play button, initializes the first player */
const play = () => {
    if(isPlaying) return;
    played = [[null,null,null],[null,null,null],[null,null,null]];
    btnLaunchGame.style.display = "none";
    isPlaying = true;
    changePlayerPlaying();
    generateTable();
    generateEvents();
};

/* Switches the player which is playing, display the message for the player */
const changePlayerPlaying = () => {
    if(!isPlaying) return;
    playerPlaying = playerPlaying === 1 ? 2 : 1;
    displayMessage(`Player ${playerPlaying} playing ! (${symbols[playerPlaying-1]})`);
};

/* Changes the display, reset the variables */
const generateWin = () => {
    displayMessage(`Player ${playerWon} wins ! (${symbols[playerWon-1]})`);
    generateEndGame();
};

/* Changes the display, reset the variables */
const generateDraw = () => {
    displayMessage(`Draw ! Great job !!`);
    generateEndGame();
};

/* Display the button for playing, reset player playing, and player won */
const generateEndGame = () => {
    btnLaunchGame.style.display = "block";
    isPlaying = false;
    playerPlaying = 0;
    playerWon = 0;
};

/**
 * Changes the content of the message box for the user
 * @param {string} msg 
 */
const displayMessage = (msg) => {
    messageBox.innerText = msg;
};

btnLaunchGame.addEventListener("click", play);