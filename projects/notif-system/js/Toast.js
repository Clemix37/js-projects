import Utils from "../../../js/classes/Utils.js";

export default class Toast {
	// Properties
	/**
	 * @type {string}
	 */
	#id;
	/**
	 * @type {string}
	 */
	#title;
	/**
	 * @type {string}
	 */
	#content;
	/**
	 * Timeout delay (in ms) before destroying the toast
	 * @type {number}
	 */
	#timeout;
	static POSITIONS = {
		TOP_LEFT: "top-left",
		TOP_RIGHT: "top-right",
		BOTTOM_LEFT: "bottom-left",
		BOTTOM_RIGHT: "bottom-right",
	};
	// Constructor
	constructor({ title, content, timeout }) {
		// Checks
		if (!title) throw new Error("No title provided for toast");
		if (!content) throw new Error("No content provided for toast");
		// Initialization
		this.#id = Utils.genUniqueId();
		this.#title = title;
		this.#content = content;
		this.#timeout = timeout;
	}
	// Accessors
	get id() {
		return this.#id;
	}
	get title() {
		return this.#title;
	}
	set title(value) {
		this.#title = value;
	}
	get content() {
		return this.#content;
	}
	set content(value) {
		this.#content = value;
	}
	get timeout() {
		return this.#timeout;
	}
	set timeout(value) {
		this.#timeout = value;
	}
	// Methods
	getTemplate() {
		return `
            <div id="toast-${this.#id}" class="toast">
                <div class="flex items-center">
                    <div class="flex width-100">
                        <h1 class="toast-title">${this.#title}</h1>
                    </div>
                    <div class="flex justify-end">
                        <button class="btn-delete-toast" data-id="${
							this.#id
						}"><i class="fas fa-times fa-2x"></i></button>
                    </div>
                </div>
                <div class="flex items-center toast-content">
                    ${this.#content}
                </div>
                <div class="toast-animation"></div>
            </div>
        `;
	}
}
