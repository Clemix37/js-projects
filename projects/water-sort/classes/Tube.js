import Utils from "../../../js/classes/Utils.js";

export default class Tube {
	//#region Properties

	/**
	 * @type {string}
	 */
	#id;
	/**
	 * @type {number}
	 */
	#height;
	/**
	 * @type {string[]}
	 */
	#slots;
	/**
	 * @type {boolean}
	 */
	#completed;

	//#endregion

	//#region Constructor

	/**
	 * Constructor of the Tube class
	 * @param {object} obj
	 * @param {string?} obj.id
	 * @param {number} obj.height
	 * @param {string[]} obj.slots
	 * @param {string[]} obj.completed
	 */
	constructor({ id = null, height, slots = [], completed = false }) {
		this.#id = id ?? Utils.genUniqueId();
		this.#height = height;
		this.#slots = slots;
		this.#completed = completed;
	}

	//#endregion

	//#region Accessors

	get id() {
		return this.#id;
	}
	get height() {
		return this.#height;
	}
	get slots() {
		return this.#slots;
	}
	get completed() {
		return this.#completed;
	}

	//#endregion

	//#region Methods

	/**
	 * Gets every property of the instance as a JSON object
	 * @returns {object}
	 */
	toJSON() {
		return {
			id: this.#id,
			height: this.#height,
			slots: [...this.#slots],
			completed: this.#completed,
		};
	}

	/**
	 * Get the template of the actual tube
	 * @returns {string}
	 */
	getTemplate() {
		return `
            <div id="tube-${this.#id}" class="tube" data-id="${this.#id}">
                ${this.#slots.reduce((prev, slotColor) => `${prev}${this.#getSlotTemplate(slotColor)}`, "")}
            </div>
        `;
	}

	/**
	 * Adds the given slots in the empty spaces that exists in the tube
	 * Doesn't add slots that exceed the height of the tube
	 * @param  {string[]} slots
	 * @returns {string[]} topSlotsToDelete
	 */
	addSlots(slots = []) {
		// We can only add up to the max height
		const nbEmptySlots = this.#height - this.#slots.length;
		const nbToAdd = nbEmptySlots > 0 && slots.length < nbEmptySlots ? slots.length : nbEmptySlots;
		const topSlotsToDelete = [];
		for (let i = 0; i < nbToAdd; i++) {
			topSlotsToDelete.push(slots[i]);
		}
		this.#slots = [...topSlotsToDelete, ...this.#slots];
		this.#checkTubeCompleted();
		return topSlotsToDelete;
	}

	/**
	 * Gets every colors that are the same from the top of the tube and returns them
	 * @returns {string[]}
	 */
	getTopColors() {
		const topSlots = [];
		if (this.#slots.length === 0) return topSlots;
		let topColor = this.#slots[0];
		let i = 0;
		while (this.#slots[i] === topColor) {
			topSlots.push(this.#slots[i]);
			i++;
		}
		return topSlots;
	}

	/**
	 * Delete from the slots property the topSlots given as argument
	 * @param {string[]} topSlots
	 */
	removeTopColors(topSlots = []) {
		this.#slots.splice(0, topSlots.length);
		this.#checkTubeCompleted();
	}

	/**
	 * Get the template of a slot color
	 * @param {string} color
	 * @returns {string}
	 */
	#getSlotTemplate(color) {
		return color
			? `
            <div class="tube-color" style="background-color: ${color};">

            </div>
        `
			: "";
	}

	/**
	 * Check if the current tube is completed and stores it
	 */
	#checkTubeCompleted() {
		if (this.#slots.length === 0) this.#completed = true;
		else if (this.#slots.length !== this.#height) this.#completed = false;
		else {
			const firstColor = this.#slots[0];
			this.#completed = this.#slots.every((slot) => slot === firstColor);
		}
	}

	//#endregion
}
