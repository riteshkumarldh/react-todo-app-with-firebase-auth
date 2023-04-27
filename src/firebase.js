import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIyKI6byV7-9whWrIvCi7hTOKYUKM3bD0",
  authDomain: "react-todo-app-16af4.firebaseapp.com",
  projectId: "react-todo-app-16af4",
  storageBucket: "react-todo-app-16af4.appspot.com",
  messagingSenderId: "885939723505",
  appId: "1:885939723505:web:69970e0d47b317ac2f5d50",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
