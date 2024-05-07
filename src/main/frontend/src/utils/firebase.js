import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider,
  signInWithPopup, signOut, updateProfile, signInWithEmailAndPassword,
  onAuthStateChanged } from "firebase/auth";
import { extractDataFromFormData } from '../utils/userInfo';
import { useOutletContext } from "react-router";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export async function register(user) {
  const { name, password, email } = await extractDataFromFormData(user);
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name, 
      })
    })
    .catch(console.error);
}

export function login({ email, password }) {
  signInWithEmailAndPassword(auth, email, password)
    .catch(console.error);
}

export function loginWithGithub() {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .catch(console.error);
}

export function getCurrentUser() {
  const userData = {};
  const user = auth.currentUser;
  if(user !== null) {
    userData.displayName = user.displayName;
    userData.email = user.email;
  }
  return userData;
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
