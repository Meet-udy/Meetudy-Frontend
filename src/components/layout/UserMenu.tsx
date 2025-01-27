import React, { useState } from "react";
import "./UserMenu.css";

export const UserMenu: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <div className="user-menu">
      <button onClick={toggleMenu} className="user-icon">
        <i className="fas fa-user-circle"></i>
      </button>
      {menuVisible && (
        <div className="dropdown-menu">
          <ul>
            <li>회원가입</li>
            <li>로그인</li>
            <li>로그아웃</li>
          </ul>
        </div>
      )}
    </div>
  );
};