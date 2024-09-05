import Utils from "../../js/Utils.js";

export default class List {

    //#region Properties

    static CLASS_SEE_TASKS = "btn-see-tasks-of-list";
    static CLASS_DELETE_LIST = "btn-delete-list";
    /**
     * @type {string}
     */
    #id;
    /**
     * @type {string}
     */
    #name;
    /**
     * @type {Task[]}
     */
    #tasks;

    //#endregion

    //#region constructor

    /**
     * Create an instance of List
     * @param {object} obj
     * @param {string?} obj.id
     * @param {string} obj.name
     * @param {Task[]} obj.tasks 
     */
    constructor({ id = null, name, tasks = [], }){
        this.#id = id ?? Utils.genUniqueId();
        this.#name = name;
        this.#tasks = tasks;
    }

    //#endregion

    //#region Accessors

    get id() { return this.#id; }
    get name() { return this.#name; }
    get tasks() { return this.tasks; }
    set name(value) { this.#name = value; }
    set tasks(value) {this.#tasks = value; }

    //#endregion

    //#region Methods

    /**
     * Add to the tasks list the tasks given as parameters
     * @param  {...Task[]} newTasks 
     * @returns {Task[]}
     */
    addTasks(...newTasks) {
        this.#tasks.push(...newTasks);
        return this.#tasks;
    }

    /**
     * Get the display template of the current list
     * @returns {string}
     */
    getTemplate(){
        return `
            <div class="ligne">
                <h3 class="subtitle has-text-centered">${this.#id} - ${this.#name} (${this.#tasks.filter(t => t.done).length}/${this.#tasks.length})</h3>
                <button class="button is-rounded ${List.CLASS_SEE_TASKS}" data-id="${this.#id}"><i class="fas fa-eye" style="margin-right: 8px;"></i>See tasks</button>
                <button class="button is-rounded is-danger ${List.CLASS_DELETE_LIST}" data-id="${this.#id}"><i class="fas fa-trash" style="margin-right: 8px"></i>Delete list</button>
            </div>
        `;
    }

    toJSON(){
        return {
            id: this.#id,
            name: this.#name,
            tasks: this.#tasks.map(t => t.toJSON())
        };
    }

    //#endregion

}