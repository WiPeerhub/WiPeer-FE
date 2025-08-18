import { Globe, Lock } from "lucide-react";
import type React from "react";
import PasswordInput from "@/components/CreateRoomModal/PasswordInput";

interface PrivacySelectorProps {
  isPrivate: boolean;
  isFormValid: boolean;
  onHandelSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  updateIsPrivate: (value: boolean) => void;
  password: string;
  updatePassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function PrivacySelector({
  isPrivate,
  isFormValid,
  onHandelSubmit,
  updateIsPrivate,
  password,
  updatePassword,
}: PrivacySelectorProps) {
  return (
    <>
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">방 공개 설정</label>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50">
            <input
              type="radio"
              name="privacy"
              checked={!isPrivate}
              onChange={() => updateIsPrivate(false)}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Globe className="mr-3 ml-3 h-5 w-5 text-gray-500" />
            <div>
              <div className="font-medium text-gray-900">공개방</div>
              <div className="text-sm text-gray-500">누구나 참여할 수 있습니다</div>
            </div>
          </label>
          <label className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50">
            <input
              type="radio"
              name="privacy"
              checked={isPrivate}
              onChange={() => updateIsPrivate(true)}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Lock className="mr-3 ml-3 h-5 w-5 text-gray-500" />
            <div>
              <div className="font-medium text-gray-900">비공개방</div>
              <div className="text-sm text-gray-500">초대받은 사람만 참여할 수 있습니다</div>
            </div>
          </label>
        </div>
      </div>
      <PasswordInput
        password={password}
        isFormValid={isFormValid}
        onHandelSubmit={onHandelSubmit}
        updatePassword={updatePassword}
        isPrivate={isPrivate}
      />
    </>
  );
}
