// 카카오 초기화 코드와 로그인 처리 코드

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Kakao = () => {
  const [idToken, setIdToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");

    const kakaoRestApiKey = process.env.REACT_APP_KAKAO_API_KEY; 

    // 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoRestApiKey);
      console.log(window.Kakao.isInitialized());
    }

    const getKakaoToken = async (code) => {
      try {
        const response = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `grant_type=authorization_code&client_id=${kakaoRestApiKey}&redirect_uri=${window.location.origin}/callback/kakaotalk&code=${code}`,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch Kakao token");
        }
        const data = await response.json();
        if (data.id_token) {
          setIdToken(data.id_token);
        } else {
          throw new Error("ID token not found in response");
        }
        if (data.access_token) {
          setAccessToken(data.access_token);
          window.Kakao.Auth.setAccessToken(data.access_token);
        } else {
          throw new Error("Access token not found in response");
        }
      } catch (error) {
        console.error("Error getting Kakao token:", error);
        navigate('/');
      }
    };

    // 코드가 존재하는 경우 토큰 가져오기
    if (code) {
      getKakaoToken(code);
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      {idToken && <p>ID Token: {idToken}</p>}
      {accessToken && <p>Access Token: {accessToken}</p>}
    </div>
  );
}

export default Kakao;
