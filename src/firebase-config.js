// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXoLw_QuaX5LapWnI7YqeHhWfBn3czBlM",
  authDomain: "foreignermap.firebaseapp.com",
  projectId: "foreignermap",
  storageBucket: "foreignermap.appspot.com",
  messagingSenderId: "184974474827",
  appId: "1:184974474827:web:0ea7c54e6dc115e61997ce",
  measurementId: "G-8Z8WTMS7QH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export { firestore };
