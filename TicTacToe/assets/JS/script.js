const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset-btn");
const startButton = document.getElementById("start-btn");
const player1Input = document.getElementById("player1-name");
const player2Input = document.getElementById("player2-name");
const gameContainer = document.getElementById("game-container");
const player1ScoreText = document.getElementById("player1-score");
const player2ScoreText = document.getElementById("player2-score");
const drawCountText = document.getElementById("draw-count");
const player1ScoreName = document.getElementById("player1-score-name");
const player2ScoreName = document.getElementById("player2-score-name");

let currentPlayer = "X";
let player1 = "Player 1";
let player2 = "Player 2";
let gameBoard = Array(9).fill(null);
let isGameActive = false;
let player1Score = 0;
let player2Score = 0;
let drawCount = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function createBoard() {
  board.innerHTML = "";
  gameBoard.forEach((_, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.addEventListener("click", handleCellClick);
    board.appendChild(cellElement);
  });
}

function handleCellClick(e) {
  const cellIndex = e.target.dataset.index;

  if (!isGameActive || gameBoard[cellIndex]) return;

  gameBoard[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWin()) {
    updateScore(currentPlayer === "X" ? player1 : player2);
    statusText.textContent = `${currentPlayer === "X" ? player1 : player2} wins!`;
    isGameActive = false;
  } else if (gameBoard.every(cell => cell)) {
    updateDrawCount();
    statusText.textContent = "It's a draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer === "X" ? player1 : player2}'s turn`;
  }
}

function checkWin() {
  return winningCombinations.some(combination =>
    combination.every(index => gameBoard[index] === currentPlayer)
  );
}

function updateScore(winner) {
  if (winner === player1) {
    player1Score++;
    player1ScoreText.textContent = player1Score;
  } else {
    player2Score++;
    player2ScoreText.textContent = player2Score;
  }
}

function updateDrawCount() {
  drawCount++;
  drawCountText.textContent = drawCount;
}

startButton.addEventListener("click", () => {
  player1 = player1Input.value || "Player 1";
  player2 = player2Input.value || "Player 2";
  player1ScoreName.textContent = player1;
  player2ScoreName.textContent = player2;
  resetGame();
  gameContainer.classList.remove("hidden");
  statusText.textContent = `${player1}'s turn`;
});

resetButton.addEventListener("click", () => {
  player1Score = 0;
  player2Score = 0;
  drawCount = 0;
  player1ScoreText.textContent = player1Score;
  player2ScoreText.textContent = player2Score;
  drawCountText.textContent = drawCount;
  resetGame();
});

function resetGame() {
  isGameActive = true;
  currentPlayer = "X";
  gameBoard = Array(9).fill(null);
  createBoard();
  statusText.textContent = `${player1}'s turn`;
}
