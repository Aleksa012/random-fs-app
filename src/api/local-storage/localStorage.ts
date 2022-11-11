export const setAuthToken = (token: string) => {
  localStorage.setItem("auth", token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("auth");
};

export const removeAuthToken = () => {
  localStorage.removeItem("auth");
};
