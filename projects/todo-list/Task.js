import Utils from "../../js/Utils.js";

export default class Task {
	//#region Properties

	static CLASS_DELETE_TASK = "btn-delete-task";
	static CLASS_EDIT_TASK = "btn-edit-task";
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
	#description;
	/**
	 * @type {boolean}
	 */
	#done;

	//#endregion

	//#region constructor

	/**
	 * Create an instance of a Task
	 * @param {object} obj
	 * @param {string?} obj.id
	 * @param {string} obj.title
	 * @param {string} obj.description
	 * @param {boolean} obj.done
	 */
	constructor({ id = null, title = "", description = "", done = false }) {
		this.#id = id ?? Utils.genUniqueId();
		this.#title = title;
		this.#description = description;
		this.#done = done;
	}

	//#endregion

	//#region Accessors

	get id() {
		return this.#id;
	}
	get title() {
		return this.#title;
	}
	get description() {
		return this.#description;
	}
	get done() {
		return this.#done;
	}
	set title(value) {
		this.#title = value;
	}
	set description(value) {
		this.#description = value;
	}
	set done(value) {
		this.#done = value;
	}

	//#endregion

	//#region Methods

	/**
	 * Get the display template of the current task
	 * @returns {string}
	 */
	getTemplate() {
		return `
            <div class="card" style="margin: 10px;">
                <header class="card-header">
                    <p class="card-header-title">${this.#title}</p>
                    ${
						this.#done
							? `
                        <!-- DONE -->
                        <button class="button is-rounded">
                            <span class="icon">
                                ${this.#done ? "✅" : ""}
                            </span>
                        </button>
                    `
							: ""
					}
                    <!-- EDIT -->
                    <button data-id="${this.#id}" class="button is-rounded is-info ${Task.CLASS_EDIT_TASK}">
                        <span class="icon">
                            <i class="fas fa-edit"></i>
                        </span>
                    </button>
                    <!-- DELETE -->
                    <button data-id="${this.#id}" class="button is-rounded is-danger ${Task.CLASS_DELETE_TASK}">
                        <span class="icon">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                </header>
                <div class="card-content">
                    <div class="content">
                        ${this.#description}
                    </div>
                </div>
            </div>
        `;
	}

	/**
	 * Returns the instance as object for JSON
	 * @returns {{ id: string, title: string, description: string, done: boolean, }}
	 */
	toJSON() {
		return {
			id: this.#id,
			title: this.#title,
			description: this.#description,
			done: this.#done,
		};
	}

	//#endregion
}
