import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_CRED_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_CRED_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_CRED_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_CRED_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_CRED_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_CRED_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_CRED_MEASUREMENTID,
};

const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAnalytics = getAnalytics(FirebaseApp);
const FirebaseDb = getFirestore(FirebaseApp);

export { FirebaseAnalytics, FirebaseApp, FirebaseDb };
