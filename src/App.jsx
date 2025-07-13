import { Routes, Route } from "react-router-dom";
import ChatRoomListLayout from "@/layout/ChatRoomListLayout";
import ChatRoomPageLayout from "@/layout/ChatRoomPageLayout";
import NickNamePage from "@/pages/NickNamePage";
import MyActivityLayout from "@/layout/MyActivityLayout";
import LoginPage from "@/pages/LoginPage";
import OAuthCallback from "@/pages/OAuthCallback";
import useClientIP from "@/hooks/useClientIP";
import useIPChangeAlert from "@/hooks/useIPChangeAlert";
import { useClientIPStore } from "@/stores/useClientIPStore";
import { Toaster } from "sonner";

export default function App() {
  useClientIP();
  const ip = useClientIPStore((state) => state.ip);
  useIPChangeAlert(ip);

  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <Routes>
        <Route path="/" element={<NickNamePage />}></Route>
        <Route path="/room/:roomId" element={<ChatRoomPageLayout />}></Route>
        <Route path="/chatRoomList" element={<ChatRoomListLayout />}></Route>
        <Route path="/myActivity" element={<MyActivityLayout />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/oauth/callback" element={<OAuthCallback />}></Route>
      </Routes>
    </>
  );
}
