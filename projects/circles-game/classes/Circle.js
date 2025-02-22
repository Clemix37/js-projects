import { MAX_BOUNCES } from "../constants.js";
import { ctx } from "../utils.js";

export default class Circle {
	//#region Properties

	/**
	 * @type {number}
	 */
	_id;
	/**
	 * @type {HTMLImageElement}
	 */
	_img;
	/**
	 * @type {Vector2D}
	 */
	position;
	/**
	 * @type {Vector2D}
	 */
	velocity;
	/**
	 * @type {number}
	 */
	rad;
	/**
	 * @type {number}
	 */
	_nbBounces;

	//#endregion

	//#region Constructor

	constructor(id, img, position, velocity, rad) {
		this._id = id;
		this._img = img;
		this.position = position;
		this.velocity = velocity;
		this.rad = rad;
		this._nbBounces = 0;
	}

	//#endregion

	draw() {
		ctx.drawImage(this._img, this.position.x - this.rad / 2, this.position.y - this.rad / 2, 50, 50);
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
	}
}
