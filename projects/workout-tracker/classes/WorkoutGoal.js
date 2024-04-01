export default class WorkoutGoal {
    
    //#region Properties

    #id;
    #title;

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
    }

    //#endregion

    //#region Accessors

    get id() { return this.#id; }
    get title() { return this.#title; }
    set id(value) { this.#id = value; }

    //#endregion

    //#region Public methods

    toJSON(){
        const obj = {
            id: this.#id,
            title: this.#title,
        };
        return obj;
    }

    //#endregion

    //#region Private methods

    //#endregion

}