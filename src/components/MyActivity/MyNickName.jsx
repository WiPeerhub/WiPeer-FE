import { User, MessageCircle, Home } from "lucide-react";
import { getAllNickNameStats } from "@/utils/setOrGetNicknameStats";

export default function MyNickName() {
  const nickNameStats = getAllNickNameStats();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <User className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">사용한 닉네임</h2>
      </div>
      <div className="space-y-3">
        {Object.entries(nickNameStats).map(([nickname, stat]) => {
          return (
            <div
              key={nickname}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-sm font-medium text-blue-600">{nickname.charAt(0).toUpperCase()}</span>
                </div>
                <span className="font-medium text-gray-900">{nickname}</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900">{stat.messageCount}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                    <Home className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900">{stat.roomCount}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
