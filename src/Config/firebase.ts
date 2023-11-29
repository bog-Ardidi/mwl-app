// @ts-nocheck
import * as firebase from "firebase";
import "firebase/firestore";
import "@react-native-async-storage/async-storage";

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
} from "@env";

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
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const auth = firebase.auth();

export const db = firebase.firestore();

export const user = firebase.auth().currentUser;

export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const fbfs = firebase.firestore;
