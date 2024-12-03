import Utils from "../../../../js/Utils.js";
import Tag from "./Tag.js";

export default class Task {
	//#region Properties

	static CLASS_TASK_EDIT = "btn-edit-tm-task";
	static CLASS_TASK_DELETE = "btn-delete-tm-task";

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
	 * @type {Tag[]}
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
	 * @param {Tag[]} obj.tags
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
	 * Gets the template of the task with the idList
	 * @param {string} idList
	 * @returns {string}
	 */
	getTemplate(idList) {
		return `
            <div class="flex tm-task">
                <div class="flex column">
                    <div class="flex tm-task-header">
                        <h3 class="subtitle">${this.#title}</h3>
                    </div>
                    <hr />
                    <div class="flex">
                        <p>${this.#description}</p>
                    </div>
                    <hr />
                    <div class="flex">
                        ${this.#tags.reduce((acc, t) => acc + t.getTemplate(), "")}
                    </div>
                    <hr />
                    <div class="flex" style="justify-content: center;">
                        <button class="button is-rounded is-danger ${Task.CLASS_TASK_DELETE}" 
                            data-id="${this.#id}" 
                            data-id-list="${idList}"
                            >
                            <i class="fas fa-trash" style="margin-right: 8px;"></i>
                            Delete
                        </button>
                        <button class="button is-rounded is-info ${Task.CLASS_TASK_EDIT}" 
                            data-id="${this.#id}" 
                            data-id-list="${idList}"
                            >
                            <i class="fas fa-edit" style="margin-right: 8px;"></i>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `;
	}

	/**
	 * Returns the instance as object for JSON
	 * @returns {{ id: string, title: string, description: string, done: boolean, tags: { title: string, color: string, }[] }}
	 */
	toJSON() {
		return {
			id: this.#id,
			title: this.#title,
			description: this.#description,
			done: this.#done,
			tags: this.#tags.map((t) => t.toJSON()),
		};
	}

	//#endregion
}
