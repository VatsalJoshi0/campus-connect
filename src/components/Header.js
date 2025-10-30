import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNetworking } from '../contexts/NetworkingContext';
import ThemeToggle from './ThemeToggle';
import NotificationDropdown from './NotificationDropdown';
import UserAvatar from './UserAvatar';
import SearchSuggestions from './SearchSuggestions';

const Header = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { notifications } = useNetworking();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef(null);

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const navItems = [
    { path: '/events', label: 'Events', icon: 'event' },
    { path: '/network', label: 'Network', icon: 'people' },
    { path: '/messages', label: 'Messages', icon: 'chat' },
    { path: '/live-sessions', label: 'Live', icon: 'videocam' },
    { path: '/profile', label: 'Profile', icon: 'person' },
    { path: '/settings', label: 'Settings', icon: 'settings' }
  ];

  const isActivePath = (path) => location.pathname === path;

  if (!isAuthenticated) {
    return (
      <header className="bg-custom-bg-2 shadow-md">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link className="text-2xl font-bold text-custom-text" to="/">
              Campus<span className="text-custom-teal">Connect</span>
            </Link>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link
                  to="/login"
                  className="bg-custom-blue text-white px-4 py-2 rounded-lg hover:opacity-90 transition duration-300"
                >
                  Sign In
                </Link>
              </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-custom-bg-2 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <Link className="text-2xl font-bold text-custom-text" to="/">
              Campus<span className="text-custom-teal">Connect</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition duration-300 ${
                    isActivePath(item.path)
                      ? 'bg-teal-400 text-black font-semibold'
                      : 'text-custom-text hover:text-custom-teal hover:bg-custom-bg'
                  }`}
                >
                  <span className="material-icons text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Navigation Toggle */}
            <button className="lg:hidden text-custom-text">
              <span className="material-icons">menu</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block" ref={searchRef}>
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-custom-text-secondary">
                search
              </span>
              <input
                className="search-input bg-custom-bg pl-10 pr-4 py-2 rounded-full text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal w-48 lg:w-64 border border-custom-border"
                placeholder="Search events or people..."
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                onBlur={(e) => {
                  // Delay hiding to allow clicking on suggestions
                  setTimeout(() => {
                    if (!searchRef.current?.contains(document.activeElement)) {
                      setShowSearchSuggestions(false);
                    }
                  }, 200);
                }}
              />
              <SearchSuggestions
                isOpen={showSearchSuggestions}
                searchQuery={searchQuery}
                onClose={() => {
                  setShowSearchSuggestions(false);
                  setSearchQuery('');
                }}
              />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <div className="relative">
              <button
                className="text-custom-text-secondary hover:text-custom-text relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className="material-icons">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <NotificationDropdown
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>

            {/* User Points Display */}
            <div className="hidden sm:flex items-center space-x-2 bg-custom-bg px-3 py-1 rounded-full border border-custom-border">
              <span className="material-icons text-yellow-500 text-sm">star</span>
              <span className="text-sm font-semibold">{user?.points || 0}</span>
            </div>

            {/* User Avatar */}
            <Link to="/profile">
              <UserAvatar 
                user={user} 
                size="md" 
                showOnlineStatus={true}
                className="hover:scale-105 transition-transform duration-300 border-2 border-custom-border"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
