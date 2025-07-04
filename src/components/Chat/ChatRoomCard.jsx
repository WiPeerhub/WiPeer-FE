import { useNavigate } from "react-router-dom";
import { Lock, Globe, Clock, Trash2 } from "lucide-react";
import { API } from "@/constants/api";
import { getOrCreateOwnerId } from "@/utils/getOrCreateOwnerId";

export default function ChatRoomCard(props) {
  const { isPrivate, roomId, name, description, timestamp } = props;
  const navigate = useNavigate();

  const moveToChatRoom = () => {
    navigate(`/room/${roomId}`);
  };

  const handleDeleteRoom = async () => {
    const ownerId = getOrCreateOwnerId();
    try {
      await fetch(API.deleteRoom(roomId), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownerId }),
      });
    } catch (err) {
      console.error("삭제 에러:", err.message);
    }
  };

  return (
    <li className="group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50">
      <div onClick={moveToChatRoom} className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex-shrink-0">
          {isPrivate ? <Lock className="h-5 w-5 text-gray-500" /> : <Globe className="h-5 w-5 text-gray-500" />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-gray-900">{name}</h3>
          {description && <p className="truncate text-sm text-gray-500">{description}</p>}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="h-3 w-3" />
          <span>{timestamp || "활동 없음"}</span>
        </div>
      </div>
      <button
        onClick={(e) => handleDeleteRoom(e)}
        className="cursor-pointer rounded-full p-1 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-red-100"
        title="채팅방 삭제"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </button>
    </li>
  );
}
