import Utils from "../../../../js/Utils.js";
import Task from "./Task.js";

export default class List {
	//#region Properties

	static ID_STORE = "tm-lists";
	static CLASS_BTN_DELETE_LIST = "btn-delete-list";
	static CLASS_BTN_ADD_TASK = "btn-add-task-list";

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

	/**
	 * @type {Task[]}
	 */
	#tasks;

	//#endregion

	//#region Constructor

	/**
	 * Create the instance of the List
	 * @constructor
	 * @param {{ id: string?, title: string, color: string, tasks: Task[], }}
	 */
	constructor({ id = null, title, color, tasks = [] }) {
		this.#id = id ?? Utils.genUniqueId();
		this.#title = title;
		this.#color = color;
		this.#tasks = tasks;
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
	get tasks() {
		return this.#tasks;
	}
	set title(value) {
		this.#title = value;
	}
	set color(value) {
		this.#color = value;
	}
	set tasks(value) {
		this.#tasks = value;
	}

	//#endregion

	//#region Methods

	//#region Public methods

	/**
	 * Delete the task from the list by its id
	 * @param {string} idTask
	 */
	deleteTask(idTask) {
		this.#tasks = this.#tasks.filter((t) => t.id !== idTask);
		return this;
	}

	/**
	 * Check if actual instane of list contains tasks with tags filtered in arguments
	 * @param {Tag[]} tagsFiltered
	 */
	containTaskWithTags(tagsFiltered = []) {
		if (tagsFiltered.length === 0) return true;
		const titleTags = tagsFiltered.map((tag) => tag.title);
		return this.#tasks.some((task) => task.tags.some((tag) => titleTags.includes(tag.title)));
	}

	/**
	 * Gets the template of the list
	 * @param {Tag[]} listTags
	 * @returns {string}
	 */
	getTemplate(listTags) {
		return `
            <div class="flex column tm-list-container">
                <div class="flex tm-list-header" data-id="${this.#id}" style="background-color: ${this.#color}">
                    <div class="flex column">
                        <div class="flex">
                            <h1 class="title">${this.#title}</h1>
                        </div>
                    </div>
                    <div class="flex column" style="justify-content: center;">
                        <div class="flex" style="justify-content: flex-end;">
                            <button class="button is-rounded is-danger ${List.CLASS_BTN_DELETE_LIST}" 
                                data-id="${this.#id}"
                                title="Delete"
                                >
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div data-id-list="${this.#id}" class="flex column tm-list-content-container">
                        ${this.#tasks.reduce((acc, t) => acc + t.getTemplate(this.#id, listTags), "")}
                        <div class="flex" style="justify-content: center;">
                            <button 
                                class="button is-rounded ${List.CLASS_BTN_ADD_TASK}" 
                                data-id-list="${this.#id}" 
                                title="Add task on this list"
                                >
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
	}

	toJSON() {
		return {
			id: this.#id,
			title: this.#title,
			color: this.#color,
			tasks: this.#tasks.map((t) => t.toJSON()),
		};
	}

	//#endregion

	//#region Private methods

	//#endregion

	//#endregion
}
