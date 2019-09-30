//Caching Pages individually
const cacheName = 'version1' ;
const cacheAssets = [
    'index.html',
    'manifest.json',
    'uncp-old-map.jpg',
    'uncp144.png',
    'main.js'
];

//call install event
self.addEventListener('install', event => {
    console.log('Service Worker has been Installed');

    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Caching Files...');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

//Calling Activate Event: Can use this to clean up old cache hereas well!
self.addEventListener('activate', event => {
    console.log('Service Worker has been Activated');
    //Remove Unwanted Cache
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker is clearing old cache...');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//Call Fetch Event (Using this to get SW to display the saved cache)
self.addEventListener('fetch', event => {
    console.log('Servce Worker is Fetching Files...');
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});


