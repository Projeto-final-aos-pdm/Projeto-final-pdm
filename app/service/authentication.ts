import axios from "axios";
import { useStore } from "../zustand/storage";

const baseHeader = { "Content-Type": "application/json" };

const baseURL = axios.create({
  baseURL: "https://projeto-final-aos.vercel.app",
});

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

export async function singup(name: string, email: string, password: string) {
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

export async function logout(token: string) {
  await baseURL.post(
    "/auth/logout",
    {
      token,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useStore.getState().isToken}`,
      },
    }
  );
}
