const display = document.querySelector("#display");
const eventField = document.querySelector("#button-container");
eventField.addEventListener("click", logClick);
display.innerText = "0";

const dec = document.querySelector(".decimal");
let decimalEntered = false;
let a, b, operator;

function logClick(e) {
	const button = e.target;
	if (e.target.classList.contains("button")) {
		switch (true) {
			case button.classList.contains("clear"):
				display.innerText = "0";
				decimalEntered = false;
				break;
			case button.classList.contains("delete"):
				if (display.innerText.charAt(display.innerText.length - 1) === ".") {
					display.innerText = display.innerText.slice(0, -1) || "0";
					decimalEntered = false;
				} else {
					display.innerText = display.innerText.slice(0, -1) || "0";
				}
				break;
			case button.innerText === ".":
				if (!decimalEntered) {
					display.innerText += button.innerText;
					decimalEntered = true;
				}
				break;
			// case button.value === "." && display.innerText === "0":
			// 	display.innerText = "0.";
			// 	break;
			case display.innerText === "0" && button.value !== "0":
				display.innerText = button.innerText;
				break;
			default:
				display.innerText += button.innerText;
		}
	} else return;
}

function operate(a, b, operator) {
	switch (operator) {
		case "+":
			return add(a, b);
		case "-":
			return subtract(a, b);
		case "*":
			return multiply(a, b);
		case "/":
			return divide(a, b);
	}
}

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}
function divide(a, b) {
	return a / b;
}
