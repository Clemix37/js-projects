import Color from "./Color.js";

let btnGenerate = document.getElementById("btnGenerate");
let colorContainer = document.getElementById("colorContainer");
btnGenerate.addEventListener("click", generate);
document.addEventListener("DOMContentLoaded", generate);
document.addEventListener("keyup", onKeyUp);

function generate() {
	let color = new Color();
	colorContainer.innerHTML = `Color: ${color.color}`;
	document.querySelector("html").style.backgroundColor = color.color;
}

function onKeyUp(e) {
	const isSpacePressed = e.key === " ";
	if (!isSpacePressed) return;
	generate();
}
