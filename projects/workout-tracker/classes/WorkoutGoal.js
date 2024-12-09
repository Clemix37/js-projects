import Utils from "../../../js/classes/Utils.js";
import WorkoutGoalsList from "./WorkoutGoalsList.js";

export default class WorkoutGoal {
	//#region Properties

	/**
	 * @type {number}
	 */
	#id;
	/**
	 * @type {string}
	 */
	#title;
	/**
	 * @type {Date[]}
	 */
	#datesDone;

	//#endregion

	//#region Constructor

	/**
	 * Create a new workout goal
	 * @param {object} obj
	 * @param {number} obj.id
	 * @param {string} obj.title
	 */
	constructor(obj = {}) {
		if (!obj.id) throw new Error("No id given when creating a workout goal");
		if (!obj.title) throw new Error("No title given when creating a workout goal");
		this.#id = obj.id;
		this.#title = obj.title;
		this.#datesDone = obj.datesDone?.map((dateString) => new Date(dateString)) || [];
	}

	//#endregion

	//#region Accessors

	get id() {
		return this.#id;
	}
	get title() {
		return this.#title;
	}
	get datesDone() {
		return this.#datesDone;
	}

	//#endregion

	//#region Public methods

	/**
	 * Add the date as done
	 * @param {Date} newDate
	 */
	addDateDone(newDate) {
		if (this.isDone(newDate)) return;
		this.#datesDone.push(newDate);
	}

	/**
	 * Remove the old date from the dates done
	 * @param {Date} oldDate
	 */
	removeDateDone(oldDate) {
		if (!this.isDone(oldDate)) return;
		this.#datesDone = this.#datesDone.filter((d) => d.toString() !== oldDate.toString());
	}

	/**
	 * Check if the date is done
	 * @param {Date} dateToCheck
	 * @returns {boolean}
	 */
	isDone(dateToCheck) {
		if (!dateToCheck || !dateToCheck instanceof Date) return false;
		return !!this.#datesDone.find((d) => {
			const dAsDate = new Date(d);
			return (
				Utils.getDateAsString(dAsDate, Utils.dateFormats.DayMonthYearHyphens) ===
				Utils.getDateAsString(dateToCheck, Utils.dateFormats.DayMonthYearHyphens)
			);
		});
	}

	/**
	 * Gets the actual instance as JSON
	 * @returns {object}
	 */
	toJSON() {
		const obj = {
			id: this.#id,
			title: this.#title,
			datesDone: this.#datesDone,
		};
		return obj;
	}

	getTemplate(theDate = null, dateDisplayed = "") {
		if (!theDate instanceof Date) throw new Error("theDate is not instance of Date when getting template for goal");
		const isChecked = this.isDone(theDate);
		return `
            <div class="ligne">
                <label class="checkbox" style="padding: 5px;">
                    <input 
                        data-id="${this.#id}" 
                        data-date="${dateDisplayed}"
                        class="checkbox ${WorkoutGoalsList.CLASS_BTN_CHECK_GOAL}" 
                        type="checkbox" 
                        ${isChecked ? "checked" : ""} 
                    />
                    ${this.#title}
                </label>
            </div>    
        `;
	}

	//#endregion

	//#region Private methods

	//#endregion
}
