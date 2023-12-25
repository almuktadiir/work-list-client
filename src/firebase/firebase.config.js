// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwMjdUMXQpJ9flFCXgA3Zvo5XLTio7zok",
  authDomain: "task-management-e39eb.firebaseapp.com",
  projectId: "task-management-e39eb",
  storageBucket: "task-management-e39eb.appspot.com",
  messagingSenderId: "937642337387",
  appId: "1:937642337387:web:3f50c857bed62c607c7d2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;