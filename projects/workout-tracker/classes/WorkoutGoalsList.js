import store from "../../../js/classes/SessionStore.js";
import WorkoutGoal from "./WorkoutGoal.js";

export default class WorkoutGoalsList {
	//#region Properties

	/**
	 * @type {HTMLElement}
	 */
	#container;
	/**
	 * @type {WorkoutGoal[]}
	 */
	#goals = [];
	static goalsSessionKey = "workout-goals";
	static CLASS_BTN_DELETE_GOAL = "btn-delete-goal";
	static CLASS_BTN_CHECK_GOAL = "btn-check-goal";

	//#endregion

	//#region Constructor

	/**
	 * Create the list of the goals
	 * @param {object} obj
	 * @param {string} obj.idContainer
	 */
	constructor(obj = {}) {
		if (!obj.idContainer) throw new Error("No container id given when creating list of goals");
		this.#container = document.getElementById(obj.idContainer);
		this.#goals = store.get(WorkoutGoalsList.goalsSessionKey, []).map((goal) => new WorkoutGoal(goal));
	}

	//#endregion

	//#region Accessors

	get goals() {
		return this.#goals;
	}

	//#endregion

	//#region Public methods

	displayGoals() {
		let goalsDisplay = "";
		for (let i = 0; i < this.#goals.length; i++) {
			const goal = this.#goals[i];
			goalsDisplay += `<div class="ligne">🔥 - ${goal.title} <i data-id="${goal.id}" class="fas fa-trash ${WorkoutGoalsList.CLASS_BTN_DELETE_GOAL}" style="cursor: pointer; margin-left: 8px; color: red;" title="Delete"></i></div>`;
		}
		if (this.#goals.length === 0) goalsDisplay = `No goals created yet.. Don't be shy,`;
		this.#container.innerHTML = goalsDisplay;
	}

	/**
	 * Add the goal in the array of WorkoutGoal
	 * Save every goal in localStorage
	 * We display every goal after we added it
	 * @param {WorkoutGoal} newGoal
	 */
	addGoal(newGoal) {
		if (!newGoal instanceof WorkoutGoal) throw new Error("Goal is not of type WorkoutGoal");
		this.#goals.push(newGoal);
		this.#saveGoals();
		this.displayGoals();
	}

	/**
	 * Gets the max id already given, return this maximum plus one
	 * So that goals can't have a given id
	 * @returns {number}
	 */
	getNextGoalId() {
		const ids = this.#goals.map((goal) => goal.id);
		const maxId = ids.length > 0 ? Math.max(...ids) : 0;
		return maxId + 1;
	}

	/**
	 * Filter the goals without the one beoing deleted
	 * We save them, and display them
	 * @param {number} id
	 */
	deleteGoal(id) {
		this.#goals = this.#goals.filter((g) => g.id !== id);
		this.#saveGoals();
		this.displayGoals();
	}

	/**
	 * Change the state of the goal with the given id on the given date
	 * Based on the isChecked flag given
	 * @param {number} id
	 * @param {Date} date
	 * @param {boolean} isChecked
	 */
	changeStateGoal(id, date, isChecked = true) {
		this.#goals = this.#goals.map((g) => {
			if (g.id !== id) return g;
			if (isChecked) g.addDateDone(date);
			else g.removeDateDone(date);
			return g;
		});
		this.#saveGoals();
		this.displayGoals();
	}

	//#endregion

	//#region Private methods

	/* Save goals of the instance in the localStorage */
	#saveGoals() {
		store.set(WorkoutGoalsList.goalsSessionKey, this.#goals);
	}

	//#endregion
}
