import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function useIPChangeAlert(ip) {
  const prevIP = useRef("");

  useEffect(() => {
    if (prevIP.current && prevIP.current !== ip) {
      toast.warning("네트워크가 변경되었습니다.", {
        duration: 4000,
        id: "ip-change",
      });
    }
    prevIP.current = ip;
  }, [ip]);
}
