const display = document.querySelector(".calculator-display");
const buttons = document.querySelectorAll(".btn");
let currentInput = "";
let operator = "";
let previousInput = "";


const updateDisplay = () => {
  display.value = currentInput;
};


const handleInput = (value) => {
  if (["+", "-", "*", "/", "%"].includes(value)) {
    if (currentInput === "" && previousInput === "") return;
    if (operator && currentInput) {
      calculate();
    }
    operator = value;
    previousInput = currentInput;
    currentInput = "";
  } else if (value === "CLEAR") {
    currentInput = "";
    operator = "";
    previousInput = "";
  } else if (value === "BACKSPACE") {
    currentInput = currentInput.slice(0, -1);
  } else if (value === "=") {
    if (currentInput && operator && previousInput) {
      calculate();
      operator = "";
    }
  } else {
    currentInput += value;
  }
  updateDisplay();
};


const calculate = () => {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    case "%":
      result = prev % current;
      break;
    default:
      return;
  }
  currentInput = result.toString();
  previousInput = "";
};


buttons.forEach((button) => {
  button.addEventListener("click", (e) => handleInput(e.target.dataset.value));
});
