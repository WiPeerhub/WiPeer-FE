import { useEffect, useRef, useMemo, useState } from "react";
import { useRoomListStore } from "@/stores/useRoomListStore";
import ChatRoomCard from "@/components/Chat/ChatRoomCard";
import useClientIP from "@/hooks/useClientIP";
import useSocket from "@/hooks/useSocket";
import { useSearchValueStore } from "@/stores/useSearchValueStore";
import Hangul from "hangul-js";
import Fuse from "fuse.js";
import { useMyRoomStore } from "@/stores/useMyRoomStore";

export default function ChatMyRoomListPage() {
  const rooms = useRoomListStore((state) => state.rooms);
  const { myRooms, fetchMyRooms } = useMyRoomStore();
  const bottomRef = useRef(null);
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

  const decompose = (str) => Hangul.disassemble(str).join("");
  function extractChosung(str) {
    return Hangul.disassemble(str)
      .filter((char) => "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".includes(char))
      .join("");
  }
  const normalizedRooms = useMemo(
    () =>
      myRooms.map((room) => ({
        ...room,
        _title: decompose(room.title || ""),
        _description: decompose(room.description || ""),
        _chosungTitle: extractChosung(room.title || ""),
        _chosungDescription: extractChosung(room.description || ""),
      })),
    [myRooms],
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
    if (!searchValue) return myRooms;

    if (/^[ㄱ-ㅎ]+$/.test(searchValue)) {
      return normalizedRooms.filter(
        (room) =>
          room._chosungTitle.includes(decomposedChosungQuery) ||
          room._chosungDescription.includes(decomposedChosungQuery),
      );
    } else {
      return fuse.search(decomposedSearchValue).map((r) => r.item);
    }
  }, [searchValue, decomposedSearchValue, decomposedChosungQuery, fuse, normalizedRooms, myRooms]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [rooms]);

  useSocket(null, () => {});

  return (
    <>
      <ul>
        {filteredRooms
          .sort((a, b) => a.title.localeCompare(b.title, "ko"))
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
      <div ref={bottomRef} />
    </>
  );
}
