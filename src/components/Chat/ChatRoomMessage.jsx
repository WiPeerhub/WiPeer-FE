import { useState } from "react";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { API } from "@/constants/api";
import EditMessageMenu from "@/components/Chat/EditMessageMenu";
import ShowFileList from "@/components/Chat/ShowFileList";
import UpdateMessage from "@/components/Chat/UpdateMessage";
import SelectEmoji from "@/components/Chat/SelectEmoji";

export default function ChatRoomMessage(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [reactions, setReactions] = useState({});
  const {
    messageId,
    messageOwnerId,
    roomId,
    type,
    username,
    timestamp,
    message,
    files = [],
    onImageLoad,
    onEditMessageMenuLoad,
  } = props;
  const [newMessage, setNewMessage] = useState(message);
  const date = new Date(timestamp);
  const formattedTimestamp = formatTimestamp(date);
  const ownerId = localStorage.getItem("ownerId");

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
          ownerId,
        }),
      });

      const updatedMessage = await res.json();

      if (!res.ok) {
        console.error("메시지 수정 실패:", updatedMessage.message);
        return;
      }

      setIsHovered(false);
      setIsEditing(false);
    } catch (err) {
      console.error("메시지 전송 실패:", err);
    }
  };

  const handleDeleteMessage = () => {
    const deleteMessage = async () => {
      try {
        await fetch(API.deleteMessage(roomId, messageId), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ownerId }),
        });
      } catch (err) {
        console.error("메시지 전송 실패:", err);
      }
    };

    deleteMessage();
  };

  return (
    <div
      className="relative flex gap-3 hover:bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute right-2 flex items-center gap-1">
        {isHovered && (
          <SelectEmoji
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            updateReactions={setReactions}
            reactions={reactions}
            roomId={roomId}
            messageId={messageId}
            setIsHovered={setIsHovered}
          />
        )}
        {isHovered && ownerId === messageOwnerId && (
          <EditMessageMenu onEdit={() => setIsEditing(true)} onDelete={handleDeleteMessage} />
        )}
      </div>
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
            onEditMessageMenuLoad={onEditMessageMenuLoad}
          />
        ) : (
          (type === "message" || (type === "mixed" && message)) && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">{message}</p>
          )
        )}
        {type === "mixed" && files.length > 0 && <ShowFileList files={files} onImageLoad={onImageLoad} />}
        {reactions && Object.keys(reactions).length > 0 && (
          <ul className="mt-1 flex gap-1">
            {Object.entries(reactions).map(([emoji, users]) => (
              <li
                key={emoji}
                className="flex cursor-pointer items-center gap-1 rounded-full border border-blue-300 bg-blue-100 px-2 py-1 text-xs transition-colors hover:bg-blue-200"
              >
                <span>{emoji}</span>
                <span className="text-[10px] text-blue-700">{users.length}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
