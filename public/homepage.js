import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9MgufM9zd9NRZJX5sV5ra2nnVgrP668s",
  authDomain: "my-demo-ad994.firebaseapp.com",
  projectId: "my-demo-ad994",
  storageBucket: "my-demo-ad994.firebasestorage.app",
  messagingSenderId: "927084817695",
  appId: "1:927084817695:web:cbe464ab831684fe5dd42a",
  measurementId: "G-HVBQSEMDYK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const welcomeEl = document.getElementById('welcome');
const logoutBtn = document.getElementById('logout');
const menuToggle = document.getElementById('menuToggle');
const menuList = document.getElementById('menuList');

async function loadUser() {
  const uid = localStorage.getItem('loggedInUserId');
  if (!uid) {
    window.location.href = '/login/';
    return;
  }
  try {
    const docRef = doc(db, 'users', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      welcomeEl.textContent = `Welcome, ${data.firstName}!`;
      if (menuToggle) {
        menuToggle.textContent = `${data.firstName} \u25BC`;
      }
    } else {
      welcomeEl.textContent = 'Welcome!';
    }
  } catch (err) {
    console.error('Error fetching user', err);
    welcomeEl.textContent = 'Welcome!';
  }
}


if (menuToggle && menuList) {
  menuToggle.addEventListener('click', () => {
    menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
  });
}

logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signOut(auth).finally(() => {
    localStorage.removeItem('loggedInUserId');
    window.location.href = '/login/';
  });
});

loadUser();
