import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  className = '', 
  overlay = false,
  text = 'Loading...',
  showText = false 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };

  const spinnerContent = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          border-custom-border 
          border-t-custom-teal 
          animate-spin
          relative
        `}
      >
        <div className="absolute inset-0 border-t-2 border-custom-teal opacity-30 rounded-full"></div>
      </div>
      {showText && (
        <span className="text-custom-text-secondary text-sm font-medium animate-pulse">
          {text}
        </span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-custom-bg bg-opacity-50 backdrop-blur-sm z-50">
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;
