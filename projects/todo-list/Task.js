import Utils from "../../js/Utils.js";

export default class Task {
	//#region Properties

	static CLASS_DELETE_TASK = "btn-delete-task";
	static CLASS_EDIT_TASK = "btn-edit-task";
	static CLASS_CHANGE_STATUS_TASK = "btn-change-status-task";
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
	/**
	 * @type {string[]}
	 */
	#tags;

	//#endregion

	//#region constructor

	/**
	 * Create an instance of a Task
	 * @param {object} obj
	 * @param {string?} obj.id
	 * @param {string} obj.title
	 * @param {string} obj.description
	 * @param {boolean} obj.done
	 * @param {string[]} obj.tags
	 */
	constructor({ id = null, title = "", description = "", done = false, tags = [] }) {
		this.#id = id ?? Utils.genUniqueId();
		this.#title = title;
		this.#description = description;
		this.#done = done;
		this.#tags = tags;
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
	get tags() {
		return this.#tags;
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
	set tags(value) {
		this.#tags = value;
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
                    <!-- DONE -->
					<label class="checkbox" style="display: flex; align-items: center; margin: 5px;">
						<input data-id="${this.id}" class="${Task.CLASS_CHANGE_STATUS_TASK}" type="checkbox" ${this.#done ? "checked" : ""}>
					</label>
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
				${
					this.#tags.length > 0
						? `
							<div class="card-footer">
								<em>Tags</em>: ${this.#tags.reduce((prev, tag, index) => `${prev}${tag}${!!this.#tags[index + 1] ? " / " : ""}`, "")}
							</div>
						`
						: ""
				}
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
			tags: this.#tags,
		};
	}

	//#endregion
}
