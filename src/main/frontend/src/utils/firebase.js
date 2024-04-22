import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider,
  signInWithPopup, signOut, updateProfile, signInWithEmailAndPassword,
  onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function register({ email, password, name, photo }) {
  console.log('firebase:register():', email, password);
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
    })
    .then(() => {logout()})
    .catch(console.error);
}

export function login({ email, password }) {
  console.log('firebase.js:login(): ', email, password);
  signInWithEmailAndPassword(auth, email, password)
    .catch(console.error);
}

export function loginWithGithub() {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}