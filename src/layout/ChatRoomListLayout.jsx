import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatRoomList from "@/pages/ChatRoomList";

export default function ChatRoomListLayout() {
  return (
    <div className="flex h-full w-full flex-col justify-between border border-gray-200">
      <Header />
      <main className="mb-auto">
        <ChatRoomList />
      </main>
      <Footer />
    </div>
  );
}
