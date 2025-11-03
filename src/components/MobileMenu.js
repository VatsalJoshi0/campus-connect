import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/events', label: 'Events', icon: 'event' },
    { path: '/network', label: 'Network', icon: 'people' },
    { path: '/messages', label: 'Messages', icon: 'chat' },
    { path: '/live-sessions', label: 'Live', icon: 'videocam' },
    { path: '/profile', label: 'Profile', icon: 'person' },
    { path: '/settings', label: 'Settings', icon: 'settings' }
  ];

  const isActivePath = (path) => location.pathname === path;

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-custom-bg-2 shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onTransitionEnd={() => {
          if (!isOpen) setIsAnimating(false);
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-custom-border">
          <Link 
            to="/" 
            className="text-xl font-bold text-custom-text"
            onClick={handleLinkClick}
          >
            Campus<span className="text-custom-teal">Connect</span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-custom-bg transition-colors"
            aria-label="Close menu"
          >
            <span className="material-icons text-custom-text">close</span>
          </button>
        </div>

        {/* User Info (if authenticated) */}
        {isAuthenticated && user && (
          <div className="p-4 border-b border-custom-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-custom-blue to-custom-teal flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="font-semibold text-custom-text">{user.name || 'User'}</p>
                <p className="text-sm text-custom-text-secondary">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          {isAuthenticated ? (
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'bg-custom-teal text-black font-semibold'
                        : 'text-custom-text hover:bg-custom-bg hover:text-custom-teal'
                    }`}
                  >
                    <span className="material-icons text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.path === '/messages' && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        3
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-3">
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="block w-full bg-custom-blue text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={handleLinkClick}
                className="block w-full bg-custom-bg border border-custom-border text-custom-text text-center py-3 rounded-lg font-semibold hover:bg-custom-bg-3 transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}
        </nav>

        {/* Footer Actions */}
        {isAuthenticated && (
          <div className="p-4 border-t border-custom-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-custom-text-secondary">Points</span>
              <span className="font-semibold text-custom-text flex items-center">
                <span className="material-icons text-yellow-500 text-sm mr-1">star</span>
                {user?.points || 0}
              </span>
            </div>
            <button
              onClick={() => {
                handleLinkClick();
                // Handle logout
              }}
              className="w-full flex items-center justify-center space-x-2 bg-red-500 bg-opacity-10 text-red-500 py-2 rounded-lg hover:bg-opacity-20 transition-colors"
            >
              <span className="material-icons text-sm">logout</span>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
