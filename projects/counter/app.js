// PROPERTIES
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
const points = document.getElementById('points');
let counter = null;

// FUNCTIONS
const display = () => {
    points.innerHTML = counter.points;
    points.style.color = (counter.points > 0) ? 'green' : (counter.points < 0 ? 'red' : 'black');
};

// EVENTS
document.addEventListener('DOMContentLoaded', ()=>{
    counter = new Counter();
    display();
});
increaseBtn.addEventListener('click',()=>{
    counter?.increase();
    display();
});
decreaseBtn.addEventListener('click',()=>{
    counter?.decrease();
    display();
});
resetBtn.addEventListener('click', ()=>{
    counter?.reset();
    display();
});
