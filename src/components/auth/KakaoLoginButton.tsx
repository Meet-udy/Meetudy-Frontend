import React from "react";

interface KakaoLoginButtonProps {
  onClick: () => void;
}

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({ onClick }) => {
  return (
    <button style={kakaoLoginButtonStyle} onClick={onClick}>
      <img
        src="/images/kakao_login_medium_narrow.png"
        alt="카카오 로그인"
        style={kakaoButtonImgStyle}
      />
    </button>
  );
};

const kakaoLoginButtonStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  width: "200px",
  height: "80px",
};

const kakaoButtonImgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

export default KakaoLoginButton;