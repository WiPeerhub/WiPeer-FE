import { useState } from "react";
import TitleInput from "@/components/CreateRoomModal/TitleInput";
import RoomDescriptionInput from "@/components/CreateRoomModal/RoomDescriptionInput";
import PrivacySelector from "@/components/CreateRoomModal/PrivacySelector";
import SubmitButton from "@/components/CreateRoomModal/SubmitButton";
import CreateRoomHeader from "@/components/CreateRoomModal/CreateRoomHeader";

export default function CreateRoomForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");

  const isFormValid = title.trim() && (!isPrivate || password.trim().length >= 4);

  return (
    <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
      <form className="space-y-4 p-6">
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
