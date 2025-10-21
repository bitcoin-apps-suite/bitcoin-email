'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyLoadOptions {
  threshold?: number; // Intersection threshold (default: 0.1 = 10%)
  rootMargin?: string; // Margin around root (default: '50px')
  triggerOnce?: boolean; // Only trigger once (default: true)
}

/**
 * useLazyLoad Hook
 *
 * Detects when an element enters the viewport for lazy loading
 *
 * @example
 * const { ref, isVisible } = useLazyLoad();
 *
 * <div ref={ref}>
 *   {isVisible && <HeavyComponent />}
 * </div>
 */
export const useLazyLoad = (options: LazyLoadOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true); // Fallback: show immediately if not supported
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (triggerOnce && element) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

/**
 * useIntersectionObserver Hook
 *
 * More advanced intersection observer hook with callback
 *
 * @example
 * const { ref } = useIntersectionObserver(
 *   (entry) => {
 *     console.log('Element visibility changed:', entry.isIntersecting);
 *   },
 *   { threshold: 0.5 }
 * );
 */
export const useIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: LazyLoadOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      return; // Skip if not supported
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [callback, threshold, rootMargin]);

  return { ref };
};

/**
 * useMediaQuery Hook
 *
 * Detects media query matches for responsive behavior
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isPortrait = useMediaQuery('(orientation: portrait)');
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
};

/**
 * useIsMobile Hook
 *
 * Convenience hook to detect mobile devices
 */
export const useIsMobile = (): boolean => {
  return useMediaQuery('(max-width: 768px)');
};

/**
 * useIsTablet Hook
 *
 * Convenience hook to detect tablet devices
 */
export const useIsTablet = (): boolean => {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
};

/**
 * useIsDesktop Hook
 *
 * Convenience hook to detect desktop devices
 */
export const useIsDesktop = (): boolean => {
  return useMediaQuery('(min-width: 1025px)');
};

/**
 * useIsPortrait Hook
 *
 * Detects portrait orientation
 */
export const useIsPortrait = (): boolean => {
  return useMediaQuery('(orientation: portrait)');
};

/**
 * useIsLandscape Hook
 *
 * Detects landscape orientation
 */
export const useIsLandscape = (): boolean => {
  return useMediaQuery('(orientation: landscape)');
};

/**
 * usePrefersReducedMotion Hook
 *
 * Detects if user prefers reduced motion
 */
export const usePrefersReducedMotion = (): boolean => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

/**
 * usePrefersDarkMode Hook
 *
 * Detects if user prefers dark mode
 */
export const usePrefersDarkMode = (): boolean => {
  return useMediaQuery('(prefers-color-scheme: dark)');
};

/**
 * usePrefersHighContrast Hook
 *
 * Detects if user prefers high contrast
 */
export const usePrefersHighContrast = (): boolean => {
  return useMediaQuery('(prefers-contrast: high)');
};

export default useLazyLoad;
