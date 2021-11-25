var CACHE_NAME = 'pwa-naicho-caches';
var urlsToCache = [
    '/naicho/index.html',
    '/naicho/mailTrigger.js',
    '/naicho/images/icon1.png',
    '/naicho/images/icon2.png'
    '/naicho/images/icon3.png'
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
