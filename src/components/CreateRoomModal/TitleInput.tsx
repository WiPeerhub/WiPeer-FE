import type React from "react";
import { useRef } from "react";
import { Hash } from "lucide-react";

interface TitleInputProps {
  title: string;
  isFormValid: boolean;
  onHandelSubmit: (e: any) => void | Promise<void>;
  updateTitle: React.Dispatch<React.SetStateAction<string>>;
}

export default function TitleInput({ title, isFormValid, onHandelSubmit, updateTitle }: TitleInputProps) {
  return (
    <div>
      <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
        방 제목 *
      </label>
      <div className="relative">
        <Hash className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isFormValid) {
              e.preventDefault();
              onHandelSubmit(e);
            }
          }}
          placeholder="방 제목을 입력하세요"
          className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          maxLength={50}
          required
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">최대 50자까지 입력 가능합니다</p>
    </div>
  );
}
