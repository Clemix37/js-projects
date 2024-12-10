export default class Poll {
	//#region Properties

	static ID_STORE = "cwd-poll";
	/**
	 * @type {label}
	 */
	#label;
	/**
	 * @type {string[]}
	 */
	#idsChoices;

	//#endregion

	//#region Constructor

	/**
	 * Creates the instance of the Poll
	 * @constructor
	 * @param {{ label: string, idsChoices; string[], }} obj
	 */
	constructor({ label, idsChoices = [] }) {
		this.#label = label;
		this.#idsChoices = idsChoices;
	}

	//#endregion

	//#region Accessors

	get label() {
		return this.#label;
	}
	get idsChoices() {
		return this.#idsChoices;
	}
	set label(value) {
		this.#label = value;
	}
	set idsChoices(value) {
		this.#idsChoices = value;
	}

	//#endregion

	//#region Methods

	//#region Public methods

	/**
	 * Gets the template of choices
	 * @param {PollChoice[]} listChoices
	 * @returns {string}
	 */
	getTemplate(listChoices = []) {
		return `
            <div class="flex column" style="border: 1px solid white; border-radius: 8px; min-height: 200px; margin: 10px;">
                <div class="flex justify-content-center">
                    <h1 class="title has-text-centered">${this.#label}</h1>
                </div>
                <div class="flex justify-content-center">
                    <button id="btn-add-choice" class="button is-rounded">
                        <i class="fas fa-plus" style="margin-right: 8px;"></i>
                        Add Choice
                    </button>
                </div>
                <div class="flex justify-content-center">
                    <div class="flex column">
                        <div class="flex justify-content-center">
                            <h3 class="subtitle has-text-centered">Choices:</h3>
                        </div>
                        <div class="flex justify-content-center" style="flex-wrap: wrap;">
                            ${listChoices
								.filter((choice) => this.#idsChoices.includes(choice.id))
								.reduce((acc, choice) => acc + choice.getTemplate(), "")}
                        </div>
                    </div>
                </div>
                ${
					listChoices.length > 0
						? `
                            <div class="flex justify-content-center">
                                <button id="btn-end-poll" class="button is-rounded is-danger">
                                    <i class="fas fa-hourglass-end" style="margin-right: 8px;"></i>
                                    End poll
                                </button>
                            </div>
                        `
						: ""
				}
            </div>
        `;
	}

	toJSON() {
		return {
			label: this.#label,
			idsChoices: this.#idsChoices,
		};
	}

	//#endregion

	//#region Private methods

	//#endregion

	//#endregion
}
