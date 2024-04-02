import WorkoutGoal from "./WorkoutGoal.js";
import WorkoutGoalsList from "./WorkoutGoalsList.js";

export default class WorkoutCalendarDay {
    
    //#region Properties

    /**
     * @type {Date}
     */
    #date;
    /**
     * @type {string}
     */
    #day;
    /**
     * @type {boolean}
     */
    #isActual;
    /**
     * @type {WorkoutGoal[]}
     */
    #goals;
    /**
     * @type {Workout[]}
     */
    #workoutsOfDate;

    //#endregion

    //#region Constructor

    /**
     * Create a new workout
     * @param {object} obj
     * @param {Date} obj.newDate
     * @param {string} obj.actualDay
     * @param {boolean} obj.isActual
     * @param {WorkoutGoal[]} obj.goals
     * @param {Workout} obj.workouts
     */
    constructor(obj){
        if(!obj.newDate) throw new Error("No date given when creating the workout calendar day");
        if(!obj.actualDay) throw new Error("No day given when creating the workout calendar day");
        this.#date = obj.newDate;
        this.#day = obj.actualDay;
        this.#isActual = obj.isActual;
        this.#goals = obj.goals;
        this.#workoutsOfDate = obj.workouts;
    }

    //#endregion

    //#region Accessors

    //#endregion

    //#region Public methods

    /**
     * Gets the template of the day in calendar
     * @returns {string}
     */
    getDayTemplate(){
        const date = this.#date.getDate();
        const month = this.#date.getMonth();
        const monthDisplay = month < 10 ? `0${month}` : month;
        const dateFormat = `${date}/${monthDisplay}/${this.#date.getFullYear()}`;
        const workoutDisplay = this.#getWorkoutsDisplay();
        const actualDisplay = this.#isActual ? `<span class="tag is-link is-medium">${this.#day} ${date}</span>` : `${this.#day} ${date}`;
        const goalsDisplay = this.#getGoalsDisplay();
        return `
            <div class="date-calendar" data-date="${dateFormat}">
                <h3 class="subtitle" style="margin-bottom: 5px;">${actualDisplay}</h3>
                ${goalsDisplay}
                <hr />
                ${workoutDisplay}
            </div>
        `;
    }

    //#endregion

    //#region Private methods

    /**
     * Gets the diplay of workouts
     * @returns {string}
     */
    #getWorkoutsDisplay(){
        let workoutDisplay = "";
        for (let i = 0; i < this.#workoutsOfDate.length; i++) {
            const w = this.#workoutsOfDate[i];
            workoutDisplay += w.getTemplate();
        }
        return workoutDisplay;
    }

    /**
     * Gets the display of goals
     * @returns {string}
     */
    #getGoalsDisplay(){
        let goalsDisplay = `<hr />`;
        for (let i = 0; i < this.#goals.length; i++) {
            const goal = this.#goals[i];
            const isChecked = goal.isDone(this.#date);
            // Gets the day
            const day = this.#date.getDate();
            const dayString = day < 10 ? `0${day}` : day;
            // Gets the month
            const month = this.#date.getMonth()+1;
            const monthDisplay = month < 10 ? `0${month}` : month;
            const dateString = `${dayString}/${monthDisplay}/${this.#date.getFullYear()}`;
            goalsDisplay += `
                <label class="checkbox" style="padding: 5px;">
                    <input 
                        data-id="${goal.id}" 
                        data-date="${dateString}"
                        class="checkbox ${WorkoutGoalsList.CLASS_BTN_CHECK_GOAL}" 
                        type="checkbox" 
                        ${isChecked ? "checked" : ""} 
                    />
                    ${goal.title}
                </label>`;
        }
        return goalsDisplay;

    }

    //#endregion

}