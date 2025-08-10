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
  apiKey: "AIzaSyDbg-G_Nwc5kvS0QGjEGJNZiBpipDo-c_Y",
  authDomain: "beatzingees.firebaseapp.com",
  projectId: "beatzingees",
  storageBucket: "beatzingees.firebasestorage.app",
  messagingSenderId: "629054287399",
  appId: "1:629054287399:web:b2e38d8d109cd208cf2802",
  measurementId: "G-P6DKD3909J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
