let players = [];

function switchPlayer() {
  currentPlayer = (currentPlayer + 1) % players.length;

  targetWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = "_".repeat(targetWord.length);
  attemptsLeft = maxAttempts;
  guessedLetters = [];
  timePassed = 30;

  updateDisplay();

  alert(`${players[currentPlayer]}, it's your turn to guess!`);

  if (currentPlayer === players.length - 1 && attemptsLeft === 0) {
    startGame();
  }
}

function getPlayerNames() {
  players = [];
  for (let i = 1; i <= 2; i++) {
    let playerName = prompt(`Enter Player ${i}'s name:`);
    if (playerName) {
      players.push(playerName);
    } else {
      players.push(`Player ${i}`);
    }
  }
}
