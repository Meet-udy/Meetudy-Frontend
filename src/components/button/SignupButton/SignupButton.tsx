import React from "react";
import "./SignupButton.css";

interface SignupButtonProps {
  onClick: () => void;
  text: string;
}

const SignupButton: React.FC<SignupButtonProps> = ({ onClick, text }) => {
  return (
    <button className="signup-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default SignupButton;