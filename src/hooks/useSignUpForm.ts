import { React, useState } from 'react';
import { validateEmail, validateUsername, validatePassword, validateConfirmPassword } from '../utils/validators.ts';

interface SignUpFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  major: string;
  introduction: string;
  isOnline: boolean;
  notificationEnabled: boolean;
  location: string;
  studyCategories: string[];
}

const useSignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    major: "",
    introduction: "",
    isOnline: false,
    notificationEnabled: true,
    location: "",
    studyCategories: []
  });

  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let error = "";
    switch (name) {
      case "email":
        error = validateEmail(value);
        break;
      case "username":
        error = validateUsername(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(value, formData.password);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return {
    formData,
    errors,
    handleInputChange,
    setErrors,
    setFormData
  };
};

export default useSignUpForm;