import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "@/constants/api";
import { useNickNameStore } from "@/stores/useNicknameStore";
import { useRoomListStore } from "@/stores/useRoomListStore";
import { createPeerConnection, handleOffer, handleAnswer, handleCandidate } from "@/utils/peerManager";

export default function useSocket(roomId, setConversation) {
  const socketRef = useRef(null);
  const peersRef = useRef({});
  const dataChannelsRef = useRef({});
  const nickName = useNickNameStore((state) => state.nickName);
  const setRoomList = useRoomListStore((state) => state.setRoomList);

  useEffect(() => {
    const socket = io(BASE_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
      socket.emit("join-room", roomId);
    });

    socket.on("new-room-created", (roomData) => {
      setRoomList((prev) => [...prev, roomData]);
    });

    socket.on("chat-history", (history) => {
      setConversation(history);
    });

    socket.on("chat-message", (messageObj) => {
      setConversation((prev) => [...prev, messageObj]);
    });

    socket.on("all-users", (users) => {
      users.forEach((socketId) => {
        const { peer, channel } = createPeerConnection(socket, socketId, true, setConversation, dataChannelsRef);
        peersRef.current[socketId] = peer;
        dataChannelsRef.current[socketId] = channel;
      });
    });

    socket.on("user-joined", (socketId) => {
      console.log(socketId);
      console.log("user-joined:", socketId);
      const { peer } = createPeerConnection(socket, socketId, false, setConversation, dataChannelsRef);
      peersRef.current[socketId] = peer;
    });

    socket.on("offer", (payload) => handleOffer(payload, socket, peersRef, dataChannelsRef, setConversation));
    socket.on("answer", (payload) => handleAnswer(payload, peersRef));
    socket.on("ice-candidate", (payload) => handleCandidate(payload, peersRef));

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = (message) => {
    const messageObj = {
      id: Date.now().toString(),
      username: nickName,
      timestamp: new Date().toLocaleTimeString(),
      message,
    };

    Object.values(dataChannelsRef.current).forEach((channel) => {
      if (channel.readyState === "open") channel.send(JSON.stringify(messageObj));
    });

    socketRef.current.emit("chat-message", { roomId, messageObj });
  };

  return sendMessage;
}
