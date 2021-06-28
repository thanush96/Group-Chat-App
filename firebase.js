import "firebase/firestore";
import "firebase/auth";

import firebase from "firebase";

// firebase.initializeApp({
//   apiKey: "AIzaSyAztd68qfmOr1gZ3Xq94K3xnqhpnW3Dr80",
//   authDomain: "groupchat-e52b3.firebaseapp.com",
//   projectId: "groupchat-e52b3",
//   storageBucket: "groupchat-e52b3.appspot.com",
//   messagingSenderId: "753470551000",
//   appId: "1:753470551000:web:25511e17753fdec262b8ad",
// });

firebase.initializeApp({
  apiKey: "AIzaSyAzRDtmOVzA4Pk3hTPe4FVgJHhmrkP64gY",
  authDomain: "hello-43a1b.firebaseapp.com",
  databaseURL: "https://hello-43a1b-default-rtdb.firebaseio.com",
  projectId: "hello-43a1b",
  storageBucket: "hello-43a1b.appspot.com",
  messagingSenderId: "456651156728",
  appId: "1:456651156728:web:d61fcd9ed9373673685f0d",
  measurementId: "G-2FQDBS42VK",
});

// const FIREBASE = firebase;
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
