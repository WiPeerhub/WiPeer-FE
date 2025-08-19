import { useState } from "react";
import { useRoomCreationStore } from "@/stores/useRoomCreationStore";
import { useRoomListStore } from "@/stores/useRoomListStore";
import { createRoom } from "@/utils/roomAPI";
import { getOrCreateOwnerId } from "@/utils/getOrCreateOwnerId";
import TitleInput from "@/components/CreateRoomModal/TitleInput";
import RoomDescriptionInput from "@/components/CreateRoomModal/RoomDescriptionInput";
import PrivacySelector from "@/components/CreateRoomModal/PrivacySelector";
import SubmitButton from "@/components/CreateRoomModal/SubmitButton";
import CreateRoomHeader from "@/components/CreateRoomModal/CreateRoomHeader";
import useClientIP from "@/hooks/useClientIP";

interface CreateRoomPayload {
  ip: string;
  title: string;
  description: string | null;
  isPrivate: boolean;
  password: string | null;
  ownerId: string;
}

export default function CreateRoomForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const clientIP = useClientIP();
  const setIsRoomCreation = useRoomCreationStore((state) => state.setIsRoomCreation);
  const fetchRooms = useRoomListStore((state) => state.fetchRooms as (ip: string) => Promise<void>);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ownerId = getOrCreateOwnerId();

    const payload: CreateRoomPayload = {
      ip: "",
      title,
      description,
      isPrivate,
      password: isPrivate ? password : null,
      ownerId,
    };

    try {
      const { roomId } = await createRoom(payload);

      await fetchRooms(clientIP);
      console.log("방 생성 완료", roomId);
    } catch (err) {
      console.error("방 생성 실패", err);
    }

    setIsRoomCreation();
  };

  const isFormValid: boolean = title.trim().length > 0 && (!isPrivate || password.trim().length >= 4);

  return (
    <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
      <form className="space-y-4 p-6" onSubmit={handleSubmit}>
        <CreateRoomHeader />
        <TitleInput title={title} isFormValid={isFormValid} onHandelSubmit={handleSubmit} updateTitle={setTitle} />
        <RoomDescriptionInput description={description} updateDescription={setDescription} />
        <PrivacySelector
          isPrivate={isPrivate}
          updateIsPrivate={setIsPrivate}
          password={password}
          isFormValid={isFormValid}
          onHandelSubmit={handleSubmit}
          updatePassword={setPassword}
        />
        <SubmitButton isFormValid={isFormValid} />
      </form>
    </div>
  );
}
