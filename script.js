const words = [
  "adventure", "puzzle", "school", "planet", "energy", "forest", "silver", "battle",
  "shadow", "dream", "future", "leader", "legend", "magic", "moment", "nature",
  "danger", "reason", "friend", "change", "choice", "travel", "memory", "storm",
  "winter", "summer", "secret", "bridge", "mountain", "desert", "science", "history",
  "power", "message", "escape", "ocean", "castle", "dragon", "robot", "hero",
  "galaxy", "mirror", "signal", "planet", "system", "hidden", "crystal", "shelter",
  "rocket", "future", "glucose", "starch", "coding", "photosynthesis", "internet", 
  "island", "space", "city", "music", "story", "light", "dark", "animal", "team",
  "bridge", "time", "color", "friendship", "hope", "wave", "fire", "ice", "wind",
  "stone", "star", "moon", "sun", "sky", "river", "flower", "tree", "path",
  "cloud", "stormy", "sand", "rain", "snow", "forest", "mountain", "valley",
  "dreamer", "heroine", "powerful", "tiny", "giant", "brave", "kindness",
  "truth", "loyalty", "spark", "shine", "heart", "wish", "world", "journey",
  "spacecraft", "planet", "explorer", "mission", "science", "discovery", "experiment",
  "adventure", "teamwork", "imagine", "build", "create", "wonder", "learn", "grow"
];

let currentWord = "";
let startTime = null;

const wordBox = document.getElementById("wordBox");
const generateBtn = document.getElementById("generateBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const results = document.getElementById("results");
const wpmDisplay = document.getElementById("wpmDisplay");

guessInput.addEventListener("input", () => {
  guessInput.value = guessInput.value.replace(/[^a-zA-Z]/g, "");

  if (!startTime) startTime = new Date();

  const typedChars = guessInput.value.length;
  const minutes = (new Date() - startTime) / 1000 / 60;
  const wpm = minutes > 0 ? Math.round((typedChars / 5) / minutes) : 0;

  wpmDisplay.textContent = `${wpm} /wpm`;
});

function shuffleWord(word) {
  let arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

guessInput.disabled = true;
giveUpBtn.disabled = true;

function generateWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];

  guessInput.value = "";
  guessInput.focus();
  results.innerHTML = "";

  startTime = null;
  wpmDisplay.textContent = ". . . /wpm";

  guessInput.disabled = false;
  giveUpBtn.disabled = false;

  // start jumble animation
  const startTimeAnim = Date.now();
  const duration = 3000; // 3 seconds
  const animationInterval = 80; // speed of shuffling frames

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTimeAnim;
    if (elapsed >= duration) {
      clearInterval(interval);
      wordBox.textContent = shuffleWord(currentWord); // final jumble
    } else {
      // show random jumble during animation
      const tempWord = shuffleWord(currentWord);
      wordBox.textContent = tempWord;
    }
  }, animationInterval);
}

let lives = 5;

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
    lives = 5;

    const overlay = document.createElement("div");
    overlay.classList.add("correct-overlay");
    overlay.textContent = "Correct!";
    document.body.appendChild(overlay);

    setTimeout(() => {
      document.body.removeChild(overlay);
      generateWord();
    }, 1500);
  } else {
    lives--;

    if (lives <= 0) {
      const overlay = document.createElement("div");
      overlay.classList.add("correct-overlay");
      overlay.textContent = `Out of lives! The word was: ${currentWord}`;
      document.body.appendChild(overlay);

      setTimeout(() => {
        document.body.removeChild(overlay);
        lives = 5;
        generateWord();
      }, 2000);
    }
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

generateBtn.addEventListener("click", generateWord);
submitBtn.addEventListener("click", checkGuess);
giveUpBtn.addEventListener("click", giveUp);
guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
});

const howToPlayBtn = document.getElementById("howToPlayBtn");
howToPlayBtn.addEventListener("click", () => {
  alert(
    "How To Play:\n\n" +
    "1. Press 'Generate' to get a scrambled word.\n" +
    "2. Type your guess in the input box and press 'Enter'.\n" +
    "3. If you give up, press 'I give up' to reveal the word.\n" +
    "4. Try to unscramble as many words as you can! .\n" +
    "5. You also have 5 lives. Good Luck!"
  );
});

const privacyBtn = document.getElementById("privacyBtn");
privacyBtn.addEventListener("click", () => {
  window.location.href = "/policy/privacy.html";
});
