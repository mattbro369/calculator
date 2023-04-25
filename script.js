const display = document.querySelector("#display");
const displayInitial = document.querySelector("#initial");
const eventField = document.querySelector("#button-container");
const displaySecond = document.createElement("div");
eventField.addEventListener("click", logClick);
displayInitial.innerText = "0";

let numbersArr = [];
let operatorsArr = [];
let decimalEntered = false;
let operatorEntered = false;
let number;

// TODO SPLIT STRING FROM DISPLAY INTO ARRAY AT THE OPERATORS

function logClick(e) {
	const button = e.target;

	if (e.target.classList.contains("button")) {
		switch (true) {
			case button.classList.contains("clear"):
				clearDisplay();
				break;
			case button.classList.contains("delete"):
				if (
					displayInitial.innerText.charAt(
						displayInitial.innerText.length - 1
					) === "."
				) {
					removeLastChar();
					decimalEntered = false;
				} else if (
					checkOperatorArr(
						operatorsArr,
						displayInitial.innerText.charAt(displayInitial.innerText.length - 1)
					)
				) {
					removeLastChar();
					operatorEntered = false;
				} else {
					removeLastChar();
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
					getOperator(button);
					displayInitial.innerText += button.innerText;
					operatorEntered = true;
				}
				break;
			case displayInitial.innerText === "0" && button.value !== "0":
				displayInitial.innerText = button.innerText;
				break;
			case button.classList.contains("equals"):
				if (displayInitial.innerText === "0") return;
				if (numbersArr.length < 1) return;
				console.log(proto());
				// operate();
				break;
			default:
				displayInitial.innerText += button.innerText;
				operatorEntered = false;
				decimalEntered = false;
		}
	} else return;
}

function operate() {
	console.log("working");

	switch (operator) {
		case "+":
			return add(numbers[0], numbers[1]);
		case "-":
			return subtract(numbers[0], numbers[1]);
		case "*":
			return multiply(numbers[0], numbers[1]);
		case "/":
			return divide(numbers[0], numbers[1]);
	}
}
function clearDisplay() {
	displayInitial.innerText = "0";
	displaySecond.innerText = "";
	decimalEntered = false;
	operatorEntered = false;
	numbersArr = [];
	operatorsArr = [];
}
function removeLastChar() {
	displayInitial.innerText = displayInitial.innerText.slice(0, -1) || "0";
}
function getNumber() {
	number = parseInt(displayInitial.innerText);
	numbersArr.push(number);
}
function getOperator(operator) {
	operatorsArr.push(operator.innerText);
}
function addInnerDisplay() {
	display.insertBefore(displaySecond, displayInitial);
	displaySecond.innerText = `${numbers[0]} ${operator}`;
	displayInitial.innerText = "0";
}
function checkOperatorArr(array, char) {
	return array.some((arrayItem) => char === arrayItem);
}
function add(a, b) {
	console.log(a + b);
	return a + b;
}
function subtract(a, b) {
	console.log(a - b);
	return a - b;
}
function multiply(a, b) {
	console.log(a * b);
	return a * b;
}
function divide(a, b) {
	console.log(a / b);
	return a / b;
}

// Prototype
function proto() {
	operatorsArr = displayInitial.innerText.split(/\d/g);
	operatorsArr = operatorsArr.filter((item) => item !== "");
	numbersArr = displayInitial.innerText.split(/[+*\/-]/gm);
	numbersArr = numbersArr.map(Number);
	console.log(numbersArr);
	console.log(operatorsArr);

	// OPERATING SWITCH STATEMENT - Does not function fully - Will probably be replaced in future by more efficient method
	//TODO - Make operator take more than 2 numbers
	//TODO - Make sure it can handle multiple operators
	//TODO - Array.reduce might be useful here ^^

	switch (true) {
		case operatorsArr[0] === "+":
			add(numbersArr[0], numbersArr[1]);
			break;
		case operatorsArr[0] === "-":
			subtract(numbersArr[0], numbersArr[1]);
			break;
		case operatorsArr[0] === "*":
			multiply(numbersArr[0], numbersArr[1]);
			break;
		case operatorsArr[0] === "/":
			divide(numbersArr[0], numbersArr[1]);
			break;
		default:
			console.error("no numbers input");
			break;
	}
}
