function generateWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];

  guessInput.value = "";
  results.innerHTML = "";

  startTime = null;
  wpmDisplay.textContent = ". . . /wpm";

  // disable typing while animation plays
  guessInput.disabled = true;
  giveUpBtn.disabled = true;

  const startTimeAnim = Date.now();
  const duration = 3000; // 3 seconds
  const animationInterval = 80; // speed of shuffling frames

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTimeAnim;
    if (elapsed >= duration) {
      clearInterval(interval);
      wordBox.textContent = shuffleWord(currentWord); // final jumble

      // enable input again
      guessInput.disabled = false;
      giveUpBtn.disabled = false;
      guessInput.focus();
    } else {
      // show random jumble during animation
      const tempWord = shuffleWord(currentWord);
      wordBox.textContent = tempWord;
    }
  }, animationInterval);
}
