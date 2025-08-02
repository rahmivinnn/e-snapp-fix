const CACHE_NAME = 'e-snapp-v1';
const urlsToCache = [
  '/',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Cache addAll failed:', err);
          return Promise.resolve();
        });
      })
      .catch(err => {
        console.log('Cache open failed:', err);
        return Promise.resolve();
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (event.request.url.startsWith('chrome-extension://') || 
      event.request.url.startsWith('moz-extension://') ||
      !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).catch(() => {
          // Return a basic offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return new Response('Offline - Please check your connection', {
              status: 200,
              headers: { 'Content-Type': 'text/html' }
            });
          }
        });
      })
      .catch(() => {
        return fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'energy-data-sync') {
    event.waitUntil(syncEnergyData());
  }
});

// Push notification support
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Energy update available',
    icon: '/icon-192.svg',
    badge: '/icon-192.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Dashboard',
        icon: '/icon-192.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('e-snapp Energy Monitor', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sync energy data function
async function syncEnergyData() {
  try {
    // This would sync any pending energy data when back online
    console.log('Syncing energy data...');
  } catch (error) {
    console.error('Failed to sync energy data:', error);
  }
}