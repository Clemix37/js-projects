const CLASS_BTN_GO_FLOOR = "btn-go-floor";
const FLOOR = "floor";
const ELEVATOR_FLOOR = "elevator-floor";
let currentFloor = 0;

function onBtnGoToFloorClick(e) {
	currentFloor = +e.currentTarget.dataset.floor;
	resetElevatorFloors();
	displayCurrentFloor();
	console.log(dataFloor);
}

function resetElevatorFloors() {
	const elevatorFloors = document.querySelectorAll(`.${ELEVATOR_FLOOR}`);
	for (let i = 0; i < elevatorFloors.length; i++) {
		const elavatorFloor = elevatorFloors[i];
		elavatorFloor.innerText = "";
	}
}

function displayCurrentFloor() {
	const newElevatorFloor = document.querySelector(`.${ELEVATOR_FLOOR}[data-floor="${currentFloor}"]`);
	if (!newElevatorFloor) return;
	newElevatorFloor.innerText = "Current";
}

function attachBtnsGoToFloorClickEvents() {
	const btnsGotToFloor = document.querySelectorAll(`.${CLASS_BTN_GO_FLOOR}`);
	for (let i = 0; i < btnsGotToFloor.length; i++) {
		const btn = btnsGotToFloor[i];
		btn.addEventListener("click", onBtnGoToFloorClick);
	}
}

displayCurrentFloor();
attachBtnsGoToFloorClickEvents();
