import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import config from "utils/config/env";

export const firebaseConfig = {
  appId: `${config.appId}`,
  apiKey: `${config.apiKey}`,
  projectId: `${config.projectId}`,
  authDomain: `${config.authDomain}`,
  storageBucket: `${config.storageBucket}`,
  measurementId: `${config.measurementId}`,
  messagingSenderId: `${config.messagingSenderId}`,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);
