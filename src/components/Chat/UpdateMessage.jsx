export default function UpdateMessage({
  newMessage,
  updateMessage,
  handleUpdateMessage,
  setIsEditing,
  onEditMessageMenuLoad,
  updatedMessageRef,
}) {
  return (
    <div ref={updatedMessageRef} className="mt-1 flex flex-col gap-1">
      <div className="border-t border-gray-200 bg-blue-100 p-3">
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
          <textarea
            type="text"
            value={newMessage}
            placeholder="메시지를 입력하세요..."
            className="flex-1 resize-none overflow-hidden bg-transparent py-2 text-gray-700 outline-none"
            onChange={(e) => updateMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                onEditMessageMenuLoad();
                handleUpdateMessage();
              }
            }}
            rows={1}
          />
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={handleUpdateMessage}
            className="rounded-md bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
          >
            저장
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
