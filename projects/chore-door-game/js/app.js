const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
const start = document.getElementById('start');
const rowDoors = document.getElementById("rowDoors");
const allDoors = [spaceDoorPath, botDoorPath, beachDoorPath];
let randomDoors = [];
let found = 0;
let isPlaying = false;

const generateRandomDoors = () => {
    // While the array is not filled
    while(randomDoors.length < allDoors.length){
        const generated = Math.floor(Math.random() * allDoors.length); // Random index
        const door = allDoors[generated];
        // If the door already includes the door generated, we do nothing
        if(randomDoors.includes(door)) continue;
        randomDoors.push(door);
    }
};

/* Generate the door items to be rendered with necessary data */
const generateClosedDoors = () => {
    let res = ``;
    for (let i = 0; i < allDoors.length; i++) {
        res += `<div class="column"><img data-index="${i}" id="image-${i}" class="door-frame" src="${closedDoorPath}" /></div>`;
    }
    rowDoors.innerHTML = res;
};

const onDoorClicked = (e) => {
    if(!isPlaying) return; // We don't want to display images when we lost or won
    const index = parseInt(e.currentTarget.dataset.index);
    if(isNaN(index)) return;
    const doorFound = randomDoors[index];
    const img = document.getElementById(`image-${index}`);
    img.src = doorFound;
    found++;
    // Is bot image, and not all doors have been found
    if(doorFound === botDoorPath && found < allDoors.length) return generateGameOver();
    else if(found === randomDoors.length) generateWin();
};

/* Each door on the display is being attached to a click event */
const generateEvents = () => {
    const doorsFrames = document.querySelectorAll('.door-frame');
    for (let i = 0; i < doorsFrames.length; i++) {
        const door = doorsFrames[i];
        door.addEventListener('click', onDoorClicked);
    }
    start.addEventListener("click", () => {
        if(isPlaying) return;
        init();
    });
};

/* Changes the text, reset isPlaying */
const generateGameOver = () => {
    start.innerText = `You lose ... Maybe next time !`;
    isPlaying = false;
};

/* Changes the text, reset isPlaying */
const generateWin = () => {
    start.innerText = `You win ! Congratulations !!`;
    isPlaying = false;
};

const init = () => {
    start.innerText = "Choose a door !";
    isPlaying = true;
    found = 0;
    randomDoors = [];
    generateRandomDoors();
    generateClosedDoors();
    generateEvents();
};

document.addEventListener('DOMContentLoaded', init);