export default class WorkoutGoal {
    
    //#region Properties

    #title;

    //#endregion

    //#region Constructor

    /**
     * Create a new workout goal
     * @param {object} obj 
     * @param {string} obj.title
     */
    constructor(obj = {}){
        if(!obj.title) throw new Error("No title given when creating a workout goal");
        this.#title = obj.title;
    }

    //#endregion

    //#region Accessors

    get title() { return this.#title; }

    //#endregion

    //#region Public methods

    //#endregion

    //#region Private methods

    //#endregion

}