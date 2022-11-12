import axios from "axios";
import { getAuthToken } from "./local-storage/localStorage";

export const baseInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
});

baseInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    alert(`${error.response.data} , ${error.response.status}`);
    return Promise.reject(error);
  }
);

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
});

authInstance.interceptors.request.use((config) => {
  if (!config.headers) return config;
  config.headers["Authorization"] = `Bearer ${getAuthToken()}`;

  return config;
});
