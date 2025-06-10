import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBq8xxkAhp6tLjbx-OaDQaIzCa95ORaZFg",
  authDomain: "climate-workx.firebaseapp.com",
  projectId: "climate-workx",
  storageBucket: "climate-workx.firebasestorage.app",
  messagingSenderId: "652245108510",
  appId: "1:652245108510:web:287f510e5d7a4f95b02b0f",
  measurementId: "G-NN6ND8Q8R7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);