import { useEffect, useState, useRef } from "react";
import { API } from "@/constants/api";

export default function useClientIP() {
  const [ip, setIP] = useState("");
  const prevIP = useRef("");

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await fetch(API.GET_CLIENT_IP);
        const ipInfo = await res.json();
        const currentIP = ipInfo.ip;

        if (prevIP.current && prevIP.current !== currentIP) {
          alert("네트워크 변경이 감지됨");
        }

        prevIP.current = currentIP;
        setIP(ipInfo.ip);
      } catch (err) {
        console.error("공인 IP 가져오기 실패", err);
      }
    };

    fetchIP();
    const interval = setInterval(fetchIP, 10000);
    return () => clearInterval(interval);
  }, []);

  return ip;
}
