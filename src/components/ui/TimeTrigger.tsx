'use client';

import React, { useEffect, useState } from 'react';

export const TimeTrigger: React.FC = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Use client's locale but force HH:mm format
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTime(formattedTime);
    };

    updateTime();
    // Optional: update every minute if the user stays on the page
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Avoid hydration mismatch by rendering nothing initially
  if (!time) {
    return <span className="opacity-0">--:--</span>;
  }

  return <span>{time}</span>;
};
