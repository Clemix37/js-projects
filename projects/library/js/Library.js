import Book from "./Book.js";

class Library {
    // Properties
    #books;
    // Constructor
    constructor(){
        this.#books = [];
    }
    // Getters and setters
    get books(){return this.#books;}
    // Public methods
    /**
     * Add the book inside the private property
     * @param {Book} book 
     */
    addBook(book){
        if(!book instanceof Book) throw new TypeError("Parameter is not type of Book");
        this.#books.push(book);
    }
    /**
     * Delete the book with this id from the books property
     * @param {number} bookId 
     */
    removeBook(bookId){
        this.#books = this.#books.filter(book => book.id !== bookId);
    }
    /**
     * Find the book with the same id and returns it
     * @param {number} bookId 
     * @returns {Book}
     */
    getBookFromId(bookId){
        return this.#books.find(b => b.id === bookId);
    }
    /**
     * Edit the content of the book with the id given as parameter
     * @param {number} bookId 
     * @param {object} param1 
     */
    editBookFromId(bookId, {name,year,author}){
        this.#books.map(b => {
            if(b.id !== bookId) return b;
            b.name = name;
            b.year = year;
            b.author = author;
            return b;
        });
    }
}

export default Library;