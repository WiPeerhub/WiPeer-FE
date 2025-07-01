import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "@/constants/api";
import { createPeerConnection, handleOffer, handleAnswer, handleCandidate } from "@/utils/peerManager";

export default function useSocket(roomId) {
  const socketRef = useRef(null);
  const peersRef = useRef({});
  const dataChannelsRef = useRef({});

  useEffect(() => {
    const socket = io(BASE_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
      socket.emit("join-room", roomId);
    });

    socket.on("all-users", (users) => {
      users.forEach((socketId) => {
        const { peer, channel } = createPeerConnection(socket, socketId, true);
        peersRef.current[socketId] = peer;
        dataChannelsRef.current[socketId] = channel;
      });
    });

    socket.on("user-joined", (socketId) => {
      console.log(socketId);
      console.log("user-joined:", socketId);
      const { peer } = createPeerConnection(socket, socketId, false);
      peersRef.current[socketId] = peer;
    });

    socket.on("offer", (payload) => handleOffer(payload, socket, peersRef, dataChannelsRef));
    socket.on("answer", (payload) => handleAnswer(payload, peersRef));
    socket.on("ice-candidate", (payload) => handleCandidate(payload, peersRef));

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = (message) => {
    Object.values(dataChannelsRef.current).forEach((channel) => {
      if (channel.readyState === "open") channel.send(message);
    });
  };

  return sendMessage;
}
