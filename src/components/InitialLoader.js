import React from 'react';

const InitialLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-custom-blue to-custom-teal z-50">
      <div className="text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            Campus<span className="text-yellow-300">Connect</span>
          </h1>
          <p className="text-white text-opacity-90 text-lg">Student Event Networking Platform</p>
        </div>
        
        {/* Animated Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white border-opacity-30 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <p className="text-white text-sm animate-pulse">Loading your experience...</p>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
