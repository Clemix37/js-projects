import Utils from "../../../js/Utils.js";

const countdown = document.getElementById("countdown");
const btnLaunch = document.getElementById("btnLaunch");
const minutesList = document.getElementById("minutes");
const secondsList = document.getElementById("seconds");
const secondInMilliseconds = 1000;
let isLaunched = false;
let minutes = null;
let seconds = null;

/* Generates the content of each list */
const generateMinutes = () => generate60OptionsOnList(minutesList);
const generateSeconds = () => generate60OptionsOnList(secondsList);

/**
 * Display 60 options for the given select element
 * @param {HTMLSelectElement} listHtml
 */
function generate60OptionsOnList(listHtml) {
	let res = ``;
	for (let i = 0; i <= 60; i++) {
		res += `<option value="${i}">${i}</option>`;
	}
	listHtml.innerHTML = res;
}

/* Reset each value necessary to restart */
function init() {
	isLaunched = false;
	minutes = null;
	seconds = null;
	btnLaunch.style.display = "block";
	countdown.innerText = "";
	generateMinutes();
	generateSeconds();
}

/* Hides button, get value of each minutes and seconds */
function launch() {
	isLaunched = true;
	countdown.innerText = "";
	btnLaunch.style.display = "none";
	minutes = parseInt(minutesList.value);
	seconds = parseInt(secondsList.value);
	if (isNaN(minutes) || isNaN(seconds)) return init();
	launchTimers();
}

/* Declare the interval, and the end */
function launchTimers() {
	const inter = setInterval(changeTime, secondInMilliseconds);
	setTimeout(() => {
		countdown.innerText = "FINISHED !";
		btnLaunch.style.display = "block";
		clearInterval(inter);
		Utils.notify("Countdown finished");
	}, minutes * 60 * secondInMilliseconds + seconds * secondInMilliseconds);
}

/* Display remaining time, decrease the minutes and seconds */
function changeTime() {
	seconds--;
	if (seconds === 0 && minutes > 0) {
		seconds = 60;
		minutes--;
	}
	countdown.innerText = `${minutes} : ${seconds}`;
}

/* Attach events */
document.addEventListener("DOMContentLoaded", init);
btnLaunch.addEventListener("click", launch);
