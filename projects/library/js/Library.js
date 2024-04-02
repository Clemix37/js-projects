import store from "../../../js/SessionStore.js";
import Book from "./Book.js";

export default class Library {

    //#region Properties

    #books;
    static booksSessionKey = "library-books";

    //#endregion

    //#region Constructor

    constructor(){
        this.#books = store.get(Library.booksSessionKey, []).map(b => new Book(b));
    }

    //#endregion

    //#endregion

    //#region Accessors

    get books() { return this.#books; }

    //#endregion

    //#region Public methods

    /**
     * Add the book inside the private property
     * @param {Book} book 
     */
    addBook(book){
        if(!book instanceof Book) throw new TypeError("Parameter is not type of Book");
        this.#books.push(book);
        this.#saveBooks();
    }
    
    /**
     * Delete the book with this id from the books property
     * @param {number} bookId 
     */
    removeBook(bookId){
        this.#books = this.#books.filter(book => book.id !== bookId);
        this.#saveBooks();
    }
    /**
     * Find the book with the same id and returns it
     * @param {number} bookId 
     * @returns {Book|null}
     */
    getBookFromId(bookId){
        return this.#books.find(b => b.id === bookId);
    }

    /**
     * Edit the content of the book with the id given as parameter
     * @param {number} bookId 
     * @param {object} param1 
     */
    editBookFromId(bookId, { name, year, author }){
        this.#books = this.#books.map(b => {
            if(b.id !== bookId) return b;
            b.name = name;
            b.year = year;
            b.author = author;
            return b;
        });
        this.#saveBooks();
    }

    //#endregion

    //#region Private methods

    #saveBooks(){
        store.set(Library.booksSessionKey, this.#books);
    }

    //#endregion

}