import { UserResponse } from "./../users/usersAPI";

export const setAuthToken = (token: string) => {
  localStorage.setItem("auth", token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("auth");
};

export const setUser = (user: UserResponse) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): UserResponse | null => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
};

export const clearLocalStorage = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
};
