import { useState, useRef, useEffect, type Dispatch, type SetStateAction } from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";

interface EditMessageMenuProps {
  setShowEmojiPicker: Dispatch<SetStateAction<boolean>>;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EditMessageMenu({ setShowEmojiPicker, onEdit, onDelete }: EditMessageMenuProps) {
  const [isEditOrRemoveModal, setIsEditOrRemoveModal] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsEditOrRemoveModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="relative">
        <button
          onClick={() => {
            setIsEditOrRemoveModal(!isEditOrRemoveModal);
            setShowEmojiPicker(false);
          }}
          className="rounded-md p-2 transition-colors hover:bg-gray-100"
        >
          <MoreVertical className="h-3 w-3 text-gray-500" />
        </button>
      </div>
      {isEditOrRemoveModal && (
        <div
          ref={menuRef}
          className="absolute top-0 right-0 z-50 w-24 rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
        >
          <button
            className="flex w-full items-center gap-2 rounded-md px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-100"
            onClick={() => {
              setIsEditOrRemoveModal(false);
              onEdit();
            }}
          >
            <Edit className="size h-3 w-3 text-xs" />
            편집
          </button>
          <button
            className="flex w-full items-center gap-2 rounded-md px-3 py-1 text-xs text-red-600 transition-colors hover:bg-red-50"
            onClick={() => {
              setIsEditOrRemoveModal(false);
              onDelete();
            }}
          >
            <Trash2 className="h-3 w-3 text-xs" />
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
