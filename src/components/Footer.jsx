import { MessageCircle, Plus, Home } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex h-[80px] w-full items-center justify-around border-t border-gray-200 bg-white px-4">
      <div className="flex cursor-pointer flex-col items-center gap-1">
        <MessageCircle className="h-6 w-6 text-blue-600" />
        <span className="text-xs font-medium text-blue-600">내 활동</span>
      </div>
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-600">
        <Plus className="h-6 w-6 text-white" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <Home className="h-6 w-6 cursor-pointer text-blue-600" />
        <span className="text-xs text-blue-600">홈</span>
      </div>
    </div>
  );
}
