class GroceryItem {
    #id;
    #title;
    #isDone;
    constructor(obj){
        this.#id = obj.id;
        this.#title = obj.title;
        this.#isDone = false;
    }
    get title(){return this.#title;}
    get id(){return this.#id;}
    get isDone(){return this.#isDone;}
    set title(value){this.#title=value;return this;};
    set isDone(value){this.#isDone=value;return this;}
    finish(){this.#isDone=true;return this;}
}