// src/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAhDH-arZ803YT89PkXmVr6QDNdwfCNEq4",
    authDomain: "studio-5239946753-59ca3.firebaseapp.com",
    projectId: "studio-5239946753-59ca3",
    storageBucket: "studio-5239946753-59ca3.firebasestorage.app",
    messagingSenderId: "129934965473",
    appId: "1:129934965473:web:8b0777b6b47713e30c55a0"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);
