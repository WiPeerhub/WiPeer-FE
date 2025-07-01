import { useEffect } from "react";
import { useRoomListStore } from "@/stores/useRoomListStore";
import ChatRoomCard from "@/components/Chat/ChatRoomCard";
import useClientIP from "@/hooks/useClientIP";

export default function ChatRoomListPage() {
  const { rooms, fetchRooms } = useRoomListStore();
  const clientIP = useClientIP();

  useEffect(() => {
    if (clientIP !== "") {
      fetchRooms(clientIP);
    }
  }, [clientIP]);

  return (
    <ul>
      {rooms.map((room) => (
        <ChatRoomCard
          key={room.roomId}
          roomId={room.roomId}
          name={room.title}
          description={room.description}
          timestamp={room.timestamp}
        />
      ))}
    </ul>
  );
}
