import Utils from "../../js/classes/Utils.js";

export default class Contact {
	//#region Properties

	#id;
	#name;
	#tel;
	static CLASS_BTN_EDIT = "btn-edit-contact";
	static CLASS_BTN_DELETE = "btn-delete-contact";

	//#endregion

	//#region Constructor

	constructor({ id = null, name, tel }) {
		this.#id = id ?? Utils.genUniqueId();
		this.#name = name;
		this.#tel = tel;
	}

	//#endregion

	//#region Accessors

	get id() {
		return this.#id;
	}
	get name() {
		return this.#name;
	}
	get tel() {
		return this.#tel;
	}
	set name(value) {
		this.#name = value;
	}
	set tel(value) {
		this.#tel = value;
	}

	//#endregion

	//#region Public methods

	/**
	 * Returns the template of the instance
	 * @returns {string}
	 */
	getTemplate() {
		return `
            <div class="ligne" id="contact-${this.#id}">
                <p>${this.#name} - ${this.#tel}</p>
                <button 
                    class="${Contact.CLASS_BTN_EDIT} button is-medium" 
                    data-id="${this.#id}" 
                    title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button 
                    class="${Contact.CLASS_BTN_DELETE} button is-danger is-medium" 
                    data-id="${this.#id}" 
                    title="Delete">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
	}

	/**
	 * Returns as object the instance
	 * @returns {{ id: string, name: string, tel: string, }}
	 */
	toJSON() {
		return {
			id: this.#id,
			name: this.#name,
			tel: this.#tel,
		};
	}

	//#endregion
}
