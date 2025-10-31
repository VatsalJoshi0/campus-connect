import React, { useState } from 'react';

/**
 * OptimizedImage Component
 * Implements responsive images, lazy loading, and prevents CLS
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text (required for accessibility)
 * @param {number} width - Intrinsic width of image
 * @param {number} height - Intrinsic height of image
 * @param {string} className - Additional CSS classes
 * @param {string} sizes - Responsive sizes attribute
 * @param {object} srcSet - Object with responsive image sources
 * @param {string} loading - 'lazy' (default) or 'eager'
 * @param {function} onLoad - Callback when image loads
 * @param {function} onError - Callback on error
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  sizes,
  srcSet,
  loading = 'lazy',
  onLoad,
  onError,
  objectFit = 'cover',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  // Generate srcSet string from object if provided
  const generateSrcSet = () => {
    if (!srcSet) return undefined;
    
    return Object.entries(srcSet)
      .map(([size, url]) => `${url} ${size}`)
      .join(', ');
  };

  // Default placeholder based on aspect ratio
  const aspectRatio = width && height ? (height / width) * 100 : 56.25; // Default to 16:9

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        paddingBottom: width && height ? `${aspectRatio}%` : undefined,
        width: width && height ? '100%' : undefined
      }}
    >
      {/* Placeholder/Skeleton */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-custom-bg-3 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-custom-bg-3">
          <div className="text-center text-custom-text-secondary">
            <span className="material-icons text-4xl mb-2">broken_image</span>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          srcSet={generateSrcSet()}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            ${width && height ? 'absolute inset-0 w-full h-full' : ''}
            transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ objectFit }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
