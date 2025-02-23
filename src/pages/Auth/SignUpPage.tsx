import React, { useState } from "react";
import InputField from "../../components/ui/InputField.tsx";
import SignUpButton from "../../components/auth/SignUpButton.tsx";
import useSignUpForm from "../../hooks/useSignUpForm.ts";
import { signUp, sendVerificationEmail, verifyCode, checkUsernameAvailability, checkNicknameAvailability } from "../../api/auth.ts"; 
import { locationMapping } from "../../constants/locationMapping.ts";
import { categoryMapping } from "../../constants/categoryMapping.ts";
import "./SignUpPage.css";

const SignUpPage: React.FC = () => {
  const { formData, errors, handleInputChange, setErrors, setFormData } = useSignUpForm();
  
  const [emailStatusMessage, setEmailStatusMessage] = useState<{ type: "error" | "success" | null; message: string }>({ type: null, message: "" });
  const [codeStatusMessage, setCodeStatusMessage] = useState<{ type: "error" | "success" | null; message: string }>({ type: null, message: "" });

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

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
        alert("회원가입이 완료되었습니다.");
      } else {
        setErrors({ general: response.message });
      }
    } catch (error) {
      setErrors({ general: "회원가입 중 오류가 발생했습니다." });
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
      const response = await verifyCode(formData.email, formData.verificationCode);
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
        username: "아이디 중복 확인에 실패했습니다."
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
            : "이미 사용 중인 닉네임입니다."
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        nickname: "닉네임 중복 확인에 실패했습니다."
      }));
    }
  };
  
  const handleLocationChange = (location: string) => {
    setFormData({ ...formData, location });
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prevState => {
      const newCategories = prevState.studyCategories.includes(category)
        ? prevState.studyCategories.filter(c => c !== category)
        : [...prevState.studyCategories, category];

      return { ...prevState, studyCategories: newCategories };
    });
  };
  
  const handleNotificationChange = () => {
    setFormData(prevState => ({
      ...prevState,
      notificationEnabled: !prevState.notificationEnabled
    }));
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
          <button className="verify-button" onClick={handleEmailVerification}>이메일 인증</button>
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
              value={formData.verificationCode}
              onChange={handleInputChange}
              className={errors.verificationCode ? "error" : ""}
            />
            <button className="verify-button" onClick={handleVerificationCodeValidation}>인증 번호 확인</button>
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
          <button className="verify-button" onClick={handleUsernameValidation}>중복 확인</button>
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
          <button className="verify-button" onClick={handleNicknameValidation}>중복 확인</button>
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
            <button
              key={location}
              className={`location-button ${formData.location === location ? "selected" : ""}`}
              onClick={() => handleLocationChange(location)}
            >
              {locationMapping[location]} 
            </button>
          ))}
        </div>
        {errors.location && <p className="error-message">{errors.location}</p>}
      </div>

      <div className="form-group">
        <label className="required">관심 있는 스터디 카테고리</label>
        <div className="category-buttons">
          {Object.keys(categoryMapping).map(category => (
            <button
              key={category}
              className={`category-button ${formData.studyCategories.includes(category) ? "selected" : ""}`}
              onClick={() => handleCategoryChange(category)}
              disabled={formData.studyCategories.length >= 5 && !formData.studyCategories.includes(category)}
            >
              {categoryMapping[category]} 
            </button>
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
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={formData.notificationEnabled}
              onChange={handleNotificationChange}
              className="notification-checkbox"
            />
            <label className="checkbox-label">푸시 알림 수신 동의 (선택)</label>
          </div>
        </div>
      </div>

      <SignUpButton onClick={handleSignup} text="회원가입" />
      {errors.general && <p className="error-message">{errors.general}</p>}
    </div>
  );
};

export default SignUpPage;