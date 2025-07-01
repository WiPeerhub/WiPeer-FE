import { create } from "zustand";

export const useNickNameStore = create((set) => ({
  nickName: "",

  setNickName: (nickName) => set({ nickName }),
}));
