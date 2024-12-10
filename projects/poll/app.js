import store from "../../js/classes/SessionStore.js";
import Poll from "./poll.js";
import PollChoice from "./PollChoice.js";

//#region Properties

const pollObtained = store.get(Poll.ID_STORE, null);
/**
 * @type {Poll}
 */
let poll = pollObtained ? new Poll(pollObtained) : null;
/**
 * @type {PollChoice[]}
 */
let pollChoices = store.get(PollChoice.ID_STORE, []).map((p) => new PollChoice(p));
// Containers
const pollContainer = document.getElementById("poll-container");
// Windows
const windowPoll = document.getElementById("window-poll");
const windowChoice = document.getElementById("window-choice");
// Buttons
const btnAddPoll = document.getElementById("btn-add-poll");
const btnSavePoll = document.getElementById("btn-save-poll");
const btnCancelPoll = document.getElementById("btn-cancel-poll");
const btnSaveChoice = document.getElementById("btn-save-choice");
const btnCancelChoice = document.getElementById("btn-cancel-choice");
// Labels
const labelPoll = document.getElementById("label-poll");
const labelChoice = document.getElementById("label-choice");

//#endregion

//#region Events

/**
 * Add listeners on poll page
 */
function attachEventsOnPage() {
	// Add
	btnAddPoll.removeEventListener("click", openWindowPoll);
	btnAddPoll.addEventListener("click", openWindowPoll);
	// Save
	btnSavePoll.removeEventListener("click", savePoll);
	btnSavePoll.addEventListener("click", savePoll);
	// Cancel
	btnCancelPoll.removeEventListener("click", closeWindowPoll);
	btnCancelPoll.addEventListener("click", closeWindowPoll);
	if (poll) attachEventsOnPollChoices();
}

/**
 * Add listeners for poll choices
 */
function attachEventsOnPollChoices() {
	const btnAddChoice = document.getElementById("btn-add-choice");
	const btnEndPoll = document.getElementById("btn-end-poll");
	// Add
	btnAddChoice.removeEventListener("click", openWindowChoice);
	btnAddChoice.addEventListener("click", openWindowChoice);
	// Cancel
	btnCancelChoice.removeEventListener("click", closeModalChoice);
	btnCancelChoice.addEventListener("click", closeModalChoice);
	// Save
	btnSaveChoice.removeEventListener("click", saveChoice);
	btnSaveChoice.addEventListener("click", saveChoice);
	// End poll
	btnEndPoll.removeEventListener("click", endPoll);
	btnEndPoll.addEventListener("click", endPoll);
	// For votes
	if (pollChoices.length > 0) addListenersForVotes();
}

/**
 * Add listeners for upvote and downvote
 */
function addListenersForVotes() {
	const allUpVotes = document.querySelectorAll(`.${PollChoice.CLASS_BTN_UPVOTE}`);
	for (let i = 0; i < allUpVotes.length; i++) {
		const btnUpVote = allUpVotes[i];
		btnUpVote.removeEventListener("click", upVoteFromElement);
		btnUpVote.addEventListener("click", upVoteFromElement);
	}
	const allDownVotes = document.querySelectorAll(`.${PollChoice.CLASS_BTN_DOWNVOTE}`);
	for (let i = 0; i < allDownVotes.length; i++) {
		const btnDownVote = allDownVotes[i];
		btnDownVote.removeEventListener("click", downVoteFromElement);
		btnDownVote.addEventListener("click", downVoteFromElement);
	}
}

//#endregion

function display() {
	btnAddPoll.style.display = poll ? "none" : "flex";
	if (poll) pollContainer.innerHTML = poll.getTemplate(pollChoices);
	save();
	attachEventsOnPage();
}

//#region Modal Poll

function openWindowPoll() {
	windowPoll.showModal();
}

function closeWindowPoll() {
	windowPoll.close();
	labelPoll.value = "";
	display();
}

function savePoll() {
	if (!labelPoll.value) return;
	poll = new Poll({ label: labelPoll.value, idsChoices: pollChoices.map((p) => p.id) });
	closeWindowPoll();
}

//#endregion

//#region Modal Choice

function closeModalChoice() {
	windowChoice.close();
	labelChoice.value = "";
	display();
}

function openWindowChoice() {
	windowChoice.showModal();
}

function saveChoice() {
	if (!labelChoice.value) return;
	const newChoice = new PollChoice({ label: labelChoice.value });
	pollChoices.push(newChoice);
	poll.idsChoices.push(newChoice.id);
	closeModalChoice();
}

//#endregion

//#region Votes

function upVoteFromElement(e) {
	const { id } = e.currentTarget.dataset;
	pollChoices = pollChoices.map((choice) => {
		if (choice.id !== id) return choice;
		choice.nbVote++;
		return choice;
	});
	display();
}

function downVoteFromElement(e) {
	const { id } = e.currentTarget.dataset;
	pollChoices = pollChoices.map((choice) => {
		if (choice.id !== id || choice.nbVote == 0) return choice;
		choice.nbVote--;
		return choice;
	});
	display();
}

//#endregion

function save() {
	store.set(Poll.ID_STORE, poll);
	store.set(PollChoice.ID_STORE, pollChoices);
}

/**
 * Returns the choices that won
 * @returns {PollChoice[]}
 */
function getChoicesWinner() {
	const choicesWinner = [];
	for (let i = 0; i < pollChoices.length; i++) {
		const choice = pollChoices[i];
		if (choicesWinner.length > 0 && choice.nbVote < choicesWinner[0].nbVote) continue;
		choicesWinner.push(choice);
	}
	return choicesWinner;
}

/**
 * Gets the template of the wins
 * @param {PollChoice[]} wins
 * @returns {string}
 */
function getDisplayFromWins(wins = []) {
	if (wins.length === 0) return `<h1 class="title has-text-centered">No choices</h1>`;
	const isMultiple = wins.length > 1;
	return `
        <h1 class="title has-text-centered">
            Choice${isMultiple ? "s" : ""} ${wins.reduce(
		(acc, win) => `${acc}${acc === "" ? "" : ", "}'${win.label}'`,
		"",
	)}
            ${isMultiple ? "are" : "is"} the winner${isMultiple ? "s" : ""} with ${wins[0].nbVote} votes !
        </h1>
    `;
}

function endPoll() {
	const choicesWinners = getChoicesWinner();
	pollContainer.innerHTML = getDisplayFromWins(choicesWinners);
	poll = null;
	pollChoices = null;
	save();
}

display();
