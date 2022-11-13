import { authInstance } from "../instance";
import { UserResponse } from "../users/usersAPI";

interface Details<T> {
  count: number;
  posts: T;
}

export interface SendPostData {
  content: string;
  img?: string;
}

export interface PostResponse {
  author: UserResponse | "author deleted";
  content: string;
  createdAt: string;
  id: string;
  img: string | null;
  likes: string[];
  popular: boolean;
}

export const getAllPosts = async (): Promise<Details<PostResponse[]>> => {
  const { data } = await authInstance.get("/posts");
  return data;
};

export const likePost = async (id: string) => {
  const { data } = await authInstance.post(`/posts/like/${id}`);
  return data;
};

export const createPost = async (postData: SendPostData) => {
  const { data } = await authInstance.post(`/posts`, {
    ...postData,
    createdAt: new Date().toISOString(),
  });
  return data;
};
