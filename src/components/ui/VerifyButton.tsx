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
        color: "#555",
        border: "1px solid #555",
        backgroundColor: "#55555508",
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