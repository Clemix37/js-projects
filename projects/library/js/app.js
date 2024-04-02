import Book from "./Book.js";
import Library from "./Library.js";

// PROPERTIES
const listBook = document.getElementById("listBook");
const nameBook = document.getElementById("nameBook");
const yearBook = document.getElementById("yearBook");
const authorBook = document.getElementById("authorBook");
const btnAddBook = document.getElementById("btnAddBook");
let library = null;
let isEditing = false;
let actualBook = null;

// EVENTS
/* Attach global events on page */
document.addEventListener('DOMContentLoaded', init);
btnAddBook.addEventListener("click", addBook);

// FUNCTIONS

/* Instantiate the library, display books */
function init() {
    library = new Library();
    displayBooks();
}

/* Empty the value of the fields */
function emptyFields() {
    nameBook.value = "";
    yearBook.value = "";
    authorBook.value = "";
}

/* For each book of the library, we display the content, a button to edit and one to delete, we attach events on those books */
function displayBooks() {
    let res = ``;
    for (let i = 0; i < library.books.length; i++) {
        const book = library.books[i];
        res += `
            <hr />
            <div class="ligne">
                <h3 class="subtitle">${book.name} (${book.year}) - ${book.author}</h3>
            </div>
            <div class="ligne">
                <button class="btnEditBook button is-rounded is-info" data-id="${book.id}"><i class="fas fa-edit"></i></button>
                <button class="btnDeleteBook button is-rounded is-danger" data-id="${book.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
    }
    listBook.innerHTML = res;
    attachEvents();
}

/* Get value of fields, add or save book in the library, display books, empty fields, reset value of variables */
function addBook() {
    const name = nameBook.value;
    const year = yearBook.value;
    const author = authorBook.value;
    if(!name || !year || !author) return alert("Every info is necessary");
    const obj = {name,year,author};
    if(!isEditing){
        const book = new Book(obj);
        library.addBook(book);
    }
    else {
        library.editBookFromId(actualBook.id, obj);
    }
    displayBooks();
    emptyFields();
    isEditing = false;
    actualBook = null;
    btnAddBook.innerHTML = `<i class="fas fa-plus" style="margin-right: 8px;"></i>Add`;
}

/* Attach click events on buttons to edit and delet books */
function attachEvents() {
    const btnDeleteBook = document.querySelectorAll('.btnDeleteBook');
    const btnEditBook = document.querySelectorAll('.btnEditBook');
    for (let i = 0; i < btnDeleteBook.length; i++) {
        const btn = btnDeleteBook[i];
        btn.addEventListener("click", onDeleteBook);
    }
    for (let i = 0; i < btnEditBook.length; i++) {
        const btn = btnEditBook[i];
        btn.addEventListener("click", onEditBook);
    }
}

/**
 * Returns the id from dataset of element
 * @param {HTMLElement} e 
 * @returns {number}
 */
const getBookIdFromElement = (e) => e.currentTarget.dataset.id;

/**
 * Remove book clicked from library
 * @param {HTMLElement} e 
 */
function onDeleteBook(e) {
    const id = getBookIdFromElement(e);
    if(!id) return;
    library.removeBook(id);
    displayBooks();
}

/**
 * Add values of clicked book in fields, change text of button
 * @param {HTMLElement} e 
 */
function onEditBook(e) {
    const id = getBookIdFromElement(e);
    if(!id) return;
    actualBook = library.getBookFromId(id);
    if(!actualBook) return;
    isEditing = true;
    nameBook.value = actualBook.name;
    yearBook.value = actualBook.year;
    authorBook.value = actualBook.author;
    btnAddBook.innerText = "Save";
}