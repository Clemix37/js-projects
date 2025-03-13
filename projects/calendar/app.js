import Calendar from "../../js/classes/Calendar.js";

const calendar = new Calendar({
	idContainer: "calendar",
	idTitle: "month-calendar",
});

// NAVIGATION
const btnNextMonth = document.getElementById("btn-next-month");
const btnPreviousMonth = document.getElementById("btn-previous-month");

btnNextMonth.addEventListener("click", nextMonth);
btnPreviousMonth.addEventListener("click", previousMonth);

function nextMonth() {
	calendar.goToNextMonth();
}

function previousMonth() {
	calendar.goToPreviousMonth();
}

calendar.display();
