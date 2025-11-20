const usernameInput = document.getElementById('username');
const usernameFeedback = document.getElementById('usernameFeedback');
const passwordInput = document.getElementById('password');
const signUpBtn = document.getElementById('signUpBtn');
const popup = document.getElementById('popup');
const continueBtn = document.getElementById('continueBtn');

let readyToRedirect = false;

usernameInput.addEventListener('input', () => {
  const value = usernameInput.value.trim();
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
  popup.style.display = 'flex';
});

continueBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  window.location.href = 'https://unscrub.astrarune.com';
});
