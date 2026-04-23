import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  defaultThemeSettings,
  type PlirafyThemeSettings,
} from "../../../Components/Layout/theme";

export type UserDetails = {
  id: number;
  username: string;
  email: string;
};

type UserStore = {
  user: UserDetails | null;
  themeSettings: PlirafyThemeSettings;
  setUser: (user: UserDetails) => void;
  clearUser: () => void;
  setThemeSettings: (themeSettings: PlirafyThemeSettings) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      themeSettings: defaultThemeSettings,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setThemeSettings: (themeSettings) => set({ themeSettings }),
    }),
    {
      name: "plirafy-theme-preferences",
      partialize: (state) => ({ themeSettings: state.themeSettings }),
    }
  )
);
