'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  onLoad?: () => void;
}

/**
 * ResponsiveImage Component
 *
 * A mobile-optimized image component with:
 * - Lazy loading by default
 * - Responsive sizing
 * - WebP/AVIF format support (via Next.js Image)
 * - Loading states
 * - Error handling
 * - Accessibility features
 *
 * @example
 * <ResponsiveImage
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 *   width={1200}
 *   height={600}
 *   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 * />
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  onLoad,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    // Fallback to a placeholder or default image
    console.error(`Failed to load image: ${src}`);
  };

  // Default responsive sizes if not provided
  const defaultSizes = sizes || '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';

  // Error state
  if (hasError) {
    return (
      <div
        className={`responsive-image-error ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
          background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.95))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '8px',
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`responsive-image-container ${className}`} style={{ position: 'relative' }}>
      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="responsive-image-loading"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '8px',
          }}
        />
      )}

      {/* Next.js optimized image */}
      {width && height ? (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={defaultSizes}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            objectFit,
            width: '100%',
            height: 'auto',
          }}
        />
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className={className}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={defaultSizes}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            objectFit,
          }}
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * LazyImage Component
 *
 * A simpler lazy-loaded image component using native lazy loading
 */
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`lazy-image-container ${className}`} style={{ position: 'relative', width, height }}>
      {!isLoaded && (
        <div
          className="lazy-image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '8px',
          }}
        />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          borderRadius: '8px',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ResponsiveImage;
