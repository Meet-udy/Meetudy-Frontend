import axios from "axios";

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

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: T;
}

export const signUp = async (signUpDto: SignUpDto) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/members/sign-up`, signUpDto);
    return response.data;
  } catch (error) {
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
};

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
  } catch (error) {
    console.error("로그아웃 중 오류가 발생했습니다.", error);
  }
};

export const findUsername = async (email: string): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post<ApiResponse<string>>(`${API_BASE_URL}/members/username`, { email });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("아이디 찾기 중 오류 발생");
  }
};

export const findPassword = async (username: string, email: string): Promise<ApiResponse<string>> => {
  try {
    const response = await axios.post<ApiResponse<string>>(`${API_BASE_URL}/members/password`, { username, email });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    throw new Error("비밀번호 찾기 중 오류 발생");
  }
};