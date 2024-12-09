import store from "../../../js/classes/SessionStore.js";
import WorkoutExercise from "./WorkoutExercise.js";

export default class Workout {
	//#region Properties

	#id;
	#title;
	#date;
	#exercices;
	static CLASS_BTN_EDIT_WORKOUT = "btn-edit-workout";
	static CLASS_BTN_DELETE_WORKOUT = "btn-delete-workout";

	//#endregion

	//#region Constructor

	/**
	 * Create a new workout
	 * @param {object} obj
	 * @param {number} obj.id
	 * @param {string} obj.title
	 * @param {Date} obj.date
	 */
	constructor(obj = {}) {
		if (!obj.id) throw new Error("No id given when creating a workout");
		if (!obj.title) throw new Error("No title given when creating a workout");
		if (!obj.date) throw new Error("No date given when creating the workout");
		this.#id = obj.id;
		this.#title = obj.title;
		this.#date = typeof obj.date === "string" ? new Date(obj.date) : obj.date;
		this.#exercices = store.get("workout-exercises", []).map((ex) => new WorkoutExercise(ex));
	}

	//#endregion

	//#region Accessors

	get id() {
		return this.#id;
	}
	get title() {
		return this.#title;
	}
	set title(value) {
		this.#title = value;
	}
	get date() {
		return this.#date;
	}
	set date(value) {
		this.#date = value;
	}

	//#endregion

	//#region Public methods

	/**
	 * Helps us parsing as JSON when saving in localStorage
	 * @returns {object}
	 */
	toJSON() {
		return {
			id: this.#id,
			title: this.#title,
			date: this.#date,
			// @todo: add exercises when creation is done
		};
	}

	/**
	 * Return the template of the actual instanc as string
	 * @returns {string}
	 */
	getTemplate() {
		return `
            <div class="ligne" style="padding: 5px;">
                <h3 class="subtitle"><i class="fas fa-dumbbell" style="margin-right: 8px; color: yellow;"></i>${
					this.#title
				}</h3>
            </div>
            <div class="ligne">
                <button data-id="${this.#id}" class="button is-info is-rounded ${
			Workout.CLASS_BTN_EDIT_WORKOUT
		}"><i class="fas fa-edit"></i></button>
                <button data-id="${this.#id}" class="button is-danger is-rounded ${
			Workout.CLASS_BTN_DELETE_WORKOUT
		}"><i class="fas fa-trash"></i></button>
            </div>
        `;
	}

	//#endregion

	//#region Private methods

	//#endregion
}
