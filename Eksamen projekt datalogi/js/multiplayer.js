let words = ["apple", "banana", "cherry", "grape", "orange"];
let targetWord = "";
let guessedWord = "";
let maxAttempts = 6;
let attemptsLeft = maxAttempts;
let isMultiplayer = true; // Always start in multiplayer mode
let currentPlayer = 0; // Index of the current player in the players array
let players = [];
let guessedLetters = [];

function startGame() {
    // If it's the first game or both players have played, get new names
    if (!players.length || currentPlayer === players.length - 1) {
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
}

function getPlayerNames() {
    // Get player names in multiplayer mode
    players = [];
    for (let i = 1; i <= 2; i++) {
        let playerName = prompt(`Enter Player ${i}'s name:`);
        if (playerName) {
            players.push(playerName);
        } else {
            // Default names if user cancels or enters an empty name
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
        switchPlayer();
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

    // Reset the word for the new player
    targetWord = words[Math.floor(Math.random() * words.length)];
    // Initialize guessedWord with underscores
    guessedWord = "_".repeat(targetWord.length);

    // Reset the number of attempts for the new player
    attemptsLeft = maxAttempts;

    // Reset the guessed letters array for the new player
    guessedLetters = [];

    // Update the display to show the new turn
    updateDisplay();

    // Inform the current player that it's their turn to guess
    alert(`${players[currentPlayer]}, it's your turn to guess!`);

    // Check if all players have guessed their words
    if (currentPlayer === players.length - 1 && attemptsLeft === 0) {
        // Start a new game without asking for confirmation
        startGame();
    }
}
function switchPlayer() {
    // Switch to the next player
    currentPlayer = (currentPlayer + 1) % players.length;

    // Reset the word for the new player
    targetWord = words[Math.floor(Math.random() * words.length)];
    // Initialize guessedWord with underscores
    guessedWord = "_".repeat(targetWord.length);

    // Reset the number of attempts for the new player
    attemptsLeft = maxAttempts;

    // Reset the guessed letters array for the new player
    guessedLetters = [];

    // Update the display to show the new turn
    updateDisplay();

    // Inform the current player that it's their turn to guess
    alert(`${players[currentPlayer]}, it's your turn to guess!`);

    // Check if all players have guessed their words
    if (currentPlayer === players.length - 1 && attemptsLeft === 0) {
        // Start a new game without asking for confirmation
        startGame();
    }
}

function checkGuess() {
    let guessInput = document.getElementById("guess-input");
    let guess = guessInput.value.toLowerCase();

    if (guess.length !== 1) {
        alert("Please enter a single letter.");
        return;
    }

    // Check if the letter has already been guessed
    if (guessedLetters.includes(guess)) {
        alert("You've already guessed that letter. Try a different one.");
        return;
    }

    // Add the guessed letter to the array
    guessedLetters.push(guess);

    // Always decrement attempts left
    attemptsLeft--;

    // Update guessedWord with correct guesses
    let correctGuess = false;
    for (let i = 0; i < targetWord.length; i++) {
        if (targetWord[i] === guess) {
            guessedWord = guessedWord.substring(0, i) + guess + guessedWord.substring(i + 1);
            correctGuess = true;
        }
    }

    // Check if the entire word has been guessed
    if (guessedWord === targetWord) {
        alert(`Congratulations, ${players[currentPlayer]}! You guessed the word!`);
        switchPlayer();
        return; // Exit the function to prevent further updates
    }

    // Check if attempts left are zero
    if (attemptsLeft === 0) {
        alert(`Game Over! The word was: ${targetWord}. Better luck next time, ${players[currentPlayer]}!`);
        switchPlayer();
        return; // Exit the function to prevent further updates
    }

    // Display feedback
    updateDisplay();

    // Alert if the guess was correct
    if (correctGuess) {
        alert("Correct guess!");
    }

    // Clear the input field after processing the guess
    guessInput.value = "";
}


function guessEntireWord() {
    let wordGuessInput = document.getElementById("word-guess-input");
    let wordGuess = wordGuessInput.value.toLowerCase();

    // Check if the guessed word is correct
    if (wordGuess === targetWord) {
        alert(`Congratulations, ${players[currentPlayer]}! You guessed the word: ${targetWord}`);
        switchPlayer(); // Switch player after a correct guess
    } else {
        alert(`Oops! That's not the correct word.`);
        attemptsLeft--;

        if (attemptsLeft === 0) {
            alert(`Game Over! The word was: ${targetWord}. Better luck next time, ${players[currentPlayer]}!`);
            switchPlayer(); // Switch player after a game over
        } else {
            updateDisplay();
        }
    }

    // Clear the input field after processing the guess
    wordGuessInput.value = "";
}

// Start the game when the page loads
startGame();
