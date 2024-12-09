import Project from "./classes/Project.js";
import projectsData from "./data/projects.json" with { type: "json" };

// We get every project from the json file
/**
 * @type {Project[]}
 */
const projects = projectsData.projects.map(proj => new Project(proj));

/**
 * Display every project by its template
 */
function displayProjects(){
    let container = document.getElementById('grille');
    container.innerHTML = projects.reduce((prev, proj) => `${prev}${proj.getTemplate()}`, "");
}

displayProjects();