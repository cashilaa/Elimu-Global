import React from 'react';

export const Input = ({ className, ...props }) => {
  return <input className={`border rounded-lg p-2 ${className}`} {...props} />;
};
