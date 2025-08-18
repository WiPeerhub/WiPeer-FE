import type { RefObject, ChangeEvent } from "react";

interface HiddenFileInputProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function HiddenFileInput({ fileInputRef, handleFileSelect }: HiddenFileInputProps) {
  return (
    <input
      ref={fileInputRef}
      type="file"
      multiple
      accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
      onChange={handleFileSelect}
      className="hidden"
    />
  );
}
