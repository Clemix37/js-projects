import WaterSort from "./WaterSort.js";

const colors = ["yellow", "green", "blue", "red"];
const game = document.getElementById("game");
/**
 * TODO
 * 
 *  Create tubes
 *  Fill each tube with a random color not already displayed 4 times
 * 
 */
const waterSort = new WaterSort({ heightOfTube: 4, nbOfTubes: 4, div: game, colors, });
waterSort.generateOnDiv();