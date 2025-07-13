import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";

export default function OAuthCallback() {
  const setToken = useAuthStore((state) => state.setToken);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      setToken(token);
      const fetchUser = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("요청에 실패하였습니다.");
          return;
        }

        const userInfo = await res.json();
        setUserInfo(userInfo);
        localStorage.setItem("ownerId", userInfo.id);
        console.log(userInfo);
      };

      fetchUser();

      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  return <div>로그인 중...</div>;
}
