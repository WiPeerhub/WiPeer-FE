import { useEffect, useState } from "react";

export default function useClientIP() {
  const [ip, setIP] = useState("");

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await fetch("http://localhost:4000/ip");
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
