import { User } from "lucide-react";
import NickNameForm from "@/components/NickName/NickNameForm";

export default function NickNamePage() {
  return (
    <div className="justify-cente flex h-screen w-[375px] items-center">
      <div className="w-full rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">채팅방 입장</h1>
          <p className="text-gray-600">사용할 닉네임을 입력해주세요</p>
        </div>
        <NickNameForm />
      </div>
    </div>
  );
}
