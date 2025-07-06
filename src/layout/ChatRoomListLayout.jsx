import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatRoomListPage from "@/pages/ChatRoomListPage";
import CreateRoomPage from "@/pages/CreateRoomPage";
import { useRoomCreationStore } from "@/stores/useRoomCreationStore";

export default function ChatRoomListLayout() {
  const isRoomCreation = useRoomCreationStore((state) => state.isRoomCreation);

  return (
    <div className="flex h-screen w-[375px] flex-col justify-between border border-gray-200">
      {isRoomCreation && <CreateRoomPage />}
      <Header />
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">채팅방 목록</h2>
      </div>
      <main className="mb-auto overflow-y-auto">
        <ChatRoomListPage />
      </main>
      <Footer />
    </div>
  );
}
