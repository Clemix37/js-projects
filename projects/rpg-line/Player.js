export default class Player {
	//#region Properties

	static SESSION_KEY = "cwd-rpg-line-player";
	static MAX_XP_BY_LEVEL = 5;
	#name;
	#level;
	#exp;
	#money;

	//#endregion

	//#region Constructor

	constructor({ name, level = 0, exp = 0, money = 10 }) {
		this.#name = name;
		this.#level = level < 0 ? 0 : level;
		this.#exp = exp < 0 ? 0 : exp;
		this.#money = money < 0 ? 0 : money;
	}

	//#endregion

	//#region Accessors

	get name() {
		return this.#name;
	}
	set name(value) {
		this.#name = value;
	}

	get level() {
		return this.#level;
	}
	set level(value) {
		this.#level = value;
	}

	get exp() {
		return this.#exp;
	}
	set exp(value) {
		if (value < 0) value = 0;
		this.#exp = value;
	}

	get money() {
		return this.#money;
	}
	set money(value) {
		if (value < 0) value = 0;
		this.#money = value;
	}

	//#endregion

	//#region Methods

	toJSON() {
		return {
			name: this.#name,
			money: this.#money,
			level: this.#level,
			exp: this.#exp,
		};
	}

	//#endregion
}
