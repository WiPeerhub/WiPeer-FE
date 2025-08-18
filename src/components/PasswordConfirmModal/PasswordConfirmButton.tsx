import type { Dispatch, SetStateAction } from "react";

interface PasswordConfirmButtonProps {
  passwordInputOpen: Dispatch<SetStateAction<boolean>>;
  confirmPassword: () => void;
}

export default function PasswordConfirmButton({ passwordInputOpen, confirmPassword }: PasswordConfirmButtonProps) {
  return (
    <div className="mt-4 flex justify-end gap-2">
      <button
        onClick={() => passwordInputOpen(false)}
        className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
      >
        취소
      </button>
      <button onClick={confirmPassword} className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
        확인
      </button>
    </div>
  );
}
