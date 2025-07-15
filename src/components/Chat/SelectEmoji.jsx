import { Smile } from "lucide-react";
import { EMOJI_LIST } from "@/constants/emojiList";

export default function SelectEmoji({ showEmojiPicker, setShowEmojiPicker, updateReactions, reactions }) {
  const ownerId = localStorage.getItem("ownerId");

  const handleSelectEmoji = (emoji) => {
    setShowEmojiPicker(false);

    updateReactions((prev) => {
      const users = prev[emoji] || [];

      if (users.includes(ownerId)) return prev;

      return {
        ...prev,
        [emoji]: [...users, ownerId],
      };
    });
  };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="relative">
        <button
          onClick={() => setShowEmojiPicker(true)}
          className="rouned-md p-2 transition-colors hover:bg-gray-100"
          title="반응 추가"
        >
          <Smile className="h-3 w-3 text-gray-500" />
        </button>
        {showEmojiPicker && (
          <div className="absolute top-full right-0 z-10 mt-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
            <div className="flex gap-1">
              {EMOJI_LIST.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleSelectEmoji(emoji)}
                  className="rounded p-1 text-lg hover:bg-gray-100"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
