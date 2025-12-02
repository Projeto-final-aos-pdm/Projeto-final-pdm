import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoreState = {
  isToken: string;
  setToken: (token: string) => void;
  getToken: () => string;
  clearToken: () => void;
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      isToken: "",
      isHydrated: false,
      setToken: (token) => set({ isToken: token }),
      getToken: () => get().isToken,
      clearToken: () => set({ isToken: "" }),
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
    }),
    {
      name: "token-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
);
