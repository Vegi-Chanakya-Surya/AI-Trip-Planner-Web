// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ7FrExfuATWqgJ-jQMjP3tIvTWsVmn80",
  authDomain: "ai-trip-planner-48c3d.firebaseapp.com",
  projectId: "ai-trip-planner-48c3d",
  storageBucket: "ai-trip-planner-48c3d.firebasestorage.app",
  messagingSenderId: "1085448445021",
  appId: "1:1085448445021:web:09f41fc60a050e051341b4",
  measurementId: "G-15X220QSYP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);