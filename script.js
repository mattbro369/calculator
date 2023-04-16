const display = document.querySelector("#display");
const eventField = document.querySelector("#button-container");
eventField.addEventListener("click", logClick);

function logClick(e) {
	if (e.target.classList.contains("button")) {
		if (e.target.classList.contains("clear")) {
			display.innerText = "0";
		} else if (e.target.classList.contains("delete")) {
			display.innerText = display.innerText.slice(0, -1);
			if (display.innerText.length === 0) {
				display.innerText = "0";
			}
		} else if (display.innerText === "0" && e.target.value !== "0") {
			display.innerText = e.target.innerText;
		} else {
			display.innerText += e.target.innerText;
		}
	}
}

let a, b, operator;

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
