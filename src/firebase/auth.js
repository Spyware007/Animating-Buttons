// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD4X5rG48xOsiTiLyKzPgLEzOuKKpaS6pI",
  authDomain: "animating-buttons-ded46.firebaseapp.com",
  projectId: "animating-buttons-ded46",
  storageBucket: "animating-buttons-ded46.appspot.com",
  messagingSenderId: "18538753787",
  appId: "1:18538753787:web:8f0cf746a77d2ef7204a5e",
  measurementId: "G-K8RP05GZ72",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GithubAuthProvider();
const analytics = getAnalytics(app);
export { db, auth, provider, analytics };
