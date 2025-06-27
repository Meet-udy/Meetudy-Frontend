import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar.tsx";
import { UserMenu } from "./UserMenu.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { NotificationDropdown } from "../notification/NotificationDropdown.tsx";
import { getAllNotifications, NotificationDto } from "../../api/notificationApi.ts";

import "./Header.css";

export const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const accessToken = localStorage.getItem("accessToken") ?? "";

  useEffect(() => {
    if (!accessToken) return;
    getAllNotifications(accessToken)
      .then(setNotifications)
      .catch(console.error);
  }, [accessToken]);

  const toggleDropdown = () => setShowNotifications((prev) => !prev);

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <header className="App-header">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>MEETUDY</h1>
        </Link>
      </div>
      <NavBar />
      <UserMenu />
      <div style={{ position: "relative" }}>
        <button className="notification-btn" onClick={toggleDropdown} style={{ position: "relative" }}>
          <FontAwesomeIcon icon={faBell} />
          {hasUnread && (
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "7px",
                height: "7px",
                backgroundColor: "#b22222", 
                borderRadius: "50%",
                border: "2px solid white",
              }}
            />
          )}
        </button>
        {showNotifications && (
          <NotificationDropdown accessToken={accessToken} onClose={() => setShowNotifications(false)} />
        )}
      </div>
    </header>
  );
};