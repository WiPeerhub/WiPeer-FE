import CreateRoomForm from "@/components/CreateRoomModal/CreateRoomForm";

export default function CreateRoomPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <CreateRoomForm />
    </div>
  );
}
