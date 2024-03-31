export default class GroceryItem {

    //#region Properties

    #id;
    #title;
    #isDone;

    //#endregion

    //#region Constructor

    /**
     * Create a GroceryItem with given parameters
     * @param {object} obj 
     * @param {number} obj.id
     * @param {string} obj.title
     * @param {boolean} obj.done
     */
    constructor(obj){
        this.#id = obj.id;
        this.#title = obj.title;
        this.#isDone = false;
    }

    //#endregion

    //#region Accessors

    get title() { return this.#title; }
    get id() { return this.#id; }
    get isDone() { return this.#isDone; }
    set title(value) { this.#title = value; return this; }
    set isDone(value) { this.#isDone = value; return this; }
    
    //#endregion

    //#region Public methods

    finish(){ this.#isDone = true; return this; }

    //#endregion

}