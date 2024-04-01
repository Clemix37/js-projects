import WorkoutCalendar from "./classes/WorkoutCalendar.js";
import WorkoutGoal from "./classes/WorkoutGoal.js";
import WorkoutGoalsList from "./classes/WorkoutGoalsList.js";

// PROPERTIES
const todayDom = document.getElementById("today");
const btnPreviousMonth = document.getElementById("btn-previous-month");
const btnNextMonth = document.getElementById("btn-next-month");
const calendar = new WorkoutCalendar({ idContainer: "calendar", idTitle: "month-calendar" });
// @todo: create a new workout goal
// @todo: add workouts
// @todo: add exercises
// @todo: display on calendar-dates the exercises made on this day
// @todo: display checkboxes for workout goals on calendar dates
// @todo: sets workout days, days off
const listGoals = new WorkoutGoalsList({ idContainer: "list-goals" });

// EVENTS
btnPreviousMonth.addEventListener("click", navigateToPreviousMonth);
btnNextMonth.addEventListener("click", navigateToNextMonth);
document.addEventListener("keyup", onKeyUp);

// FUNCTIONS
function displayContent(){
    displayCurrentDate();
    calendar.displayCurrentMonth();
    listGoals.displayGoals();
}

function displayCurrentDate(){
    todayDom.textContent = calendar.getActualDateAsString();
}

function onKeyUp(e){
    const isArrowLeft = e.key === "ArrowLeft";
    const isArrowRight = e.key === "ArrowRight";
    const isArrowLeftOrRight = isArrowLeft || isArrowRight;
    if(!isArrowLeftOrRight) return;
    if(isArrowLeft) navigateToPreviousMonth();
    else navigateToNextMonth();
}

function navigateToPreviousMonth(){
    calendar.previousMonth();
}

function navigateToNextMonth(){
    calendar.nextMonth();
}

displayContent();