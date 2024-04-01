export default class WorkoutCalendar {
    
    //#region Properties

    #actualDate;
    #container;
    #title;
    static days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //#endregion

    //#region Constructor

    /**
     * Create a workout calendar based on configuration
     * @param {object} obj 
     * @param {string} obj.idContainer
     * @param {string} obj.idTitle
     * @param {Date} obj.startDate
     */
    constructor(obj = {}){
        if(!obj.idContainer) throw new Error("No container id given when creating the workout calendar");
        if(!obj.idTitle) throw new Error("No title id given when creating the workout calendar");
        this.#container = document.getElementById(obj.idContainer);
        this.#title = document.getElementById(obj.idTitle)
        this.#actualDate = obj.startDate ?? new Date();
    }

    //#endregion

    //#region Accessors

    //#endregion

    //#region Public methods

    /**
     * Display for every day in the actual month a box with every detail in it
     */
    displayCurrentMonth(){
        let calendarDisplay = "";
        const nbDays = this.#getNumberOfDaysInMonth();
        const actualYear = this.#actualDate.getFullYear();
        const actualMonth = this.#actualDate.getMonth();
        for (let i = 0; i < nbDays; i++) {
            const d = new Date(actualYear, actualMonth, i);
            const day = WorkoutCalendar.days[d.getDay()];
            calendarDisplay += this.#getTemplateOfDay(day, d.getDate());
        }
        this.#container.innerHTML = calendarDisplay;
        this.#displayTitle();
    }

    /* Change the actualDate, display its days, and change the title */
    previousMonth(){
        this.#actualDate = new Date(this.#actualDate.getFullYear(), this.#actualDate.getMonth()-1, 1);
        this.displayCurrentMonth();
    }

    /* Change the actualDate, display its daysn and change the title */
    nextMonth(){
        this.#actualDate = new Date(this.#actualDate.getFullYear(), this.#actualDate.getMonth()+1, 1);
        this.displayCurrentMonth();
    }

    /**
     * Returns the actual date as a string in format: Day date, Month Year
     * @returns {string}
     */
    getActualDateAsString(){
        const day = WorkoutCalendar.days[this.#actualDate.getDay()];
        const month = WorkoutCalendar.months[this.#actualDate.getMonth()];
        return `${day} ${this.#actualDate.getDate()}, ${month} ${this.#actualDate.getFullYear()}`;
    }

    //#endregion

    //#region Private methods

    /* Display the month and the year of the actualDate */
    #displayTitle(){
        const actualMonth = this.#actualDate.getMonth();
        const monthAsString = WorkoutCalendar.months[actualMonth];
        this.#title.textContent = `${monthAsString} ${this.#actualDate.getFullYear()}`;
    }

    /**
     * Count the number of days in the actual month
     * @returns {number}
     */
    #getNumberOfDaysInMonth(){
        const lastDayOfMonth = new Date(this.#actualDate.getFullYear(), this.#actualDate.getMonth()+1, 0);
        return lastDayOfMonth.getDate();
    }
    
    /**
     * Returns the template of the workout calendar date with the given arguments
     * @param {string} day 
     * @param {number} date 
     * @returns {string}
     */
    #getTemplateOfDay(day, date){
        return `
            <div class="date-calendar">
                <h3 class="subtitle">${day} ${date}</h3>
                <hr />
            </div>
        `;
    }

    //#endregion

}