let projects = [];
document.addEventListener('DOMContentLoaded',()=>{
    launchProjects();
    displayProjects();
});

function launchProjects(){
    projects.push(new Project({
        name: "Counter",
        link: "counter"
    }));
    projects.push(new Project({
        name: "Drum kit",
        link: "drum-kit"
    }));
    projects.push(new Project({
        name: "Random Color",
        link: "random-color"
    }));
    projects.push(new Project({
        name: "Number guesser",
        link: "number-guesser"
    }));
    projects.push(new Project({
        name: "BMI Calculator",
        link: "bmi-calculator"
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