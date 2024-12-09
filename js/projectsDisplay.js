//#region Properties

//#endregion

/**
 * Gets navbar and confirm window content and adds them to the DOM
 */
function addContentToDom() {
	addNavBarToDom();
	addConfirmWindowToDom();
}

//#region Navbar

/**
 * Gets the content of the pages/navbar.html file and adds it to the DOM
 */
async function addNavBarToDom() {
	const navbarContent = await getPageWithUrl("../../pages/navbar.html");
	const div = document.createElement("div");
	div.innerHTML = navbarContent;
	div.classList.add("flex", "column");
	document.body.prepend(div);
	changeTitleProject();
}

/**
 * Gets the title project from DOM
 * And sets title of the project from the title of document
 */
function changeTitleProject() {
	// We are setting the title displayed witht the title of the document
	const titleProject = document.getElementById("title-project");
	titleProject.innerText = document.title;
}

//#endregion

//#region Confirm window

/**
 * Gets the content of the pages/confirm-window.html file and adds it to the DOM
 */
async function addConfirmWindowToDom() {
	const confirmWindowContent = await getPageWithUrl("../../pages/confirm-window.html");
	const div = document.createElement("div");
	div.classList.add("flex", "column");
	div.innerHTML = confirmWindowContent;
	document.body.append(div);
}

//#endregion

//#region Utils

/**
 * From the URL given, returns the reponse from the server
 * @param {string} url
 * @returns {Promise<string>}
 */
function getPageWithUrl(url) {
	return fetch(url).then((res) => res.text());
}

//#endregion

addContentToDom();
