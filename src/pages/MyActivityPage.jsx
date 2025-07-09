import MyActivityStatic from "@/components/MyActivity/MyActivityStatic";
import MyNickName from "@/components/MyActivity/MyNickName";

export default function MyActivityPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-6 p-4">
          <MyActivityStatic />
          <MyNickName />
        </div>
      </div>
    </div>
  );
}
