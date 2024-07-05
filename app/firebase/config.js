import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const apiKey = process.env.NEXT_PUBLIC_APIKEY_FIREBASE;
const authDomain = process.env.NEXT_PUBLIC_AUTHDOMAIN_FIREBASE;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE;
const storageBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIREBASE;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGIN_SENDER_ID_FIREBASE;
const appId = process.env.NEXT_PUBLIC_APP_ID_FIREBASE;
const measurementId = process.env.NEXT_PUBLIC_MEASUREMENT_ID_FIREBASE;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);
auth.languageCode = "es";

// Storage
const storage = getStorage(app);

export { app, storage, auth };
