import Utils from "../../../../js/Utils.js";

export default class Status {
	//#region Properties

	static ID_STORE = "tm-statuses";

	/**
	 * @type {string}
	 */
	#id;
	/**
	 * @type {string}
	 */
	#name;
	/**
	 * @type {string}
	 */
	#color;

	//#endregion

	//#region Constructor

	constructor({ id = null, name, color }) {
		if (!name) throw new Error("A status must have a name property");
		this.#id = id ?? Utils.genUniqueId();
		this.#name = name;
		this.#color = color;
	}

	//#endregion

	//#region Accessors

	get id() {
		return this.#id;
	}
	get color() {
		return this.#color;
	}
	get name() {
		return this.#name;
	}
	set color(value) {
		this.#color = value;
	}
	set name(value) {
		this.#name = value;
	}

	//#endregion

	//#region Methods

	//#region Public Methods

	/**
	 * Returns the template of the instance
	 * @param {boolean} forFilter
	 * @param {boolean} isFiltering
	 * @returns {string}
	 */
	getTemplate(forFilter = false, isFiltering = false) {
		const rgbColor = Utils.hexToRgb(this.#color.split("#").join(""));
		return `
            <div 
                data-id-status="${this.#id}"
                class="flex tm-status ${forFilter ? "tm-status-filter" : ""}" 
                style="align-items: center; background-color: rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.1); 
                    border: 1px solid ${this.#color};"
                >
                ${this.#name}
                ${isFiltering ? "<i class='fas fa-times' style='margin-left: 8px;'></i>" : ""}
            </div>
        `;
	}

	/**
	 * Returns an object to store in localStorage
	 * @returns {{ id: string, color: string, name: string }}
	 */
	toJSON() {
		return {
			id: this.#id,
			color: this.#color,
			name: this.#name,
		};
	}

	//#endregion

	//#region Private Methods

	//#endregion

	//#endregion
}
