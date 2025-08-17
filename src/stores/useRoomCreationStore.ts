import { create } from "zustand";

interface RoomCreationState {
  isRoomCreation: boolean;
  setIsRoomCreation: () => void;
}

export const useRoomCreationStore = create<RoomCreationState>((set) => ({
  isRoomCreation: false,

  setIsRoomCreation: () => {
    set((state) => ({ isRoomCreation: !state.isRoomCreation }));
  },
}));
