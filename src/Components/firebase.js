import firebase from 'firebase';

//to connect react to firebase
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCJ5oN6k_--lx9meNOenRbqFlTHd_uXTOY",
    authDomain: "instagram-clone-react-8f893.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-8f893-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-react-8f893",
    storageBucket: "instagram-clone-react-8f893.appspot.com",
    messagingSenderId: "924874288823",
    appId: "1:924874288823:web:f39a71fc065ec6fc922732",
    measurementId: "G-C2C75VCVGM"
  
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};