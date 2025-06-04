import React, { useEffect, useState } from "react";
import { getChatRooms, ChatRoomInfoDto } from "../../api/chatApi.ts";
import { formatDateTime } from "../../utils/dateUtils.ts";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/Header.tsx";

import './ChatRoomListPage.css';

const ChatRoomListPage: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoomInfoDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const accessToken: string | null = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      setError("사용자 토큰이 필요합니다.");
      return;
    }

    const fetchRooms = async () => {
      try {
        const rooms = await getChatRooms(accessToken);
        setChatRooms(rooms);
      } catch (err) {
        setError("채팅방 목록을 불러오는 데 실패했습니다.");
      }
    };

    fetchRooms();
  }, [accessToken]);

  const handleRoomClick = (roomId: number) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div>
      <Header />
      <hr className="top-divider" />
      <div className="chat-room-list">
        <h2 className="title">채팅</h2>
        {error && <p className="error">{error}</p>}
        <ul>
          {chatRooms.map((room) => (
            <li key={room.roomId} onClick={() => handleRoomClick(room.roomId)} className="chat-room-item">
              <img src="/images/dummy_image.jpg" alt="Room" className="room-image" />
              <div className="room-text-content">
                <div className="room-header">
                  <span className="room-name">{room.groupName ? room.groupName : room.displayName}</span>
                  <span className="room-time">{formatDateTime(room.lastMessageTime) || "Unknown"}</span>
                </div>
                <div className="room-last-message">
                  {room.lastMessage || "메시지 없음"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatRoomListPage;