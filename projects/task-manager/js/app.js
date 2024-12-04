import store from "../../../js/SessionStore.js";
import { askConfirmation } from "./confirmation.js";
import List from "./classes/List.js";
import Tag from "./classes/Tag.js";
import Task from "./classes/Task.js";

// Divs
const taskManagerContainer = document.getElementById("task-manage-container");
const tagsContainer = document.getElementById("tags-container");
// Buttons
const btnAddList = document.getElementById("btn-add-list");
const btnSaveList = document.getElementById("btn-save-list");
const btnCancelList = document.getElementById("btn-cancel-list");
const btnAddTask = document.getElementById("btn-add-task");
const btnSaveTask = document.getElementById("btn-save-task");
const btnCancelTask = document.getElementById("btn-cancel-task");
const btnAddTag = document.getElementById("btn-add-tag");
const btnSaveTag = document.getElementById("btn-save-tag");
const btnCancelTag = document.getElementById("btn-cancel-tag");
// Windows
const windowAddList = document.getElementById("window-add-list");
const windowAddTask = document.getElementById("window-add-task");
const windowAddTag = document.getElementById("window-add-tag");
// Inputs
const titleList = document.getElementById("title-list");
const colorList = document.getElementById("color-list");
const titleTask = document.getElementById("title-task");
const descTask = document.getElementById("description-task");
const selectLists = document.getElementById("lists");
const selectTagsTask = document.getElementById("tags-task");
const titleTag = document.getElementById("title-tag");
const colorTag = document.getElementById("color-tag");
const selectTags = document.getElementById("select-tags");
/**
 * @type {Tag[]}
 */
const tags = store.get(Tag.ID_STORE, []).map((t) => new Tag(t));
/**
 * @type {List[]}
 */
let lists = store.get(List.ID_STORE, []).map(
	(l) =>
		new List({
			...l,
			tasks: l.tasks.map(
				(t) =>
					new Task({
						...t,
						tags: tags.filter((tag) => t.tags.map((tagOfTask) => tagOfTask.title).includes(tag.title)),
					}),
			),
		}),
);
/**
 * @type {string}
 */
let idTaskEdit = null;
/**
 * @type {string}
 */
let idListEdit = null;
/**
 * @type {Tag[]}
 */
let tagsFiltered = [];

/**
 * Saves lists and tags inside the localStorage
 */
function saveTaskManager() {
	store.set(
		List.ID_STORE,
		lists.map((l) => l.toJSON()),
	);
	store.set(
		Tag.ID_STORE,
		tags.map((t) => t.toJSON()),
	);
}

//#region Display

/**
 * Displays every list, tasks and tags
 * Adds events for lists and tasks
 */
function displayTaskManager() {
	taskManagerContainer.innerHTML = lists
		.filter((l) => l.containTaskWithTags(tagsFiltered))
		.reduce((acc, l) => acc + l.getTemplate(), "");
	addEventsOnTaskManagerContainer();
}

/**
 * Displays every tags in the list
 */
function displayListTags() {
	tagsContainer.innerHTML = tags.reduce(
		(acc, t) => acc + t.getTemplate(),
		`<p style="margin-right: 10px;">Filter tags:</p>`,
	);
}

//#endregion

//#region Events

/**
 * Adds events for the page, link buttons and functions
 */
function addEventsOnPage() {
	// List
	btnAddList.addEventListener("click", openModalList);
	btnCancelList.addEventListener("click", closeModalList);
	btnSaveList.addEventListener("click", saveList);
	// Task
	btnAddTask.addEventListener("click", openWindowTask);
	btnCancelTask.addEventListener("click", closeModalTask);
	btnSaveTask.addEventListener("click", saveTask);
	// Tag
	btnAddTag.addEventListener("click", openWindowAddTag);
	btnCancelTag.addEventListener("click", closeModalAddTag);
	btnSaveTag.addEventListener("click", saveTag);
}

/**
 * Adds the events for tasks and lists inside the task manager container
 */
function addEventsOnTaskManagerContainer() {
	addEventsOnTasks();
	addEventsOnLists();
}

/**
 * Adds events for tasks inside task manager container
 */
function addEventsOnTasks() {
	// Delete Task
	const allBtnsDeleteTasks = document.querySelectorAll(`.${Task.CLASS_TASK_DELETE}`);
	for (let i = 0; i < allBtnsDeleteTasks.length; i++) {
		const btnDelete = allBtnsDeleteTasks[i];
		btnDelete.removeEventListener("click", deleteTaskFromDom);
		btnDelete.addEventListener("click", deleteTaskFromDom);
	}
	// Edit Task
	const allBtnsEditTasks = document.querySelectorAll(`.${Task.CLASS_TASK_EDIT}`);
	for (let i = 0; i < allBtnsEditTasks.length; i++) {
		const btnEditTask = allBtnsEditTasks[i];
		btnEditTask.removeEventListener("click", editTaskFromDom);
		btnEditTask.addEventListener("click", editTaskFromDom);
	}
}

/**
 * Adds events for lists inside task manager container
 */
function addEventsOnLists() {
	// Delete List
	const allBtnsDeleteList = document.querySelectorAll(`.${List.CLASS_BTN_DELETE_LIST}`);
	for (let i = 0; i < allBtnsDeleteList.length; i++) {
		const btnDelete = allBtnsDeleteList[i];
		btnDelete.removeEventListener("click", deleteListFromDom);
		btnDelete.addEventListener("click", deleteListFromDom);
	}
	// Edit List
	const allBtnsEditLists = document.querySelectorAll(`.${List.CLASS_BTN_EDIT_LIST}`);
	for (let i = 0; i < allBtnsEditLists.length; i++) {
		const btnEditList = allBtnsEditLists[i];
		btnEditList.removeEventListener("click", editListFromDom);
		btnEditList.addEventListener("click", editListFromDom);
	}
}

//#endregion

//#region Modal List

/**
 * Empty the fields of the modal add list
 * Opens the modal
 */
function openModalList() {
	const listToEdit = idListEdit ? lists.find((l) => l.id === idListEdit) : null;
	titleList.value = listToEdit?.title ?? "";
	colorList.value = listToEdit?.color ?? "";
	windowAddList.showModal();
}

/**
 * Close the modal add list
 */
function closeModalList() {
	windowAddList.close();
	idListEdit = null;
}

/**
 * Adds a list, closes the modal add list, update everything
 */
function saveList() {
	const listExist = idListEdit ? lists.find(l => l.id === idListEdit) : false
	if (!listExist) lists.push(new List({ title: titleList.value, color: colorList.value }));
	else lists = lists.map(l => {
		if (l.id !== idListEdit) return l;
		l.title = titleList.value;
		l.color = color: colorList.value;
		return l;
	});
	closeModalList();
	update();
}

//#endregion

//#region Modal Task

function openWindowTask(idList = null) {
	const taskToEdit = idTaskEdit ? lists.find((l) => l.id === idList).tasks.find((t) => t.id === idTaskEdit) : null;
	titleTask.value = taskToEdit?.title ?? "";
	descTask.value = taskToEdit?.description ?? "";
	selectTagsTask.value = "";
	selectTagsTask.innerHTML = tags.reduce(
		(acc, tag) => `${acc}<option value="${tag.title}">${tag.title}</option>`,
		`<option value=""></option>`,
	);
	if (taskToEdit) {
		const titleTags = taskToEdit.tags.map((t) => t.title);
		for (let i = 0; i < selectTagsTask.options.length; i++) {
			const option = selectTagsTask.options[i];
			if (!titleTags.includes(option.value)) continue;
			option.selected = true;
		}
	}
	// Affichage de toutes les listes
	selectLists.innerHTML = lists.reduce(
		(acc, l) => `${acc}<option value="${l.id}">${l.title}</option>`,
		`<option value=""></option>`,
	);
	if (taskToEdit && idList) selectLists.value = idList;
	windowAddTask.showModal();
}

function closeModalTask() {
	windowAddTask.close();
	idTaskEdit = null;
}

function saveTask() {
	const idList = selectLists.value;
	if (!idList) return;
	const tagsOfTask = [...selectTagsTask.selectedOptions].map((option) =>
		tags.find((tag) => tag.title === option.value),
	);
	lists = lists.map((l) => {
		if (l.id !== idList) return l;
		if (!idTaskEdit)
			l.tasks.push(new Task({ title: titleTask.value, description: descTask.value, tags: tagsOfTask }));
		else
			l.tasks = l.tasks.map((t) => {
				if (t.id !== idTaskEdit) return t;
				t.title = titleTask.value;
				t.description = descTask.value;
				t.tags = tagsOfTask;
				return t;
			});
		return l;
	});
	closeModalTask();
	update();
}

//#endregion

//#region Modal Tag

/**
 * Empty the different fields of the modal add tag
 * Opens the modal
 */
function openWindowAddTag() {
	titleTag.value = "";
	colorTag.value = "";
	windowAddTag.showModal();
}

/**
 * Close the modal of the add tag
 */
function closeModalAddTag() {
	windowAddTag.close();
}

/**
 * Save the tag, close the modal and update the page
 */
function saveTag() {
	tags.push(new Tag({ title: titleTag.value, color: colorTag.value }));
	closeModalAddTag();
	update();
}

//#endregion

//#region Delete Buttons

/**
 * Gets the id and the idList from element
 * Delete the task frorm its list
 * @param {EventObject} e
 */
function deleteTaskFromDom(e) {
	const { id, idList } = e.currentTarget.dataset;
	askConfirmation("Are you sure you want to delete the task ?", () => {
		lists = lists.map((l) => {
			if (l.id !== idList) return l;
			return l.deleteTask(id);
		});
		update();
	});
}

/**
 * Gets the id of the list from element
 * Delete the list and its tasks
 * @param {EventObject} e
 */
function deleteListFromDom(e) {
	const { id } = e.currentTarget.dataset;
	askConfirmation("Are you sure you want to delete the list and its tasks ?", () => {
		lists = lists.filter((l) => l.id !== id);
		update();
	});
}

//#endregion

//#region Edit Buttons

/**
 * Gets the id and the idList from element
 * Edit the task frorm its list
 * @param {EventObject} e
 */
function editTaskFromDom(e) {
	const { id, idList } = e.currentTarget.dataset;
	idTaskEdit = id;
	openWindowTask(idList);
}

/**
 * Gets the id of the list from element
 * Edit the list
 * @param {EventObject} e
 */
function editListFromDom(e) {
	const { id } = e.currentTarget.dataset;
	idListEdit = id;
	openModalList();
}

//#endregion

/**
 * Save everything inside localStorage
 * Displays the lists, tasks and tags
 * Displays tags in the list
 */
function update() {
	saveTaskManager();
	displayTaskManager();
	displayListTags();
}

addEventsOnPage();
update();

/**
 * TODO:
 *  filtering on multiple tags
 *  displaying filtered tags
 *  add statuses for tasks
 *  add rounded button for adding a task inside a specific list
 *  change display view by switching to grid
 *  potentially, adding an id to tag
 *  changing arrays inside lists by adding idsTaks instead of tasks, idList inside Task, idsTags inside Task
 */
