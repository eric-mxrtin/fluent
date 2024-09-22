// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getDocFromCache, getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeMRuSSHzuN7daPkiQNwVZzkcatte8TWo",
  authDomain: "chat-application-5a313.firebaseapp.com",
  projectId: "chat-application-5a313",
  storageBucket: "chat-application-5a313.appspot.com",
  messagingSenderId: "606110234855",
  appId: "1:606110234855:web:97a3684505494b9ee00a42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);