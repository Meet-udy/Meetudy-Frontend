import React from "react";
import "./Header.css";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <header className="App-header">
      <div className="logo">
        <h1>MEETUDY</h1>
      </div>
      {children}
    </header>
  );
};