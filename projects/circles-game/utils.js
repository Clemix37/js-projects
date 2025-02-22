/**
 * @type {HTMLCanvasElement}
 */
let canvas = null;
/**
 * @type {CanvasRenderingContext2D}
 */
let ctx = null;

/**
 * Returns a random number between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gets the next id for circles
 * @param {Circle[]} circles
 * @returns {number}
 */
function getNextIdCircles(circles) {
	return circles.length > 0 ? Math.max(...circles.map((c) => c._id)) + 1 : 0;
}

/**
 * Create the canvas with width of screen and height of screen
 * Removes image with smoothing so that images are not blurred when zoomed
 */
function createCanvasAndContext() {
	canvas = document.getElementById("canvas");
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	ctx = canvas.getContext("2d", { alpha: false });
	ctx.imageSmoothingEnabled = false;
}

export { createCanvasAndContext, ctx, canvas, randomNumber, getNextIdCircles };
