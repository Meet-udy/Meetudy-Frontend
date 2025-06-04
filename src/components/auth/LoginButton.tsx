import React from "react";

interface LoginButtonProps {
  text: string;
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ text, onClick }) => {
  return (
    <button style={loginButtonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

const loginButtonStyle: React.CSSProperties = {
  padding: "10px",
  border: "none",
  backgroundColor: "#555",
  color: "white",
  cursor: "pointer",
  borderRadius: "5px",
  width: "107%",
  fontSize: "16px",
  height: "40px",
};

export default LoginButton;