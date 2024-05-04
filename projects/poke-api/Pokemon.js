export default class Pokemon {

    //#region Properties

    /**
     * @type {number}
     */
    #id;
    /**
     * @type {Array}
     */
    #abilities;
    /**
     * @type {string}
     */
    #name;
    /**
     * @type {number}
     */
    #order;
    /**
     * @type {object}
     */
    #species;
    /**
     * @type {object}
     */
    #sprites;
    /**
     * @type {Array}
     */
    #stats;
    /**
     * @type {Array}
     */
    #types;
    /**
     * @type {number}
     */
    #weight;

    //#endregion

    //#region Constructor

    constructor(pokemonData){
        this.#id = pokemonData.id;
        this.#name = pokemonData.name;
        this.#abilities = pokemonData.abilities;
        this.#order = pokemonData.order;
        this.#weight = pokemonData.weight;
        this.#types = pokemonData.types;
        this.#stats = pokemonData.stats;
        this.#sprites = pokemonData.sprites;
        this.#species = pokemonData.species;
    }

    //#endregion

    get id(){ return this.#id; }

    //#region Public methods

    /**
     * Get the display of the card
     * @returns {string}
     */
    getDisplayCard(){
        const image = this.#sprites?.front_default ? `<img src="${this.#sprites.front_default}" />` : "";
        return `
            <div class="pokemon-card" data-id="${this.#id}">
                ${image}
                <h3 class="subtitle">${this.#name} #${this.#id}</h3>
            </div>
        `;
    }

    /**
     * Get the display of every detail in the actual pokemon
     * @returns {string}
     */
    getDisplayDetails(){
        const image = this.#sprites?.front_default ? `<div class="ligne"><img src="${this.#sprites.front_default}" /></div>` : "";
        return `
            ${image}
            <div class="ligne">
                <h1 class="title">${this.#name} #${this.#id}</h1>
            </div>
            <div class="ligne">
                <h3 class="subtitle" style="margin:0;">Type(s) :</h3>
                ${this.#getDisplayTypes()}
            </div>
        `;
    }

    //#endregion

    //#region Private methods

    /**
     * Display every type of the actual pokemon
     * @returns {string}
     */
    #getDisplayTypes(){
        let display = "";
        for (let i = 0; i < this.#types.length; i++) {
            const t = this.#types[i];
            display += `<span class="tag is-medium is-success" style="padding:5px;margin:5px;">${t.type.name}</span>`;
        }
        return display;
    }

    //#endregion

}