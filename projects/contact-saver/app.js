import store from "../../js/classes/SessionStore.js";
import Utils from "../../js/classes/Utils.js";
import Contact from "./Contact.js";

// Elements
const windowAddContact = document.getElementById("window-add-contact");
const divListContacts = document.getElementById("list-contacts");
// Inputs
const contactName = document.getElementById("contact-name");
const contactNumber = document.getElementById("contact-number");
// Buttons
const btnSaveContactWindow = document.getElementById("btn-save-contact-window");
const btnCloseContactWindow = document.getElementById("btn-close-contact-window");
const btnAddContact = document.getElementById("btn-add-contact");

// Store
const KEY_STORE_CONTACTS = "cwd-list-contacts";
/**
 * @type {Contact[]}
 */
let listContacts = store.get(KEY_STORE_CONTACTS, []).map((c) => new Contact(c));
/**
 * @type {Contact | null}
 */
let contact = null;

//#region Events

btnAddContact.addEventListener("click", () => addContact());
btnCloseContactWindow.addEventListener("click", closeContactModal);
btnSaveContactWindow.addEventListener("click", saveContact);

//#endregion

function displayContacts() {
	const display = listContacts.reduce((acc, curr) => acc + curr.getTemplate(), "");
	divListContacts.innerHTML = display;
}

//#region Update

/**
 * Save data inside the store
 * Display the content
 */
function update() {
	save();
	display();
}

/**
 * Will display contacts
 */
function display() {
	displayContacts();
	const allBtnsEdit = document.querySelectorAll(`.${Contact.CLASS_BTN_EDIT}`);
	const fctEdit = (e) => addContact(listContacts.find((c) => c.id === e.currentTarget.dataset.id));
	for (let i = 0; i < allBtnsEdit.length; i++) {
		const btnEdit = allBtnsEdit[i];
		btnEdit.removeEventListener("click", fctEdit);
		btnEdit.addEventListener("click", fctEdit);
	}
	const allBtnsDel = document.querySelectorAll(`.${Contact.CLASS_BTN_DELETE}`);
	for (let i = 0; i < allBtnsDel.length; i++) {
		const btnDel = allBtnsDel[i];
		btnDel.removeEventListener("click", deleteFromBtn);
		btnDel.addEventListener("click", deleteFromBtn);
	}
}

/**
 * Save the list inside the store
 */
function save() {
	store.set(KEY_STORE_CONTACTS, listContacts);
}

/**
 * Gets the id from the dataset
 * Deletes it from the array
 * Update
 * @param {Event} e
 */
function deleteFromBtn(e) {
	const { id } = e.currentTarget.dataset;
	listContacts = listContacts.filter((c) => c.id !== id);
	update();
}

//#endregion

//#region Contact Window

/**
 * Display values inside fields
 * Opens the window
 * @param {Contact | null} contactToEdit
 */
function addContact(contactToEdit = null) {
	contact = contactToEdit;
	// Store values inside fields
	contactName.value = contact?.name ?? "";
	contactNumber.value = contact?.tel ?? "";
	// Opens the window
	Utils.openWindow(windowAddContact);
}

/**
 * Add the contact inside the
 * Close the modal
 * Update the store and the display
 */
function saveContact() {
	const isEdition = !!contact;
	if (isEdition) {
		listContacts = listContacts.map((c) => {
			if (c.id !== contact.id) return c;
			c.name = contactName.value;
			c.tel = contactNumber.value;
			return c;
		});
	} else {
		listContacts.push(
			new Contact({
				name: contactName.value,
				tel: contactNumber.value,
			}),
		);
	}
	closeContactModal();
	update();
}

/**
 * Empty fields and contact
 * Closes the modal
 */
function closeContactModal() {
	Utils.closeWindow(windowAddContact);
	// Empty fields and contact
	contactName.value = "";
	contactNumber.value = "";
	contact = null;
}

//#endregion

update();
