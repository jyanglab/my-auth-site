// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = getAuth(app);
const db = getFirestore(app);

window.loginUser = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = "/dashboard/";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
};

window.onload = function () {
  onAuthStateChanged(auth, async (user) => {
    if (user && window.location.pathname.includes("/dashboard")) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      document.getElementById("welcome").innerText = `Welcome ${userData.role} ${user.email}`;
    }
  });
};

