import React, { useState } from "react";
import InputField from "../../components/ui/InputField.tsx";
import SignUpButton from "../../components/auth/SignUpButton.tsx";
import { signUp } from "../../api/auth.ts"; 
import "./SignUpPage.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernamePattern = /^[a-zA-Z0-9]{5,15}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,17}$/;

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

const locationMapping: { [key: string]: string } = {
  SEOUL: "서울",
  GYEONGGIDO: "경기도",
  GANGWONDO: "강원도",
  CHUNGCHEONGNAMDO: "충청남도",
  CHUNGCHEONGBUKDO: "충청북도",
  JEOLLANAMDO: "전라남도",
  JEOLLABUKDO: "전라북도",
  GYEONGSANGNAMDO: "경상남도",
  GYEONGSANGBUKDO: "경상북도",
  JEJU: "제주특별자치도",
  INCHEON: "인천광역시",
  DAEJEON: "대전광역시",
  DAEGU: "대구광역시",
  GWANGJU: "광주광역시",
  ULSAN: "울산광역시",
  BUSAN: "부산광역시",
  OTHERS: "기타"
};

const categoryMapping: { [key: string]: string } = {
  LANGUAGE: "어학",
  CERTIFICATION: "자격증",
  HUMANITIES: "인문학",
  SOCIAL_SCIENCES: "사회과학",
  DESIGN: "디자인",
  SCIENCE: "과학",
  PROGRAMMING: "프로그래밍",
  CAREER: "취업/커리어",
  QUALIFICATION_EXAM: "고시/공무원",
  HOBBY: "취미",
  OTHERS: "기타"
};

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    let error = "";
    switch (name) {
      case "email":
        if (!emailPattern.test(value)) error = "이메일 형식이 올바르지 않습니다.";
        break;
      case "username":
        if (!usernamePattern.test(value)) error = "아이디는 5~15자, 영문과 숫자만 가능합니다.";
        break;
      case "password":
        if (!passwordPattern.test(value)) error = "비밀번호는 8~17자, 대소문자, 숫자, 특수문자가 포함되어야 합니다.";
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "비밀번호가 일치하지 않습니다.";
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
    console.log("회원가입 데이터:", formData);
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

  const handleEmailValidation = () => {
    // 이메일 인증 처리
  };

  const handleUsernameValidation = () => {
    // 중복 확인 처리
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
          <button className="verify-button" onClick={handleEmailValidation}>이메일 인증</button>
        </div>
        {errors.email && <p className="error-message">{errors.email}</p>}
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
        {errors.username && <p className="error-message">{errors.username}</p>}
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
          <button className="verify-button">중복 확인</button>
        </div>
        {errors.nickname && <p className="error-message">{errors.nickname}</p>}
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