import React, { useEffect, useState } from "react";
import StudyGroupSidebar from "../../components/layout/StudyGroupSidebar.tsx";
import StudyGroupDetailModal from "../../components/studyGroup/StudyGroupDetailModal.tsx";
import StudyGroupMemberModal from "../../components/studyGroup/StudyMemberModal.tsx";
import { Header } from "../../components/layout/Header.tsx";
import { getCreatedStudyGroups, getStudyGroupById, closeRecruitment } from "../../api/studyGroupApi.ts";
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

export const LeaderStudyGroupPage: React.FC = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroupDto[]>([]);
  const { isModalOpen, setIsModalOpen, handleCloseModal } = useModal();
  const [selectedGroup, setSelectedGroup] = useState<StudyGroupDetail | null>(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false); 
  const [selectedGroupIdForMember, setSelectedGroupIdForMember] = useState<number | null>(null); 
  const [closedGroups, setClosedGroups] = useState<number[]>([]);
  const [errors, setErrors] = useState<any>({});

  const accessToken: string | null = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchStudyGroups = async () => {
      if (!accessToken) {
        setErrors({ general: "사용자 토큰이 필요합니다." });
        return;
      }

      try {
        const createdGroups = await getCreatedStudyGroups(accessToken);
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

  const handleMemberClick = (groupId: number) => {
    setSelectedGroupIdForMember(groupId);
    setMemberModalOpen(true);
  };

  const handleCloseRecruitment = async (groupId: number) => {
    if (!accessToken) return;
  
    try {
      await closeRecruitment(accessToken, groupId);
      setClosedGroups((prev) => [...prev, groupId]);
    } catch (error) {
      alert("인원 모집 종료에 실패했습니다.");
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
                <button
                  className="study-group-btn"
                  onClick={() => group.id != null && handleMemberClick(group.id)} 
                >
                  멤버 관리
                </button>
                {typeof group.id === 'number' && !closedGroups.includes(group.id) && (
                  <button
                    className="study-group-btn"
                    onClick={() => handleCloseRecruitment(group.id as number)}
                  >
                    인원 모집 완료
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedGroup && (
        <StudyGroupDetailModal 
          studyGroup={selectedGroup}
          onClose={handleCloseModal}
          sourcePage="LeaderStudyGroupPage"
        />
      )}

      {memberModalOpen && selectedGroupIdForMember !== null && accessToken && (
        <StudyGroupMemberModal
          groupId={selectedGroupIdForMember}
          accessToken={accessToken}
          onClose={() => {
            setMemberModalOpen(false);
            setSelectedGroupIdForMember(null);
          }}
        />
      )}
    </div>
  );
};

export default LeaderStudyGroupPage;