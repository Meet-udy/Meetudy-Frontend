import axios from "axios";
import { authHeader, ApiResponse } from "./apiUtils.ts";

const API_BASE_URL = "http://localhost:8080"; 

export interface ChatRoomInfoDto {
  roomId: number;
  groupName: string | null;
  displayName: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
  memberNicknames: string[];
}

export interface ChatMessageDto {
  roomId: number;
  senderId: number | null;
  message: string;
  messageType: 'ENTER' | 'TALK' | 'QUIT';
}

export interface ChatResponseDto {
  roomId: number;
  senderId: number;
  senderName: string;
  message: string;
  messageType: 'ENTER' | 'TALK' | 'QUIT';
  createdAt: string;
  mine: boolean;
}

export const getChatRooms = async (
  accessToken: string
): Promise<ChatRoomInfoDto[]> => {
  try {
    const response = await axios.get<ApiResponse<ChatRoomInfoDto[]>>(
      `${API_BASE_URL}/chats/rooms`,
      authHeader(accessToken)
    );
    return response.data.result || [];
  } catch {
    throw new Error("채팅방 정보를 불러오는 데 실패했습니다.");
  }
};

export const createPrivateChatRoom = async (
  accessToken: string,
  groupId: number
): Promise<string> => {
  try {
    const response = await axios.post<ApiResponse<string>>(
     `${API_BASE_URL}/chats/room/private/${groupId}`, 
       null, 
       authHeader(accessToken)
     );
     return response.data.result!;
  } catch {
    throw new Error("채팅방 생성에 실패했습니다.");
  }
};

export const createGroupChatRoom = async (
  accessToken: string,
  groupId: number
): Promise<string> => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/chats/room/group/${groupId}`, 
       null, 
       authHeader(accessToken)
     );
     return response.data.result!;
  } catch {
    throw new Error("채팅방 생성에 실패했습니다.");
  }
};

export const getMessages = async (
  accessToken: string,
  roomId: number
): Promise<ChatResponseDto[]> => {
  try {
    const response = await axios.get<ApiResponse<ChatResponseDto[]>>(
      `${API_BASE_URL}/chats/room/${roomId}/messages`, 
      authHeader(accessToken)
    );
    return response.data.result || [];
  } catch {
    throw new Error("채팅 메시지를 불러오는 데 실패했습니다.");
  }
};

export const leaveChatRoom = async (
  accessToken: string,
  roomId: number
): Promise<string> => {
  try {
    const response = await axios.delete<ApiResponse<string>>(
      `${API_BASE_URL}/chats/room/${roomId}`, 
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("채팅방을 나가는 데 실패했습니다.");
  }
};

export const getChatRoomByGroupId = async (
  groupId: number
): Promise<number> => {
  try {
    const response = await axios.get<ApiResponse<number>>(
      `${API_BASE_URL}/chats/room/group/${groupId}`
    );
    return response.data.result!;
  } catch {
    throw new Error("채팅방 ID를 조회하는 데 실패했습니다.");
  }
};