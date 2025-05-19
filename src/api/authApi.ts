import axios from "axios";
import { authHeader, ApiResponse } from "./apiUtils.ts";

const API_BASE_URL = "http://localhost:8080"; 

export interface SignUpDto {
  email: string;
  username: string;
  password: string;
  nickname: string;
  major: string;
  introduction?: string;
  isOnline: boolean;
  notificationEnabled: boolean;
  location: string;
  studyCategories: string[];
}

export interface SignInDto {
  username: string;
  password: string;
}

export interface JwtTokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface KakaoLoginDto {
  jwtTokenDto: JwtTokenDto;
  isFirstLogin: boolean;
}

export interface AdditionalInfoDto {
  nickname: string;
  major: string;
  introduction?: string;
  isOnline: boolean;
  notificationEnabled: boolean;
  location: string;
  studyCategories: string[];
}

export const signUp = async (
  signUpDto: SignUpDto
) => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/members/sign-up`, signUpDto);
    return response.data;
  } catch {
    throw new Error("회원가입에 실패했습니다.");
  }
};

export const signIn = async (
  signInDto: SignInDto
): Promise<ApiResponse<JwtTokenDto>> => {
  try {
    const response = await axios.post<ApiResponse<JwtTokenDto>>(
      `${API_BASE_URL}/members/sign-in`, 
      signInDto
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;  
    }
    throw new Error("네트워크 오류가 발생했습니다.");
  }
};

export const kakaoLogin = async (
  code: string
): Promise<ApiResponse<KakaoLoginDto>> => {
  try {
    const response = await axios.post<ApiResponse<KakaoLoginDto>>(
      `${API_BASE_URL}/members/kakao/login?code=${code}`
    );
    return response.data;
  } catch (error) {
    throw new Error("카카오 로그인에 실패했습니다.");
  }
};

export const logout = async (
  accessToken: string
): Promise<void> => {
  try {
    await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/members/logout`, 
      {},
      authHeader(accessToken)
    );
    
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch {
    throw new Error("로그아웃에 실패했습니다.");
  }
};

export const findUsername = async (
  email: string
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/members/username`, 
      { email });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("아이디 찾기에 실패했습니다.");
  }
};

export const findPassword = async (
  username: string, 
  email: string
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/members/password`, 
      { username, email });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("비밀번호 찾기에 실패했습니다.");
  }
};

export const sendVerificationEmail = async (
  email: string
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/auth/send/verification`, 
      { email });
    return response.data;
  } catch {
    throw new Error("이메일 전송에 실패했습니다.");
  }
};

export const verifyCode = async (
  email: string, 
  code: string
): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/auth/verification`, 
      { email, code });
    return response.data;
  } catch {
    throw new Error("인증 번호 검증에 실패했습니다.");
  }
};

export const checkUsernameAvailability = async (
  username: string
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await axios.post<ApiResponse<boolean>>(
      `${API_BASE_URL}/members/username/duplication`, 
      { username });
    return response.data;
  } catch {
    throw new Error("아이디 중복 확인에 실패했습니다.");
  }
};

export const checkNicknameAvailability = async (
  nickname: string
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await axios.get<ApiResponse<boolean>>(
      `${API_BASE_URL}/members/nickname/duplication`, {
      params: { nickname }
    });
    return response.data;
  } catch {
    throw new Error("닉네임 중복 확인에 실패했습니다.");
  }
};

export const updateAdditionalInfo = async(
  additionalInfoDto: AdditionalInfoDto, 
  accessToken: string
) => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/members/additional-info`,
      additionalInfoDto,
      authHeader(accessToken)
    );  
    return response.data;
  } catch {
    throw new Error("추가 정보 입력에 실패했습니다.");
  }
};

export const getCurrentMemberId = async (
  accessToken: string
): Promise<number> => {
  const response = await axios.get<ApiResponse<number>>(
    `${API_BASE_URL}/members/me`,
    authHeader(accessToken)
  );
  if (response.data.result === undefined || response.data.result === null) {
    throw new Error('회원 정보를 가져올 수 없습니다.');
  }
  return response.data.result;
};