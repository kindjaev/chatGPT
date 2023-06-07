import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "chatgpt-a3852.firebaseapp.com",
  projectId: "chatgpt-a3852",
  storageBucket: "chatgpt-a3852.appspot.com",
  messagingSenderId: "696239586003",
  appId: "1:696239586003:web:e3cb5ffca995be45257226",
  measurementId: "G-7FVEMZ67PW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
