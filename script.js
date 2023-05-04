const display = document.querySelector("#display");
const displayInitial = document.querySelector("#initial");
const eventField = document.querySelector("#button-container");
const displaySecond = document.createElement("div");
eventField.addEventListener("click", logClick);
displayInitial.innerText = "0";

let decimalEntered = false;
let a, b, operator, answer;
let operatorArr = [];

function logClick(e) {
	const button = e.target;

	if (e.target.classList.contains("button")) {
		switch (true) {
			case button.classList.contains("clear"):
				clearDisplay();
				break;
			case button.classList.contains("delete"):
				if (displayInitial.innerText.charAt(0) === "=") return;
				if (displayInitial.innerText !== "0") removeLastChar();
				if (displayInitial.innerText.length < 1) {
					displayInitial.innerText = "0";
				}
				break;
			case button.innerText === ".":
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
			case button.classList.contains("equals"):
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
	} else return;
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
