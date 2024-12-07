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

	//#endregion

	//#region Constructor

	constructor({ id = null, name }) {
		if (!name) throw new Error("A status must have a name property");
		this.#id = id ?? Utils.genUniqueId();
		this.#name = name;
	}

	//#endregion

	//#region Accessors

	get id() {
		return this.#id;
	}
	get name() {
		return this.#name;
	}
	set name(value) {
		this.#name = value;
	}

	//#endregion

	//#region Methods

	//#region Public Methods

	/**
	 * Returns an object to store in localStorage
	 * @returns {{ id: string, name: string }}
	 */
	toJSON() {
		return {
			id: this.#id,
			name: this.#name,
		};
	}

	//#endregion

	//#region Private Methods

	//#endregion

	//#endregion
}
