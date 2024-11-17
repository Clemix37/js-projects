import store from "../../js/SessionStore.js";
import Task from "./Task.js";
import TodoApp from "./TodoApp.js";

//#region Properties

const ID_DIV_TASKS = "div-tasks";
const ID_TXT_SEARCH = "txt-search-task";
const ID_BTN_ADD_TASK = "btn-add-task";
// Gets data from session
const todoAppFromSession = store.get(TodoApp.SESSION_TODO_APP_KEY, {});
const todoApp = new TodoApp({
	tasks: todoAppFromSession.tasks?.map((task) => new Task(task)) ?? [],
});
// Divs
const divTasks = document.getElementById(ID_DIV_TASKS);
// Buttons
const btnAddTask = document.getElementById(ID_BTN_ADD_TASK);
// Inputs
const txtSearchTask = document.getElementById(ID_TXT_SEARCH);

//#endregion

// When user makes an input, we filter the display based on the input
txtSearchTask.addEventListener("input", function (e) {
	todoApp.displayOnDiv(divTasks, this.value);
});
btnAddTask.addEventListener("click", () => todoApp.editTask(divTasks));

// Display the data got from localStorage
todoApp.displayOnDiv(divTasks);
