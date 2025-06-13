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

  const handleCommunityClick = () => {
    navigate('/community');
  }

  const handleMyPageClick = () => {
    navigate('/my-page');
  }

  return (
    <nav className="nav-menu">
      <ul>
        <li onClick={handleGroupClick}>GROUP</li>
        <li onClick={handleChatClick}>CHAT</li>
        <li onClick={handleCommunityClick}>COMMUNITY</li>
        <li onClick={handleMyPageClick}>MYPAGE</li>
      </ul>
    </nav>
  );
};