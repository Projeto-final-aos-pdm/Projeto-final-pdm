import axios from "axios";
import { router } from "expo-router";
import { useStore } from "../store/storage";
import config from "./api";

const baseHeader = { "Content-Type": "application/json" };

export const baseURL = axios.create({
  baseURL: config.apiUrl,
});

console.log("[API Config] Using URL:", config.apiUrl);

// Request interceptor: Automatically adds auth token to requests
baseURL.interceptors.request.use(
  (config) => {
    const token = useStore.getState().isToken;

    // Add token to all requests except login/register endpoints
    const isPublicAuthEndpoint =
      config.url?.includes("/auth/register") ||
      config.url === "/auth";

    if (token && !isPublicAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("[DEBUG] Token adicionado:", token.substring(0, 20) + "...");
    } 

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handles expired/invalid tokens
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

export async function login(email: string, password: string) {
  const { data } = await baseURL.post(
    "/auth",
    {
      email,
      password,
    },
    {
      headers: baseHeader,
    }
  );
  return data;
}

export async function signup(name: string, email: string, password: string) {
  const { data } = await baseURL.post(
    "/auth/register",
    {
      name,
      email,
      password,
    },
    {
      headers: baseHeader,
    }
  );

  return data;
}

type DecodeTokenData = {
  message: string;
  data: string;
};

export async function decodeToken() {
  const { data } = await baseURL.post<DecodeTokenData>("/auth/decode");

  return data.data;
}

export async function logout(token: string) {
  await baseURL.post("/auth/logout", { token });
}
