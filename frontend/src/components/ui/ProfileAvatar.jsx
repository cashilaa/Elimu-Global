import React from 'react';

export const ProfileAvatar = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-32 h-32 text-4xl'
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      {user?.profilePicture ? (
        <img
          src={user.profilePicture}
          alt={user.firstName}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <div className={`
          ${sizeClasses[size]} rounded-full 
          bg-blue-100 flex items-center justify-center 
          text-blue-600 font-bold
        `}>
          {getInitials(user?.firstName)}
        </div>
      )}
    </>
  );
}; 