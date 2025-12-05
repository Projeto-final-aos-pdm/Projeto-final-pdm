export const accountTypeValues = [
  "checking",
  "savings",
  "salary",
  "investment",
  "digital",
] as const;
export type AccountTypeValues = (typeof accountTypeValues)[number];

export type AccountRequest = {
  bank: string;
  type: AccountTypeValues;
  is_active: boolean;
};

export type AccountResponse = {
  message: string;
  data: {
    id: string;
    user_id: string;
    bank: string;
    type: AccountTypeValues;
    balance: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
};

export type AccountRequestUpdate = {
  bank?: string;
  type?: AccountTypeValues;
  is_active?: boolean;
};

export type Account = {
  id: string;
  user_id: string;
  bank: string;
  type: AccountTypeValues;
  balance: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
