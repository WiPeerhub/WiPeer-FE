import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrCreateOwnerId } from "@/utils/getOrCreateOwnerId";

export default function NickNameForm() {
  const [nickName, setNickName] = useState<string>("");
  const navigate = useNavigate();

  const moveToChatRoomList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nickName === "") {
      return;
    }

    getOrCreateOwnerId();
    localStorage.setItem("nickName", nickName);
    navigate("/chatRoomList");
  };

  return (
    <form className="space-y-4" onSubmit={moveToChatRoomList}>
      <div>
        <label htmlFor="nickname" className="mb-2 block text-sm font-medium text-gray-700">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="닉네임을 입력하세요"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          maxLength={20}
          required
        />
        <p className="mt-1 text-xs text-gray-500">최대 20자까지 입력 가능합니다</p>
      </div>

      <button
        type="submit"
        disabled={!nickName.trim()}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        WiPeer 입장하기
      </button>
    </form>
  );
}
