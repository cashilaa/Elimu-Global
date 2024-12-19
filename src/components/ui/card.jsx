import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`
      bg-white rounded-xl 
      border border-gray-100
      shadow-sm hover:shadow-md
      transition-all duration-200
      p-6 ${className || ''}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }) => {
  return (
    <div className={`space-y-1.5 pb-4 ${className || ''}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className }) => {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 ${className || ''}`}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className }) => {
  return (
    <p className={`text-sm text-gray-500 ${className || ''}`}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className }) => {
  return (
    <div className={`py-2 ${className || ''}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className }) => {
  return (
    <div className={`flex items-center pt-4 ${className || ''}`}>
      {children}
    </div>
  );
};

export default Card; 