import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-custom-bg text-custom-text flex items-center justify-center p-4">
          <div className="bg-custom-bg-2 rounded-lg shadow-xl p-8 max-w-lg w-full border border-custom-border">
            <div className="text-center">
              <span className="material-icons text-6xl text-red-500 mb-4">error_outline</span>
              <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
              <p className="text-custom-text-secondary mb-6">
                We apologize for the inconvenience. The application encountered an unexpected error.
              </p>
              <div className="bg-custom-bg rounded-lg p-4 mb-6 text-left">
                <p className="text-sm font-mono text-custom-text-secondary break-words">
                  {this.state.error?.message || 'An unknown error occurred'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-custom-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2"
                  onClick={() => window.location.reload()}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span className="material-icons">refresh</span>
                    <span>Reload Page</span>
                  </span>
                </button>
                <button
                  className="bg-custom-bg border border-custom-border text-custom-text px-6 py-2 rounded-lg hover:bg-custom-bg-3 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2"
                  onClick={() => window.location.href = '/'}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span className="material-icons">home</span>
                    <span>Go to Homepage</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
