import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEw2mU9uM0FgezMrwjWngX6_5g4toB35E",
    authDomain: "rewa-d5e69.firebaseapp.com",
    projectId: "rewa-d5e69",
    storageBucket: "rewa-d5e69.appspot.com",
    messagingSenderId: "299931736299",
    appId: "1:299931736299:web:999e93925a2bbe741c46ae",
    measurementId: "G-1V7KEJ13KW"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Conditionally initialize Firebase Analytics (only in the browser)
let analytics;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app); // Initialize analytics only in the client environment
}

const auth = getAuth(app); // Firebase Auth
const provider = new GoogleAuthProvider(); // Google Auth Provider
const db = getFirestore(app); // Initialize Firestore

export { auth, provider, db, analytics }; // Export Firebase services
