// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDxxpMJb2oBSUFrbqWo3gBF1sefOk1A96s",
  authDomain: "animating-buttons.firebaseapp.com",
  databaseURL: "https://animating-buttons-default-rtdb.firebaseio.com",
  projectId: "animating-buttons",
  storageBucket: "animating-buttons.appspot.com",
  messagingSenderId: "813372452114",
  appId: "1:813372452114:web:fb41ec5b117400d77657cb",
  measurementId: "G-B2J5KD293M"

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);