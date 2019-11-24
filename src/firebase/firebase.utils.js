import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDOo5JB_ks-iLn72oKYpH4f-WcUzroNrFc",
    authDomain: "crwn-db-60a25.firebaseapp.com",
    databaseURL: "https://crwn-db-60a25.firebaseio.com",
    projectId: "crwn-db-60a25",
    storageBucket: "crwn-db-60a25.appspot.com",
    messagingSenderId: "716407044973",
    appId: "1:716407044973:web:c436b61c178b430ae2f864",
    measurementId: "G-S6GG9V0R99"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;