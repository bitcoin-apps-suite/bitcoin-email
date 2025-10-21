# Bitcoin Email - Mobile Features Documentation

## Overview

This document describes the comprehensive mobile optimization features added to the Bitcoin Email application.

## Mobile Styles

### Global Mobile Styles (`app/mobile.css`)
- Touch-friendly button sizes (44x44px minimum)
- Responsive typography scaling
- Mobile-first grid layouts
- Full-screen modals on mobile
- Touch interaction optimizations
- Accessibility features (high contrast, reduced motion)

### Page-Specific Mobile Styles

All pages now have dedicated mobile CSS files:

1. **Compose Page** (`app/compose/compose.mobile.css`)
   - Optimized email composition form
   - Full-width inputs
   - Touch-friendly text areas
   - Mobile-optimized file uploads

2. **Tokenize Page** (`app/tokenize/tokenize.mobile.css`)
   - Multi-step form mobile layout
   - Touch-optimized sliders
   - Mobile tag/chip management
   - Responsive charts and visualizations

3. **Portfolio Page** (`app/portfolio/portfolio.mobile.css`)
   - Single-column card layout
   - Mobile stat displays
   - Touch-friendly action buttons

4. **Contributions, Docs, Jobs, Contracts Pages**
   - Mobile task cards
   - Responsive contributor lists
   - Touch-optimized filters and tabs
   - Mobile leaderboards

5. **Marketing Page** (`app/bitcoin-email/marketing.mobile.css`)
   - Enhanced hero section for mobile
   - Responsive feature grids
   - Mobile-optimized CTAs
   - Touch-friendly navigation

6. **Spam, Cold Email Agency, CSO Action Plan Pages**
   - Basic mobile optimizations
   - Responsive layouts
   - Touch-friendly forms

## Mobile Components

### ResponsiveImage Component (`components/ResponsiveImage.tsx`)

Optimized image loading with:
- Lazy loading by default
- Responsive sizing with srcset
- WebP/AVIF format support (via Next.js Image)
- Loading states with shimmer effect
- Error handling with fallback UI
- Accessibility features

**Usage:**
```tsx
<ResponsiveImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={false}
/>
```

### PullToRefresh Component (`components/PullToRefresh.tsx`)

Native-feeling pull-to-refresh functionality:
- Smooth pull gesture detection
- Customizable pull threshold
- Resistance effect for natural feel
- Custom loading indicators
- Async refresh support

**Usage:**
```tsx
<PullToRefresh
  onRefresh={async () => {
    await fetchNewEmails();
  }}
  pullDownThreshold={80}
>
  <EmailList emails={emails} />
</PullToRefresh>
```

## Mobile Hooks

### useSwipeGesture Hook (`hooks/useSwipeGesture.ts`)

Detects swipe gestures in all directions:
- Left/Right/Up/Down swipe detection
- Configurable threshold and velocity
- Real-time swipe state
- Touch event optimization

**Usage:**
```tsx
const { ref, swipeState } = useSwipeGesture({
  onSwipeLeft: () => navigate('/next'),
  onSwipeRight: () => navigate('/previous'),
  threshold: 75,
});

<div ref={ref}>Swipeable content</div>
```

### useLazyLoad Hook (`hooks/useLazyLoad.ts`)

Intersection Observer-based lazy loading:
- Automatic visibility detection
- Configurable thresholds
- Trigger once or continuous
- Fallback for unsupported browsers

**Usage:**
```tsx
const { ref, isVisible } = useLazyLoad({ threshold: 0.1 });

<div ref={ref}>
  {isVisible && <HeavyComponent />}
</div>
```

### Responsive Hooks

Multiple utility hooks for responsive design:

- `useIsMobile()` - Detects mobile devices (≤768px)
- `useIsTablet()` - Detects tablet devices (769-1024px)
- `useIsDesktop()` - Detects desktop devices (≥1025px)
- `useIsPortrait()` - Detects portrait orientation
- `useIsLandscape()` - Detects landscape orientation
- `usePrefersReducedMotion()` - Detects reduced motion preference
- `usePrefersDarkMode()` - Detects dark mode preference
- `usePrefersHighContrast()` - Detects high contrast preference

**Usage:**
```tsx
const isMobile = useIsMobile();
const prefersReducedMotion = usePrefersReducedMotion();

return (
  <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
    {/* Content */}
  </div>
);
```

## Mobile Navigation

### MobileBottomNav Component

Fixed bottom navigation bar with 5 key sections:
- Email (/)
- Lists (/exchange)
- Tokens (/tokenize)
- Portfolio (/portfolio)
- Tasks (/contributions)

**Features:**
- Always visible on mobile (≤768px)
- Active state indication
- Touch-optimized buttons (60px height)
- Landscape mode support

## Responsive Design Breakpoints

```css
/* Mobile First (default) */
@media (max-width: 480px) { /* Small mobile */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 768px) and (orientation: landscape) { /* Landscape mobile */ }
@media (min-width: 769px) and (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }
```

## Accessibility Features

All mobile styles include:
- **Touch Targets:** Minimum 44x44px for all interactive elements
- **High Contrast Mode:** Enhanced borders and colors
- **Reduced Motion:** Disabled animations when preferred
- **Keyboard Navigation:** Full keyboard support
- **Screen Reader Support:** Proper ARIA labels and semantic HTML
- **Font Sizing:** Prevents iOS zoom with 16px minimum on inputs

## Performance Optimizations

1. **Lazy Loading**
   - Images lazy load by default
   - Components load on scroll into view
   - Reduced initial bundle size

2. **Touch Event Optimization**
   - Passive event listeners where possible
   - Debounced scroll and resize handlers
   - Optimized touch move events

3. **CSS Optimizations**
   - Media query organization
   - Minimal specificity
   - Reduced repaints and reflows

4. **Progressive Enhancement**
   - Core functionality works without JavaScript
   - Enhanced features for modern browsers
   - Graceful degradation for older devices

## Testing Recommendations

### Device Testing
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Android Tablet (Chrome)

### Viewport Testing
- 320px (iPhone SE)
- 375px (iPhone 12/13)
- 390px (iPhone 14)
- 414px (iPhone 14 Plus)
- 768px (iPad Portrait)
- 1024px (iPad Landscape)

### Orientation Testing
- Portrait mode
- Landscape mode
- Orientation change handling

### Touch Testing
- Swipe gestures (all directions)
- Pull-to-refresh
- Tap targets (minimum 44px)
- Scroll behavior
- Pinch-to-zoom (disabled where appropriate)

## Browser Support

### Fully Supported
- iOS Safari 14+
- Chrome for Android 90+
- Samsung Internet 14+
- Firefox for Android 90+

### Graceful Degradation
- iOS Safari 12-13
- Chrome for Android 80-89
- Older mobile browsers

## Future Enhancements

Potential mobile features to add:
- [ ] Native app integration (via TWA)
- [ ] Offline mode with Service Workers
- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Voice input for compose
- [ ] Haptic feedback
- [ ] Advanced gesture controls
- [ ] Mobile-specific shortcuts
- [ ] Split-screen support
- [ ] Foldable device optimization

## Known Issues

None currently documented. Please report mobile-specific issues on GitHub.

## Contributing

When adding new pages or features:
1. Create corresponding `.mobile.css` file
2. Import it in the page component
3. Test on real mobile devices
4. Follow existing mobile patterns
5. Update this documentation

## Resources

- [Web.dev Mobile Performance](https://web.dev/mobile/)
- [MDN Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [iOS Safari Web Content Guide](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/Introduction/Introduction.html)
- [Android Chrome Mobile](https://developer.chrome.com/docs/android/)

---

**Last Updated:** October 21, 2025
**Version:** 1.0.0
