import { useState } from "react";
import { useRoomCreationStore } from "@/stores/useRoomCreationStore";
import { useRoomListStore } from "@/stores/useRoomListStore";
import { API } from "@/constants/api";
import { getOrCreateOwnerId } from "@/utils/getOrCreateOwnerId";
import TitleInput from "@/components/CreateRoomModal/TitleInput";
import RoomDescriptionInput from "@/components/CreateRoomModal/RoomDescriptionInput";
import PrivacySelector from "@/components/CreateRoomModal/PrivacySelector";
import SubmitButton from "@/components/CreateRoomModal/SubmitButton";
import CreateRoomHeader from "@/components/CreateRoomModal/CreateRoomHeader";
import useClientIP from "@/hooks/useClientIP";
import { incrementRoomCount } from "@/utils/setOrGetNicknameStats";

export default function CreateRoomForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const clientIP = useClientIP();
  const setIsRoomCreation = useRoomCreationStore((state) => state.setIsRoomCreation);
  const fetchRooms = useRoomListStore((state) => state.fetchRooms);
  const nickName = localStorage.getItem("nickName");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ownerId = getOrCreateOwnerId();

    const payload = {
      ip: clientIP,
      title,
      description,
      isPrivate,
      password: isPrivate ? password : null,
      ownerId,
    };

    try {
      const res = await fetch(API.POST_ROOM, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      await fetchRooms(clientIP);
      incrementRoomCount(nickName);
      console.log("방 생성 완료", result);
    } catch (err) {
      console.error("방 생성 실패", err);
    }

    setIsRoomCreation();
  };

  const isFormValid = title.trim() && (!isPrivate || password.trim().length >= 4);

  return (
    <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
      <form className="space-y-4 p-6" onSubmit={handleSubmit}>
        <CreateRoomHeader />
        <TitleInput title={title} updateTitle={setTitle} />
        <RoomDescriptionInput description={description} updateDescription={setDescription} />
        <PrivacySelector
          isPrivate={isPrivate}
          updateIsPrivate={setIsPrivate}
          password={password}
          updatePassword={setPassword}
        />
        <SubmitButton isFormValid={isFormValid} />
      </form>
    </div>
  );
}
