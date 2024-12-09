const ID_WINDOW = "window-confirmation";
const ID_LABEL_CONFIRMATION = "lbl-confirmation";
const IDS_BTNS = {
	CONFIRM: "btn-confirm",
	CANCEL: "btn-cancel-confirmation",
};
let fctCancel = null;
let fctConfirm = null;

/**
 * Ask confirmation by opening the window with the desirable label
 * @param {string} labelContent
 * @param {Function?} fctOnConfirmation
 * @param {Function?} fctOnCancel
 */
function askConfirmation(labelContent, fctOnConfirmation = null, fctOnCancel = null) {
	displayConfirmation(labelContent);
	fctConfirm = fctOnConfirmation;
	fctCancel = fctOnCancel;
}

//#region Events

/**
 * Link buttons and functions from JS
 */
function addEventsOnBtns() {
	const btnConfirm = document.getElementById(IDS_BTNS.CONFIRM);
	const btnCancel = document.getElementById(IDS_BTNS.CANCEL);
	// Confirmation
	btnConfirm.removeEventListener("click", confirm);
	btnConfirm.addEventListener("click", confirm);
	// Cancellation
	btnCancel.removeEventListener("click", cancelConfirmation);
	btnCancel.addEventListener("click", cancelConfirmation);
}

//#endregion

/**
 * Change the label inside the window
 * Display the modal
 * Add events on the modal
 * @param {string} labelContent
 */
function displayConfirmation(labelContent) {
	const lblConfirmation = document.getElementById(ID_LABEL_CONFIRMATION);
	if (lblConfirmation) lblConfirmation.innerText = labelContent;
	document.getElementById(ID_WINDOW)?.showModal();
	addEventsOnBtns();
}

/**
 * Closes the modal
 * Empty variable
 */
function closeConfirmationWindow() {
	document.getElementById(ID_WINDOW)?.close();
	fctConfirm = null;
	fctCancel = null;
}

/**
 * Call the function on confirmation if it exists
 * Closes the modal
 */
function confirm() {
	fctConfirm?.();
	closeConfirmationWindow();
}

/**
 * Call the function on cancel if it exists
 * Closes the modal
 */
function cancelConfirmation() {
	fctCancel?.();
	closeConfirmationWindow();
}

export { askConfirmation };
