// PROPERTIES
let increaseBtn = document.getElementById('increaseBtn');
let decreaseBtn = document.getElementById('decreaseBtn');
let points = document.getElementById('points');
let counter = null;

// FUNCTIONS
function display(){
    points.innerHTML = counter.points;
    points.style.color = (counter.points > 0) ? 'green' : (counter.points < 0 ? 'red' : 'black');
}

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