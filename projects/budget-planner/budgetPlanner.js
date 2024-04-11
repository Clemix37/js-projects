import Utils from "../../js/Utils.js";
import BudgetCalendar from "./classes/BudgetCalendar.js";
import Operation from "./classes/Operation.js";

// PROPERTIES
const budgetCalendar = new BudgetCalendar({
    idContainer: "calendar",
    idTitle: "month-calendar",
    idBalanceContainer: "balance",
});
// NAVIGATION
const btnNextMonth = document.getElementById("btn-next-month");
const btnPreviousMonth = document.getElementById("btn-previous-month");
// WINDOWS
const windowAddOperation = document.getElementById("window-add-operation");
// BUTTONS
const btnAddOperation = document.getElementById("btn-add-operation");
const btnCloseOperation = document.getElementById("btn-close-operation-window");
const btnSaveOperation = document.getElementById("btn-save-operation-window");
// WINDOW OPERATION
const inputOperationName = document.getElementById("operation-name");
const inputOperationDate = document.getElementById("operation-date");
const inputOperationAmount = document.getElementById("operation-amount");
/**
 * @type {Operation|null}
 */
let operationInEdition = null;

// EVENTS
btnNextMonth.addEventListener("click", nextMonth);
btnPreviousMonth.addEventListener("click", previousMonth);
// OPERATIONS
btnAddOperation.addEventListener("click", () => addOperation());
btnCloseOperation.addEventListener("click", closeOperationWindow);
btnSaveOperation.addEventListener("click", saveOperation);

// FUNCTIONS
function displayContent(){
    budgetCalendar.display();
}

//#region Operations

function addOperation(operationToEdit = null){
    operationInEdition = operationToEdit;
    const currentDate = new Date();
    // No title by default
    inputOperationName.value = operationInEdition?.name ?? "";
    // We display as default the value of the current date
    inputOperationDate.value = operationInEdition?.date 
        ? Utils.getDateAsString(operationInEdition?.date, Utils.dateFormats.DayMonthYearSlash) 
        : Utils.getDateAsString(currentDate, Utils.dateFormats.DayMonthYearSlash);
    // Default value as 0
    inputOperationAmount.value = operationInEdition?.amount ?? 0;
    // Opens the modal
    windowAddOperation.showModal();
}

function saveOperation(){
    const isEdition = !!operationInEdition;
    const name = inputOperationName.value;
    const date = Utils.stringAsDate(inputOperationDate.value, Utils.dateFormats.DayMonthYearSlash);
    const amount = +inputOperationAmount.value;
    console.log(name, date, amount);
    if(isEdition){
        operationInEdition.name = name;
        operationInEdition.date = date;
        operationInEdition.amount = amount;
        budgetCalendar.editOperation(operationInEdition);
    }
    else {
        const newOperation = new Operation({
            name,
            date,
            amount,
        });
        budgetCalendar.addOperation(newOperation);
    }
    closeOperationWindow();
}

function closeOperationWindow(){
    windowAddOperation.close();
    operationInEdition = null;
    // We empty each input field
    inputOperationName.value = "";
    inputOperationDate.value = "";
    inputOperationAmount.value = 0;
}

//#endregion

//#region Navigation

function nextMonth(){
    budgetCalendar.nextMonth();
}

function previousMonth(){
    budgetCalendar.previousMonth();
}

//#endregion

displayContent();

export { addOperation };