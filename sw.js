const GH_PATH = "/js-projects";
const APP_PREFIX = "cwdjs_";
const VERSION = "version_001";
const URLS = [
	`${GH_PATH}/`,
	`${GH_PATH}/index.html`,
	`${GH_PATH}/styles/includes.css`,
	`${GH_PATH}/styles/fontawesome/js/all.min.js`,
	`${GH_PATH}/styles/index.css`,
	`${GH_PATH}/js/app.js`,
	`${GH_PATH}/favicon.ico`,
];

const CACHE_NAME = APP_PREFIX + VERSION;
self.addEventListener("fetch", function (e) {
	e.respondWith(
		// Will get from cache if it exists, fetch request if not
		caches.match(e.request).then(function (request) {
			return request || fetch(e.request);
		}),
	);
});

self.addEventListener("install", function (e) {
	e.waitUntil(
		// On install, store for the cache name every urls
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(URLS);
		}),
	);
});

self.addEventListener("activate", function (e) {
	e.waitUntil(
		caches.keys().then(function (keyList) {
			const cacheWhitelist = keyList.filter(function (key) {
				return key.indexOf(APP_PREFIX);
			});
			cacheWhitelist.push(CACHE_NAME);
			return Promise.all(
				keyList.map(function (key, i) {
					if (cacheWhitelist.indexOf(key) === -1) {
						return caches.delete(keyList[i]);
					}
				}),
			);
		}),
	);
});
