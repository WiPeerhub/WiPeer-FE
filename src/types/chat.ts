export interface ConversationMessage {
  id: string;
  type: "mixed" | "message" | string;
  ownerId: string | null;
  username: string | null;
  timestamp: string;
  message: string;
  files?: UploadedFileInfo[];
  reactions?: number;
}

export interface SelectedFileItem {
  id: number;
  file: File;
  name: string;
  size: number;
  type: string;
  preview: string | null;
  isUploading: boolean;
  abortController: AbortController;
}

export interface UploadedFileInfo {
  id: number;
  fileUrl: string;
  downloadUrl: string;
  fileName: string;
  fileType: string;
  preview: string | null;
}
