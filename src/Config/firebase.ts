import { initializeApp, getApps } from "firebase/app";

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
} from "@env";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "brain-data-api.firebaseapp.com",
  projectId: "brain-data-api",
  storageBucket: "brain-data-api.appspot.com",
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
