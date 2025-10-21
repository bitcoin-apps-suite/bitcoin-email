'use client';

import React, { useRef, useState, useEffect } from 'react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  disabled?: boolean;
  pullDownThreshold?: number; // Distance to pull before triggering refresh (default: 80px)
  maxPullDown?: number; // Maximum pull distance (default: 120px)
  refreshingContent?: React.ReactNode;
  pullingContent?: React.ReactNode;
  className?: string;
}

/**
 * PullToRefresh Component
 *
 * Implements pull-to-refresh functionality for mobile devices
 *
 * @example
 * <PullToRefresh
 *   onRefresh={async () => {
 *     await fetchNewData();
 *   }}
 * >
 *   <EmailList emails={emails} />
 * </PullToRefresh>
 */
export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  disabled = false,
  pullDownThreshold = 80,
  maxPullDown = 120,
  refreshingContent,
  pullingContent,
  className = '',
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canPull, setCanPull] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      // Only allow pull-to-refresh at the top of the scroll
      const scrollTop = container.scrollTop;
      if (scrollTop === 0) {
        startY.current = e.touches[0].clientY;
        setCanPull(true);
      } else {
        setCanPull(false);
      }
      isScrolling = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canPull || isRefreshing) return;

      currentY.current = e.touches[0].clientY;
      const distance = currentY.current - startY.current;

      // Only pull down
      if (distance > 0) {
        isScrolling = true;

        // Apply resistance - pull gets harder the further you pull
        const resistance = 0.4;
        const actualDistance = Math.min(distance * resistance, maxPullDown);
        setPullDistance(actualDistance);

        // Prevent default scroll when pulling
        if (actualDistance > 5) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = async () => {
      if (!canPull || isRefreshing) return;

      setCanPull(false);

      // Trigger refresh if pulled far enough
      if (pullDistance >= pullDownThreshold) {
        setIsRefreshing(true);
        setPullDistance(pullDownThreshold); // Keep at threshold during refresh

        try {
          await onRefresh();
        } catch (error) {
          console.error('Refresh error:', error);
        } finally {
          setIsRefreshing(false);
          setPullDistance(0);
        }
      } else {
        // Snap back if not pulled far enough
        setPullDistance(0);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [canPull, isRefreshing, pullDistance, pullDownThreshold, maxPullDown, onRefresh, disabled]);

  // Calculate opacity and rotation based on pull distance
  const progress = Math.min(pullDistance / pullDownThreshold, 1);
  const spinnerRotation = progress * 360;
  const spinnerOpacity = progress;

  return (
    <div
      ref={containerRef}
      className={`pull-to-refresh-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        height: '100%',
      }}
    >
      {/* Pull indicator */}
      <div
        className="pull-to-refresh-indicator"
        style={{
          position: 'absolute',
          top: -60,
          left: 0,
          right: 0,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${pullDistance}px)`,
          transition: isRefreshing ? 'none' : 'transform 0.3s ease',
          zIndex: 1,
        }}
      >
        {isRefreshing ? (
          // Refreshing state
          refreshingContent || (
            <div className="refresh-spinner">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  animation: 'spin 1s linear infinite',
                  color: '#ef4444',
                }}
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </div>
          )
        ) : (
          // Pulling state
          pullingContent || (
            <div
              className="pull-indicator"
              style={{
                opacity: spinnerOpacity,
                transition: 'opacity 0.2s ease',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: `rotate(${spinnerRotation}deg)`,
                  transition: 'transform 0.2s ease',
                  color: progress >= 1 ? '#ef4444' : 'rgba(255, 255, 255, 0.5)',
                }}
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </div>
          )
        )}
      </div>

      {/* Content */}
      <div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: isRefreshing ? 'none' : 'transform 0.3s ease',
        }}
      >
        {children}
      </div>

      {/* Spinner animation */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PullToRefresh;
