import React from 'react';

export const HeroBlock: React.FC<any> = (props) => {
  return (
    <div className="hero-block">
      <h1>Hero Block</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};
