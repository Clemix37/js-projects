import store from "../../../js/SessionStore.js";
import { askConfirmation } from "./confirmation.js";
import List from "./classes/List.js";
import Tag from "./classes/Tag.js";
import Task from "./classes/Task.js";

// Divs
const taskManagerContainer = document.getElementById("task-manage-container");
const tagsContainer = document.getElementById("tags-container");
const tagsFilteredContainer = document.getElementById("tags-filtered-container");
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
			tasks: l.tasks.map((t) => new Task(t)),
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
		.reduce((acc, l) => acc + l.getTemplate(tags), "");
}

/**
 * Displays every tags in the list
 */
function displayListTags() {
	const idsFiltering = tagsFiltered.map((t) => t.title);
	tagsContainer.innerHTML = tags
		.filter((t) => !idsFiltering.includes(t.title))
		.reduce(
			(acc, t) => acc + t.getTemplate(true),
			tags.length > 0 ? `<p style="margin-right: 10px;">Filter tags:</p>` : "",
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

//#endregion

//#region Events

/**
 * Adds events for the page, link buttons and functions
 */
function addEventsOnPage() {
	// List
	btnAddList.removeEventListener("click", openModalList);
	btnAddList.addEventListener("click", openModalList);
	btnCancelList.removeEventListener("click", closeModalList);
	btnCancelList.addEventListener("click", closeModalList);
	btnSaveList.removeEventListener("click", saveList);
	btnSaveList.addEventListener("click", saveList);
	// Task
	btnAddTask.removeEventListener("click", openWindowTask);
	btnAddTask.addEventListener("click", openWindowTask);
	btnCancelTask.removeEventListener("click", closeModalTask);
	btnCancelTask.addEventListener("click", closeModalTask);
	btnSaveTask.removeEventListener("click", saveTask);
	btnSaveTask.addEventListener("click", saveTask);
	// Tag
	btnAddTag.removeEventListener("click", openWindowAddTag);
	btnAddTag.addEventListener("click", openWindowAddTag);
	btnCancelTag.removeEventListener("click", closeModalAddTag);
	btnCancelTag.addEventListener("click", closeModalAddTag);
	btnSaveTag.removeEventListener("click", saveTag);
	btnSaveTag.addEventListener("click", saveTag);
	// Other events like editing, deleting or dragging and dropping
	addEventsOnTaskManagerContainer();
	// Add links for filtering tags
	addEventsOnTagFilter();
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
	const listExist = idListEdit ? lists.find((l) => l.id === idListEdit) : false;
	if (!listExist) lists.push(new List({ title: titleList.value, color: colorList.value }));
	else
		lists = lists.map((l) => {
			if (l.id !== idListEdit) return l;
			l.title = titleList.value;
			l.color = colorList.value;
			return l;
		});
	closeModalList();
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
	const taskToEdit = idTaskEdit ? lists.find((l) => l.id === idList).tasks.find((t) => t.id === idTaskEdit) : null;
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
function closeModalTask() {
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
	lists = lists.map((l) => {
		if (l.id !== idList) return l;
		if (!idTaskEdit)
			l.tasks.push(new Task({ title: titleTask.value, description: descTask.value, idsTags: idsTagsOfTask }));
		else
			l.tasks = l.tasks.map((t) => {
				if (t.id !== idTaskEdit) return t;
				t.title = titleTask.value;
				t.description = descTask.value;
				t.idsTags = idsTagsOfTask;
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
	// Finds the task to move
	const taskToMove = lists.flatMap((l) => l.tasks).find((t) => t.id === idTask);
	// Update lists by deleting task from actual list, and adding it to new list
	lists = lists.map((list) => {
		const containsTaskDropped = list.tasks.find((t) => t.id === idTask);
		const isTargetList = list.id === idList;
		if (!containsTaskDropped && !isTargetList) return list;
		// Deletes the task from the list having it
		if (containsTaskDropped) list.tasks = list.tasks.filter((t) => t.id !== idTask);
		// Adds the task inside the new list
		else list.tasks.push(taskToMove);
		// Returns the edited list
		return list;
	});
	// Saves the modifications
	saveTaskManager();
}

//#endregion

//#region Filtering Tags

/**
 * Gets the title of the tag clicked
 * Filter by it
 * @param {EventObject} e
 */
function filterTagClicked(e) {
	const { titleTag } = e.currentTarget.dataset;
	filterByTag(titleTag);
}

/**
 * Adds or remove tag for filtering
 * @param {string} titleTag
 * @returns {void}
 */
function filterByTag(titleTag) {
	if (!titleTag) return;
	const containsTagFiltered = tagsFiltered.find((t) => t.title === titleTag);
	if (containsTagFiltered) tagsFiltered = tagsFiltered.filter((t) => t.title !== titleTag);
	else tagsFiltered.push(tags.find((t) => t.title === titleTag));
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
	displayListTags();
	displayTagsFiltering();
	addEventsOnPage();
}

update();

/**
 * TODO:
 *  add statuses for tasks (ONGOING)
 *  change display view by switching to grid
 *  changing arrays inside lists by adding idsTaks instead of tasks, idList inside Task, idsTags inside Task
 *  double click for edition task + list
 *  delete button inside edition task + list
 */
