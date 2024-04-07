import Utils from "./Utils.js";

export default class Calendar {

    //#region Properties

    /**
     * @type {Date}
     */
    #actualDate;
    /**
     * @type {HTMLElement}
     */
    #container;
    /**
     * @type {HTMLElement}
     */
    #title;

    //#endregion

    //#region Constructor

    /**
     * Create a calendar based on configuration
     * @param {object} obj 
     * @param {string} obj.idContainer
     * @param {string} obj.idTitle
     * @param {Date} obj.startDate
     */
    constructor(obj = {}){
        if(!obj.idContainer) throw new Error("No container id given when creating the calendar");
        if(!obj.idTitle) throw new Error("No title id given when creating the calendar");
        this.#container = document.getElementById(obj.idContainer);
        this.#title = document.getElementById(obj.idTitle);
        this.#actualDate = obj.startDate ?? new Date();
    }

    //#endregion

    //#region Accessors

    get currentDateCalendar(){ return this.#actualDate; }
    get nbDaysInMonth(){ return this.#getNumberOfDaysInMonth(); }

    //#endregion

    //#region Public methods

    /**
     * The display method called everywehere, may be overrided
     */
    display(){
        this.displayCurrentMonth();
    }

    displayCurrentMonth(){
        let calendarDisplay = "";
        const nbDays = this.#getNumberOfDaysInMonth();
        const actualYear = this.#actualDate.getFullYear();
        const actualMonth = this.#actualDate.getMonth();
        const currentDate = new Date();
        for (let i = 1; i <= nbDays; i++) {
            const d = new Date(actualYear, actualMonth, i);
            const isActual = currentDate.getFullYear() === actualYear && currentDate.getMonth() === actualMonth && currentDate.getDate() === i;
            calendarDisplay += this.#getDayTemplate(d, isActual);
        }
        this.#container.innerHTML = calendarDisplay;
        this.#displayTitle();
    }

    //#region Navigation

    /**
     * Change the actualDate, display its days, and change the title
     */
    previousMonth(){
        this.#actualDate = new Date(this.#actualDate.getFullYear(), this.#actualDate.getMonth()-1, 1);
        this.display();
    }

    /**
     * Change the actualDate, display its daysn and change the title
     */
    nextMonth(){
        this.#actualDate = new Date(this.#actualDate.getFullYear(), this.#actualDate.getMonth()+1, 1);
        this.display();
    }

    //#endregion

    /**
     * Returns the actual date as a string in format: Day date, Month Year
     * @param {Date} theDate
     * @param {string} format
     * @returns {string}
     */
    getDateAsString(theDate = this.#actualDate, format = null){
        return Utils.getDateAsString(theDate, format);
    }

    //#endregion

    //#region Private methods

    /**
     * Display the month and the year of the actualDate
     */
    #displayTitle(){
        const actualMonth = this.#actualDate.getMonth();
        const monthAsString = Utils.months[actualMonth];
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

    //#region Templates

    /**
     * Get the template with the value of dates
     * @param {Date} theDate 
     * @param {boolean} isCurrent 
     * @returns {string}
     */
    #getDayTemplate(theDate = null, isCurrent = false){
        const day = Utils.days[theDate.getDay()];
        if(!theDate || !theDate instanceof Date) return "";
        const date = theDate.getDate();
        const dateFormat = Utils.getDateAsString(theDate, Utils.dateFormats.DayMonthYearHyphens);
        const actualDisplay = isCurrent ? `<span class="tag is-link is-large">${day} ${date}</span>` : `${day} ${date}`;
        return `
            <div class="date-calendar" data-date="${dateFormat}">
                <h3 class="subtitle" style="margin-bottom: 5px;">${actualDisplay}</h3>
                <hr />
                <div id="content-${dateFormat}">

                </div>
            </div>
        `;
    }

    //#endregion

    //#endregion

}