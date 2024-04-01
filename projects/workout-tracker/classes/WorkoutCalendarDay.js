export default class WorkoutCalendarDay {
    
    //#region Properties

    #date;
    #day;

    //#endregion

    //#region Constructor

    /**
     * Create a new workout
     * @param {Date} newDate
     * @param {string} actualDay
     */
    constructor(newDate, actualDay){
        if(!newDate) throw new Error("No date given when creating the workout calendar day");
        if(!actualDay) throw new Error("No day given when creating the workout calendar day");
        this.#date = newDate;
        this.#day = actualDay;
    }

    //#endregion

    //#region Accessors

    //#endregion

    //#region Public methods

    getDayTemplate(){
        return `
            <div class="date-calendar">
                <h3 class="subtitle">${this.#day} ${this.#date.getDate()}</h3>
                <hr />
            </div>
        `;
    }

    //#endregion

    //#region Private methods

    //#endregion

}