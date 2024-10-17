// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC23I5ryQnbnDeUc6mOdMqNW1z8eoaoDLY",
    authDomain: "millet-54428.firebaseapp.com",
    databaseURL: "https://millet-54428-default-rtdb.firebaseio.com",
    projectId: "millet-54428",
    storageBucket: "millet-54428.appspot.com",
    messagingSenderId: "847481897110",
    appId: "1:847481897110:web:8c21d2676539708913c2b7",
    measurementId: "G-N5GVTRHQNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
