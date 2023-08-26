const CACHE_NAME = 'pageOff';
const PAGE_CACHE = [
   '/',
   '/index.html',
   '/style.css',
   '/main.js'
  ]
  
  self.addEventListener('install', event=>{
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache=>cache.addAll(PAGE_CACHE))
      )
  })
  
  self.addEventListener('fetch', event=(
    event.respondWith(
       caches.match(event.request).then(response => response || fetch(event.request))
      )
    ))