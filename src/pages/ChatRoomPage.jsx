import ChatRoomMessage from "@/components/Chat/ChatRoomMessage";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNickNameStore } from "@/stores/useNicknameStore";
import useSocket from "@/hooks/useSocket";

export default function ChatRoomPage() {
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const nickName = useNickNameStore((state) => state.nickName);
  const { roomId } = useParams();
  const sendMessage = useSocket(roomId, setConversation);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleSendingMessage = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
    setConversation([
      ...conversation,
      {
        id: Date.now().toString(),
        username: nickName,
        timestamp: new Date().toLocaleTimeString(),
        message,
      },
    ]);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex-1 space-y-4 overflow-y-auto py-1">
        {conversation.map((message) => (
          <ChatRoomMessage
            key={message.id}
            username={message.username}
            timestamp={message.timestamp}
            message={message.message}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <input
            type="text"
            value={message}
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-transparent text-gray-700 outline-none"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendingMessage();
            }}
          />
          <Send onClick={handleSendingMessage} className="h-5 w-5 cursor-pointer text-blue-600" />
        </div>
      </div>
    </div>
  );
}
