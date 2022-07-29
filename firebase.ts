// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyByi2kPVQ_BCiT_e2nmr2YsJvLWQJKGFfc',
  authDomain: 'netflix-wsl.firebaseapp.com',
  projectId: 'netflix-wsl',
  storageBucket: 'netflix-wsl.appspot.com',
  messagingSenderId: '612863444181',
  appId: '1:612863444181:web:292ad35cc3372cd78cce5c'
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();

const db = getFirestore();

export { db, auth };

export default app;
