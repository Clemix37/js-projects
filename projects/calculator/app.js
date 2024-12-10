const result = document.getElementById("result");
const btnAc = document.getElementById("btn-ac");
const btnZero = document.getElementById("btn-zero");
const btnOne = document.getElementById("btn-one");
const btnTwo = document.getElementById("btn-two");
const btnThree = document.getElementById("btn-three");
const btnFour = document.getElementById("btn-four");
const btnFive = document.getElementById("btn-five");
const btnSix = document.getElementById("btn-six");
const btnSeven = document.getElementById("btn-seven");
const btnEight = document.getElementById("btn-eight");
const btnNine = document.getElementById("btn-nine");
const btnModulo = document.getElementById("btn-modulo");
const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const btnDivide = document.getElementById("btn-divide");
const btnTimes = document.getElementById("btn-times");
const btnComma = document.getElementById("btn-comma");
const btnEqual = document.getElementById("btn-equal");
const actions = ["%", "/", "*", "-", "+"];
let orderOfActions = [];

//#region Events

function addEvents() {
	document.removeEventListener("keyup", onKeyUp);
	document.addEventListener("keyup", onKeyUp);
	addEventsOnButtons();
}

function addEventsOnButtons() {
	// AC
	btnAc.removeEventListener("click", () => doSomethingWithKey("AC"));
	btnAc.addEventListener("click", () => doSomethingWithKey("AC"));
	// 0
	btnZero.removeEventListener("click", () => doSomethingWithKey("0"));
	btnZero.addEventListener("click", () => doSomethingWithKey("0"));
	// 1
	btnOne.removeEventListener("click", () => doSomethingWithKey("1"));
	btnOne.addEventListener("click", () => doSomethingWithKey("1"));
	// 2
	btnTwo.removeEventListener("click", () => doSomethingWithKey("2"));
	btnTwo.addEventListener("click", () => doSomethingWithKey("2"));
	// 3
	btnThree.removeEventListener("click", () => doSomethingWithKey("3"));
	btnThree.addEventListener("click", () => doSomethingWithKey("3"));
	// 4
	btnFour.removeEventListener("click", () => doSomethingWithKey("4"));
	btnFour.addEventListener("click", () => doSomethingWithKey("4"));
	// 5
	btnFive.removeEventListener("click", () => doSomethingWithKey("5"));
	btnFive.addEventListener("click", () => doSomethingWithKey("5"));
	// 6
	btnSix.removeEventListener("click", () => doSomethingWithKey("6"));
	btnSix.addEventListener("click", () => doSomethingWithKey("6"));
	// 7
	btnSeven.removeEventListener("click", () => doSomethingWithKey("7"));
	btnSeven.addEventListener("click", () => doSomethingWithKey("7"));
	// 8
	btnEight.removeEventListener("click", () => doSomethingWithKey("8"));
	btnEight.addEventListener("click", () => doSomethingWithKey("8"));
	// 9
	btnNine.removeEventListener("click", () => doSomethingWithKey("9"));
	btnNine.addEventListener("click", () => doSomethingWithKey("9"));
	// %
	btnModulo.removeEventListener("click", () => doSomethingWithKey("%"));
	btnModulo.addEventListener("click", () => doSomethingWithKey("%"));
	// +
	btnPlus.removeEventListener("click", () => doSomethingWithKey("+"));
	btnPlus.addEventListener("click", () => doSomethingWithKey("+"));
	// -
	btnMinus.removeEventListener("click", () => doSomethingWithKey("-"));
	btnMinus.addEventListener("click", () => doSomethingWithKey("-"));
	// /
	btnDivide.removeEventListener("click", () => doSomethingWithKey("/"));
	btnDivide.addEventListener("click", () => doSomethingWithKey("/"));
	// *
	btnTimes.removeEventListener("click", () => doSomethingWithKey("*"));
	btnTimes.addEventListener("click", () => doSomethingWithKey("*"));
	// ,
	btnComma.removeEventListener("click", () => doSomethingWithKey(","));
	btnComma.addEventListener("click", () => doSomethingWithKey(","));
	// =
	btnEqual.removeEventListener("click", () => doSomethingWithKey("="));
	btnEqual.addEventListener("click", () => doSomethingWithKey("="));
}

//#endregion

function displayOnResult(display = "") {
	result.innerText = display;
}

function onKeyUp(e) {
	doSomethingWithKey(e.key);
}

function doSomethingWithKey(key) {
	if (!key) return;
	if (key === "AC") return emptyData();
	const actualContentResult = result.innerText;
	const isKeyNumber = !isNaN(+key);
	const isAction = actions.includes(key);
	// If is action and last key was an action
	// if (isAction && actions.includes(orderOfActions[orderOfActions.length - 1])) return;
	const isEnterOrEqual = key === "=" || key === "Enter";
	if (isKeyNumber) displayOnResult(actualContentResult + key);
	else if (key === "Backspace" && actualContentResult.length > 0) {
		const splited = actualContentResult.split("");
		const dernierElementEstAction = actions.includes(splited[splited.length - 1]);
		if (dernierElementEstAction) {
			orderOfActions.pop(); // Removes the action
			orderOfActions.pop(); // Removes the value associated with the action
		}
		splited.pop();
		displayOnResult(splited.join(""));
	} else if (isAction || isEnterOrEqual) {
		const contentBeforeAction =
			orderOfActions.length > 0 ? actualContentResult.split(orderOfActions.join(""))[1] : actualContentResult;
		orderOfActions.push(contentBeforeAction);
		if (!isEnterOrEqual) {
			orderOfActions.push(key);
			displayOnResult(actualContentResult + key);
		} else calculate();
	}
}

function emptyData() {
	displayOnResult();
	orderOfActions = [];
}

function calculate() {
	if (orderOfActions.length <= 0) return;
	let result = +orderOfActions[0];
	for (let i = 1; i < orderOfActions.length; i += 2) {
		const action = orderOfActions[i];
		const nextValue = orderOfActions.length > i + 1 ? +orderOfActions[i + 1] : null;
		if (!nextValue && nextValue !== 0) continue;
		if (action === "+") result += nextValue;
		else if (action === "-") result -= nextValue;
		else if (action === "/") result /= nextValue;
		else if (action === "%") result %= nextValue;
	}
	emptyData();
	displayOnResult(result);
}

emptyData();
addEvents();
