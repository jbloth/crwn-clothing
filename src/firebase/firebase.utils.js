import firebase from 'firebase/app'; // base import, firebase util library, definiert firebase-keyword
import 'firebase/firestore'; // database
import 'firebase/auth'; // authentification

const config = {
  apiKey: 'AIzaSyD6YndoKNONiuDRkI17EXWBc3UpQS4GuWo',
  authDomain: 'crwndb-6a3fa.firebaseapp.com',
  databaseURL: 'https://crwndb-6a3fa.firebaseio.com',
  projectId: 'crwndb-6a3fa',
  storageBucket: 'crwndb-6a3fa.appspot.com',
  messagingSenderId: '245194449358',
  appId: '1:245194449358:web:e99a2f1832a8518fa10b9f',
  measurementId: 'G-ZLHG3QDJGQ'
};

// Speicher User in DB
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // Wenn kein user eingeloggt ist (dann ist userAuth null)

  // reference ist nur eine Referenz auf den Ort in der DB
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // snapShot ist aktueller Zustand des Documents (?). Mit data kommt man an die
  // eigentlichen Daten.
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    // snapshot ist leer -> mach neu
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log('error creating user');
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// Verwendet Google-Account-Auswahl-Popup für auth (?)
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
