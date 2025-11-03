import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { NetworkingProvider } from './contexts/NetworkingContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { QueryProvider } from './contexts/QueryProvider';
import ErrorBoundary from './components/ErrorBoundary';
import ToastContainer from './components/Toast';
import { reportWebVitals, observeLongTasks, observeLayoutShifts } from './utils/performance';
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
import ErrorPage from './pages/ErrorPage';

const App = () => {
  useEffect(() => {
    // Initialize performance monitoring
    if (process.env.NODE_ENV === 'production') {
      observeLongTasks();
      observeLayoutShifts();
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <NetworkingProvider>
              <NotificationProvider>
                <Router>
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
                      <Route path="*" element={<ErrorPage />} />
                    </Routes>
                    <ToastContainer />
                  </div>
                </Router>
              </NotificationProvider>
            </NetworkingProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};

export default App;

// Report Web Vitals
if (typeof window !== 'undefined') {
  import('web-vitals').then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
    onCLS(reportWebVitals);
    onINP(reportWebVitals);
    onLCP(reportWebVitals);
    onFCP(reportWebVitals);
    onTTFB(reportWebVitals);
  });
}
