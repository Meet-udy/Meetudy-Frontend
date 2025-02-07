import React from "react";
import "./LoginButton.css";

interface LoginButtonProps {
  text: string;
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ text, onClick }) => {
  return (
    <button className="login-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default LoginButton;