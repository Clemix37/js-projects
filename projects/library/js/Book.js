class Book {
    // Properties
    #id;
    #name;
    #year;
    #author;
    // Constructor
    constructor({id = null,name,year,author}){
        this.#id = id ?? this.#generateId();
        this.#name = name;
        this.#year = year;
        this.#author = author;
    }
    // Getters and setters
    get id(){return this.#id;}
    get name(){return this.#name;}
    set name(value){this.#name=value;}
    get year(){return this.#year;}
    set year(value){this.#year=value;}
    get author(){return this.#author;}
    set author(value){this.#author=value;}
    // Private methods
    /* Generates random ids */
    #generateId(){
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
}

export default Book;