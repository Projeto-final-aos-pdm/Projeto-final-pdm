import { UserResponse } from "../types/userTypes";
import { baseURL, decodeToken } from "./authentication";

export async function getUserData() {
  const userId = await decodeToken();

  const { data } = await baseURL.get<UserResponse>(`/user/${userId}`);

  return data.data;
}
