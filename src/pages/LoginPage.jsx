export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_OAUTH_CALLBACK_URL;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <button onClick={handleGoogleLogin} className="rounded-md bg-red-500 px-6 py-3 text-white hover:bg-red-600">
        Google 로그인
      </button>
    </div>
  );
}
