import React, { useState } from "react";
import styled from "styled-components";
import { MemberDto, MemberUpdateDto, updateMemberProfile, getMemberProfile } from "../../api/myPageApi.ts";
import { locationMapping } from "../../constants/locationMapping.ts";
import SelectableButton from "../ui/SelectableButton.tsx";

interface Props {
  profile: MemberDto;
  onClose: () => void;
  onSaveSuccess: (updated: MemberDto) => void;
}

const EditProfileModal: React.FC<Props> = ({ profile, onClose, onSaveSuccess }) => {
  const [form, setForm] = useState<MemberUpdateDto>({
    nickname: profile.nickname,
    major: profile.major,
    introduction: profile.introduction,
    location: profile.location,
    notificationEnabled: profile.notificationEnabled,
  });

  const accessToken = localStorage.getItem("accessToken") || "";

  const handleChange = (field: keyof MemberUpdateDto, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRadioChange = (value: boolean) => {
    setForm((prev) => ({
      ...prev,
      notificationEnabled: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateMemberProfile(accessToken, form);
      const updated = await getMemberProfile(accessToken);
      onSaveSuccess(updated);
    } catch {
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose} aria-label="Close modal">×</CloseButton>

        <h2>회원정보 수정</h2>

        <label>닉네임</label>
        <ScrollableInput
          value={form.nickname || ""}
          onChange={(e) => handleChange("nickname", e.target.value)}
          rows={1}
        />

        <label>전공</label>
        <ScrollableInput
          value={form.major || ""}
          onChange={(e) => handleChange("major", e.target.value)}
          rows={1}
        />

        <label>소개</label>
        <ScrollableTextarea
          value={form.introduction || ""}
          onChange={(e) => handleChange("introduction", e.target.value)}
        />

        <label>스터디 지역</label>
        <LocationContainer>
          {Object.keys(locationMapping).map((code) => (
            <SelectableButton
              key={code}
              label={locationMapping[code]}
              isSelected={form.location === code}
              onClick={() => handleChange("location", code)}
            />
          ))}
        </LocationContainer>

        <label>푸시 알림 수신 여부</label>
        <NotificationContainer>
          <label>
            <input
              type="radio"
              name="notification"
              checked={form.notificationEnabled === true}
              onChange={() => handleRadioChange(true)}
            />
            Y
          </label>
          <label>
            <input
              type="radio"
              name="notification"
              checked={form.notificationEnabled === false}
              onChange={() => handleRadioChange(false)}
            />
            N
          </label>
        </NotificationContainer>

        <ButtonGroup>
          <button className="save-btn" onClick={handleSubmit}>저장</button>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
};

export default EditProfileModal;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  label {
    color: #555;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #555;
  cursor: pointer;
  line-height: 1;
  user-select: none;
  padding: 0;

  &:hover {
    color: #000;
  }
`;

const ScrollableInput = styled.textarea`
  resize: vertical;
  overflow-y: auto;
  max-height: 60px;
  min-height: 30px;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
`;

const ScrollableTextarea = styled.textarea`
  resize: vertical;
  overflow-y: auto;
  max-height: 120px;
  min-height: 60px;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;

  .save-btn {
    background-color: #555;
    color: white;
    padding: 8px 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
    user-select: none;

    &:hover {
      background-color: #333;
    }
  }
`;

const LocationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
`;

const NotificationContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
  }

  input[type="radio"] {
    width: 16px;
    height: 16px;
  }
`;