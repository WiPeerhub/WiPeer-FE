const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export function createPeerConnection(socket, targetId, initiator) {
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
    channel.onopen = () => console.log("사용자의 dataChannel 열림");
    channel.onmessage = (e) => console.log("기존 사용자가 보낸 메시지: ", e.data);

    peer.createOffer().then((offer) => {
      peer.setLocalDescription(offer);
      socket.emit("offer", { target: targetId, sdp: offer });
    });

    return { peer, channel };
  } else {
    peer.ondatachannel = (e) => {
      const channel = e.channel;
      channel.onopen = () => console.log("새로운 사용자의 dataChannel 열림");
      channel.onmessage = (e) => console.log("새로운 사용자가 받은 메시지:", e.data);

      return { peer, channel };
    };

    return { peer };
  }
}

export async function handleOffer({ sender, sdp }, socket, peersRef, dataChannelsRef) {
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
    channel.onmessage = (e) => console.log("handleOffer Message: ", e.data);
  };

  await peer.setRemoteDescription(new RTCSessionDescription(sdp));
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  socket.emit("answer", { target: sender, sdp: answer });
}

export async function handleAnswer({ sender, sdp }, peersRef) {
  const peer = peersRef.current[sender];
  if (peer) {
    try {
      await peer.setRemoteDescription(new RTCSessionDescription(sdp));
    } catch (err) {
      console.error("setRemoteDescription 실패:", err);
    }
  }
}

export function handleCandidate({ sender, candidate }, peersRef) {
  const peer = peersRef.current[sender];
  if (peer && candidate) {
    peer.addIceCandidate(new RTCIceCandidate(candidate));
  }
}
