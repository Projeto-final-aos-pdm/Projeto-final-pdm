import {
  Account,
  AccountRequest,
  AccountRequestUpdate,
} from "../types/accountTypes";
import { baseURL, decodeToken } from "./authentication";

export async function getAllAccounts(): Promise<Account[]> {
  const userId = await decodeToken();

  const { data } = await baseURL.get<Account[]>(`/user/${userId}/accounts`);

  console.log(data);
  return data;
}

export async function getAccountById(accountId: string) {
  const userId = await decodeToken();
  const { data } = await baseURL.get<Account>(
    `/user/${userId}/accounts/${accountId}`
  );
  console.log("aaa" + data);
  return data;
}

export async function createAccount({ bank, type, is_active }: AccountRequest) {
  const userId = await decodeToken();

  await baseURL.post(`/account/user/${userId}`, {
    bank,
    type,
    is_active,
  });
}

export async function updateAccounts(
  { bank, type, is_active }: AccountRequestUpdate,
  accountId: string
) {
  const userId = await decodeToken();

  await baseURL.put(`/account/${accountId}/user/${userId}  `, {
    bank,
    type,
    is_active,
  });
}

export async function deleteAccount(accountId: string) {
  const userId = await decodeToken();

  await baseURL.delete(`/account/${accountId}/user/${userId}`);
}
