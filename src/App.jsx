import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import ChatRoomListLayout from "@/layout/ChatRoomListLayout";
import ChatRoomPageLayout from "@/layout/ChatRoomPageLayout";
import NickNamePage from "@/pages/NickNamePage";
import useClientIP from "@/hooks/useClientIP";

export default function App() {
  const clientIP = useClientIP();
  const prevIP = useRef("");

  useEffect(() => {
    if (prevIP.current && prevIP.current !== clientIP) {
      alert(`IP가 변경되었습니다!\n이전: ${prevIP.current}\n현재: ${clientIP}`);
    }

    prevIP.current = clientIP;
  }, [clientIP]);

  return (
    <Routes>
      <Route path="/" element={<NickNamePage />}></Route>
      <Route path="/room/:roomId" element={<ChatRoomPageLayout />}></Route>
      <Route path="/chatRoomList" element={<ChatRoomListLayout />}></Route>
    </Routes>
  );
}
