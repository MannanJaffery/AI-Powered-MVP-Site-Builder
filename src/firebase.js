import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions,connectFunctionsEmulator } from "firebase/functions";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-powered-mvp-builder.firebaseapp.com",
  projectId: "ai-powered-mvp-builder",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "327636782437",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

//this line is only for the local version and for testing it locally

    if (import.meta.env.MODE === "development") {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}


const googleprovider = new GoogleAuthProvider();
const storage = getStorage(app);
export { app, auth, db ,storage, googleprovider };
