const words = [
  "adventure", "puzzle", "school", "planet", "energy", "forest", "silver", "battle",
  "shadow", "dream", "future", "leader", "legend", "magic", "moment", "nature",
  "danger", "reason", "friend", "change", "choice", "travel", "memory", "storm",
  "winter", "summer", "secret", "bridge", "mountain", "desert", "science", "history",
  "power", "message", "escape", "ocean", "castle", "dragon", "robot", "hero",
  "galaxy", "mirror", "signal", "planet", "system", "hidden", "crystal", "shelter",
  "rocket", "future", "glucose", "starch", "coding", "photosynthesis", "internet"
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

// --- helper function to disable & re-enable generateBtn ---
function cooldownGenerateButton() {
  generateBtn.disabled = true;
  generateBtn.style.opacity = "0.6";
  generateBtn.style.cursor = "not-allowed";

  setTimeout(() => {
    generateBtn.disabled = false;
    generateBtn.style.opacity = "1";
    generateBtn.style.cursor = "pointer";
  }, 3000);
}

function generateWord() {
  cooldownGenerateButton(); // disable when generating a new word

  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  guessInput.value = "";
  guessInput.focus();
  results.innerHTML = "";

  startTime = null;
  wpmDisplay.textContent = ". . . /wpm";
  guessInput.disabled = true;
  giveUpBtn.disabled = true;

  // jumble animation
  let animationTime = 3000; // 3 seconds
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
    }
  }, interval);
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
      cooldownGenerateButton(); // disable generate during new word
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
        lives = 5;
        cooldownGenerateButton(); // disable generate during new word
        generateWord();
      }, 2000);
    }
  }
}

function giveUp() {
  if (!currentWord) return;
  const overlay = document.createElement("div");
  overlay.classList.add("correct-overlay");

  overlay.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28" style="vertical-align: middle; margin-right: 10px;">
      <path d="M9 17C9.85038 16.3697 10.8846 16 12 16C13.1154 16 14.1496 16.3697 15 17" stroke="#ffea00" stroke-width="1.5" stroke-linecap="round"></path>
      <ellipse cx="15" cy="10.5" rx="1" ry="1.5" fill="#ffea00"></ellipse>
      <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#ffea00"></ellipse>
      <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#ffea00" stroke-width="1.5"></path>
    </svg>
    The word was: ${currentWord}
  `;

  document.body.appendChild(overlay);
  setTimeout(() => {
    document.body.removeChild(overlay);
    cooldownGenerateButton(); // disable generate during new word
    generateWord();
  }, 2000);
}

// --- Generate button listener ---
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
  alert(
    "How To Play:\n\n" +
    "1. Press 'Generate' to get a scrambled word.\n" +
    "2. Type your guess in the input box and press 'Enter'.\n" +
    "3. If you give up, press 'I give up' to reveal the word.\n" +
    "4. Try to unscramble as many words as you can!\n" +
    "5. You also have 5 lives. Good Luck!"
  );
});

const privacyBtn = document.getElementById("privacyBtn");
privacyBtn.addEventListener("click", () => {
  window.location.href = "/policy/privacy.html";
});
