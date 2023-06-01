let winScore;
let gameMode;
let player1Name;
let player2Name;
let currentPlayer;
let scores;
let cells;
let turnMessage;
let gameOver;
let winningCombinations;

function startGame() {
  winScore = parseInt(
    document.querySelector('input[name="winScore"]:checked').value
  );
  gameMode = document.querySelector('input[name="gameMode"]:checked').value;
  player1Name = document.getElementById("player1Name").value;
  player2Name = document.getElementById("player2Name").value;
  currentPlayer = "X";
  scores = {
    X: 0,
    O: 0,
  };
  cells = Array.from(document.querySelectorAll("#cells div"));
  turnMessage = document.getElementById("turnMessage");
  gameOver = false;
  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  if (gameMode === "single") {
    if (player1Name === "") {
      alert("Please enter your name.");
      return;
    }
    alert(`Welcome, ${player1Name}! You are playing against the CPU.`);
  } else {
    if (player1Name === "" || player2Name === "") {
      alert("Please enter the names of both players.");
      return;
    }
    alert(
      `Welcome, ${player1Name} and ${player2Name}! Get ready to play against each other.`
    );
  }

  document.getElementById("player1Score").textContent = `${player1Name}: 0`;
  document.getElementById("player2Score").textContent = `${player2Name}: 0`;
  turnMessage.textContent = `Current turn: ${player1Name}`;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winning-cell");
  });

  document.getElementById("game-settings").classList.add("hidden");
  document.getElementById("game-board").classList.remove("hidden");

  if (gameMode === "single" && currentPlayer === "O") {
    makeCPUMove();
  }
}

function makeMove(cellIndex) {
  if (!gameOver && cells[cellIndex].textContent === "") {
    cells[cellIndex].textContent = currentPlayer;
    cells[cellIndex].classList.add(currentPlayer);
    checkWin();
    togglePlayer();
    updateTurnMessage();
    if (gameMode === "single" && currentPlayer === "O" && !gameOver) {
      makeCPUMove();
    }
  }
}

function makeCPUMove() {
  let emptyCells = cells.reduce((accumulator, cell, index) => {
    if (cell.textContent === "") {
      accumulator.push(index);
    }
    return accumulator;
  }, []);

  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  let cpuMoveIndex = emptyCells[randomIndex];

  setTimeout(() => {
    cells[cpuMoveIndex].textContent = currentPlayer;
    cells[cpuMoveIndex].classList.add(currentPlayer);
    checkWin();
    togglePlayer();
    updateTurnMessage();
  }, 500);
}

function checkWin() {
  for (let combination of winningCombinations) {
    let [a, b, c] = combination;
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      cells[a].classList.add("winning-cell");
      cells[b].classList.add("winning-cell");
      cells[c].classList.add("winning-cell");
      scores[currentPlayer]++;
      gameOver = true;
      updateScoreboard();
      if (scores[currentPlayer] === winScore) {
        setTimeout(() => {
          alert(`Game over! ${getPlayerName(currentPlayer)} wins the match!`);
          resetGame();
        }, 500);
      } else {
        setTimeout(() => {
          alert(`Round over! ${getPlayerName(currentPlayer)} wins this round!`);
          resetRound();
        }, 500);
      }
      break;
    }
  }
  if (!gameOver && cells.every((cell) => cell.textContent !== "")) {
    gameOver = true;
    setTimeout(() => {
      alert("It's a draw!");
      resetRound();
    }, 500);
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function updateTurnMessage() {
  turnMessage.textContent = `Current turn: ${getPlayerName(currentPlayer)}`;
}

function updateScoreboard() {
  document.getElementById(
    "player1Score"
  ).textContent = `${player1Name}: ${scores["X"]}`;
  document.getElementById(
    "player2Score"
  ).textContent = `${player2Name}: ${scores["O"]}`;
}

function resetRound() {
  currentPlayer = "X";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "winning-cell");
  });
  gameOver = false;
  updateTurnMessage();
}

function resetGame() {
  document.getElementById("game-settings").classList.remove("hidden");
  document.getElementById("game-board").classList.add("hidden");
  document.getElementById("player1Name").value = "";
  document.getElementById("player2Name").value = "";
  resetRound();
  scores["X"] = 0;
  scores["O"] = 0;
  updateScoreboard();
}

function getPlayerName(player) {
  return player === "X" ? player1Name : player2Name;
}
