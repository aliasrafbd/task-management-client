// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzpVXNdwO55xirVlETAFSXo4dnQMgdwW8",
  authDomain: "chakoria-shop.firebaseapp.com",
  projectId: "chakoria-shop",
  storageBucket: "chakoria-shop.firebasestorage.app",
  messagingSenderId: "223927449237",
  appId: "1:223927449237:web:ec460d13e05eb61a6ccd9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);