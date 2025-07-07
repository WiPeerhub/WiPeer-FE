import { create } from "zustand";

export const useClientIPStore = create((set) => ({
  ip: "",
  setIP: (newIP) => set({ ip: newIP }),
}));
