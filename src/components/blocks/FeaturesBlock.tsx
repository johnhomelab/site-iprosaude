import React from 'react';

export const FeaturesBlock: React.FC<any> = (props) => {
  return (
    <div className="features-block">
      <h2>Features Block</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};
