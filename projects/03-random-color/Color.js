class Color {
    #CHARS = "0123456789abcdef";
    #color;
    constructor(){
        this.#color = this.#genRandColor();
    }
    get color(){return this.#color;}
    #genRandColor(){
        let color = `#`;
        for (let i = 0; i < 6; i++) {
            color += this.#CHARS[Math.floor(Math.random() * this.#CHARS.length)];
        }
        return color;
    }
}