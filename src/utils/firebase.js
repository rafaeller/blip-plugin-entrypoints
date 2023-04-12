// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAymyanTB0iw3L6uAr4lW3AGMH0ey75hC4",
  authDomain: "template-guru-spellor.firebaseapp.com",
  projectId: "template-guru-spellor",
  storageBucket: "template-guru-spellor.appspot.com",
  messagingSenderId: "567208825586",
  appId: "1:567208825586:web:13e67982b78855d8ca766b",
  measurementId: "G-02MR4KCW5D"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics(app);
const db = firebase.firestore(app)

export { db, analytics };