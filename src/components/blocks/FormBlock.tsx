import React from 'react';

export const FormBlock: React.FC<any> = (props) => {
  return (
    <div className="form-block">
      <h2>Form Block</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};
