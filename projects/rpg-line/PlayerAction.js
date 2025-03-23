export default class PlayerAction {
	//#region Properties

	/**
	 * @type {number}
	 */
	#id;
	/**
	 * @type {string}
	 */
	#msg;
	/**
	 * @type {string}
	 */
	#description;
	/**
	 * @type {string}
	 */
	#code;

	//#endregion

	//#region Constructor

	constructor({ id, msg, description, code }) {
		this.#id = id;
		this.#msg = msg;
		this.#description = description;
		this.#code = code;
	}

	//#endregion

	//#region Accessors

	get id() {
		return this.#id;
	}

	get msg() {
		return this.#msg;
	}
	set msg(value) {
		this.#msg = value;
	}

	get description() {
		return this.#description;
	}
	set description(value) {
		this.#description = value;
	}

	get code() {
		return this.#code;
	}

	//#endregion

	//#region Methods

	getTemplate() {
		return `
            <button id="btn-user-action-${this.#id}" class="btn-action button is-large" data-id="${this.#id}">
                ${this.#msg}
            </button>
        `;
	}

	toJSON() {
		return {
			id: this.#id,
			msg: this.#msg,
			description: this.#description,
			code: this.#code,
		};
	}

	//#endregion
}
