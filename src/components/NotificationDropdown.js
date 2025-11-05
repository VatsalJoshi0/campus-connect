import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNetworking } from '../contexts/NetworkingContext';

const NotificationDropdown = ({ notifications, onClose }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
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
    
    // Navigate based on notification type
    onClose(); // Close the dropdown first
    
    switch (notification.type) {
      case 'connection':
        navigate('/network');
        break;
      case 'event':
        navigate('/events');
        break;
      case 'message':
        navigate('/messages');
        break;
      case 'badge':
      case 'points':
        navigate('/profile');
        break;
      case 'qr':
        navigate('/network');
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="fixed top-20 right-4 w-[calc(100vw-2rem)] md:w-96 bg-custom-bg-2 border border-custom-border rounded-lg shadow-2xl z-[9998] max-h-[calc(100vh-6rem)] backdrop-blur-lg bg-opacity-95 transition-all duration-300 transform flex flex-col"
    >
      <div className="p-4 border-b border-custom-border flex items-center justify-between bg-custom-bg-2 flex-shrink-0">
        <h3 className="text-lg font-semibold text-custom-text">Notifications</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-custom-bg rounded-full transition-colors"
          aria-label="Close notifications"
        >
          <span className="material-icons text-custom-text-secondary">close</span>
        </button>
      </div>

      <div className="overflow-y-auto flex-1 min-h-0">
        {notifications && notifications.length > 0 ? (
          <div className="divide-y divide-custom-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`group hover:bg-custom-bg cursor-pointer transition-all duration-200 ${
                  notification.read 
                    ? 'opacity-75 hover:opacity-100' 
                    : 'bg-custom-teal bg-opacity-5'
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="px-4 py-3 flex items-start space-x-3">
                  <div className={`p-2 rounded-full transition-colors ${
                    notification.read 
                      ? 'bg-custom-bg group-hover:bg-custom-teal group-hover:bg-opacity-10' 
                      : 'bg-custom-teal bg-opacity-20'
                  }`}>
                    <span className={`material-icons text-xl ${
                      notification.read 
                        ? 'text-custom-text-secondary group-hover:text-custom-teal' 
                        : 'text-custom-teal'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-5 ${
                      notification.read ? 'text-custom-text-secondary' : 'text-custom-text font-medium'
                    }`}>
                      {notification.message}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-xs text-custom-text-secondary">
                        {formatTime(notification.timestamp)}
                      </p>
                      {notification.type === 'event' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-custom-teal bg-opacity-10 text-custom-teal">
                          Event
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-2.5 h-2.5 bg-custom-teal rounded-full"></div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markNotificationRead(notification.id);
                        }}
                        className="text-xs text-custom-text-secondary hover:text-custom-teal"
                      >
                        Mark read
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-12 text-center">
            <div className="rounded-full bg-custom-bg p-3 mx-auto w-fit mb-4">
              <span className="material-icons text-4xl text-custom-text-secondary">
                notifications_none
              </span>
            </div>
            <p className="text-custom-text font-medium mb-1">All caught up!</p>
            <p className="text-sm text-custom-text-secondary">
              You don't have any new notifications right now.
            </p>
          </div>
        )}
      </div>
      
      {notifications && notifications.length > 0 && (
        <div className="p-4 border-t border-custom-border bg-custom-bg-2 flex-shrink-0">
          <div className="flex justify-between items-center">
            <button
              className="text-custom-teal hover:text-custom-text text-sm font-medium transition-colors"
              onClick={() => {
                notifications.forEach(n => !n.read && markNotificationRead(n.id));
              }}
            >
              Mark all as read
            </button>
            <button
              className="text-custom-text hover:text-custom-teal text-sm font-medium flex items-center gap-1 transition-colors"
              onClick={() => {
                onClose();
                navigate('/notifications');
              }}
              aria-label="View all notifications"
            >
              View All
              <span className="material-icons text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
