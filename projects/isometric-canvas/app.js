/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const startPoints = {
	x: 100,
	y: 100,
};
const angle = 26.5;
const dirtImage = new Image(100, 100);
dirtImage.src = "./dirt.png";

class IsoCube {
	width;
	height;
	faceLeftX;
	faceLeftY;
	angle;
	constructor(w, h, x, y) {
		this.width = w;
		this.height = h;
		this.faceLeftX = x;
		this.faceLeftY = y;
		this.angle = (Math.PI / 180) * angle;
	}
	render() {
		this.#renderSquareFace("left", "rgba(0, 0, 0, 0.1)", [this.faceLeftX, this.faceLeftY], this.width, this.height);
		const cosAngle = Math.cos(angle * (Math.PI / 180)) * 100;
		const rightFaceX = cosAngle + this.faceLeftX;
		this.#renderSquareFace("right", "rgba(0, 0, 0, 0.1)", [rightFaceX, this.faceLeftY], this.width, this.height);
		const topFaceX = cosAngle / 2 + this.faceLeftX;
		const topFaceY = this.faceLeftY - cosAngle + this.width / 4;
		this.#renderSquareFace("top", "#6abe30", [topFaceX, topFaceY], this.width, cosAngle);
	}
	#renderSquareFace(type, color, position, w, h) {
		ctx.save();
		ctx.fillStyle = color;
		const x = position[0];
		const y = position[1];
		ctx.translate(x + w / 2, y + h / 2);
		ctx.rotate(this.angle * (type === "right" ? -1 : 1));
		ctx.transform(
			1,
			0,
			Math.tan(this.angle * (type === "left" ? 1 : type === "right" ? -1 : ((90 - angle * 2) / angle) * -1)),
			1,
			0,
			0,
		);
		ctx.scale(1, Math.cos(this.angle));
		ctx.translate(-(x + w / 2), -(y + h / 2));
		if (type !== "top") {
			ctx.drawImage(dirtImage, x - this.angle / 2, y - this.angle / 2, 100, 100);
		}
		ctx.fillRect(x, y, w, h);
		ctx.restore();
	}
}

function animate() {
	ctx.clearRect(0, 0, width, height); // Clear the canvas
	const w = 100;
	const h = 100;
	const nbCubes = 5;
	let currentX = 100;
	let currentY = 100;
	for (let i = 0; i < nbCubes; i++) {
		new IsoCube(w, h, currentX, currentY).render();
		currentX += 100 * 2 * Math.cos(angle * (Math.PI / 180));
	}
	currentX = 100 - Math.cos(angle * (Math.PI / 180)) * 100;
	currentY = 100 + (Math.cos(angle * (Math.PI / 180)) * 100) / 2;
	for (let i = 0; i < nbCubes; i++) {
		new IsoCube(w, h, currentX, currentY).render();
		currentX += 100 * 2 * Math.cos(angle * (Math.PI / 180));
	}
	console.log(currentX);
	window.requestAnimationFrame(animate);
}

ctx.imageSmoothingEnabled = false;
animate();
