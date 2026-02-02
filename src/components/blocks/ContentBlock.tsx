import React from 'react';

export const ContentBlock: React.FC<any> = (props) => {
  return (
    <div className="content-block">
      <h2>Content Block</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};
