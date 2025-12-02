import axios from "axios";
import { router } from "expo-router";
import { useStore } from "../store/storage";
import { UserResponse } from "../types/userTypes";
import config from "./api";
import { decodeToken } from "./authentication";

const baseHeader = { "Content-Type": "application/json" };

const baseURL = axios.create({
  baseURL: config.apiUrl,
});
baseURL.interceptors.request.use(
  (config) => {
    const token = useStore.getState().isToken;
    console.log("AAAAAAAAAAA");
    config.headers.Authorization = `Bearer ${token}`;
    console.log("HEADERS FINAIS:", config.headers);

    return config;
  },
  (error) => Promise.reject(error)
);

baseURL.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized: token expired or invalid
    if (error.response?.status === 401) {
      useStore.getState().clearToken();

      // Redirect to login only if not already on auth routes
      const currentUrl = error.config?.url || "";
      if (!currentUrl.includes("/auth")) {
        router.replace("/(auth)/login");
      }
    }

    return Promise.reject(error);
  }
);

export async function getUserData() {
  const userId = await decodeToken();

  const { data } = await baseURL.get<UserResponse>(`/user/${userId}`);

  return data.data;
}
