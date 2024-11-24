// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUXWEuuSCJq-9NaqV4ioHQF7JYy_RlHW8",
  authDomain: "johns-site-8b02a.firebaseapp.com",
  projectId: "johns-site-8b02a",
  storageBucket: "johns-site-8b02a.firebasestorage.app",
  messagingSenderId: "318834973799",
  appId: "1:318834973799:web:5d99f512ee730abee808c2",
  measurementId: "G-S83EWKLC5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);