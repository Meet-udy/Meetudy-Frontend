import React, { useState } from "react";
import { Link } from "react-router-dom";  
import { logout } from "../../api/authApi.ts"; 
import "./UserMenu.css";

export const UserMenu: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken"); 
      if (accessToken) {
        await logout(accessToken);  
        window.location.href = "/";  
      }
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div className="user-menu">
      <button onClick={toggleMenu} className="user-icon">
        <i className="fas fa-user-circle"></i>
      </button>
      {menuVisible && (
        <div className="dropdown-menu">
          <ul>
            <li>
            <Link to="/signup">회원가입</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li onClick={handleLogout}>로그아웃</li>
          </ul>
        </div>
      )}
    </div>
  );
};