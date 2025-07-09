import MyActivityStatic from "@/components/MyActivity/MyActivityStatic";
import MyNickName from "@/components/MyActivity/MyNickName";

export default function MyActivityPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto flex h-full max-w-2xl flex-col space-y-6 p-4">
        <div className="shrink-0">
          <MyActivityStatic />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          <MyNickName />
        </div>
      </div>
    </div>
  );
}
