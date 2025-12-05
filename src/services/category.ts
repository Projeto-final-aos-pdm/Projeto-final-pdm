import { CategoryResponse } from "../types/categoryType";
import { baseURL } from "./authentication";

export async function getAllCategories() {
  const { data } = await baseURL.get<CategoryResponse>("/category");
  return data.data;
}
