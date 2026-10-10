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
symbols.map((symbol) => {
	let button = document.createElement("button");
	button.innerText = symbol;
	button.setAttribute("class", "button");
	buttonContainer.appendChild(button);
});
