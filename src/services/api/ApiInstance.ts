import axios from "axios";
import { baseURL } from "./ApiConfig";
import type { AxiosRequestHeaders } from "axios";


export const puplicAxiosInstance = axios.create({
  baseURL,
});

export const privateAxiosInstance = axios.create({
  baseURL,
});

privateAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    
    if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
    }

    const needsRawToken = config.headers.NeedsRawToken === true;

    if (token) {
      const rawToken = token.startsWith("Bearer ")
        ? token.split(" ")[1]
        : token;

      config.headers.Authorization = needsRawToken
        ? rawToken
        : `Bearer ${rawToken}`;
    }

    delete config.headers.NeedsRawToken;

    return config;
  },
  (error) => Promise.reject(error)
);
