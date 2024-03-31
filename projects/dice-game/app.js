// PROPERTIES
const btnRollDice = document.getElementById('btnRollDice');
const player1Content = document.getElementById('player1Content');
const player2Content = document.getElementById('player2Content');
const resultsText = document.getElementById('resultsText');

// EVENTS
btnRollDice.addEventListener('click', rollDice);
document.addEventListener("keyup", onKeyUp);

// FUNCTIONS
const getRandomInt = () => Math.floor(Math.random() * 6)+ 1;
const getTemplateImageDice = (nb) => `<img src="./dices/dice${nb}.png" title="Dice ${nb}" />`;

function rollDice() {
    const nb1 = getRandomInt();
    const nb2 = getRandomInt();
    const isDraw = nb1 === nb2;
    resultsText.innerText = isDraw ? "Draw !" : `Player ${nb1 > nb2 ? 1 : 2} wins !`;
    player1Content.innerHTML = getTemplateImageDice(nb1);
    player2Content.innerHTML = getTemplateImageDice(nb2);
}

/**
 * When pressing space bar, rolling the dice
 * @param {KeyBoardEvent} e 
 */
function onKeyUp(e){
    const isSpaceBar = e.key === " ";
    if(!isSpaceBar) return;
    rollDice();
}