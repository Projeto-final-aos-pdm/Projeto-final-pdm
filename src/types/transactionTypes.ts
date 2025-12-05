export const transactionTypeValues = ["income", "expense"] as const;
export type TransactionTypeValues = (typeof transactionTypeValues)[number];

export type TransactionRequest = {
  value: string;
  date: string;
  description: string;
  type: TransactionTypeValues;
  account_id: string;
  category_id: string;
};

export type TransactionResponse = {
  message: string;
  data: {
    id: string;
    value: string;
    date: string;
    description: string;
    type: TransactionTypeValues;
    account_id: string;
    category_id: string;
    created_at: string;
    updated_at: string;
  };
};

export type TransactionRequestUpdate = {
  value?: string;
  date?: string;
  description?: string;
  type?: TransactionTypeValues;
  category_id?: string;
};

export type Transaction = {
  id: string;
  value: string;
  date: string;
  description: string;
  type: TransactionTypeValues;
  account_id: string;
  category_id: string;
  created_at: string;
  updated_at: string;
};
