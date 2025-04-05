import React, { useEffect, useState } from "react";
import StudyGroupSidebar from "../../components/layout/StudyGroupSidebar.tsx";
import { Header } from "../../components/layout/Header.tsx";
import StudyGroupDetailModal from "../../components/studyGroup/StudyGroupDetailModal.tsx";
import SortDropdown, { SortType } from "../../components/studyGroup/SortDroupdown.tsx";
import { getSortedStudyGroups, getStudyGroupById, requestJoinGroup } from "../../api/studyGroupApi.ts";
import { StudyGroupDto } from "../../api/studyGroupApi.ts";
import { useModal } from "../../hooks/useModal.ts";
import './StudyGroupPage.css';

interface StudyGroupDetail {
  id?: number | null;
  category: string;
  name: string;
  description: string;
  duration: string;
  isOnline: boolean;
  location: string;
  maxParticipants: number;
}

export const StudyGroupPage: React.FC = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroupDto[]>([]);
  const [sortBy, setSortBy] = useState<SortType>("LATEST");
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
        const sortedGroups = await getSortedStudyGroups(accessToken, sortBy);
        setStudyGroups(sortedGroups);
      } catch (error) {
        setErrors({ general: "스터디 그룹을 조회할 수 없습니다." });
      }
    };

    fetchStudyGroups();
  }, [accessToken, sortBy]);

  const handleCardClick = async (groupId: number) => {
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

  const handleJoinGroup = async (groupId: number) => {
    if (!accessToken) {
      setErrors({ general: "사용자 토큰이 필요합니다." });
      return;
    }

    try {
      const response = await requestJoinGroup(accessToken, groupId);
      alert("가입 요청이 성공적으로 전송되었습니다.");
      handleCloseModal(); 
    } catch (error) {
      setErrors({ general: "스터디 그룹 가입 요청에 실패했습니다." });
    }
  };

  return (
    <div className="study-group-page">
      <Header />
      <div className="study-group-content">
        <StudyGroupSidebar />
        <div className="sort-dropdown-container">
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        <div className="study-group-list">
          {studyGroups.map((group) => (
            <div
              key={group.name}
              className="study-group-card"
              onClick={() => {
                if (group.id != null) {  
                  handleCardClick(group.id);
                }
              }}
            >
              <h3>{group.name}</h3>
              <img 
                src="/images/dummy_image.jpg" 
                alt="Study Group" 
                className="study-group-image" 
              />
              <div className="study-group-tags">
                <span className="tag">#{group.category}</span>
                <span className="tag">#{group.duration}</span>
                <span className="tag">#{group.isOnline ? "온라인" : "오프라인"}</span>
                <span className="tag">#{group.location}</span>
          </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedGroup && selectedGroup.id != null && (
        <StudyGroupDetailModal 
          studyGroup={selectedGroup}
          groupId={selectedGroup.id}
          onJoin={handleJoinGroup}
          onClose={handleCloseModal}
        />
      )}

    </div>
  );
};

export default StudyGroupPage;