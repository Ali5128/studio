import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "freemovies-vj181",
  appId: "1:934860182559:web:a0fbdae9c8658243e6712a",
  storageBucket: "freemovies-vj181.firebasestorage.app",
  apiKey: "AIzaSyBc-5ZWVtzfwS-oBNUiEImJpYY6aSOYYao",
  authDomain: "freemovies-vj181.firebaseapp.com",
  messagingSenderId: "934860182559",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);

export { app, db };
