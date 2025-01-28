const CACHE_NAME = 'gymnavigator-v2';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/site.webmanifest',
    '/sitemap.txt',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/apple-touch-icon.png',
    '/about',
    '/pricing',
    '/contact',
    '/features',
    '/signin',
    '/signup',
    '/welcome',
    '/dashboard',
    '/dashboard/workouts/viewworkouts',
    '/dashboard/workouts/personalizedworkout',
    '/dashboard/diet/personalizeddiet',
    '/dashboard/diet/grocerylist',
    '/dashboard/myprogress',
    '/dashboard/myprogress/week',
    '/dashboard/myprogress/month',
    '/dashboard/today\'splan',
    '/dashboard/attendance/qrscanner',
    '/dashboard/attendance/todaysattendance',
    '/dashboard/gym',
    '/dashboard/trainer',
    '/dashboard/health-profile',
    '/dashboard/wallet',
    '/onboarding',
    '/onboarding/beforegymenrollment',
    '/onboarding/healthprofile',
    '/qr-scanner',
    '/trainer',
    '/sitemap.xml'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(STATIC_ASSETS);
		})
	);
	self.skipWaiting(); // Ensure new service worker takes over immediately
});

// Activate event - clean up old caches
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
	// Ensure new service worker takes control of all clients
	return self.clients.claim();
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
	event.respondWith(
		fetch(event.request)
			.then((response) => {
				// If we get a valid response, clone it and update the cache
				if (response && response.status === 200) {
					const responseClone = response.clone();
					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, responseClone);
					});
				}
				return response;
			})
			.catch(() => {
				// If network fails, try to get it from cache
				return caches.match(event.request);
			})
	);
});
