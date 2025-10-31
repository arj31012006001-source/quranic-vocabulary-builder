const STATIC_CACHE_NAME = 'quranic-vocab-static-v3';
const DYNAMIC_CACHE_NAME = 'quranic-vocab-dynamic-v3';

// All the assets that make up the "app shell"
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/index.tsx',
  '/manifest.json',
  '/icons/icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&family=Poppins:wght@400;600&family=Noto+Sans+Bengali:wght@400;600&family=Noto+Sans+Devanagari:wght@400;600&display=swap',
];

// Install service worker: pre-cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      console.log('Opened static cache and caching app shell');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate service worker: clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event: serve cached content when offline
self.addEventListener('fetch', event => {
  // We only want to handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Strategy: Cache-first, with network fallback and dynamic caching.
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return from cache if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // If not in cache, fetch from network
      return fetch(event.request).then(networkResponse => {
        const responseToCache = networkResponse.clone();
        
        // Open the dynamic cache and store the new response
        caches.open(DYNAMIC_CACHE_NAME).then(cache => {
          // We should only cache valid responses
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, responseToCache);
          }
        });
        
        // Return the network response to the browser
        return networkResponse;
      }).catch(() => {
        // If the fetch fails and the request is for navigation, return the offline fallback page.
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});