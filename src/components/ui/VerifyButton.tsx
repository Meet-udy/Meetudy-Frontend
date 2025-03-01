import React from "react";

interface VerifyButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string; 
}

const VerifyButton: React.FC<VerifyButtonProps> = ({ onClick, children, className = "" }) => {
  return (
    <button
      className={`verify-button ${className}`} 
      onClick={onClick}
      style={{
        color: "#1f72c5",
        border: "1px solid #1f72c5",
        backgroundColor: "rgb(242, 249, 255)",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

export default VerifyButton;