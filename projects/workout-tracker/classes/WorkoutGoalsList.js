import store from "../../../js/SessionStore.js";
import WorkoutGoal from "./WorkoutGoal.js";

export default class WorkoutGoalsList {
    
    //#region Properties

    #container;
    #goals = [];

    //#endregion

    //#region Constructor

    /**
     * Create the list of the goals
     * @param {object} obj 
     * @param {string} obj.idContainer
     */
    constructor(obj = {}){
        if(!obj.idContainer) throw new Error("No container id given when creating list of goals");
        this.#container = document.getElementById(obj.idContainer);
        this.#goals = store.get("workout-goals", []).map(goal => new WorkoutGoal(goal));
    }

    //#endregion

    //#region Accessors

    //#endregion

    //#region Public methods

    displayGoals(){
        let goalsDisplay = "";
        for (let i = 0; i < this.#goals.length; i++) {
            const goal = this.#goals[i];
            goalsDisplay += `🔥 - ${goal.title}`;
        }
        if(this.#goals.length === 0) goalsDisplay = `No goals created yet.. Don't be shy, add one ! 🔥`;
        goalsDisplay += `<button class="button is-dark is-rounded"><i class="fal fa-plus" style="margin-right:8px;"></i>Add a goal</button>`
        this.#container.innerHTML = goalsDisplay;
    }

    //#endregion

    //#region Private methods

    //#endregion

}