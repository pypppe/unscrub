const usernameInput = document.getElementById('username');
const usernameFeedback = document.getElementById('usernameFeedback');
const passwordInput = document.getElementById('password');
const signUpBtn = document.getElementById('signUpBtn');
const popup = document.getElementById('popup');
const continueBtn = document.getElementById('continueBtn');

const hasAccepted = localStorage.getItem('betaAccepted');

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

  const blacklist = ['unscrub', 'astrarune', 'pyp', 'pyppe', 'pypppe', 'ren'];

  if (blacklist.includes(value.toLowerCase())) {
    usernameFeedback.textContent = 'This username is not available for use.';
    usernameFeedback.className = 'feedback blacklist';
    return;
  }

  if (value.length < 3) {
    usernameFeedback.textContent = 'Username too short.';
    usernameFeedback.className = 'feedback error';
  } else if (value.length <= 30) {
    usernameFeedback.textContent = 'This username is available.';
    usernameFeedback.className = 'feedback success';
  } else {
    usernameFeedback.textContent = '';
  }
});

signUpBtn.addEventListener('click', () => {
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
