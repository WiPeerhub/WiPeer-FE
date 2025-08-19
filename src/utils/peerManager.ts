import type React from "react";
import type { Socket } from "socket.io-client";
import type { ConversationMessage } from "@/types/chat";

type Id = string;

type RefMap<T> = { current: T };

export interface OfferPayload {
  sender: Id;
  sdp: RTCSessionDescriptionInit;
}

export interface AnswerPayload {
  sender: Id;
  sdp: RTCSessionDescriptionInit;
}

export interface CandidatePayload {
  sender: Id;
  candidate: RTCIceCandidateInit;
}

const config: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: import.meta.env.VITE_TURN_URL,
      username: import.meta.env.VITE_TURN_USERNAME,
      credential: import.meta.env.VITE_TURN_CREDENTIAL,
    },
  ],
};

export function createPeerConnection(
  socket: Socket,
  targetId: Id,
  initiator: boolean,
  setConversation: React.Dispatch<React.SetStateAction<ConversationMessage[]>>,
  dataChannelsRef: RefMap<Record<string, RTCDataChannel>>,
): { peer: RTCPeerConnection; channel?: RTCDataChannel } {
  const peer = new RTCPeerConnection(config);

  peer.onicecandidate = (e) => {
    if (e.candidate) {
      socket.emit("ice-candidate", {
        target: targetId,
        candidate: e.candidate,
      });
    }
  };

  if (initiator) {
    const channel = peer.createDataChannel("chat");
    dataChannelsRef.current[targetId] = channel;

    channel.onopen = () => console.log("사용자의 dataChannel 열림");
    channel.onmessage = (e) => {
      const messageObj = JSON.parse(e.data) as ConversationMessage;

      setConversation((prev) => {
        const exist = prev.find((msg) => msg.id === messageObj.id);
        if (exist) {
          return prev.map((msg) => (msg.id === messageObj.id ? messageObj : msg));
        } else {
          return [...prev, messageObj];
        }
      });
    };

    peer.createOffer().then((offer) => {
      peer.setLocalDescription(offer);
      socket.emit("offer", { target: targetId, sdp: offer });
    });

    return { peer, channel };
  } else {
    peer.ondatachannel = (e) => {
      const channel = e.channel;
      dataChannelsRef.current[targetId] = channel;

      channel.onopen = () => console.log("새로운 사용자의 dataChannel 열림");
      channel.onmessage = (e) => {
        const messageObj = JSON.parse(e.data) as ConversationMessage;

        setConversation((prev) => {
          const exist = prev.find((msg) => msg.id === messageObj.id);
          if (exist) {
            return prev.map((msg) => (msg.id === messageObj.id ? messageObj : msg));
          } else {
            return [...prev, messageObj];
          }
        });
      };
    };

    return { peer };
  }
}

export async function handleOffer(
  { sender, sdp }: OfferPayload,
  socket: Socket,
  peersRef: RefMap<Record<string, RTCPeerConnection>>,
  dataChannelsRef: RefMap<Record<string, RTCDataChannel>>,
  setConversation: React.Dispatch<React.SetStateAction<ConversationMessage[]>>,
): Promise<void> {
  const peer = new RTCPeerConnection(config);
  peersRef.current[sender] = peer;

  peer.onicecandidate = (e) => {
    if (e.candidate) {
      socket.emit("ice-candidate", {
        target: sender,
        candidate: e.candidate,
      });
    }
  };

  peer.ondatachannel = (e) => {
    const channel = e.channel;
    dataChannelsRef.current[sender] = channel;

    channel.onopen = () => console.log("Offer opened");
    channel.onmessage = (e) => {
      const messageObj = JSON.parse(e.data) as ConversationMessage;
      console.log("handleOffer Message: ", e.data);

      setConversation((prev) => {
        const exist = prev.find((msg) => msg.id === messageObj.id);
        if (exist) {
          return prev.map((msg) => (msg.id === messageObj.id ? messageObj : msg));
        } else {
          return [...prev, messageObj];
        }
      });
    };
  };

  await peer.setRemoteDescription(new RTCSessionDescription(sdp));
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  socket.emit("answer", { target: sender, sdp: answer });
}

export async function handleAnswer(
  { sender, sdp }: AnswerPayload,
  peersRef: RefMap<Record<string, RTCPeerConnection>>,
): Promise<void> {
  const peer = peersRef.current[sender];
  if (peer) {
    try {
      await peer.setRemoteDescription(new RTCSessionDescription(sdp));
    } catch (err) {
      console.error("setRemoteDescription 실패:", err);
    }
  }
}

export function handleCandidate(
  { sender, candidate }: CandidatePayload,
  peersRef: RefMap<Record<string, RTCPeerConnection>>,
): void {
  const peer = peersRef.current[sender];
  if (peer && candidate) {
    peer.addIceCandidate(new RTCIceCandidate(candidate));
  }
}
