import React from "react";
import "./SignUpButton.css";

interface SignUpButtonProps {
  onClick: () => void;
  text: string;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ onClick, text }) => {
  return (
    <button className="signup-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default SignUpButton;