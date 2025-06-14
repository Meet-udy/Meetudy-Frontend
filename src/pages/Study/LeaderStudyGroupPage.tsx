import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import StudyGroupSidebar from "../../components/layout/StudyGroupSidebar.tsx";
import StudyGroupDetailModal from "../../components/studyGroup/StudyGroupDetailModal.tsx";
import StudyGroupMemberModal from "../../components/studyGroup/StudyMemberModal.tsx";
import { Header } from "../../components/layout/Header.tsx";
import { getAllStudyGroupsWithStatus, getStudyGroupById, closeRecruitment } from "../../api/studyGroupApi.ts";
import { StudyGroupDto } from "../../api/studyGroupApi.ts";
import { createGroupChatRoom } from "../../api/chatApi.ts";
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
  const [error, setError] = useState<string | null>(null);
  const [createdChatRooms, setCreatedChatRooms] = useState<number[]>([]);

  const accessToken: string | null = localStorage.getItem("accessToken");

  useEffect(() => {
    const storedChatRooms = JSON.parse(localStorage.getItem("createdChatRooms") || "[]");
    if (Array.isArray(storedChatRooms)) {
      setCreatedChatRooms(storedChatRooms);
    }

    const fetchStudyGroups = async () => {
      if (!accessToken) {
        setError("사용자 토큰이 필요합니다.");
        return;
      }

      try {
        const allGroups = await getAllStudyGroupsWithStatus(accessToken);
        const leaderGroups = allGroups.filter(group => group.myRole === "LEADER");
        setStudyGroups(leaderGroups);
      } catch (error) {
        setError("스터디 그룹을 조회할 수 없습니다.");
      }
    };

    fetchStudyGroups();
  }, [accessToken]);

  const handleInfoClick = async (groupId: number) => {
    if (groupId === null || groupId === undefined) {
      setError("잘못된 그룹 ID입니다.");
      return;
    }

    try {
      const groupDetail = await getStudyGroupById(groupId);
      setSelectedGroup(groupDetail);
      setIsModalOpen(true);
    } catch (error) {
      setError("스터디 그룹 상세 정보를 불러오는 데 실패했습니다.");
    }
  };

  const handleMemberClick = (groupId: number) => {
    setSelectedGroupIdForMember(groupId);
    setMemberModalOpen(true);
  };

  const handleCloseRecruitment = async (groupId: number) => {
    if (!accessToken) return;
  
    try {
      const updatedGroup = await closeRecruitment(accessToken, groupId);
      setStudyGroups(prev =>
        prev.map(group => (group.id === groupId ? updatedGroup : group))
      );
    } catch (error) {
      alert("인원 모집 종료에 실패했습니다.");
    }
  };

  const handleCreateChatRoom = async (groupId: number) => {
    if (typeof groupId !== "number") {
      setError("잘못된 그룹 ID입니다.");
      return;
    }

    if (!accessToken) {
      alert("로그인 후 채팅방을 생성할 수 있습니다.");
      return;
    }

    try {
      const result = await createGroupChatRoom(accessToken, groupId);
      
      setCreatedChatRooms(prev => {
        const updated = [...prev, groupId];
        localStorage.setItem("createdChatRooms", JSON.stringify(updated));
        return updated;
      });
  
      alert("채팅방이 생성되었습니다.");
    } catch (error: any) {
      if (error.response?.data?.code === "CHAT502") {
        alert("그룹 멤버가 1명 이상 존재해야 채팅방을 생성할 수 있습니다.");
      } else {
        alert("채팅방이 이미 생성되어 있습니다.");
      }
    }
  };

  return (
    <div className="study-group-page">
      <Header />
      <hr className="top-divider" />
      <div className="study-group-content">
        <StudyGroupSidebar />
        <div className="study-group-list">
          {studyGroups.map((group) => (
            <div key={group.name} className="study-group-card">
              <button 
                className="info-btn" 
                onClick={() => group.id != null && handleInfoClick(group.id)}
              >
                <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#666" }} />
              </button>
              <h3>{group.name}</h3>
              <img 
                src="/images/dummy_image.jpg" 
                alt="Study Group" 
                className="study-group-image" 
              />
              <div className="study-group-actions">
                {group.id != null && !createdChatRooms.includes(group.id) && (
                  <button 
                  className="study-group-btn" 
                  onClick={() => group.id != null && handleCreateChatRoom(group.id)}
                >
                  그룹 채팅방 생성
                </button>                
                )}
                <button
                  className="study-group-btn"
                  onClick={() => group.id != null && handleMemberClick(group.id)} 
                >
                  멤버 관리
                </button>
                {group.id != null && group.isRecruiting && (
                  <button
                    className="study-group-btn"
                    onClick={() => handleCloseRecruitment(group.id!)}
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