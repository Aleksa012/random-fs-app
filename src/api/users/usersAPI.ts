import { authInstance, baseInstance } from "../instance";

interface UserCredentials {
  username: string;
  password: string;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  icon: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  icon: string;
}

export const login = async (credentials: UserCredentials): Promise<string> => {
  const { data } = await baseInstance.post("/users/auth/login", credentials);
  return data;
};

export const register = async (regInfo: RegisterData) => {
  const { data } = await baseInstance.post("/users", regInfo);
  return data;
};

export const getSelf = async (): Promise<UserResponse> => {
  const { data } = await authInstance.get("/users/auth/self");
  return data;
};
