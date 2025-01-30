import React from "react";
import "./NavBar.css";

export const NavBar: React.FC = () => {
  return (
    <nav className="nav-menu">
      <ul>
        <li>GROUP</li>
        <li>PLANNER</li>
        <li>COMMUNITY</li>
        <li>MYPAGE</li>
        <li>NOTICE</li>
      </ul>
    </nav>
  );
};