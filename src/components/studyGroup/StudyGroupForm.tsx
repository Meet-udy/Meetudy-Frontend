import React from "react";
import { StudyGroupDto } from "../../api/studyGroupApi";
import SelectableButton from "../ui/SelectableButton.tsx";
import InputField from "../ui/InputField.tsx";
import { locationMapping } from "../../constants/locationMapping.ts";
import { studyCategoryMapping } from "../../constants/studyCategoryMapping.ts";
import DatePicker from "./DatePicker.tsx";
import Slider from "./Slider.tsx";

interface StudyGroupFormProps {
  formData: StudyGroupDto;
  errors: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onMaxParticipantsChange: (value: number) => void;
  onDateChange: (start: string, end: string) => void;
  onSubmit: () => void;
  submitLabel: string;
}

const StudyGroupForm: React.FC<StudyGroupFormProps> = ({
  formData,
  errors,
  onInputChange,
  onCategoryChange,
  onLocationChange,
  onMaxParticipantsChange,
  onDateChange,
  onSubmit,
  submitLabel,
}) => {
  return (
    <div className="createStudyGroupPage">
      {errors.general && <p className="error">{errors.general}</p>}

      <div className="formGroup">
        <label className="label">진행 방식</label>
        <div className="buttonGroup">
          <SelectableButton
            label="온라인"
            isSelected={formData.isOnline}
            onClick={() => onLocationChange("online")}
          />
          <SelectableButton
            label="오프라인"
            isSelected={!formData.isOnline}
            onClick={() => onLocationChange("")}
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
              onClick={() => onLocationChange(key)}
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
              onClick={() => onCategoryChange(key)}
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
          onChange={onInputChange}
        />
      </div>

      <div className="formGroup">
        <label className="label">스터디 설명</label>
        <InputField
          type="text"
          name="description"
          placeholder="스터디 설명을 입력하세요"
          value={formData.description}
          onChange={onInputChange}
        />
      </div>

      <div className="formGroup">
        <label className="label">진행 기간</label>
        <DatePicker onDateChange={onDateChange} />
        <p className="infoText">현재 기간: {formData.duration}</p>
      </div>

      <div className="formGroup">
        <label className="label">최대 참여자 수</label>
        <Slider
          min={1}
          max={20}
          value={formData.maxParticipants}
          onChange={onMaxParticipantsChange}
        />
      </div>

      <button className="submitButton" onClick={onSubmit}>
        {submitLabel}
      </button>
    </div>
  );
};

export default StudyGroupForm;