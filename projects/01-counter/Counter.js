class Counter {
    #points;
    constructor(){
        this.#points = 0;
    }
    get points(){return this.#points;}
    increase(){this.#points++;}
    decrease(){this.#points--;}
}