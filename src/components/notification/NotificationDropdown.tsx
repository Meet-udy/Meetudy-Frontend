import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllNotifications, markAsRead, NotificationDto } from "../../api/notificationApi.ts";

interface Props {
  accessToken: string;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<Props> = ({ accessToken, onClose }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  
  useEffect(() => {
    getAllNotifications(accessToken)
      .then(setNotifications)
      .catch(console.error);
  }, [accessToken]);
  
  const handleNotificationClick = async (notification: NotificationDto) => {
    if (!notification.read) {
      try {
        await markAsRead(notification.notificationId, accessToken);
      
        setNotifications((prev) =>
          prev.map((n) =>
            n.notificationId === notification.notificationId
              ? { ...n, isRead: true }
              : n
          )
        );
      } catch (error) {
        setError("알림 읽음 처리에 실패했습니다.")
      }
    }

    onClose();
    navigate(`/posts/${notification.postId}`);
  };
  
  return (
    <div
      style={{
        position: "absolute",
        top: "60px",
        right: "30px",
        width: "300px",
        maxHeight: "400px",
        overflowY: "auto",
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      {notifications.length === 0 ? (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
             color: "#777",
          }}
        >
          알림이 없습니다.
        </div>
      ) : (
        notifications.map((n) => (
          <div
            key={n.notificationId}
            onClick={() => handleNotificationClick(n)}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
              backgroundColor: n.read ? "white" : "#f9f9ff",
              fontWeight: n.read ? "normal" : "bold",
            }}
            onMouseOver={(e) => {
              (e.currentTarget.style.backgroundColor = "#f5f5f5");
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = n.read ? "white" : "#f9f9ff";
            }}
          >
            <div>{n.message}</div>
            <div style={{ fontSize: "12px", color: "#aaa" }}>
              {new Date(n.createdAt).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};