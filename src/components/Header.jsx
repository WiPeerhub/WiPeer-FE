import { Menu, Settings, Search } from "lucide-react";

export default function Header() {
  return (
    <div className="justify-content flex h-[60px] w-full items-center justify-between bg-blue-500 pr-[8px] pl-[8px]">
      <div className="flex items-center gap-3">
        <Menu className="cursor-pointer text-white"></Menu>
        <h1 className="text-xl font-semibold text-white">WiPeer</h1>
      </div>
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-white" />
        <Search className="h-6 w-6 text-white" />
      </div>
    </div>
  );
}
