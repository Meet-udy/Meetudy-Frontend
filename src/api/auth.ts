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

export interface KakaoLoginDto {
  jwtTokenDto: JwtTokenDto;
  isFirstLogin: boolean;
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

export const kakaoLogin = async (code: string): Promise<ApiResponse<KakaoLoginDto>> => {
  try {
    const response = await axios.post<ApiResponse<KakaoLoginDto>>(
      `${API_BASE_URL}/members/kakao/login?code=${code}`
    );
    return response.data;
  } catch (error) {
    throw new Error("카카오 로그인 중 오류 발생");
  }
};

export const logout = async (accessToken: string): Promise<void> => {
  try {
    await axios.post(
      `${API_BASE_URL}/members/logout`, 
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("로그아웃 성공!");
  } catch (error) {
    console.error("로그아웃 중 오류가 발생했습니다.", error);
  }
};