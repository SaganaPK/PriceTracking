// src/firebase.js (or wherever you want to configure Firebase)

import { initializeApp } from 'firebase/app';
import { getFirestore ,addDoc ,collection} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCSRP_T4hwE8TiU6ynJcZoxkyJFPOKTel8",
    authDomain: "pricetracking-5f518.firebaseapp.com",
    projectId: "pricetracking-5f518",
    storageBucket: "pricetracking-5f518.appspot.com",
    messagingSenderId: "692092000772",
    appId: "1:692092000772:web:446d8af74b6efadf09f351",
    measurementId: "G-QCG7YZ8VMX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db , addDoc, collection};
