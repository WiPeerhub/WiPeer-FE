import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatRoomListPage from "@/pages/ChatRoomListPage";
import CreateRoomPage from "@/pages/CreateRoomPage";
import { useRoomCreationStore } from "@/stores/useRoomCreationStore";
import ChatMyRoomListPage from "@/pages/ChatMyRoomListPage";

export default function ChatRoomListLayout() {
  const [isToggled, setIsToggled] = useState(false);
  const isRoomCreation = useRoomCreationStore((state) => state.isRoomCreation);

  return (
    <div className="h-screen-dvh flex w-[375px] flex-col justify-between border border-gray-200">
      <Header />
      <div className="flex items-center justify-center gap-10 border-b border-gray-200 p-4">
        <button
          onClick={() => setIsToggled(false)}
          className={`relative text-lg font-semibold transition-all duration-200 ${
            !isToggled ? "text-blue-600" : "text-gray-900"
          }`}
        >
          채팅방 목록
          {!isToggled && <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-500" />}
        </button>
        <button
          onClick={() => setIsToggled(true)}
          className={`relative text-lg font-semibold transition-all duration-200 ${
            isToggled ? "text-blue-600" : "text-gray-900"
          }`}
        >
          나의 방{isToggled && <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-500" />}
        </button>
      </div>

      <main className="hide-scrollbar flex-1 overflow-y-auto">
        {!isToggled ? <ChatRoomListPage /> : <ChatMyRoomListPage />}
      </main>
      <Footer />
      {isRoomCreation && <CreateRoomPage />}
    </div>
  );
}
