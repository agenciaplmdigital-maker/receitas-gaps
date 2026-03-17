/// <reference lib="webworker" />

const CACHE_NAME = 'receitas-gaps-v1'
const RUNTIME_CACHE = 'receitas-gaps-runtime-v1'
const API_CACHE = 'receitas-gaps-api-v1'

// Files to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/manifest.json',
]

declare const self: ServiceWorkerGlobalScope

// Install event
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.log('Cache add error:', error)
        // Continue even if some assets fail to cache
        return Promise.resolve()
      })
    })
  )
  // Force new service worker to activate immediately
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE && name !== API_CACHE)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// Fetch event
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin and chrome extensions
  if (url.origin !== self.location.origin) {
    return
  }

  // Handle API calls with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request))
    return
  }

  // Handle documents with network-first strategy
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstStrategy(request))
    return
  }

  // Handle static assets with cache-first strategy
  event.respondWith(cacheFirstStrategy(request))
})

/**
 * Cache-first strategy: Return cached version if available, otherwise fetch from network
 */
async function cacheFirstStrategy(request: Request): Promise<Response> {
  try {
    const cached = await caches.match(request)
    if (cached) {
      return cached
    }

    const response = await fetch(request)

    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE)
      cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const cached = await caches.match('/offline.html')
      if (cached) return cached
    }

    // Return a basic offline response
    return new Response('Offline - Page not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain',
      }),
    })
  }
}

/**
 * Network-first strategy: Fetch from network, fall back to cache if offline
 */
async function networkFirstStrategy(request: Request): Promise<Response> {
  try {
    const response = await fetch(request)

    // Cache successful responses
    if (response.ok) {
      const cacheName = request.url.includes('/api/') ? API_CACHE : RUNTIME_CACHE
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }

    return response
  } catch (error) {
    // Try to return cached response
    const cached = await caches.match(request)
    if (cached) {
      return cached
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline.html')
      if (offlinePage) return offlinePage
    }

    // Return error response
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain',
      }),
    })
  }
}

export {}
