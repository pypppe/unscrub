const words = [
  "adventure", "puzzle", "school", "planet", "energy", "forest", "silver", "battle",
  "shadow", "dream", "future", "leader", "legend", "magic", "moment", "nature",
  "danger", "reason", "friend", "change", "choice", "travel", "memory", "storm",
  "winter", "summer", "secret", "bridge", "mountain", "desert", "science", "history",
  "power", "message", "escape", "ocean", "castle", "dragon", "robot", "hero",
  "galaxy", "mirror", "signal", "planet", "system", "hidden", "crystal", "shelter",
  "rocket", "future"
];

let currentWord = "";

const wordBox = document.getElementById("wordBox");
const generateBtn = document.getElementById("generateBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const guessInput = document.getElementById("guessInput");

// Only allow letters (no spaces, numbers, or special characters)
guessInput.addEventListener("input", () => {
  guessInput.value = guessInput.value.replace(/[^a-zA-Z]/g, "");
});

const submitBtn = document.getElementById("submitBtn");
const results = document.getElementById("results");

function shuffleWord(word) {
  let arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

function generateWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  wordBox.textContent = shuffleWord(currentWord);
  guessInput.value = "";
  guessInput.focus();
  results.innerHTML = "";
}

function checkGuess() {
  const guess = guessInput.value.trim().toLowerCase();
  if (!guess) return;

  const resultItem = document.createElement("div");
  resultItem.classList.add("result-item");

  const wordSpan = document.createElement("span");
  wordSpan.textContent = guess;

  const crossSpan = document.createElement("span");
  crossSpan.textContent = "❌";
  crossSpan.style.marginLeft = "8px";

  resultItem.appendChild(wordSpan);
  resultItem.appendChild(crossSpan);
  results.appendChild(resultItem);

  guessInput.value = "";
  guessInput.focus();

  if (guess === currentWord) {
    const overlay = document.createElement("div");
    overlay.classList.add("correct-overlay");
    overlay.textContent = "Correct!";
    document.body.appendChild(overlay);
    setTimeout(() => {
      document.body.removeChild(overlay);
      generateWord();
    }, 1500);
  }
}

function giveUp() {
  if (!currentWord) return;
  const overlay = document.createElement("div");
  overlay.classList.add("correct-overlay");
  overlay.textContent = `The word was: ${currentWord}`;
  document.body.appendChild(overlay);
  setTimeout(() => {
    document.body.removeChild(overlay);
    generateWord();
  }, 2000);
}

// Event listeners
generateBtn.addEventListener("click", generateWord);
submitBtn.addEventListener("click", checkGuess);
giveUpBtn.addEventListener("click", giveUp);
guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
});

// ------------------------
// How To Play button
// ------------------------
const howToPlayBtn = document.getElementById("howToPlayBtn");

howToPlayBtn.addEventListener("click", () => {
  alert(
    "How To Play:\n\n" +
    "1. Press 'Generate' to get a scrambled word.\n" +
    "2. Type your guess in the input box and press 'Enter'.\n" +
    "3. If you give up, press 'I give up' to reveal the word.\n" +
    "4. Try to unscramble as many words as you can!"
  );
});

const privacyBtn = document.getElementById("privacyBtn");

privacyBtn.addEventListener("click", () => {
  window.location.href = "/policy/privacy.html";
});
