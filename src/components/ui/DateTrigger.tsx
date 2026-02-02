'use client';

import React, { useEffect, useState } from 'react';

export const DateTrigger: React.FC = () => {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
    });
    setDate(formattedDate);
  }, []);

  if (!date) return null;
  return <span>{date}</span>;
};
