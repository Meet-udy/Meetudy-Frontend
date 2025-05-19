import axios from "axios";
import { authHeader, ApiResponse } from "./apiUtils.ts";
import { transformStudyGroupData, transformStudyGroupFromResult } from "../utils/studyGroupUtils.ts";

const API_BASE_URL = "http://localhost:8080"; 

export interface StudyGroupDto {
  id?: number | null;
  category: string;
  name: string;
  description: string;
  duration: string;
  isOnline: boolean;
  location: string;
  maxParticipants: number;
  isRecruiting?: boolean;
}

export interface StudyGroupMemberDto {
  groupMemberId?: number;
  nickname: string;
  major: string;
  introduction: string;
  activityScore: number;
  interests: string[]; 
}

export const getSortedStudyGroups = async (
  accessToken: string, 
  sortBy: string
): Promise<StudyGroupDto[]> => {
  try {
    const response = await axios.get<ApiResponse<StudyGroupDto[]>>(
      `${API_BASE_URL}/search/sort?sortBy=${sortBy}`, 
      authHeader(accessToken)
    );
    return response.data.result!.map(transformStudyGroupData);
  } catch (error) {
    throw new Error("스터디 그룹을 조회할 수 없습니다.");
  }
};

export const getStudyGroupById = async (
  groupId: number
): Promise<StudyGroupDto> => {
  try {
    const response = await axios.get<ApiResponse<StudyGroupDto>>(
      `${API_BASE_URL}/study-groups/${groupId}`,
    );
    return transformStudyGroupFromResult(response.data.result!);
  } catch(error) {
    throw new Error("스터디 그룹을 조회할 수 없습니다.");
  }
};

export const createStudyGroup = async (
  accessToken: string, 
  studyGroupDto: StudyGroupDto
) => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/study-groups`,
      studyGroupDto,
      authHeader(accessToken)
    );
    return response.data;
  } catch (error) {
    throw new Error("스터디 그룹 생성에 실패했습니다.");
  }
};

export const getCreatedStudyGroups = async (
  accessToken: string
): Promise<StudyGroupDto[]> => {
  try {
    const response = await axios.get<ApiResponse<StudyGroupDto[]>>(
      `${API_BASE_URL}/study-groups/created-groups`, 
      authHeader(accessToken)
    );
    return response.data.result!.map(transformStudyGroupData);
  } catch (error) {
      throw new Error("스터디 그룹을 조회할 수 없습니다.");
  }
};

export const getJoinedStudyGroups = async (
  accessToken: string
): Promise<StudyGroupDto[]> => {
  try {
    const response = await axios.get<ApiResponse<StudyGroupDto[]>>(
      `${API_BASE_URL}/study-groups/joined-groups`, 
      authHeader(accessToken)
    );
    return response.data.result!.map(transformStudyGroupData);
  } catch (error) {
    throw new Error("스터디 그룹을 조회할 수 없습니다.");
  }
};

export const requestJoinGroup = async (
  accessToken: string, 
  groupId: number
) => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/study-groups/${groupId}/join-requests`,
      {},
      authHeader(accessToken)
    );
    return response.data;
  } catch (error) {
    throw new Error("스터디 그룹 가입 요청에 실패했습니다.");
  }
};

export const getStudyGroupMembers = async (
  accessToken: string,
  groupId: number,
  status: string
): Promise<StudyGroupMemberDto[]> => {
  try {
    const response = await axios.get<ApiResponse<StudyGroupMemberDto[]>>(
      `${API_BASE_URL}/study-groups/${groupId}/members`,
      {
        params: { status },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.result || [];
  } catch (error) {
    throw new Error("스터디 그룹 멤버 조회에 실패했습니다.");
  }
};

export const approveJoinRequest = async (
  accessToken: string,
  groupMemberId: number
): Promise<string> => {
  try {
    const response = await axios.put<ApiResponse<string>>(
      `${API_BASE_URL}/study-groups/${groupMemberId}/approval`,
      null,
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch (error) {
    throw new Error("스터디 가입 승인에 실패했습니다.");
  }
};

export const rejectJoinRequest = async (
  accessToken: string,
  groupMemberId: number
): Promise<string> => {
  try {
    const response = await axios.put<ApiResponse<string>>(
      `${API_BASE_URL}/study-groups/${groupMemberId}/rejection`,
      null,
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch (error) {
    throw new Error("스터디 가입 거절에 실패했습니다.");
  }
};

export const closeRecruitment = async (
  accessToken: string,
  groupId: number
): Promise<StudyGroupDto> => {
  try {
    const response = await axios.patch<ApiResponse<StudyGroupDto>>(
      `${API_BASE_URL}/study-groups/${groupId}/closure`,
      null,
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch (error) {
    throw new Error("스터디 멤버 모집 종료에 실패했습니다.");
  }
};

export const removeMemberFromGroup = async (
  accessToken: string,
  groupId: number,
  groupMemberId: number
): Promise<string> => {
  try {
    const response = await axios.delete<ApiResponse<string>>(
      `${API_BASE_URL}/study-groups/${groupId}/member/${groupMemberId}`,
      authHeader(accessToken)
    );
    return response.data.result || "멤버가 성공적으로 탈퇴되었습니다.";
  } catch (error) {
    throw new Error("스터디 멤버 탈퇴에 실패했습니다.");
  }
};

export const leaveStudyGroup = async (
  accessToken: string,
  groupId: number
): Promise<string> => {
  try {
    const response = await axios.delete<ApiResponse<string>>(
      `${API_BASE_URL}/study-groups/${groupId}/member`,
      authHeader(accessToken)
    );
    return response.data.result || "멤버가 성공적으로 탈퇴되었습니다.";
  } catch (error) {
    throw new Error("스터디 멤버 탈퇴에 실패했습니다.");
  }
};