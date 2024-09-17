// Elements from the DOM
const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById("final-message-reveal-word");
const figureParts = document.querySelectorAll(".figure-part");
const keys = document.querySelectorAll(".key"); // On-screen keyboard buttons
const hintButton = document.getElementById("hint-button"); // Hint button element

const words = ["application", "programming", "interface", "wizard", "shivam", "token", "constructor"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;
const correctLetters = [];
const wrongLetters = [];

// Display the word
function displayWord() {
  wordElement.innerHTML = selectedWord
    .split("")
    .map(
      (letter) => `<span class="letter">${correctLetters.includes(letter) ? letter : ""}</span>`
    )
    .join("");

  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
    playable = false;
  }
}

// Update wrong letters and hangman figure
function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`).join("")}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    part.style.display = index < errors ? "block" : "none";
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `Unfortunately you lost. 😕 ...the word was: ${selectedWord}`;
    popup.style.display = "flex";
    playable = false;
  }
}

// Show notification for duplicate letters
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Handle input from both physical keyboard and on-screen keyboard
function handleKeyInput(letter) {
  if (playable) {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification(); // Letter already used
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersElement();
      } else {
        showNotification(); // Letter already used
      }
    }
  }
}

// Physical keyboard input listener
window.addEventListener("keydown", (e) => {
  const letter = e.key.toLowerCase();
  if (letter >= "a" && letter <= "z") {
    handleKeyInput(letter);
  }
});

// On-screen keyboard input listener
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const letter = key.dataset.key.toLowerCase(); // Get the letter from data-key
    handleKeyInput(letter);
  });
});

// Hint button event listener with debug logs
hintButton.addEventListener("click", () => {
  console.log("Hint button clicked"); // Add this for debugging
  if (playable) {
    const unusedLetters = selectedWord.split("").filter(letter => !correctLetters.includes(letter));
    if (unusedLetters.length > 0) {
      const hintLetter = unusedLetters[Math.floor(Math.random() * unusedLetters.length)];
      if (!correctLetters.includes(hintLetter)) {
        correctLetters.push(hintLetter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      showNotification();
    }
  }
});



// Play again button event listener
playAgainButton.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersElement();
  popup.style.display = "none";
});

//time interval
let timeLeft = 90;
let timerInterval;
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      finalMessage.innerText = "Time's up! 😕";
      popup.style.display = "flex";
      playable = false;
    }
  }, 1000);
}
playAgainButton.addEventListener("click", () => {
  timeLeft = 90;
  startTimer();
});
startTimer();

// toggle theme
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});


hintButton.addEventListener("click", handleHint);
hintButton.addEventListener("touchstart", handleHint); // For mobile devices

function handleHint() {
  if (playable) {
    const unusedLetters = selectedWord.split("").filter(letter => !correctLetters.includes(letter));
    if (unusedLetters.length > 0) {
      const hintLetter = unusedLetters[Math.floor(Math.random() * unusedLetters.length)];
      if (!correctLetters.includes(hintLetter)) {
        correctLetters.push(hintLetter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      showNotification();
    }
  }
}



// Initial display of the word
displayWord();
