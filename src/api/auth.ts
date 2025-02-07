import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; 

export interface SignInDto {
  username: string;
  password: string;
}

export interface JwtTokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: T;
}

export const signIn = async (signInDto: SignInDto): Promise<ApiResponse<JwtTokenDto>> => {
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