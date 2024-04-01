export default class WorkoutCalendarDay {
    
    //#region Properties

    #date;
    #day;
    #isActual;
    #goals;
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

    #getWorkoutsDisplay(){
        let workoutDisplay = "";
        for (let i = 0; i < this.#workoutsOfDate.length; i++) {
            const w = this.#workoutsOfDate[i];
            workoutDisplay += `💪 ${w.title}`;
        }
        return workoutDisplay;
    }

    #getGoalsDisplay(){
        let goalsDisplay = `<hr />`;
        for (let i = 0; i < this.#goals.length; i++) {
            const goal = this.#goals[i];
            goalsDisplay += `<label class="checkbox" style="padding: 5px;"><input class="checkbox" type="checkbox" /> ${goal.title}</label>`;
        }
        return goalsDisplay;

    }

    //#endregion

}