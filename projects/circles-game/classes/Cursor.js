import { ctx } from "../utils.js";

export default class Cursor {
	//#region Properties

	_img;

	//#endregion

	//#region Constructor

	constructor(img, x, y) {
		this._img = img;
		this.updatePos(x, y);
	}

	//#endregion

	updatePos(x, y) {
		this.x = x;
		this.y = y;
	}

	update() {
		// Draw image based on user cursor
		ctx.drawImage(
			this._img,
			this.x - this._img.width / 2,
			this.y - this._img.height / 2,
			this._img.width,
			this._img.height,
		);
	}
}
