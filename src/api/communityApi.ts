import axios from "axios";
import { API_BASE_URL, authHeader, ApiResponse } from "./apiUtils.ts";

export interface PostRequestDto {
  title: string;
  content: string;
  postCategory: string;
}

export interface PostDto {
  postId: number;
  title: string;
  postCategory: string;
  authorNickname: string;
  createdAt: string;
  commentCount: number;
}

export interface PostDetailDto {
  postId: number;
  title: string;
  content: string;
  postCategory: string;
  authorNickname: string;
  createdAt: string;
  isMyPost: boolean;
  comments: CommentDto[];
}

export interface CommentRequestDto {
  content: string;
}

export interface CommentDto {
  commentId: number;
  content: string;
  authorNickname: string;
  createdAt: string;
  myComment: boolean;
}

export const createPost = async (
  accessToken: string,
  postRequestDto: PostRequestDto
): Promise<string> => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/posts`, 
      postRequestDto, 
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("게시글 생성에 실패했습니다.");
  }
};

export const updatePost = async (
  postId: number,
  accessToken: string,
  postRequestDto: PostRequestDto
): Promise<PostDetailDto> => {
  try {
    const response = await axios.patch<ApiResponse<PostDetailDto>>(
      `${API_BASE_URL}/posts/${postId}`, 
      postRequestDto, 
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("게시글 수정에 실패했습니다.");
  }
};

export const deletePost = async (
  postId: number,
  accessToken: string
): Promise<string> => {
  try {
    const response = await axios.delete<ApiResponse<string>>(
      `${API_BASE_URL}/posts/${postId}`, 
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("게시글 삭제에 실패했습니다.")
  }
};

export const getAllPosts = async (): Promise<PostDto[]> => {
  try {
    const response = await axios.get<ApiResponse<PostDto[]>>(
      `${API_BASE_URL}/posts`
    );
    return response.data.result!;
  } catch {
    throw new Error("게시글 조회에 실패했습니다.");
  }
};

export const getPostById = async (
  postId: number,
  accessToken: string
): Promise<PostDetailDto> => {
  try {
    const response = await axios.get<ApiResponse<PostDetailDto>>(
      `${API_BASE_URL}/posts/${postId}`,
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("게시글 상세 조회에 실패했습니다.");
  }
};
  
export const getPostsByMember = async (
  accessToken: string
): Promise<PostDto[]> => {
  try {
    const response = await axios.get<ApiResponse<PostDto[]>>(
      `${API_BASE_URL}/posts/member`
    );
    return response.data.result!;
  } catch {
    throw new Error("게시글 조회에 실패했습니다.");
  }
};

export const createComment = async (
  postId: number,
  accessToken: string,
  commentRequestDto: CommentRequestDto
): Promise<string> => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${API_BASE_URL}/comments/${postId}`, 
      commentRequestDto, 
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("댓글 생성에 실패했습니다.");
  }
};

export const updateComment = async (
  commentId: number,
  accessToken: string,
  commentRequestDto: CommentRequestDto
): Promise<string> => {
  try {
    const response = await axios.put<ApiResponse<string>>(
      `${API_BASE_URL}/comments/${commentId}`, 
      commentRequestDto, 
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("댓글 수정에 실패했습니다.");
  }
};

export const deleteComment = async (
  commentId: number,
  accessToken: string
): Promise<string> => {
  try {
    const response = await axios.delete<ApiResponse<string>>(
      `${API_BASE_URL}/comments/${commentId}`, 
      authHeader(accessToken)
    );
    return response.data.result!;
  } catch {
    throw new Error("댓글 삭제에 실패했습니다.")
  }
};

export const getCommentsByPost = async (
  postId: number
): Promise<CommentDto[]> => {
  try {
    const response = await axios.get<ApiResponse<CommentDto[]>>(
      `${API_BASE_URL}/comments/${postId}`
    );
    return response.data.result!;
  } catch {
    throw new Error("댓글 조회에 실패했습니다.");
  }
};