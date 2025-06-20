import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchByCategory, fetchByGroupName, StudyGroupDto } from "../../api/searchApi.ts";
import { getStudyGroupById } from "../../api/studyGroupApi.ts";
import StudyGroupDetailModal from "../../components/studyGroup/StudyGroupDetailModal.tsx";
import { Header } from "../../components/layout/Header.tsx";
import { useModal } from "../../hooks/useModal.ts";

import "../Study/StudyGroupPage.css"

export const SearchResultPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const value = queryParams.get("value");

  const [results, setResults] = useState<StudyGroupDto[] | null>(null);
  const [error, setError] = useState("");

  const { isModalOpen, setIsModalOpen, handleCloseModal } = useModal();
  const [selectedGroup, setSelectedGroup] = useState<StudyGroupDto | null>(null);
  const accessToken: string | null = localStorage.getItem("accessToken");

  useEffect(() => {
    const search = async () => {
      try {
        if (!type || !value) {
          setError("잘못된 요청입니다.");
          return;
        }

        if (type === "category") {
          const data = await fetchByCategory(value);
          setResults(data);
        } else if (type === "group") {
          const data = await fetchByGroupName(value);
          setResults([data]);
        } else {
          setError("알 수 없는 검색 유형입니다.");
        }
      } catch (err) {
        setError("검색 결과를 불러오는 데 실패했습니다.");
      }
    };

    search();
  }, [type, value]);

  const handleCardClick = async (groupId: number) => {
    if (!accessToken) {
      setError("사용자 토큰이 필요합니다.");
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

  return (
    <div className="study-group-page" style={{ padding: "20px" }}>
      <Header />
      <hr className="top-divider" />

      <h2 style={{ marginLeft: "100px", marginBottom: "-10px" }}>검색 결과</h2>
      {error && <div className="searchResultMessage">{error}</div>}
      {results && results.length > 0 && (
        <div className="study-group-list">
          {results.map((group) => (
            <div
              key={group.id}
              className="study-group-card"
              onClick={() => group.id && handleCardClick(group.id)}
              style={{ cursor: "pointer" }}
            >
              <h3>{group.name}</h3>
              <img
                src="/images/dummy_image.jpg"
                alt="Study Group"
                className="study-group-image"
              />
              <div className="study-group-tags">
                <span className="tag">#{group.category}</span>
                <span className="tag">#{group.duration ?? "기간 정보 없음"}</span>
                <span className="tag">#{group.isOnline ? "온라인" : "오프라인"}</span>
                <span className="tag">#{group.location ?? "장소 정보 없음"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedGroup && selectedGroup.id != null && (
        <StudyGroupDetailModal 
          studyGroup={selectedGroup}
          groupId={selectedGroup.id}
          onClose={handleCloseModal}
          sourcePage="StudyGroupSearchPage"
        />
      )}
    </div>
  );
};