import React from "react";
import "./Header.css";
import { NavBar } from "./NavBar.tsx";
import { UserMenu } from "./UserMenu.tsx";

export const Header: React.FC = () => {
  return (
    <header className="App-header">
      <div className="logo">
        <h1>MEETUDY</h1>
      </div>
      <NavBar />
      <UserMenu />
    </header>
  );
};