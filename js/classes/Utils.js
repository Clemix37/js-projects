export default class Utils {
	//#region Properties

	static dateFormats = {
		DayMonthYearHyphens: "dd-mm-YYYY",
		DayMonthYearSlash: "dd/mm/YYYY",
	};
	static days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
	static months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	//#endregion

	//#region Constructor

	//#endregion

	//#region Accessors

	//#endregion

	//#region Public methods

	/**
	 * Get a random index from the array given as argument
	 * @param {any[]} arr
	 * @returns {number}
	 */
	static getRandomIndexFromArray(arr) {
		return Math.floor(Math.random() * arr.length);
	}

	/**
	 * Given a Date, returns it in string based on format as argument
	 * @param {Date} theDate
	 * @param {string} format
	 * @returns {string}
	 */
	static getDateAsString(theDate, format = null) {
		if (!theDate || !theDate instanceof Date) throw new Error("Date given is not instance of Date");
		const date = theDate.getDate();
		const day = Utils.days[theDate.getDay()];
		const dateDisplay = date < 10 ? `0${date}` : date;
		const month = theDate.getMonth() + 1;
		const monthDisplay = month < 10 ? `0${month}` : month;
		const year = theDate.getFullYear();
		switch (format) {
			case Utils.dateFormats.DayMonthYearHyphens:
				return `${dateDisplay}-${monthDisplay}-${year}`;
			case Utils.dateFormats.DayMonthYearSlash:
				return `${dateDisplay}/${monthDisplay}/${year}`;
			default:
				return `${day} ${date}, ${Utils.months[month]} ${year}`;
		}
	}

	/**
	 * Generates a unique id based on random and the date
	 * @returns {string}
	 */
	static genUniqueId() {
		return Date.now().toString(36) + Math.random().toString(36).substring(2);
	}

	/**
	 * Return a generated random color
	 * @returns {string}
	 */
	static genRandomColor() {
		const COLORS_CHARS = "0123456789abcdef";
		let color = `#`;
		for (let i = 0; i < 6; i++) {
			const randomIndex = Math.floor(Math.random() * COLORS_CHARS.length);
			color += COLORS_CHARS[randomIndex];
		}
		return color;
	}

	/**
	 * Given a date as string, returns it as Date if the format is correct
	 * If not, returns itself
	 * @param {string} dateString
	 * @param {string} format
	 * @returns {Date | string}
	 */
	static stringAsDate(dateString, format) {
		if (!format) throw new Error("No format given as arguments");
		switch (format) {
			case Utils.dateFormats.DayMonthYearHyphens:
			case Utils.dateFormats.DayMonthYearSlash:
				const date = +dateString.substring(0, 2);
				const month = +dateString.substring(3, 5);
				const year = +dateString.substring(6);
				return new Date(year, month - 1, date);
			default:
				return dateString;
		}
	}

	/**
	 * Sets the new value of the variable in parameters
	 * @param {string} nameVariable
	 * @param {any} newValueVariable
	 */
	static setCssVariable(nameVariable, newValueVariable) {
		const root = document.querySelector(":root");
		root.style.setProperty(`--${nameVariable}`, newValueVariable);
	}

	/**
	 * Gets the CSS variable with its name as argument
	 * @param {string} nameVariable
	 * @returns {any} value
	 */
	static getCssVariable(nameVariable) {
		const root = document.querySelector(":root");
		const rootStyle = getComputedStyle(root);
		const value = rootStyle.getPropertyValue(`--${nameVariable}`);
		return value;
	}

	/**
	 * Notify the user with the message in argument
	 * @param {string} message
	 * @returns {void}
	 */
	static notify(message) {
		// Notifications not supported
		if (!("Notification" in window)) return alert("This browser doesn't support Notifications");
		// User denied the use of Notifications OR no message
		if (Notification.permission === "denied" || !message) return;
		const displayNotification = () => new Notification(message);
		// Not granted for the moment
		if (Notification.permission !== "granted") {
			// We request access
			Notification.requestPermission().then((permission) => {
				// If user accepts it
				if (permission === "granted") displayNotification();
			});
		}
		// User granted us access to use Notifications
		else displayNotification();
	}

	/**
	 * Randomize an arry given as argument
	 * @param {any[]} arr
	 * @returns {any[]}
	 */
	static shuffleArray(arr = []) {
		return arr.sort((a, b) => 0.5 - Math.random());
	}

	/**
	 * Removes the duplicate from the array in argument
	 * @param {any[]} arr
	 * @returns {any[]}
	 */
	static removeDuplicateFromArray(arr = []) {
		return [...new Set([...arr])];
	}

	/**
	 * Returns the string given as argument but capitalized
	 * @param {string} str
	 * @returns {string}
	 */
	static capitalize(str = "") {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	/**
	 * Converts hex color into rgb color
	 * @param {string} hexColor
	 * @returns {{ r: number, g: number, b: number, }}
	 */
	static hexToRgb(hexColor) {
		const r = parseInt(hexColor.substring(0, 2), 16);
		const g = parseInt(hexColor.substring(2, 4), 16);
		const b = parseInt(hexColor.substring(4), 16);
		return { r, g, b };
	}

	//#region Windows

	/**
	 * Opens the modal by id or the modal directly
	 * @param {string | HTMLDialogElement} modal
	 */
	static openWindow(modal) {
		modal = typeof modal === "string" ? document.getElementById(modal) : modal;
		modal.showModal();
	}

	/**
	 * Closes the modal by id or the modal directly
	 * @param {string | HTMLDialogElement} modal
	 */
	static closeWindow(modal) {
		modal = typeof modal === "string" ? document.getElementById(modal) : modal;
		modal.close();
	}

	//#endregion

	//#endregion

	//#region Private methods

	//#endregion
}
