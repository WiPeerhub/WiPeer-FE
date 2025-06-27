import { useNavigate } from "react-router-dom";

export default function ChatRoomCard(props) {
  const { avatar, name, lastMessage, timestamp, unreadCount } = props;
  const navigate = useNavigate();

  const moveToChatRoom = () => {
    navigate("/page");
  };

  return (
    <li
      onClick={moveToChatRoom}
      className="flex w-full items-center gap-3 border-b border-gray-100 p-4 hover:bg-gray-100"
    >
      <div className="relative cursor-pointer">
        <img src={avatar} alt="avatar" className="h-12 w-12 rounded-full object-cover" />
        {unreadCount && (
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            {unreadCount}
          </div>
        )}
      </div>
      <div className="flex flex-1 cursor-pointer items-center justify-between">
        <div className="min-w-0 flex-1">
          <ul className="space-y-1">
            <li className="truncate font-medium text-gray-900">{name}</li>
            <li className="truncate text-sm text-gray-600">{lastMessage}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs text-gray-500">{timestamp}</p>
        </div>
      </div>
    </li>
  );
}
