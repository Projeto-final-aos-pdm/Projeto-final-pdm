import { baseURL } from "./authentication";
import { getUserData } from "./user";

export const getAllFinancialGoal = async () => {
  const { data } = await baseURL.get("/financial-goal");
  return data;
};

export const createFinancialGoal = async (goal: {
  description: string;
  target_value: string;
  current_value: string;
  deadline: string;
}) => {
  const userData = await getUserData();
  const { data } = await baseURL.post(`/financial-goal/user/${userData.id}`, goal);
  return data;
};

export const updateFinancialGoal = async (
  goal: {
    id: string;
    description?: string;
    target_value?: string;
    current_value?: string;
    deadline?: string;
  }
) => {
  const userData = await getUserData();
  const { data } = await baseURL.put(
    `/financial-goal/${goal.id}/user/${userData.id}`,
    goal
  );
  return data;
};

export const deleteFinancialGoal = async (id: string) => {
  const userData = await getUserData();
  const { data } = await baseURL.delete(`/financial-goal/${id}/user/${userData.id}`);
  return data;
};
