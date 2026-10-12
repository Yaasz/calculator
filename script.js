//operations
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const multiply = (a, b) => a * b;
const div = (a, b) => a / b;
const pow = (a, b) => a ** b;
const rem = (a, b) => a % b;

const operate = (a, operator, b) => {
	a = parseInt(a);
	b = parseInt(b);
	switch (operator) {
		case "+":
			return add(a, b);
		case "-":
			return sub(a, b);
		case "*":
			return multiply(a, b);
		case "/":
			return div(a, b);
		case "^":
			return pow(a, b);
		case "%":
			return rem(a, b);
		default:
			return "invalid operator";
	}
};
let symbols = [
	"C",
	"+",
	"-",
	"*",
	"/",
	"%",
	"^",
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	0,
	"=",
];
let buttonContainer = document.querySelector(".button-container");
let input = document.querySelector("#input");

symbols.map((symbol) => {
	let button = document.createElement("button");
	button.innerText = symbol;
	button.setAttribute("class", "button");
	buttonContainer.appendChild(button);
});

let buttons = [...document.querySelectorAll(".button")];
let operators = ["C", "+", "-", "*", "/", "%", "^", "="];
let operatorButtons = buttons.filter((button) => {
	return [operators.includes(button.innerText)];
});

function isOperator(char) {
	return operators.includes(char);
}
let operandA = null;
let operandB = null;
let operator = null;
input.addEventListener("change", (e) => {
	if (isOperator(e.target.value.at(-1))) {
		if (operandA == null) {
			console.log("num", Number(e.target.value.slice(0, -1)));
			if (Number(e.target.value.slice(0, -1)) == 0) {
				operandA = 0;
			} else {
				operandA = e.target.value.slice(0, -1);
			}
			operator = e.target.value.at(-1);
			return;
		} else {
			if (operator == null) {
				operator = e.target.value.at(-1);
				e.target.value = operandA + operator;
				return;
			}
			operandB = e.target.value.slice(e.target.value.indexOf(operator) + 1, -1);
			if (operandB != "") {
				operandA = operate(operandA, operator, operandB);
			}
			operandB = null;
			if (e.target.value.at(-1) == "=") {
				e.target.value = operandA;
				operator = null;
			} else {
				operator = e.target.value.at(-1);
				e.target.value = operandA + operator;
			}
		}
	}
});
buttonContainer.addEventListener("click", (e) => {
	if (e.target.nodeName === "BUTTON") {
		if (e.target.innerText == "C") {
			input.value = 0;
			operandA = null;
			operator = null;
			return;
		}
		if (input.value == 0) {
			input.value = e.target.innerText;
			input.dispatchEvent(new Event("change"));
		} else {
			input.value += e.target.innerText;
			input.dispatchEvent(new Event("change"));
		}
	}
});
