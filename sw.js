self.addEventListener('install', e => {
	console.log('PWA Service Worker installing.');
    let timeStamp = Date.now();
    e.waitUntil(
    caches.open('smh_service_worker').then(cache => {
      return cache.addAll([
		'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        '/stack-memo-helper/index.html',
		'open-iconic-bootstrap.min.css',
		'https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js',
		'https://code.jquery.com/jquery-3.2.1.slim.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
		'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
		'open-iconic.woff',
		'card.vue.js',
		'stack-memo-helper.js'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  console.log('PWA Service Worker activating.');  
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
	
  );
});