import firebase from 'firebase/app';
import 'firebase/auth';

const initFirebase = async () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }
};

export const onAuthStateChanged = async (callback) => {
  initFirebase();

  return firebase.auth().onAuthStateChanged(callback);
};

export const signIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => firebase.auth().signOut();
