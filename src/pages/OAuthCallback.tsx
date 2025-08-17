import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore, type UserInfo } from "@/stores/useUserStore";

export default function OAuthCallback() {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("요청에 실패하였습니다.");
        navigate("/login", { replace: true });
        return;
      }

      const userInfo = (await res.json()) as UserInfo;
      setUserInfo(userInfo);
      localStorage.setItem("ownerId", userInfo.id);
      navigate("/main", { replace: true });
    };

    fetchUser();
  }, [navigate]);

  return <div>로그인 중...</div>;
}
