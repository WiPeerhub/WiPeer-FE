import { useEffect, useRef } from "react";
import type { Room } from "@/types/room";
import ChatRoomCard from "@/components/Chat/ChatRoomCard";
import useClientIP from "@/hooks/useClientIP";
import useSocket from "@/hooks/useSocket";
import { useSearchValueStore } from "@/stores/useSearchValueStore";
import { searchRooms } from "@/utils/searchUtils";
import { useMyRoomStore } from "@/stores/useMyRoomStore";

export default function ChatMyRoomListPage() {
  const { myRooms, fetchMyRooms } = useMyRoomStore();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const searchValue = useSearchValueStore((state) => state.searchValue);
  const clientIP = useClientIP();

  useEffect(() => {
    const fetchMyCreatedRooms = async () => {
      const userId = localStorage.getItem("ownerId");
      if (userId && clientIP) {
        await fetchMyRooms(userId, clientIP);
      }
    };

    fetchMyCreatedRooms();
  }, [clientIP]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [myRooms]);

  useSocket(null, () => {});

  const filteredRooms = searchRooms(myRooms, searchValue);

  return (
    <>
      <ul>
        {filteredRooms
          .sort((a: Room, b: Room) => a.title.localeCompare(b.title, "ko"))
          .map((room: Room) => (
            <ChatRoomCard
              key={room.roomId}
              isPrivate={room.isPrivate}
              roomId={room.roomId}
              name={room.title}
              description={room.description}
              timestamp={room.timestamp}
              password={room.password}
              roomOwnerId={room.ownerId}
            />
          ))}
      </ul>
      <div ref={bottomRef} />
    </>
  );
}
