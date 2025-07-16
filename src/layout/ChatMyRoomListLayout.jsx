import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRoomCreationStore } from "@/stores/useRoomCreationStore";
import ChatMyRoomListPage from "@/pages/ChatMyRoomListPage";
import CreateRoomPage from "@/pages/CreateRoomPage";

export default function ChatMyRoomListLayout() {
  const isRoomCreation = useRoomCreationStore((state) => state.isRoomCreation);

  return (
    <div className="h-screen-dvh flex w-[375px] flex-col justify-between border border-gray-200">
      <Header />
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">내 채팅방</h2>
      </div>
      <main className="hide-scrollbar flex-1 overflow-y-auto">
        <ChatMyRoomListPage />
      </main>
      <Footer />
      {isRoomCreation && <CreateRoomPage />}
    </div>
  );
}
