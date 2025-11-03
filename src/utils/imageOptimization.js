// Image Optimization Utilities
// Handles image loading, compression, and optimization

/**
 * Compress and resize image before upload
 * @param {File} file - Image file to compress
 * @param {Object} options - Compression options
 * @returns {Promise<Blob>} - Compressed image blob
 */
export const compressImage = (file, options = {}) => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    type = 'image/jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Calculate new dimensions
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Image compression failed'));
            }
          },
          type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Generate thumbnail from image
 * @param {File} file - Image file
 * @param {number} size - Thumbnail size
 * @returns {Promise<Blob>} - Thumbnail blob
 */
export const generateThumbnail = (file, size = 200) => {
  return compressImage(file, {
    maxWidth: size,
    maxHeight: size,
    quality: 0.7
  });
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} - Validation result
 */
export const validateImage = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  } = options;

  const errors = [];

  if (!file) {
    errors.push('No file provided');
    return { valid: false, errors };
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(', ')}`);
  }

  if (file.size > maxSize) {
    errors.push(`File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum ${(maxSize / 1024 / 1024).toFixed(2)}MB`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Convert image to base64
 * @param {File} file - Image file
 * @returns {Promise<string>} - Base64 string
 */
export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Lazy load images with Intersection Observer
 * @param {string} selector - CSS selector for images
 */
export const lazyLoadImages = (selector = 'img[data-src]') => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    const images = document.querySelectorAll(selector);
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without Intersection Observer
    const images = document.querySelectorAll(selector);
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }
};

/**
 * Preload critical images
 * @param {Array<string>} urls - Array of image URLs
 */
export const preloadImages = (urls) => {
  return Promise.all(
    urls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Failed to load ${url}`));
        img.src = url;
      });
    })
  );
};

/**
 * Get image dimensions
 * @param {File|string} source - Image file or URL
 * @returns {Promise<Object>} - Image dimensions
 */
export const getImageDimensions = (source) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight
      });
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    
    if (typeof source === 'string') {
      img.src = source;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => { img.src = e.target.result; };
      reader.onerror = reject;
      reader.readAsDataURL(source);
    }
  });
};

/**
 * Create responsive image srcset
 * @param {string} baseUrl - Base image URL
 * @param {Array<number>} widths - Array of widths
 * @returns {string} - srcset string
 */
export const createSrcSet = (baseUrl, widths = [320, 640, 960, 1280, 1920]) => {
  return widths
    .map(width => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
};

/**
 * Optimize image URL with query parameters
 * @param {string} url - Image URL
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized URL
 */
export const optimizeImageUrl = (url, options = {}) => {
  const {
    width,
    height,
    quality = 80,
    format = 'auto'
  } = options;

  const params = new URLSearchParams();
  if (width) params.append('w', width);
  if (height) params.append('h', height);
  params.append('q', quality);
  params.append('fm', format);

  return `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;
};

export default {
  compressImage,
  generateThumbnail,
  validateImage,
  imageToBase64,
  lazyLoadImages,
  preloadImages,
  getImageDimensions,
  createSrcSet,
  optimizeImageUrl
};
