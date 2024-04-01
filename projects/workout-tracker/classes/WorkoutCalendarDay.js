export default class WorkoutCalendarDay {
    
    //#region Properties

    #date;
    #day;
    #workoutsOfDate;

    //#endregion

    //#region Constructor

    /**
     * Create a new workout
     * @param {Date} newDate
     * @param {string} actualDay
     * @param {Workout} workouts
     */
    constructor(newDate, actualDay, workouts = []){
        if(!newDate) throw new Error("No date given when creating the workout calendar day");
        if(!actualDay) throw new Error("No day given when creating the workout calendar day");
        this.#date = newDate;
        this.#day = actualDay;
        this.#workoutsOfDate = workouts;
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
        return `
            <div class="date-calendar" data-date="${dateFormat}">
                <h3 class="subtitle">${this.#day} ${date}</h3>
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

    //#endregion

}