export default class Display {
	//#region Properties

	static ID_STORE = "tm-display-view";
	static DISPLAY_VIEWS = {
		DEFAULT: "tm-default-view",
		GRID: "tm-grid-view",
	};

	/**
	 * @type {string}
	 */
	#view;

	//#endregion

	//#region Constructor

	constructor({ view = null }) {
		this.#view = view ?? Display.DISPLAY_VIEWS.DEFAULT;
	}

	//#endregion

	//#region Accessors

	//#endregion

	//#region Methods

	//#region Public methods

	getTemplate() {
		if (this.#view === Display.DISPLAY_VIEWS.GRID) this.#getGridTemplate();
		else return this.#getDefaultTemplate();
	}

	toJSON() {
		return {
			view: this.#view,
		};
	}

	//#endregion

	//#region Private methods

	#getDefaultTemplate() {
		return ``;
	}

	#getGridTemplate() {
		return ``;
	}

	//#endregion

	//#endregion
}
