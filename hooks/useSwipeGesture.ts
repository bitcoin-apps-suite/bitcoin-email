'use client';

import { useEffect, useRef, useState } from 'react';

interface SwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeStart?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  onSwipeEnd?: () => void;
}

interface SwipeOptions {
  threshold?: number; // Minimum distance to trigger swipe (default: 50px)
  velocityThreshold?: number; // Minimum velocity to trigger swipe (default: 0.3)
  preventDefaultTouchmoveEvent?: boolean; // Prevent default touchmove behavior
}

export interface SwipeState {
  swiping: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  deltaX: number;
  deltaY: number;
}

/**
 * useSwipeGesture Hook
 *
 * Detects swipe gestures on mobile devices
 *
 * @example
 * const { ref, swipeState } = useSwipeGesture({
 *   onSwipeLeft: () => console.log('Swiped left'),
 *   onSwipeRight: () => console.log('Swiped right'),
 *   threshold: 75,
 * });
 *
 * <div ref={ref}>Swipeable content</div>
 */
export const useSwipeGesture = (
  callbacks: SwipeCallbacks = {},
  options: SwipeOptions = {}
) => {
  const {
    threshold = 50,
    velocityThreshold = 0.3,
    preventDefaultTouchmoveEvent = false,
  } = options;

  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onSwipeStart,
    onSwipeEnd,
  } = callbacks;

  const ref = useRef<HTMLDivElement>(null);
  const [swipeState, setSwipeState] = useState<SwipeState>({
    swiping: false,
    direction: null,
    deltaX: 0,
    deltaY: 0,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let touchStartTime = 0;
    let currentDirection: 'left' | 'right' | 'up' | 'down' | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();

      setSwipeState({
        swiping: true,
        direction: null,
        deltaX: 0,
        deltaY: 0,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (preventDefaultTouchmoveEvent) {
        e.preventDefault();
      }

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - touchStartX;
      const deltaY = currentY - touchStartY;

      // Determine direction based on dominant axis
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        currentDirection = deltaX > 0 ? 'right' : 'left';
      } else {
        currentDirection = deltaY > 0 ? 'down' : 'up';
      }

      setSwipeState({
        swiping: true,
        direction: currentDirection,
        deltaX,
        deltaY,
      });

      if (onSwipeStart && !swipeState.direction && currentDirection) {
        onSwipeStart(currentDirection);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const time = Date.now() - touchStartTime;
      const velocity = distance / time;

      setSwipeState({
        swiping: false,
        direction: null,
        deltaX: 0,
        deltaY: 0,
      });

      // Check if swipe meets threshold requirements
      if (distance < threshold || velocity < velocityThreshold) {
        if (onSwipeEnd) onSwipeEnd();
        return;
      }

      // Determine swipe direction and trigger callback
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX > absY) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }

      if (onSwipeEnd) onSwipeEnd();
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventDefaultTouchmoveEvent });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    threshold,
    velocityThreshold,
    preventDefaultTouchmoveEvent,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onSwipeStart,
    onSwipeEnd,
    swipeState.direction,
  ]);

  return { ref, swipeState };
};

export default useSwipeGesture;
