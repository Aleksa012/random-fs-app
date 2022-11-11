import { baseInstance } from "../instance";

interface UserCredentials {
  username: string;
  password: string;
}

export const login = async (credentials: UserCredentials): Promise<string> => {
  const { data } = await baseInstance.post("/users/auth/login", credentials);
  return data;
};
