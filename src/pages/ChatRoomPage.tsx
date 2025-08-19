import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ChatRoomMessage from "@/components/Chat/ChatRoomMessage";
import UploadedFileList from "@/components/FileUpload/UploadedFileList";
import FileUploadButton from "@/components/FileUpload/FileUploadButton";
import HiddenFileInput from "@/components/FileUpload/HiddenFileInput";
import type { Room } from "@/types/room";
import type { ConversationMessage, SelectedFileItem, UploadedFileInfo } from "@/types/chat";
import { Send } from "lucide-react";
import useSocket from "@/hooks/useSocket";
import { uploadCompressedFileToS3 } from "@/utils/uploadCompressedFileToS3";
import { recordRoomVisit, getRoomByRoomId } from "@/utils/roomAPI";

export default function ChatRoomPage() {
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [preventAutoScroll, setPreventAutoScroll] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileItem[]>([]);
  const [isFileUploading, setIsFileUpLoading] = useState(false);
  const nickName = localStorage.getItem("nickName");
  const { roomId = "" } = useParams<{ roomId: string }>();
  const sendMessage = useSocket(roomId, setConversation);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (preventAutoScroll) {
      setPreventAutoScroll(false);
      return;
    }

    if (isFirstRender.current && conversation.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
      isFirstRender.current = false;
    } else {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  useEffect(() => {
    const initRoomVisit = async () => {
      const userId = localStorage.getItem("ownerId");

      if (!userId || !roomId) return;

      try {
        const { room } = (await getRoomByRoomId(roomId)) as { room?: Room };
        if (!room || !room.ownerId) return;

        await recordRoomVisit({
          ownerId: room.ownerId,
          roomId,
          userId,
        });
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error("방 입장 기록 실패:", msg);
      }
    };

    initRoomVisit();
  }, [roomId]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      isUploading: true,
      abortController: new AbortController(),
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

    const uploadedFiles: UploadedFileInfo[] = [];

    if (hasFile) {
      setIsFileUpLoading(true);
      for (const fileItem of selectedFiles) {
        const { fileUrl, downloadUrl } = await uploadCompressedFileToS3(fileItem, fileItem.abortController.signal);

        const fileInfoObj: UploadedFileInfo = {
          id: fileItem.id,
          fileUrl,
          downloadUrl,
          fileName: fileItem.name,
          fileType: fileItem.type,
          preview: fileItem.preview,
        };

        uploadedFiles.push(fileInfoObj);
      }

      setSelectedFiles([]);
      setIsFileUpLoading(false);
    }

    const combinedMessage: ConversationMessage = {
      id: Date.now().toString(),
      type: hasFile ? "mixed" : "message",
      ownerId: localStorage.getItem("ownerId"),
      username: nickName,
      timestamp: new Date().toISOString(),
      message: hasMessage ? message : "",
      files: uploadedFiles.length > 0 ? uploadedFiles : [],
    };

    sendMessage(combinedMessage);
    setMessage("");
    setConversation((prev) => [...prev, combinedMessage]);
  };

  const handleImageLoad = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div ref={scrollContainerRef} className="hide-scrollbar flex-1 overflow-y-auto">
        {conversation.map((message) => (
          <ChatRoomMessage
            key={message.id}
            messageOwnerId={message.ownerId}
            messageId={message.id}
            roomId={roomId}
            type={message.type}
            username={message.username}
            timestamp={message.timestamp}
            message={message.message}
            emojis={message.reactions}
            files={message.files}
            onImageLoad={handleImageLoad}
            onEditMessageMenuLoad={handleImageLoad}
            updatePreventAutoScroll={setPreventAutoScroll}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {selectedFiles.length > 0 && (
        <UploadedFileList
          isFileUploading={isFileUploading}
          updateFileUploadingState={setIsFileUpLoading}
          selectedFiles={selectedFiles}
          updateSelectedFiles={setSelectedFiles}
        />
      )}

      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <FileUploadButton fileInputRef={fileInputRef} />
          <HiddenFileInput fileInputRef={fileInputRef} handleFileSelect={handleFileSelect} />
          <textarea
            value={message}
            placeholder="메시지를 입력하세요..."
            className="flex-1 resize-none overflow-hidden bg-transparent py-2 text-gray-700 outline-none"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                handleSendingMessage();
              }
            }}
            rows={1}
          />
          <Send onClick={handleSendingMessage} className="h-5 w-5 cursor-pointer text-blue-600" />
        </div>
      </div>
    </div>
  );
}
