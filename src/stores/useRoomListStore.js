import { create } from "zustand";
import { API } from "@/constants/api";

export const useRoomListStore = create((set) => ({
  rooms: [],
  fetchRooms: async (ip) => {
    const res = await fetch(API.getRoomsByIP(ip));
    const roomsInfo = await res.json();
    set({ rooms: roomsInfo.rooms });
  },
  setRoomList: (updater) =>
    set((state) => ({
      rooms: typeof updater === "function" ? updater(state.rooms) : updater,
    })),
}));
