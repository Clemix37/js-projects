import store from "../../../js/SessionStore.js";
import Workout from "./Workout.js";
import WorkoutCalendarDay from "./WorkoutCalendarDay.js";
import WorkoutGoalsList from "./WorkoutGoalsList.js";

export default class WorkoutCalendar {
    
    //#region Properties

    #actualDate;
    #container;
    #title;
    #workouts;
    #listGoals;
    static days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    static workoutsSessionKey = "workouts";

    //#endregion

    //#region Constructor

    /**
     * Create a workout calendar based on configuration
     * @param {object} obj 
     * @param {string} obj.idContainer
     * @param {string} obj.idTitle
     * @param {Date} obj.startDate
     * @param {WorkoutListGoals} obj.goalsList
     */
    constructor(obj = {}){
        if(!obj.idContainer) throw new Error("No container id given when creating the workout calendar");
        if(!obj.idTitle) throw new Error("No title id given when creating the workout calendar");
        if(!obj.goalsList) throw new Error("No lits of goals given when creating the workout calendar");
        this.#container = document.getElementById(obj.idContainer);
        this.#title = document.getElementById(obj.idTitle);
        this.#actualDate = obj.startDate ?? new Date();
        this.#workouts = store.get(WorkoutCalendar.workoutsSessionKey, [])
            .map(w => new Workout(w));
        this.#listGoals = obj.goalsList;
    }

    //#endregion

    //#region Accessors

    get listGoals() { return this.#listGoals; }

    //#endregion

    //#region Public methods

    /**
     * Display for every day in the actual month a box with every detail in it
     */
    displayCurrentMonth(){
        let calendarDisplay = "";
        const nbDays = this.#getNumberOfDaysInMonth();
        const actualYear = this.#actualDate.getFullYear();
        const actualMonth = this.#actualDate.getMonth();
        const currentDate = new Date();
        for (let i = 1; i <= nbDays; i++) {
            const d = new Date(actualYear, actualMonth, i);
            const day = WorkoutCalendar.days[d.getDay()];
            const workoutsOfDays = this.#workouts.filter(w => w.date.toString() === d.toString());
            const isActual = currentDate.getFullYear() === actualYear && currentDate.getMonth() === actualMonth && currentDate.getDate() === i;
            const workoutDay = new WorkoutCalendarDay({ 
                newDate: d, 
                actualDay: day, 
                isActual, 
                goals: this.#listGoals.goals,
                workouts: workoutsOfDays
            });
            calendarDisplay += workoutDay.getDayTemplate();
        }
        this.#container.innerHTML = calendarDisplay;
        this.#displayTitle();
    }

    /**
     * Change the actualDate, display its days, and change the title
     */
    previousMonth(){
        this.#actualDate = new Date(this.#actualDate.getFullYear(), this.#actualDate.getMonth()-1, 1);
        this.displayCurrentMonth();
    }

    /**
     * Change the actualDate, display its daysn and change the title
     */
    nextMonth(){
        this.#actualDate = new Date(this.#actualDate.getFullYear(), this.#actualDate.getMonth()+1, 1);
        this.displayCurrentMonth();
    }

    /**
     * Returns the actual date as a string in format: Day date, Month Year
     * @returns {string}
     */
    getActualDateAsString(){
        const day = WorkoutCalendar.days[this.#actualDate.getDay()];
        const month = WorkoutCalendar.months[this.#actualDate.getMonth()];
        return `${day} ${this.#actualDate.getDate()}, ${month} ${this.#actualDate.getFullYear()}`;
    }

    /**
     * Add the workout in th list of workouts
     * Save workouts in localStorage
     * Display the calendar
     * @param {Workout} newWorkout 
     */
    addWorkout(newWorkout){
        if(!newWorkout instanceof Workout) throw new Error("Workout is not of type Workout");
        this.#workouts.push(newWorkout);
        this.#saveWorkouts();
        this.displayCurrentMonth();
    }

    /**
     * Display every goals
     * Attach delete goal events
     */
    displayGoals(){
        this.#listGoals.displayGoals();
        this.#attachDeleteGoalEvents();
    }

    /**
     * Add the goal in the list
     * Display the calendar again
     * @param {WorkoutGoal} newGoal 
     */
    addGoal(newGoal){
        this.#listGoals.addGoal(newGoal);
        this.displayCurrentMonth();
    }

    //#endregion

    //#region Private methods

    /**
     * Display the month and the year of the actualDate
     */
    #displayTitle(){
        const actualMonth = this.#actualDate.getMonth();
        const monthAsString = WorkoutCalendar.months[actualMonth];
        this.#title.textContent = `${monthAsString} ${this.#actualDate.getFullYear()}`;
    }

    /**
     * Count the number of days in the actual month
     * @returns {number}
     */
    #getNumberOfDaysInMonth(){
        const lastDayOfMonth = new Date(this.#actualDate.getFullYear(), this.#actualDate.getMonth()+1, 0);
        return lastDayOfMonth.getDate();
    }

    /**
     * Save workouts of the calendar in the localStorage
     */
    #saveWorkouts(){
        store.set(WorkoutCalendar.workoutsSessionKey, this.#workouts);
    }

    /**
     * Attach the delet event on delete buttons displayed
     */
    #attachDeleteGoalEvents(){
        const btnsDeleteGoals = document.getElementsByClassName(WorkoutGoalsList.CLASS_BTN_DELETE_GOAL);
        const that = this;
        for (let i = 0; i < btnsDeleteGoals.length; i++) {
            const btn = btnsDeleteGoals[i];
            // We remove to eliminate potential duplication of event attached
            btn.removeEventListener("click", this.#deleteGoal);
            // We reset it
            btn.addEventListener("click", (e) => that.#deleteGoal(e));
        }
    }

    /**
     * Filter the goals without the one beoing deleted
     * We save them, and display them
     * @param {HTMLElement} e 
     */
    #deleteGoal(e){
        const id = +e.currentTarget.dataset.id;
        if(!id) return;
        this.#listGoals.deleteGoal(id);
        this.displayCurrentMonth();
    }

    //#endregion

}