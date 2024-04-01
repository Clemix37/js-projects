import Project from "./Project.js";
import projectsData from "./projects.json" with { type: "json" };

// We get every project from the json file
/**
 * @type {Project[]}
 */
const projects = [];
const everyProjects = projectsData.projects;
for (let i = 0; i < everyProjects.length; i++) {
    const p = everyProjects[i];
    projects.push(new Project({
        name: p.name,
        link: p.link,
    }));
}

/**
 * Display every project by its template
 */
function displayProjects(){
    let container = document.getElementById('grille');
    let affichage = ``;
    for (let i = 0; i < projects.length; i++) {
        const p = projects[i];
        affichage += p.getTemplate();
    }
    container.innerHTML = affichage;
}

displayProjects();