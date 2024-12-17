import React from 'react';

export const Button = ({ children, variant, className, ...props }) => {
  const baseStyles = 'py-2 px-4 rounded focus:outline-none';
  const variantStyles = variant === 'outline' ? 'border border-blue-600 text-blue-600' : 'bg-blue-600 text-white';

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};
