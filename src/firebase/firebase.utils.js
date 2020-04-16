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
  measurementId: 'G-ZLHG3QDJGQ',
};

firebase.initializeApp(config);

// Speicher User in DB
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // Wenn kein user eingeloggt ist (dann ist userAuth null)

  // reference ist nur eine Referenz auf den Ort in der DB
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // snapShot ist aktueller Zustand des Documents (?). Mit data kommt man an die
  // eigentlichen Daten.
  const snapShot = await userRef.get();

  // Wenn es den User noch nicht in der DB gibt, bitte anlegen
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // Wir müssen keine Reference anlegen, firestore gibt immer irgendwas zurück
  const collectionRef = firestore.collection(collectionKey);

  // atomic operation die mehrer writes am Stück macht und dabei race conditions
  // vermeidet
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    // Macht eine Referenz für Document mit zufällig generierter ID
    const newDocRef = collectionRef.doc();

    // Wirft die set-operation auf den batch
    batch.set(newDocRef, obj);
  });

  // feuert batch ab
  return await batch.commit();
};

// Bring collections aus db in das Format das wir für unseren state gewählt haben
export const convertCollectionsSnapshotToMap = (collections) => {
  // Mach ein array aus collections und speichere für jede collection die id und die route
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      // encodeURI sanitized strings für verwendung als URL
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id, // Die id des Documents selbst, d.h. nicht aus doc.data()
      title,
      items,
    };
  });

  // Mach ein map aus dem array
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {}); // Anfangswert für reduce ist leeres Objekt
};

// Wir gucken nur kurz obe es einen eingeloggten User gibt und dann melden wir uns
// sofort wieder ab (Wir simulieren eine Situation in der wir nicht firebase für
// Authentifikation benutzen)
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // onAuthStateChanged bekommt zwei Parameter: Was mache ich wenns geklappt hat?
    // und was mache ich wenn nicht?
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
// Verwendet Google-Account-Auswahl-Popup für auth (?)
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
