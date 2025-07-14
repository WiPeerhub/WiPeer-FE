import { Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/main" element={<NickNamePage />} />
        <Route path="/room/:roomId" element={<ChatRoomPageLayout />} />
        <Route path="/chatRoomList" element={<ChatRoomListLayout />} />
        <Route path="/myActivity" element={<MyActivityLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
      </Routes>
    </>
  );
}
