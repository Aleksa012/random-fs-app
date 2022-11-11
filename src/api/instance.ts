import axios from "axios";

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
