let whoseTurn = "X";
function changeWhoseTurn() {
  whoseTurn = whoseTurn === "X" ? "O" : "X";
}

let gameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const possibleWins = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];
function assessGameStatus() {
  for (let [[r1, c1], [r2, c2], [r3, c3]] of possibleWins) {
    if (
      typeof gameBoard[r1][c1] === "string" &&
      gameBoard[r1][c1] === gameBoard[r2][c2] &&
      gameBoard[r1][c1] === gameBoard[r3][c3]
    ) {
      return [true, gameBoard[r1][c1]];
    }
  }
  if (gameBoard.every((row) => row.every((cell) => cell !== null))) {
    return [true, null];
  }
  return [false, null];
}

const restartBtn = document.querySelector("#restart");
const grid = document.querySelector("#grid");
const result = document.querySelector("#result");
const help = document.querySelector("#help");
const namesForm = document.querySelector("#set-names");
const p1Name = document.querySelector("#p1-name");
const p2Name = document.querySelector("#p2-name");

const playerNames = {
  X: "X",
  O: "O",
};
function setPlayerNames(e) {
  e.preventDefault();
  playerNames["X"] = p1Name.value;
  playerNames["O"] = p2Name.value;
  namesForm.style.display = "none";
}

function setupDisplay() {
  grid.textContent = "";
  result.textContent = "";
  help.style.display = "block";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.id = `cell-${i}-${j}`;
      cell.classList.add("cell");
      cell.addEventListener("click", (e) => {
        if (assessGameStatus()[0] || e.target.textContent) {
          return;
        }
        e.target.textContent = whoseTurn;
        const [, row, col] = e.target.id.split("-");
        gameBoard[row][col] = whoseTurn;
        changeWhoseTurn();
        const [gameOver, winner] = assessGameStatus();
        if (gameOver) {
          help.style.display = "none";
          if (winner) {
            result.textContent = `${playerNames[winner]} wins!`;
          } else {
            result.textContent = "It's a tie!";
          }
        }
      });
      grid.appendChild(cell);
    }
  }
}

restartBtn.addEventListener("click", () => {
  gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  setupDisplay();
});

setupDisplay();
