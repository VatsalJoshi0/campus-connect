import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { NetworkingProvider } from './contexts/NetworkingContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';
import ToastContainer from './components/Toast';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import EventsPage from './pages/EventsPage';
import NetworkPage from './pages/NetworkPage';
import MessagesPage from './pages/MessagesPage';
import LiveSessionsPage from './pages/LiveSessionsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import SchedulePage from './pages/SchedulePage';
import SocialFeedPage from './pages/SocialFeedPage';

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AuthProvider>
        <NetworkingProvider>
          <NotificationProvider>
            <Router basename="/campus-connect">
              <div className="bg-custom-bg text-custom-text min-h-screen transition-theme">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/network" element={<NetworkPage />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/live-sessions" element={<LiveSessionsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/schedule" element={<SchedulePage />} />
                  <Route path="/social-feed" element={<SocialFeedPage />} />
                </Routes>
                <ToastContainer />
              </div>
            </Router>
          </NotificationProvider>
        </NetworkingProvider>
      </AuthProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
