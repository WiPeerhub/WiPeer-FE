import { getMessageCountByNickName, getRoomCountByNickName } from "@/utils/setOrGetNicknameStats";
import { TrendingUp } from "lucide-react";

export default function MyActivityStatic() {
  const nickName = localStorage.getItem("nickName");
  const messageCount = getMessageCountByNickName(nickName);
  const roomCount = getRoomCountByNickName(nickName);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">활동 통계</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-blue-50 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{messageCount}</div>
          <div className="mt-1 text-sm text-gray-600">총 메시지</div>
        </div>
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{roomCount}</div>
          <div className="mt-1 text-sm text-gray-600">만든 채팅방</div>
        </div>
      </div>
    </div>
  );
}
