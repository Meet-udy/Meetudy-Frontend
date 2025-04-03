import React, { useState } from "react";
import InputField from "../../components/ui/InputField.tsx";
import SignUpButton from "../../components/auth/SignUpButton.tsx";
import VerifyButton from "../../components/ui/VerifyButton.tsx";
import SelectableButton from "../../components/ui/SelectableButton.tsx";
import Checkbox from "../../components/ui/Checkbox.tsx";
import Modal from "../../components/ui/Modal.tsx";
import { signUp, sendVerificationEmail, verifyCode } from "../../api/authApi.ts"; 
import { validateEmail, validateUsername, validatePassword, validateConfirmPassword } from "../../utils/validators.ts";
import { locationMapping } from "../../constants/locationMapping.ts";
import { categoryMapping } from "../../constants/categoryMapping.ts";
import { useSignUpPage } from "../../hooks/useSignUpPage.ts";
import { useModal } from "../../hooks/useModal.ts";
import "./SignUpPage.css";

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

const SignUpPage: React.FC = () => {
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
  const [verificationCode, setVerificationCode] = useState("")
  const { isModalOpen, setIsModalOpen, modalMessage, setModalMessage, handleCloseModal, handleGoHome, handleGoLogin } = useModal();

  const {
    isUsernameAvailable,
    isNicknameAvailable,
    handleUsernameValidation,
    handleNicknameValidation,
    handleLocationChange,
    handleCategoryChange,
    handleNotificationChange
  } = useSignUpPage(formData, setFormData, setErrors);
  
  const [emailStatusMessage, setEmailStatusMessage] = useState<{ type: "error" | "success" | null; message: string }>({ type: null, message: "" });
  const [codeStatusMessage, setCodeStatusMessage] = useState<{ type: "error" | "success" | null; message: string }>({ type: null, message: "" });
  const [isEmailVerified, setIsEmailVerified] = useState(false);

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

  const handleSignup = async () => {
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
      const response = await signUp(formData);  
      if (response.isSuccess) {
        setModalMessage("회원가입이 완료되었습니다.");
        setIsModalOpen(true);
      } else {
        setErrors({ general: response.message });
      }
    } catch (error) {
      setErrors({ general: "회원가입에 실패했습니다." });
    }
  };

  const handleEmailVerification = async () => {
    try {
      const response = await sendVerificationEmail(formData.email);
      if (response.isSuccess) {
        setEmailStatusMessage({ type: "success", message: "이메일이 전송되었습니다." });
      }
    } catch (error) {
      setEmailStatusMessage({ type: "error", message: "이메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." });
    }
  };

  const handleVerificationCodeValidation = async () => {
    try {
      const response = await verifyCode(formData.email, verificationCode);
      if (response.isSuccess) {
        setIsEmailVerified(true);
        setErrors((prev) => ({
          ...prev,
          verificationCode: "",
        }));
        setCodeStatusMessage({ type: "success", message: "이메일 인증에 성공했습니다." }); 
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: "인증 번호가 올바르지 않습니다.",
      }));
      setCodeStatusMessage({ type: "error", message: "인증 번호가 올바르지 않습니다." }); 
    }
  };

  const validateFields = (data: any) => {
    let errors: any = {};
    if (!data.email) errors.email = "이메일을 입력해주세요.";
    if (!data.username) errors.username = "아이디를 입력해주세요.";
    if (!data.password) errors.password = "비밀번호를 입력해주세요.";
    if (!data.confirmPassword) errors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    if (!data.nickname) errors.nickname = "닉네임을 입력해주세요.";
    if (!data.major) errors.major = "전공을 입력해주세요.";
    if (!data.location) errors.location = "선호하는 스터디 지역을 선택해주세요.";
    if (!data.studyCategories || data.studyCategories.length === 0) errors.studyCategories = "관심 있는 스터디 카테고리를 선택해주세요.";
    return errors;
  };

  const validateVerification = (data: any) => {
    let errors: any = {};
    if (!isEmailVerified) errors.email = "이메일 인증이 필요합니다.";
    if (!isUsernameAvailable) errors.username = "아이디 중복 확인이 필요합니다.";
    if (!isNicknameAvailable) errors.nickname = "닉네임 중복 확인이 필요합니다.";
    return errors;
  };
  
  return (
    <div className="signup-page">
      <h1 className="signup-title">MEETUDY 회원가입</h1>

      <div className="form-group">
        <label htmlFor="email" className="required">이메일</label>
        <div className="input-with-button">
          <InputField
            type="email"
            name="email"
            placeholder="이메일을 입력하세요."
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "error" : ""}
          />
          <VerifyButton onClick={handleEmailVerification}>이메일 인증</VerifyButton>
        </div>
        {emailStatusMessage.message && <p className={`message ${emailStatusMessage.type}`}>{emailStatusMessage.message}</p>}
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="verificationCode" className="required">인증 번호</label>
          <div className="input-with-button">
            <InputField
              type="text"
              name="verificationCode"
              placeholder="인증 번호를 입력하세요."
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className={errors.verificationCode ? "error" : ""}
            />
            <VerifyButton onClick={handleVerificationCodeValidation}>인증 번호 확인</VerifyButton>
          </div>
          {codeStatusMessage.message && <p className={`message ${codeStatusMessage.type}`}>{codeStatusMessage.message}</p>}
          {errors.verificationCode && <p className="error-message">{errors.verificationCode}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="username" className="required">아이디</label>
        <div className="input-with-button">
          <InputField
            type="text"
            name="username"
            placeholder="아이디를 입력하세요."
            value={formData.username}
            onChange={handleInputChange}
            className={errors.username ? "error" : ""}
          />
          <VerifyButton onClick={handleUsernameValidation}>중복 확인</VerifyButton>
        </div>
        {errors.username && (
            <p className={`message ${isUsernameAvailable ? "success" : "error error-message"}`}>
              {errors.username}
            </p>
          )}
      </div>

      <div className="form-group">
        <label htmlFor="password" className="required">비밀번호</label>
        <InputField
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요."
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword" className="required">비밀번호 확인</label>
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인을 입력하세요."
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
      </div>

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

      <SignUpButton onClick={handleSignup} text="회원가입" className="signup-button" />
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

export default SignUpPage;