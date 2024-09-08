import Utils from "../../js/Utils.js";
import Tube from "./Tube.js";

export default class WaterSort {

    //#region Properties

    /**
     * @type {number}
     */
    #nbOfTubes;
    /**
     * @type {number}
     */
    #heightOfTube;
    /**
     * @type {Tube[]}
     */
    #tubes;
    /**
     * @type {string[]}
     */
    #colors;
    /**
     * @type {HTMLDivElement}
     */
    #divElement;
    /**
     * @type {HTMLElement}
     */
    #labelElement;
    /**
     * @type {HTMLButtonElement}
     */
    #restartGameBtn;
    /**
     * @type {HTMLButtonElement}
     */
    #resetGameBtn;
    /**
     * @type {Array[]}
     */
    #originalGeneration;
    /**
     * @type{Array[]}
     */
    #generation = [];
    /**
     * @type {string}
     */
    #idTubeSelected = null;

    //#endregion

    //#region Constructor

    /**
     * Constructor of the WaterSort class
     * @param {object} obj 
     * @param {number} obj.nbOfTubes 
     * @param {number} obj.heightOfTube 
     * @param {HTMLDivElement} obj.div 
     * @param {HTMLElement} obj.labelElement 
     * @param {HTMLButtonElement} obj.restartBtn 
     * @param {HTMLButtonElement} obj.resetGameBtn 
     * @param {string[]} obj.colors 
     */
    constructor({ nbOfTubes, heightOfTube, div, labelElement, restartBtn, resetGameBtn, colors = [], }){
        if (!nbOfTubes) throw new Error("No number of tubes specified");
        if (nbOfTubes !== colors.length) throw new Error("Number of tubes and colors are not logical");
        this.#nbOfTubes = nbOfTubes;
        if (!heightOfTube) throw new Error("No height of tubes specified");
        this.#heightOfTube = heightOfTube;
        if (!div) throw new Error("No div specified");
        this.#divElement = div;
        if (!labelElement) throw new Error("No label specified");
        this.#labelElement = labelElement;
        if (!restartBtn) throw new Error("No restart button specified");
        this.#restartGameBtn = restartBtn;
        if (!resetGameBtn) throw new Error("No reset button specified");
        this.#resetGameBtn = resetGameBtn;
        this.#tubes = [];
        this.#colors = colors;
    }

    //#endregion

    //#region Accessors

    get nbOfTubes() { return this.#nbOfTubes; }
    get heightOfTube() { return this.#heightOfTube; }
    get tubes() { return this.#tubes; }
    get colors() { return this.#colors; }
    get generation() { return this.#generation; }

    //#endregion

    //#region Methods

    //#region Public

    /**
     * Generate a new display randomly
     * Save the actual generation
     */
    generate(){
        const generation = [];
        let everyColors = this.#getCompleteColorsArray();
        for (let i = 0; i < this.#nbOfTubes; i++) {
            // We generate every slots of the tube
            const slots = [];
            for (let j = 0; j < this.#heightOfTube; j++) {
                const indexRandomColor = Utils.getRandomIndexFromArray(everyColors);
                slots.push(everyColors[indexRandomColor]);
                everyColors = everyColors.filter((c,index) => index !== indexRandomColor);
            }
            const tube = new Tube({ height: this.#heightOfTube, slots });
            generation.push(tube);
        }
        const firstEmptyTube = new Tube({ height: this.#heightOfTube, });
        const secondEmptyTube = new Tube({ height: this.#heightOfTube, });
        // We add two empty slots
        generation.push(firstEmptyTube, secondEmptyTube);
        // We save the generation
        this.#generation = generation;
        // We copy by value and not reference
        this.#originalGeneration = generation.map(obj => new Tube(obj.toJSON()));
        this.displayGeneration();
    }

    /**
     * Display the generation and declare events on the DOM
     */
    displayGeneration(){
        this.#labelElement.innerText = "";
        this.#restartGameBtn.style.display = "none";
        this.#resetGameBtn.style.display = "block";
        this.#divElement.innerHTML = this.#generation.reduce((prev, tube) => `${prev}${tube.getTemplate()}`, "");
        this.#declareEventsOnTube();
    }

    /**
     * Change the generation, and displays it
     */
    reset(){
        this.#generation = this.#originalGeneration.map(obj => new Tube(obj.toJSON()));
        this.displayGeneration();
    }

    //#endregion

    //#region Private

    /**
     * Check if every tube is completed so thatthe user has won
     * @returns {boolean}
     */
    #checkIfVictory(){
        return this.#generation.every(tube => tube.completed);
    }

    /**
     * Displays the restart button
     * And attach an event that generates a new game
     */
    #displayRestartButton(){
        this.#restartGameBtn.style.display = "block";
        this.#restartGameBtn.addEventListener("click", () => this.generate());
    }

    //#region Getters

    /**
     * Return an array containing this.#heightOfTube * this.#colors array
     * @returns {string[]}
     */
    #getCompleteColorsArray(){
        const everyColor = [];
        for (let i = 0; i < this.#heightOfTube; i++) {
            everyColor.push(...this.#colors);
        }
        return everyColor;
    }

    /**
     * Get the tube from its id
     * @param {string} id 
     * @returns {Tube?}
     */
    #getTubeGeneratedFromId(id){
        return this.#generation.find(t => t.id === id);
    }

    /**
     * Gets the top color of the tube from its id
     * @param {string} idTube 
     * @returns {string?}
     */
    #getTopColorOfTube(idTube){
        const tube = this.#getTubeGeneratedFromId(idTube);
        if (!tube || tube.slots.length === 0) return null;
        return tube.slots[0];
    }

    //#endregion

    //#region Events

    /**
     * gets every tube and add an event listener to act based on selection
     * Add an event listener on the reset button
     */
    #declareEventsOnTube(){
        const getIdAndCallSelectTube = (e) => this.#actBasedOnSelection(e.currentTarget.dataset.id);
        for (let i = 0; i < this.#generation.length; i++) {
            const tube = this.#generation[i];
            const tubeDiv = document.getElementById(`tube-${tube.id}`);
            if (!tubeDiv) continue;
            tubeDiv.removeEventListener("click", getIdAndCallSelectTube);
            tubeDiv.addEventListener("click", getIdAndCallSelectTube);
        }
        // Reset
        this.#resetGameBtn.removeEventListener("click", () => this.reset());
        this.#resetGameBtn.addEventListener("click", () => this.reset());
    }

    //#endregion

    //#region Selection

    /**
     * Removes the 'selected' class
     * Empty the id tube selected property
     */
    #removeSelection(){
        document.getElementById(`tube-${this.#idTubeSelected}`)?.classList.remove("selected");
        this.#idTubeSelected = null;
    }

    /**
     * Calls the right method based on the actual selection or remove the actual selection
     * Check if victory and displays it if necessary
     * @param {string} newId 
     */
    #actBasedOnSelection(newId){
        if (!this.#idTubeSelected) this.#selectPrimaryTube(newId);
        else if (this.#idTubeSelected !== newId) this.#selectTargetTube(newId);
        else this.#removeSelection();
        if (!this.#checkIfVictory()) return this.#labelElement.innerText = "";
        this.#labelElement.innerText = "You won !";
        this.#displayRestartButton();
        this.#resetGameBtn.style.display = "none";
    }

    /**
     * Stores the id of the actual selection
     * Adds the 'selected' class to emphasize the right tube
     * @param {string} newId 
     */
    #selectPrimaryTube(newId){
        this.#idTubeSelected = newId;
        document.getElementById(`tube-${this.#idTubeSelected}`)?.classList.add("selected");
    }

    /**
     * Check if it can move
     * If so, it removes the top color and adds it to the target tube
     * Removes the 'selected' class from the element
     * Re-display generation
     * @param {string} targetId 
     */
    #selectTargetTube(targetId){
        const tubeGenSelected = this.#getTubeGeneratedFromId(this.#idTubeSelected);
        const targetTubeGen = this.#getTubeGeneratedFromId(targetId);
        if (!targetTubeGen || !tubeGenSelected) return;
        const topColorTarget = this.#getTopColorOfTube(targetId);
        const topColorSelected = this.#getTopColorOfTube(this.#idTubeSelected);
        const canMoveColor = targetTubeGen.slots.length < this.#heightOfTube 
            && (topColorTarget === topColorSelected || (!topColorTarget && topColorSelected) || (!topColorSelected && topColorTarget));
        if (canMoveColor) {
            const topColors = tubeGenSelected.getTopColors();
            const slotsToDelete = targetTubeGen.addSlots(topColors);
            tubeGenSelected.removeTopColors(slotsToDelete);
        }
        this.#removeSelection();
        this.displayGeneration();
    }

    //#endregion

    //#endregion

    //#endregion

}