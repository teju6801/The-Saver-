
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPXlNJeKkQ740hgHf3ucYtXb_rtmPzGNU",
  authDomain: "dog-chairty.firebaseapp.com",
  projectId: "dog-chairty",
  storageBucket: "dog-chairty.firebasestorage.app",
  messagingSenderId: "867336568841",
  appId: "1:867336568841:web:e2354ef46d38bb78ec78d8"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);