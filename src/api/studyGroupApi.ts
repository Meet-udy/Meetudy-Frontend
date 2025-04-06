import axios from "axios";
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
}

export interface StudyGroupMemberDto {
  groupMemberId?: number;
  nickname: string;
  major: string;
  introduction: string;
  activityScore: number;
  interests: string[]; 
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: T;
}

export const getSortedStudyGroups = async (accessToken: string, sortBy: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/search/sort?sortBy=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.result.map(transformStudyGroupData);
  } catch (error) {
    throw new Error("스터디 그룹을 조회할 수 없습니다.");
  }
};

export const getStudyGroupById = async (groupId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/study-groups/${groupId}`,
    );

    return transformStudyGroupFromResult(response.data.result);
  } catch(error) {
    throw new Error("스터디 그룹을 조회할 수 없습니다.");
  }
};

export const createStudyGroup = async (accessToken: string, studyGroupDto: StudyGroupDto) => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/study-groups`,
      studyGroupDto,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("스터디 그룹 생성에 실패했습니다.");
  }
};

export const getCreatedStudyGroups = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/study-groups/created-groups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.result.map(transformStudyGroupData);
  } catch (error) {
      throw new Error("스터디 그룹을 조회할 수 없습니다.");
  }
};

export const getJoinedStudyGroups = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/study-groups/joined-groups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.result.map(transformStudyGroupData);
  } catch (error) {
    throw new Error("스터디 그룹을 조회할 수 없습니다.");
  }
};

export const requestJoinGroup = async (accessToken: string, groupId: number) => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/study-groups/${groupId}/join-requests`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("스터디 그룹 가입 요청에 실패했습니다.");
  }
};

export const getMembersByStatus = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/study-groups/joined-groups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.result.map(transformStudyGroupData);
  } catch (error) {
    throw new Error("스터디 그룹을 조회할 수 없습니다.");
  }
};

export const getStudyGroupMembers = async (
  accessToken: string,
  groupId: number,
  status: string
): Promise<StudyGroupMemberDto[]> => {
  try {
    const response = await axios.get(
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
): Promise<void> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/study-groups/${groupMemberId}/approval`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.result || [];
  } catch (error) {
    throw new Error("스터디 가입 승인에 실패했습니다.");
  }
};

export const rejectJoinRequest = async (
  accessToken: string,
  groupMemberId: number
): Promise<void> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/study-groups/${groupMemberId}/rejection`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data.result)
    return response.data.result || [];
  } catch (error) {
    throw new Error("스터디 가입 거절에 실패했습니다.");
  }
};