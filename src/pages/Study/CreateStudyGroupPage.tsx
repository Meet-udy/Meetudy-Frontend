import React, { useState } from "react";
import InputField from "../../components/ui/InputField.tsx";
import SelectableButton from "../../components/ui/SelectableButton.tsx";
import Slider from "../../components/studyGroup/Slider.tsx";
import DatePicker from "../../components/studyGroup/DatePicker.tsx";
import Modal from "../../components/ui/Modal.tsx";
import { createStudyGroup, StudyGroupDto } from "../../api/studyGroupApi.ts"; 
import { studyCategoryMapping } from "../../constants/studyCategoryMapping.ts";
import { locationMapping } from "../../constants/locationMapping.ts";
import { useModal } from "../../hooks/useModal.ts";
import './CreateStudyGroupPage.css';

const CreateStudyGroupPage = () => {
  const [formData, setFormData] = useState<StudyGroupDto>({
    category: "",
    name: "",
    description: "",
    duration: "",
    location: "",
    maxParticipants: 5,
    isOnline: false,
  });

  const [errors, setErrors] = useState<any>({});
  const { isModalOpen, setIsModalOpen, modalMessage, setModalMessage, handleCloseModal, handleGoHome, handleGoLogin, handleGoStudyGroup } = useModal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    setFormData({ ...formData, category });
  };

  const handleLocationChange = (location: string) => {
    setFormData({ ...formData, location });
  };

  const handleMaxParticipantsChange = (value: number) => {
    setFormData({ ...formData, maxParticipants: value });
  };

  const handleDateChange = (start: string, end: string) => {
    setFormData({ ...formData, duration: `${start} ~ ${end}` });
  };

  const handleCreateStudyGroup = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setErrors({ general: "로그인이 필요합니다." });
      return;
    }

    try {
      const response = await createStudyGroup(accessToken, formData); 
      if (response.isSuccess) {
        setModalMessage("스터디 그룹 생성이 완료되었습니다.");
        setIsModalOpen(true);
        setFormData({
          category: "",
          name: "",
          description: "",
          duration: "",
          location: "",
          maxParticipants: 5,
          isOnline: false,
        });
      } else {
        setErrors({ general: response.message || "스터디 그룹 생성에 실패했습니다." });
      }
    } catch (error) {
      setErrors({ general: "스터디 그룹 생성에 실패했습니다." });
    }
  };

  return (
    <div className="createStudyGroupPage">
      <h1 className="title">스터디 그룹 생성</h1>

      {errors.general && <p className="error">{errors.general}</p>}

      <div className="formGroup">
        <label className="label">진행 방식</label>
        <div className="buttonGroup">
          <SelectableButton
            label="온라인"
            isSelected={formData.isOnline}
            onClick={() => setFormData({ ...formData, isOnline: true })}
          />
          <SelectableButton
            label="오프라인"
            isSelected={!formData.isOnline}
            onClick={() => setFormData({ ...formData, isOnline: false })}
          />
        </div>
      </div>

      <div className="formGroup">
        <label className="label">스터디 진행 장소</label>
        <div className="buttonGroup">
          {Object.entries(locationMapping).map(([key, label]) => (
            <SelectableButton
              key={key}
              label={label}
              isSelected={formData.location === key}
              onClick={() => handleLocationChange(key)}
            />
          ))}
        </div>
      </div>

      <div className="formGroup">
        <label className="label">스터디 카테고리</label>
        <div className="buttonGroup">
          {Object.entries(studyCategoryMapping).map(([key, label]) => (
            <SelectableButton
              key={key}
              label={label}
              isSelected={formData.category === key}
              onClick={() => handleCategoryChange(key)}
            />
          ))}
        </div>
      </div>

      <div className="formGroup">
        <label className="label">스터디 이름</label>
        <InputField
          type="text"
          name="name"
          placeholder="스터디 이름을 입력하세요"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="formGroup">
        <label className="label">스터디에 대한 설명</label>
        <InputField
          type="text"
          name="description"
          placeholder="스터디 설명을 입력하세요"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="formGroup">
        <label className="label">진행 기간</label>
        <DatePicker onDateChange={handleDateChange} />
      </div>

      <div className="formGroup">
        <label className="label">최대 참여자 수</label>
        <Slider min={1} max={20} value={formData.maxParticipants} onChange={handleMaxParticipantsChange} />
      </div>

      <button className="submitButton" onClick={handleCreateStudyGroup}>
        스터디 그룹 생성
      </button>

      {isModalOpen && (
        <Modal
          message={modalMessage}
          onClose={handleCloseModal}
          onConfirmHome={handleGoHome}
          onConfirmStudyGroup={handleGoStudyGroup}
          type="studyGroup"
        />
      )}
    </div>
  );
};

export default CreateStudyGroupPage;