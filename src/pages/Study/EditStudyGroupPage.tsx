import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudyGroupForm from "../../components/studyGroup/StudyGroupForm.tsx";
import { getStudyGroupById, updateGroupInfo, StudyGroupDto, StudyGroupUpdateDto } from "../../api/studyGroupApi.ts";
import Modal from "../../components/ui/Modal.tsx";
import useStudyGroupForm from "../../hooks/useStudyGroupForm.ts";
import { useModal } from "../../hooks/useModal.ts";
import { locationMapping } from "../../constants/locationMapping.ts";
import { studyCategoryMapping } from "../../constants/studyCategoryMapping.ts";

const EditStudyGroupPage = () => {
    const { groupId } = useParams();

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

  const [errors, setErrors] = useState<any>({});
  const { isModalOpen, setIsModalOpen, modalMessage, setModalMessage, handleCloseModal, handleGoHome, handleGoStudyGroup } = useModal();

  useEffect(() => {
    const fetchStudyGroup = async () => {
      try {
        if (!groupId) return;
        const data = await getStudyGroupById(Number(groupId));
        setFormData({
          ...data,
          isOnline: data.location === "online",
        });
      } catch (err) {
        setErrors({ general: "스터디 정보를 불러오지 못했습니다." });
      }
    };

    fetchStudyGroup();
  }, [groupId]);

  const findKeyByValue = (mapping: { [key: string]: string }, value: string): string | undefined => {
    return Object.entries(mapping).find(([key, val]) => val === value)?.[0];
  };

  const handleUpdateStudyGroup = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || !groupId) {
      setErrors({ general: "로그인이 필요합니다." });
      return;
    }

    const updateDto: StudyGroupUpdateDto = {
      name: formData.name,
      description: formData.description,
      maxParticipants: formData.maxParticipants,
      location: findKeyByValue(locationMapping, formData.location) ?? formData.location,
      category: findKeyByValue(studyCategoryMapping, formData.category) ?? formData.category,
    };

    try {
      const response = await updateGroupInfo(accessToken, Number(groupId), updateDto);
      if (response.isSuccess) {
        setModalMessage("스터디 그룹 정보가 성공적으로 수정되었습니다.");
        setIsModalOpen(true);
      } else {
        setErrors({ general: response.message || "수정에 실패했습니다." });
      }
    } catch (err) {
      setErrors({ general: "스터디 그룹 수정 중 오류가 발생했습니다." });
    }
  };

  return (
    <>
      <h1 className="createStudyGroupPage-title">스터디 그룹 수정</h1>
      <StudyGroupForm
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
        onCategoryChange={handleCategoryChange}
        onLocationChange={handleLocationChange}
        onMaxParticipantsChange={handleMaxParticipantsChange}
        onDateChange={handleDateChange}
        onSubmit={handleUpdateStudyGroup}
        submitLabel="수정 완료"
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

export default EditStudyGroupPage;