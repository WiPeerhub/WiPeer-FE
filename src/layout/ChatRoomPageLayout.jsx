import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatRoomPage from "@/pages/ChatRoomPage";

export default function ChatRoomPageLayout() {
  return (
    <div className="flex h-full w-full flex-col justify-between border border-gray-200">
      <Header />
      <main className="flex-1">
        <ChatRoomPage />
      </main>
      <Footer />
    </div>
  );
}
