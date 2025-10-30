import React, { useEffect, useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Toast = ({ notification }) => {
  const { removeNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = React.useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      removeNotification(notification.id);
    }, 300);
  }, [removeNotification, notification.id]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getColorClasses = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-900 dark:text-green-100';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-900 dark:text-red-100';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100';
    }
  };

  const getProgressColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-500 dark:bg-green-400';
      case 'error':
        return 'bg-red-500 dark:bg-red-400';
      case 'warning':
        return 'bg-yellow-500 dark:bg-yellow-400';
      default:
        return 'bg-blue-500 dark:bg-blue-400';
    }
  };

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (notification.duration) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            handleClose();
            return 0;
          }
          return prev - (100 / (notification.duration / 100));
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [notification.duration, handleClose]);

  return (
    <div
      className={`
        toast-notification group
        ${isVisible && !isLeaving ? 'toast-enter' : ''}
        ${isLeaving ? 'toast-exit' : ''}
        max-w-sm w-full border rounded-xl shadow-lg backdrop-blur-lg
        ${getColorClasses()}
        transform transition-all duration-300 ease-in-out
        hover:scale-102 hover:shadow-xl
      `}
      role="alert"
      aria-live="assertive"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 p-1">
            {getIcon()}
          </div>
          <div className="ml-3 flex-1 pt-0.5">
            {notification.title && (
              <h4 className="text-sm font-semibold leading-5 mb-1">
                {notification.title}
              </h4>
            )}
            <p className="text-sm opacity-90">
              {notification.message}
            </p>
            {notification.action && (
              <button
                onClick={notification.action.onClick}
                className="mt-2 text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded"
              >
                {notification.action.text}
              </button>
            )}
          </div>
          <div className="ml-4 flex flex-col items-center space-y-2">
            <button
              onClick={handleClose}
              className="text-current opacity-60 hover:opacity-100 transition-opacity p-1 hover:bg-black hover:bg-opacity-10 rounded-full"
              aria-label="Close notification"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {notification.canUndo && (
              <button
                onClick={() => notification.onUndo?.()}
                className="text-current opacity-60 hover:opacity-100 transition-opacity p-1 hover:bg-black hover:bg-opacity-10 rounded-full"
                aria-label="Undo action"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      {notification.duration && (
        <div className="relative h-0.5 w-full overflow-hidden rounded-b-xl bg-black/10 dark:bg-white/10">
          <div
            className={`absolute bottom-0 left-0 h-full transition-all duration-100 ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

const ToastContainer = () => {
  const { notifications } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default ToastContainer;
