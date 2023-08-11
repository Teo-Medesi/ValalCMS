// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "carnetcms.firebaseapp.com",
  projectId: "carnetcms",
  storageBucket: "carnetcms.appspot.com",
  messagingSenderId: "59962563228",
  appId: "1:59962563228:web:cdf2ed6ba1b6224955eb59",
  measurementId: "G-CLNR9H83T5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
