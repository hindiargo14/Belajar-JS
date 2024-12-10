document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let currentInput = "";
    let previousInput = "";
    let operator = null;
  
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
  
        if (value === "C") {
          currentInput = "";
          previousInput = "";
          operator = null;
          display.textContent = "0";
        } else if (value === "=") {
          if (currentInput && operator && previousInput) {
            currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
            display.textContent = currentInput;
            previousInput = "";
            operator = null;
          }
        } else if (["+", "-", "*", "/"].includes(value)) {
          if (currentInput) {
            operator = value;
            previousInput = currentInput;
            currentInput = "";
          }
        } else {
          currentInput += value;
          display.textContent = currentInput;
        }
      });
    });
  });
  