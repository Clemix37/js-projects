import store from "../../js/SessionStore.js";
import Task from "./Task.js";

export default class TodoApp {
	//#region Properties

	/**
	 * @type {Task[]}
	 */
	#tasks;
	static SESSION_TODO_APP_KEY = "todo-list-cwd";
	static ID_WINDOW_TASK = "window-task";

	//#endregion

	//#region constructor

	/**
	 * Create an instance of a TodoApp
	 * @param {object} obj
	 * @param {Task[]} obj.tasks
	 */
	constructor({ tasks = [] }) {
		this.#tasks = tasks;
	}

	//#endregion

	//#region Accessors

	get tasks() {
		return this.#tasks;
	}

	//#endregion

	//#region Methods

	/**
	 * Displays every tasks in the div given as argument
	 * Filters the display based on the filter content as second argument
	 * @param {HTMLDivElement} divInDom
	 * @param {string} filterContent
	 */
	displayOnDiv(divInDom, filterContent = "") {
		if (!divInDom) return;
		const display = this.#tasks
			.filter((t) => !filterContent || t.title.includes(filterContent) || t.description.includes(filterContent))
			.reduce((prev, task) => prev + task.getTemplate(), "");
		divInDom.innerHTML = display;
		this.#addEvents(divInDom);
		this.save();
	}

	/**
	 * Opens the task modal
	 */
	openModalTask() {
		const windowTask = document.getElementById(TodoApp.ID_WINDOW_TASK);
		windowTask.showModal();
	}

	/**
	 * Closes the task modal
	 */
	closeModalTask() {
		const windowTask = document.getElementById(TodoApp.ID_WINDOW_TASK);
		windowTask.close();
	}

	/**
	 * Sets value in the window, saves the task or cancel it
	 * @param {HTMLDivElement} divInDom
	 * @param {string?} id
	 */
	editTask(divInDom, id = null) {
		const txtTitleTask = document.getElementById("txt-title-task");
		const txtDescTask = document.getElementById("txt-desc-task");
		const cbxDoneTask = document.getElementById("cbx-done-task");
		const btnSaveTask = document.getElementById("btn-save-task");
		const btnCancelTask = document.getElementById("btn-cancel-task");
		const task = id ? this.getTaskById(id) : new Task();
		// Sets value of inputs
		txtTitleTask.value = task.title;
		txtDescTask.value = task.description;
		cbxDoneTask.checked = task.done;
		this.openModalTask();
		// Cancel events
		btnCancelTask.removeEventListener("click", () => this.closeModalTask());
		btnCancelTask.addEventListener("click", () => this.closeModalTask());
		// Save events
		const saveTask = () => {
			// If new we add it to the rest
			if (!id) this.addTasks(task);
			else
				this.#tasks = this.#tasks.map((t) => {
					if (t.id != id) return t;
					t.done = cbxDoneTask.checked;
					t.title = txtTitleTask.value;
					t.description = txtDescTask.value;
					return t;
				});
			this.closeModalTask();
			this.displayOnDiv(divInDom);
		};
		btnSaveTask.removeEventListener("click", saveTask);
		btnSaveTask.addEventListener("click", saveTask);
	}

	/**
	 * Adds tasks given as arguments
	 * Returns the tasks property
	 * @param  {...Task[]} newTasks
	 * @returns {Task[]}
	 */
	addTasks(...newTasks) {
		this.#tasks.push(...newTasks);
		return this.#tasks;
	}

	/**
	 * Returns the task found by its id in arguments
	 * @param {string} id
	 * @returns {Task?}
	 */
	getTaskById(id) {
		return this.#tasks.find((t) => t.id == id);
	}

	save() {
		store.set(TodoApp.SESSION_TODO_APP_KEY, this.toJSON());
	}

	/**
	 * Adds the events for the tasks on the DOM
	 * @param {HTMLDivElement} divInDom
	 */
	#addEvents(divInDom) {
		this.#addEventsOnTasks(divInDom);
	}

	/**
	 * Adds events on tasks displayed
	 * @param {HTMLDivElement} divInDom
	 */
	#addEventsOnTasks(divInDom) {
		// DELETE TASK
		const btnsDelTasks = document.querySelectorAll(`.${Task.CLASS_DELETE_TASK}`);
		for (let i = 0; i < btnsDelTasks.length; i++) {
			const btnDelTask = btnsDelTasks[i];
			btnDelTask.removeEventListener("click", (e) => this.#deleteTaskFromElement(e, divInDom));
			btnDelTask.addEventListener("click", (e) => this.#deleteTaskFromElement(e, divInDom));
		}
		// EDIT TASK
		const btnsEditTasks = document.querySelectorAll(`.${Task.CLASS_EDIT_TASK}`);
		for (let i = 0; i < btnsEditTasks.length; i++) {
			const btnEditTask = btnsEditTasks[i];
			btnEditTask.removeEventListener("click", (e) => this.#editTaskFromElement(e, divInDom));
			btnEditTask.addEventListener("click", (e) => this.#editTaskFromElement(e, divInDom));
		}
		// TODO
	}

	/**
	 * Map every list and filter the task from the tasks property
	 * @param {EventObject} e
	 * @param {HTMLDivElement} divInDom
	 */
	#deleteTaskFromElement(e, divInDom) {
		const { id } = e.currentTarget.dataset;
		if (!id) return;
		this.#tasks = this.#tasks.filter((task) => task.id != id);
		this.displayOnDiv(divInDom);
	}

	/**
	 * Gets the id from element and edit the task by id
	 * @param {EventObject} e
	 * @param {HTMLDivElement} divInDom
	 * @returns {void}
	 */
	#editTaskFromElement(e, divInDom) {
		const { id } = e.currentTarget.dataset;
		if (!id) return;
		this.editTask(divInDom, id);
	}

	/**
	 * Returns an object of the instance
	 * @returns {{ tasks: Task[] }}
	 */
	toJSON() {
		return {
			tasks: this.#tasks.map((t) => t.toJSON()),
		};
	}

	//#endregion
}
