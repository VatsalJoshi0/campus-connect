import React, { useEffect, Suspense, lazy, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { NetworkingProvider } from './contexts/NetworkingContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { QueryProvider } from './contexts/QueryProvider';
import ErrorBoundary from './components/ErrorBoundary';
import ToastContainer from './components/Toast';
import InitialLoader from './components/InitialLoader';
import LoadingSpinner from './components/LoadingSpinner';
import { reportWebVitals, observeLongTasks, observeLayoutShifts } from './utils/performance';

// Lazy load all pages for code-splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const NetworkPage = lazy(() => import('./pages/NetworkPage'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));
const LiveSessionsPage = lazy(() => import('./pages/LiveSessionsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const SchedulePage = lazy(() => import('./pages/SchedulePage'));
const SocialFeedPage = lazy(() => import('./pages/SocialFeedPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

const App = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Initialize performance monitoring
    if (process.env.NODE_ENV === 'production') {
      observeLongTasks();
      observeLayoutShifts();
    }

    // Show initial loader for better UX
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Show branded loading screen on first load
  if (isInitialLoad) {
    return <InitialLoader />;
  }

  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <NetworkingProvider>
              <NotificationProvider>
                <Router>
                  <div className="bg-custom-bg text-custom-text min-h-screen transition-theme">
                    <Suspense 
                      fallback={
                        <div className="min-h-screen flex items-center justify-center">
                          <LoadingSpinner size="large" showText={true} text="Loading page..." />
                        </div>
                      }
                    >
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
                    </Suspense>
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
