export const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const API = {
  GET_CLIENT_IP: `${BASE_URL}/ip`,
  POST_ROOM: `${BASE_URL}/room`,
  updateMessage: (roomId, messageId) => `${BASE_URL}/${roomId}/message/${messageId}`,
  deleteMessage: (roomId, messageId) => `${BASE_URL}/${roomId}/message/${messageId}`,
  getLastMessage: (roomId) => `${BASE_URL}/last-message/${roomId}`,
  uploadFile: (fileType, fileName) => `${BASE_URL}/upload/upload-url?fileType=${fileType}&fileName=${fileName}`,
  deleteRoom: (roomId) => `${BASE_URL}/room/${roomId}`,
  getRoomsByIP: (ip) => `${BASE_URL}/room?ip=${ip}`,
};
