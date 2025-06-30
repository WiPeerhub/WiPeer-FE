import { create } from "zustand";

export const useRoomListStore = create((set) => ({
  rooms: [],
  fetchRooms: async (ip) => {
    const res = await fetch(`http://localhost:4000/room?ip=${ip}`);
    const roomsInfo = await res.json();
    set({ rooms: roomsInfo.rooms });
  },
}));
