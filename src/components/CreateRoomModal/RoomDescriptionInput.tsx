import type React from "react";

interface RoomDescriptionInputProps {
  description: string;
  updateDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function RoomDescriptionInput({ description, updateDescription }: RoomDescriptionInputProps) {
  return (
    <div>
      <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
        방 설명 (선택사항)
      </label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => updateDescription(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            document.querySelector("form")?.requestSubmit();
          }
        }}
        placeholder="방에 대한 간단한 설명을 입력하세요"
        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        rows={3}
        maxLength={200}
      />
      <p className="mt-1 text-xs text-gray-500">최대 200자까지 입력 가능합니다</p>
    </div>
  );
}
