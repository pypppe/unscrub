const usernameInput = document.getElementById('username');
const usernameFeedback = document.getElementById('usernameFeedback');
const passwordInput = document.getElementById('password');
const signUpBtn = document.getElementById('signUpBtn');
const popup = document.getElementById('popup');
const continueBtn = document.getElementById('continueBtn');

const hasAccepted = localStorage.getItem('betaAccepted');

function isUsernameBlacklisted(name) {
  const blacklist = ['unscrub', 'astrarune', 'pyp', 'pyppe', 'pypppe', 'ren'];
  for (const term of blacklist) {
    if (name.toLowerCase().includes(term)) {
      return true;
    }
  }
  return false;
}

window.addEventListener('DOMContentLoaded', () => {
  if (hasAccepted) {
    const container = document.querySelector('.container');
    container.innerHTML = `
      <h2>You've already made an account.</h2>
      <button id="goBackBtn">Go Back</button>
    `;
    
    const goBackBtn = document.getElementById('goBackBtn');
    goBackBtn.addEventListener('click', () => {
      window.location.href = 'https://unscrub.astrarune.com';
    });
  }
});

usernameInput.addEventListener('input', () => {
  const value = usernameInput.value.trim();

  if (isUsernameBlacklisted(value)) {
    usernameFeedback.textContent = 'This username is not allowed on Unscrub.';
    usernameFeedback.className = 'feedback blacklist';
    signUpBtn.disabled = true;
    return;
  }

  if (value.length < 3) {
    usernameFeedback.textContent = 'Username too short.';
    usernameFeedback.className = 'feedback error';
    signUpBtn.disabled = true;
  } else if (value.length <= 30) {
    usernameFeedback.textContent = 'This username is available.';
    usernameFeedback.className = 'feedback success';
    signUpBtn.disabled = false;
  } else {
    usernameFeedback.textContent = '';
    signUpBtn.disabled = true;
  }
});

signUpBtn.addEventListener('click', () => {
  const value = usernameInput.value.trim();

  if (isUsernameBlacklisted(value)) {
    alert("This username is blacklisted. Please choose another.");
    return;
  }

  if (!hasAccepted) {
    popup.style.display = 'flex';
  } else {
    alert("You've already made an account.");
  }
});

continueBtn.addEventListener('click', () => {
  localStorage.setItem('betaAccepted', 'true');
  popup.style.display = 'none';
  window.location.href = 'https://unscrub.astrarune.com';
});
