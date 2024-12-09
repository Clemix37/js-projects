import Utils from "../../../../js/classes/Utils.js";

export default class Tag {
	//#region Properties

	static ID_STORE = "tm-tags";
	/**
	 * @type {string}
	 */
	#id;
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
	 * @param {{ id: string?, title: string, color: string, }}
	 */
	constructor({ id = null, title, color = "#000000" }) {
		this.#id = id ?? Utils.genUniqueId();
		this.#title = title;
		this.#color = color;
	}

	//#endregion

	//#region Accessors

	get id() {
		return this.#id;
	}
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

	getTemplate(forFilter = false, isFiltering = false) {
		const rgbColor = Utils.hexToRgb(this.#color.split("#").join(""));
		return `
            <div 
                data-id-tag="${this.#id}" 
                data-title-tag="${this.#title}" 
                class="flex tm-tag ${forFilter ? "tm-tag-filter" : ""}" 
                style="align-items: center; background-color: rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.1); 
                    border: 1px solid ${this.#color};"
                >
                ${this.#title}
                ${isFiltering ? "<i class='fas fa-times' style='margin-left: 8px;'></i>" : ""}
            </div>
        `;
	}

	toJSON() {
		return {
			id: this.#id,
			title: this.#title,
			color: this.#color,
		};
	}

	//#endregion

	//#region Private methods

	//#endregion

	//#endregion
}
