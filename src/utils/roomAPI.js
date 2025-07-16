export const BASE_URL = import.meta.env.VITE_SERVER_URL + "/room";

const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Request failed");

    return data;
  } catch (error) {
    console.error(`[API ERROR] ${url}:`, error.message);
    throw error;
  }
};

export const createRoom = async ({ ip, title, description, password, isPrivate, ownerId, wifiId }) => {
  return request(BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      ip,
      title,
      description,
      password,
      isPrivate,
      ownerId,
      wifiId,
    }),
  });
};

export const getRoomsByIP = async (ip) => {
  const url = `${BASE_URL}?ip=${ip}`;
  return request(url);
};

export const getUserVisitedRooms = async (userId) => {
  const url = `${BASE_URL}/user/${userId}`;
  return request(url);
};

export const getRoomDetail = async (ownerId, roomId) => {
  const url = `${BASE_URL}/${ownerId}/${roomId}`;
  return request(url);
};

export const updateRoomIP = async ({ ownerId, roomId, ip, userId }) => {
  const url = `${BASE_URL}/${ownerId}/${roomId}/ip`;
  return request(url, {
    method: "PATCH",
    body: JSON.stringify({ ip, userId }),
  });
};

export const recordRoomVisit = async ({ ownerId, roomId, userId }) => {
  const url = `${BASE_URL}/${ownerId}/${roomId}/visit`;
  return request(url, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
};

export const deleteRoom = async ({ ownerId, roomId }) => {
  const url = `${BASE_URL}/${ownerId}/${roomId}`;
  return request(url, {
    method: "DELETE",
  });
};

export const getRoomByRoomId = async (roomId) => {
  const url = `${BASE_URL}/id/${roomId}`;
  return request(url);
};
