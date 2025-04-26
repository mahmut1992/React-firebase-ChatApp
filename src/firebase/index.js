import { initializeApp } from "firebase/app";
// auth importları
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// database import
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCq7kUVDwiksGEs0ANEUxDlW5D5wqO7JfY",
  authDomain: "chat-e56b5.firebaseapp.com",
  projectId: "chat-e56b5",
  storageBucket: "chat-e56b5.firebasestorage.app",
  messagingSenderId: "801470289070",
  appId: "1:801470289070:web:01543e39c6f8451729093f",
};

const app = initializeApp(firebaseConfig);

// google sağlayıcısını kur

export const provider = new GoogleAuthProvider();

// auth hizmetini kur (referansını al)

export const auth = getAuth(app);

// database hizmetinin referansını al

export const db = getFirestore(app);
