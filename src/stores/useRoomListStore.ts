import { create } from "zustand";
import { getRoomsByIP } from "@/utils/roomAPI";
import type { Room } from "@/types/room";

interface RoomListState {
  rooms: Room[];
  fetchRooms: (ip: string) => Promise<void>;
  setRoomList: (updater: Room[] | ((prev: Room[]) => Room[])) => void;
}

export const useRoomListStore = create<RoomListState>((set) => ({
  rooms: [],
  fetchRooms: async (ip) => {
    const { rooms } = (await getRoomsByIP(ip)) as { rooms: Room[] };
    set({ rooms });
  },
  setRoomList: (updater) =>
    set((state) => ({
      rooms: typeof updater === "function" ? (updater as (prev: Room[]) => Room[])(state.rooms) : updater,
    })),
}));
