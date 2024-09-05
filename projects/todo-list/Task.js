import Utils from "../../js/Utils.js";

export default class Task {

    //#region Properties

    static CLASS_DELETE_TASK = "btn-delete-task";
    static CLASS_EDIT_TASK = "btn-edit-task";
    /**
     * @type {string}
     */
    #id;
    /**
     * @type {string}
     */
    #description;
    /**
     * @type {boolean}
     */
    #done;

    //#endregion

    //#region constructor

    /**
     * Create an instance of a Task
     * @param {object} obj
     * @param {string?} obj.id
     * @param {string} obj.description
     * @param {boolean} obj.done
     */
    constructor({ id = null, description, done = false }){
        this.#id = id ?? Utils.genUniqueId();
        this.#description = description;
        this.#done = done;
    }

    //#endregion

    //#region Accessors

    get id() { return this.#id; }
    get description() { return this.#description; }
    get done() { return this.#done; }
    set description(value) { this.#description = value; }
    set done(value) { this.#done = value; }

    //#endregion

    //#region Methods

    /**
     * Get the display template of the current task
     * @returns {string}
     */
    getTemplate(){
        return `
            <div class="ligne">
                <h3 class="subtitle has-text-centered">${this.#id} - ${this.#description} ${this.#done ? "✅" : ""}</h3>
                <button class="button is-rounded is-info ${Task.CLASS_EDIT_TASK}"><i class="fas fa-edit" style="margin-right: 8px;"></i>Edit</button>
                <button class="button is-rounded is-danger ${Task.CLASS_DELETE_TASK}"><i class="fas fa-trash" style="margin-right: 8px;"></i>Delete</button>
            </div>
        `;
    }

    toJSON(){
        return {
            id: this.#id,
            description: this.#description,
        };
    }

    //#endregion

}