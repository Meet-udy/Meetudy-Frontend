import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signIn } from "../../api/auth.ts";
import LoginButton from "../../components/auth/LoginButton.tsx";
import KakaoLoginButton from "../../components/auth/KakaoLoginButton.tsx";  
import InputField from "../../components/ui/InputField.tsx";  
import SignupButton from "../../components/auth/SignUpButton.tsx";
import "./LoginPage.css";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});

  const handleLogin = async () => {
    setErrors({});
  
    if (!username || !password) {
      setErrors({
        username: !username ? "아이디를 입력해 주세요." : undefined,
        password: !password ? "비밀번호를 입력해 주세요." : undefined,
      });
      return;
    }
  
    try {
      const response = await signIn({ username, password });
  
      if (!response.isSuccess) { 
        setErrors({ general: "로그인에 실패했습니다." });
      } else {
        if (response.result) {
          localStorage.setItem("accessToken", response.result.accessToken);
          localStorage.setItem("refreshToken", response.result.refreshToken);
          window.location.href = "/";
        } else {
          setErrors({ general: "로그인 결과가 없습니다." });
        }
      }
    } catch (error) {
      setErrors({ general: "서버와의 통신 중 오류가 발생했습니다." });
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleFindUsername = () => {
    navigate("/find-account"); 
  };

  const handleFindPassword = () => {
    navigate("/find-account"); 
  };

  return (
    <div className="login-page-container">
      <h1 className="login-title">MEETUDY</h1>

      <div className="login-section">
        <div className="line-with-text">이메일 로그인</div>
        <InputField
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={errors.username ? "login-error" : ""}
        />
        {errors.username && <p className="error-message">{errors.username}</p>}

        <InputField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? "login-error" : ""}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}

        <div className="login-links">
          <a href="#" onClick={handleFindUsername}>아이디 찾기</a>
          <span>/</span>
          <a href="#" onClick={handleFindPassword}>비밀번호 찾기</a>
        </div>

        <div className="login-button-container">
          <LoginButton text="로그인" onClick={handleLogin} />
        </div>

        {errors.general && <p className="error-message">{errors.general}</p>}
      </div>

      <div className="line-with-text">간편 로그인 / 회원가입</div>
        <div className="login-buttons-container">
          <div className="kakao-login-container">
            <KakaoLoginButton onClick={handleKakaoLogin} />
          </div>
          <div className="signup-container">
            <Link to="/signup">
              <SignupButton text="회원가입" />
            </Link>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;