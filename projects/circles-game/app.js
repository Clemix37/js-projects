/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext("2d", { alpha: false });
const heart = new Image();
const circleImage = new Image();
const requiredElapsed = 1000;
const MAX_BOUNCES = 3;
let animation = null;
let mousePos = {
	x: 0,
	y: 0,
};
let lastTime = null;
/**
 * @type {Circle[]}
 */
let circles = [];
let nbLives = 3;
/**
 * @type {Cursor}
 */
let userCursor = null;
canvas.width = innerWidth;
canvas.height = innerHeight;

/**
 * Returns a random number between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateImageCursor() {
	console.log(nbLives);
	heart.src = `./heart v2 - ${nbLives}.png`;
}

class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Circle {
	/**
	 * @type {Vector2D}
	 */
	position;
	/**
	 * @type {Vector2D}
	 */
	velocity;
	rad;
	_id;
	_nbBounces;

	constructor(position, velocity) {
		this._id = circles.length > 0 ? Math.max(...circles.map((c) => c._id)) + 1 : 0;
		this.position = position;
		this.velocity = velocity;
		this.rad = circleImage.width / 2;
		this._nbBounces = 0;
	}

	draw() {
		ctx.drawImage(
			circleImage,
			this.position.x - circleImage.width / 2,
			this.position.y - circleImage.height / 2,
			50,
			50,
		);
	}

	update() {
		if (this.position.x + this.rad > innerWidth || this.position.x - this.rad < 0) {
			this._nbBounces++;
			if (this._nbBounces <= MAX_BOUNCES) this.velocity.x = -this.velocity.x;
		}

		if (this.position.y + this.rad > innerHeight || this.position.y - this.rad < 0) {
			this._nbBounces++;
			if (this._nbBounces <= MAX_BOUNCES) this.velocity.y = -this.velocity.y;
		}

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this._nbBounces > MAX_BOUNCES) {
			setTimeout(() => {
				circles = circles.filter((c) => c._id !== this._id);
			}, 1000);
		}
	}
}

class Cursor {
	constructor(x, y) {
		console.log(heart.width);
		this.updatePos(x, y);
	}

	updatePos(x, y) {
		this.x = x;
		this.y = y;
	}

	update() {
		// Draw image based on user cursor
		ctx.drawImage(heart, this.x - heart.width / 2, this.y - heart.height / 2, 100, 100);
	}
}

window.addEventListener("mousemove", (e) => {
	mousePos.x = e.offsetX;
	mousePos.y = e.offsetY;
	userCursor?.updatePos(mousePos.x, mousePos.y);
});

function init() {
	ctx.imageSmoothingEnabled = false;
	circleImage.src = `./circle.png`;
	updateImageCursor();
	animation = window.requestAnimationFrame(update);
}

function displayCircles() {
	for (let i = 0; i < circles.length; i++) {
		const c = circles[i];
		c.draw();
		c.update();
	}
}

function update(now) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	lastTime ??= now;
	const elapsed = now - lastTime;
	if (elapsed > requiredElapsed) {
		lastTime = now;
		circles.push(new Circle(new Vector2D(randomNumber(25, 800), randomNumber(25, 800)), new Vector2D(3, 3)));
	}
	displayCircles();
	userCursor ??= new Cursor(mousePos.x ?? 0, mousePos.y ?? 0);
	userCursor.update();
	const circlesCollided = circles.filter((c) => {
		return !(
			(
				c.position.x - c.rad > userCursor.x + heart.width || // Xc > Xwh
				c.position.x + c.rad < userCursor.x || // Xwc < Xh
				c.position.y - c.rad > userCursor.y + heart.height || // Yc > Yhh
				c.position.y + c.rad < userCursor.y
			) // Yhc < Yh
		);
	});
	if (circlesCollided.length) {
		const idsCirclesToDelete = circlesCollided.map((c) => c._id);
		circles = circles.filter((c) => !idsCirclesToDelete.includes(c._id));
		nbLives--;
		updateImageCursor();
		if (!nbLives) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			cancelAnimationFrame(animation);
		}
		userCursor.update();
	}

	animation = window.requestAnimationFrame(update);
}

init();
