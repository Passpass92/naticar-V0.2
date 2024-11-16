import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCBDetWpUm_hNFSYkfwegRwaJc0ri-N8hQ",
  authDomain: "natalconnect-first.firebaseapp.com",
  projectId: "natalconnect-first",
  storageBucket: "natalconnect-first.firebasestorage.app",
  messagingSenderId: "59105970836",
  appId: "1:59105970836:web:bdcce7e23744e434778281",
  measurementId: "G-Z9STRKF46G"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);