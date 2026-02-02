import React from 'react';
import { TimeTrigger } from './ui/TimeTrigger';
import { DateTrigger } from './ui/DateTrigger';

type Props = {
  text?: string | null;
  className?: string;
};

export const SmartText: React.FC<Props> = ({ text, className }) => {
  if (!text) return null;

  const parts = text.split(/(\{\{TIME\}\}|\{\{DATE\}\})/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part === '{{TIME}}') {
          return <TimeTrigger key={index} />;
        }
        if (part === '{{DATE}}') {
          return <DateTrigger key={index} />;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};
