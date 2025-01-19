import { useEffect, useState } from "react";

export const useCountdown = (initialTime: number) => {
  const [countdown, setCountdown] = useState(initialTime);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (countdown % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return { countdown, formattedCountdown: formatCountdown() };
};
