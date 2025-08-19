import { create } from "zustand";
import { getRoomsByOwner } from "@/utils/roomAPI";
import type { Room } from "@/types/room";

interface MyRoomState {
  myRooms: Room[];
  fetchMyRooms: (userId: string | null, ip: string | null) => Promise<void>;
  setMyRooms: (updater: Room[] | ((prev: Room[]) => Room[])) => void;
}

export const useMyRoomStore = create<MyRoomState>((set) => ({
  myRooms: [],
  fetchMyRooms: async (userId, ip) => {
    if (!userId || !ip) return;

    try {
      const { rooms } = await getRoomsByOwner(userId);
      set({ myRooms: rooms });
    } catch (err) {
      console.error("내가 만든 방 불러오기 실패:", err instanceof Error ? err.message : String(err));
    }
  },
  setMyRooms: (updater) =>
    set((state) => ({
      myRooms: typeof updater === "function" ? updater(state.myRooms) : updater,
    })),
}));
