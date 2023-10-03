import Book from "./Book.js";
import Library from "./Library.js";

const listBook = document.getElementById("listBook");
const nameBook = document.getElementById("nameBook");
const yearBook = document.getElementById("yearBook");
const authorBook = document.getElementById("authorBook");
const btnAddBook = document.getElementById("btnAddBook");
let library = null;
let isEditing = false;
let actualBook = null;

/* Instantiate the library, display books */
const init = () => {
    library = new Library();
    displayBooks();
};

/* Empty the value of the fields */
const emptyFields = () => {
    nameBook.value = "";
    yearBook.value = "";
    authorBook.value = "";
};

/* For each book of the library, we display the content, a button to edit and one to delete, we attach events on those books */
const displayBooks = () => {
    let res = ``;
    for (let i = 0; i < library.books.length; i++) {
        const book = library.books[i];
        res += `<div class="ligne">
            ${book.name} (${book.year}) - ${book.author} 
            <button class="btnEditBook button is-rounded" data-id="${book.id}">Modifier</button>
            <button class="btnDeleteBook button is-rounded" data-id="${book.id}">Supprimer</button>
        </div>`;
    }
    listBook.innerHTML = res;
    attachEvents();
};

/* Get value of fields, add or save book in the library, display books, empty fields, reset value of variables */
const addBook = () => {
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
    btnAddBook.innerText = "Add";
};

/* Attach click events on buttons to edit and delet books */
const attachEvents = () => {
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
};

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
const onDeleteBook = (e) => {
    const id = getBookIdFromElement(e);
    if(!id) return;
    library.removeBook(id);
    displayBooks();
};

/**
 * Add values of clicked book in fields, change text of button
 * @param {HTMLElement} e 
 */
const onEditBook = (e) => {
    const id = getBookIdFromElement(e);
    if(!id) return;
    actualBook = library.getBookFromId(id);
    if(!actualBook) return;
    isEditing = true;
    nameBook.value = actualBook.name;
    yearBook.value = actualBook.year;
    authorBook.value = actualBook.author;
    btnAddBook.innerText = "Save";
};

/* Attach global events on page */
document.addEventListener('DOMContentLoaded', init);
btnAddBook.addEventListener("click", addBook);