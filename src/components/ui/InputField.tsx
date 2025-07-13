import React from "react";
import styled from "styled-components";

interface InputFieldProps {
  name: string;
  type: "text" | "password" | "email";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, value, onChange, className }) => {
  return (
    <StyledInput
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className} 
    />
  );
};

export default InputField;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 5px;
  width: 100%;
  height: auto;

  &.login-error { 
    border-color: red;
  }
`;