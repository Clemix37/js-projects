class SessionStore {
	//#region Properties

	/**
	 * @type {object}
	 */
	#data;

	//#endregion

	//#region Constructor

	/**
	 * Constructor of the SessionStore class
	 */
	constructor() {
		this.#data = {};
		this.#getEveryValueFromLocalStorage();
	}

	//#endregion

	//#region Accessors

	//#endregion

	//#region Public methods

	/**
	 * Get the value of the key in the localStorage
	 * Store it in our data object
	 * @param {string} key
	 * @param {object|string|number} defaultValue
	 * @param {string?} oldKey
	 * @returns {object|string|number}
	 */
	get(key, defaultValue, oldKey) {
		const value = this.#data[key] ?? this.#data[oldKey ?? key] ?? defaultValue;
		this.#save(key, value);
		return value;
	}

	/**
	 * Sets in the data object the value, save the localStorage
	 * @param {string} key
	 * @param {object|string|number} value
	 */
	set(key, value) {
		this.#save(key, value);
	}

	//#endregion

	//#region Private methods

	/**
	 * Save in the data object and saves the session in localStorage
	 * @param {string} key
	 * @param {object|string|number} value
	 */
	#save(key, value) {
		this.#saveInData(key, value);
		this.#saveSession();
	}

	/**
	 * Store in the data object of the actual instance the value
	 * @param {string} key
	 * @param {object|string|number} parsedValue
	 */
	#saveInData(key, parsedValue) {
		this.#data[key] = parsedValue;
	}

	/**
	 * Save the data object in the localStorage
	 */
	#saveSession() {
		const dataKeys = Object.keys(this.#data);
		for (let i = 0; i < dataKeys.length; i++) {
			const key = dataKeys[i];
			const originalValue = this.#data[key];
			const stringifiedValue = JSON.stringify(originalValue);
			localStorage.setItem(key, stringifiedValue);
		}
	}

	/**
	 * Gets every key in localStorage and save them in the data object
	 */
	#getEveryValueFromLocalStorage() {
		const keysInLocalStorage = Object.keys(localStorage);
		for (let i = 0; i < keysInLocalStorage.length; i++) {
			const key = keysInLocalStorage[i];
			const valueInSession = localStorage.getItem(key);
			try {
				this.#data[key] = JSON.parse(valueInSession);
			} catch (err) {
				console.error(`Error when parsing ${key} from localStorage`);
			}
		}
	}

	//#endregion
}

const store = new SessionStore();
export default store;
