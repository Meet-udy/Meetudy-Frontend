import React, { useEffect, useState } from "react";
import { getMemberProfile, updateMemberProfile, MemberDto, MemberUpdateDto } from "../../api/myPageApi.ts";
import { Header } from "../../components/layout/Header.tsx";
import { locationMapping } from "../../constants/locationMapping.ts";
import EditProfileModal from "../../components/myPage/EditProfileModal.tsx";

import "./MyPage.css";

const MyPage: React.FC = () => {
  const [profile, setProfile] = useState<MemberDto | null>(null);
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

              {isModalOpen && (
                <EditProfileModal
                  profile={profile}
                  onClose={() => setIsModalOpen(false)}
                  onSaveSuccess={(updated) => {
                    setProfile(updated);
                    setIsModalOpen(false);
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyPage;