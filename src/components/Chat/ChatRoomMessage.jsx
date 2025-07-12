import { useState } from "react";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { API } from "@/constants/api";
import EditMessageMenu from "@/components/Chat/EditMessageMenu";
import ShowFileList from "@/components/Chat/ShowFileList";
import UpdateMessage from "@/components/Chat/UpdateMessage";

export default function ChatRoomMessage(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { messageId, onUpdateMessage, roomId, type, username, timestamp, message, files = [], onImageLoad } = props;
  const [newMessage, setNewMessage] = useState(message);
  const date = new Date(timestamp);
  const formattedTimestamp = formatTimestamp(date);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleUpdateMessage = async () => {
    try {
      const res = await fetch(API.updateMessage(roomId, messageId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newMessage,
          ownerId: localStorage.getItem("ownerId"),
        }),
      });

      const upddatedMessage = await res.json();

      if (!res.ok) {
        console.error("메시지 수정 실패:", upddatedMessage.message);
        return;
      }

      console.log("message 수정 완료: ", upddatedMessage.data);
      onUpdateMessage(upddatedMessage.data.message);
      setIsEditing(false);
    } catch (err) {
      console.error("메시지 전송 실패:", err);
    }
  };

  return (
    <div
      className="relative flex gap-3 hover:bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && <EditMessageMenu onEdit={() => setIsEditing(true)} />}
      <div className="flex-1 p-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">{username}</span>
          <span className="text-xs text-gray-500">{formattedTimestamp}</span>
        </div>
        {isEditing ? (
          <UpdateMessage
            newMessage={newMessage}
            updateMessage={setNewMessage}
            handleUpdateMessage={handleUpdateMessage}
            setIsEditing={setIsEditing}
          />
        ) : (
          (type === "message" || (type === "mixed" && message)) && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">{message}</p>
          )
        )}
        {type === "mixed" && files.length > 0 && <ShowFileList files={files} onImageLoad={onImageLoad} />}
      </div>
    </div>
  );
}
