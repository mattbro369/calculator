//TODO There is an error which fires for button.classList
//TODO Fully check button functionality and click func works
//TODO CSS TIME BABY

const display = document.querySelector("#display");
const displayInitial = document.querySelector("#initial");
const eventField = document.querySelector("#button-container");
const displaySecond = document.createElement("div");
eventField.addEventListener("click", logClick);
window.addEventListener("keydown", (event) => {
	logPress(event);
	logClick(event, button);
});
displayInitial.innerText = "0";

let decimalEntered = false;
let a, b, operator, answer;
let operatorArr = [];
let button;

function logPress(event) {
	let key = event.code;
	console.log(key);

	switch (key) {
		case "Numpad0":
		case "Digit0":
			key = document.getElementById("0");
			break;
		case "Numpad1":
		case "Digit1":
			key = document.getElementById("1");
			break;
		case "Numpad2":
		case "Digit2":
			key = document.getElementById("2");
			break;
		case "Numpad3":
		case "Digit3":
			key = document.getElementById("3");
			break;
		case "Numpad4":
		case "Digit4":
			key = document.getElementById("4");
			break;
		case "Numpad5":
		case "Digit5":
			key = document.getElementById("5");
			break;
		case "Numpad6":
		case "Digit6":
			key = document.getElementById("6");
			break;
		case "Numpad7":
		case "Digit7":
			key = document.getElementById("7");
			break;
		case "Numpad8":
		case "Digit8":
			key = document.getElementById("8");
			break;
		case "Numpad9":
		case "Digit9":
			key = document.getElementById("9");
			break;
		case "NumpadMultiply":
			key = document.getElementById("multiply");
			break;
		case "NumpadAdd":
			key = document.getElementById("add");
			break;
		case "NumpadSubtract":
			key = document.getElementById("subtract");
			break;
		case "NumpadDivide":
			key = document.getElementById("divide");
			break;
		case "NumpadDecimal":
			key = document.getElementById("decimal");
			break;
		case "NumpadEnter":
		case "Enter":
			key = document.getElementById("equals");
			break;
		case "Backspace":
		case "Delete":
			key = document.getElementById("delete");
			break;
		default:
			break;
	}
	button = key;
	return button;
}

function logClick(e, button) {
	if (!logPress(e) && e.target.classList.contains("button")) {
		button = e.target;
	}

	switch (true) {
		case button.id === "clear":
			clearDisplay();
			break;
		case button.id === "delete":
			if (displayInitial.innerText.charAt(0) === "=") return;
			if (displayInitial.innerText !== "0") removeLastChar();
			if (displayInitial.innerText.length < 1) {
				displayInitial.innerText = "0";
			}
			break;
		case button.id === "decimal":
			if (displayInitial.innerText.charAt(0) === "=") return;
			if (!decimalEntered) {
				displayInitial.innerText += button.innerText;
				decimalEntered = true;
			}
			break;
		case button.classList.contains("operator"):
			if (operatorArr.length === 0) {
				getNumber();
				getOperator(button);
				displayInitial.innerText += button.innerText;
				addInnerDisplay();
				displaySecond.innerText = `${a} ${operator}`;
				displayInitial.innerText = "0";
				decimalEntered = false;
			} else if (operatorArr.length === 1) {
				getOperator(button);
				getNumber();
				operate(operatorArr);
				displaySecond.innerText = `${a} ${operatorArr[0]}`;
				displayInitial.innerText = "0";
				decimalEntered = false;
			}

			break;
		case displayInitial.innerText === "0" && button.value !== "0":
			displayInitial.innerText = button.innerText;
			break;
		case button.id === "equals":
			if (
				displayInitial.innerText === "0" ||
				displayInitial.innerText.charAt(0) === "=" ||
				operatorArr.length === 0
			)
				return;
			getNumber();
			operate(operator);
			displaySecond.innerText += " " + displayInitial.innerText;
			displayInitial.innerText = "=" + a;
			decimalEntered = false;
			operatorArr = [];
			break;
		default:
			if (displayInitial.innerText.charAt(0) === "=") {
				clearDisplay();
				displayInitial.innerText = button.innerText;
			} else {
				displayInitial.innerText += button.innerText;
			}
	}
}

function operate(operatorArr) {
	switch (true) {
		case operatorArr[0] === "+":
			answer = a + b;
			break;
		case operatorArr[0] === "-":
			answer = a - b;
			break;
		case operatorArr[0] === "*":
			answer = a * b;
			break;
		case operatorArr[0] === "/":
			answer = a / b;
			break;
	}
	a = answer;
	b = undefined;
	answer = undefined;

	if (operatorArr.length > 1) {
		operatorArr.shift();
	} else {
		operatorArr = [];
	}
}

function clearDisplay() {
	displayInitial.innerText = "0";
	displaySecond.innerText = "";
	decimalEntered = false;
	a = undefined;
	b = undefined;
	answer = undefined;
	operator = "";
	operatorArr = [];
}

function removeLastChar() {
	let finalChar = displayInitial.innerText.charAt(
		displayInitial.innerText.length - 1
	);
	switch (true) {
		case finalChar === ".":
			displayInitial.innerText = displayInitial.innerText.slice(0, -1);
			decimalEntered = false;
			break;
		case finalChar === "+" || "-" || "*" || "/":
			displayInitial.innerText = displayInitial.innerText.slice(0, -1);
			break;
		default:
			displayInitial.innerText = displayInitial.innerText.slice(0, -1);
			break;
	}
}

function getNumber() {
	if (a === undefined) {
		a = parseInt(displayInitial.innerText);
	} else {
		b = parseInt(displayInitial.innerText);
	}
}

function getOperator(button) {
	operator = button.innerText;
	operatorArr.push(operator);
}

function addInnerDisplay() {
	display.insertBefore(displaySecond, displayInitial);
}
