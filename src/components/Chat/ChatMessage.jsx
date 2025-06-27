export default function ChatRoomMessage(props) {
  const { avatar, username, timestamp, message } = props;

  return (
    <div className="flex gap-3 rounded-lg p-2 hover:bg-gray-50">
      <div>
        <img src={avatar} alt="avatar" className="h-10 w-10 rounded-lg object-cover" />
      </div>
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">{username}</span>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        <div>
          <p className="text-sm leading-relaxed text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  );
}
