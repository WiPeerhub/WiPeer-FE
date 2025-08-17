export const BASE_URL = import.meta.env.VITE_SERVER_URL as string;

type Id = string;

export const API = {
  GET_CLIENT_IP: `${BASE_URL}/ip`,
  DELETE_S3_File: `${BASE_URL}/upload/delete-files`,
  updateMessage: (roomId: Id, messageId: Id) => `${BASE_URL}/${roomId}/message/${messageId}`,
  updateReactions: (roomId: Id, messageId: Id) => `${BASE_URL}/${roomId}/message/${messageId}/reactions`,
  deleteMessage: (roomId: Id, messageId: Id) => `${BASE_URL}/${roomId}/message/${messageId}`,
  getLastMessage: (roomId: Id) => `${BASE_URL}/last-message/${roomId}`,
  uploadFile: (fileType: string, fileName: string) =>
    `${BASE_URL}/upload/upload-url?fileType=${fileType}&fileName=${fileName}`,
} as const;

export type Api = typeof API;
