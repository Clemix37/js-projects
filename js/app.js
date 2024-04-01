import Project from "./Project.js";

const projects = [];

function launchProjects(){
    projects.push(new Project({
        name: "Counter 🔢",
        link: "counter"
    }));
    projects.push(new Project({
        name: "Drum kit 🎺",
        link: "drum-kit"
    }));
    projects.push(new Project({
        name: "Random Color",
        link: "random-color"
    }));
    projects.push(new Project({
        name: "Number guesser 📛",
        link: "number-guesser"
    }));
    projects.push(new Project({
        name: "BMI Calculator ➕",
        link: "bmi-calculator"
    }));
    projects.push(new Project({
        name: "Password generator *️⃣",
        link: "password-generator"
    }));
    projects.push(new Project({
        name: "Grocery list 💰",
        link: "grocery-list"
    }));
    projects.push(new Project({
        name: "Dice Game 🎲",
        link: "dice-game"
    }));
    // projects.push(new Project({
    //     name: "Memory Game",
    //     link: "memory-game"
    // }));
    projects.push(new Project({
        name: "Chore door game 🚪",
        link: "chore-door-game"
    }));
    projects.push(new Project({
        name: "Countdown timer 🕰️",
        link: "countdown-timer"
    }));
    projects.push(new Project({
        name: "Library 📚",
        link: "library"
    }));
    projects.push(new Project({
        name: "Tic tac toe 🕹️",
        link: "tic-tac-toe"
    }));
    projects.push(new Project({
        name: "Key Codes #️⃣",
        link: "key-codes"
    }));
    projects.push(new Project({
        name: "Workout Tracker 💪",
        link: "workout-tracker"
    }));
}

function displayProjects(){
    let container = document.getElementById('grille');
    let affichage = ``;
    for (let i = 0; i < projects.length; i++) {
        const p = projects[i];
        affichage += p.getTemplate();
    }
    container.innerHTML = affichage;
}

launchProjects();
displayProjects();