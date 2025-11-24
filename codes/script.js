// script.js
// Behavior:
// - typing animation cycles through allowed codes
// - input only allows letters & numbers (no spaces or special chars)
// - sanitize pasted content
// - submit validates against codes (case-insensitive)

(() => {
  const codes = ["CODES", "unscrub", "67"]; // allowed codes (exact strings provided)
  const normalizedCodes = codes.map(c => c.toString().toLowerCase());
  const typingText = document.getElementById("typingText");
  const codeInput = document.getElementById("codeInput");
  const submitBtn = document.getElementById("submitBtn");
  const results = document.getElementById("results");
  const overlay = document.getElementById("correctOverlay");
  const revealed = document.getElementById("revealedCode");
  const closeOverlay = document.getElementById("closeOverlay");
  const resetBtn = document.getElementById("resetBtn");

  // Typing animation params
  const TYPING_SPEED = 80;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER = 900;

  let loopIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  async function typeLoop() {
    const current = codes[loopIndex % codes.length];
    if (!isDeleting) {
      typingText.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        // pause then delete
        await sleep(PAUSE_AFTER);
        isDeleting = true;
      }
      await sleep(TYPING_SPEED);
    } else {
      typingText.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        loopIndex++;
        await sleep(200);
      }
      await sleep(DELETING_SPEED);
    }
    requestAnimationFrame(typeLoop);
  }

  // start the typing loop
  requestAnimationFrame(typeLoop);

  // Helper to sanitize: only A-Z, a-z, 0-9 allowed
  const ALNUM_RE = /[A-Za-z0-9]/g;
  function sanitizeValue(v) {
    // extract all allowed chars and join them
    const matched = v.match(ALNUM_RE);
    return matched ? matched.join("") : "";
  }

  // Input event: remove invalid characters as user types
  codeInput.addEventListener("input", (e) => {
    const cur = codeInput.value;
    const clean = sanitizeValue(cur);
    if (cur !== clean) {
      const pos = codeInput.selectionStart - (cur.length - clean.length);
      codeInput.value = clean;
      // restore cursor roughly
      codeInput.setSelectionRange(Math.max(0, pos), Math.max(0, pos));
    }
  });

  // On paste: sanitize pasted content
  codeInput.addEventListener("paste", (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text") || "";
    const clean = sanitizeValue(text);
    // insert at cursor position
    const start = codeInput.selectionStart || 0;
    const end = codeInput.selectionEnd || 0;
    const newVal = codeInput.value.slice(0, start) + clean + codeInput.value.slice(end);
    codeInput.value = sanitizeValue(newVal);
    const caret = start + clean.length;
    codeInput.setSelectionRange(caret, caret);
  });

  // Submit handler
  function submit() {
    const v = codeInput.value.trim();
    if (!v) {
      showResult("Please type a code.", false);
      return;
    }
    // only allow alnum (should already be sanitized)
    if (!/^[A-Za-z0-9]+$/.test(v)) {
      showResult("Only letters and numbers allowed.", false);
      return;
    }
    const normalized = v.toLowerCase();
    const idx = normalizedCodes.indexOf(normalized);
    if (idx >= 0) {
      // correct
      revealed.textContent = `You entered: "${codes[idx]}"`;
      overlay.style.display = "flex";
      showResult(`Matched code: ${codes[idx]}`, true);
    } else {
      showResult("Not a valid code.", false);
    }
  }

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submit();
  });

  codeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  });

  closeOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
    codeInput.value = "";
    codeInput.focus();
  });

  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.style.display = "none";
    codeInput.value = "";
    results.innerHTML = "";
    codeInput.focus();
  });

  function showResult(msg, ok) {
    results.innerHTML = "";
    const div = document.createElement("div");
    div.className = "result-item";
    div.textContent = msg;
    if (ok) {
      div.style.borderLeft = "4px solid #1f6feb";
    } else {
      div.style.opacity = "0.85";
    }
    results.appendChild(div);
  }

  // Initialize focus
  codeInput.setAttribute("maxlength", "32");
  codeInput.value = "";
  codeInput.focus();
})();
