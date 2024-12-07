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
	 * @type {string[]}
	 */
	#idsTags;
	/**
	 * @type {string?}
	 */
	#idStatus;

	//#endregion

	//#region constructor

	/**
	 * Create an instance of a Task
	 * @param {object} obj
	 * @param {string?} obj.id
	 * @param {string} obj.title
	 * @param {string} obj.description
	 * @param {boolean} obj.done
	 * @param {string[]} obj.idsTags
	 * @param {string} obj.idStatus
	 */
	constructor({ id = null, title = "", description = "", done = false, idsTags = [], idStatus = null }) {
		this.#id = id ?? Utils.genUniqueId();
		this.#title = title;
		this.#description = description;
		this.#done = done;
		this.#idsTags = idsTags;
		this.#idStatus = idStatus;
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
	get idsTags() {
		return this.#idsTags;
	}
	get idStatus() {
		return this.#idStatus;
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
	set idsTags(value) {
		this.#idsTags = value;
	}
	set idStatus(value) {
		this.#idStatus = value;
	}

	//#endregion

	//#region Methods

	/**
	 * Gets the template of the task with the idList
	 * @param {string} idList
	 * @param {Tag[]} listTags
	 * @returns {string}
	 */
	getTemplate(idList, listTags) {
		return `
            <div id="${this.#id}" data-id="${this.#id}" data-id-list="${idList}" class="flex tm-task" draggable="true">
                <div class="flex column">
                    <div class="flex tm-task-header">
                        <h3 class="subtitle">${this.#title}</h3>
                    </div>
                    <hr />
                    <div class="flex">
                        ${listTags
							.filter((tag) => this.#idsTags.includes(tag.id))
							.reduce((acc, t) => acc + t.getTemplate(), "")}
                    </div>
                    <hr />
                    <div class="flex" style="justify-content: center;">
                        <button class="button is-rounded is-danger ${Task.CLASS_TASK_DELETE}" 
                            data-id="${this.#id}" 
                            data-id-list="${idList}"
                            title="Delete"
                            >
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
	}

	/**
	 * Returns the instance as object for JSON
	 * @returns {{ id: string, title: string, description: string, done: boolean, idsTags: string[] }}
	 */
	toJSON() {
		return {
			id: this.#id,
			title: this.#title,
			description: this.#description,
			done: this.#done,
			idsTags: this.#idsTags,
			idStatus: this.#idStatus,
		};
	}

	//#endregion
}
