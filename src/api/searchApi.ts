import axios from "axios";
import { API_BASE_URL, ApiResponse } from "./apiUtils.ts";

export interface AutoCompleteDto {
  categories: string[];
  groupNames: string[];
}

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
  myRole?: string;
}

export const fetchAutoComplete = async (
  query: string
): Promise<AutoCompleteDto> => {
  try {
    const response = await axios.get<ApiResponse<AutoCompleteDto>>(
      `${API_BASE_URL}/study-groups/search/autocomplete`,
      { params: { query } }
    );
    return response.data.result!;
  } catch (error) {
    throw new Error("자동 완성 정보를 불러오는 데 실패했습니다.");
  }
};
  
export const fetchByCategory = async (
  category: string
): Promise<StudyGroupDto[]> => {
  try {
    const response = await axios.get<ApiResponse<StudyGroupDto[]>>(
      `${API_BASE_URL}/study-groups/search/category`,
      { params: { category } }
    );
    return response.data.result!;
  } catch(error) {
    throw new Error("스터디 그룹을 불러오는 데 실패했습니다.");
  }
};

export const fetchByGroupName = async (
  name: string
): Promise<StudyGroupDto> => {
  try {
    const response = await axios.get<ApiResponse<StudyGroupDto>>(
      `${API_BASE_URL}/study-groups/search/group`,
      { params: { name } }
    );
    return response.data.result!;
  } catch(error) {
    throw new Error("스터디 그룹을 불러오는 데 실패했습니다.");
  }
}