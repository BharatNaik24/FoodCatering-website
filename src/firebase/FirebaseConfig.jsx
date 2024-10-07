import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRQ5vwW1cew23PdGEBFRBujo_As6aSxsE",
  authDomain: "cateringreservationordering.firebaseapp.com",
  projectId: "cateringreservationordering",
  storageBucket: "cateringreservationordering.appspot.com",
  messagingSenderId: "719258401575",
  appId: "1:719258401575:web:11b8449495a45ee5100702",
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
