import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateRoomPage from "@/pages/CreateRoomPage";
import { useRoomCreationStore } from "@/stores/useRoomCreationStore";
import MyActivityPage from "@/pages/MyActivityPage";

export default function MyActivityLayout() {
  const isRoomCreation = useRoomCreationStore((state) => state.isRoomCreation);

  return (
    <div className="flex h-screen w-[375px] flex-col justify-between border border-gray-200">
      {isRoomCreation && <CreateRoomPage />}
      <Header />
      <main className="h-[calc(100vh-140px)] flex-1">
        <MyActivityPage />
      </main>
      <Footer />
    </div>
  );
}
