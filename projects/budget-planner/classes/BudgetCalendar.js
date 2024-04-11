import Calendar from "../../../js/Calendar.js";
import store from "../../../js/SessionStore.js";
import Utils from "../../../js/Utils.js";
import { addOperation } from "../budgetPlanner.js";
import Operation from "./Operation.js";

export default class BudgetCalendar extends Calendar {

    //#region Properties

    /**
     * @type {HTMLElement}
     */
    #balanceContainer;
    /**
     * @type {Operation[]}
     */
    #operations;
    /**
     * @type {number}
     */
    #balance;
    /**
     * @type {string}
     */
    static operationsKeySession = "budget-operations";

    //#endregion

    //#region Constructor

    /**
     * Create a new BudgetCalendar based on configuration
     * @param {object} obj 
     * @param {string} obj.idBalanceContainer
     */
    constructor(obj = {}){
        super(obj);
        if(!obj.idBalanceContainer) throw new Error("No id for balance container");
        this.#balanceContainer = document.getElementById(obj.idBalanceContainer);
        this.#operations = store.get(BudgetCalendar.operationsKeySession, []).map(op => new Operation(op));
        this.#balance = 0;
        this.#calculateBalance();
    }

    //#endregion

    //#region Accessors

    /**
     * @returns {Operation[]}
     */
    get operations() { return this.#operations; }

    //#endregion

    //#region Public methods

    /**
     * Add the operation inside the array
     * @param {Operation|null} newOperation 
     */
    addOperation(newOperation = null){
        if(!newOperation) return;
        if(!newOperation instanceof Operation) throw new Error("New operation is not instance of Operation");
        this.#operations.push(newOperation);
        this.display();
    }

    /**
     * Edit the operation based on the id
     * @param {Operation|null} operationToEdit 
     */
    editOperation(operationToEdit = null){
        if(!operationToEdit) return;
        if(!operationToEdit instanceof Operation) throw new Error("operation to edit is not instance of Operation");
        this.#operations = this.#operations.map(op => {
            if(operationToEdit.id !== op.id) return op;
            console.log(operationToEdit);
            op.amount = operationToEdit.amount;
            op.date = operationToEdit.date;
            op.name = operationToEdit.name;
            return op;
        });
        this.display();
    }

    display(){
        this.displayCurrentMonth();
        this.#displayOperations();
        this.#attachEvents();
        this.#calculateBalance();
        this.#saveOperations();
    }

    //#endregion

    //#region Private methods

    #displayOperations(){
        const nbDays = this.nbDaysInMonth;
        const actualYear = this.currentDateCalendar.getFullYear();
        const actualMonth = this.currentDateCalendar.getMonth();
        for (let i = 1; i <= nbDays; i++) {
            const d = new Date(actualYear, actualMonth, i);
            const operationsOfDays = this.#operations.filter(op => op.date.toString() === d.toString());
            const displayedDate = Utils.getDateAsString(d, Utils.dateFormats.DayMonthYearHyphens);
            const contentOfDate = document.getElementById(`content-${displayedDate}`);
            let displayContentOfDate = "";
            for (let k = 0; k < operationsOfDays.length; k++) {
                const op = operationsOfDays[k];
                displayContentOfDate += op.getTemplate();
            }
            contentOfDate.innerHTML = displayContentOfDate;
        }
    }

    /**
     * Filter the operations different from the id given as argument
     * @param {HTMLElement} e 
     */
    #deleteOperation(e){
        const id = e.currentTarget.dataset.id;
        if(!id) return;
        this.#operations = this.#operations.filter(op => op.id !== id);
        this.display();
    }

    /**
     * Gets the operation and opens the window to edit it
     * @param {HTMLElement} e 
     */
    #editOperationElement(e){
        const id = e.currentTarget.dataset.id;
        if(!id) return;
        const operation = this.#operations.find(op => op.id === id);
        if(!operation) return;
        addOperation(operation);
    }

    /**
     * Save the operations of the calendar in the localStorage
     */
    #saveOperations(){
        store.set(BudgetCalendar.operationsKeySession, this.#operations);
    }

    #calculateBalance(){
        let count = 0;
        const currentDate = new Date();
        const operationsToTake = this.#operations.filter(op => op.date <= currentDate);
        for (let i = 0; i < operationsToTake.length; i++) {
            const op = operationsToTake[i];
            console.log(op.amount);
            count += op.amount;
        }
        this.#balance = count;
        this.#displayBalance();
    }

    #displayBalance(){
        const isPositive = this.#balance > 0;
        console.log(this.#balance);
        this.#balanceContainer.innerText = `${isPositive ? "+" : ""} ${this.#balance}€`;
    }

    //#region Events

    #attachEvents(){
        this.#attachOperationsEvents();
    }

    #attachOperationsEvents(){
        const btnsEdit = document.getElementsByClassName(Operation.CLASS_BTN_EDIT);
        const that = this;
        for (let i = 0; i < btnsEdit.length; i++) {
            const btnEdit = btnsEdit[i];
            btnEdit.removeEventListener("click", this.#editOperationElement);
            btnEdit.addEventListener("click", (e) => that.#editOperationElement(e));
        }
        const btnsDelete = document.getElementsByClassName(Operation.CLASS_BTN_DELETE);
        for (let i = 0; i < btnsDelete.length; i++) {
            const btnDelete = btnsDelete[i];
            btnDelete.removeEventListener("click", this.#deleteOperation);
            btnDelete.addEventListener("click", (e) => that.#deleteOperation(e));
        }
    }

    //#endregion

    //#endregion

}