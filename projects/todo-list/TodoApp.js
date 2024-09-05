import List from "./List.js";
import Task from "./Task.js";

export default class TodoApp {

    //#region Properties

    /**
     * @type {List}
     */
    #lists;

    //#endregion

    //#region constructor

    /**
     * Create an instance of a TodoApp
     * @param {object} obj
     * @param {List[]} obj.lists 
     */
    constructor({ lists = [], }){
        this.#lists = lists;
    }

    //#endregion

    //#region Accessors

    get lists() { return this.#lists; }

    //#endregion

    //#region Methods

    /**
     * Displays every list in the div given as argument
     * @param {HTMLDivElement} divInDom 
     */
    displayOnDiv(divInDom){
        if(!divInDom) return;
        const display = this.#lists.reduce((prev, list) => prev + list.getTemplate(), "");
        divInDom.innerHTML = display;
        this.#addEvents();
    }

    /**
     * Adds lists given as arguments inside the lists property
     * Returns the lists property
     * @param  {...List[]} newLists 
     * @returns {List[]}
     */
    addLists(...newLists){
        this.#lists.push(...newLists);
        return this.#lists;
    }

    /**
     * Add tasks in a list where the id is in arguments
     * @param {string} idList 
     * @param  {...Task[]} newTasks 
     * @returns {List[]}
     */
    addTasksOnList(idList, ...newTasks){
        this.#lists = this.#lists.map(list => {
            if(list.id !== idList) return list;
            list.addTasks(...newTasks);
            return list;
        });
        return this.#lists;
    }

    /**
     * Adds the events for the lists and for the tasks on the DOM
     */
    #addEvents(){
        this.#addEventsOnLists();
        this.#addEventsOnTasks();
    }

    #addEventsOnLists(){
        // SEE TASKS
        const btnsSeeTasks = document.querySelectorAll(`.${List.CLASS_SEE_TASKS}`);
        for (let i = 0; i < btnsSeeTasks.length; i++) {
            const btnSee = btnsSeeTasks[i];
            btnSee.removeEventListener("click", (e) => this.#displayTasksFromList(e));
            btnSee.removeEventListener("click", (e) => this.#displayTasksFromList(e));
        }
        // DELETE LIST
        const btnsdelList = document.querySelectorAll(`.${List.CLASS_DELETE_LIST}`);
        for (let i = 0; i < btnsdelList.length; i++) {
            const btnDelList = btnsdelList[i];
            btnDelList.removeEventListener("click", (e) => this.#deleteListFromElement(e));
            btnDelList.removeEventListener("click", (e) => this.#deleteListFromElement(e));
        }
    }

    #addEventsOnTasks(){
        // DELETE TASK
        const btnsdelTasks = document.querySelectorAll(`.${Task.CLASS_DELETE_TASK}`);
        for (let i = 0; i < btnsdelTasks.length; i++) {
            const btnDelList = btnsdelTasks[i];
            btnDelList.removeEventListener("click", (e) => this.#deleteTaskFromElement(e));
            btnDelList.removeEventListener("click", (e) => this.#deleteTaskFromElement(e));
        }
        // EDIT TASK
        // TODO
    }

    #displayTasksFromList(e){
        
    }

    /**
     * Filter the list from the lists property
     * @param {*} e 
     */
    #deleteListFromElement(e){
        const { id } = e.currentTarget.dataset;
        if (!id) return;
        this.#lists = this.#lists.filter(l => l.id !== id);
    }

    /**
     * Map every list and filter the task from the tasks property
     * @param {*} e 
     */
    #deleteTaskFromElement(e){
        const { id } = e.currentTarget.dataset;
        if (!id) return;
        this.#lists = this.#lists.map(list => {
            list.tasks = list.tasks.filter(t => t.id !== id);
            return list;
        });
    }

    toJSON(){
        return {
            lists: this.#lists.map(l => l.toJSON()),
        };
    }

    //#endregion

}