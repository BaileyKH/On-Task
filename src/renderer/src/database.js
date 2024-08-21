import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAQa4zaLYWPPbAba0VYpbfdpcjPigacV7w",
    authDomain: "cs50-final-a1cfb.firebaseapp.com",
    projectId: "cs50-final-a1cfb",
    storageBucket: "cs50-final-a1cfb.appspot.com",
    messagingSenderId: "634459176462",
    appId: "1:634459176462:web:ab1963070e8433e96c865f"
  };
  

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };