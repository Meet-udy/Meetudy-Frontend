import React, { useEffect, useState } from "react";
import StudyGroupSidebar from "../../components/layout/StudyGroupSidebar.tsx";
import StudyGroupDetailModal from "../../components/studyGroup/StudyGroupDetailModal.tsx";
import { Header } from "../../components/layout/Header.tsx";
import { getJoinedStudyGroups, getStudyGroupById } from "../../api/studyGroupApi.ts";
import { StudyGroupDto } from "../../api/studyGroupApi.ts";
import { useModal } from "../../hooks/useModal.ts";
import "./StudyGroupPage.css";

interface StudyGroupDetail {
  category: string;
  name: string;
  description: string;
  duration: string;
  isOnline: boolean;
  location: string;
  maxParticipants: number;
}

export const MemberStudyGroupPage: React.FC = () => {
    const [studyGroups, setStudyGroups] = useState<StudyGroupDto[]>([]);
    const { isModalOpen, setIsModalOpen, handleCloseModal } = useModal();
    const [selectedGroup, setSelectedGroup] = useState<StudyGroupDetail | null>(null);
    const [errors, setErrors] = useState<any>({});
  

  const accessToken: string | null = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchStudyGroups = async () => {
      if (!accessToken) {
        setErrors({ general: "사용자 토큰이 필요합니다." });
        return;
      }

      try {
        const createdGroups = await getJoinedStudyGroups(accessToken);
        setStudyGroups(createdGroups);
      } catch (error) {
        setErrors({ general: "스터디 그룹을 조회할 수 없습니다." });
      }
    };

    fetchStudyGroups();
  }, [accessToken]);

  const handleInfoClick = async (groupId: number) => {
    if (groupId === null || groupId === undefined) {
      setErrors({ general: "잘못된 그룹 ID입니다." });
      return;
    }

    try {
      const groupDetail = await getStudyGroupById(groupId);
      setSelectedGroup(groupDetail);
    setIsModalOpen(true);
    } catch (error) {
      setErrors({ general: "스터디 그룹 상세 정보를 불러오는 데 실패했습니다." });
    }
  };

  return (
    <div className="study-group-page">
      <Header />
      <div className="study-group-content">
        <StudyGroupSidebar />
        <div className="study-group-list">
          {studyGroups.map((group) => (
            <div key={group.name} className="study-group-card">
              <button className="info-btn" onClick={() => group.id != null && handleInfoClick(group.id)}>
                ℹ️
              </button>
              <h3>{group.name}</h3>
              <img 
                src="/images/dummy_image.jpg" 
                alt="Study Group" 
                className="study-group-image" 
              />
              <div className="study-group-actions">
                <button className="study-group-btn">그룹 채팅방</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedGroup && (
        <StudyGroupDetailModal 
          studyGroup={selectedGroup}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MemberStudyGroupPage;