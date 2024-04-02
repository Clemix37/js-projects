export default class Book {

    //#region Properties

    #id;
    #name;
    #year;
    #author;

    //#endregion

    //#region Constructor

    constructor({ id = null, name, year, author }){
        this.#id = id ?? this.#generateId();
        this.#name = name;
        this.#year = year;
        this.#author = author;
    }

    //#endregion

    //#region Accessors

    get id() { return this.#id; }
    get name() { return this.#name; }
    set name(value) { this.#name = value; }
    get year() { return this.#year; }
    set year(value) { this.#year = value; }
    get author() { return this.#author; }
    set author(value) { this.#author = value; }

    //#endregion

    //#region Public methods

    /**
     * Used to save data in localStorage as object
     * @returns {object}
     */
    toJSON(){
        return {
            id: this.#id,
            name: this.#name,
            year: this.#year,
            author: this.#author,
        };
    }

    //#endregion

    //#region Private methods

    /**
     * Generates random ids
     * @returns {string}
     */
    #generateId(){
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    //#endregion

}