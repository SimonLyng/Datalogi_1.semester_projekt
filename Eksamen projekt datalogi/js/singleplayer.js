let words = ["apple", "banana", "cherry", "grape", "orange"];
let targetWord = "";
let guessedWord = "";
let maxAttempts = 6;
let attemptsLeft = maxAttempts;

function startSinglePlayerGame() {
    // Randomly select a word from the array
    targetWord = words[Math.floor(Math.random() * words.length)];

    // Initialize guessedWord with underscores
    guessedWord = "_".repeat(targetWord.length);

    // Reset attempts
    attemptsLeft = maxAttempts;

    // Display the initial state
    updateDisplay();
}


function updateDisplay() {
    let wordDisplay = document.getElementById("word-display");
    wordDisplay.textContent = guessedWord;

    let feedback = document.getElementById("feedback");
    feedback.textContent = `Attempts Left: ${attemptsLeft}`;

    if (attemptsLeft === 0) {
        feedback.textContent = `Game Over! The word was: ${targetWord}`;
        startSinglePlayerGame();
    }
}

function checkGuess() {
    let guessInput = document.getElementById("guess-input");
    let guess = guessInput.value.toLowerCase();

    if (guess.length !== 1) {
        alert("Please enter a single letter.");
        return;
    }

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
        alert(`Congratulations! You guessed the word: ${targetWord}`);
        startSinglePlayerGame();
        return;
    }

    // Check if attempts left are zero
    if (attemptsLeft === 0) {
        alert(`Game Over! The word was: ${targetWord}. Better luck next time!`);
        startSinglePlayerGame();
        return;
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
    let playAgain = false;

    // Check if the guessed word is correct
    if (wordGuess === targetWord) {
        playAgain = confirm(`Congratulations! You guessed the word: ${targetWord}. Do you want to play again?`);
    } else {
        alert(`Oops! That's not the correct word.`);
        attemptsLeft--;

        if (attemptsLeft === 0) {
            playAgain = confirm(`Game Over! The word was: ${targetWord}. Better luck next time. Do you want to play again?`);
        } else {
            updateDisplay();
        }
    }

    // Clear the input field after processing the guess
    wordGuessInput.value = "";

    // Start a new game if playAgain is true
    if (playAgain) {
        startSinglePlayerGame();
    } else {
        // Perform any actions you want when the player decides not to play again
        alert("Thanks for playing! See you next time.");
    }
}
