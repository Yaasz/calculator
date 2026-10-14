//operations
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const multiply = (a, b) => a * b;
const div = (a, b) => {
	if (b == 0) {
		return "error";
	}
	return (a / b).toFixed(2);
};
const pow = (a, b) => a ** b;
const rem = (a, b) => a % b;

const operate = (a, operator, b) => {
	a = Number(a);
	b = Number(b);
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
	1,
	2,
	"^",
	3,
	4,
	"*",
	5,
	6,
	"%",
	7,
	8,
	"/",
	9,
	0,
	".",
	"Del",
	"=",
];
let buttonContainer = document.querySelector(".button-container");
let input = document.querySelector("#input");

symbols.map((symbol) => {
	let button = document.createElement("button");
	button.innerText = symbol;
	if (symbol == "Del") {
		button.setAttribute("class", "button del");
		button.setAttribute("style", "background-color:red;");
	} else if (symbol == ".") {
		button.setAttribute("class", "button dot");
		button.setAttribute("style", "background-color:orange;");
	} else if (symbol == "=") {
		button.setAttribute("class", "button eq");
		button.setAttribute("style", "background-color:blue;");
	} else {
		button.setAttribute("class", "button");
	}
	buttonContainer.appendChild(button);
});
let del = document.querySelector(".del");

del.addEventListener("click", (e) => {
	if (input.value != 0) {
		input.value = input.value.slice(0, -1);
		input.dispatchEvent(new Event("change"));
	}
});
let buttons = [...document.querySelectorAll(".button")];
let operators = ["C", "+", "-", "*", "/", "%", "^"];
let operatorButtons = buttons.filter((button) => {
	return operators.includes(button.innerText);
});
operatorButtons.forEach((button) => {
	button.setAttribute("style", "background-color:orange;");
});
function isOperator(char) {
	return operators.includes(char);
}
let operandA = null;
let operandB = null;
let operator = null;
let eqClicked = false;
buttonContainer.addEventListener("click", (e) => {
	if (e.target.nodeName === "BUTTON") {
		if (e.target.innerText == "C") {
			input.value = 0;
			operandA = null;
			operator = null;
			return;
		}
		if (e.target.innerText == "Del") {
			return;
		}

		if (eqClicked) {
			input.value = 0;
			operandA = null;
			operandB = null;
			operator = null;
			eqClicked = false;
		}
		if (input.value == 0) {
			if (e.target.innerText != "=") {
				input.value = e.target.innerText;
				input.dispatchEvent(new Event("change"));
			} else {
				eqClicked = true;
				input.dispatchEvent(new Event("change"));
			}
		} else {
			if (e.target.innerText != "=") {
				input.value += e.target.innerText;
				input.dispatchEvent(new Event("change"));
			} else {
				eqClicked = true;
				input.dispatchEvent(new Event("change"));
			}
		}
	}
});
input.addEventListener("change", (e) => {
	if (isOperator(e.target.value.at(-1)) || eqClicked) {
		if (operandA == null) {
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
			if (operandB != "" && eqClicked) {
				operandB = e.target.value.slice(e.target.value.indexOf(operator) + 1);
				operandA = operate(operandA, operator, operandB);
			} else {
				operandB = e.target.value.slice(
					e.target.value.indexOf(operator) + 1,
					-1,
				);

				operandA = operate(operandA, operator, operandB);
			}
			operandB = null;
			if (eqClicked) {
				eqClicked = true;
				e.target.value = operandA;
				operator = null;
			} else {
				operator = e.target.value.at(-1);
				e.target.value = operandA + operator;
			}
		}
	}
});
