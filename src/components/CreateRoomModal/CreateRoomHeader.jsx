import { useRoomCreationStore } from "../../stores/useRoomCreationStore";
import { X } from "lucide-react";

export default function CreateRoomHeader() {
  const setIsRoomCreation = useRoomCreationStore((state) => state.setIsRoomCreation);

  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900">새 채팅방 만들기</h2>
      <button onClick={setIsRoomCreation} className="rounded-full p-1 transition-colors hover:bg-gray-100">
        <X className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
}
