import React from "react";
import "./InputField.css";

interface LoginFieldProps {
  type: "text" | "password" | "email";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginField: React.FC<LoginFieldProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="login-field"
    />
  );
};

export default LoginField;