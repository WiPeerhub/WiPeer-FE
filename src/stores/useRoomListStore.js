import { create } from "zustand";
import { getRoomsByIP } from "@/utils/roomAPI";

export const useRoomListStore = create((set) => ({
  rooms: [],
  fetchRooms: async (ip) => {
    const { rooms } = await getRoomsByIP(ip);
    set({ rooms });
  },
  setRoomList: (updater) =>
    set((state) => ({
      rooms: typeof updater === "function" ? updater(state.rooms) : updater,
    })),
}));
