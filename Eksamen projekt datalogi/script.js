let words = ["apple", "banana", "cherry", "grape", "orange"];
let targetWord = "";
let guessedWord = "";
let maxAttempts = 6;
let attemptsLeft = maxAttempts;
let isMultiplayer = false; // Flag to track the game mode
let currentPlayer = 0; // Index of the current player in the players array
let players = [];

function startGame(singlePlayer) {
    isMultiplayer = !singlePlayer;

    if (isMultiplayer) {
        // Get player names in multiplayer mode
        getPlayerNames();
    }

    // Randomly select a word from the array
    targetWord = words[Math.floor(Math.random() * words.length)];

    // Initialize guessedWord with underscores
    guessedWord = "_".repeat(targetWord.length);

    // Display the initial state
    updateDisplay();

    // Reset attempts
    attemptsLeft = maxAttempts;

    // Reset current player to the first player
    currentPlayer = 0;
}

function getPlayerNames() {
    // Get player names in multiplayer mode
    players = [];
    for (let i = 1; i <= 2; i++) {
        let playerName = prompt(`Enter Player ${i}'s name:`);
        if (playerName) {
            players.push(playerName);
        } else {
            // Default names if the user cancels or enters an empty name
            players.push(`Player ${i}`);
        }
    }
}

function updateDisplay() {
    let wordDisplay = document.getElementById("word-display");
    wordDisplay.textContent = guessedWord;

    let feedback = document.getElementById("feedback");
    feedback.textContent = `Attempts Left: ${attemptsLeft}`;

    if (attemptsLeft === 0) {
        feedback.textContent = `Game Over! The word was: ${targetWord}`;
        startGame(isMultiplayer);
    }

    if (isMultiplayer) {
        // Display whose turn it is in multiplayer
        let turnIndicator = document.getElementById("turn-indicator");
        turnIndicator.textContent = `Turn: ${players[currentPlayer]}`;
    }
}

function switchPlayer() {
    // Switch to the next player
    currentPlayer = (currentPlayer + 1) % players.length;
    alert(`${players[currentPlayer]}, it's your turn to guess!`);
    startGame(isMultiplayer); // Start a new game before updating the display
    updateDisplay(); // Call updateDisplay to update the turn indicator
}

function checkGuess() {
    let guessInput = document.getElementById("guess-input");
    let guess = guessInput.value.toLowerCase();

    if (guess.length !== 1) {
        alert("Please enter a single letter.");
        return;
    }

    // Check if the guessed letter is in the target word
    if (targetWord.includes(guess)) {
        // Update guessedWord with correct guesses
        for (let i = 0; i < targetWord.length; i++) {
            if (targetWord[i] === guess) {
                guessedWord = guessedWord.substring(0, i) + guess + guessedWord.substring(i + 1);
            }
        }

        // Check if the entire word has been guessed
        if (guessedWord === targetWord) {
            alert(`Congratulations, ${players[currentPlayer]}! You guessed the word!`);
            switchPlayer();
            return; // Exit the function to prevent further updates
        }
    } else {
        attemptsLeft--;

        if (attemptsLeft === 0) {
            alert(`Game Over! The word was: ${targetWord}. Better luck next time, ${players[currentPlayer]}!`);
            switchPlayer();
            return; // Exit the function to prevent further updates
        }
    }

    updateDisplay();
    guessInput.value = "";
}

// These lines were unclear, so they are commented out.
// updateDisplay();
// guessInput.value = "";

// Single-player mode
function startSinglePlayerGame() {
    startGame(true);
}

// Multiplayer mode
function startMultiPlayerGame() {
    startGame(false);
}

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", function () {
    startSinglePlayerGame();
});
