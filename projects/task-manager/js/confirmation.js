// Modal
const modalConfirm = document.getElementById("window-confirm");
// Labels
const labelConfirm = document.getElementById("lbl-confirmation");
// Buttons
const btnConfirm = document.getElementById("btn-confirm");
const btnCancelConfirmation = document.getElementById("btn-cancel-confirmation");

/**
 * Opens the modal
 * Display the question
 * Attach event handlers
 * @param {string} question
 * @param {Function?} fctConfirm
 * @param {Function?} fctCancel
 */
export function askConfirmation(question, fctConfirm = null, fctCancel = null) {
	openModalConfirmation();
	labelConfirm.innerText = question;
	// Confirmation
	btnConfirm.removeEventListener("click", () => confirm(fctConfirm));
	btnConfirm.addEventListener("click", () => confirm(fctConfirm));
	// Cancel
	btnCancelConfirmation.removeEventListener("click", () => cancelConfirmation(fctCancel));
	btnCancelConfirmation.addEventListener("click", () => cancelConfirmation(fctCancel));
}

/**
 * Calls the confirm function if it exists
 * Closes the modal
 * @param {Function?} fctConfirm
 */
function confirm(fctConfirm = null) {
	fctConfirm?.();
	closeModalConfirmation();
}

/**
 * Calls the cancel function if it exists
 * Closes the modal
 * @param {Function?} fctCancel
 */
function cancelConfirmation(fctCancel = null) {
	fctCancel?.();
	closeModalConfirmation();
}

/**
 * Empties label field
 * Opens the modal
 */
function openModalConfirmation() {
	labelConfirm.innerText = "";
	modalConfirm.showModal();
}

/**
 * Closes the modal
 */
function closeModalConfirmation() {
	modalConfirm.close();
}
