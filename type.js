document.addEventListener("DOMContentLoaded", async () => {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  let audioBuffer;

  // load the wav file
  const response = await fetch("type.wav");
  const arrayBuffer = await response.arrayBuffer();
  audioBuffer = await context.decodeAudioData(arrayBuffer);

  document.querySelectorAll("input[type='text'], textarea").forEach(el => {
    el.addEventListener("keydown", (event) => {
      if (event.key.length === 1) {
        const source = context.createBufferSource();
        source.buffer = audioBuffer;

        source.playbackRate.value = 0.9 + Math.random() * 0.2;

        const gainNode = context.createGain();
        gainNode.gain.value = 4.5;

        source.connect(gainNode).connect(context.destination);
        source.start(0);
      }
    });
  });
});
