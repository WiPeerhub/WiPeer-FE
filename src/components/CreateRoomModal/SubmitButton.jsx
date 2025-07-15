import { useRoomCreationStore } from "@/stores/useRoomCreationStore";

export default function SubmitButton({ isFormValid }) {
  const setIsRoomCreation = useRoomCreationStore((state) => state.setIsRoomCreation);

  return (
    <div className="flex gap-3 pt-4">
      <button
        type="submit"
        disabled={!isFormValid}
        className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        방 만들기
      </button>
      <button
        type="button"
        onClick={setIsRoomCreation}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        취소
      </button>
    </div>
  );
}
