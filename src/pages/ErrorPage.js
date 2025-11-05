import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ErrorPage = ({ errorCode = '404', errorMessage = 'Page not found' }) => {
  const navigate = useNavigate();
  
  const handleRetry = () => {
    window.location.reload();
  };

  const errorDetails = {
    '404': {
      title: 'Page Not Found',
      description: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
      icon: 'search_off',
      color: 'text-custom-blue'
    },
    '403': {
      title: 'Access Denied',
      description: 'You do not have permission to access this resource. Please contact support if you believe this is an error.',
      icon: 'lock',
      color: 'text-red-500'
    },
    '500': {
      title: 'Server Error',
      description: 'Something went wrong on our end. We are working to fix the issue. Please try again later.',
      icon: 'error',
      color: 'text-custom-orange'
    },
    'network': {
      title: 'Network Error',
      description: 'Unable to connect to the server. Please check your internet connection and try again.',
      icon: 'wifi_off',
      color: 'text-yellow-500'
    }
  };

  const error = errorDetails[errorCode] || errorDetails['404'];

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content" className="flex-1 container mx-auto px-4 lg:px-8 py-8 sm:py-16 flex items-center justify-center" role="main">
        <div className="max-w-2xl w-full text-center">
          {/* Error Icon */}
          <div className={`mb-6 sm:mb-8 ${error.color}`} aria-hidden="true">
            <span className="material-icons text-6xl sm:text-8xl animate-pulse">
              {error.icon}
            </span>
          </div>

          {/* Error Code */}
          <h1 className="text-4xl sm:text-6xl font-bold text-custom-text mb-4 animate-slideUp">
            {errorCode}
          </h1>

          {/* Error Title */}
          <h2 className="text-3xl font-semibold text-custom-text mb-4">
            {error.title}
          </h2>

          {/* Error Description */}
          <p className="text-custom-text-secondary text-lg mb-8 max-w-md mx-auto">
            {error.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center" role="group" aria-label="Error page actions">
            {(errorCode === '500' || errorCode === 'network') && (
              <button
                onClick={handleRetry}
                className="flex items-center justify-center space-x-2 bg-custom-teal text-black px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                aria-label="Retry loading the page"
              >
                <span className="material-icons text-sm">refresh</span>
                <span>Retry</span>
              </button>
            )}
            
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center space-x-2 bg-custom-bg-2 border border-custom-border text-custom-text px-6 py-3 rounded-lg hover:bg-custom-bg-3 transition-colors"
              aria-label="Go back to previous page"
            >
              <span className="material-icons text-sm">arrow_back</span>
              <span>Go Back</span>
            </button>
            
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 btn-primary text-white px-6 py-3 rounded-lg font-semibold"
              aria-label="Return to homepage"
            >
              <span className="material-icons text-sm">home</span>
              <span>Go to Homepage</span>
            </Link>
          </div>

          {/* Helpful Links */}
          <nav className="mt-12 p-6 bg-custom-bg-2 rounded-lg border border-custom-border" aria-label="Helpful navigation links">
            <h3 className="text-lg font-semibold text-custom-text mb-4">
              Helpful Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/events"
                className="flex items-center justify-center space-x-2 text-custom-teal hover:text-custom-text transition-colors"
              >
                <span className="material-icons text-sm">event</span>
                <span>Browse Events</span>
              </Link>
              <Link
                to="/network"
                className="flex items-center justify-center space-x-2 text-custom-teal hover:text-custom-text transition-colors"
              >
                <span className="material-icons text-sm">people</span>
                <span>Network</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center justify-center space-x-2 text-custom-teal hover:text-custom-text transition-colors"
              >
                <span className="material-icons text-sm">help</span>
                <span>Get Help</span>
              </Link>
            </div>
          </nav>

          {/* Error Code Display */}
          {errorCode === '404' && (
            <div className="mt-8 text-custom-text-secondary text-sm">
              <p>Error ID: {Date.now()}</p>
              <p>If this problem persists, please contact support.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ErrorPage;
