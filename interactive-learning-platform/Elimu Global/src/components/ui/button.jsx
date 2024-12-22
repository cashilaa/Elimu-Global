import React from 'react';

const Button = ({ children, size = 'md', onClick }) => {
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg',
  };

  return (
    <button
      className={`bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
