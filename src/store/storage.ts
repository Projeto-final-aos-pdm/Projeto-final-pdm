import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoreState = {
  isToken: string;
  setToken: (token: string) => void;
  getToken: () => string;
  clearToken: () => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      isToken: "",
      setToken: (token) => set({ isToken: token }),
      getToken: () => get().isToken,
      clearToken: () => set({ isToken: "" }),
    }),
    {
      name: "token-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
