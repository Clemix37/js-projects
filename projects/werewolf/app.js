import Role from "./js/Role.js";

const gameOptions = document.getElementById("game-options");
const gameOrder = document.getElementById("game-order");
const game = document.getElementById("game");
const inputNbVillagers = document.getElementById("nb-villagers");
const inputNbWerewolves = document.getElementById("nb-werewolves");
const chbxHunter = document.getElementById("hunter");
const chbxAngel = document.getElementById("angel");
const chbxCupid = document.getElementById("cupid");
const chbxWitch = document.getElementById("witch");
const chbxSeer = document.getElementById("seer");
const btnPlay = document.getElementById("btn-play");
const btnReload = document.getElementById("btn-reload");
/**
 * @type {Role}
 */
let roles = [];

function play() {
	saveRolesSelected();
	displayGameOrder();
	game.style.display = "flex";
	btnReload.addEventListener("click", () => window.location.reload());
	gameOptions.innerHTML = "";
}

function saveRolesSelected() {
	if (chbxCupid.checked) roles.push(new Role("Cupid", 0));
	if (chbxSeer.checked) roles.push(new Role("Seer", 1));
	const nbVillagers = +inputNbVillagers.value;
	const nbWerewolves = +inputNbWerewolves.value;
	for (let i = 0; i < nbVillagers; i++) {
		roles.push(new Role("Villager", -1));
	}
	for (let i = 0; i < nbWerewolves; i++) {
		roles.push(new Role("Werewolf", 2));
	}
}

function displayGameOrder() {
	gameOrder.innerHTML = roles
		.filter((r) => r.orderInNight >= 0)
		.reduce(
			(acc, role) => acc + role.getTemplate(),
			"<div class='flex justify-content-center'><p>Order of roles:</p></div>",
		);
}

btnPlay.addEventListener("click", play);
