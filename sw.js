// Werkstattkarte – Service Worker · © 2026 Frank Gallinat · Alle Rechte vorbehalten.
// Wird von web/bauen.py befüllt (Stand und Dateiliste). Hält alle Karten auf dem Gerät,
// damit die App ohne Netz startet. Neue Fassung: bauen.py ändert STAND, alter Speicher wird gelöscht.
const STAND = "b846f943d98f";
const DATEIEN = ["./", "icon-180.png", "icon-192.png", "icon-512.png", "index.html", "manifest.webmanifest", "robots.txt", "ar/werkstattkarte-kfz.html", "ar/werkstattkarte-metall.html", "bg/werkstattkarte-kfz.html", "bg/werkstattkarte-metall.html", "bs/werkstattkarte-kfz.html", "bs/werkstattkarte-metall.html", "cs/werkstattkarte-kfz.html", "cs/werkstattkarte-metall.html", "da/werkstattkarte-kfz.html", "da/werkstattkarte-metall.html", "de/werkstattkarte-kfz.html", "de/werkstattkarte-metall.html", "el/werkstattkarte-kfz.html", "el/werkstattkarte-metall.html", "en/werkstattkarte-kfz.html", "en/werkstattkarte-metall.html", "es/werkstattkarte-kfz.html", "es/werkstattkarte-metall.html", "et/werkstattkarte-kfz.html", "et/werkstattkarte-metall.html", "fa/werkstattkarte-kfz.html", "fa/werkstattkarte-metall.html", "fi/werkstattkarte-kfz.html", "fi/werkstattkarte-metall.html", "fr/werkstattkarte-kfz.html", "fr/werkstattkarte-metall.html", "ga/werkstattkarte-kfz.html", "ga/werkstattkarte-metall.html", "hi/werkstattkarte-kfz.html", "hi/werkstattkarte-metall.html", "hr/werkstattkarte-kfz.html", "hr/werkstattkarte-metall.html", "hu/werkstattkarte-kfz.html", "hu/werkstattkarte-metall.html", "it/werkstattkarte-kfz.html", "it/werkstattkarte-metall.html", "ku/werkstattkarte-kfz.html", "ku/werkstattkarte-metall.html", "lt/werkstattkarte-kfz.html", "lt/werkstattkarte-metall.html", "lv/werkstattkarte-kfz.html", "lv/werkstattkarte-metall.html", "mt/werkstattkarte-kfz.html", "mt/werkstattkarte-metall.html", "nl/werkstattkarte-kfz.html", "nl/werkstattkarte-metall.html", "pl/werkstattkarte-kfz.html", "pl/werkstattkarte-metall.html", "ps/werkstattkarte-kfz.html", "ps/werkstattkarte-metall.html", "pt/werkstattkarte-kfz.html", "pt/werkstattkarte-metall.html", "rm/werkstattkarte-kfz.html", "rm/werkstattkarte-metall.html", "ro/werkstattkarte-kfz.html", "ro/werkstattkarte-metall.html", "ru/werkstattkarte-kfz.html", "ru/werkstattkarte-metall.html", "sk/werkstattkarte-kfz.html", "sk/werkstattkarte-metall.html", "sl/werkstattkarte-kfz.html", "sl/werkstattkarte-metall.html", "sq/werkstattkarte-kfz.html", "sq/werkstattkarte-metall.html", "sr/werkstattkarte-kfz.html", "sr/werkstattkarte-metall.html", "sv/werkstattkarte-kfz.html", "sv/werkstattkarte-metall.html", "th/werkstattkarte-kfz.html", "th/werkstattkarte-metall.html", "tr/werkstattkarte-kfz.html", "tr/werkstattkarte-metall.html", "uk/werkstattkarte-kfz.html", "uk/werkstattkarte-metall.html", "vi/werkstattkarte-kfz.html", "vi/werkstattkarte-metall.html"];
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
