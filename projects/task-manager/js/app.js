import store from "../../../js/SessionStore.js";
import { askConfirmation } from "./confirmation.js";
import List from "./classes/List.js";
import Tag from "./classes/Tag.js";
import Task from "./classes/Task.js";
import Status from "./classes/Status.js";
import Display from "./classes/Display.js";

//#region Properties

// Divs
const taskManagerContainer = document.getElementById("task-manage-container");
const tagsContainer = document.getElementById("tags-container");
const tagsFilteredContainer = document.getElementById("tags-filtered-container");
const statusesContainer = document.getElementById("statuses-container");
const statusesFilteredContainer = document.getElementById("statuses-filtered-container");
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
const btnAddStatus = document.getElementById("btn-add-status");
const btnSaveStatus = document.getElementById("btn-save-status");
const btnCancelStatus = document.getElementById("btn-cancel-status");
// Windows
const windowAddList = document.getElementById("window-add-list");
const windowAddTask = document.getElementById("window-add-task");
const windowAddTag = document.getElementById("window-add-tag");
const windowAddStatus = document.getElementById("window-add-status");
// Inputs
const titleList = document.getElementById("title-list");
const colorList = document.getElementById("color-list");
const titleTask = document.getElementById("title-task");
const descTask = document.getElementById("description-task");
const selectLists = document.getElementById("lists");
const selectTagsTask = document.getElementById("tags-task");
const titleTag = document.getElementById("title-tag");
const colorTag = document.getElementById("color-tag");
const nameStatus = document.getElementById("name-status");
const colorStatus = document.getElementById("color-status");
/**
 * @type {Tag[]}
 */
const tags = store.get(Tag.ID_STORE, []).map((t) => new Tag(t));
/**
 * @type {List[]}
 */
let lists = store.get(List.ID_STORE, []).map((l) => new List(l));
/**
 * @type {Task[]}
 */
let tasks = store.get(Task.ID_STORE, []).map((t) => new Task(t));
/**
 * @type {Status[]}
 */
const statuses = store.get(Status.ID_STORE, []).map((s) => new Status(s));
/**
 * @type {Display}
 */
const display = new Display(store.get(Display.ID_STORE, {}));
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
 * @type {string?}
 */
let idStatusFiltering = null;

//#endregion

/**
 * Saves lists, tasks, tags, statuses inside the localStorage
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
	store.set(
		Status.ID_STORE,
		statuses.map((s) => s.toJSON()),
	);
	const idsTasksUsed = lists.flatMap((l) => l.idsTasks);
	store.set(
		Task.ID_STORE,
		tasks.filter((task) => idsTasksUsed.includes(task.id)).map((t) => t.toJSON()),
	);
	store.set(Display.ID_STORE, display.toJSON());
}

//#region Display

/**
 * Displays every list, tasks and tags
 * Adds events for lists and tasks
 */
function displayTaskManager() {
	taskManagerContainer.innerHTML = lists
		.filter((l) => l.containTasksWithTags(tasks, tagsFiltered))
		.filter((l) => l.containTasksWithStatuses(tasks, idStatusFiltering))
		.reduce((acc, l) => acc + l.getTemplate(tasks, tags), "");
}

/**
 * Displays every tags in the list
 */
function displayTags() {
	const idsFiltering = tagsFiltered.map((t) => t.id);
	tagsContainer.innerHTML = tags
		.filter((t) => !idsFiltering.includes(t.id))
		.reduce(
			(acc, t) => acc + t.getTemplate(true),
			tags.length > 0 && tags.length !== tagsFiltered.length
				? `<p style="margin-right: 10px;">Filter tags:</p>`
				: "",
		);
}

/**
 * Display every tag filtering
 */
function displayTagsFiltering() {
	tagsFilteredContainer.innerHTML = tagsFiltered.reduce(
		(acc, t) => acc + t.getTemplate(true, true),
		tagsFiltered.length > 0 ? `<p style="margin-right: 10px;">Filtering tags:</p>` : "",
	);
}

/**
 * Display every status not filtering
 */
function displayStatuses() {
	statusesContainer.innerHTML = idStatusFiltering
		? ""
		: statuses.reduce((acc, s) => acc + s.getTemplate(true), `<p style="margin-right: 10px;">Filter Statuses:</p>`);
}

/**
 * Display every status filtering the display
 */
function displayStatusFiltering() {
	statusesFilteredContainer.innerHTML = idStatusFiltering
		? `
            <p style="margin-right: 10px;">Filter Status:</p> 
            ${statuses.find((s) => s.id === idStatusFiltering)?.getTemplate(true, true) ?? ""}
        `
		: "";
}

//#endregion

//#region Events

/**
 * Adds events for the page, link buttons and functions
 */
function addEventsOnPage() {
	// List
	btnAddList.removeEventListener("click", openWindowList);
	btnAddList.addEventListener("click", openWindowList);
	btnCancelList.removeEventListener("click", closeWindowList);
	btnCancelList.addEventListener("click", closeWindowList);
	btnSaveList.removeEventListener("click", saveList);
	btnSaveList.addEventListener("click", saveList);
	// Task
	btnAddTask.removeEventListener("click", openWindowTask);
	btnAddTask.addEventListener("click", openWindowTask);
	btnCancelTask.removeEventListener("click", closeWindowTask);
	btnCancelTask.addEventListener("click", closeWindowTask);
	btnSaveTask.removeEventListener("click", saveTask);
	btnSaveTask.addEventListener("click", saveTask);
	// Tag
	btnAddTag.removeEventListener("click", openWindowTag);
	btnAddTag.addEventListener("click", openWindowTag);
	btnCancelTag.removeEventListener("click", closeWindowTag);
	btnCancelTag.addEventListener("click", closeWindowTag);
	btnSaveTag.removeEventListener("click", saveTag);
	btnSaveTag.addEventListener("click", saveTag);
	// Status
	btnAddStatus.removeEventListener("click", openWindowStatus);
	btnAddStatus.addEventListener("click", openWindowStatus);
	btnSaveStatus.removeEventListener("click", saveStatus);
	btnSaveStatus.addEventListener("click", saveStatus);
	btnCancelStatus.removeEventListener("click", closeWindowStatus);
	btnCancelStatus.addEventListener("click", closeWindowStatus);
	// Other events like editing, deleting or dragging and dropping
	addEventsOnTaskManagerContainer();
	// Add links for filtering tags
	addEventsOnTagFilter();
	// Add links for filtering statuses
	addEventsOnStatusFilter();
}

/**
 * Adds the events for tasks and lists inside the task manager container
 */
function addEventsOnTaskManagerContainer() {
	addEventsOnTasks();
	addEventsOnLists();
	addEventsDragAndDrop();
	addEventsBtnAddOnEachList();
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
	const everyTaskFromDom = document.querySelectorAll(`.tm-task`);
	for (let i = 0; i < everyTaskFromDom.length; i++) {
		const btnEditTask = everyTaskFromDom[i];
		btnEditTask.removeEventListener("dblclick", editTaskFromDom);
		btnEditTask.addEventListener("dblclick", editTaskFromDom);
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
	const everyListsHeader = document.querySelectorAll(`.tm-list-header`);
	for (let i = 0; i < everyListsHeader.length; i++) {
		const btnEditList = everyListsHeader[i];
		btnEditList.removeEventListener("dblclick", editListFromDom);
		btnEditList.addEventListener("dblclick", editListFromDom);
	}
}

/**
 * Adds events for dropping tasks inside lists
 */
function addEventsDragAndDrop() {
	const allTasks = document.querySelectorAll(`.tm-task`);
	for (let i = 0; i < allTasks.length; i++) {
		const task = allTasks[i];
		task.removeEventListener("dragstart", onDragTask);
		task.addEventListener("dragstart", onDragTask);
	}
	const allListsContainer = document.querySelectorAll(`.tm-list-content-container`);
	for (let i = 0; i < allListsContainer.length; i++) {
		const listContainer = allListsContainer[i];
		listContainer.removeEventListener("drop", onDrop);
		listContainer.removeEventListener("dragover", onDragOver);
		listContainer.addEventListener("drop", onDrop);
		listContainer.addEventListener("dragover", onDragOver);
	}
}

/**
 * Add events for each button add in each list displayed
 */
function addEventsBtnAddOnEachList() {
	const allBtnsAdd = document.querySelectorAll(`.${List.CLASS_BTN_ADD_TASK}`);
	for (let i = 0; i < allBtnsAdd.length; i++) {
		const btnAdd = allBtnsAdd[i];
		btnAdd.removeEventListener("click", addTaskOnList);
		btnAdd.addEventListener("click", addTaskOnList);
	}
}

/**
 * Adds events for filtering by tag
 */
function addEventsOnTagFilter() {
	const allTagsForfilter = document.querySelectorAll(".tm-tag-filter");
	for (let i = 0; i < allTagsForfilter.length; i++) {
		const tagFilter = allTagsForfilter[i];
		tagFilter.removeEventListener("click", filterTagClicked);
		tagFilter.addEventListener("click", filterTagClicked);
	}
}

/**
 * Adds events for filtering by status
 */
function addEventsOnStatusFilter() {
	const allStatusForFilter = document.querySelectorAll(".tm-status-filter");
	for (let i = 0; i < allStatusForFilter.length; i++) {
		const statusFilter = allStatusForFilter[i];
		statusFilter.removeEventListener("click", filterStatusClicked);
		statusFilter.addEventListener("click", filterStatusClicked);
	}
}

//#endregion

//#region Modal List

/**
 * Empty the fields of the modal add list
 * Opens the modal
 */
function openWindowList() {
	const listToEdit = idListEdit ? lists.find((l) => l.id === idListEdit) : null;
	titleList.value = listToEdit?.title ?? "";
	colorList.value = listToEdit?.color ?? "";
	windowAddList.showModal();
}

/**
 * Close the modal add list
 */
function closeWindowList() {
	windowAddList.close();
	idListEdit = null;
}

/**
 * Adds a list, closes the modal add list, update everything
 */
function saveList() {
	const listExist = idListEdit ? lists.find((l) => l.id === idListEdit) : false;
	if (!listExist) lists.push(new List({ title: titleList.value, color: colorList.value }));
	else
		lists = lists.map((l) => {
			if (l.id !== idListEdit) return l;
			l.title = titleList.value;
			l.color = colorList.value;
			return l;
		});
	closeWindowList();
	update();
}

//#endregion

//#region Modal Task

/**
 * Gets the id of the list to add a task
 * Opens the window with the list pre-selected
 * @param {EventObject} e
 */
function addTaskOnList(e) {
	const { idList } = e.currentTarget.dataset;
	openWindowTask(idList);
}

/**
 * Gets the task to edit if one
 * Update the content of the window with the task to edit properties if it exists
 * Adds the tags inside the select
 * Pre-select tags if in edition of task
 * Display lists in the list
 * Pre-select list if one
 * Opens the modal
 * @param {string?} idList
 */
function openWindowTask(idList = null) {
	const taskToEdit = idTaskEdit ? tasks.find((t) => t.id === idTaskEdit) : null;
	titleTask.value = taskToEdit?.title ?? "";
	descTask.value = taskToEdit?.description ?? "";
	selectTagsTask.value = "";
	selectTagsTask.innerHTML = tags.reduce(
		(acc, tag) => `${acc}<option value="${tag.id}">${tag.title}</option>`,
		`<option value=""></option>`,
	);
	if (taskToEdit) {
		for (let i = 0; i < selectTagsTask.options.length; i++) {
			const option = selectTagsTask.options[i];
			if (!taskToEdit.idsTags.includes(option.value)) continue;
			option.selected = true;
		}
	}
	// Affichage de toutes les listes
	selectLists.innerHTML = lists.reduce(
		(acc, l) => `${acc}<option value="${l.id}">${l.title}</option>`,
		`<option value=""></option>`,
	);
	if (idList) selectLists.value = idList;
	windowAddTask.showModal();
}

/**
 * Closes the modal
 * Empty values for task creation/edition
 */
function closeWindowTask() {
	windowAddTask.close();
	idTaskEdit = null;
}

/**
 * Gets the id of list to add the task
 * Gets the selected tags of the task
 * Edit the lists property by changing/adding the task created/edited
 * Closes the modal
 * Update the display
 * @returns {void}
 */
function saveTask() {
	const idList = selectLists.value;
	if (!idList) return;
	const idsTagsOfTask = [...selectTagsTask.selectedOptions].map((option) => option.value);
	const taskToEdit = idTaskEdit ? tasks.find((t) => t.id === idTaskEdit) : null;
	const newTask = idTaskEdit
		? null
		: new Task({ title: titleTask.value, description: descTask.value, idsTags: idsTagsOfTask });
	// Saves the task
	if (!idTaskEdit) tasks.push(newTask);
	else
		tasks = tasks.map((t) => {
			if (t.id !== idTaskEdit) return t;
			t.idsTags = idsTagsOfTask;
			t.title = titleTask.value;
			t.description = descTask.value;
			return t;
		});
	// Link the task with the list
	lists = lists.map((l) => {
		const containsTask = l.idsTasks.includes(idTaskEdit ?? newTask.id);
		if (l.id === idList && !containsTask) l.idsTasks.push(idTaskEdit ?? newTask.id);
		else l.idsTasks = l.idsTasks.filter((t) => t.id !== idTaskEdit);
		return l;
	});
	closeWindowTask();
	update();
}

//#endregion

//#region Modal Tag

/**
 * Empty the different fields of the modal add tag
 * Opens the modal
 */
function openWindowTag() {
	titleTag.value = "";
	colorTag.value = "";
	windowAddTag.showModal();
}

/**
 * Close the modal of the add tag
 */
function closeWindowTag() {
	windowAddTag.close();
}

/**
 * Save the tag, close the modal and update the page
 */
function saveTag() {
	tags.push(new Tag({ title: titleTag.value, color: colorTag.value }));
	closeWindowTag();
	update();
}

//#endregion

//#region Modal Status

/**
 * Clears the field and opens the window
 */
function openWindowStatus() {
	nameStatus.value = "";
	colorStatus.value = "";
	windowAddStatus.showModal();
}

/**
 * Close the window
 */
function closeWindowStatus() {
	windowAddStatus.close();
}

/**
 * Saves the status
 */
function saveStatus() {
	const color = colorStatus.value;
	const name = nameStatus.value;
	if (!name || !color) return;
	statuses.push(new Status({ name, color }));
	closeWindowStatus();
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
			tasks = tasks.filter((t) => t.id !== id);
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
		const idsTasksOfList = lists.find((l) => l.id === id)?.idsTasks ?? [];
		tasks = tasks.filter((t) => idsTasksOfList.includes(t.id));
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
	openWindowList();
}

//#endregion

//#region Drag and drop

/**
 * Stores the id of the task in the data transfer object
 * @param {DragEvent} e
 */
function onDragTask(e) {
	e.dataTransfer.setData("text/plain", e.target.id);
}

/**
 * Prevents touch and pointer events
 */
function onDragOver(e) {
	e.preventDefault();
}

/**
 * Prevents touch and pointer events
 * Gets the id, append the content inside the target in DOM
 * Removes the task from the list having it
 * Adds the task inside the target list
 * @param {DropEvent} e
 */
function onDrop(e) {
	e.preventDefault();
	// Gets the idTask from dataTrasnfer
	const idTask = e.dataTransfer.getData("text/plain");
	const { idList } = e.target.dataset;
	// Appends in the dom the content of the actual task
	e.target.prepend(document.getElementById(idTask));
	// Update lists by deleting task from actual list, and adding it to new list
	lists = lists.map((list) => {
		const containsTaskDropped = list.idsTasks.find((id) => id === idTask);
		const isTargetList = list.id === idList;
		if (!containsTaskDropped && !isTargetList) return list;
		// Deletes the task from the list having it
		if (containsTaskDropped) list.idsTasks = list.idsTasks.filter((id) => id !== idTask);
		// Adds the task inside the new list
		else list.idsTasks.push(idTask);
		// Returns the edited list
		return list;
	});
	// Saves the modifications
	saveTaskManager();
}

//#endregion

//#region Filtering Tags

/**
 * Gets the id of the tag clicked
 * Filter by it
 * @param {EventObject} e
 */
function filterTagClicked(e) {
	const { idTag } = e.currentTarget.dataset;
	filterByTag(idTag);
}

/**
 * Adds or remove tag for filtering
 * @param {string} idTag
 * @returns {void}
 */
function filterByTag(idTag) {
	if (!idTag) return;
	const containsTagFiltered = tagsFiltered.find((t) => t.id === idTag);
	if (containsTagFiltered) tagsFiltered = tagsFiltered.filter((t) => t.id !== idTag);
	else tagsFiltered.push(tags.find((t) => t.id === idTag));
	update();
}

//#endregion

//#region Filtering Statuses

/**
 * Gets the id of the status clicked
 * Filter by it
 * @param {EventObject} e
 */
function filterStatusClicked(e) {
	const { idStatus } = e.currentTarget.dataset;
	filterByStatus(idStatus);
}

/**
 * Adds or remove status for filtering
 * @param {string} idStatus
 */
function filterByStatus(idStatus) {
	if (idStatusFiltering === idStatus) idStatusFiltering = null;
	else idStatusFiltering = idStatus;
	update();
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
	displayTags();
	displayTagsFiltering();
	displayStatuses();
	displayStatusFiltering();
	addEventsOnPage();
}

update();

/**
 * TODO:
 *  delete tags
 *  delete statuses
 *  change display view by switching to grid
 *  delete button inside edition task + list
 */
