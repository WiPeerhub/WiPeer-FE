import { create } from "zustand";

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface UserState {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
