const CACHE_NAME = 'spite-durban-v2';
const urlsToCache = [
  './',
  'index.html',
  'manifest.webmanifest',
  'sw.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files for offline use');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Cache addAll failed:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
