import GroceryItem from "./GroceryItem.js";
import GroceryList from "./GroceryList.js";

// PROPERTIES
const btnAddItem = document.getElementById('btnAddItem');
const item = document.getElementById('item');
const items = document.getElementById('items');
const groceryList = new GroceryList();

// EVENTS
btnAddItem.addEventListener('click', addItem);
item.addEventListener('keyup', (e) => {
    if(e.key == "Enter") addItem();
});

// FUNCTIONS
function addItem(){
    if(!item.value)return;
    const title = item.value;
    const newItem = new GroceryItem({
        id: groceryList.getNextId(),
        title,
    });
    groceryList.addItem(newItem).display(items);
    item.value = "";
    attachEvents();
}

function attachEvents(){
    attachEditEvent();
    attachDeletEvent();
    attachStatusEvent();
}

/* Attach the edit item function on every edit button */
function attachEditEvent(){
    const btnsEdit = document.getElementsByClassName(GroceryList.BTN_CLASS_EDIT);
    for (let i = 0; i < btnsEdit.length; i++) {
        const btnEdit = btnsEdit[i];
        btnEdit.removeEventListener("click", editItem);
        btnEdit.addEventListener("click", editItem);
    }
}

/* Attach the delete item function on every delete button */
function attachDeletEvent(){
    const btnsDelete = document.getElementsByClassName(GroceryList.BTN_CLASS_DELETE);
    for (let i = 0; i < btnsDelete.length; i++) {
        const btnDelete = btnsDelete[i];
        btnDelete.removeEventListener("click", deleteItem);
        btnDelete.addEventListener("click", deleteItem);
    }
}

/* Attach the change status function on every status button */
function attachStatusEvent(){
    const btnsDone = document.getElementsByClassName(GroceryList.BTN_CLASS_STATUS);
    for (let i = 0; i < btnsDone.length; i++) {
        const btnStatus = btnsDone[i];
        btnStatus.removeEventListener("click", changeStatus);
        btnStatus.addEventListener("click", changeStatus);
    }
}

/**
 * Edit the clicked element
 * @param {HTMLElement} e 
 */
function editItem(e){
    const id = getIdFromElement(e);
    if(!id) return;
    const theItem = groceryList.getItem(id);
    if(!theItem) return;
    item.value = theItem.title;
    // @todo
}

/**
 * Delete the item clicked
 * @param {HTMLElement} e 
 */
function deleteItem(e){
    const id = getIdFromElement(e);
    if(!id) return;
    groceryList.deleteItem(id).display(items);
    attachEvents();
}

/**
 * Change the status of the element clicked
 * @param {HTMLElement} e
 */
function changeStatus(e){
    const id = getIdFromElement(e);
    if(!id) return;
    groceryList.changeStatus(id).display(items);
    attachEvents();
}

/**
 * Gets the id in the dataset of the given element
 * @param {HTMLElement} e 
 * @returns {number|NaN}
 */
function getIdFromElement(e){
    return +e.currentTarget.dataset.id;
}