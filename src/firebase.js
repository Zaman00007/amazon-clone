import firebase from "firebase";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAA7Ov3pCJtGhDpD_uArFmQ4jvbE_lGdg",
  authDomain: "clone-6eceb.firebaseapp.com",
  projectId: "clone-6eceb",
  storageBucket: "clone-6eceb.appspot.com",
  messagingSenderId: "350707806029",
  appId: "1:350707806029:web:872aa521876d2e1c665104",
  measurementId: "G-HFS1G1MV9S"
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};