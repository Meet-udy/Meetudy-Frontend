import React, { useState } from "react";
import LoginButton from "../../components/button/LoginButton/LoginButton.tsx";
import KakaoLoginButton from "../../components/button/KakaoLoginButton/KakaoLoginButton.tsx";  
import LoginField from "../../components/layout/LoginField/LoginField.tsx";  
import SignupButton from "../../components/button/SignupButton/SignupButton.tsx";
import "./LoginPage.css"; 

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    console.log("Login", { username, password });
  };

  return (
    <div className="login-page-container">
      <h1 className="login-title">MEETUDY</h1>

      <div className="login-section">
        <div className="line-with-text">이메일 로그인</div>
        <LoginField
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login-links">
        <a href="#">아이디 찾기</a>
          <span>/</span>  
          <a href="#">비밀번호 찾기</a>
        </div>
        <div className="login-button-container">
          <LoginButton text="로그인" onClick={handleLogin} />
        </div>
      </div>

      <div className="line-with-text">간편 로그인 / 회원가입</div>
        <div className="login-buttons-container">
          <div className="kakao-login-container">
            <KakaoLoginButton onClick={() => alert("카카오 로그인")} />
          </div>
          <SignupButton text="회원가입" onClick={() => alert("회원가입 클릭")} />
      </div>
    </div>

  );
};

export default LoginPage;