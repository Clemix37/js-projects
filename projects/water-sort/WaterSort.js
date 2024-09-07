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
     * @type{Array[]}
     */
    #generation = [];
    /**
     * @type {string}
     */
    #idTubeSelected = null;

    //#endregion

    //#region Constructor

    constructor({ nbOfTubes, heightOfTube, div, colors = [], }){
        if(!nbOfTubes) throw new Error("No number of tubes specified");
        if(nbOfTubes !== colors.length) throw new Error("Number of tubes and colors are not logical");
        this.#nbOfTubes = nbOfTubes;
        if(!heightOfTube) throw new Error("No height of tubes specified");
        this.#heightOfTube = heightOfTube;
        if (!div) throw new Error("No div specified");
        this.#divElement = div;
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

    /**
     * Generate a new display randomly
     * Save the actual generation
     */
    generateOnDiv(){
        const generation = [];
        let everyColors = this.#getCompleteColorsArray();
        for (let i = 0; i < this.#nbOfTubes; i++) {
            // We generate every slots of the tube
            const slots = [];
            for (let j = 0; j < this.#heightOfTube; j++) {
                let indexRandomColor = Utils.getRandomIndexFromArray(everyColors);
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
        this.displayGeneration();
        this.#declareEventsOnTube();
    }

    displayGeneration(){
        this.#divElement.innerHTML = this.#generation.reduce((prev, tube) => `${prev}${tube.getTemplate()}`, "");
    }

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

    #getTubeGeneratedFromId(id){
        return this.#generation.find(t => t.id === id);
    }

    #getTopColorOfTube(idTube){
        const tube = this.#getTubeGeneratedFromId(id);
        if (!tube) return null;
        return tube.slots[tubs.slots.length - 1];
    }

    //#region Events

    #declareEventsOnTube(){
        const getIdAndCallSelectTube = (e) => this.#actBasedOnSelection(e.currentTarget.dataset.id);
        for (let i = 0; i < this.#generation.length; i++) {
            const tube = this.#generation[i];
            const tubeDiv = document.getElementById(`tube-${tube.id}`);
            if (!tubeDiv) continue;
            tubeDiv.removeEventListener("click", getIdAndCallSelectTube);
            tubeDiv.addEventListener("click", getIdAndCallSelectTube);
        }
    }

    //#endregion

    //#region Selection

    #actBasedOnSelection(newId){
        if (!this.#idTubeSelected) this.#selectPrimaryTube(newId);
        else this.#selectTargetTube(newId);
    }

    #selectPrimaryTube(newId){
        this.#idTubeSelected = newId;
        const tubeDiv = document.getElementById(`tube-${this.#idTubeSelected}`);
        tubeDiv.classList.add("selected");
    }

    #selectTargetTube(targetId){
        const tubeSelected = document.getElementById(`tube-${this.#idTubeSelected}`);
        const targetTube = document.getElementById(`tube-${targetId}`);
        const tubeGenSelected = this.#getTubeGeneratedFromId(this.#idTubeSelected);
        const targetTubeGen = this.#getTubeGeneratedFromId(targetId);
        const canMoveColor = targetTubeGen.slots.length < this.#heightOfTube || this.#getTopColorOfTube(targetId) === this.#getTopColorOfTube(this.#idTubeSelected);
        if (canMoveColor) {
            const topColor = tubeGenSelected.removeTopColor();
            targetTubeGen.addSlots(topColor);
        }
        // We remove the selection
        tubeSelected.classList.remove("selected");
        this.#idTubeSelected = null;
        this.displayGeneration();
    }

    //#endregion

    //#endregion

}