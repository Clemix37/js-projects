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
     * @param {WorkoutGoal[]} obj.goals
     */
    constructor(obj = {}){
        if(!obj.idContainer) throw new Error("No container id given when creating list of goals");
        this.#container = document.getElementById(obj.idContainer);
        this.#goals = obj.goals ?? [];
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
        this.#container.innerHTML = goalsDisplay;
    }

    //#endregion

    //#region Private methods

    //#endregion

}