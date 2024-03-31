export default class Color {

    //#region Properties

    #CHARS = "0123456789abcdef";
    #color;

    //#endregion

    //#region Constructor

    constructor(){
        this.#color = this.#genRandColor();
    }

    //#endregion

    //#region Accessors
    
    get color(){ return this.#color; }

    //#endregion

    //#region private properties

    #genRandColor(){
        let color = `#`;
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * this.#CHARS.length);
            color += this.#CHARS[randomIndex];
        }
        return color;
    }

    //#endregion

}