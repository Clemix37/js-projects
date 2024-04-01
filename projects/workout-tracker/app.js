import Workout from "./classes/Workout.js";
import WorkoutCalendar from "./classes/WorkoutCalendar.js";
import WorkoutGoal from "./classes/WorkoutGoal.js";
import WorkoutGoalsList from "./classes/WorkoutGoalsList.js";

// PROPERTIES
const calendar = new WorkoutCalendar({ idContainer: "calendar", idTitle: "month-calendar" });
// @todo: create a new workout goal
// @todo: add workouts
// @todo: add exercises
// @todo: display on calendar-dates the exercises made on this day
// @todo: display checkboxes for workout goals on calendar dates
// @todo: sets workout days, days off
const listGoals = new WorkoutGoalsList({ idContainer: "list-goals" });
const todayDom = document.getElementById("today");
const btnPreviousMonth = document.getElementById("btn-previous-month");
const btnNextMonth = document.getElementById("btn-next-month");
// ADD GOAL
const btnAddGoal = document.getElementById("btn-add-goal");
const windowAddGoal = document.getElementById("window-add-goal");
const btnCloseGoalWindow = document.getElementById("btn-close-goal-window");
const btnSaveGoalWindow = document.getElementById("btn-save-goal-window");
// ADD WORKOUT
const btnAddWorkout = document.getElementById("btn-add-workout");
const windowAddWorkout = document.getElementById("window-add-workout");
const btnCloseWorkoutWindow = document.getElementById("btn-close-workout-window");
const btnSaveWorkoutWindow = document.getElementById("btn-save-workout-window");

// EVENTS
// NAVIGATION
btnPreviousMonth.addEventListener("click", navigateToPreviousMonth);
btnNextMonth.addEventListener("click", navigateToNextMonth);
// ADD GOAL
btnAddGoal.addEventListener("click", addGoal);
btnCloseGoalWindow.addEventListener("click", cancelAddGoal);
btnSaveGoalWindow.addEventListener("click", saveGoal);
// ADD WORKOUT
btnAddWorkout.addEventListener("click", addWorkout);
btnCloseWorkoutWindow.addEventListener("click", cancelAddWorkout);
btnSaveWorkoutWindow.addEventListener("click", saveWorkout);

// FUNCTIONS
function displayContent(){
    displayCurrentDate();
    calendar.displayCurrentMonth();
    listGoals.displayGoals();
}

function displayCurrentDate(){
    todayDom.textContent = calendar.getActualDateAsString();
}

// NAVIGATION
function navigateToPreviousMonth(){
    calendar.previousMonth();
}

function navigateToNextMonth(){
    calendar.nextMonth();
}

// ADD GOAL
function addGoal(){
    windowAddGoal.showModal();
}

function saveGoal(){
    const inputGoalTitle = document.getElementById("goal-title");
    const title = inputGoalTitle.value;
    const newGoal = new WorkoutGoal({ id: listGoals.getNextWorkoutId(), title });
    listGoals.addGoal(newGoal);
    cancelAddGoal();
}

function cancelAddGoal(){
    const inputGoalTitle = document.getElementById("goal-title");
    inputGoalTitle.value = ""; // We empty the title field
    windowAddGoal.close();
}

// ADD WORKOUT
function addWorkout(){
    windowAddWorkout.showModal();
    // We display the date of the day
    const inputWorkoutDate = document.getElementById("workout-date");
    const actualDate = new Date();
    // To respect the length of 10
    const day = actualDate.getDate();
    const dayDisplayed = day < 10 ? `0${day}` : day;
    // To respect the length of 10
    const month = actualDate.getMonth()+1;
    const monthDisplayed = month < 10 ? `0${month}` : month;
    // Displaying
    inputWorkoutDate.value = `${dayDisplayed}/${monthDisplayed}/${actualDate.getFullYear()}`;
}

function saveWorkout(){
    const inputWorkoutTitle = document.getElementById("workout-title");
    const title = inputWorkoutTitle.value;
    const inputWorkoutDate = document.getElementById("workout-date");
    const dateValue = inputWorkoutDate.value;
    // Check the length of the input
    if(dateValue.length > 10 || dateValue.length < 10) throw new Error("Workout date must be of format dd/MM/YYYY");
    // Check the value of the day, if it can be parsed as a number
    const day = +dateValue.substring(0, 2);
    if(!day) throw new Error("Day must be a number between 1 and 31");
    // Check the value of the month, if it can be parsed as a number
    const month = +dateValue.substring(3, 5);
    if(!month) throw new Error("Month must be a number between 1 and 12");
    // Check the value of the year, if it can be parsed as a number
    const year = +dateValue.substring(6);
    if(!year) throw new Error("Year must be a number between 1 and 9999");
    const date = new Date(year, month-1, day);
    const newWorkout = new Workout({ title, date });
    calendar.addWorkout(newWorkout);
    // Clears every input
    cancelAddWorkout();
}

function cancelAddWorkout(){
    const inputWorkoutTitle = document.getElementById("workout-title");
    const inputWorkoutDate = document.getElementById("workout-date");
    inputWorkoutTitle.value = ""; // We empty the title field
    inputWorkoutDate.value = ""; // We empty the date field
    windowAddWorkout.close();
}

displayContent();