// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// };

// please comment out this code

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA7loVkije0U7IuA9vwXrAotMxEbtJ7Fq8",
  authDomain: "testingprject.firebaseapp.com",
  projectId: "testingprject",
  storageBucket: "testingprject.firebasestorage.app",
  messagingSenderId: "942428835184",
  appId: "1:942428835184:web:bbfe09180307d5dd9313b5",
  measurementId: "G-Z7G2EGWY2D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
