let projects = [];
document.addEventListener('DOMContentLoaded',()=>{
    launchProjects();
    displayProjects();
});

function launchProjects(){
    projects.push(new Project({
        name: "Counter",
        link: "01-counter/index.html"
    }));
    projects.push(new Project({
        name: "Drum kit",
        link: "02-drum-kit"
    }));
    projects.push(new Project({
        name: "Random Color",
        link: "03-random-color"
    }));
    projects.push(new Project({
        name: "Number guesser",
        link: "04-number-guesser"
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