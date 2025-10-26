document.addEventListener("DOMContentLoaded", () => {
  const typeSound = new Audio("type.wav");
  typeSound.preload = "auto";
  typeSound.volume = 1.0; // max volume!

  document.querySelectorAll("input[type='text'], textarea").forEach(el => {
    el.addEventListener("keydown", (event) => {
      if (event.key.length === 1) {
        const soundClone = typeSound.cloneNode();
        soundClone.playbackRate = 0.9 + Math.random() * 0.2;
        soundClone.volume = 1.0; // make sure clone is also loud
        soundClone.play().catch(() => {});
      }
    });
  });
});
