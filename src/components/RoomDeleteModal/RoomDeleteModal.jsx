import { Trash2 } from "lucide-react";
import RoomDeleteButton from "@/components/RoomDeleteModal/RoomDeleteButton";

export default function RoomDeleteModal({ name, updateRoomDeleteModalOpen, handleDeleteRoom }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">채팅방 삭제</h3>
            <p className="text-sm text-gray-500">이 작업은 되돌릴 수 없습니다.</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">
            <span className="font-medium">"{name}"</span> 채팅방을 정말 삭제하시겠습니까?
          </p>
          <p className="mt-2 text-sm text-gray-500">채팅방의 모든 메시지와 데이터가 영구적으로 삭제됩니다.</p>
        </div>
        <RoomDeleteButton updateRoomDeleteModalOpen={updateRoomDeleteModalOpen} handleDeleteRoom={handleDeleteRoom} />
      </div>
    </div>
  );
}
