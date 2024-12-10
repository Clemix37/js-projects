import Utils from "../../js/classes/Utils.js";

export default class PollChoice {
	//#region Properties

	static ID_STORE = "cwd-list-poll-choices";
	static CLASS_BTN_UPVOTE = "btn-upvote-choice";
	static CLASS_BTN_DOWNVOTE = "btn-downvote-choice";
	/**
	 * @type {string}
	 */
	#id;
	/**
	 * @type {string}
	 */
	#label;
	/**
	 * @type {number}
	 */
	#nbVote;

	//#endregion

	//#region Constructor

	/**
	 * Create the instance of the PollChoice
	 * @constructor
	 * @param {{ id: string?, label: string, nbVote: number, }} obj
	 */
	constructor({ id = null, label, nbVote = 0 }) {
		this.#id = id ?? Utils.genUniqueId();
		this.#label = label;
		this.#nbVote = nbVote;
	}

	//#endregion

	//#region Accessors

	get id() {
		return this.#id;
	}
	get label() {
		return this.#label;
	}
	get nbVote() {
		return this.#nbVote;
	}
	set label(value) {
		this.#label = value;
	}
	set nbVote(value) {
		this.#nbVote = value;
	}

	//#endregion

	//#region Methods

	//#region Public methods

	getTemplate() {
		const displayDownVote =
			this.#nbVote > 0
				? `
                    <div class="flex justify-content-center">
                        <button 
                            data-id="${this.#id}" 
                            class="button is-rounded ${PollChoice.CLASS_BTN_DOWNVOTE}" 
                            title="Downvote"
                            >
                            <i class="fas fa-caret-down fa-2x"></i>
                        </button>
                    </div>
                `
				: "";
		return `
            <div class="flex column" style="min-width: 25%; border: 1px solid gray; border-radius: 8px; margin: 5px; padding: 5px;">
                <div class="flex justify-content-center">
                    ${this.#label}
                </div>
                <div class="flex justify-content-center">
                    <button 
                        data-id="${this.#id}" 
                        class="button is-rounded ${PollChoice.CLASS_BTN_UPVOTE}" 
                        title="Upvote"
                        >
                        <i class="fas fa-caret-up fa-2x"></i>
                    </button>
                </div>
                <div class="flex justify-content-center">
                    ${this.#nbVote}
                </div>
                ${displayDownVote}
            </div>
        `;
	}

	toJSON() {
		return {
			id: this.#id,
			label: this.#label,
			nbVote: this.#nbVote,
		};
	}

	//#endregion

	//#region Private methods

	//#endregion

	//#endregion
}
