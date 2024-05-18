import React, { useEffect} from 'react';
import '../css/LoginScreen.css'

function Login() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js';
    script.integrity = "sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01";
    script.crossOrigin = "anonymous";
    script.async = true;
    script.onload = () => {
      window.Kakao.init('ce1dc31ea67a76ebff209bb8dff8992e');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function loginWithKakao() {
    // 카카오 로그인 URL
    const kakaoLoginUrl = "https://kauth.kakao.com/oauth/authorize?client_id=ce1dc31ea67a76ebff209bb8dff8992e&redirect_uri=http://15.164.219.39:8079/oauth/kakao&response_type=code";

    // 해당 URL로 이동
    window.location.href = kakaoLoginUrl;
  }

  return (
    <div className="login-container">
      {/* 소셜로그인 */}
      <div className="login-form">
        <div style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: '50px', color: '#20493C' }} >Green Boogie</div>

        {/* 그린부기 설명창 - 수정필요 */}
        <div className="login-details" style={{ fontFamily: 'Inter', color: '#828282' }}> 그린부기는 시각장애인과 비장애인이 지하철을 편리하고 안전하게 이용할 수 있도록 제작된 지하철 편의증진 앱, 웹 서비스입니다.</div>
        {/* <img className="greenboogie-img" src="https://ifh.cc/g/G6v1Jz.png" alt="그린부기 설명 이미지" /> */}

        {/* 소셜로그인 */}
        <div className="social-login" >
          <a id="kakao-login-btn" onClick={loginWithKakao}>
            <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" alt="카카오 로그인 버튼" width="180" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
