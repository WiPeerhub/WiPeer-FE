import { create } from "zustand";
import { getRoomsByOwner } from "@/utils/roomAPI";

export const useMyRoomStore = create((set) => ({
  myRooms: [],
  fetchMyRooms: async (userId, ip) => {
    if (!userId || !ip) return;

    try {
      const { rooms } = await getRoomsByOwner(userId);
      set({ myRooms: rooms });
    } catch (err) {
      console.error("내가 만든 방 불러오기 실패:", err.message);
    }
  },
  setMyRooms: (updater) =>
    set((state) => ({
      myRooms: typeof updater === "function" ? updater(state.myRooms) : updater,
    })),
}));
