"use client";

import { useEffect, useState } from "react";

export function useDeviceTime() {
  const [time, setTime] = useState({
    hours: "09",
    minutes: "41",
    formattedDate: "Friday, November 7",
    dayOfWeek: "Friday",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      const formattedDate = now.toLocaleDateString("en-US", options);
      const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });

      setTime({
        hours,
        minutes,
        formattedDate,
        dayOfWeek,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
