import type React from "react";
import { Key } from "lucide-react";

interface PasswordInputProps {
  password: string;
  isFormValid: boolean;
  onHandelSubmit: (e: any) => void | Promise<void>;
  updatePassword: React.Dispatch<React.SetStateAction<string>>;
  isPrivate: boolean;
}

export default function PasswordInput({
  password,
  isFormValid,
  onHandelSubmit,
  updatePassword,
  isPrivate,
}: PasswordInputProps) {
  return (
    <>
      {isPrivate && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
            방 비밀번호 *
          </label>
          <div className="relative">
            <Key className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="password"
              id="password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => updatePassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && isFormValid) {
                  onHandelSubmit(e);
                }
              }}
              placeholder="비밀번호를 입력하세요"
              className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              maxLength={20}
              required={isPrivate}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500"> 4 ~ 20자 비밀번호를 입력하세요</p>
        </div>
      )}
    </>
  );
}
