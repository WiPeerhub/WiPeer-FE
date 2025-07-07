import { useEffect } from "react";
import { useRoomListStore } from "@/stores/useRoomListStore";
import ChatRoomCard from "@/components/Chat/ChatRoomCard";
import useClientIP from "@/hooks/useClientIP";
import useIPChangeAlert from "@/hooks/useIPChangeAlert";
import useSocket from "@/hooks/useSocket";
import { useSearchValueStore } from "@/stores/useSearchValueStore";

export default function ChatRoomListPage() {
  const { rooms, fetchRooms } = useRoomListStore();
  const searchValue = useSearchValueStore((state) => state.searchValue);
  const clientIP = useClientIP();
  useIPChangeAlert(clientIP);

  useEffect(() => {
    if (clientIP !== "") {
      fetchRooms(clientIP);
    }
  }, [clientIP]);

  useSocket(null, () => {});

  return (
    <ul>
      {rooms
        .filter((room) => room.title.includes(searchValue) || room.description.includes(searchValue))
        .map((room) => (
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
  );
}
