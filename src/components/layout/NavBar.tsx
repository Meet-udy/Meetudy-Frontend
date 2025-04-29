import React from "react";
import { useNavigate } from 'react-router-dom';
import "./NavBar.css";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleGroupClick = () => {
    navigate('/study-groups'); 
  };

  const handleChatClick = () => {
    navigate('/chat-rooms');
  }

  return (
    <nav className="nav-menu">
      <ul>
        <li onClick={handleGroupClick}>GROUP</li>
        <li onClick={handleChatClick}>CHAT</li>
        <li>COMMUNITY</li>
        <li>MYPAGE</li>
        <li>NOTICE</li>
      </ul>
    </nav>
  );
};