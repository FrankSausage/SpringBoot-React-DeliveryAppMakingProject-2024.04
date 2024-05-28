import React, { useEffect, useState } from "react";

// 네이버 SDK 스크립트를 로드하는 함수
const loadScript = (src, callback, errorCallback) => {
  const script = document.createElement("script");
  script.src = src;
  script.onload = callback;
  script.onerror = errorCallback;
  document.body.appendChild(script);
};
// 네이버 로그인 버튼 초기화

const NaverLoginButton = ({ onSuccess }) => {
  // 사용자 정보와 스크립트 로드 상태를 관리하는 상태 변수
  const [user, setUser] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 컴포넌트가 마운트될 때 네이버 SDK 스크립트를 로드
  useEffect(() => {
    const handleScriptLoad = () => {
      setIsScriptLoaded(true);
    };

    const handleScriptError = () => {
      console.error("Failed to load Naver SDK script");
    };

    // 네이버 SDK 스크립트 로드
    loadScript(
      "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js",
      handleScriptLoad,
      handleScriptError
    );
  }, []);

  // 네이버 SDK 스크립트 로드 완료 후 실행되는 효과
  useEffect(() => {
    if (!isScriptLoaded) return;

    // window 객체에서 네이버 SDK 가져오기
    const { naver } = window;
    if (!naver) {
      console.error("Naver SDK not loaded");
      return;
    } 
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      isPopup: true,
      loginButton: { color: "green", type: 1, height: 50 },
    });

    // 네이버 SDK 초기화
    naverLogin.init();
    console.log("Naver login initialized!");

    // 사용자 정보 가져오기
    const getUser = async () => {
      await naverLogin.getLoginStatus((status) => {
        console.log(`로그인 상태: ${status}`);
        if (status) {
          const user = naverLogin.user;
          setUser(user);
          onSuccess(user); // 로그인 성공 시 콜백 호출
        }
      });
    };

    getUser(); // 사용자 정보 가져오기 실행

  }, [isScriptLoaded, onSuccess]); // isScriptLoaded 및 onSuccess가 변경될 때마다 실행

  return <div id="naverIdLogin"></div>; // 네이버 로그인 버튼 컨테이너
};

export default NaverLoginButton; // 네이버 로그인 버튼 컴포넌트 내보내기


// callback url signUp으로 보내기 + userEmail  아이디 비밀번호 정보 추가로 입력하게 만들기 1번방법
