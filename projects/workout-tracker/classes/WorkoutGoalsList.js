import store from "../../../js/SessionStore.js";
import WorkoutGoal from "./WorkoutGoal.js";

export default class WorkoutGoalsList {
    
    //#region Properties

    #container;
    #goals = [];
    static goalsSessionKey = "workout-goals";
    static CLASS_BTN_DELETE_GOAL = "btn-delete-goal";

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
        this.#goals = store.get(WorkoutGoalsList.goalsSessionKey, []).map(goal => new WorkoutGoal(goal));
    }

    //#endregion

    //#region Accessors

    //#endregion

    //#region Public methods

    displayGoals(){
        let goalsDisplay = "";
        for (let i = 0; i < this.#goals.length; i++) {
            const goal = this.#goals[i];
            goalsDisplay += `<div class="ligne">🔥 - ${goal.title} <i data-id="${goal.id}" class="fas fa-trash ${WorkoutGoalsList.CLASS_BTN_DELETE_GOAL}" style="cursor: pointer; margin-left: 8px; color: red;" title="Delete"></i></div>`;
        }
        if(this.#goals.length === 0) goalsDisplay = `No goals created yet.. Don't be shy,`;
        this.#container.innerHTML = goalsDisplay;
        this.#attachDeleteEvents();
    }

    /**
     * Add the goal in the array of WorkoutGoal
     * Save every goal in localStorage
     * We display every goal after we added it
     * @param {WorkoutGoal} newGoal 
     */
    addGoal(newGoal){
        if(!newGoal instanceof WorkoutGoal) throw new Error("Goal is not of type WorkoutGoal");
        this.#goals.push(newGoal);
        this.#saveGoals();
        this.displayGoals();
    }

    /**
     * Gets the max id already given, return this maximum plus one
     * So that goals can't have a given id
     * @returns {number}
     */
    getNextWorkoutId(){
        const ids = this.#goals.map(w => w.id);
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        return maxId + 1;
    }

    //#endregion

    //#region Private methods

    /* Save goals of the instance in the localStorage */
    #saveGoals(){
        store.set(WorkoutGoalsList.goalsSessionKey, this.#goals);
    }

    /**
     * Attach the delet event on delete buttons displayed
     */
    #attachDeleteEvents(){
        const btnsDeleteGoals = document.getElementsByClassName(WorkoutGoalsList.CLASS_BTN_DELETE_GOAL);
        const that = this;
        for (let i = 0; i < btnsDeleteGoals.length; i++) {
            const btn = btnsDeleteGoals[i];
            // We remove to eliminate potential duplication of event attached
            btn.removeEventListener("click", this.#deleteGoal);
            // We reset it
            btn.addEventListener("click", (e) => that.#deleteGoal(e));
        }
    }

    /**
     * Filter the goals without the one beoing deleted
     * We save them, and display them
     * @param {HTMLElement} e 
     */
    #deleteGoal(e){
        const id = +e.currentTarget.dataset.id;
        if(!id) return;
        this.#goals = this.#goals.filter(g => g.id !== id);
        this.#saveGoals();
        this.displayGoals();
    }

    //#endregion

}