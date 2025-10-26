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
"energy", "powerful", "electric", "science", "experiment", "planet", "space", "rocket", "starship", "astronaut"
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

  // jumble animation
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
  <svg height="28" width="28" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 10px;">
    <style type="text/css">.st0{fill:#ffffff;}</style>
    <g>
      <path class="st0" d="M396.138,85.295c-13.172-25.037-33.795-45.898-59.342-61.03C311.26,9.2,280.435,0.001,246.98,0.001 c-41.238-0.102-75.5,10.642-101.359,25.521c-25.962,14.826-37.156,32.088-37.156,32.088c-4.363,3.786-6.824,9.294-6.721,15.056 c0.118,5.77,2.775,11.186,7.273,14.784l35.933,28.78c7.324,5.864,17.806,5.644,24.875-0.518c0,0,4.414-7.978,18.247-15.88 c13.91-7.85,31.945-14.173,58.908-14.258c23.517-0.051,44.022,8.725,58.016,20.717c6.952,5.941,12.145,12.594,15.328,18.68 c3.208,6.136,4.379,11.5,4.363,15.574c-0.068,13.766-2.742,22.77-6.603,30.442c-2.945,5.729-6.789,10.813-11.738,15.744 c-7.384,7.384-17.398,14.207-28.634,20.479c-11.245,6.348-23.365,11.932-35.612,18.68c-13.978,7.74-28.77,18.858-39.701,35.544 c-5.449,8.249-9.71,17.686-12.416,27.641c-2.742,9.964-3.98,20.412-3.98,31.071c0,11.372,0,20.708,0,20.708 c0,10.719,8.69,19.41,19.41,19.41h46.762c10.719,0,19.41-8.691,19.41-19.41c0,0,0-9.336,0-20.708c0-4.107,0.467-6.755,0.917-8.436 c0.773-2.512,1.206-3.14,2.47-4.668c1.29-1.452,3.895-3.674,8.698-6.331c7.019-3.946,18.298-9.276,31.07-16.176 c19.121-10.456,42.367-24.646,61.972-48.062c9.752-11.686,18.374-25.758,24.323-41.968c6.001-16.21,9.242-34.431,9.226-53.96 C410.243,120.761,404.879,101.971,396.138,85.295z"></path>
      <path class="st0" d="M228.809,406.44c-29.152,0-52.788,23.644-52.788,52.788c0,29.136,23.637,52.772,52.788,52.772 c29.136,0,52.763-23.636,52.763-52.772C281.572,430.084,257.945,406.44,228.809,406.44z"></path>
    </g>
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
