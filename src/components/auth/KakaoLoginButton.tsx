import React from "react";
import "./KakaoLoginButton.css";

interface KakaoLoginButtonProps {
  onClick: () => void;
}

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({ onClick }) => {
  return (
    <button className="kakao-login-button" onClick={onClick}>
      <img
        src="/images/kakao_login_medium_narrow.png"  // public 폴더 내 이미지 경로
        alt="카카오 로그인"
        className="kakao-button-img"
      />
    </button>
  );
};

export default KakaoLoginButton;