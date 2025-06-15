import React from "react";
import { createStudyGroup, StudyGroupDto } from "../../api/studyGroupApi.ts";
import StudyGroupForm from "../../components/studyGroup/StudyGroupForm.tsx";
import Modal from "../../components/ui/Modal.tsx";
import { useModal } from "../../hooks/useModal.ts";
import useStudyGroupForm from "../../hooks/useStudyGroupForm.ts";

import "./CreateStudyGroupPage.css";

const CreateStudyGroupPage = () => {
  const initialFormData: StudyGroupDto = {
    category: "",
    name: "",
    description: "",
    duration: "",
    location: "",
    maxParticipants: 5,
    isOnline: false,
  };

  const {
    formData,
    setFormData,
    handleInputChange,
    handleCategoryChange,
    handleDateChange,
    handleLocationChange,
    handleMaxParticipantsChange,
  } = useStudyGroupForm(initialFormData);

  const [errors, setErrors] = React.useState<any>({});
  const {
    isModalOpen,
    setIsModalOpen,
    modalMessage,
    setModalMessage,
    handleCloseModal,
    handleGoHome,
    handleGoStudyGroup,
  } = useModal();

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
        setFormData(initialFormData);  
      } else {
        setErrors({ general: response.message || "스터디 그룹 생성에 실패했습니다." });
      }
    } catch (error) {
      setErrors({ general: "스터디 그룹 생성에 실패했습니다." });
    }
  };

  return (
    <>
      <h1 className="createStudyGroupPage-title">스터디 그룹 생성</h1>
      <StudyGroupForm
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
        onCategoryChange={handleCategoryChange}
        onLocationChange={handleLocationChange}
        onMaxParticipantsChange={handleMaxParticipantsChange}
        onDateChange={handleDateChange}
        onSubmit={handleCreateStudyGroup}
        submitLabel="스터디 그룹 생성"
      />
      {isModalOpen && (
        <Modal
          message={modalMessage}
          onClose={handleCloseModal}
          onConfirmHome={handleGoHome}
          onConfirmStudyGroup={handleGoStudyGroup}
          type="studyGroup"
        />
      )}
    </>
  );
};

  export default CreateStudyGroupPage;