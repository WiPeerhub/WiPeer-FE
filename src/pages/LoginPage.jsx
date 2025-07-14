import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FcGoogle } from "react-icons/fc";
import { DoorOpen } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_OAUTH_CALLBACK_URL;
  };

  const handleGuestLogin = () => {
    const id = uuidv4();
    localStorage.setItem("ownerId", id);
    navigate("/main");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm rounded-xl border border-blue-100 bg-white shadow-xl">
        <div className="p-6 text-center">
          <h1 className="font-extrabol text-3xl text-blue-700">로그인</h1>
          <p className="mt-2 text-gray-600">Google 계정으로 로그인하거나 게스트로 입장하세요.</p>
        </div>
        <div className="space-y-4 p-6 pt-0">
          <button
            onClick={handleGoogleLogin}
            className="flex w-full transform cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-gray-200 py-3 text-lg font-semibold text-gray-600 shadow-lg"
          >
            <FcGoogle className="rounded-2xl bg-white text-3xl" />
            Google로 시작하기
          </button>
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            onClick={handleGuestLogin}
            className="flex w-full transform cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-transparent py-3 text-lg font-semibold text-gray-600 shadow-md"
          >
            <DoorOpen className="rounded-2xl bg-white text-3xl text-gray-600" />
            게스트로 입장하기
          </button>
        </div>
      </div>
    </div>
  );
}
