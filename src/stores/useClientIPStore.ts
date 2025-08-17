import { create } from "zustand";

interface ClientIPState {
  ip: string;
  setIP: (newIP: string) => void;
}

export const useClientIPStore = create<ClientIPState>((set) => ({
  ip: "",
  setIP: (newIP) => set({ ip: newIP }),
}));
