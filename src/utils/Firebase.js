// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwVsJQe1MkFjtQdzqc-d_WF5DaNHVHAwA",
  authDomain: "jhev-c5944.firebaseapp.com",
  projectId: "jhev-c5944",
  storageBucket: "jhev-c5944.appspot.com",
  messagingSenderId: "957368092956",
  appId: "1:957368092956:web:36639821064f321330d2d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getFirestore(app);
const storage = getStorage();
export { app, auth, provider, database, storage };
