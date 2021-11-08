// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC73wG_900l4axZq7xmjqPcpNweXHcVIPE",
  authDomain: "contacts-71b87.firebaseapp.com",
  projectId: "contacts-71b87",
  storageBucket: "contacts-71b87.appspot.com",
  messagingSenderId: "127994238323",
  appId: "1:127994238323:web:da1c8f0a9b51ad9256a106"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, doc, updateDoc, addDoc, deleteDoc };