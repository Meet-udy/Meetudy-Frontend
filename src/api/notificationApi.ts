import axios from "axios";
import { API_BASE_URL, authHeader, ApiResponse } from "./apiUtils.ts";

export interface NotificationDto {
  notificationId: number;
  postId: number;
  message: string;
  read: boolean;
  createdAt: string;
}

export const getAllNotifications = async (
  accessToken: string
): Promise<NotificationDto[]> => {
  try {
    const response = await axios.get<ApiResponse<NotificationDto[]>>(
      `${API_BASE_URL}/notifications`,
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("알림 목록 조회에 실패했습니다.");
  }
};

export const markAsRead = async (
  notificationId: number,
  accessToken: string
): Promise<string> => {
  try {
    const response = await axios.patch<ApiResponse<string>>(
      `${API_BASE_URL}/notifications/${notificationId}`,
      null,
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("알림을 읽음 처리하는 데 실패했습니다.");
  }
};