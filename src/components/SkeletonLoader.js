import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-custom-bg-2 rounded-lg overflow-hidden border border-custom-border animate-pulse">
            <div className="h-48 bg-custom-bg-3"></div>
            <div className="p-6">
              <div className="h-6 bg-custom-bg-3 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-custom-bg-3 rounded w-full mb-2"></div>
              <div className="h-4 bg-custom-bg-3 rounded w-5/6 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-custom-bg-3 rounded w-1/3"></div>
                <div className="h-10 bg-custom-bg-3 rounded w-24"></div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-custom-bg-3 rounded-full"></div>
              <div className="flex-1">
                <div className="h-5 bg-custom-bg-3 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-custom-bg-3 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        );

      case 'message':
        return (
          <div className="flex items-start space-x-3 p-4 animate-pulse">
            <div className="w-10 h-10 bg-custom-bg-3 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-custom-bg-3 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-custom-bg-3 rounded w-3/4"></div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="bg-custom-bg-2 p-4 rounded-lg border border-custom-border animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-5 bg-custom-bg-3 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-custom-bg-3 rounded w-1/2"></div>
              </div>
              <div className="h-8 bg-custom-bg-3 rounded w-20"></div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="animate-pulse">
            <div className="h-4 bg-custom-bg-3 rounded w-full mb-2"></div>
            <div className="h-4 bg-custom-bg-3 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-custom-bg-3 rounded w-4/6"></div>
          </div>
        );

      case 'table-row':
        return (
          <tr className="animate-pulse">
            <td className="px-4 py-3">
              <div className="h-4 bg-custom-bg-3 rounded w-full"></div>
            </td>
            <td className="px-4 py-3">
              <div className="h-4 bg-custom-bg-3 rounded w-3/4"></div>
            </td>
            <td className="px-4 py-3">
              <div className="h-4 bg-custom-bg-3 rounded w-1/2"></div>
            </td>
            <td className="px-4 py-3">
              <div className="h-8 bg-custom-bg-3 rounded w-20"></div>
            </td>
          </tr>
        );

      case 'stats':
        return (
          <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border text-center animate-pulse">
            <div className="h-10 w-10 bg-custom-bg-3 rounded-full mx-auto mb-3"></div>
            <div className="h-8 bg-custom-bg-3 rounded w-1/2 mx-auto mb-2"></div>
            <div className="h-4 bg-custom-bg-3 rounded w-3/4 mx-auto"></div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
