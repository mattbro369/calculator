const display = document.querySelector("#display");
const displayInitial = document.querySelector("#initial");
const eventField = document.querySelector("#button-container");
const displaySecond = document.createElement("div");
eventField.addEventListener("click", logClick);
displayInitial.innerText = "0";

let decimalEntered = false;
let operatorEntered = false;
let a, b, operator;

function logClick(e) {
	const button = e.target;

	if (e.target.classList.contains("button")) {
		switch (true) {
			case button.classList.contains("clear"):
				clearDisplay();
				break;
			case button.classList.contains("delete"):
				if (displayInitial.innerText !== "0") removeLastChar();
				if (displayInitial.innerText.length < 1) {
					displayInitial.innerText = "0";
				}
				break;
			case button.innerText === ".":
				if (!decimalEntered) {
					displayInitial.innerText += button.innerText;
					decimalEntered = true;
				}
				break;
			case button.classList.contains("operator"):
				if (!operatorEntered) {
					getNumber();
					displayInitial.innerText += button.innerText;
					operatorEntered = true;
					getOperator(button);
					addInnerDisplay();
					operatorEntered = false;
					decimalEntered = false;
				}
				break;
			case displayInitial.innerText === "0" && button.value !== "0":
				displayInitial.innerText = button.innerText;
				break;
			case button.classList.contains("equals"):
				if (displayInitial.innerText === "0") return;
				getNumber();
				operate(operator);
				displaySecond.innerText += " " + displayInitial.innerText;
				displayInitial.innerText = a;
				decimalEntered = false;
				break;
			default:
				displayInitial.innerText += button.innerText;
				operatorEntered = false;
		}
	} else return;
}

function operate(operator) {
	switch (true) {
		case operator === "+":
			a += b;
			break;
		case operator === "-":
			a -= b;
			break;
		case operator === "*":
			a *= b;
			break;
		case operator === "/":
			a /= b;
			break;
	}
}

function clearDisplay() {
	displayInitial.innerText = "0";
	displaySecond.innerText = "";
	decimalEntered = false;
	operatorEntered = false;
	a = undefined;
	b = undefined;
	operator = "";
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
			operatorEntered = false;
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

function getOperator() {
	operator = displayInitial.innerText.slice(-1);
}

function addInnerDisplay() {
	display.insertBefore(displaySecond, displayInitial);
	displaySecond.innerText = `${a} ${operator}`;
	displayInitial.innerText = "0";
}
