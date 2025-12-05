import { baseURL } from "./authentication";
import { getUserData } from "./user";

export const getAllMonthlyBudgets = async () => {
  const userData = await getUserData();
  const { data } = await baseURL.get(`/user/${userData.id}/monthly-budget`);
  return data;
};

export const createMonthlyBudget = async (budget: {
  month: string;        
  year: string;         
  limit_value: string;  
}) => {
  const userData = await getUserData();
  const { data } = await baseURL.post(`/monthly-budget/user/${userData.id}`, budget);
  return data;
};

export const updateMonthlyBudget = async (budget: {
  id: string;
  month?: string;
  year?: string;
  limit_value?: string;
  spent_value?: string; 
}) => {
  const userData = await getUserData();
  const { data } = await baseURL.put(
    `/monthly-budget/${budget.id}/user/${userData.id}`,
    budget
  );
  return data;
};

export const deleteMonthlyBudget = async (id: string) => {
  const userData = await getUserData();
  const { data } = await baseURL.delete(`/monthly-budget/${id}/user/${userData.id}`);
  return data;
};