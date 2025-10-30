import React, { useRef, useEffect } from 'react';
import { useNetworking } from '../contexts/NetworkingContext';

const NotificationDropdown = ({ notifications, onClose }) => {
  const dropdownRef = useRef(null);
  const { markNotificationRead } = useNetworking();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'connection':
        return 'person_add';
      case 'event':
        return 'event';
      case 'badge':
        return 'military_tech';
      case 'points':
        return 'star';
      case 'qr':
        return 'qr_code';
      case 'message':
        return 'chat';
      default:
        return 'notifications';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markNotificationRead(notification.id);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 bg-custom-bg-2 border border-custom-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
    >
      <div className="p-4 border-b border-custom-border">
        <h3 className="text-lg font-semibold text-custom-text">Notifications</h3>
      </div>
      
      <div className="py-2">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 hover:bg-custom-bg cursor-pointer border-l-4 transition-colors ${
                notification.read 
                  ? 'border-transparent' 
                  : 'border-custom-teal bg-custom-teal bg-opacity-5'
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  notification.read ? 'bg-custom-bg' : 'bg-custom-teal bg-opacity-20'
                }`}>
                  <span className={`material-icons text-sm ${
                    notification.read ? 'text-custom-text-secondary' : 'text-custom-teal'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${
                    notification.read ? 'text-custom-text-secondary' : 'text-custom-text font-medium'
                  }`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-custom-text-secondary mt-1">
                    {formatTime(notification.timestamp)}
                  </p>
                </div>
                
                {!notification.read && (
                  <div className="w-2 h-2 bg-custom-teal rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-8 text-center text-custom-text-secondary">
            <span className="material-icons text-4xl mb-2 block">notifications_none</span>
            <p>No notifications yet</p>
          </div>
        )}
      </div>
      
      {notifications && notifications.length > 0 && (
        <div className="p-4 border-t border-custom-border">
          <button
            className="w-full text-center text-custom-teal hover:text-custom-text text-sm font-medium"
            onClick={onClose}
          >
            View All Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
