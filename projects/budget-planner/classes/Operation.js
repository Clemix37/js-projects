import Utils from "../../../js/classes/Utils.js";

export default class Operation {
	//#region Properties

	/**
	 * @type {string}
	 */
	#id;
	/**
	 * @type {string}
	 */
	#name;
	/**
	 * @type {Date}
	 */
	#date;
	/**
	 * @type {number}
	 */
	#amount;
	/**
	 * @type {string}
	 */
	static CLASS_BTN_EDIT = "btn-edit-operation";
	/**
	 * @type {string}
	 */
	static CLASS_BTN_DELETE = "btn-delete-operation";

	//#endregion

	//#region Constructor

	/**
	 * Create a new operation with given configuration
	 * @param {object} obj
	 * @param {string} obj.id
	 * @param {string} obj.name
	 * @param {Date} obj.date
	 * @param {number} obj.amount
	 */
	constructor(obj = {}) {
		this.#id = obj.id ?? Utils.genUniqueId();
		this.#name = obj.name;
		this.#date = typeof obj.date === "string" ? new Date(obj.date) : obj.date;
		this.#amount = obj.amount;
	}

	//#endregion

	//#region Accessors

	/**
	 * @returns {string}
	 */
	get id() {
		return this.#id;
	}
	/**
	 * @returns {string}
	 */
	get name() {
		return this.#name;
	}
	/**
	 * @returns {Date}
	 */
	get date() {
		return this.#date;
	}
	/**
	 * @returns {number}
	 */
	get amount() {
		return this.#amount;
	}
	set name(value) {
		this.#name = value;
	}
	set date(value) {
		this.#date = value;
	}
	set amount(value) {
		this.#amount = value;
	}

	//#endregion

	//#region Public methods

	/**
	 * Used to store in localStorage
	 * @returns {{id: string, name: string, date: Date, amount: number}}
	 */
	toJSON() {
		return {
			id: this.#id,
			name: this.#name,
			date: this.#date,
			amount: this.#amount,
		};
	}

	/**
	 * Get the template of the operation
	 * @returns {string}
	 */
	getTemplate() {
		return `
            <div class="ligne" id="operation-${this.#id}">
                <h3 class="subtitle has-text-centered">${this.#name} (${this.#amount})</h3>
            </div>
            <div class="ligne">
                <button data-id="${this.#id}" class="button is-rounded is-info ${
			Operation.CLASS_BTN_EDIT
		}" title="Edit"><i class="fas fa-edit"></i></button>
                <button data-id="${this.#id}" class="button is-rounded is-danger ${
			Operation.CLASS_BTN_DELETE
		}" title="Delete"><i class="fas fa-trash"></i></button>
            </div>
        `;
	}

	//#endregion

	//#region Private methods

	//#endregion
}
