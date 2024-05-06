// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5AiuNw79G9IA8IWBsvpTEras98wHND9I",
    authDomain: "well-belle.firebaseapp.com",
    projectId: "well-belle",
    storageBucket: "well-belle.appspot.com",
    messagingSenderId: "261625581857",
    appId: "1:261625581857:web:48689ac65874c1f6de2e60",
    measurementId: "G-5MQT664MLC"
};

// Initialize Firebase
export const db = initializeApp(firebaseConfig);
