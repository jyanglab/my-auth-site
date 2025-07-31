import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyB9MgufM9zd9NRZJX5sV5ra2nnVgrP668s",
  authDomain: "my-demo-ad994.firebaseapp.com",
  projectId: "my-demo-ad994",
  storageBucket: "my-demo-ad994.firebasestorage.app",
  messagingSenderId: "927084817695",
  appId: "1:927084817695:web:cbe464ab831684fe5dd42a",
  measurementId: "G-HVBQSEMDYK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const homeBtn = document.getElementById('home');

homeBtn.addEventListener('click', () => {
  window.location.href = '/homepage/';
});

async function loadProfile(uid) {
  try {
    const docRef = doc(db, 'users', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      nameEl.textContent = `${data.firstName} ${data.lastName}`;
      emailEl.textContent = data.email;
    } else {
      nameEl.textContent = 'User not found';
    }
  } catch (err) {
    console.error('Error loading profile', err);
    nameEl.textContent = 'Error loading profile';
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem('loggedInUserId', user.uid);
    loadProfile(user.uid);
  } else {
    const uid = localStorage.getItem('loggedInUserId');
    if (uid) {
      loadProfile(uid);
    } else {
      window.location.href = '/login/';
    }
  }
});
