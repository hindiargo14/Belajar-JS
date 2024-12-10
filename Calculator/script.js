document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const historyList = document.getElementById("history-list");
    const clearHistoryButton = document.getElementById("clear-history");
  
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
            const result = eval(`${previousInput} ${operator} ${currentInput}`);
            const historyEntry = `${previousInput} ${operator} ${currentInput} = ${result}`;
            addToHistory(historyEntry);
            display.textContent = result;
            currentInput = result;
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
  
    function addToHistory(entry) {
      const li = document.createElement("li");
      li.textContent = entry;
      historyList.prepend(li);
      updateClearHistoryButton();
    }
  
    clearHistoryButton.addEventListener("click", () => {
      historyList.innerHTML = "";
      updateClearHistoryButton();
    });
  
    function updateClearHistoryButton() {
      if (historyList.children.length === 0) {
        clearHistoryButton.disabled = true;
      } else {
        clearHistoryButton.disabled = false;
      }
    }
  
    updateClearHistoryButton();
  });
  