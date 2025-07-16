import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Users, Clock, Trash2 } from "lucide-react";
import { API } from "@/constants/api";
import { deleteRoom } from "@/utils/roomAPI";
import { getOrCreateOwnerId } from "@/utils/getOrCreateOwnerId";
import PasswordModal from "@/components/PasswordConfirmModal/PasswordModal";
import RoomDeleteModal from "@/components/RoomDeleteModal/RoomDeleteModal";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { decrementRoomCount } from "@/utils/setOrGetNicknameStats";
import useClientIP from "@/hooks/useClientIP";
import { updateRoomIP } from "@/utils/roomAPI";

export default function ChatRoomCard(props) {
  const { isPrivate, roomId, name, description, password, roomOwnerId } = props;
  const [lastMessagetimestamp, setLastMessagetimestamp] = useState("");
  const [isPaswordInputOpen, setIsPaswordInputOpen] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [roomDeleteModalOpen, setRoomDeleteModalOpen] = useState(false);
  const nickName = localStorage.getItem("nickName");
  const ownerId = getOrCreateOwnerId();
  const clientIP = useClientIP();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLastMessage = async () => {
      try {
        const res = await fetch(API.getLastMessage(roomId));
        const lastMessageData = await res.json();
        const rawTimeStamp = lastMessageData.data?.timestamp;

        if (!rawTimeStamp) {
          setLastMessagetimestamp("활동 없음");
        } else {
          const date = new Date(rawTimeStamp);
          const formattedTimestamp = formatTimestamp(date);
          setLastMessagetimestamp(formattedTimestamp);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLastMessage();
  }, [roomId]);

  const moveToChatRoom = () => {
    if (password) {
      setIsPaswordInputOpen(true);
      return;
    }

    navigate(`/room/${roomId}`);
  };

  const handleDeleteRoom = async () => {
    try {
      await deleteRoom({ ownerId, roomId });

      decrementRoomCount(nickName);
    } catch (err) {
      console.error("삭제 에러:", err.message);
    }
  };

  const handleModalConfirm = () => {
    if (inputPassword === password) {
      setIsPaswordInputOpen(false);
      navigate(`/room/${roomId}`);
    } else {
      setErrorMessage("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleRoomShare = async (e) => {
    e.stopPropagation();

    try {
      await updateRoomIP({ ownerId, roomId, ip: clientIP });
    } catch (err) {
      console.error("방 공유 실패", err.message);
    }
  };

  return (
    <>
      <li className="group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50">
        <div onClick={moveToChatRoom} className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex-shrink-0">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isPrivate ? "bg-orange-100" : "bg-blue-100"
              }`}
            >
              {isPrivate ? <Lock className="h-5 w-5 text-orange-600" /> : <Users className="h-5 w-5 text-blue-500" />}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium text-gray-900">{name}</h3>
            {description && <p className="truncate text-sm text-gray-500">{description}</p>}
          </div>
          {currentPath === "/MyChatRoomListLayout" && (
            <div className="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-green-600 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-green-50">
              <button onClick={handleRoomShare} className="cursor-pointer">
                공유
              </button>
            </div>
          )}

          {ownerId === roomOwnerId && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRoomDeleteModalOpen(true);
              }}
              className="cursor-pointer rounded-full p-1.5 group-hover:opacity-100 hover:bg-red-100"
              title="채팅방 삭제"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            <span>{lastMessagetimestamp}</span>
          </div>
        </div>
      </li>
      {roomDeleteModalOpen && (
        <RoomDeleteModal
          name={name}
          updateRoomDeleteModalOpen={setRoomDeleteModalOpen}
          handleDeleteRoom={handleDeleteRoom}
        />
      )}
      {isPaswordInputOpen && (
        <PasswordModal
          errorMessage={errorMessage}
          inputPassword={inputPassword}
          passwordInputOpen={setIsPaswordInputOpen}
          updateInputPassword={setInputPassword}
          confirmPassword={handleModalConfirm}
        />
      )}
    </>
  );
}
