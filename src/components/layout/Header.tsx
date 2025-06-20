import React from "react";
import { Link } from "react-router-dom"; 
import "./Header.css";
import { NavBar } from "./NavBar.tsx";
import { UserMenu } from "./UserMenu.tsx";

export const Header: React.FC = () => {
  return (
    <header className="App-header">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>MEETUDY</h1>
        </Link>
      </div>
      <NavBar />
      <UserMenu />
    </header>
  );
};