export const BASE_URL = import.meta.env.VITE_SERVER_URL + "/room";
import type { Room } from "@/types/room";

interface RequestOptions extends RequestInit {
  body?: string;
}

const request = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Request failed");

    return data;
  } catch (error: any) {
    console.error(`[API ERROR] ${url}:`, error.message);
    throw error;
  }
};

export const createRoom = async (params: {
  ip: string;
  title: string;
  description?: string | null;
  password?: string | null;
  isPrivate: boolean;
  ownerId: string;
}): Promise<{ roomId: string }> => {
  return request<{ roomId: string }>(BASE_URL, {
    method: "POST",
    body: JSON.stringify(params),
  });
};

export const getRoomsByIP = async (ip: string): Promise<{ rooms: Room[] }> => {
  const url = `${BASE_URL}?ip=${ip}`;
  return request<{ rooms: Room[] }>(url);
};

export const getUserVisitedRooms = async (userId: string): Promise<{ rooms: Room[] }> => {
  const url = `${BASE_URL}/user/${userId}`;
  return request<{ rooms: Room[] }>(url);
};

export const getRoomDetail = async (ownerId: string, roomId: string): Promise<{ room: Room }> => {
  const url = `${BASE_URL}/${ownerId}/${roomId}`;
  return request<{ room: Room }>(url);
};

export const updateRoomIP = async (params: {
  ownerId: string;
  roomId: string;
  ip: string;
}): Promise<{ room: Room }> => {
  const url = `${BASE_URL}/${params.ownerId}/${params.roomId}/ip`;
  return request<{ room: Room }>(url, {
    method: "PATCH",
    body: JSON.stringify({ ip: params.ip }),
  });
};

export const recordRoomVisit = async (params: {
  ownerId: string;
  roomId: string;
  userId: string;
}): Promise<{ success: boolean }> => {
  const url = `${BASE_URL}/${params.ownerId}/${params.roomId}/visit`;
  return request<{ success: boolean }>(url, {
    method: "POST",
    body: JSON.stringify({ userId: params.userId }),
  });
};

export const deleteRoom = async (params: { ownerId: string; roomId: string }): Promise<{ success: boolean }> => {
  const url = `${BASE_URL}/${params.ownerId}/${params.roomId}`;
  return request<Promise<{ success: boolean }>>(url, {
    method: "DELETE",
  });
};

export const getRoomByRoomId = async (roomId: string): Promise<{ room: Room }> => {
  const url = `${BASE_URL}/id/${encodeURIComponent(roomId)}`;
  return request<{ room: Room }>(url);
};

export const getRoomsByOwner = async (ownerId: string): Promise<{ rooms: Room[] }> => {
  const url = `${BASE_URL}/owner/${encodeURIComponent(ownerId)}`;
  return request<{ rooms: Room[] }>(url);
};
