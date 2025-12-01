const words = [
  "adventure", "puzzle", "school", "planet", "energy", "forest", "silver", "battle",
  "shadow", "dream", "future", "leader", "legend", "magic", "moment", "nature",
  "danger", "reason", "friend", "change", "choice", "travel", "memory", "storm",
  "winter", "summer", "secret", "bridge", "mountain", "desert", "science", "history",
  "power", "message", "escape", "ocean", "castle", "dragon", "robot", "hero",
  "galaxy", "mirror", "signal", "planet", "system", "hidden", "crystal", "shelter",
  "rocket", "future", "glucose", "starch", "coding", "photosynthesis", "internet", "unscrub",
  "gay", "water", "chocolate", "windows", "penguin", "phone", "iphone", "explore", "dummy",
  "network", "volume", "chair", "great", "america", "australia", "japan", "italy", "france",
  "russia", "scammer", "india", "transgender", "english", "japanese", "polish", "current", "images",
  "icon", "korea", "boyfriend", "girlfriend", "microwave", "nokia", "lamp", "light", "laptop", "strong",
  "kitty", "kitten", "meow", "banana", "apple", "cookie", "pizza", "burger", "music", "dance", "movie", "story", "book",
"teacher", "student", "family", "garden", "city", "village", "car", "bus", "train", "plane",
"cloud", "rain", "snow", "sun", "moon", "star", "animal", "zebra", "tiger", "lion",
"dog", "cat", "fish", "bird", "egg", "cake", "milk", "bread", "cheese", "sandwich",
"pencil", "eraser", "paper", "notebook", "desk", "backpack", "clock", "door", "window", "floor",
"earth", "world", "country", "flag", "music", "video", "photo", "friendship", "happy", "sad",
"angry", "laugh", "cry", "smile", "jump", "run", "walk", "sleep", "dream", "think",
"read", "write", "draw", "paint", "color", "play", "game", "toy", "ball", "soccer",
"basketball", "baseball", "tennis", "swim", "park", "tree", "flower", "grass", "river", "bridge",
"mountain", "volcano", "forest", "beach", "sea", "island", "boat", "ship", "truck", "bike",
"mirror", "camera", "keyboard", "mouse", "screen", "music", "song", "battery", "remote", "controller",
"energy", "powerful", "electric", "science", "experiment", "planet", "space", "rocket", "starship"
];

let currentWord = "";
let startTime = null;

const wordBox = document.getElementById("wordBox");
const generateBtn = document.getElementById("generateBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const guessInput = document.getElementById("guessInput");
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

guessInput.disabled = true;
giveUpBtn.disabled = false;

// --- helper function to disable & re-enable generateBtn ---
function cooldownGenerateButton() {
  generateBtn.disabled = true;
  generateBtn.style.opacity = "0.6";
  generateBtn.style.cursor = "not-allowed";

  setTimeout(() => {
    generateBtn.disabled = false;
    generateBtn.style.opacity = "1";
    generateBtn.style.cursor = "pointer";
  }, 1000); // 1 second cooldown
}

function generateWord() {
  cooldownGenerateButton(); // disable when generating a new word

  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  guessInput.value = "";
  guessInput.focus();
  results.innerHTML = "";

  startTime = null;
  guessInput.disabled = true;
  giveUpBtn.disabled = true;

  let animationTime = 1000; // 1 second
  let interval = 100; // how fast letters shuffle
  let elapsed = 0;

  const animation = setInterval(() => {
    wordBox.textContent = shuffleWord(currentWord);
    elapsed += interval;
    if (elapsed >= animationTime) {
      clearInterval(animation);
      wordBox.textContent = shuffleWord(currentWord); // final jumble
      guessInput.disabled = false;
      giveUpBtn.disabled = false;
      startTimerWithDelay(); // <— moved here so timer starts after jumble
    }
  }, interval);
}

let lives = 5;

// --- WPM Display Timer ---
const wpmDisplay = document.getElementById("wpmDisplay");
let timerInterval = null;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

function startTimerWithDelay() {
  clearInterval(timerInterval);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateTimerDisplay();

  setTimeout(() => {
    const startTime = Date.now();
    timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      minutes = Math.floor(elapsed / 60000);
      seconds = Math.floor((elapsed % 60000) / 1000);
      milliseconds = Math.floor((elapsed % 1000) / 10);
      updateTimerDisplay();
    }, 10);
  }, 1000); // 1 second delay
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");
  const ms = String(milliseconds).padStart(2, "0");
  wpmDisplay.textContent = `${m}:${s}:${ms}`;
}

function checkGuess() {
  const guess = guessInput.value.trim().toLowerCase();
  if (!guess) return;

  const resultItem = document.createElement("div");
  resultItem.classList.add("result-item");

  const wordSpan = document.createElement("span");
  wordSpan.textContent = guess;

  const crossSpan = document.createElement("span");
  crossSpan.innerHTML = `
    <svg fill="#ff0000" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000" width="18" height="18" style="margin-left: 8px; vertical-align: middle;">
      <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"></path>
    </svg>
  `;

  resultItem.appendChild(wordSpan);
  resultItem.appendChild(crossSpan);
  results.appendChild(resultItem);

  guessInput.value = "";
  guessInput.focus();

  if (guess === currentWord) {
    lives = 5;

    const overlay = document.createElement("div");
    overlay.classList.add("correct-overlay");

    overlay.innerHTML = `
      <svg fill="#44ff00" version="1.1" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 335.765 335.765" width="28" height="28"
           style="vertical-align: middle; margin-right: 10px;">
        <g>
          <polygon points="311.757,41.803 107.573,245.96 23.986,162.364 0,186.393 107.573,293.962 335.765,65.795"></polygon>
        </g>
      </svg>
      Correct!
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
      document.body.removeChild(overlay);
      stopTimer(); // ⬅ added timer stop
      cooldownGenerateButton();
      generateWord();
    }, 1500);
  } else {
    lives--;

    if (lives <= 0) {
      const overlay = document.createElement("div");
      overlay.classList.add("correct-overlay");

      overlay.innerHTML = `
        <svg fill="#ff0000" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000" width="28" height="28" style="vertical-align: middle; margin-right: 10px;">
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"></path>
        </svg>
        Out of lives! The word was: ${currentWord}
      `;

      document.body.appendChild(overlay);

      setTimeout(() => {
        document.body.removeChild(overlay);
        stopTimer(); // ⬅ added timer stop
        lives = 5;
        cooldownGenerateButton();
        generateWord();
      }, 2000);
    }
  }
}
function giveUp() {
  if (!currentWord) return;

  stopTimer();
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateTimerDisplay();

  const overlay = document.createElement("div");
  overlay.classList.add("correct-overlay");

  overlay.innerHTML = `
    <svg fill="#ff0000" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
         stroke="#ff0000" width="28" height="28"
         style="vertical-align: middle; margin-right: 10px;">
      <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"></path>
    </svg>
    The word was: ${currentWord}
  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    document.body.removeChild(overlay);
    cooldownGenerateButton(); 
    generateWord();
  }, 2000);
}

generateBtn.addEventListener("click", () => {
  cooldownGenerateButton();
  generateWord();
});


submitBtn.addEventListener("click", checkGuess);
giveUpBtn.addEventListener("click", giveUp);
guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
});

const howToPlayBtn = document.getElementById("howToPlayBtn");

howToPlayBtn.addEventListener("click", () => {
  // remove existing popup if it's already open
  const existing = document.getElementById("howToPlayPopup");
  if (existing) existing.remove();

  // create the popup element
  const popup = document.createElement("div");
  popup.id = "howToPlayPopup";
  popup.innerHTML = `
    <strong>how to play:</strong><br><br>
    1. press <b>generate</b> to get a scrambled word.<br>
    2. type your guess and hit <b>→</b> to submit.<br>
    3. stuck? press <b>show answer</b> to reveal it.<br>
    4. keep going to beat your best streak!<br>
    5. you start with <b>5 lives</b> — use them wisely.
  `;

  // position it below the button
  const rect = howToPlayBtn.getBoundingClientRect();
  popup.style.top = rect.bottom + window.scrollY + 10 + "px";
  popup.style.left = rect.left + window.scrollX + "px";

  document.body.appendChild(popup);

  // fade in animation
  setTimeout(() => popup.classList.add("show"), 10);

  // auto-hide after 12 seconds
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 500);
  }, 12000);
});


const privacyBtn = document.getElementById("privacyBtn");
privacyBtn.addEventListener("click", () => {
  window.location.href = "/policy/privacy.html";
});
