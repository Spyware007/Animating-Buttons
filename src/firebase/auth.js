// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAY_EsFz1WJgGK06l682oa_EDUTi_w2vmI",
  authDomain: process.env.REACT_APP_authDomain,
  projectId: "project-marketplace-3618e",
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: "1:95883339089:web:64e3abdc345b7e16159f70",
  measurementId: process.env.REACT_APP_measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GithubAuthProvider();
const analytics = getAnalytics(app);
export { db, auth, provider, analytics };
