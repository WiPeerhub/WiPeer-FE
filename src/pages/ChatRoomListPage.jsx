import { useEffect, useRef, useMemo } from "react";
import { useRoomListStore } from "@/stores/useRoomListStore";
import ChatRoomCard from "@/components/Chat/ChatRoomCard";
import useClientIP from "@/hooks/useClientIP";
import useSocket from "@/hooks/useSocket";
import { useSearchValueStore } from "@/stores/useSearchValueStore";
import Hangul from "hangul-js";
import Fuse from "fuse.js";
import { getUserVisitedRooms, updateRoomIP } from "@/utils/roomAPI";
import { getWifiMap } from "@/utils/getOrSaveWifiID";

export default function ChatRoomListPage() {
  const { rooms, fetchRooms } = useRoomListStore();
  const bottomRef = useRef(null);
  const searchValue = useSearchValueStore((state) => state.searchValue);
  const clientIP = useClientIP();

  useEffect(() => {
    const syncVisitedRoomsIP = async () => {
      const userId = localStorage.getItem("ownerId");
      const wifiMap = getWifiMap();
      if (!userId || !clientIP || !wifiMap) return;

      try {
        const { rooms } = await getUserVisitedRooms(userId);

        let ipChanged = false;

        for (const room of rooms) {
          const isSameWifi = wifiMap[room.wifiId] !== undefined;
          const isDifferentIP = room.ip !== clientIP;

          if (isSameWifi && isDifferentIP) {
            console.log(`[IP 갱신 조건 충족] ${room.title}`);
            await updateRoomIP({
              ownerId: room.ownerId,
              roomId: room.roomId,
              ip: clientIP,
              userId,
            });

            ipChanged = true;
            console.log(`[IP 변경됨] ${room.title}: ${room.ip} → ${clientIP}`);
          }
        }

        if (ipChanged) {
          fetchRooms(clientIP);
        }
      } catch (err) {
        console.error("방 IP 동기화 실패:", err.message);
      }
    };

    syncVisitedRoomsIP();
  }, [clientIP]);

  const decompose = (str) => Hangul.disassemble(str).join("");
  function extractChosung(str) {
    return Hangul.disassemble(str)
      .filter((char) => "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".includes(char))
      .join("");
  }
  const normalizedRooms = useMemo(
    () =>
      rooms.map((room) => ({
        ...room,
        _title: decompose(room.title || ""),
        _description: decompose(room.description || ""),
        _chosungTitle: extractChosung(room.title || ""),
        _chosungDescription: extractChosung(room.description || ""),
      })),
    [rooms],
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
    if (!searchValue) return rooms;

    if (/^[ㄱ-ㅎ]+$/.test(searchValue)) {
      return normalizedRooms.filter(
        (room) =>
          room._chosungTitle.includes(decomposedChosungQuery) ||
          room._chosungDescription.includes(decomposedChosungQuery),
      );
    } else {
      return fuse.search(decomposedSearchValue).map((r) => r.item);
    }
  }, [searchValue, decomposedSearchValue, decomposedChosungQuery, fuse, normalizedRooms, rooms]);

  useEffect(() => {
    if (clientIP !== "") {
      fetchRooms(clientIP);
    }
  }, [clientIP]);

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
