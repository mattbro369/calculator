//TODO CSS TIME BABY

const display = document.querySelector("#display");
const displayInitial = document.querySelector("#initial");
const eventField = document.querySelector("#button-container");
const displaySecond = document.createElement("div");
eventField.addEventListener("click", logClick);
window.addEventListener("keydown", (event) => {
	logPress(event);
	if (button !== undefined) {
		logClick(event, button);
		button = undefined;
	}
});
displayInitial.innerText = "0";

let decimalEntered = false;
let a, b, operator, answer;
let operatorArr = [];
let button;

function logPress(event) {
	let key = event.code;

	switch (key) {
		case "Numpad0":
		case "Digit0":
			button = document.getElementById("0");
			break;
		case "Numpad1":
		case "Digit1":
			button = document.getElementById("1");
			break;
		case "Numpad2":
		case "Digit2":
			button = document.getElementById("2");
			break;
		case "Numpad3":
		case "Digit3":
			button = document.getElementById("3");
			break;
		case "Numpad4":
		case "Digit4":
			button = document.getElementById("4");
			break;
		case "Numpad5":
		case !event.shiftKey && "Digit5":
			button = document.getElementById("5");
			break;
		case "Numpad6":
		case "Digit6":
			button = document.getElementById("6");
			break;
		case "Numpad7":
		case "Digit7":
			button = document.getElementById("7");
			break;
		case "Numpad8":
		case !event.shiftKey && "Digit8":
			button = document.getElementById("8");
			break;
		case "Numpad9":
		case "Digit9":
			button = document.getElementById("9");
			break;
		case "NumpadMultiply":
		case event.shiftKey && "Digit8":
			button = document.getElementById("multiply");
			break;
		case "NumpadAdd":
		case event.shiftKey && "Equal":
			button = document.getElementById("add");
			break;
		case "NumpadSubtract":
		case "Minus":
			button = document.getElementById("subtract");
			break;
		case "NumpadDivide":
		case "Slash":
			event.preventDefault();
			button = document.getElementById("divide");
			break;
		case event.shiftKey && "Digit5":
			button = document.getElementById("percent");
			break;
		case "NumpadDecimal":
		case "Period":
			button = document.getElementById("decimal");
			break;
		case "NumpadEnter":
		case "Enter":
		case "Equal":
			button = document.getElementById("equals");
			break;
		case !event.shiftKey && "Backspace":
		case !event.shiftKey && "Delete":
			button = document.getElementById("delete");
			break;
		case event.shiftKey && "Backspace":
		case event.shiftKey && "Delete":
			clearDisplay();
		default:
			button = undefined;
	}
	if (button === undefined) {
		return;
	}
	return button;
}

function logClick(e, button) {
	if (!logPress(e) && e.target.classList.contains("button")) {
		button = e.target;
	}
	if (button === undefined) return;
	console.log(button);

	switch (true) {
		case button.id === "clear":
			clearDisplay();
			break;
		case button.id === "delete":
			if (displayInitial.innerText.charAt(0) === "=") return;
			if (displayInitial.innerText !== "0") removeLastChar(displayInitial);
			if (displayInitial.innerText.length < 1) {
				displayInitial.innerText = "0";
			}
			if (
				displaySecond.innerText.length > 1 &&
				displayInitial.innerText === "0"
			) {
				removeLastChar(displaySecond);
				displayInitial.innerText = displaySecond.innerText;
				displaySecond.innerText = "";
				operatorArr.shift();
				a = undefined;
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
				let mathOperator = operator;
				if (operator === "*") {
					mathOperator = "×";
				} else if (operator === "/") {
					mathOperator = "÷";
				}
				displayInitial.innerText += mathOperator;
				addInnerDisplay();
				displaySecond.innerText = `${a} ${mathOperator}`;
				displayInitial.innerText = "0";
				decimalEntered = false;
			} else if (operatorArr.length === 1 && displayInitial.innerText === "0") {
				getOperator(button);
			} else if (operatorArr.length === 1 && displayInitial.innerText !== "0") {
				getNumber();
				operate(operatorArr);
				getOperator(button);
			}

			if (operatorArr[0] === "*") {
				displaySecond.innerText = `${a} ×`;
			} else if (operatorArr[0] === "/") {
				displaySecond.innerText = `${a} ÷`;
			} else {
				displaySecond.innerText = `${a} ${operatorArr[0]}`;
			}
			displayInitial.innerText = "0";
			decimalEntered = false;
			break;

		//PROTO PERCENT FUNC
		case button.id === "percent":
			if (a === undefined) {
				a = parseInt(displayInitial.innerText) / 100;
			} else if (b === undefined) {
				b = (parseInt(displayInitial.innerText) / 100) * a;
			}

			displayInitial.innerText += "%";
			// getNumber();
			console.log(a);
			console.log(b);
			break;
		//END OF PROTO
		case button.id === "equals":
			if (
				displayInitial.innerText.charAt(0) === "=" ||
				operatorArr.length === 0
			)
				return;
			getNumber();
			operate(operator);
			displaySecond.innerText += " " + displayInitial.innerText;
			displayInitial.innerText = "= " + a;
			decimalEntered = false;
			operatorArr = [];
			break;
		case displayInitial.innerText === "0":
			if (button.innerText !== "0") {
				displayInitial.innerText = button.innerText;
			} else if ((button.innerText = "0")) {
				return;
			}
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
		case operatorArr[0] === "×":
			answer = a * b;
			break;
		case operatorArr[0] === "÷":
			if (b === 0) {
				alert("Dividing by 0 is undefined");
			}
			answer = a / b;
			break;
	}
	a = Number(answer.toFixed(3));
	b = undefined;
	answer = undefined;
	button = undefined;

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
	key = undefined;
	button = undefined;
	operator = "";
	operatorArr = [];
}

function removeLastChar(e) {
	let finalChar = e.innerText.charAt(e.innerText.length - 1);
	switch (true) {
		case finalChar === ".":
			e.innerText = e.innerText.slice(0, -1);
			decimalEntered = false;
			break;
		case finalChar === "+" || "-" || "*" || "/":
			e.innerText = e.innerText.slice(0, -1);
			break;
		default:
			e.innerText = e.innerText.slice(0, -1);
			break;
	}
}

function getNumber() {
	if (displayInitial.innerText.includes("=")) {
		return;
	}

	if (a === undefined) {
		if (displayInitial.innerText.includes(".")) {
			a = parseFloat(displayInitial.innerText);
		} else {
			a = parseInt(displayInitial.innerText);
		}
	} else {
		if (displayInitial.innerText.includes(".")) {
			b = parseFloat(displayInitial.innerText);
		} else if (b === undefined) {
			b = parseInt(displayInitial.innerText);
		}
	}
}

function getOperator(button) {
	operator = button.innerText;
	if (operatorArr.length === 1) {
		operatorArr[0] = operator;
	} else {
		operatorArr.push(operator);
	}
}

function addInnerDisplay() {
	display.insertBefore(displaySecond, displayInitial);
}

// KEEPING OLD REMOVELASTCHAR FUNCTION INCASE OF ERRORS

// function removeLastChar() {
// 	let finalChar = displayInitial.innerText.charAt(
// 		displayInitial.innerText.length - 1
// 	);
// 	switch (true) {
// 		case finalChar === ".":
// 			displayInitial.innerText = displayInitial.innerText.slice(0, -1);
// 			decimalEntered = false;
// 			break;
// 		case finalChar === "+" || "-" || "*" || "/":
// 			displayInitial.innerText = displayInitial.innerText.slice(0, -1);
// 			break;
// 		default:
// 			displayInitial.innerText = displayInitial.innerText.slice(0, -1);
// 			break;
// 	}
// }
