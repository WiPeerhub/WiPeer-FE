import { create } from "zustand";

export const useRoomCreationStore = create((set) => ({
  isRoomCreation: false,

  setIsRoomCreation: () => {
    set((state) => ({ isRoomCreation: !state.isRoomCreation }));
  },
}));
