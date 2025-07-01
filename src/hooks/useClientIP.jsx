import { useEffect, useState } from "react";
import { API } from "@/constants/api";

export default function useClientIP() {
  const [ip, setIP] = useState("");

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await fetch(API.GET_CLIENT_IP);
        const ipInfo = await res.json();

        setIP(ipInfo.ip);
      } catch (err) {
        console.error("공인 IP 가져오기 실패", err);
      }
    };

    fetchIP();
  }, []);

  return ip;
}
