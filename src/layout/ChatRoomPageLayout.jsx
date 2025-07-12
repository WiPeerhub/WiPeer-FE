import Header from "@/components/Header";
import ChatRoomPage from "@/pages/ChatRoomPage";

export default function ChatRoomPageLayout() {
  return (
    <div className="h-screen-dvh flex w-[375px] flex-col justify-between border border-gray-200">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <ChatRoomPage />
      </main>
    </div>
  );
}
