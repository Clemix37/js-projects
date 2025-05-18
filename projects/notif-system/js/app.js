import { DEFAULT_CONFIG } from "./config.js";
import Toast from "./Toast.js";
import ToastFactory from "./ToastFactory.js";
/**
 * @type {HTMLFormElement}
 */
const formRadioGroupPosition = document.getElementById("radiogroup-position");
/**
 * @type {HTMLInputElement}
 */
const titleInput = document.getElementById("notif-title");
/**
 * @type {HTMLInputElement}
 */
const contentInput = document.getElementById("notif-content");
/**
 * @type {HTMLInputElement}
 */
const timeoutInput = document.getElementById("notif-timeout");
/**
 * @type {HTMLButtonElement}
 */
const showNotifBtn = document.getElementById("show-notif-btn");
/**
 * @type {ToastFactory}
 */
const toastFactory = new ToastFactory();

function createNotificationWithUserConfig() {
	const title = titleInput.value;
	const content = contentInput.value;
	const timeout = +timeoutInput.value * 1000; // *1000 for ms
	const newToast = new Toast({ title, content, timeout });
	toastFactory
		.changeToastsContainerPosition(
			formRadioGroupPosition.elements["notif-position"].value || DEFAULT_CONFIG.POSITION,
		)
		.addToast(newToast)
		.displayToast(newToast.id);
}

showNotifBtn.addEventListener("click", createNotificationWithUserConfig);
