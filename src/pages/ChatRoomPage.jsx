import ChatRoomMessage from "@/components/Chat/ChatRoomMessage";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UploadedFileList from "@/components/FileUpload/UploadedFileList";
import FileUploadButton from "@/components/FileUpload/FileUploadButton";
import HiddenFileInput from "@/components/FileUpload/HiddenFileInput";
import { useParams } from "react-router-dom";
import { useNickNameStore } from "@/stores/useNicknameStore";
import useSocket from "@/hooks/useSocket";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";

export default function ChatRoomPage() {
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const nickName = useNickNameStore((state) => state.nickName);
  const { roomId } = useParams();
  const sendMessage = useSocket(roomId, setConversation);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendingMessage = async () => {
    const hasMessage = message.trim().length > 0;
    const hasFile = selectedFiles.length > 0;

    if (!hasMessage && !hasFile) return;

    const uploadedFiles = [];

    if (hasFile) {
      for (const fileItem of selectedFiles) {
        const { fileUrl, downloadUrl } = await uploadFileToS3(fileItem);

        const fileInfoObj = {
          fileUrl,
          downloadUrl,
          fileName: fileItem.name,
          fileType: fileItem.type,
          preview: fileItem.preview,
        };

        uploadedFiles.push(fileInfoObj);
      }

      setSelectedFiles([]);
    }

    const combinedMessage = {
      id: Date.now().toString(),
      type: hasFile ? "mixed" : "message",
      username: nickName,
      timestamp: new Date().toLocaleTimeString(),
      message: hasMessage ? message : "",
      files: uploadedFiles.length > 0 ? uploadedFiles : [],
    };

    sendMessage(combinedMessage);
    setMessage("");
    setConversation((prev) => [...prev, combinedMessage]);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex-1 space-y-4 overflow-y-auto py-1">
        {conversation.map((message) => (
          <ChatRoomMessage
            key={message.id}
            type={message.type}
            username={message.username}
            timestamp={message.timestamp}
            message={message.message}
            files={message.files}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {selectedFiles.length > 0 && (
        <UploadedFileList selectedFiles={selectedFiles} updateSelectedFiles={setSelectedFiles} />
      )}

      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <FileUploadButton fileInputRef={fileInputRef} />
          <HiddenFileInput fileInputRef={fileInputRef} handleFileSelect={handleFileSelect} />
          <input
            type="text"
            value={message}
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-transparent text-gray-700 outline-none"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendingMessage();
            }}
          />
          <Send onClick={handleSendingMessage} className="h-5 w-5 cursor-pointer text-blue-600" />
        </div>
      </div>
    </div>
  );
}
