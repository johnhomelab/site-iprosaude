import React from 'react';
import { RichText } from '../RichText';

export const ContentBlock: React.FC<any> = (props) => {
  const { content } = props;

  return (
    <div className="content-block container mx-auto px-4 py-8">
      {content && <RichText content={content} />}
    </div>
  );
};
