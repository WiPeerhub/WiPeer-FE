export const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const API = {
  GET_CLIENT_IP: `${BASE_URL}/ip`,
  DELETE_S3_File: `${BASE_URL}/upload/delete-files`,
  updateMessage: (roomId, messageId) => `${BASE_URL}/${roomId}/message/${messageId}`,
  updateReactions: (roomId, messageId) => `${BASE_URL}/${roomId}/message/${messageId}/reactions`,
  deleteMessage: (roomId, messageId) => `${BASE_URL}/${roomId}/message/${messageId}`,
  getLastMessage: (roomId) => `${BASE_URL}/last-message/${roomId}`,
  uploadFile: (fileType, fileName) => `${BASE_URL}/upload/upload-url?fileType=${fileType}&fileName=${fileName}`,
};
