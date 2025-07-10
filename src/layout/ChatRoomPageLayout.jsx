import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatRoomPage from "@/pages/ChatRoomPage";
import CreateRoomPage from "@/pages/CreateRoomPage";
import { useRoomCreationStore } from "@/stores/useRoomCreationStore";

export default function ChatRoomPageLayout() {
  const isRoomCreation = useRoomCreationStore((state) => state.isRoomCreation);

  return (
    <div className="h-screen-dvh flex w-[375px] flex-col justify-between border border-gray-200">
      <Header />
      <main className="h-[calc(100vh-140px)] flex-1">
        <ChatRoomPage />
      </main>
      <Footer />
      {isRoomCreation && <CreateRoomPage />}
    </div>
  );
}
