import { Routes, Route } from "react-router-dom";
import ChatRoomListLayout from "@/layout/ChatRoomListLayout";
import ChatRoomPageLayout from "./layout/ChatRoomPageLayout";
import NickNamePage from "./pages/NickNamePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NickNamePage />}></Route>
      <Route path="/page" element={<ChatRoomPageLayout />}></Route>
      <Route path="/chatRoomList" element={<ChatRoomListLayout />}></Route>
    </Routes>
  );
}
