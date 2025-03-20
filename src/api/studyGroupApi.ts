import axios from "axios";
import { transformStudyGroupData, transformStudyGroupFromResult } from "../utils/studyGroupUtils.ts";

const API_BASE_URL = "http://localhost:8080"; 

export interface StudyGroupDto {
  id: number
  category: string;
  name: string;
  description: string;
  duration: string;
  isOnline: boolean;
  location: string;
  maxParticipants: number;
  method: string;
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