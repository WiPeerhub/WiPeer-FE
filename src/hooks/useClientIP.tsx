import { useEffect } from "react";
import { API } from "@/constants/api";
import { useClientIPStore } from "@/stores/useClientIPStore";

type IpResponse = { ip: string };

interface NetworkInformation {
  addEventListener(type: "change", listener: () => void): void;
  removeEventListener(type: "change", listener: () => void): void;
}

export default function useClientIP(): string {
  const { ip, setIP } = useClientIPStore();

  const fetchIP = async (): Promise<void> => {
    try {
      const res = await fetch(API.GET_CLIENT_IP);
      const ipInfo = (await res.json()) as IpResponse;

      setIP(ipInfo.ip);
    } catch (err) {
      console.error("공인 IP 가져오기 실패", err);
    }
  };

  useEffect(() => {
    fetchIP();

    window.addEventListener("online", fetchIP);

    const nav = navigator as any;
    const connection: NetworkInformation | undefined = nav.connection || nav.mozConnection || nav.webkitConnection;

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
