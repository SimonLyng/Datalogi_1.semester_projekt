function startSinglePlayerGame() {
  isMultiplayer = false;
  startGame();
}

function startMultiPlayerGame() {
  isMultiplayer = true;
  startGame();
}

function enableTimeTrial() {
  timeTrial = true;
  startGame();
}

function checkGuess() {
  let guessInput = document.getElementById("guess-input");
  let guess = guessInput.value.toLowerCase();

  // Clear the letter guess input field
  guessInput.value = "";

  if (guess.length !== 1) {
    let message = document.getElementById("game-message");
    message.textContent = "Please enter a single letter.";

    setTimeout(() => {
      message.textContent = "";
    }, 2000);

    return;
  }

  if (guessedLetters.includes(guess)) {
    let message = document.getElementById("game-message");
    message.textContent =
      "You've already guessed that letter. Try a different one.";

    setTimeout(() => {
      message.textContent = "";
    }, 2000);

    return;
  }

  guessedLetters.push(guess);
  attemptsLeft--;

  let correctGuess = false;
  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord[i] === guess) {
      guessedWord =
        guessedWord.substring(0, i) + guess + guessedWord.substring(i + 1);
      correctGuess = true;
    }
  }

  if (guessedWord === targetWord) {
    if (isMultiplayer) {
      let message = document.getElementById("game-message");
      message.textContent = `Congratulations, ${players[currentPlayer]}! You guessed the word: ${targetWord}`;

      setTimeout(() => {
        message.textContent = "";
      }, 2000);

      switchPlayer();
    } else {
      let message = document.getElementById("game-message");
      message.textContent = `Congratulations! You guessed the word: ${targetWord}`;

      setTimeout(() => {
        message.textContent = "";
      }, 2000);

      startGame();
    }
    return;
  }

  if (attemptsLeft === 0) {
    if (isMultiplayer) {
      let message = document.getElementById("game-message");
      message.textContent = `Game Over! The word was: ${targetWord}. Better luck next time, ${players[currentPlayer]}!`;

      setTimeout(() => {
        message.textContent = "";
      }, 2000);

      switchPlayer();
    } else {
      let message = document.getElementById("game-message");
      message.textContent = `Game Over! The word was: ${targetWord}. Better luck next time!`;

      setTimeout(() => {
        message.textContent = "";
      }, 2000);

      startGame();
    }
    return;
  }

  updateDisplay();

  if (correctGuess) {
    let correctGuessMessage = document.getElementById("correct-guess-message");
    correctGuessMessage.textContent = "Correct guess!";

    setTimeout(() => {
      correctGuessMessage.textContent = "";
    }, 2000);
  }
}

function guessEntireWord() {
  let wordGuessInput = document.getElementById("word-guess-input");
  let wordGuess = wordGuessInput.value.toLowerCase();

  // Clear the word guess input field
  wordGuessInput.value = "";

  if (wordGuess === targetWord) {
    if (isMultiplayer) {
      let message = document.getElementById("game-message");
      message.textContent = `Congratulations, ${players[currentPlayer]}! You guessed the word: ${targetWord}`;

      setTimeout(() => {
        message.textContent = "";
      }, 2000);

      switchPlayer();
    } else {
      let message = document.getElementById("game-message");
      message.textContent = `Congratulations! You guessed the word: ${targetWord}`;

      setTimeout(() => {
        message.textContent = "";
      }, 2000);

      startGame();
    }

    return;
  } else {
    let message = document.getElementById("game-message");
    message.textContent = "Oops! That's not the correct word.";
    attemptsLeft--;

    if (attemptsLeft === 0) {
      message.textContent = `Game Over! The word was: ${targetWord}. Better luck next time, ${players[currentPlayer]}!`;

      setTimeout(() => {
        message.textContent = "";
      }, 2000);

      switchPlayer();
    } else {
      updateDisplay();
    }
  }
}
