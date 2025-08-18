import { Paperclip } from "lucide-react";
import type { RefObject } from "react";

interface FileUploadButtonProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export default function FileUploadButton({ fileInputRef }: FileUploadButtonProps) {
  return (
    <button
      onClick={() => fileInputRef.current?.click()}
      className="rounded-full p-2 transition-colors hover:bg-gray-200"
      title="파일 첨부"
    >
      <Paperclip className="h-5 w-5 text-gray-500" />
    </button>
  );
}
