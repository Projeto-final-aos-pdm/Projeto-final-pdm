export const categoryType = ["fix", "variable"] as const;
export type CategoryType = (typeof categoryType)[number];

export type CategoryResponse = {
  message: string;
  data: {
    id: string;
    name: string;
    type: CategoryType;
    created_at: string;
    updated_at: string;
  };
};

export type Category = {
  id: string;
  name: string;
  type: CategoryType;
  created_at: string;
  updated_at: string;
};
