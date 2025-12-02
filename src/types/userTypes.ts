export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};

export type UserResponse = {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
  };
};

export type UserRequestUpdate = {
  name?: string;
  email?: string;
};
