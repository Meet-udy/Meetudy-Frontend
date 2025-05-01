import React, { useEffect, useState, useRef } from 'react';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';
import { getMessages, getChatRooms, ChatMessageDto, ChatResponseDto } from '../../api/chatApi.ts';
import { getCurrentMemberId } from '../../api/authApi.ts';
import { Header } from '../../components/layout/Header.tsx';

import './ChatRoomPage.css';

let stompClient: Client | null = null;

const ChatRoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<ChatResponseDto[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentMemberId, setCurrentMemberId] = useState<number | null>(null);
  const [groupName, setGroupName] = useState<string>('');
  const accessToken = localStorage.getItem('accessToken');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!accessToken || !roomId) return;
    
    const fetchData = async () => {
      try {
        const memberId = await getCurrentMemberId(accessToken);
        setCurrentMemberId(memberId);
  
        const pastMessages = await getMessages(accessToken, Number(roomId));
        setMessages(pastMessages);

        const chatRooms = await getChatRooms(accessToken);
        const currentRoom = chatRooms.find((room) => room.roomId === Number(roomId));
        if (currentRoom) {
          setGroupName(currentRoom.groupName || currentRoom.displayName);
        }
      } catch (err) {
        console.error('데이터 로딩에 실패했습니다.', err);
      }
    };
    
    fetchData(); 
  }, [roomId]);
    
  useEffect(() => {
    if (currentMemberId !== null) {
      connect(); 
      return () => {
        disconnect();
      };
    }
  }, [currentMemberId]);
    
  const connect = () => {
    const socket = new SockJS(`http://localhost:8080/ws-stomp?token=${accessToken}`);
    
    stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient?.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          const received = JSON.parse(message.body) as ChatResponseDto;            
          const isMine = received.senderId === currentMemberId;

          const adjustedMessage = {
            ...received,
            mine: isMine,
          };

          setMessages((prev) => [...prev, adjustedMessage]);
        });
      },
      onStompError: (error) => {
        console.error('STOMP error', error);
      },
    });

    stompClient.activate();
  };
  
  const disconnect = () => {
    stompClient?.deactivate({ force: true }); 
  };
    
  const sendMessage = () => {
    if (stompClient && stompClient.connected && inputMessage.trim() !== '') {
      const chatMessage: ChatMessageDto = {
        roomId: Number(roomId),
        senderId: currentMemberId,
        message: inputMessage,
        messageType: 'TALK',  
      };
    
      stompClient.publish({
        destination: '/pub/message',
        body: JSON.stringify(chatMessage),
      });
      setInputMessage('');
    };
  };
    
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="chat-room-page">
      <Header />
      <div className="header-spacing" />
      <hr className="divider" />
      <div className="room-info">
        <h2 className="room-name">{groupName}</h2>
      </div>
      <hr className="divider" />
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.mine ? 'my-message' : 'other-message'}`}>
          <div className="message-column">
            {!msg.mine && <div className="message-sender">{msg.senderName}</div>}
            <div className="message-bubble">{msg.message}</div>
          </div>
        </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
  
  
}  

export default ChatRoomPage; 