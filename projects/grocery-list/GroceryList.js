export default class GroceryList {
	//#region Properties

	#items;
	static BTN_CLASS_EDIT = "btn-edit-";
	static BTN_CLASS_DELETE = "btn-delete-";
	static BTN_CLASS_STATUS = "btn-status-";

	//#endregion

	//#region Constructor

	constructor() {
		this.#items = [];
	}

	//#endregion

	//#region Accessors

	get items() {
		return this.#items;
	}

	//#endregion

	//#region Public methods

	/**
	 * Gets the GroceryItem with the given id or null
	 * @param {number} id
	 * @returns {GroceryItem|null}
	 */
	getItem(id) {
		for (let i = 0; i < this.#items.length; i++) {
			const item = this.#items[i];
			if (item.id === id) return item;
		}
		return null;
	}
	/**
	 * Add the given GroceryItem in the GroceryList
	 * Returns the actual instance for chaining
	 * @param {GroceryItem} i
	 * @returns {GroceryList}
	 */
	addItem(i) {
		this.#items.push(i);
		return this;
	}
	/**
	 * Delete the GroceryItem with the given id
	 * Returns the actual instance for chaining
	 * @param {number} id
	 * @returns {GroceryList}
	 */
	deleteItem(id) {
		for (let i = 0; i < this.#items.length; i++) {
			const item = this.#items[i];
			if (item.id !== id) continue;
			this.#items.splice(i, 1);
			return this;
		}
		return this;
	}
	/**
	 * Sets the GroceryItem with the given id as the opposite of the actual status
	 * Returns the actual instance for chaining
	 * @param {number} id
	 * @returns {GroceryList}
	 */
	changeStatus(id) {
		const item = this.getItem(id);
		item.isDone = !item.isDone;
		return this;
	}
	/**
	 * Display every GroceryItem in the actual GroceryList in the given container
	 * @param {HTMLElement} container
	 */
	display(container) {
		let display = ``;
		for (let i = 0; i < this.#items.length; i++) {
			const item = this.#items[i];
			display += this.#getTemplate(item);
		}
		container.innerHTML = display;
	}
	/**
	 * Returns the next id to be given in the grocery list based on actual items
	 * @returns {number}
	 */
	getNextId() {
		return (this.#items[this.#items.length - 1]?.id ?? 0) + 1;
	}

	//#endregion

	//#region Private methods

	/**
	 * Gets the template as a string with given GroceryItem values in it
	 * @param {GroceryItem} i
	 * @returns {string}
	 */
	#getTemplate(i = null) {
		if (!i) return ``;
		const classStatus = i.isDone ? "fa-times" : "fa-check";
		const titleStatus = i.isDone ? "Undone" : "Done";
		const colorStatus = i.isDone ? "red" : "green";
		return `
            <div class="ligne box item">
                <div class="colonne" style="align-items: center;">
                    <h3 class="subtitle has-text-centered">${i.title}</h3>
                </div>
                <div class="colonne" style="align-items: center;">
                    <i data-id="${i.id}" class="btn-icon fas ${classStatus} ${GroceryList.BTN_CLASS_STATUS}" title="${titleStatus}" style="color:${colorStatus};"></i>
                </div>
                <div class="colonne" style="align-items: center;">
                    <i data-id="${i.id}" class="btn-icon fas fa-edit ${GroceryList.BTN_CLASS_EDIT}" style="color:blue;" title="Edit"></i>
                </div>
                <div class="colonne" style="align-items: center;">
                    <i data-id="${i.id}" class="btn-icon fas fa-trash ${GroceryList.BTN_CLASS_DELETE}" style="color:red;" title="Delete"></i>
                </div>
            </div>
        `;
	}

	//#endregion
}
