import ChatRoomMessage from "../components/Chat/ChatMessage";
import { Send } from "lucide-react";

const messages = [
  {
    id: "1",
    avatar: "/placeholder.svg?height=40&width=40",
    username: "이드리스",
    timestamp: "오후 3:15",
    message: "안녕하세요! 새로운 프로젝트에 대해 논의해볼까요?",
  },
  {
    id: "2",
    avatar: "/placeholder.svg?height=40&width=40",
    username: "레베카",
    timestamp: "오후 3:18",
    message: "좋은 아이디어네요. 어떤 기술 스택을 사용할 예정인가요?",
  },
  {
    id: "3",
    avatar: "/placeholder.svg?height=40&width=40",
    username: "메릴",
    timestamp: "오후 3:20",
    message: "React와 Next.js를 사용하면 어떨까요? 최근에 많이 사용되고 있어서 좋을 것 같아요.",
  },
  {
    id: "4",
    avatar: "/placeholder.svg?height=40&width=40",
    username: "아서",
    timestamp: "오후 3:22",
    message: "동의합니다! TypeScript도 함께 사용하면 더 안정적일 것 같네요.",
  },
  {
    id: "4",
    avatar: "/placeholder.svg?height=40&width=40",
    username: "아서",
    timestamp: "오후 3:22",
    message: "동의합니다! TypeScript도 함께 사용하면 더 안정적일 것 같네요.",
  },
];

export default function ChatRoomPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* 채팅 메시지 영역 */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatRoomMessage
            key={message.id}
            avatar={message.avatar}
            username={message.username}
            timestamp={message.timestamp}
            message={message.message}
          />
        ))}
      </div>

      {/* 메시지 입력 영역 - 하단 고정 */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-transparent text-gray-700 outline-none"
          />
          <Send className="h-5 w-5 cursor-pointer text-blue-600" />
        </div>
      </div>
    </div>
  );
}
