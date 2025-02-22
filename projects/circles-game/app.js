import Circle from "./classes/Circle.js";
import { MAX_BOUNCES, requiredElapsed } from "./constants.js";
import Cursor from "./classes/Cursor.js";
import { createCanvasAndContext, ctx, canvas, getNextIdCircles, randomNumber } from "./utils.js";
import Vector2D from "./classes/Vector2D.js";

//#region Properties

const heart = new Image(100, 100);
const circleImage = new Image(16, 16);
circleImage.src = `./circle.png`;
let mousePos = {
	x: 0,
	y: 0,
};
let lastTime = null;
/**
 * @type {Circle[]}
 */
let circles = [];
/**
 * @type {number}
 */
let nbLives = 3;
/**
 * @type {Cursor}
 */
let userCursor = null;

//#endregion

//#region Events

// When mouse is moving, store its position
window.addEventListener("mousemove", (e) => {
	mousePos.x = e.offsetX;
	mousePos.y = e.offsetY;
	userCursor?.updatePos(mousePos.x, mousePos.y); // Update cursor position
});

//#endregion

function updateImageCursor() {
	nbLives = nbLives <= 0 ? 0 : nbLives;
	heart.src = `./heart v2 - ${nbLives}.png`;
}

function init() {
	createCanvasAndContext(); // will create canvas et ctx
	circleImage.src = `./circle.png`;
	updateImageCursor();
	window.requestAnimationFrame(update);
}

function displayCircles() {
	circles.forEach((c) => {
		c.draw(); // Draw the image
		c.update(); // Update its velocity, its position, bounces etc
	});
	// Will clear circles that reached max bounces
	const idsCirclesWithMaxBounces = circles.filter((c) => c._nbBounces > MAX_BOUNCES).map((c) => c._id);
	if (!idsCirclesWithMaxBounces.length) return;
	setTimeout(() => {
		circles = circles.filter((c) => !idsCirclesWithMaxBounces.includes(c._id));
	}, 500);
}

/**
 * Gets the circles that collided
 * Destroy them from canvas,
 * @returns {void}
 */
function checkForCollisions() {
	const circlesCollided = circles.filter((c) => {
		return !(
			(
				c.position.x - c.rad > userCursor.x + userCursor._img.width || // Xc > Xwh
				c.position.x + c.rad < userCursor.x || // Xwc < Xh
				c.position.y - c.rad > userCursor.y + userCursor._img.height || // Yc > Yhh
				c.position.y + c.rad < userCursor.y
			) // Yhc < Yh
		);
	});
	// If no circles collided, do nothing
	if (!circlesCollided.length) return;
	const idsCirclesToDelete = circlesCollided.map((c) => c._id);
	circles = circles.filter((c) => !idsCirclesToDelete.includes(c._id));
	nbLives -= idsCirclesToDelete.length; // If 2 collided, minus 2 lives
	updateImageCursor(); // Change the cursor image with current life
	userCursor.update(); // Update cursor
}

function update(now) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// After each required elapsed, spawn a circle
	lastTime ??= now;
	const elapsed = now - lastTime;
	if (elapsed > requiredElapsed && nbLives > 0) {
		lastTime = now;
		circles.push(
			new Circle(
				getNextIdCircles(circles),
				circleImage,
				new Vector2D(randomNumber(25, 800), randomNumber(25, 800)),
				new Vector2D(3, 3),
				25,
			),
		);
	}
	displayCircles(); // will draw and update every circle
	// Update cursor of player
	userCursor ??= new Cursor(heart, mousePos.x ?? 0, mousePos.y ?? 0);
	userCursor.update();
	// Will check for circles that collided with user cursor
	checkForCollisions();

	window.requestAnimationFrame(update);
}

init();
