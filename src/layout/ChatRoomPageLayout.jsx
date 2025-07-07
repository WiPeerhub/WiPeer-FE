import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatRoomPage from "@/pages/ChatRoomPage";
import CreateRoomPage from "@/pages/CreateRoomPage";
import useClientIP from "@/hooks/useClientIP";
import useIPChangeAlert from "@/hooks/useIPChangeAlert";
import { useRoomCreationStore } from "@/stores/useRoomCreationStore";
import { Toaster } from "sonner";

export default function ChatRoomPageLayout() {
  const isRoomCreation = useRoomCreationStore((state) => state.isRoomCreation);
  const clientIP = useClientIP();
  useIPChangeAlert(clientIP);

  return (
    <div className="flex h-screen w-[375px] flex-col justify-between border border-gray-200">
      <Toaster />
      {isRoomCreation && <CreateRoomPage />}
      <Header />
      <main className="h-[calc(100vh-140px)] flex-1">
        <ChatRoomPage />
      </main>
      <Footer />
    </div>
  );
}
