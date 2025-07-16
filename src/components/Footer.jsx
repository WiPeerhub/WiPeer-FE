import { MessageCircle, Plus, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRoomCreationStore } from "@/stores/useRoomCreationStore";

export default function Footer() {
  const setIsRoomCreation = useRoomCreationStore((state) => state.setIsRoomCreation);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex h-[80px] w-full shrink-0 items-center justify-around border-t border-gray-200 bg-white px-4">
      <button
        onClick={() => navigate("/MyChatRoomListLayout")}
        className="flex cursor-pointer flex-col items-center gap-1"
      >
        <User className="h-6 w-6 text-blue-600" />
        <span className="text-xs font-medium text-blue-600">내 채팅방</span>
      </button>
      <div className="flex h-12 w-12 items-center justify-center">
        {currentPath === "/MyChatRoomListLayout" ? (
          <button
            onClick={setIsRoomCreation}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-600"
          >
            <Plus className="h-8 w-8 text-white" />
          </button>
        ) : (
          <div className="h-12 w-12" />
        )}
      </div>
      <button onClick={() => navigate("/chatRoomList")} className="flex flex-col items-center gap-1">
        <MessageCircle className="h-6 w-6 cursor-pointer text-blue-600" />
        <span className="text-xs text-blue-600">채팅방 목록</span>
      </button>
    </div>
  );
}
