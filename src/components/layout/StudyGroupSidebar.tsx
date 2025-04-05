import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const StudyGroupSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAllGroupsClick = () => navigate("/study-groups");
  const handleCreateGroupClick = () => navigate("/study-groups/create");
  const handleLeaderClick = () => navigate("/study-groups/leader");
  const handleMemberClick = () => navigate("/study-groups/member");

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.title}>
        STUDY GROUP <div style={styles.titleUnderline} />
      </h2>
      <button style={styles.button} onClick={handleAllGroupsClick}>
        전체 그룹
      </button>
      <button style={styles.button} onClick={handleCreateGroupClick}>
        그룹 생성
      </button>
      <div
        style={styles.dropdownContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button style={styles.button}>가입된 그룹</button>
        {isDropdownOpen && (
          <div style={styles.dropdownMenu}>
            <button style={styles.dropdownItem} onClick={handleLeaderClick}>
              LEADER
            </button>
            <button style={styles.dropdownItem} onClick={handleMemberClick}>
              MEMBER
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: "200px",
    height: "35vh",
    backgroundColor: "white",
    border: "2px solid hsla(210, 72.80%, 44.70%, 0.28)",
    borderRadius: "5px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "10px",
    boxSizing: "border-box",
    marginTop: "50px",
    marginLeft: "20px"
  },
  title: {
    position: "relative",
    color: "hsla(210, 72.80%, 44.70%, 0.84)",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "40px",
    marginTop: "22px",
    marginLeft: "20px",
    display: "inline-block"
  },
  titleUnderline: {
    content: '""',
    display: "block",
    width: "100%", 
    height: "2px",
    backgroundColor: "hsla(210, 72.80%, 44.70%, 0.84)", 
    position: "absolute",
    bottom: "-5px", 
    left: "0",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "transparent",
    border: "none",
    color: "hsla(210, 72.80%, 44.70%, 0.84)",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "left",
    paddingLeft: "20px",
    marginBottom: "10px"
  },
  dropdownContainer: {
    width: "100%",
    position: "relative",
    marginTop: "10px",
  },
  dropdownMenu: {
    position: "absolute",
    top: "40px",
    left: "0",
    width: "100%",
    backgroundColor: "hsla(210, 87.40%, 43.70%, 0.20)",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
  dropdownItem: {
    width: "100%",
    padding: "10px",
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
    textAlign: "left",
  },
};

export default StudyGroupSidebar;
