import { create } from "zustand";

export const useUserStore = create((set) => ({
  userInfo: {},
  setUserInfo: (userInfo) => set({ userInfo }),
}));
