import React from 'react';

const UserAvatar = ({ 
  user, 
  size = 'md', 
  showOnlineStatus = false, 
  className = '',
  onClick = null 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'w-6 h-6 text-xs';
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'md':
        return 'w-10 h-10 text-base';
      case 'lg':
        return 'w-12 h-12 text-lg';
      case 'xl':
        return 'w-16 h-16 text-xl';
      case '2xl':
        return 'w-20 h-20 text-2xl';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  const getInitials = () => {
    if (!user?.name) return 'U';
    
    // For "Vatsal Joshi" -> "VJ"
    const names = user.name.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

    // Gradient class is now used directly in the component
  const gradientClass = gradientClasses[Math.floor(Math.random() * gradientClasses.length)];

  const avatarElement = (
    <div
      className={`
        relative inline-flex items-center justify-center
        ${getSizeClasses()}
        bg-custom-teal
        rounded-full font-semibold text-button shadow-lg
        ${onClick ? 'cursor-pointer hover:shadow-xl transition-shadow duration-200' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {user?.profileImage ? (
        <img
          src={user.profileImage}
          alt={`${user.name}'s avatar`}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="select-none">
          {getInitials()}
        </span>
      )}
      
      {showOnlineStatus && (
        <div className="absolute -bottom-0.5 -right-0.5">
          <div className="w-3 h-3 bg-green-400 border-2 border-custom-bg-2 rounded-full pulse"></div>
        </div>
      )}
    </div>
  );

  return avatarElement;
};

export default UserAvatar;
