import React, { useMemo } from 'react';

const UserAvatar = React.memo(({ 
  user, 
  size = 'md', 
  showOnlineStatus = false, 
  className = '',
  onClick = null,
  badge = null,
  showStatus = false,
  status = 'online',
  loading = false,
  fallbackColor = null 
}) => {
  const getSizeClasses = useMemo(() => {
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
  }, [size]);

  const getStatusColor = useMemo(() => {
    switch (status) {
      case 'online':
        return 'bg-green-400';
      case 'idle':
        return 'bg-yellow-400';
      case 'busy':
        return 'bg-red-400';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-green-400';
    }
  }, [status]);

  const initials = useMemo(() => {
    if (!user?.name) return 'U';
    
    const names = user.name.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  }, [user?.name]);

  const bgColor = useMemo(() => {
    if (fallbackColor) return fallbackColor;
    if (!user?.name) return 'bg-custom-teal';
    
    // Generate consistent color based on user ID or name
    const str = user.id || user.name;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'
    ];
    return colors[Math.abs(hash) % colors.length];
  }, [user?.id, user?.name, fallbackColor]);

  if (loading) {
    return (
      <div 
        className={`${getSizeClasses} rounded-full animate-pulse bg-custom-bg`} 
        aria-label="Loading..."
      />
    );
  }

  return (
    <div className="relative inline-block">
      <div
        className={`
          relative inline-flex items-center justify-center
          ${getSizeClasses}
          ${!user?.profileImage ? bgColor : ''}
          rounded-full font-semibold text-white shadow-lg
          ${onClick ? 'cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105' : ''}
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
        aria-label={user?.name || 'User avatar'}
      >
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt={`${user.name}'s avatar`}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'block';
            }}
          />
        ) : (
          <span className="select-none">{initials}</span>
        )}
        
        {showOnlineStatus && (
          <div 
            className={`
              absolute -bottom-0.5 -right-0.5 
              w-3 h-3 ${getStatusColor} 
              border-2 border-custom-bg-2 rounded-full
              ${status === 'online' ? 'animate-pulse' : ''}
            `}
            title={`Status: ${status}`}
          />
        )}

        {badge && (
          <div 
            className="absolute -top-1 -right-1"
            aria-label={`${badge} notifications`}
          >
            <div className="flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full">
              {typeof badge === 'number' && badge > 99 ? '99+' : badge}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.user?.id === nextProps.user?.id &&
    prevProps.user?.name === nextProps.user?.name &&
    prevProps.user?.profileImage === nextProps.user?.profileImage &&
    prevProps.size === nextProps.size &&
    prevProps.showOnlineStatus === nextProps.showOnlineStatus &&
    prevProps.status === nextProps.status &&
    prevProps.badge === nextProps.badge &&
    prevProps.loading === nextProps.loading
  );
});

export default UserAvatar;