import store from "../../js/classes/SessionStore.js";
import Utils from "../../js/classes/Utils.js";
import Task from "./Task.js";

export default class TodoApp {
	//#region Properties

	/**
	 * @type {Task[]}
	 */
	#tasks;
	/**
	 * @type {string[]}
	 */
	#tags;
	/**
	 * @type {HTMLDivElement}
	 */
	#divInDom;
	/**
	 * @type {boolean}
	 */
	#isEditMode;
	/**
	 * @type {Task?}
	 */
	#taskInEdit;
	static SESSION_TODO_APP_KEY = "todo-list-cwd";
	static ID_WINDOW_TASK = "window-task";

	//#endregion

	//#region constructor

	/**
	 * Create an instance of a TodoApp
	 * @param {object} obj
	 * @param {Task[]} obj.tasks
	 * @param {string[]} obj.tags
	 * @param {HTMLDivElement} obj.divInDom
	 */
	constructor({ tasks = [], tags = [], divInDom }) {
		if (!divInDom) throw new Error("No div to display in DOM");
		this.#divInDom = divInDom;
		this.#tasks = tasks;
		this.#tags = tags;
		this.#isEditMode = false;
		this.#taskInEdit = null;
		this.#displayTags();
		this.displayTasks();
		this.#attachEvents();
	}

	//#endregion

	//#region Accessors

	get tasks() {
		return this.#tasks;
	}
	get tags() {
		return this.#tags;
	}

	//#endregion

	//#region Methods

	//#region Public methods

	/**
	 * Displays every tasks in the div of the id in the class
	 * Filters the display based on the filter content as second argument
	 * @param {string} filterContent
	 * @param {string} filterTag
	 */
	displayTasks(filterContent = "", filterTag = "") {
		if (!this.#divInDom) return;
		const display = this.#tasks
			.filter(
				(t) =>
					// Pas de filtre
					(!filterContent && !filterTag) ||
					// Contient le filtre dans le titre
					(filterContent &&
						(t.title.includes(filterContent) ||
							// Ou la description
							t.description.includes(filterContent))) ||
					// Ou le tag le contient
					(filterTag && t.tags.includes(filterTag)),
			)
			.reduce((prev, task) => prev + task.getTemplate(), "");
		this.#divInDom.innerHTML = display; // We erase the previous content by the new one
		this.#addEvents();
		this.#save();
	}

	//#region Modal

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

	//#endregion

	/**
	 * Sets value in the window, saves the task or cancel it
	 * @param {string?} id
	 */
	editTask(id = null) {
		const txtTitleTask = document.getElementById("txt-title-task");
		const txtDescTask = document.getElementById("txt-desc-task");
		const cbxDoneTask = document.getElementById("cbx-done-task");
		const txtTagsTask = document.getElementById("txt-tags-task");
		this.#isEditMode = !!id;
		const task = id ? this.getTaskById(id) : new Task({});
		this.#taskInEdit = task;
		// Sets value of inputs
		txtTitleTask.value = task.title;
		txtDescTask.value = task.description;
		cbxDoneTask.checked = task.done;
		txtTagsTask.value = task.tags.reduce((prev, tag) => `${prev}${tag} `, "");
		this.openModalTask();
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

	/**
	 * Returns an object of the instance
	 * @returns {{ tasks: Task[], tags: string[], }}
	 */
	toJSON() {
		return {
			tasks: this.#tasks.map((t) => t.toJSON()),
			tags: this.#tags,
		};
	}

	//#endregion

	//#region Private methods

	/**
	 * Attach global events on the page
	 */
	#attachEvents() {
		const btnCancelTask = document.getElementById("btn-cancel-task");
		btnCancelTask.addEventListener("click", () => this.#cancelEdit());
		const btnSaveTask = document.getElementById("btn-save-task");
		btnSaveTask.addEventListener("click", () => this.#saveTask());
	}

	/**
	 * Adds the events for the tasks on the DOM
	 */
	#addEvents() {
		this.#addEventsOnTasks();
	}

	/**
	 * Adds events on tasks displayed
	 */
	#addEventsOnTasks() {
		// DELETE TASK
		const btnsDelTasks = document.querySelectorAll(`.${Task.CLASS_DELETE_TASK}`);
		for (let i = 0; i < btnsDelTasks.length; i++) {
			const btnDelTask = btnsDelTasks[i];
			btnDelTask.removeEventListener("click", (e) => this.#deleteTaskFromElement(e));
			btnDelTask.addEventListener("click", (e) => this.#deleteTaskFromElement(e));
		}
		// EDIT TASK
		const btnsEditTasks = document.querySelectorAll(`.${Task.CLASS_EDIT_TASK}`);
		for (let i = 0; i < btnsEditTasks.length; i++) {
			const btnEditTask = btnsEditTasks[i];
			btnEditTask.removeEventListener("click", (e) => this.#editTaskFromElement(e));
			btnEditTask.addEventListener("click", (e) => this.#editTaskFromElement(e));
		}
		// CHANGE STATUS TASK
		const btnsChangeStatusTask = document.querySelectorAll(`.${Task.CLASS_CHANGE_STATUS_TASK}`);
		for (let i = 0; i < btnsChangeStatusTask.length; i++) {
			const btnChangeStatusTask = btnsChangeStatusTask[i];
			btnChangeStatusTask.removeEventListener("click", (e) => this.#changeStatusTaskFromElement(e));
			btnChangeStatusTask.addEventListener("click", (e) => this.#changeStatusTaskFromElement(e));
		}
	}

	/**
	 * Map every list and filter the task from the tasks property
	 * @param {EventObject} e
	 */
	#deleteTaskFromElement(e) {
		const { id } = e.currentTarget.dataset;
		if (!id) return;
		// Delete the task from the tasks list
		this.#tasks = this.#tasks.filter((task) => task.id != id);
		// Removes the duplicate from all the tags used by tasks
		this.#tags = Utils.removeDuplicateFromArray(this.#tasks.flatMap((t) => t.tags));
		this.displayTasks();
		this.#displayTags();
	}

	/**
	 * Gets the id from element and edit the task by id
	 * @param {EventObject} e
	 * @returns {void}
	 */
	#editTaskFromElement(e) {
		const { id } = e.currentTarget.dataset;
		if (!id) return;
		this.editTask(id);
	}

	/**
	 * Change the status of the task by its id and display again
	 * @param {EventObject} e
	 * @returns {void}
	 */
	#changeStatusTaskFromElement(e) {
		const { id } = e.currentTarget.dataset;
		if (!id) return;
		this.#tasks = this.#tasks.map((t) => {
			if (t.id != id) return t;
			// Change the status of the task and returns it
			t.done = e.currentTarget.checked;
			return t;
		});
		this.displayTasks();
	}

	/**
	 * Removes the instatiated properties
	 * Closes the modal
	 */
	#cancelEdit() {
		this.#taskInEdit = null;
		this.#isEditMode = false;
		this.closeModalTask();
	}

	/**
	 * Stores the content of the inputs inside the task in edit
	 * Saves the task by adding it or editing its values
	 * Removes duplicates from tags
	 * Closes the modal
	 * Displays again the content and the tags
	 */
	#saveTask() {
		if (!this.#taskInEdit) return;
		const txtTitleTask = document.getElementById("txt-title-task");
		const txtDescTask = document.getElementById("txt-desc-task");
		const cbxDoneTask = document.getElementById("cbx-done-task");
		const txtTagsTask = document.getElementById("txt-tags-task");
		// We change task's values
		this.#taskInEdit.done = cbxDoneTask.checked;
		this.#taskInEdit.title = txtTitleTask.value;
		this.#taskInEdit.description = txtDescTask.value;
		// Gets the tag separated by a space
		const tagsInField = txtTagsTask.value
			.trim()
			.split(" ")
			.filter((tag) => !!tag);
		// Saves them without duplicate
		this.#tags = Utils.removeDuplicateFromArray([...this.#tags, ...tagsInField]); // Removes the duplicate
		this.#taskInEdit.tags = tagsInField;
		// If new we add it to the rest
		if (!this.#isEditMode) this.addTasks(this.#taskInEdit);
		else this.#tasks = this.#tasks.map((t) => (t.id != this.#taskInEdit.id ? t : this.#taskInEdit));
		this.#cancelEdit(); // Closes modal and removes properties
		this.displayTasks(); // Display every tasks
		this.#displayTags(); // Display tags for filtering
	}

	/**
	 * Gets the tags and display them as option for the list of tags for filtering the content
	 */
	#displayTags() {
		const listTags = document.getElementById("list-tags-task");
		const display = this.#tags.reduce(
			(prev, tag) => `${prev}<option value="${tag}">${Utils.capitalize(tag)}</option>`,
			"",
		);
		// By default, one option is empty to see every tasks
		listTags.innerHTML = `<option value="" selected></option>${display}`;
	}

	/**
	 * Save the instance as object in the store
	 */
	#save() {
		store.set(TodoApp.SESSION_TODO_APP_KEY, this.toJSON());
	}

	//#endregion

	//#endregion
}
