import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFYeAErG5T9UWyPdj9fvJv4Fhnf9GMDvY",
  authDomain: "fir-reference-project.firebaseapp.com",
  projectId: "fir-reference-project",
  storageBucket: "fir-reference-project.appspot.com",
  messagingSenderId: "1066870734215",
  appId: "1:1066870734215:web:57344cb7601c19d538a722",
  measurementId: "G-Z9QED5N2FT",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
// const auth = firebase.auth();
const storage = firebase.storage();

export { db, storage };
