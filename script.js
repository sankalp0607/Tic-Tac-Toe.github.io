 // script.js

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = "player";
let player1Name = "";
let player2Name = "MURAKH BOT";

const statusDisplay = document.getElementById("status");
const popup = document.getElementById("popup");
const winnerText = document.getElementById("winnerText");

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function setMode(mode) {
    gameMode = mode;
    resetGame();
}

function startGame() {
    player1Name = document.getElementById("player1Name").value || "Player 1";
    player2Name = gameMode === "computer" ? "Computer" : (document.getElementById("player2Name").value || "Player 2");
    resetGame();
    statusDisplay.textContent = `${player1Name}'s turn`;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === "" || b === "" || c === "") continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayWinner(currentPlayer === "X" ? player1Name : player2Name);
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        displayWinner("No one");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s turn`;
}

function displayWinner(winner) {
    winnerText.textContent = `${winner} wins!`;
    popup.style.display = "flex";
}

function makeMove(index) {
    if (board[index] !== "" || !gameActive) return;
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].textContent = currentPlayer;
    handleResultValidation();

    if (gameMode === "computer" && gameActive && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let availableCells = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomIndex);
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.textContent = `${player1Name}'s turn`;
    document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
    popup.style.display = "none";
}
