import { useEffect, useRef, useMemo, useState } from "react";
import { useRoomListStore } from "@/stores/useRoomListStore";
import ChatRoomCard from "@/components/Chat/ChatRoomCard";
import useClientIP from "@/hooks/useClientIP";
import useSocket from "@/hooks/useSocket";
import { useSearchValueStore } from "@/stores/useSearchValueStore";
import Hangul from "hangul-js";
import Fuse from "fuse.js";
import { getUserVisitedRooms } from "@/utils/roomAPI";

export default function ChatMyRoomListPage() {
  const rooms = useRoomListStore((state) => state.rooms);
  const [myVisitedRooms, setMyVisitedRooms] = useState([]);
  const bottomRef = useRef(null);
  const searchValue = useSearchValueStore((state) => state.searchValue);
  const clientIP = useClientIP();

  useEffect(() => {
    const fetchMyVisibleRooms = async () => {
      const userId = localStorage.getItem("ownerId");
      if (!userId || !clientIP) return;

      try {
        const { rooms: visitedRooms } = await getUserVisitedRooms(userId);

        const visitedRoomIdSet = new Set(visitedRooms.map((r) => r.roomId));
        const filtered = rooms.filter((room) => visitedRoomIdSet.has(room.roomId));
        console.log(filtered);
        setMyVisitedRooms(filtered);
      } catch (err) {
        console.err("happend", err.message);
      }
    };

    fetchMyVisibleRooms();
  }, [clientIP]);

  const decompose = (str) => Hangul.disassemble(str).join("");
  function extractChosung(str) {
    return Hangul.disassemble(str)
      .filter((char) => "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".includes(char))
      .join("");
  }
  const normalizedRooms = useMemo(
    () =>
      myVisitedRooms.map((room) => ({
        ...room,
        _title: decompose(room.title || ""),
        _description: decompose(room.description || ""),
        _chosungTitle: extractChosung(room.title || ""),
        _chosungDescription: extractChosung(room.description || ""),
      })),
    [myVisitedRooms],
  );

  const fuse = useMemo(() => {
    return new Fuse(normalizedRooms, {
      keys: ["_title", "_description", "_chosungTitle", "_chosungDescription"],
      threshold: 0.4,
    });
  }, [normalizedRooms]);

  const decomposedSearchValue = decompose(searchValue || "");
  const decomposedChosungQuery = extractChosung(searchValue || "");

  const filteredRooms = useMemo(() => {
    if (!searchValue) return myVisitedRooms;

    if (/^[ㄱ-ㅎ]+$/.test(searchValue)) {
      return normalizedRooms.filter(
        (room) =>
          room._chosungTitle.includes(decomposedChosungQuery) ||
          room._chosungDescription.includes(decomposedChosungQuery),
      );
    } else {
      return fuse.search(decomposedSearchValue).map((r) => r.item);
    }
  }, [searchValue, decomposedSearchValue, decomposedChosungQuery, fuse, normalizedRooms, myVisitedRooms]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [rooms]);

  useSocket(null, () => {});

  return (
    <>
      <ul>
        {filteredRooms.map((room) => (
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
