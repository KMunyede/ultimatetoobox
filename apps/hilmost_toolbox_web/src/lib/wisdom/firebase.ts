import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRqWzRCb8RWqFfpLce6U8VXdBapZPc5RA",
  appId: "1:829389623459:web:5b967309ad8b3b869d2f16",
  messagingSenderId: "829389623459",
  projectId: "dailystoicapp",
  authDomain: "dailystoicapp.firebaseapp.com",
  storageBucket: "dailystoicapp.firebasestorage.app",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
