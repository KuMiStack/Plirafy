import { create } from "zustand";

export type UserDetails = {
  id: number;
  username: string;
  email: string;
};

type UserStore = {
  user: UserDetails | null;
  setUser: (user: UserDetails) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
