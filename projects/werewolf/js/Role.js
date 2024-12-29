export default class Role {
	//#region Properties

	#name;
	#orderInNight;

	//#endregion

	//#region Constructor

	constructor(name, orderInNight) {
		this.#name = name;
		this.#orderInNight = orderInNight;
	}

	//#endregion

	//#region Accessors

	get name() {
		return this.#name;
	}
	set name(value) {
		this.#name = value;
	}
	get orderInNight() {
		return this.#orderInNight;
	}
	set orderInNight(value) {
		this.#orderInNight = value;
	}

	//#endregion

	//#region Methods

	//#region Public methods

	getTemplate() {
		return `
            <div class="flex justify-content-center">
                <h3 class="subtitle">${this.#name} (${this.#orderInNight})</h3>
            </div>
        `;
	}

	//#endregion

	//#region Private methods

	//#endregion

	//#endregion
}
