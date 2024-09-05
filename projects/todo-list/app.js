import store from "../../js/SessionStore.js";
import List from "./List.js";
import Task from "./Task.js";
import TodoApp from "./TodoApp.js";

//#region Properties

const SESSION_TODO_APP_KEY = "todo-list-cwd";
const ID_DIV_LISTS = "div-lists";
const IDS_INPUTS = {
    NAME_LIST: "input-name-list",
    DESCRIPTION_TASK: "input-description-task",
    DONE_TASK: "input-done-task",
    SELECT_LISTS: "select-lists",
};
const IDS_BTNS = {
    ADD_LIST: "btn-add-list",
    ADD_TASK: "btn-add-task",
    REFRESH_LISTS: "btn-refresh-lists",
};
// Divs
const divLists = document.getElementById(ID_DIV_LISTS);
// Buttons
const btnAddList = document.getElementById(IDS_BTNS.ADD_LIST);
btnAddList.addEventListener("click", addList);
const btnAddTask = document.getElementById(IDS_BTNS.ADD_TASK);
btnAddTask.addEventListener("click", addTask);
const btnRefreshLists = document.getElementById(IDS_BTNS.REFRESH_LISTS); // TODO: delete after finding a solution
btnRefreshLists.addEventListener("click", refreshLists);
// Inputs
const inputNameList = document.getElementById(IDS_INPUTS.NAME_LIST);
const inputDescTask = document.getElementById(IDS_INPUTS.DESCRIPTION_TASK);
const inputDoneTask = document.getElementById(IDS_INPUTS.DONE_TASK);
const selectLists = document.getElementById(IDS_INPUTS.SELECT_LISTS);
// Gets data from session
const todoAppFromSession = store.get(SESSION_TODO_APP_KEY, {});
const todoApp = new TodoApp({ lists: (todoAppFromSession.lists?.map(list => {
    const tasks = list.tasks.map(t => new Task(t));
    return new List({ ...list, tasks });
}) ?? []) });

//#endregion

function addList(){
    const name = inputNameList.value;
    if(!name) return;
    const newList = new List({
        name
    });
    todoApp.addLists(newList);
    inputNameList.value = "";
    todoApp.displayOnDiv(divLists);
    save();
}

function addTask(){
    const description = inputDescTask.value;
    const idList = selectLists.value;
    const done = inputDoneTask.checked;
    if(!description || !idList) return;
    const newTask = new Task({
        description,
        done,
    });
    todoApp.addTasksOnList(idList, newTask);
    inputDescTask.value = "";
    selectLists.value = "";
    inputDoneTask.checked = false;
    todoApp.displayOnDiv(divLists);
    save();
}

function refreshLists(){
    const options = todoApp.lists.reduce((prev, list) => `${prev}<option value="${list.id}">${list.name}</option>`, "");
    selectLists.innerHTML = options;
}

function save(){
    store.set(SESSION_TODO_APP_KEY, todoApp.toJSON());
}

// Display the actual data
todoApp.displayOnDiv(divLists);
// Refresh the select with every lists known
refreshLists();