import { handleRedirect, getUser, logout } from '/auth0.js';

handleRedirect();

const welcomeEl = document.getElementById('welcome');
const logoutBtn = document.getElementById('logout');
const menuToggle = document.getElementById('menuToggle');
const menuList = document.getElementById('menuList');

async function loadUser() {
  const user = await getUser();
  if (!user) {
    window.location.href = '/login/';
    return;
  }
  const name = user.name || user.email;
  welcomeEl.textContent = `Welcome, ${name}!`;
  if (menuToggle) {
    menuToggle.textContent = `${name} \u25BC`;
  }
}

if (menuToggle && menuList) {
  menuToggle.addEventListener('click', () => {
    menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
  });
}

logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  logout();
});

loadUser();
