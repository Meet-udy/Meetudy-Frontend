import React, { useEffect, useState } from "react";
import StudyGroupSidebar from "../../components/layout/StudyGroupSidebar.tsx";
import { Header } from "../../components/layout/Header.tsx";
import { getSortedStudyGroups } from "../../api/studyGroupApi.ts";
import { StudyGroupDto } from "../../api/studyGroupApi.ts";
import './StudyGroupPage.css';

export const StudyGroupPage: React.FC = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroupDto[]>([]);
  const [sortBy, setSortBy] = useState<string>("LATEST");

  const accessToken: string | null = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchStudyGroups = async () => {
      if (!accessToken) {
        console.error("사용자 토큰이 필요합니다.");
        return;
      }

      try {
        const sortedGroups = await getSortedStudyGroups(accessToken, sortBy);
        setStudyGroups(sortedGroups);
      } catch (error) {
        console.error("스터디 그룹을 조회할 수 없습니다.", error);
      }
    };

    fetchStudyGroups();
  }, [accessToken, sortBy]);

  return (
    <div className="study-group-page">
      <Header />
      <div className="study-group-content">
        <StudyGroupSidebar />
        <div className="study-group-list">
          {studyGroups.map((group) => (
            <div key={group.name} className="study-group-card">
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
    </div>
  );
};

export default StudyGroupPage;