// Werkstattkarte – Service Worker · © 2026 Frank Gallinat · Alle Rechte vorbehalten.
// Wird von web/bauen.py befüllt (Stand und Dateiliste). Hält alle Karten auf dem Gerät,
// damit die App ohne Netz startet. Neue Fassung: bauen.py ändert STAND, alter Speicher wird gelöscht.
const STAND = "89929197af44";
const DATEIEN = ["./", "icon-180.png", "icon-192.png", "icon-512.png", "index.html", "manifest.webmanifest", "robots.txt", "ar/werkstattkarte-kfz.html", "ar/werkstattkarte-metall.html", "de/werkstattkarte-kfz.html", "de/werkstattkarte-metall.html", "en/werkstattkarte-kfz.html", "en/werkstattkarte-metall.html", "es/werkstattkarte-kfz.html", "es/werkstattkarte-metall.html", "fr/werkstattkarte-kfz.html", "fr/werkstattkarte-metall.html", "it/werkstattkarte-kfz.html", "it/werkstattkarte-metall.html", "pl/werkstattkarte-kfz.html", "pl/werkstattkarte-metall.html", "ru/werkstattkarte-kfz.html", "ru/werkstattkarte-metall.html", "th/werkstattkarte-kfz.html", "th/werkstattkarte-metall.html", "tr/werkstattkarte-kfz.html", "tr/werkstattkarte-metall.html", "uk/werkstattkarte-kfz.html", "uk/werkstattkarte-metall.html", "vi/werkstattkarte-kfz.html", "vi/werkstattkarte-metall.html"];
const SPEICHER = 'werkstattkarte-' + STAND;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SPEICHER).then(c => c.addAll(DATEIEN.map(d => new Request(d, {cache: 'reload'}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(namen => Promise.all(namen.filter(n => n.startsWith('werkstattkarte-') && n !== SPEICHER)
      .map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});

// Erst aus dem Gerätespeicher, sonst übers Netz (Suchparameter zählen nicht).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(SPEICHER).then(c => c.match(e.request, {ignoreSearch: true})
    .then(treffer => treffer || fetch(e.request))));
});
