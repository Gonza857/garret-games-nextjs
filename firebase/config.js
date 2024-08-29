// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmrb6FfGdMjgq-NiS9jlv0C8k7zudf1g8",
  authDomain: "garret-games-next.firebaseapp.com",
  projectId: "garret-games-next",
  storageBucket: "garret-games-next.appspot.com",
  messagingSenderId: "993309411474",
  appId: "1:993309411474:web:27afca990de9c1dc85be4b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
