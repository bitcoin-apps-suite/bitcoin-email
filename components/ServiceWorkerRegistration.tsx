'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('Bitcoin Email PWA Service Worker registered:', registration);
            
            // Handle protocol launches
            if (window.location.search.includes('action=')) {
              const params = new URLSearchParams(window.location.search);
              const action = params.get('action');
              console.log('Protocol launch action:', action);
            }
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return null;
}