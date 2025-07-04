export const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const API = {
  GET_CLIENT_IP: `${BASE_URL}/ip`,
  POST_ROOM: `${BASE_URL}/room`,
  deleteRoom: (roomId) => `${BASE_URL}/room/${roomId}`,
  getRoomsByIP: (ip) => `${BASE_URL}/room?ip=${ip}`,
};
