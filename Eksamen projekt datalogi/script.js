const words = ["apple", "banana", "cherry", "grape", "orange"];
let targetWord = "";
let guessedWord = "";
let maxAttempts = 6;
let attemptsLeft = maxAttempts;

function startGame() {
    // Randomly select a word from the array
    targetWord = words[Math.floor(Math.random() * words.length)];

    // Initialize guessedWord with underscores
    guessedWord = "_".repeat(targetWord.length);

    // Display the initial state
    updateDisplay();

    // Reset attempts
    attemptsLeft = maxAttempts;
}

function updateDisplay() {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.textContent = guessedWord;

    const feedback = document.getElementById("feedback");
    feedback.textContent = `Attempts Left: ${attemptsLeft}`;

    if (attemptsLeft === 0) {
        feedback.textContent = "Game Over! The word was: " + targetWord;
    }
}

function checkGuess() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toLowerCase();

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
            alert("Congratulations! You guessed the word!");
            startGame();
        }
    } else {
        attemptsLeft--;

        if (attemptsLeft === 0) {
            alert("Game Over! The word was: " + targetWord);
            startGame();
        }
    }

    updateDisplay();
    guessInput.value = "";
}

// Start the game when the page loads
startGame();
