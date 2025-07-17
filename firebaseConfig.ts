import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBzZzibSdACeyDexBmo727JAEci0vUDpyQ",
  authDomain: "mentat-d8366.firebaseapp.com",
  projectId: "mentat-d8366",
  storageBucket: "mentat-d8366.firebasestorage.app",
  messagingSenderId: "90552056477",
  appId: "1:90552056477:web:d292f4961a8e6ce2857274",
  measurementId: "G-GYQEDW5T3T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };