import Counter from "./Counter.js";

// PROPERTIES
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
const points = document.getElementById('points');
let counter = new Counter();

// FUNCTIONS
const display = () => {
    points.innerHTML = counter.points;
    points.style.color = (counter.points > 0) ? 'green' : (counter.points < 0 ? 'red' : 'black');
};

// EVENTS
increaseBtn.addEventListener('click', increase);
decreaseBtn.addEventListener('click', decrease);
resetBtn.addEventListener('click', reset);
document.addEventListener("keyup", onKeyUp);

// FUNCTIONS

/* Reset the counter, and we display its value */
function reset(){
    counter?.reset();
    display();
}

/* Decrease the counter, display its value */
function decrease(){
    counter?.decrease();
    display();
}

/* Increase the counter, display its value */
function increase(){
    counter?.increase();
    display();
}

/**
 * Based on the key pressed, increase or decrease the counter
 * @param {KeyboardEvent} e 
 */
function onKeyUp(e){
    const keyPressed = e.key;
    const isPlus = keyPressed === "+";
    const isMinus = keyPressed === "-";
    if(!isPlus && !isMinus) return;
    if(isPlus) increase();
    else decrease();
}

// After loading everything, we display the current value
display();