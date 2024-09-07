import Utils from "../../js/Utils.js";

export default class Tube {

    //#region Properties

    /**
     * @type {string}
     */
    #id;
    /**
     * @type {number}
     */
    #height;
    /**
     * @type {string[]}
     */
    #slots;

    //#endregion

    //#region Constructor

    constructor({ height, slots = []}){
        this.#id = Utils.genUniqueId();
        this.#height = height;
        this.#slots = slots;
    }

    //#endregion

    //#region Accessors

    get id(){ return this.#id; }
    get height(){ return this.#height; }
    get slots() { return this.#slots; }

    //#endregion

    //#region Methods

    /**
     * Get the template of the actual tube
     * @returns {string}
     */
    getTemplate(){
        return `
            <div id="tube-${this.#id}" class="tube" data-id="${this.#id}">
                ${this.#slots.reduce((prev, slotColor) => `${prev}${this.#getSlotTemplate(slotColor)}`, "")}
            </div>
        `;
    }

    addSlots(...slots){
        // We can only add up to the max height
        const nbToAdd = this.#height - this.#slots.length;
        const slotsToAdd = [];
        for (let i = 0; i <= nbToAdd; i++) {
            slotsToAdd.push(slots[i]);
        }
        this.#slots.push(...slotsToAdd);
    }

    removeTopColor(){
        if(this.#slots.length <= 0) return null;
        const [lastColor] = this.#slots.splice(0, 1);
        return lastColor;
    }

    /**
     * Get the template of a slot color
     * @param {string} color 
     * @returns {string}
     */
    #getSlotTemplate(color){
        return color ? `
            <div class="tube-color ${color}">

            </div>
        ` : "";
    }

    //#endregion

}