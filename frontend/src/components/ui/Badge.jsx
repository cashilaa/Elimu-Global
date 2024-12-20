import React from 'react';

export const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`
      px-2.5 py-1 
      rounded-full text-sm font-medium
      inline-flex items-center gap-1
      ${variants[variant]} 
      ${className || ''}`}>
      {children}
    </span>
  );
};

export default Badge; 
