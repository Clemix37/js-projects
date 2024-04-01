import WorkoutCalendar from "./classes/WorkoutCalendar.js";
import WorkoutGoal from "./classes/WorkoutGoal.js";
import WorkoutGoalsList from "./classes/WorkoutGoalsList.js";

// PROPERTIES
const todayDom = document.getElementById("today");
const btnPreviousMonth = document.getElementById("btn-previous-month");
const btnNextMonth = document.getElementById("btn-next-month");
const calendar = new WorkoutCalendar({ idContainer: "calendar", idTitle: "month-calendar" });
// @todo: get goals from localstorage
// @todo: create a new workout goal
// @todo: add workouts
// @todo: add exercises
// @todo: display on calendar-dates the exercises made on this day
// @todo: display checkboxes for workout goals on calendar dates
// @todo: sets workout days, days off
// @todo: create special class at root of project to retrieve data from localStorage
const listGoals = new WorkoutGoalsList({ idContainer: "list-goals", goals: [new WorkoutGoal({title: "Test cthe"})] });

// EVENTS
btnPreviousMonth.addEventListener("click", () => calendar.previousMonth());
btnNextMonth.addEventListener("click", () => calendar.nextMonth());

// FUNCTIONS
function displayContent(){
    displayCurrentDate();
    calendar.displayCurrentMonth();
    listGoals.displayGoals();
}

function displayCurrentDate(){
    todayDom.textContent = calendar.getActualDateAsString();
}

displayContent();