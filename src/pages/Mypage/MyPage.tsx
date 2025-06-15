import React, { useEffect, useState } from "react";
import { getMemberProfile, MemberDto } from "../../api/myPageApi.ts";
import { getAllStudyGroupsWithStatus, StudyGroupDto } from "../../api/studyGroupApi.ts"; // 스터디 API
import { Header } from "../../components/layout/Header.tsx";
import { locationMapping } from "../../constants/locationMapping.ts";
import EditProfileModal from "../../components/myPage/EditProfileModal.tsx";

import "./MyPage.css";

const MyPage: React.FC = () => {
  const [profile, setProfile] = useState<MemberDto | null>(null);
  const [studyGroups, setStudyGroups] = useState<StudyGroupDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const accessToken = localStorage.getItem("accessToken") || "";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMemberProfile(accessToken);
        setProfile(data);
      } catch (err) {
        setError("프로필 정보를 불러오지 못했습니다.");
      }
    };
    fetchProfile();
  }, [accessToken]);

  useEffect(() => {
    const fetchStudyGroups = async () => {
      try {
        const groups = await getAllStudyGroupsWithStatus(accessToken);
        setStudyGroups(groups);
      } catch {
        setError("스터디 그룹 정보를 불러오지 못했습니다.");
      }
    };
    fetchStudyGroups();
  }, [accessToken]);

  const activeGroups = studyGroups.filter(
    (g) => g.myRole === "LEADER" || g.myRole === "MEMBER"
  );

  const requestedGroups = studyGroups.filter((g) => g.myRole === "REQUESTED");

  return (
    <>
      <Header />
      <hr className="top-divider" />

      <div className="mypage-container">
        <h2 className="section-title">마이페이지</h2>
        <hr className="section-divider" />

        {profile && (
          <>
            <h3 className="user-profile-title">사용자 프로필</h3>
            <div className="profile-section">
              <hr className="row-divider" />
              <div className="profile-row">
                <div className="profile-label">이메일</div>
                <div className="profile-value">{profile.email}</div>
              </div>
              <hr className="row-divider" />

              <div className="profile-row">
                <div className="profile-label">아이디</div>
                <div className="profile-value">{profile.username}</div>
              </div>
              <hr className="row-divider" />

              <div className="profile-row">
                <div className="profile-label">닉네임</div>
                <div className="profile-value">{profile.nickname}</div>
              </div>
              <hr className="row-divider" />

              <div className="profile-row">
                <div className="profile-label">전공</div>
                <div className="profile-value">{profile.major}</div>
              </div>
              <hr className="row-divider" />

              <div className="profile-row">
                <div className="profile-label">소개</div>
                <div className="profile-value">{profile.introduction}</div>
              </div>
              <hr className="row-divider" />

              <div className="profile-row">
                <div className="profile-label">지역</div>
                <div className="profile-value">
                  {locationMapping[profile.location] || profile.location}
                </div>
              </div>
              <hr className="row-divider" />

              <div className="profile-row">
                <div className="profile-label">알림 수신</div>
                <div className="profile-value">
                  {profile.notificationEnabled ? "Y" : "N"}
                </div>
              </div>
              <hr className="row-divider" />

              <div className="button-wrapper">
                <button className="edit-btn" onClick={() => setIsModalOpen(true)}>
                  수정
                </button>
              </div>
            </div>

            <h3 className="study-group-title">활동 중인 스터디 그룹</h3>

            <div className="study-group-section"> 
              <hr className="row-divider" />
              {activeGroups.length === 0 && <div>활동 중인 스터디 그룹이 없습니다.</div>}
              {activeGroups.map((group) => (
                <div key={group.id}>
                  <div className="profile-row">
                    <div className="profile-label">{group.name}</div>
                    <div className="profile-value">
                      <span className="tag-box">#{group.myRole}</span>{' '}
                      <span className="tag-box">#{group.category}</span>{' '}
                      <span className="tag-box">#{group.location}</span>{' '}
                      <span className="tag-box">#{group.duration}</span>
                    </div>
                  </div>
                  <hr className="row-divider" />
                </div>
              ))}
            </div>

            <h3 className="study-group-title">가입 요청 보낸 스터디 그룹</h3>

            <div className="study-group-section"> 
              <hr className="row-divider" />
              {requestedGroups.length === 0 && <div>가입 요청을 보낸 스터디 그룹이 없습니다.</div>}
              {requestedGroups.map((group) => (
                <div key={group.id}>
                  <div className="profile-row">
                    <div className="profile-label">{group.name}</div>
                    <div className="profile-value">
                      <span className="tag-box">#{group.myRole}</span>{' '}
                      <span className="tag-box">#{group.category}</span>{' '}
                      <span className="tag-box">#{group.location}</span>{' '}
                      <span className="tag-box">#{group.duration}</span>
                    </div>
                  </div>
                  <hr className="row-divider" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && profile && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsModalOpen(false)}
          onSaveSuccess={(updated) => {
            setProfile(updated);
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default MyPage;