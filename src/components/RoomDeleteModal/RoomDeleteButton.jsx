export default function RoomDeleteButton({ updateRoomDeleteModalOpen, handleDeleteRoom }) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => updateRoomDeleteModalOpen(false)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        취소
      </button>
      <button
        onClick={handleDeleteRoom}
        className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
      >
        삭제
      </button>
    </div>
  );
}
