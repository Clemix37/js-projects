import store from "../../js/SessionStore.js";
import Task from "./Task.js";
import TodoApp from "./TodoApp.js";

//#region Properties

const ID_DIV_TASKS = "div-tasks";
const ID_TXT_SEARCH = "txt-search-task";
const ID_BTN_ADD_TASK = "btn-add-task";
const ID_LIST_TAGS = "list-tags-task";
// Divs, Buttons, Inputs
const divTasks = document.getElementById(ID_DIV_TASKS);
const btnAddTask = document.getElementById(ID_BTN_ADD_TASK);
const txtSearchTask = document.getElementById(ID_TXT_SEARCH);
const listTags = document.getElementById(ID_LIST_TAGS);
// Gets data from session
const todoAppFromSession = store.get(TodoApp.SESSION_TODO_APP_KEY, {});
const todoApp = new TodoApp({
	divInDom: divTasks,
	tasks: todoAppFromSession.tasks?.map((task) => new Task(task)) ?? [],
	tags: todoAppFromSession.tags,
});

//#endregion

btnAddTask.addEventListener("click", () => todoApp.editTask());
// When user makes an input, we filter the display based on the input
txtSearchTask.addEventListener("input", function () {
	todoApp.displayTasks(this.value, listTags.value);
});
listTags.addEventListener("change", function () {
	todoApp.displayTasks(txtSearchTask.value, this.value);
});
