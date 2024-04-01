export default class Workout {
    
    //#region Properties

    #title;
    #date;
    #exercices;

    //#endregion

    //#region Constructor

    /**
     * Create a new workout
     * @param {object} obj 
     * @param {string} obj.title
     * @param {Date} obj.date
     * @param {WorkoutExercise[]} obj.exercices
     */
    constructor(obj = {}){
        if(!obj.title) throw new Error("No title given when creating a workout");
        if(!obj.date) throw new Error("No date given when creating the workout");
        this.#title = obj.title;
        this.#date = obj.date;
        this.#exercices = obj.exercices;
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