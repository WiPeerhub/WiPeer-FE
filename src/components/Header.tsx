import { ArrowLeft, Search } from "lucide-react";
import { useSearchValueStore } from "@/stores/useSearchValueStore";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const { searchValue, setSearchValue } = useSearchValueStore();
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    const currentPath = location.pathname;
    if (currentPath === "/chatRoomList") {
      navigate(-1);
    } else if (currentPath.startsWith("/room")) {
      navigate(-1);
    } else if (currentPath === "/MyChatRoomListLayout") {
      navigate(-1);
    }
  };

  return (
    <div className="relative z-10 h-[60px] w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex w-10 justify-start">
          <button
            onClick={goBack}
            className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100"
            title="뒤로가기"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              value={searchValue}
              placeholder="채팅방 검색..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="w-10" />
      </div>
    </div>
  );
}
