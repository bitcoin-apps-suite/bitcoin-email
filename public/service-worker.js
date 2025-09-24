// Bitcoin Email PWA Service Worker
const CACHE_NAME = 'bitcoin-email-v1';
const urlsToCache = [
  '/',
  '/compose',
  '/inbox',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened Bitcoin Email cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache error:', error);
      })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              if (!event.request.url.includes('/api/')) {
                cache.put(event.request, responseToCache);
              }
            });
          return response;
        });
      })
      .catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// Handle protocol launches
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PROTOCOL_LAUNCH') {
    console.log('Bitcoin Email protocol launch:', event.data.url);
    
    if (event.data.url) {
      const url = new URL(event.data.url);
      
      // Handle mailto: protocol
      if (url.protocol === 'mailto:') {
        const email = url.pathname;
        clients.openWindow(`/compose?to=${email}`);
      }
      // Handle web+bitcoin-email: protocol
      else if (url.protocol === 'web+bitcoin-email:') {
        const action = url.pathname;
        clients.openWindow(`/?action=${action}`);
      }
    }
  }
});