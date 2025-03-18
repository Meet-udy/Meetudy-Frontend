import axios from "axios";
import { transformStudyGroupData } from "../utils/studyGroupUtils.ts";

const API_BASE_URL = "http://localhost:8080"; 

export interface StudyGroupDto {
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
    const response = await axios.get(`${API_BASE_URL}/search/sort?sortBy=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.result.map(transformStudyGroupData);
  } catch (error) {
    throw new Error("스터디 그룹을 조회할 수 없습니다.");
  }
};

export const getCreatedStudyGroups = async (accessToken: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/study-groups/created-groups`, {
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
    const response = await axios.get(`${API_BASE_URL}/study-groups/joined-groups`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.result.map(transformStudyGroupData);
  } catch (error) {
    throw new Error("스터디 그룹을 조회할 수 없습니다.");
  }
};