export default class WorkoutExercise {
    
    //#region Properties

    #title;

    //#endregion

    //#region Constructor

    /**
     * Create a new workout exercise
     * @param {object} obj 
     * @param {string} obj.title
     */
    constructor(obj = {}){
        if(!obj.title) throw new Error("No title given when creating a workout exercise");
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