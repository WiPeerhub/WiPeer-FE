import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "@/constants/api";
import { useRoomListStore } from "@/stores/useRoomListStore";
import { createPeerConnection, handleOffer, handleAnswer, handleCandidate } from "@/utils/peerManager";
import { useMyRoomStore } from "@/stores/useMyRoomStore";
import { getOrCreateOwnerId } from "../utils/getOrCreateOwnerId";

type Id = string;

export default function useSocket(roomId, setConversation) {
  const socketRef = useRef(null);
  const peersRef = useRef({});
  const dataChannelsRef = useRef({});
  const setRoomList = useRoomListStore((state) => state.setRoomList);
  const setMyRooms = useMyRoomStore((state) => state.setMyRooms);
  const ownerId = getOrCreateOwnerId();

  useEffect(() => {
    const socket = io(BASE_URL, {
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
      socket.emit("join-room", roomId);
    });

    socket.on("new-room-created", (roomData) => {
      if (ownerId !== roomData.ownerId) return;
      setMyRooms((prev) => [...prev, roomData]);
    });

    socket.on("room-ip-updated", (roomData) => {
      const updatedRoom = roomData.updatedRoom;
      setRoomList((prev) => [...prev, updatedRoom]);
    });

    socket.on("chat-history", (history) => {
      setConversation(history);
    });

    socket.on("new-message", (messageObj) => {
      setConversation((prev) => {
        const currentMessageObj = prev.find((msg) => msg.id === messageObj.id);
        if (currentMessageObj) return prev;

        return [...prev, messageObj];
      });
    });

    socket.on("message-updated", (updatedMessage) => {
      setConversation((prev) => prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)));
    });

    socket.on("message-deleted", (messageId) => {
      setConversation((prev) => prev.filter((msg) => msg.id !== messageId));
    });

    socket.on("all-users", (users) => {
      users.forEach((socketId) => {
        const { peer, channel } = createPeerConnection(socket, socketId, true, setConversation, dataChannelsRef);
        peersRef.current[socketId] = peer;
        dataChannelsRef.current[socketId] = channel;
      });
    });

    socket.on("user-joined", (socketId) => {
      const { peer } = createPeerConnection(socket, socketId, false, setConversation, dataChannelsRef);
      peersRef.current[socketId] = peer;
    });

    socket.on("room-deleted", (deletedRoomId) => {
      setMyRooms((prev) => prev.filter((room) => room.roomId !== deletedRoomId));
      setRoomList((prev) => prev.filter((room) => room.roomId !== deletedRoomId));
    });

    socket.on("offer", (payload) => handleOffer(payload, socket, peersRef, dataChannelsRef, setConversation));
    socket.on("answer", (payload) => handleAnswer(payload, peersRef));
    socket.on("ice-candidate", (payload) => handleCandidate(payload, peersRef));

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageObj) => {
    Object.values(dataChannelsRef.current).forEach((channel) => {
      if (channel.readyState === "open") channel.send(JSON.stringify(messageObj));
    });

    socketRef.current.emit("chat-message", { roomId, messageObj });
  };

  return sendMessage;
}
