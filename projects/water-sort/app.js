import WaterSort from "./WaterSort.js";

const colors = ["#BCF4F5", "#F9B9F2", "#820B8A", "#FAFF7F"];
const game = document.getElementById("game");
const label = document.getElementById("lbl-msg-game");
const btnRestart = document.getElementById("btn-restart-game");
const btnReset = document.getElementById("btn-reset-game");

const waterSort = new WaterSort({ 
    heightOfTube: 4, 
    nbOfTubes: 4, 
    div: game, 
    labelElement: label,
    restartBtn: btnRestart, 
    resetGameBtn: btnReset,
    colors, 
});

waterSort.generate();