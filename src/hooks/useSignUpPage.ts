import { useState } from "react";
import { checkUsernameAvailability, checkNicknameAvailability } from "../api/auth.ts";

export const useSignUpPage = (
    formData: any, 
    setFormData: React.Dispatch<React.SetStateAction<any>>, 
    setErrors: React.Dispatch<React.SetStateAction<any>> 
  ) => {
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  
    const handleUsernameValidation = async () => {
      try {
        const response = await checkUsernameAvailability(formData.username);
        if (response.isSuccess) {
          setIsUsernameAvailable(true);
          setErrors((prev) => ({
            ...prev,
            username: response.result
              ? "사용 가능한 아이디입니다."
              : "이미 사용 중인 아이디입니다.",
          }));
        }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          username: "아이디 중복 확인에 실패했습니다.",
        }));
      }
    };
  
    const handleNicknameValidation = async () => {
      try {
        const response = await checkNicknameAvailability(formData.nickname);
        if (response.isSuccess) {
          setIsNicknameAvailable(true);
          setErrors((prev) => ({
            ...prev,
            nickname: response.result
              ? "사용 가능한 닉네임입니다."
              : "이미 사용 중인 닉네임입니다.",
          }));
        }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          nickname: "닉네임 중복 확인에 실패했습니다.",
        }));
      }
    };
  
    const handleLocationChange = (location: string) => {
      setFormData({ ...formData, location });
    };
  
    const handleCategoryChange = (category: string) => {
      setFormData((prevState) => {
        const newCategories = prevState.studyCategories.includes(category)
          ? prevState.studyCategories.filter((c) => c !== category)
          : [...prevState.studyCategories, category];
  
        return { ...prevState, studyCategories: newCategories };
      });
    };
  
    const handleNotificationChange = () => {
      setFormData((prevState) => ({
        ...prevState,
        notificationEnabled: !prevState.notificationEnabled,
      }));
    };
  
    return {
      isUsernameAvailable,
      isNicknameAvailable,
      handleUsernameValidation,
      handleNicknameValidation,
      handleLocationChange,
      handleCategoryChange,
      handleNotificationChange,
    };
  };