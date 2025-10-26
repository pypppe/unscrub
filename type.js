document.addEventListener("DOMContentLoaded", () => {
  const typeSound = new Audio("type.wav");
  typeSound.preload = "auto";

  document.querySelectorAll("input[type='text'], textarea").forEach(el => {
    el.addEventListener("keydown", (event) => {
      if (event.key.length === 1) {
        const soundClone = typeSound.cloneNode();
        soundClone.playbackRate = 0.9 + Math.random() * 0.2;
        soundClone.play().catch(() => {});
      }
    });
  });
});
