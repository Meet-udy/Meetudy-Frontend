import axios from "axios";
import { API_BASE_URL, authHeader, ApiResponse } from "./apiUtils.ts";

export interface MemberDto {
  email: string;
  username: string;
  nickname: string;
  major: string;
  introduction: string;
  activityScore: number;
  notificationEnabled: boolean;
  location: string;
  interests: string[];
}
  
export interface MemberUpdateDto {
  password?: string;
  nickname?: string;
  major?: string;
  introduction?: string;
  isOnline?: boolean;
  notificationEnabled?: boolean;
  location?: string;
  interests?: string[];
}
  
export const getMemberProfile = async (
  accessToken: string
): Promise<MemberDto> => {
  try {
    const response = await axios.get<ApiResponse<MemberDto>>(
      `${API_BASE_URL}/my-page/profile`,
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("사용자 프로필을 불러오는 데 실패했습니다.");
  }
};

export const updateMemberProfile = async (
  accessToken: string,
  memberUpdateDto: MemberUpdateDto
): Promise<string> => {
  try {
    const response = await axios.patch<ApiResponse<string>>(
      `${API_BASE_URL}/my-page/profile`,
      memberUpdateDto,
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("사용자 프로필을 수정하는 데 실패했습니다.");
  }
};