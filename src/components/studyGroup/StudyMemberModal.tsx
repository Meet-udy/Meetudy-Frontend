import React, { useEffect, useState } from "react";
import { getStudyGroupMembers, approveJoinRequest, rejectJoinRequest, StudyGroupMemberDto } from "../../api/studyGroupApi.ts";
import { transformCategoryToKorean } from "../../utils/studyGroupUtils.ts";

interface StudyGroupMemberModalProps {
  groupId: number;
  accessToken: string;
  onClose: () => void;
}

const StudyGroupMemberModal: React.FC<StudyGroupMemberModalProps> = ({
  groupId,
  accessToken,
  onClose,
}) => {
  const [members, setMembers] = useState<StudyGroupMemberDto[]>([]);
  const [activeTab, setActiveTab] = useState<"MEMBER" | "REQUESTED">("MEMBER");

  const fetchMembers = async () => {
    try {
      const result = await getStudyGroupMembers(accessToken, groupId, activeTab);
      setMembers(result);
    } catch (error) {
      console.error("멤버 목록 조회에 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [groupId, accessToken, activeTab]);

  const handleApprove = async (groupMemberId?: number) => {
    if (!groupMemberId) return;
    try {
      await approveJoinRequest(accessToken, groupMemberId);
      fetchMembers(); 
    } catch (error) {
      console.error("가입 승인에에 실패했습니다.", error);
    }
  };

  const handleReject = async (groupMemberId?: number) => {
    console.log("group member id: ", groupMemberId)
    if (!groupMemberId) return;
    try {
      await rejectJoinRequest(accessToken, groupMemberId);
      fetchMembers(); 
    } catch (error) {
      console.error("가입 거절에 실패했습니다.", error);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalTitle}>
          스터디 그룹 {activeTab === "MEMBER" ? "멤버 목록" : "가입 요청 목록"}
        </h2>

        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "MEMBER" ? styles.activeTabButton : {}),
            }}
            onClick={() => setActiveTab("MEMBER")}
          >
            멤버
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "REQUESTED" ? styles.activeTabButton : {}),
            }}
            onClick={() => setActiveTab("REQUESTED")}
          >
            가입 요청
          </button>
        </div>

        <ul style={styles.memberList}>
          {members.length > 0 ? (
            members.map((member, index) => (
              <li key={index} style={styles.memberItem}>
                <strong style={styles.memberName}>{member.nickname}</strong>
                <span style={styles.memberInfo}>전공: {member.major}</span>
                <span style={styles.memberInfo}>소개: {member.introduction}</span>
                <span style={styles.memberInfo}>활동 점수: {member.activityScore}</span>
                <span style={styles.memberInfo}>
                  관심 분야:{" "}
                  {member.interests
                    .map((interest) => transformCategoryToKorean(interest))
                    .join(", ")}
                </span>

                {activeTab === "REQUESTED" && (
                  <div style={styles.actionButtons}>
                    <button
                      style={styles.approveButton}
                      onClick={() => handleApprove(member.groupMemberId)}
                    >
                      승인
                    </button>
                    <button
                      style={styles.rejectButton}
                      onClick={() => handleReject(member.groupMemberId)}
                    >
                      거절
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li style={styles.emptyMessage}>표시할 사용자가 없습니다.</li>
          )}
        </ul>
        <button onClick={onClose} style={styles.closeButton}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default StudyGroupMemberModal;

const styles = {
  modalOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "500px",
    maxHeight: "80vh",
    overflowY: "auto" as const,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  },
  modalTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    textAlign: "center" as const,
  },
  memberList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  memberItem: {
    padding: "15px",
    borderBottom: "1px solid #ccc",
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },
  memberName: {
    fontWeight: "bold" as const,
    fontSize: "16px",
  },
  memberInfo: {
    fontSize: "13px",
    color: "#555",
  },
  emptyMessage: {
    textAlign: "center" as const,
    color: "#888",
    padding: "20px",
  },
  closeButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tabContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  tabButton: {
    padding: "10px 20px",
    backgroundColor: "#e0e0e0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  activeTabButton: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  actionButtons: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  approveButton: {
    padding: "6px 12px",
    backgroundColor: "#fff",
    color: "#1f72c5",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },
  rejectButton: {
    padding: "6px 12px",
    backgroundColor: "#fff",
    color: "#1f72c5",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },
  
};