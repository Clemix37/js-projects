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
    constructor(obj = {}){
        if(!obj.id) throw new Error("No id given when creating a workout goal");
        if(!obj.title) throw new Error("No title given when creating a workout goal");
        this.#id = obj.id;
        this.#title = obj.title;
        this.#datesDone = obj.datesDone?.map(dateString => new Date(dateString)) || [];
    }

    //#endregion

    //#region Accessors

    get id() { return this.#id; }
    get title() { return this.#title; }
    get datesDone() { return this.#datesDone; }

    //#endregion

    //#region Public methods

    /**
     * Add the date as done
     * @param {Date} newDate 
     */
    addDateDone(newDate){
        if(this.isDone(newDate)) return;
        this.#datesDone.push(newDate);
    }

    /**
     * Remove the old date from the dates done
     * @param {Date} oldDate 
     */
    removeDateDone(oldDate){
        if(!this.isDone(oldDate)) return;
        this.#datesDone = this.#datesDone.filter(d => d.toString() !== oldDate.toString());
    }

    /**
     * Check if the date is done
     * @param {Date} dateToCheck 
     */
    isDone(dateToCheck){
        return !!this.#datesDone.find(d => d.toString() === dateToCheck.toString());
    }

    /**
     * Gets the actual instance as JSON
     * @returns {object}
     */
    toJSON(){
        const obj = {
            id: this.#id,
            title: this.#title,
            datesDone: this.#datesDone,
        };
        return obj;
    }

    //#endregion

    //#region Private methods

    //#endregion

}