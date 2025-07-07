import { useEffect, useRef } from "react";

export default function useIPChangeAlert(ip) {
  const prevIP = useRef("");

  useEffect(() => {
    if (prevIP.current && prevIP.current !== ip) {
      alert(`IP가 변경되었습니다!\n이전: ${prevIP.current}\n현재: ${ip}`);
    }
    prevIP.current = ip;
  }, [ip]);
}
