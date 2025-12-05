import {
  TransactionRequest,
  TransactionRequestUpdate,
  TransactionResponse,
} from "../types/transactionTypes";
import { baseURL, decodeToken } from "./authentication";

export async function getAllTransaction(accountId: string) {
  const userId = await decodeToken();

  const { data } = await baseURL.get<TransactionResponse>(
    `/account/${accountId}/transactions/user/${userId}`
  );

  return data;
}

export async function getTransactionById(transactionId: string) {
  const { data } = await baseURL.get<TransactionResponse>(
    `/transaction/${transactionId}`
  );
  return data.data;
}

export async function createTransaction({
  type,
  value,
  date,
  description,
  account_id,
  category_id,
}: TransactionRequest) {
  const userId = await decodeToken();

  await baseURL.post<TransactionResponse>(`/transaction/user/${userId}`, {
    type,
    value,
    date,
    description,
    account_id,
    category_id,
  });
}

export async function updateTransaction(
  { type, value, date, description, category_id }: TransactionRequestUpdate,
  transactionId: string
) {
  const userId = await decodeToken();
  console.log("A", transactionId);
  console.log("B", userId);

  await baseURL.put<TransactionResponse>(
    `/transaction/${transactionId}/user/${userId}`,
    {
      type,
      value,
      date,
      description,
      category_id,
    }
  );
}

export async function deleteTransaction(transactionId: string) {
  const userId = await decodeToken();

  await baseURL.delete(`/transaction/${transactionId}/user/${userId}`);
}
