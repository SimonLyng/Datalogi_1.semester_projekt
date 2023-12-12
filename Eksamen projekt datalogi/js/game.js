let words = ["apple", "banana", "cherry", "grape", "orange"];
let targetWord = "";
let guessedWord = "";
let maxAttempts = 6;
let attemptsLeft = maxAttempts;
let isMultiplayer = true;
let currentPlayer = 0;
let guessedLetters = [];
let timeTrial = false;
let timer;
let timePassed = 0;
let timerStarted = false;

function startGame() {
  // If it's the first game or both players have played, get new names
  if (isMultiplayer && (!players.length || currentPlayer === players.length - 1)) {
      getPlayerNames();
  }

  // Randomly select a word from the array
  targetWord = words[Math.floor(Math.random() * words.length)];

  // Initialize guessedWord with underscores
  guessedWord = "_".repeat(targetWord.length);

  // Reset guessed letters and attempts only in single-player mode
  if (!isMultiplayer) {
      guessedLetters = [];
      attemptsLeft = maxAttempts;
  }

  // Display the initial state
  updateDisplay();

  // Add time trial logic
  if (timeTrial) {
      // Initialize elapsed time to 30 seconds for countdown
      timePassed = 30;
      if(!timerStarted)
      // Update the timer every second
      {
          timer = setInterval(updateTimer, 1000); timerStarted = true
      }
          

      // Set a timeout to end the game after 30 seconds
      setTimeout(() => {
          clearInterval(timer); // Stop the timer when the game ends
          endGame();
      }, 30000); // 30 seconds (adjust as needed)
  }
}

function endGame() {
  clearInterval(timer); // Stop the timer
  let gameMessage = document.getElementById("game-message");

  // Display the game over message in the message box
  gameMessage.textContent = "Time's up! Game Over!";

  // You can add additional logic here based on whether it's multiplayer or single-player
  if (isMultiplayer) {
      switchPlayer();
  } else {
      // Start a new game after a delay
      setTimeout(() => {
          gameMessage.textContent = ""; // Clear the message box
          startGame();
      }, 2000); // Adjust the delay as needed (2 seconds in this example)
  }
}


function updateDisplay() {
  let wordDisplay = document.getElementById("word-display");
  wordDisplay.textContent = guessedWord;

  let feedback = document.getElementById("feedback");
  feedback.textContent = `Attempts Left: ${attemptsLeft}`;

  if (attemptsLeft === 0) {
    feedback.textContent = `Game Over! The word was: ${targetWord}`;
    switchPlayer();
  }

  if (isMultiplayer) {
    let turnIndicator = document.getElementById("turn-indicator");
    turnIndicator.textContent = `Turn: ${players[currentPlayer]}`;
  }

  //Display guessed letters
  let guessedLettersDisplay = document.getElementById("guessed-letters");
  guessedLettersDisplay.textContent = `Guessed Letters: ${guessedLetters.join(", ")}`;


  //display timer
  let timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `Time: ${timePassed}s`;
}

function updateTimer() {
  timePassed--;
  if (timePassed < 0) {
      clearInterval(timer); // Stop the timer when it reaches 0
      endGame();
  } else {
      document.getElementById("timer").textContent = `Time: ${timePassed}s`;
  }
}
