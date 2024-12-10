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
  
    // Fungsi menambahkan riwayat
    function addToHistory(entry) {
      const li = document.createElement("li");
      li.textContent = entry;
      historyList.prepend(li); // Tambahkan ke atas daftar
      updateClearHistoryButton(); // Perbarui tombol Clear History
    }
  
    // Event listener untuk tombol Clear History
    clearHistoryButton.addEventListener("click", () => {
      historyList.innerHTML = ""; // Kosongkan isi daftar
      updateClearHistoryButton(); // Perbarui tombol Clear History
    });
  
    // Fungsi untuk memperbarui status tombol Clear History
    function updateClearHistoryButton() {
      if (historyList.children.length === 0) {
        clearHistoryButton.disabled = true; // Nonaktifkan tombol jika tidak ada riwayat
      } else {
        clearHistoryButton.disabled = false; // Aktifkan tombol jika ada riwayat
      }
    }
  
    // Inisialisasi awal tombol Clear History
    updateClearHistoryButton();
  });
  