/* Minimal SW so Chromium/Android treats /admin as installable. Scope: /admin/ */
self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(Promise.resolve())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', () => {
  // Network-only; no offline cache required for Payload admin.
})
