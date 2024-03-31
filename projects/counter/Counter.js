export default class Counter {
    #points;
    constructor(){
        this.#points = 0;
    }
    get points(){return this.#points;}
    increase(){this.#points++;return this;}
    decrease(){this.#points--;return this;}
    reset(){this.#points=0;return this;}
}