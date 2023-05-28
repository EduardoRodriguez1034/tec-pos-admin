// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore,  collection, addDoc, doc,setDoc,getDocs,query,where,deleteDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAIcZF5h29YoaFvLRDNk0nTdtwUfPU0hmo",
    authDomain: "tec-pos.firebaseapp.com",
    projectId: "tec-pos",
    storageBucket: "tec-pos.appspot.com",
    messagingSenderId: "481852359142",
    appId: "1:481852359142:web:fa5f768ae2bcde3fc71627",
    measurementId: "G-32FNW6MC4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export {
    db,
    collection,
    doc,
    addDoc,
    setDoc,
    analytics,
    getDocs,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    query,
    where,
    deleteDoc
}