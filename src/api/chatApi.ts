import axios from "axios";

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

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: T;
}

export const getChatRooms = async (accessToken: string): Promise<ChatRoomInfoDto[]> => {
  try {
    const response = await axios.get<ApiResponse<ChatRoomInfoDto[]>>(
      `${API_BASE_URL}/chats/rooms`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.result || [];
  } catch (error) {
    throw new Error("채팅방 정보를 불러오는 데 실패했습니다.");
  }
};

export const createGroupChatRoom = async (
  accessToken: string,
  groupId: number
) => {
  const response = await axios.post(
   `${API_BASE_URL}/chats/room/group/${groupId}`, 
    null, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.result;
};

export const getMessages = async (
  accessToken: string,
  roomId: number
): Promise<ChatResponseDto[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/chats/room/${roomId}/messages`, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.result;
};