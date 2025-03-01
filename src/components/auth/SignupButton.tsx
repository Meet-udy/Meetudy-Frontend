import React from "react";

interface SignUpButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ onClick, text, className }) => {
  return (
    <button className={className} style={signUpButtonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

const signUpButtonStyle: React.CSSProperties = {
  color: "#1f72c5",
  backgroundColor: "white",
  border: "1px solid #ddd",
  padding: "14px 30px",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "14px",
  whiteSpace: "nowrap",
  flex: "none",
};

export default SignUpButton;