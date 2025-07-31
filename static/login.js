import { login, signup } from '/auth0.js';

const signUpButton = document.getElementById('submitSignUp');
const signInButton = document.getElementById('submitSignIn');
const signUpSection = document.getElementById('signup');
const signInSection = document.getElementById('signIn');

signUpButton?.addEventListener('click', (e) => {
  e.preventDefault();
  signup();
});

signInButton?.addEventListener('click', (e) => {
  e.preventDefault();
  login();
});

// toggle forms
const showSignUpBtn = document.getElementById('signUpButton');
const showSignInBtn = document.getElementById('signInButton');

showSignUpBtn?.addEventListener('click', () => {
  signInSection.style.display = 'none';
  signUpSection.style.display = 'block';
});

showSignInBtn?.addEventListener('click', () => {
  signUpSection.style.display = 'none';
  signInSection.style.display = 'block';
});
