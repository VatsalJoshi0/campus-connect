import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNetworking } from '../contexts/NetworkingContext';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationRead } = useNetworking();
  const [filter, setFilter] = useState('all');

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

  const getNotificationColor = (type) => {
    switch (type) {
      case 'connection':
        return 'text-blue-500';
      case 'event':
        return 'text-purple-500';
      case 'badge':
        return 'text-yellow-500';
      case 'points':
        return 'text-green-500';
      case 'qr':
        return 'text-teal-500';
      case 'message':
        return 'text-pink-500';
      default:
        return 'text-custom-text';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const notifDate = new Date(timestamp);
    const diff = now - notifDate;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    if (minutes < 10080) return `${Math.floor(minutes / 1440)}d ago`;
    
    return notifDate.toLocaleDateString();
  };

  const handleNotificationClick = (notification) => {
    markNotificationRead(notification.id);
    
    // Navigate based on notification type
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

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-custom-text mb-2">All Notifications</h1>
          <p className="text-custom-text-secondary">
            Stay updated with all your activity and alerts
            {unreadCount > 0 && ` • ${unreadCount} unread`}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 bg-custom-bg-2 p-2 rounded-lg border border-custom-border">
            {[
              { id: 'all', label: 'All', icon: 'notifications' },
              { id: 'unread', label: 'Unread', icon: 'mark_email_unread' },
              { id: 'connection', label: 'Connections', icon: 'person_add' },
              { id: 'event', label: 'Events', icon: 'event' },
              { id: 'message', label: 'Messages', icon: 'chat' },
              { id: 'badge', label: 'Achievements', icon: 'military_tech' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.id
                    ? 'bg-custom-teal text-black'
                    : 'text-custom-text-secondary hover:text-custom-text hover:bg-custom-bg'
                }`}
                onClick={() => setFilter(tab.id)}
              >
                <span className="material-icons text-sm">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-custom-bg-2 border border-custom-border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-custom-teal ${
                  !notification.read ? 'ring-2 ring-custom-teal ring-opacity-20' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-full ${
                    notification.read 
                      ? 'bg-custom-bg' 
                      : 'bg-custom-teal bg-opacity-20'
                  }`}>
                    <span className={`material-icons text-2xl ${
                      notification.read 
                        ? 'text-custom-text-secondary' 
                        : getNotificationColor(notification.type)
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <p className={`text-base ${
                        notification.read 
                          ? 'text-custom-text-secondary' 
                          : 'text-custom-text font-medium'
                      }`}>
                        {notification.message}
                      </p>
                      <span className="text-xs text-custom-text-secondary whitespace-nowrap">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        notification.type === 'event' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                        notification.type === 'connection' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                        notification.type === 'message' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' :
                        notification.type === 'badge' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                        'bg-custom-bg text-custom-text-secondary'
                      }`}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                      
                      {!notification.read && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-custom-teal bg-opacity-20 text-custom-teal">
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-custom-teal rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="rounded-full bg-custom-bg-2 p-6 mx-auto w-fit mb-4">
                <span className="material-icons text-6xl text-custom-text-secondary">
                  notifications_none
                </span>
              </div>
              <h3 className="text-xl font-semibold text-custom-text mb-2">No notifications</h3>
              <p className="text-custom-text-secondary">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications of this type yet."}
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {unreadCount > 0 && (
          <div className="mt-8 p-6 bg-custom-bg-2 rounded-lg border border-custom-border text-center">
            <p className="text-custom-text mb-4">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
            <button
              onClick={() => {
                notifications.forEach(n => !n.read && markNotificationRead(n.id));
              }}
              className="bg-custom-teal text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Mark all as read
            </button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default NotificationsPage;
