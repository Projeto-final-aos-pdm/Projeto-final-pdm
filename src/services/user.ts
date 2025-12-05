import { UserRequestUpdate, UserResponse } from "../types/userTypes";
import { baseURL, decodeToken } from "./authentication";

export async function getUserData() {
  const userId = await decodeToken();

  const { data } = await baseURL.get<UserResponse>(`/user/${userId}`);

  return data.data;
}

export async function updateUser({ name, email }: UserRequestUpdate) {
  const userId = await decodeToken();

  await baseURL.put(`/user/${userId}`, {
    name,
    email,
  });
}

export async function deleteUser() {
  const userId = await decodeToken();

  await baseURL.delete(`/user/${userId}`);
}
