/* Precificação MONTBAGS — service worker.
   Suba o número da versão a cada publicação para forçar a atualização nos aparelhos. */
var VERSAO = 'montbags-v1';

var SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(VERSAO)
      .then(function(c){ return c.addAll(SHELL); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(nomes){
      return Promise.all(nomes.map(function(n){
        if(n !== VERSAO) return caches.delete(n);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;

  // A página em si: rede primeiro, para a artesã receber atualizações.
  // Sem internet, cai no cache e o app abre igual.
  if(req.mode === 'navigate'){
    e.respondWith(
      fetch(req).then(function(res){
        var copia = res.clone();
        caches.open(VERSAO).then(function(c){ c.put('./index.html', copia); });
        return res;
      }).catch(function(){
        return caches.match('./index.html').then(function(r){ return r || caches.match('./'); });
      })
    );
    return;
  }

  // Ícones e manifesto: cache primeiro, são estáveis.
  e.respondWith(
    caches.match(req).then(function(cache){
      return cache || fetch(req).then(function(res){
        if(res && res.status === 200 && res.type === 'basic'){
          var copia = res.clone();
          caches.open(VERSAO).then(function(c){ c.put(req, copia); });
        }
        return res;
      });
    })
  );
});
