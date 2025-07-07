import { useEffect, useRef, useState } from "react";
import { API } from "@/constants/api";

export default function useClientIP() {
  const [ip, setIP] = useState("");
  const prevIP = useRef("");

  const fetchIP = async () => {
    try {
      const res = await fetch(API.GET_CLIENT_IP);
      const ipInfo = await res.json();
      const currentIP = ipInfo.ip;

      if (currentIP !== prevIP.current) {
        setIP(currentIP);
        prevIP.current = currentIP;
      }
    } catch (err) {
      console.error("공인 IP 가져오기 실패", err);
    }
  };

  useEffect(() => {
    fetchIP();

    window.addEventListener("online", fetchIP);

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
      connection.addEventListener("change", fetchIP);
    }

    return () => {
      window.removeEventListener("online", fetchIP);
      if (connection) {
        connection.removeEventListener("change", fetchIP);
      }
    };
  }, []);

  return ip;
}
