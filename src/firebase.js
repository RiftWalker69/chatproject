
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyB2rymdt70BxIO8mC4QDgoJp4P_MIZk994",
  authDomain: "chatbox-33624.firebaseapp.com",
  projectId: "chatbox-33624",
  storageBucket: "chatbox-33624.appspot.com",
  messagingSenderId: "278878816724",
  appId: "1:278878816724:web:9f6d8a3ba860e8b500ae41",
  measurementId: "G-Z5NJX8S7GF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();