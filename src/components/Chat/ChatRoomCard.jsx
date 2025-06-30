import { useNavigate } from "react-router-dom";

export default function ChatRoomCard(props) {
  const { name, description, timestamp } = props;
  const navigate = useNavigate();

  const moveToChatRoom = () => {
    navigate("/page");
  };

  return (
    <li
      onClick={moveToChatRoom}
      className="flex w-full items-center gap-3 border-b border-gray-100 p-4 hover:bg-gray-100"
    >
      <div className="flex flex-1 cursor-pointer items-center justify-between">
        <div className="min-w-0 flex-1">
          <ul className="space-y-1">
            <li className="truncate font-medium text-gray-900">{name}</li>
            <li className="truncate text-sm text-gray-600">{description}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs text-gray-500">{timestamp}</p>
        </div>
      </div>
    </li>
  );
}
