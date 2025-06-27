import { Routes, Route } from "react-router-dom";
import ChatRoomListLayout from "@/layout/ChatRoomListLayout";
import ChatRoomPageLayout from "./layout/ChatRoomPageLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatRoomListLayout />}></Route>
      <Route path="/page" element={<ChatRoomPageLayout />}></Route>
    </Routes>
  );
}
