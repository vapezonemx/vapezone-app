// Service worker minimo: SOLO existe para que Chrome en Android permita
// "Instalar app" / "Agregar a pantalla de inicio". A proposito NO guarda
// nada en cache -- cada peticion va directo a la red, para que el cliente
// siempre vea la version mas reciente sin tener que borrar el historial.
self.addEventListener('install', function(e){
  self.skipWaiting();
});
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function(e){
  // {cache:'no-store'} obliga a que SIEMPRE vaya a la red por una copia
  // nueva, ignorando por completo lo que Safari tenga guardado. Esto es lo
  // que realmente evita tener que borrar historial en cada actualizacion.
  e.respondWith(fetch(e.request, { cache: 'no-store' }));
});
