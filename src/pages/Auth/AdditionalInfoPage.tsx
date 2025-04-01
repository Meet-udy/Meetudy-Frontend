import React, { useState } from "react";
import InputField from "../../components/ui/InputField.tsx";
import SignUpButton from "../../components/auth/SignUpButton.tsx";
import VerifyButton from "../../components/ui/VerifyButton.tsx";
import SelectableButton from "../../components/ui/SelectableButton.tsx";
import Checkbox from "../../components/ui/Checkbox.tsx";
import Modal from "../../components/ui/Modal.tsx";
import { updateAdditionalInfo } from "../../api/authApi.ts"; 
import { locationMapping } from "../../constants/locationMapping.ts";
import { categoryMapping } from "../../constants/categoryMapping.ts";
import { useSignUpPage } from "../../hooks/useSignUpPage.ts";
import { useModal } from "../../hooks/useModal.ts";
import "./SignUpPage.css";

interface AdditionalInfoFormData {
  nickname: string;
  major: string;
  introduction: string;
  isOnline: boolean;
  notificationEnabled: boolean;
  location: string;
  studyCategories: string[];
}

const AdditionalInfoPage: React.FC = () => {
  const [formData, setFormData] = useState<AdditionalInfoFormData>({
    nickname: "",
    major: "",
    introduction: "",
    isOnline: false,
    notificationEnabled: true,
    location: "",
    studyCategories: []
  });

  const [errors, setErrors] = useState<any>({});
  const { isModalOpen, setIsModalOpen, modalMessage, setModalMessage, handleCloseModal, handleGoHome, handleGoLogin } = useModal();

  const {
    isNicknameAvailable,
    handleNicknameValidation,
    handleLocationChange,
    handleCategoryChange,
    handleNotificationChange
  } = useSignUpPage(formData, setFormData, setErrors);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
  
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

  const handleAdditionalInfoSubmit = async () => {
    const fieldErrors = validateFields(formData);
    const verificationErrors = validateVerification(formData);

    if (Object.keys(fieldErrors).length > 0) {
      setErrors((prev: any) => ({ ...prev, ...fieldErrors }));
      return;
    }
  
    if (Object.keys(verificationErrors).length > 0) {
      setErrors((prev: any) => ({ ...prev, ...verificationErrors }));
      return;
    }

    setErrors({});

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setErrors({ general: "로그인 정보가 없습니다." });
        return;
      }

      const response = await updateAdditionalInfo(formData,accessToken);  
      if (response.isSuccess) {
        setModalMessage("추가 정보 입력이 완료되었습니다.");
        setIsModalOpen(true);
      } else {
        setErrors({ general: response.message });
      }
    } catch (error) {
      setErrors({ general: "추가 정보 입력 중 오류가 발생했습니다." });
    }
  };

  const validateFields = (data: any) => {
    let errors: any = {};
    if (!data.nickname) errors.nickname = "닉네임을 입력해주세요.";
    if (!data.major) errors.major = "전공을 입력해주세요.";
    if (!data.location) errors.location = "선호하는 스터디 지역을 선택해주세요.";
    if (!data.studyCategories || data.studyCategories.length === 0) errors.studyCategories = "관심 있는 스터디 카테고리를 선택해주세요.";
    return errors;
  };

  const validateVerification = (data: any) => {
    let errors: any = {};
    if (!isNicknameAvailable) errors.nickname = "닉네임 중복 확인이 필요합니다.";
    return errors;
  };
  
  return (
    <div className="signup-page">
      <h1 className="signup-title">MEETUDY 회원가입</h1>

      <div className="form-group">
        <label htmlFor="nickname" className="required">닉네임</label>
        <div className="input-with-button">
          <InputField
            type="text"
            name="nickname"
            placeholder="닉네임을 입력하세요."
            value={formData.nickname}
            onChange={handleInputChange}
          />
          <VerifyButton onClick={handleNicknameValidation}>중복 확인</VerifyButton>
          </div>
          {errors.nickname && (
            <p className={`message ${isNicknameAvailable ? "success" : "error error-message"}`}>
              {errors.nickname}
            </p>
          )}
        </div>

      <div className="form-group">
        <label htmlFor="major" className="required">전공</label>
        <InputField
          type="text"
          name="major"
          placeholder="전공을 입력하세요."
          value={formData.major}
          onChange={handleInputChange}
        />
        {errors.major && <p className="error-message">{errors.major}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="introduction">자기소개</label>
        <InputField
          type="text"
          name="introduction"
          placeholder="자기소개를 입력하세요."
          value={formData.introduction || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label className="required">선호하는 스터디 지역</label>
        <div className="location-buttons">
          {Object.keys(locationMapping).map(location => (
            <SelectableButton
            key={location}
            label={locationMapping[location]}
            isSelected={formData.location === location}
            onClick={() => handleLocationChange(location)}
          />
        ))}
      </div>
        {errors.location && <p className="error-message">{errors.location}</p>}
      </div>

      <div className="form-group">
        <label className="required">관심 있는 스터디 카테고리</label>
        <div className="category-buttons">
          {Object.keys(categoryMapping).map(category => (
            <SelectableButton
            key={category}
            label={categoryMapping[category]}
            isSelected={formData.studyCategories.includes(category)}
            onClick={() => handleCategoryChange(category)}
            disabled={formData.studyCategories.length >= 5 && !formData.studyCategories.includes(category)}
          />
        ))}
      </div>
        {errors.studyCategories && <p className="error-message">{errors.studyCategories}</p>}
      </div>

      <div className="notification-container">
        <div className="notification-box">
          <span className="notification-text">알림 수신 동의</span>
          <p className="notification-description">
            스터디 활동 중 발생하는 다양한 알림을 제공해 드립니다.
          </p>
          <Checkbox
            checked={formData.notificationEnabled}
            onChange={handleNotificationChange}
            label="푸시 알림 수신 동의 (선택)"
          />
        </div>
      </div>

      <SignUpButton onClick={handleAdditionalInfoSubmit} text="회원가입" className="signup-button" />
      {errors.general && <p className="error-message">{errors.general}</p>}
    
      {isModalOpen && (
        <Modal
          message={modalMessage}
          onClose={handleCloseModal}
          onConfirmHome={handleGoHome}
          onConfirmLogin={handleGoLogin}
          type="signup"
        />
      )}
    </div>
  );
};

export default AdditionalInfoPage;