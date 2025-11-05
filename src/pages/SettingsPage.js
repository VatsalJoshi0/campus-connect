import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const SettingsPage = () => {
  const { user, updateUser, logout } = useAuth();
  useTheme(); // ThemeToggle component handles theme state internally
  const fileInputRef = React.useRef(null);
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      eventReminders: true,
      connectionRequests: true,
      messages: true,
      weeklyDigest: true
    },
    privacy: {
      profileVisibility: 'public', // public, connections, private
      showEmail: false,
      showPhone: false,
      showProjects: true,
      allowMessagesFromStrangers: true,
      showOnlineStatus: true
    },
    preferences: {
      language: 'en',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      autoJoinEvents: false,
      smartNotifications: true
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-custom-bg transition-colors">
      <div className="flex-1 pr-4">
        <h4 className="font-semibold text-custom-text mb-1">{label}</h4>
        {description && (
          <p className="text-sm text-custom-text-secondary leading-relaxed">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        role="switch"
        aria-checked={enabled}
        aria-label={`Toggle ${label}`}
        className={`relative inline-flex h-7 w-14 min-w-[56px] flex-shrink-0 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2 focus:ring-offset-custom-bg-2 ${
          enabled 
            ? 'bg-custom-teal shadow-lg shadow-custom-teal/30' 
            : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        {/* Toggle Circle */}
        <span
          className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
            enabled ? 'translate-x-7' : 'translate-x-0.5'
          }`}
        >
          {/* Icon indicator */}
          {enabled ? (
            <svg className="h-3 w-3 text-custom-teal" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </span>
        
        {/* ON/OFF Labels */}
        <span 
          className={`absolute left-2 text-[10px] font-bold transition-opacity duration-200 ${
            enabled ? 'opacity-100 text-white' : 'opacity-0'
          }`}
        >
          ON
        </span>
        <span 
          className={`absolute right-2 text-[10px] font-bold transition-opacity duration-200 ${
            !enabled ? 'opacity-100 text-gray-500 dark:text-gray-400' : 'opacity-0'
          }`}
        >
          OFF
        </span>
      </button>
    </div>
  );

  const SelectField = ({ value, onChange, options, label, description }) => (
    <div className="py-3">
      <label className="block font-medium text-custom-text mb-1">{label}</label>
      {description && (
        <p className="text-sm text-custom-text-secondary mb-2">{description}</p>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-custom-bg border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-custom-text mb-2">Settings</h1>
          <p className="text-custom-text-secondary">
            Manage your account preferences and privacy settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-4">
              <nav className="space-y-2">
                {[
                  { id: 'account', label: 'Account', icon: 'person' },
                  { id: 'notifications', label: 'Notifications', icon: 'notifications' },
                  { id: 'privacy', label: 'Privacy & Security', icon: 'security' },
                  { id: 'preferences', label: 'Preferences', icon: 'tune' },
                  { id: 'data', label: 'Data & Storage', icon: 'storage' },
                  { id: 'help', label: 'Help & Support', icon: 'help' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                      activeTab === tab.id
                        ? 'bg-custom-teal text-black'
                        : 'text-custom-text hover:bg-custom-bg'
                    }`}
                  >
                    <span className="material-icons text-sm">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-8">
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-custom-text">Account Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div>
                        <div className="mb-2">Profile Photo</div>
                        <div className="flex items-center space-x-3">
                          <div>
                            {/* reuse avatar component visually by showing img if present or initials via updateUser */}
                            {user?.profileImage ? (
                              <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover shadow" />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-lg text-white shadow">
                                {user?.name ? (user.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()) : 'U'}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <input
                              type="file"
                              accept="image/*"
                              ref={fileInputRef}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = () => {
                                  const dataUrl = reader.result;
                                  updateUser({ profileImage: dataUrl });
                                };
                                reader.readAsDataURL(file);
                                e.target.value = '';
                              }}
                              className="hidden"
                            />
                            <div className="space-x-2">
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-1 bg-custom-teal text-black rounded-md"
                              >
                                Upload Photo
                              </button>
                              {user?.profileImage && (
                                <button
                                  onClick={() => updateUser({ profileImage: null })}
                                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-custom-text-secondary text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        onChange={(e) => updateUser({ name: e.target.value })}
                        className="w-full px-3 py-2 bg-custom-bg border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-custom-text-secondary text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full px-3 py-2 bg-custom-bg border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
                        disabled
                      />
                      <p className="text-xs text-custom-text-secondary mt-1">
                        Contact support to change your email address
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-custom-border pt-6">
                    <h3 className="text-lg font-semibold text-custom-text mb-4">Theme Preferences</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-custom-text">Dark Mode</h4>
                        <p className="text-sm text-custom-text-secondary">
                          Switch between light and dark themes
                        </p>
                      </div>
                      <ThemeToggle />
                    </div>
                  </div>

                  <div className="border-t border-custom-border pt-6">
                    <h3 className="text-lg font-semibold text-custom-text mb-4">Login Options</h3>
                    <div className="space-y-4">
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        Logout
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 ml-4">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-custom-text">Notification Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-2">
                      <h3 className="text-lg font-semibold text-custom-text mb-2 px-4 pt-2">Notification Channels</h3>
                      <div className="space-y-0 divide-y divide-custom-border">
                        <ToggleSwitch
                          enabled={settings.notifications.email}
                          onChange={(value) => handleSettingChange('notifications', 'email', value)}
                          label="Email Notifications"
                          description="Receive notifications via email"
                        />
                        <ToggleSwitch
                          enabled={settings.notifications.push}
                          onChange={(value) => handleSettingChange('notifications', 'push', value)}
                          label="Push Notifications"
                          description="Receive push notifications in your browser"
                        />
                        <ToggleSwitch
                          enabled={settings.notifications.sms}
                          onChange={(value) => handleSettingChange('notifications', 'sms', value)}
                          label="SMS Notifications"
                          description="Receive important notifications via SMS"
                        />
                      </div>
                    </div>

                    <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-2">
                      <h3 className="text-lg font-semibold text-custom-text mb-2 px-4 pt-2">Event Notifications</h3>
                      <div className="space-y-0 divide-y divide-custom-border">
                        <ToggleSwitch
                          enabled={settings.notifications.eventReminders}
                          onChange={(value) => handleSettingChange('notifications', 'eventReminders', value)}
                          label="Event Reminders"
                          description="Get reminded about upcoming events you've registered for"
                        />
                        <ToggleSwitch
                          enabled={settings.notifications.connectionRequests}
                          onChange={(value) => handleSettingChange('notifications', 'connectionRequests', value)}
                          label="Connection Requests"
                          description="Notify when someone wants to connect with you"
                        />
                        <ToggleSwitch
                          enabled={settings.notifications.messages}
                          onChange={(value) => handleSettingChange('notifications', 'messages', value)}
                          label="New Messages"
                          description="Get notified about new messages"
                        />
                        <ToggleSwitch
                          enabled={settings.notifications.weeklyDigest}
                          onChange={(value) => handleSettingChange('notifications', 'weeklyDigest', value)}
                          label="Weekly Digest"
                          description="Receive a weekly summary of your activity"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-custom-text">Privacy & Security</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <SelectField
                        value={settings.privacy.profileVisibility}
                        onChange={(value) => handleSettingChange('privacy', 'profileVisibility', value)}
                        label="Profile Visibility"
                        description="Control who can see your profile"
                        options={[
                          { value: 'public', label: 'Public - Anyone can see your profile' },
                          { value: 'connections', label: 'Connections Only - Only your connections can see your profile' },
                          { value: 'private', label: 'Private - Only you can see your profile' }
                        ]}
                      />
                    </div>

                    <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-2">
                      <h3 className="text-lg font-semibold text-custom-text mb-2 px-4 pt-2">Contact Information</h3>
                      <div className="space-y-0 divide-y divide-custom-border">
                        <ToggleSwitch
                          enabled={settings.privacy.showEmail}
                          onChange={(value) => handleSettingChange('privacy', 'showEmail', value)}
                          label="Show Email Address"
                          description="Allow others to see your email address"
                        />
                        <ToggleSwitch
                          enabled={settings.privacy.showPhone}
                          onChange={(value) => handleSettingChange('privacy', 'showPhone', value)}
                          label="Show Phone Number"
                          description="Allow others to see your phone number"
                        />
                      </div>
                    </div>

                    <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-2">
                      <h3 className="text-lg font-semibold text-custom-text mb-2 px-4 pt-2">Activity Settings</h3>
                      <div className="space-y-0 divide-y divide-custom-border">
                        <ToggleSwitch
                          enabled={settings.privacy.showProjects}
                          onChange={(value) => handleSettingChange('privacy', 'showProjects', value)}
                          label="Show Projects"
                          description="Display your projects on your profile"
                        />
                        <ToggleSwitch
                          enabled={settings.privacy.allowMessagesFromStrangers}
                          onChange={(value) => handleSettingChange('privacy', 'allowMessagesFromStrangers', value)}
                          label="Allow Messages from Non-Connections"
                          description="Let people who aren't connected with you send messages"
                        />
                        <ToggleSwitch
                          enabled={settings.privacy.showOnlineStatus}
                          onChange={(value) => handleSettingChange('privacy', 'showOnlineStatus', value)}
                          label="Show Online Status"
                          description="Let others see when you're online"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-custom-text">Preferences</h2>
                  
                  <div className="space-y-6">
                    <SelectField
                      value={settings.preferences.language}
                      onChange={(value) => handleSettingChange('preferences', 'language', value)}
                      label="Language"
                      description="Choose your preferred language"
                      options={[
                        { value: 'en', label: 'English' },
                        { value: 'hi', label: 'Hindi' },
                        { value: 'mr', label: 'Marathi' }
                      ]}
                    />

                    <SelectField
                      value={settings.preferences.timezone}
                      onChange={(value) => handleSettingChange('preferences', 'timezone', value)}
                      label="Timezone"
                      description="Your local timezone for event scheduling"
                      options={[
                        { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
                        { value: 'America/New_York', label: 'Eastern Time (ET)' },
                        { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' }
                      ]}
                    />

                    <SelectField
                      value={settings.preferences.dateFormat}
                      onChange={(value) => handleSettingChange('preferences', 'dateFormat', value)}
                      label="Date Format"
                      description="How dates should be displayed"
                      options={[
                        { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                        { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                        { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
                      ]}
                    />

                    <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-2">
                      <h3 className="text-lg font-semibold text-custom-text mb-2 px-4 pt-2">Smart Features</h3>
                      <div className="space-y-0 divide-y divide-custom-border">
                        <ToggleSwitch
                          enabled={settings.preferences.autoJoinEvents}
                          onChange={(value) => handleSettingChange('preferences', 'autoJoinEvents', value)}
                          label="Auto-join Recommended Events"
                          description="Automatically register for events that match your interests"
                        />
                        <ToggleSwitch
                          enabled={settings.preferences.smartNotifications}
                          onChange={(value) => handleSettingChange('preferences', 'smartNotifications', value)}
                          label="Smart Notifications"
                          description="Use AI to prioritize important notifications"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'data' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-custom-text">Data & Storage</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-custom-bg p-6 rounded-lg border border-custom-border">
                      <h3 className="text-lg font-semibold text-custom-text mb-4">Storage Usage</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-custom-text">Profile Data</span>
                          <span className="text-custom-text-secondary">2.5 MB</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-custom-text">Messages</span>
                          <span className="text-custom-text-secondary">15.3 MB</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-custom-text">Media Files</span>
                          <span className="text-custom-text-secondary">45.7 MB</span>
                        </div>
                        <div className="border-t border-custom-border pt-4">
                          <div className="flex items-center justify-between font-semibold">
                            <span className="text-custom-text">Total Usage</span>
                            <span className="text-custom-teal">63.5 MB</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-custom-text mb-4">Data Management</h3>
                      <div className="space-y-3">
                        <button className="w-full text-left p-4 bg-custom-bg rounded-lg hover:bg-custom-bg-2 transition duration-300 border border-custom-border">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-custom-text">Export My Data</h4>
                              <p className="text-sm text-custom-text-secondary">Download a copy of your data</p>
                            </div>
                            <span className="material-icons text-custom-text-secondary">download</span>
                          </div>
                        </button>
                        
                        <button className="w-full text-left p-4 bg-custom-bg rounded-lg hover:bg-custom-bg-2 transition duration-300 border border-custom-border">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-custom-text">Clear Cache</h4>
                              <p className="text-sm text-custom-text-secondary">Free up space by clearing cached data</p>
                            </div>
                            <span className="material-icons text-custom-text-secondary">clear</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'help' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-custom-text">Help & Support</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-custom-bg p-6 rounded-lg border border-custom-border">
                      <h3 className="text-lg font-semibold text-custom-text mb-4">Get Help</h3>
                      <div className="space-y-3">
                        <button className="w-full text-left p-4 bg-custom-bg-2 rounded-lg hover:bg-custom-bg transition duration-300">
                          <div className="flex items-center space-x-3">
                            <span className="material-icons text-custom-teal">help_center</span>
                            <div>
                              <h4 className="font-medium text-custom-text">Help Center</h4>
                              <p className="text-sm text-custom-text-secondary">Browse our help articles and guides</p>
                            </div>
                          </div>
                        </button>
                        
                        <button className="w-full text-left p-4 bg-custom-bg-2 rounded-lg hover:bg-custom-bg transition duration-300">
                          <div className="flex items-center space-x-3">
                            <span className="material-icons text-custom-teal">chat</span>
                            <div>
                              <h4 className="font-medium text-custom-text">Contact Support</h4>
                              <p className="text-sm text-custom-text-secondary">Get in touch with our support team</p>
                            </div>
                          </div>
                        </button>
                        
                        <button className="w-full text-left p-4 bg-custom-bg-2 rounded-lg hover:bg-custom-bg transition duration-300">
                          <div className="flex items-center space-x-3">
                            <span className="material-icons text-custom-teal">feedback</span>
                            <div>
                              <h4 className="font-medium text-custom-text">Send Feedback</h4>
                              <p className="text-sm text-custom-text-secondary">Help us improve Campus Connect</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="bg-custom-bg p-6 rounded-lg border border-custom-border">
                      <h3 className="text-lg font-semibold text-custom-text mb-4">App Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-custom-text-secondary">Version</span>
                          <span className="text-custom-text">1.0.0</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-custom-text-secondary">Last Updated</span>
                          <span className="text-custom-text">March 2025</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-custom-text-secondary">Build</span>
                          <span className="text-custom-text">2025.03.001</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SettingsPage;
