import Utils from "../../../../js/Utils.js";

export default class Tag {
	//#region Properties

	static ID_STORE = "tm-tags";
	/**
	 * @type {string}
	 */
	#title;

	/**
	 * @type {string}
	 */
	#color;

	//#endregion

	//#region Constructor

	/**
	 * Create the instance of the Tag
	 * @constructor
	 * @param {{ title: string, color: string, }}
	 */
	constructor({ title, color = "#000000" }) {
		this.#title = title;
		this.#color = color;
	}

	//#endregion

	//#region Accessors

	get title() {
		return this.#title;
	}
	get color() {
		return this.#color;
	}
	set title(value) {
		this.#title = value;
	}
	set color(value) {
		this.#color = value;
	}

	//#endregion

	//#region Methods

	//#region Public methods

	getTemplate() {
		const rgbColor = Utils.hexToRgb(this.#color.split("#").join(""));
		return `
            <div class="flex tm-tag" 
                style="background-color: rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.1); 
                    border: 1px solid ${this.#color};"
                >
                ${this.#title}
            </div>
        `;
	}

	toJSON() {
		return {
			title: this.#title,
			color: this.#color,
		};
	}

	//#endregion

	//#region Private methods

	//#endregion

	//#endregion
}
