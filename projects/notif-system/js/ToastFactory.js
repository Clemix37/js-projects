import Toast from "./Toast.js";

export default class ToastFactory {
	// Properties
	static ID_TOAST_FACTORY = "toast-factory";
	/**
	 * @type {Toast[]}
	 */
	#toasts;
	/**
	 * @type {HTMLDivElement}
	 */
	#toastsContainer;
	// Constructor
	constructor() {
		this.#toasts = [];
		this.#createFactoryDiv();
	}
	/**
	 * Creates a toast container
	 * @returns {undefined}
	 */
	#createFactoryDiv() {
		// Won't create a new factory if one already exists
		if (document.querySelector(ToastFactory.ID_TOAST_FACTORY)) return;
		const toastsContainer = document.createElement("div");
		toastsContainer.id = ToastFactory.ID_TOAST_FACTORY;
		document.body.appendChild(toastsContainer);
		// Store toast container
		this.#toastsContainer = document.querySelector(`#${ToastFactory.ID_TOAST_FACTORY}`);
	}
	/**
	 * Check if the given toast id exist inside current toast array
	 * @param {string} idToast
	 * @returns {boolean}
	 */
	#toastExists(idToast) {
		return this.#toasts.find((toast) => toast.id === idToast);
	}
	/**
	 * Create a timeout before destroying the toast
	 * @param {string} idToast
	 * @param {number} timeout in ms
	 */
	#destroyAfterTimeout(idToast, timeout) {
		setTimeout(() => {
			this.#deleteToast(idToast);
		}, timeout);
	}
	/**
	 * Based on new position in argument, returns a string for toast position
	 * @param {string} newPosition
	 * @returns {string}
	 */
	#getCssClassesOfPosition(newPosition) {
		let classes = "";
		if (newPosition === Toast.POSITIONS.TOP_LEFT || newPosition === Toast.POSITIONS.TOP_RIGHT) {
			classes += "top";
			classes += newPosition === Toast.POSITIONS.TOP_LEFT ? " left" : " right";
		} else if (newPosition === Toast.POSITIONS.BOTTOM_LEFT || newPosition === Toast.POSITIONS.BOTTOM_RIGHT) {
			classes += "bottom";
			classes += newPosition === Toast.POSITIONS.BOTTOM_LEFT ? " left" : " right";
		}
		return classes;
	}
	/**
	 * Attach to the delete toast buttons the click events
	 */
	#attachDeleteToastBtnsEvents() {
		const btns = document.querySelectorAll(".btn-delete-toast");
		for (let i = 0; i < btns.length; i++) {
			const btn = btns[i];
			btn.removeEventListener("click", (e) => this.#deleteToast(e.currentTarget.dataset.id));
			btn.addEventListener("click", (e) => this.#deleteToast(e.currentTarget.dataset.id));
		}
	}
	/**
	 * Remobes the div from the DOM
	 * Filter the current array
	 * @param {string} idToast
	 * @returns {undefined}
	 */
	#deleteToast(idToast) {
		if (!idToast) return;
		document.getElementById(`toast-${idToast}`)?.remove();
		this.#toasts = this.#toasts.filter((toast) => toast.id !== idToast);
	}
	/**
	 * Changes toast container position
	 * @param {string} newPosition
	 * @returns {this}
	 */
	changeToastsContainerPosition(newPosition) {
		// Incorrect position
		if (!newPosition || !Object.values(Toast.POSITIONS).includes(newPosition))
			throw new Error("No valid position provided for toast");
		// Delete current classes already added
		this.#toastsContainer.classList.remove(...["top", "bottom", "left", "right"]);
		this.#toastsContainer.classList.add(...this.#getCssClassesOfPosition(newPosition).split(" "));
		return this;
	}
	/**
	 * Adds the toast inside current factory
	 * @param {Toast} newToast
	 * @returns {this} current instance
	 */
	addToast(newToast) {
		if (!newToast instanceof Toast) throw new Error("Toast is not instance of Toast");
		this.#toasts.push(newToast);
		return this;
	}
	/**
	 * Check if toast exist
	 * @param {string} idToast
	 * @return {this}
	 */
	displayToast(idToast) {
		if (!this.#toastExists(idToast)) throw new Error(`Toast with id ${idToast} doesn't exists`);
		const toastAsked = this.#toasts.find((toast) => toast.id === idToast);
		this.#toastsContainer.innerHTML += toastAsked?.getTemplate();
		const toastAnimationDom = document.getElementById(`toast-${idToast}`).querySelector(".toast-animation");
		toastAnimationDom.style["-webkit-animation-duration"] = toastAsked.timeout / 1000 + "s";
		toastAnimationDom.classList.add("animate"); // Start the animation
		this.#attachDeleteToastBtnsEvents();
		this.#destroyAfterTimeout(toastAsked.id, toastAsked.timeout);
		return this;
	}
}
