import Calendar from "../../../js/Calendar.js";
import store from "../../../js/classes/SessionStore.js";
import Utils from "../../../js/classes/Utils.js";
import { addWorkout } from "../app.js";
import Workout from "./Workout.js";
import WorkoutGoalsList from "./WorkoutGoalsList.js";

export default class WorkoutCalendar extends Calendar {
	//#region Properties

	/**
	 * @type {Workout[]}
	 */
	#workouts;
	/**
	 * @type {WorkoutGoalsList}
	 */
	#listGoals;
	static workoutsSessionKey = "workouts";

	//#endregion

	//#region Constructor

	/**
	 * Create a workout calendar based on configuration
	 * @param {object} obj
	 * @param {WorkoutListGoals} obj.goalsList
	 */
	constructor(obj = {}) {
		super(obj);
		if (!obj.goalsList) throw new Error("No lits of goals given when creating the workout calendar");
		this.#workouts = store.get(WorkoutCalendar.workoutsSessionKey, []).map((w) => new Workout(w));
		this.#listGoals = obj.goalsList;
	}

	//#endregion

	//#region Accessors

	get listGoals() {
		return this.#listGoals;
	}

	//#endregion

	//#region Public methods

	display() {
		this.displayCurrentMonth();
		this.#displayWorkoutsAndGoalsOnCalendar();
		this.#listGoals.displayGoals();
		this.#attachEvents();
	}

	//#region Goals

	/**
	 * Add the goal in the list
	 * Display the calendar again
	 * @param {WorkoutGoal} newGoal
	 */
	addGoal(newGoal) {
		this.#listGoals.addGoal(newGoal);
		this.display();
	}

	//#endregion

	//#region Workout

	/**
	 * Add the workout in th list of workouts
	 * Save workouts in localStorage
	 * Display the calendar
	 * @param {Workout} newWorkout
	 */
	addWorkout(newWorkout) {
		if (!newWorkout instanceof Workout) throw new Error("Workout is not of type Workout");
		this.#workouts.push(newWorkout);
		this.#saveWorkouts();
		this.display();
	}

	/**
	 * Gets the max id already given, return this maximum plus one
	 * So that workouts can't have a given id
	 * @returns {number}
	 */
	getNextWorkoutId() {
		const ids = this.#workouts.map((w) => w.id);
		const maxId = ids.length > 0 ? Math.max(...ids) : 0;
		return maxId + 1;
	}

	/**
	 *
	 * @param {number} id
	 * @param {object} obj
	 * @param {string} obj.newTitle
	 * @param {Date} obj.newDate
	 */
	editWorkout(id, { newTitle, newDate }) {
		this.#workouts = this.#workouts.map((w) => {
			if (w.id !== id) return w;
			w.title = newTitle;
			w.date = newDate;
			return w;
		});
		this.#saveWorkouts();
		this.display();
	}

	//#endregion

	//#endregion

	//#region Private methods

	#displayWorkoutsAndGoalsOnCalendar() {
		const nbDays = this.nbDaysInMonth;
		const actualYear = this.currentDateCalendar.getFullYear();
		const actualMonth = this.currentDateCalendar.getMonth();
		for (let i = 1; i <= nbDays; i++) {
			const d = new Date(actualYear, actualMonth, i);
			const workoutsOfDays = this.#workouts.filter((w) => w.date.toString() === d.toString());
			const displayedDate = Utils.getDateAsString(d, Utils.dateFormats.DayMonthYearHyphens);
			const contentOfDate = document.getElementById(`content-${displayedDate}`);
			let displayContentOfDate = "";
			for (let j = 0; j < this.#listGoals.goals.length; j++) {
				const g = this.#listGoals.goals[j];
				displayContentOfDate += g.getTemplate(d, displayedDate);
			}
			for (let k = 0; k < workoutsOfDays.length; k++) {
				const w = workoutsOfDays[k];
				displayContentOfDate += w.getTemplate();
			}
			contentOfDate.innerHTML = displayContentOfDate;
		}
	}

	/**
	 * Save workouts of the calendar in the localStorage
	 */
	#saveWorkouts() {
		store.set(WorkoutCalendar.workoutsSessionKey, this.#workouts);
	}

	/**
	 * Attach every event of the UI
	 */
	#attachEvents() {
		this.#attachEventsOnGoals();
		this.#attachWorkoutEvents();
	}

	//#region Goals Events

	/**
	 * Attach events on goals
	 */
	#attachEventsOnGoals() {
		this.#attachDeleteGoalEvents();
		this.#attachCheckGoalEvent();
	}

	#attachCheckGoalEvent() {
		const btnsCheckGoals = document.getElementsByClassName(WorkoutGoalsList.CLASS_BTN_CHECK_GOAL);
		const that = this;
		for (let i = 0; i < btnsCheckGoals.length; i++) {
			const btn = btnsCheckGoals[i];
			// We remove to eliminate potential duplication of event attached
			btn.removeEventListener("change", this.#changeStateGoal);
			// We reset it
			btn.addEventListener("change", (e) => that.#changeStateGoal(e));
		}
	}

	/**
	 * Attach the delete event on delete buttons displayed
	 */
	#attachDeleteGoalEvents() {
		const btnsDeleteGoals = document.getElementsByClassName(WorkoutGoalsList.CLASS_BTN_DELETE_GOAL);
		const that = this;
		for (let i = 0; i < btnsDeleteGoals.length; i++) {
			const btn = btnsDeleteGoals[i];
			// We remove to eliminate potential duplication of event attached
			btn.removeEventListener("click", this.#deleteGoal);
			// We reset it
			btn.addEventListener("click", (e) => that.#deleteGoal(e));
		}
	}

	/**
	 * Filter the goals without the one being deleted
	 * We save them, and display them
	 * @param {HTMLElement} e
	 */
	#deleteGoal(e) {
		const id = +e.currentTarget.dataset.id;
		if (!id) return;
		this.#listGoals.deleteGoal(id);
		this.display();
	}

	/**
	 * Checks the goal
	 * Display the calendar
	 * @param {HTMLElement} e
	 */
	#changeStateGoal(e) {
		const id = +e.currentTarget.dataset.id;
		const dateString = e.currentTarget.dataset.date;
		if (!id || !dateString) return;
		// We create the object as Date
		const day = dateString.substring(0, 2);
		const month = +dateString.substring(3, 5);
		const year = dateString.substring(6);
		const d = new Date(year, month - 1, day);
		// Change the state
		this.#listGoals.changeStateGoal(id, d, e.currentTarget.checked);
		// Display everything
		this.display();
	}

	//#endregion

	//#region Workout events

	/**
	 * Attach workout events
	 */
	#attachWorkoutEvents() {
		this.#attachDeleteWorkoutEvent();
		this.#attachEditWorkoutEvent();
	}

	/**
	 * Attach the delete buttons of workouts with the function that deletes them
	 */
	#attachDeleteWorkoutEvent() {
		const btnsDelete = document.getElementsByClassName(Workout.CLASS_BTN_DELETE_WORKOUT);
		const that = this;
		for (let i = 0; i < btnsDelete.length; i++) {
			const btn = btnsDelete[i];
			// We remove to eliminate potential duplication of event attached
			btn.removeEventListener("click", this.#deleteWorkout);
			// We reset it
			btn.addEventListener("click", (e) => that.#deleteWorkout(e));
		}
	}

	/**
	 * Attach the edit buttons of workout with the function that edits them
	 */
	#attachEditWorkoutEvent() {
		const btnsEdit = document.getElementsByClassName(Workout.CLASS_BTN_EDIT_WORKOUT);
		const that = this;
		for (let i = 0; i < btnsEdit.length; i++) {
			const btn = btnsEdit[i];
			// We remove to eliminate potential duplication of event attached
			btn.removeEventListener("click", this.#editWorkout);
			// We reset it
			btn.addEventListener("click", (e) => that.#editWorkout(e));
		}
	}

	/**
	 * Filter actual workouts with the one of the id
	 * We save them, and display them
	 * @param {HTMLElement} e
	 */
	#deleteWorkout(e) {
		const id = +e.currentTarget.dataset.id;
		if (!id) return;
		this.#workouts = this.#workouts.filter((w) => w.id !== id);
		this.#saveWorkouts();
		this.display();
	}

	/**
	 * Gets the workout to edit
	 * Open the window with the workout to edit data
	 * @param {HTMLElement} e
	 */
	#editWorkout(e) {
		const id = +e.currentTarget.dataset.id;
		if (!id) return;
		const theWorkout = this.#workouts.find((w) => w.id === id);
		if (!theWorkout) return;
		addWorkout(theWorkout);
	}

	//#endregion

	//#endregion
}
