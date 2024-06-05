import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup, signOut, updateProfile, signInWithEmailAndPassword,
  onAuthStateChanged, updatePassword, OAuthProvider} from "firebase/auth";
import { extractDataFromFormData } from '../utils/commonUitil';

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

export async function updateUser(user) {
  if(auth.currentUser !== null) {
    const { name, password } = await extractDataFromFormData(user);
    updateProfile(auth.currentUser, {
      displayName: name,
    }).catch(console.error);
    updatePassword(auth.currentUser, password).catch(console.error);
  }
}

export async function login({ email, password }) {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(res => {
      if(res) {
        return true;
      }
    })
    .catch(e => {
      console.error(e);
      return false;
    });
}

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
  .then((res) => {

      console.log(res.user); // 사용자 정보 찍어보기
      // insertUserDataWithSocial(res.user.email, res.user.displayName) // 사용자 정보 db에 저장
      return res.user; // 사용자 정보 반환
    })
    
    .catch(error => {
      console.error("Google 로그인 오류:", error);
      throw error; // 오류 재 throw
    });
}

// # 카카오 로그인
export function loginWithKakao(){
  const provider = new OAuthProvider('oidc.로그인');
  
  return signInWithPopup(auth, provider)
  .then((res) => {  

    // Get the OAuth access token and ID Token
    const credential = OAuthProvider.credentialFromResult(res);
    const accessToken = credential.accessToken;
    const idToken = credential.idToken;
    
    console.log(res.user); // 사용자 정보 찍어보기
    // insertUserDataWithSocial(res.user.email, res.user.displayName) // 사용자 정보 db에 저장
    return res.user;
  })
  .catch((error) => {
    console.error("kakao 로그인 오류:", error);
      throw error; // 오류 재 throw
  });
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
  
  signOut(auth)
  .then(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    alert('로그아웃 되었습니다.');
  })
  .catch(console.error);
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
